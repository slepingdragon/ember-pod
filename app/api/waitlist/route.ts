import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

// Very loose email sanity check — don't be stricter than needed.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: { email?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const raw = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!raw || raw.length > 254 || !EMAIL_RE.test(raw)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const { error } = await supabase.from("waitlist").insert({
    email: raw,
    source: "landing",
  });

  if (error) {
    // 23505 = unique_violation — treat duplicate signups as success.
    if ((error as { code?: string }).code === "23505") {
      return NextResponse.json({ ok: true, duplicate: true });
    }
    console.error("[waitlist] insert error", error);
    return NextResponse.json({ error: "Could not save email. Try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
