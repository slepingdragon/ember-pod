import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy — EmberPod",
  description: "Privacy Policy for EmberPod.",
};

export default function Privacy() {
  return (
    <>
      <div className="ambient" />
      <div className="noise" />
      <main className="relative mx-auto max-w-3xl px-6 py-32">
        <a href="/" className="text-sm text-white/50 hover:text-white transition">
          ← Back home
        </a>
        <h1 className="mt-8 text-4xl md:text-5xl font-black tracking-tightest grad-text">
          Privacy Policy
        </h1>
        <p className="mt-6 text-white/60">
          EmberPod is in early access. Our full Privacy Policy is being finalized. For any
          questions in the meantime, reach us at{" "}
          <a href="mailto:hello@ember-pod.com" className="text-white underline">
            hello@ember-pod.com
          </a>
          .
        </p>
        <p className="mt-4 text-white/50 text-sm">
          We only collect the email address you submit to our waitlist. We do not sell or share
          your information. You can request deletion at any time.
        </p>
      </main>
    </>
  );
}
