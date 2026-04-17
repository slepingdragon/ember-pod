# EmberPod — Landing Page

The marketing site and waitlist signup for **EmberPod** — the easiest way to start a print-on-demand store.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase** for waitlist capture. Deployed on **Vercel**.

---

## Quick start (local dev)

```bash
npm install
cp .env.local.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
```

Visit <http://localhost:3000>.

---

## Supabase setup (one-time)

1. In the Supabase dashboard, open **SQL Editor → New query** and paste the block below. Run it.

```sql
-- Waitlist table
create table if not exists public.waitlist (
  id          bigserial primary key,
  email       text not null,
  source      text,
  created_at  timestamptz not null default now()
);

-- One row per email
create unique index if not exists waitlist_email_unique
  on public.waitlist (lower(email));

-- Lock it down
alter table public.waitlist enable row level security;

-- Anonymous users can INSERT (form submissions) but cannot SELECT.
-- Nobody can read the list via the public anon key — only via the service role key,
-- which lives in the Supabase dashboard and never touches the browser.
drop policy if exists "anon can insert" on public.waitlist;
create policy "anon can insert"
  on public.waitlist
  for insert
  to anon
  with check (true);
```

2. Go to **Project Settings → API** and copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. Add those to `.env.local` for local dev, and to **Vercel → Settings → Environment Variables** for production.

To view signups: Supabase dashboard → **Table Editor → waitlist**.

---

## Deploy to Vercel

First push this repo to GitHub (see *First push to GitHub* below), then:

1. Go to <https://vercel.com/new>
2. Import the `slepingdragon/ember-pod` repo
3. Framework preset: **Next.js** (auto-detected)
4. Add the two environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
5. Click **Deploy**

Vercel gives you a `*.vercel.app` URL. Test the waitlist form, then point the custom domain.

### Point ember-pod.com at Vercel

Vercel → Project → **Settings → Domains** → add `ember-pod.com` and `www.ember-pod.com`.
Vercel will show you the exact DNS records to set at your registrar. Usually:

| Type  | Name | Value                   |
| ----- | ---- | ----------------------- |
| A     | @    | `76.76.21.21`           |
| CNAME | www  | `cname.vercel-dns.com`  |

SSL/HTTPS is automatic once DNS propagates (minutes to a few hours).

---

## First push to GitHub

The repo exists at <https://github.com/slepingdragon/ember-pod>. From this project folder:

```bash
cd "ember-pod"
git init
git branch -M main
git add .
git commit -m "Initial landing page"
git remote add origin https://github.com/slepingdragon/ember-pod.git
git push -u origin main
```

If the remote already has a commit (e.g. an auto-generated README), merge first:

```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## Project structure

```
app/
  layout.tsx            Root layout + Inter font + metadata
  page.tsx              Landing page (all sections)
  globals.css           Tailwind + custom styles (glass, ambient, animations)
  api/waitlist/route.ts POST /api/waitlist — inserts into Supabase
  privacy/page.tsx      Placeholder
  terms/page.tsx        Placeholder
components/
  WaitlistForm.tsx      Client form, submits to /api/waitlist
  ScrollReveal.tsx      IntersectionObserver-based fade-ins
lib/
  supabase.ts           Lazy Supabase client (reads env vars)
```

---

## Changing copy / design

- Hero headline, subhead, section copy → `app/page.tsx`
- Colors / fonts / tokens → `tailwind.config.ts` and `app/globals.css`
- Waitlist confirmation text → `components/WaitlistForm.tsx`

Keep the vibe: pure black background, high contrast, glassy translucent cards. That's the brand.
