import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms — EmberPod",
  description: "Terms of Service for EmberPod.",
};

export default function Terms() {
  return (
    <>
      <div className="ambient" />
      <div className="noise" />
      <main className="relative mx-auto max-w-3xl px-6 py-32">
        <a href="/" className="text-sm text-white/50 hover:text-white transition">
          ← Back home
        </a>
        <h1 className="mt-8 text-4xl md:text-5xl font-black tracking-tightest grad-text">
          Terms of Service
        </h1>
        <p className="mt-6 text-white/60">
          EmberPod is in early access. Our full Terms of Service are being finalized. For any
          questions in the meantime, reach us at{" "}
          <a href="mailto:hello@ember-pod.com" className="text-white underline">
            hello@ember-pod.com
          </a>
          .
        </p>
      </main>
    </>
  );
}
