/**
 * Client for the Google Trends Keywords API on RapidAPI.
 *
 * API owner: Bania (https://rapidapi.com/baniabradyy/api/google-trends-keywords)
 * Plan: PRO, $10/mo. Keep call volume low — simple in-memory TTL cache below.
 *
 * In the short term the RapidAPI key is inlined into the mobile bundle via
 * EXPO_PUBLIC_*; in production we proxy through api.ember-pod.com so the key
 * never ships to clients.
 */

const HOST = process.env.EXPO_PUBLIC_RAPIDAPI_HOST ?? 'google-trends-keywords.p.rapidapi.com';
const KEY = process.env.EXPO_PUBLIC_RAPIDAPI_KEY ?? '';

const BASE = `https://${HOST}`;

/* ---------- Types (best-effort; the real responses may include more) ---------- */

/** A trending keyword surfaced by `/keywords/trending`. */
export type TrendingKeyword = {
  keyword: string;
  /** Higher = more search volume / momentum. Scale is per-API. */
  score?: number;
  /** Short text describing the trend — e.g. "rising 3x week-over-week". */
  note?: string;
};

/** A POD opportunity breakdown from `/keywords/get-pod-opportunity-score`. */
export type OpportunityScore = {
  keyword: string;
  /** 0-100 composite score. Higher = better POD opportunity. */
  score: number;
  /** One of GREAT / GOOD / OK / POOR per the API docs. */
  verdict?: 'GREAT' | 'GOOD' | 'OK' | 'POOR' | string;
};

/* ---------- Simple TTL cache ---------- */

type CacheEntry<T> = { expires: number; value: T };
const cache = new Map<string, CacheEntry<unknown>>();
const ONE_HOUR = 60 * 60 * 1000;

function cached<T>(key: string): T | null {
  const hit = cache.get(key) as CacheEntry<T> | undefined;
  if (!hit) return null;
  if (hit.expires < Date.now()) {
    cache.delete(key);
    return null;
  }
  return hit.value;
}

function store<T>(key: string, value: T, ttl = ONE_HOUR) {
  cache.set(key, { expires: Date.now() + ttl, value });
}

/* ---------- Core fetch helper ---------- */

async function rapid<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  if (!KEY) {
    throw new Error(
      'EXPO_PUBLIC_RAPIDAPI_KEY is not set. Copy .env.example to .env and paste your RapidAPI key.',
    );
  }
  const qs = new URLSearchParams(params).toString();
  const url = qs ? `${BASE}${path}?${qs}` : `${BASE}${path}`;
  const res = await fetch(url, {
    headers: {
      'x-rapidapi-key': KEY,
      'x-rapidapi-host': HOST,
    },
  });
  if (!res.ok) {
    throw new Error(`RapidAPI ${path} failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

/* ---------- Public API ---------- */

/**
 * Today's trending keyword candidates for POD.
 * Cached 1 hour to stay well under RapidAPI quota.
 */
export async function fetchTrending(country: string = 'US'): Promise<TrendingKeyword[]> {
  const key = `trending:${country}`;
  const hit = cached<TrendingKeyword[]>(key);
  if (hit) return hit;

  try {
    // The API's exact response shape may vary — we normalize a handful of
    // plausible shapes here so UI code can stay simple.
    const raw = await rapid<unknown>('/keywords/trending', { country });
    const list = normalizeTrending(raw);
    store(key, list);
    return list;
  } catch (err) {
    console.warn('[trends] fetchTrending failed:', err);
    return [];
  }
}

/**
 * Compute a POD opportunity score for a single keyword.
 * Cached 1 hour per keyword.
 */
export async function fetchOpportunityScore(
  keyword: string,
): Promise<OpportunityScore | null> {
  const key = `opportunity:${keyword.toLowerCase()}`;
  const hit = cached<OpportunityScore>(key);
  if (hit) return hit;

  try {
    const raw = await rapid<unknown>('/keywords/get-pod-opportunity-score', { keyword });
    const score = normalizeOpportunity(raw, keyword);
    if (score) store(key, score);
    return score;
  } catch (err) {
    console.warn('[trends] fetchOpportunityScore failed:', err);
    return null;
  }
}

/* ---------- Normalizers (defensive against unknown response shapes) ---------- */

function normalizeTrending(raw: unknown): TrendingKeyword[] {
  if (!raw) return [];
  // Common shapes we might see:
  //   { trending: [{ keyword, score }, ...] }
  //   { results: [{ term, volume }, ...] }
  //   [{ keyword, ... }, ...]
  const arr = Array.isArray(raw)
    ? raw
    : Array.isArray((raw as any).trending)
      ? (raw as any).trending
      : Array.isArray((raw as any).results)
        ? (raw as any).results
        : Array.isArray((raw as any).data)
          ? (raw as any).data
          : [];

  return arr
    .map((item: any): TrendingKeyword | null => {
      const keyword = item?.keyword ?? item?.term ?? item?.query ?? item?.name;
      if (!keyword || typeof keyword !== 'string') return null;
      const score =
        typeof item?.score === 'number'
          ? item.score
          : typeof item?.volume === 'number'
            ? item.volume
            : typeof item?.traffic === 'number'
              ? item.traffic
              : undefined;
      const note =
        typeof item?.note === 'string'
          ? item.note
          : typeof item?.delta === 'string'
            ? item.delta
            : undefined;
      return { keyword, score, note };
    })
    .filter(Boolean) as TrendingKeyword[];
}

function normalizeOpportunity(raw: unknown, fallbackKeyword: string): OpportunityScore | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as any;
  const score =
    typeof r.score === 'number'
      ? r.score
      : typeof r.opportunity_score === 'number'
        ? r.opportunity_score
        : typeof r.opportunityScore === 'number'
          ? r.opportunityScore
          : null;
  if (score === null) return null;
  return {
    keyword: r.keyword ?? fallbackKeyword,
    score,
    verdict: r.verdict ?? r.rating,
  };
}
