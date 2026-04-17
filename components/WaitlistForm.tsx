"use client";

import { useState } from "react";

type Props = {
  placeholder?: string;
  variant?: "hero" | "final";
};

export default function WaitlistForm({
  placeholder = "you@gmail.com",
  variant = "hero",
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string; duplicate?: boolean };

      if (!res.ok || data.error) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setMessage(
        data.duplicate
          ? "You're already on the list — we'll be in touch."
          : "You're on the list. We'll be in touch."
      );
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const disabled = status === "loading" || status === "success";

  const wrapperClass =
    variant === "final"
      ? "glass rounded-2xl p-2 flex flex-col sm:flex-row gap-2"
      : "glass-strong rounded-2xl p-2 flex flex-col sm:flex-row gap-2";

  return (
    <form onSubmit={handleSubmit} className="w-full" noValidate>
      <div className={wrapperClass}>
        <input
          type="email"
          required
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={disabled}
          autoComplete="email"
          className="flex-1 bg-transparent px-4 py-3 text-white placeholder-white/40 focus:outline-none text-[15px] disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={disabled}
          className="btn-primary rounded-xl px-6 py-3 font-semibold text-[15px] whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Joining…" : status === "success" ? "Thanks!" : "Join the waitlist"}
        </button>
      </div>

      {status === "idle" && (
        <p className="mt-3 text-xs text-white/40">
          {variant === "final" ? "No spam. Unsubscribe any time." : "We'll email you when early access opens. No spam, ever."}
        </p>
      )}
      {status === "success" && (
        <p className="mt-3 text-sm text-white">{message}</p>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm text-red-300/90">{message}</p>
      )}
    </form>
  );
}
