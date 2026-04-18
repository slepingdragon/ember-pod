import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy — EmberPod",
  description:
    "How EmberPod collects, uses, and protects your personal information.",
};

const EFFECTIVE_DATE = "April 18, 2026";

export default function Privacy() {
  return (
    <>
      <div className="ambient" />
      <div className="noise" />
      <main className="relative mx-auto max-w-3xl px-6 py-24 md:py-32">
        <Link
          href="/"
          className="text-sm text-white/50 hover:text-white transition"
        >
          ← Back home
        </Link>

        <header className="mt-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tightest grad-text">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-white/40">
            Effective {EFFECTIVE_DATE}
          </p>
        </header>

        <section className="mt-10 text-white/70 leading-relaxed">
          <p>
            EmberPod (&ldquo;EmberPod,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) takes your
            privacy seriously. This policy explains what we collect, why we
            collect it, how we use it, and the choices you have. It applies to
            the EmberPod website at{" "}
            <a
              href="https://ember-pod.com"
              className="text-white underline decoration-white/30 hover:decoration-white"
            >
              ember-pod.com
            </a>
            , the EmberPod mobile apps for iOS and Android, and any related
            services (together, the &ldquo;Service&rdquo;).
          </p>
          <p className="mt-4">
            If you do not agree with this policy, please do not use the Service.
          </p>
        </section>

        <Section title="1. Who we are">
          <p>
            EmberPod is operated as a sole-proprietor project based in the
            United States. The easiest way to reach us is{" "}
            <a
              href="mailto:hello@ember-pod.com"
              className="text-white underline decoration-white/30 hover:decoration-white"
            >
              hello@ember-pod.com
            </a>
            .
          </p>
        </Section>

        <Section title="2. Information we collect">
          <p>We collect information in three ways:</p>

          <h3 className="mt-6 text-white font-semibold">
            (a) Information you give us directly
          </h3>
          <ul className="mt-3 space-y-2 list-disc list-outside pl-5 marker:text-white/30">
            <li>
              <strong className="text-white">Account data.</strong> When you
              sign up, we collect your email address and an encrypted password
              (we never see your plaintext password). If you sign in with a
              third-party provider (for example Apple or Google, where
              available), we receive the basic profile information they send
              us, such as your name and email.
            </li>
            <li>
              <strong className="text-white">Onboarding answers.</strong> We
              ask a small number of questions (for example your prior
              experience selling online) so the app can tailor itself to you.
              We store these on your user record.
            </li>
            <li>
              <strong className="text-white">Content you upload.</strong> Any
              artwork, photos, or text you upload or generate inside EmberPod
              to use on your print-on-demand listings.
            </li>
            <li>
              <strong className="text-white">Waitlist email.</strong> If you
              submit your email on our landing page, we store it so we can
              notify you when early access opens.
            </li>
            <li>
              <strong className="text-white">Support communications.</strong>{" "}
              When you email us or message support, we keep the thread so we
              can help you and improve our product.
            </li>
          </ul>

          <h3 className="mt-6 text-white font-semibold">
            (b) Information from connected third-party accounts
          </h3>
          <p className="mt-3">
            EmberPod lets you connect external commerce and print-on-demand
            accounts (for example Etsy, Printful, and Printify) so we can
            publish listings and check on fulfillment on your behalf. When you
            connect one of these services:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-outside pl-5 marker:text-white/30">
            <li>
              We receive an <strong className="text-white">OAuth access
              token</strong> (and, where provided, a refresh token). We store
              these encrypted at rest and use them only to perform actions you
              initiate, such as creating a listing or reading your shop&rsquo;s
              public profile.
            </li>
            <li>
              We receive the{" "}
              <strong className="text-white">shop, listing, and order
              data</strong> that the third party returns for the scopes you
              approved. For example, Etsy returns your shop name, listing
              details, and order totals (not buyer payment information).
            </li>
            <li>
              We never receive or store your password for any connected
              service, and you can disconnect any integration at any time from
              your account settings.
            </li>
          </ul>

          <h3 className="mt-6 text-white font-semibold">
            (c) Information we collect automatically
          </h3>
          <ul className="mt-3 space-y-2 list-disc list-outside pl-5 marker:text-white/30">
            <li>
              <strong className="text-white">Device and usage data.</strong>{" "}
              Device type, operating system, app version, crash logs, and
              feature-usage events (for example &ldquo;user completed onboarding&rdquo;).
            </li>
            <li>
              <strong className="text-white">Approximate location.</strong>{" "}
              Derived from your IP address only (country or region level). We
              do not collect precise GPS location.
            </li>
            <li>
              <strong className="text-white">Cookies and similar
              technologies.</strong> On our website, we use a small number of
              essential cookies for sign-in and security, plus privacy-friendly
              analytics. We do not use advertising cookies or cross-site
              tracking.
            </li>
          </ul>
        </Section>

        <Section title="3. How we use your information">
          <p>We use the information above to:</p>
          <ul className="mt-3 space-y-2 list-disc list-outside pl-5 marker:text-white/30">
            <li>Operate your account and keep you signed in.</li>
            <li>
              Deliver the core product &mdash; generate designs, draft listing
              copy, and publish listings to the third-party platforms you
              connect.
            </li>
            <li>
              Personalize trend recommendations based on the categories you
              choose.
            </li>
            <li>
              Send transactional messages (for example sign-in confirmations,
              payment receipts, and changes to your account).
            </li>
            <li>
              Measure how the product is used so we can fix bugs and improve
              the experience.
            </li>
            <li>
              Detect, investigate, and prevent fraud, abuse, and Terms
              violations.
            </li>
            <li>Comply with applicable laws and lawful requests.</li>
          </ul>
          <p className="mt-4">
            We do not sell your personal information. We do not use your
            personal information to train third-party advertising models, and
            we do not share it with advertisers.
          </p>
        </Section>

        <Section title="4. Service providers we share data with">
          <p>
            EmberPod is built on a small number of trusted infrastructure and
            product partners. Each only receives the data it needs to do its
            specific job:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-outside pl-5 marker:text-white/30">
            <li>
              <strong className="text-white">Supabase</strong> &mdash;
              authentication, database, and session storage.
            </li>
            <li>
              <strong className="text-white">Vercel</strong> &mdash; website
              and web-app hosting.
            </li>
            <li>
              <strong className="text-white">Railway</strong> &mdash; API
              backend hosting.
            </li>
            <li>
              <strong className="text-white">Stripe</strong> and{" "}
              <strong className="text-white">RevenueCat</strong> &mdash;
              payment processing and subscription management. These providers
              handle your payment card directly; we do not see or store card
              numbers.
            </li>
            <li>
              <strong className="text-white">OpenAI</strong> and{" "}
              <strong className="text-white">Ideogram</strong> &mdash; AI model
              providers that generate design images and listing copy from the
              prompts you choose. We do not send them your email, password, or
              connected-account tokens.
            </li>
            <li>
              <strong className="text-white">Etsy, Printful, and Printify</strong>{" "}
              &mdash; when you connect one of these accounts and ask us to
              take an action (for example &ldquo;publish this listing&rdquo;), we call
              their API with the OAuth token you authorized.
            </li>
            <li>
              <strong className="text-white">Analytics and crash
              reporting.</strong> We use privacy-respecting analytics (such as
              PostHog) to understand aggregate product usage and crash rates.
            </li>
          </ul>
          <p className="mt-4">
            We may also disclose information where legally required &mdash; for
            example in response to a valid subpoena, court order, or regulator
            request &mdash; or in connection with a merger, acquisition, or sale
            of all or part of our business.
          </p>
        </Section>

        <Section title="5. How long we keep your data">
          <p>
            We keep your account data for as long as your account is active. If
            you delete your account, we remove your personal information within
            30 days, except where we need to keep a limited subset to comply
            with tax, accounting, fraud-prevention, or other legal obligations
            (for example retaining invoices for the period required by tax
            law). OAuth tokens for connected third-party services are deleted
            as soon as you disconnect the integration or delete your account.
          </p>
        </Section>

        <Section title="6. Your rights and choices">
          <p>
            Depending on where you live, you may have rights under the GDPR,
            UK GDPR, California Consumer Privacy Act (CCPA/CPRA), or similar
            laws, including the right to:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-outside pl-5 marker:text-white/30">
            <li>Access the personal information we hold about you.</li>
            <li>Correct information that is inaccurate.</li>
            <li>Delete your personal information.</li>
            <li>
              Receive a copy of your data in a portable, machine-readable
              format.
            </li>
            <li>
              Object to or restrict certain processing (for example analytics).
            </li>
            <li>
              Withdraw consent where processing is based on consent, without
              affecting prior processing.
            </li>
            <li>
              Lodge a complaint with your local data-protection authority.
            </li>
          </ul>
          <p className="mt-4">
            To exercise any of these rights, email{" "}
            <a
              href="mailto:hello@ember-pod.com"
              className="text-white underline decoration-white/30 hover:decoration-white"
            >
              hello@ember-pod.com
            </a>{" "}
            from the address on your account. We will respond within the
            timeframes required by applicable law (generally 30 days).
          </p>
        </Section>

        <Section title="7. Security">
          <p>
            We use industry-standard safeguards to protect your data, including
            TLS in transit, encryption at rest for sensitive fields such as
            OAuth tokens, scoped access controls, and secure credential storage
            in the mobile app using the device&rsquo;s secure enclave (iOS
            Keychain / Android Keystore). No system is perfectly secure, and we
            cannot guarantee absolute security, but we work hard to minimize
            risk and notify affected users promptly in the event of a breach,
            as required by law.
          </p>
        </Section>

        <Section title="8. Children">
          <p>
            EmberPod is not directed to children. We do not knowingly collect
            personal information from anyone under 13 (or under 16 in the EEA
            and UK). If you believe a child has provided us with personal
            information, please contact us and we will delete it.
          </p>
        </Section>

        <Section title="9. International users">
          <p>
            EmberPod is operated from the United States. If you access the
            Service from outside the United States, you understand that your
            information will be transferred to, stored in, and processed in the
            United States, which may have data-protection laws that differ
            from those of your country. Where required, we rely on appropriate
            legal transfer mechanisms (for example the EU Standard Contractual
            Clauses) to protect your data.
          </p>
        </Section>

        <Section title="10. Changes to this policy">
          <p>
            We may update this Privacy Policy from time to time. When we do, we
            will change the &ldquo;Effective&rdquo; date at the top of this page and, for
            material changes, give you reasonable prior notice (for example by
            email or an in-app notice). Your continued use of the Service after
            the effective date means you accept the updated policy.
          </p>
        </Section>

        <Section title="11. Contact us">
          <p>
            Questions, concerns, or requests about this policy or your data can
            be sent to{" "}
            <a
              href="mailto:hello@ember-pod.com"
              className="text-white underline decoration-white/30 hover:decoration-white"
            >
              hello@ember-pod.com
            </a>
            .
          </p>
        </Section>

        <footer className="mt-20 border-t border-white/10 pt-8 text-sm text-white/40">
          <div className="flex items-center justify-between">
            <span>&copy; {new Date().getFullYear()} EmberPod</span>
            <div className="flex gap-6">
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
              <Link href="/terms" className="hover:text-white transition">
                Terms
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
      <div className="mt-4 text-white/70 leading-relaxed">{children}</div>
    </section>
  );
}
