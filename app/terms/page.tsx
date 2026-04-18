import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms — EmberPod",
  description: "The terms that govern your use of EmberPod.",
};

const EFFECTIVE_DATE = "April 18, 2026";

export default function Terms() {
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
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-white/40">
            Effective {EFFECTIVE_DATE}
          </p>
        </header>

        <section className="mt-10 text-white/70 leading-relaxed">
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) are a binding agreement between
            you and EmberPod (&ldquo;EmberPod,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). They
            govern your access to and use of the EmberPod website at{" "}
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
            By creating an account, joining the waitlist, or otherwise using
            the Service, you agree to these Terms and to our{" "}
            <Link
              href="/privacy"
              className="text-white underline decoration-white/30 hover:decoration-white"
            >
              Privacy Policy
            </Link>
            . If you do not agree, do not use the Service.
          </p>
        </section>

        <Section title="1. Eligibility">
          <p>
            You must be at least 18 years old (or the age of majority in your
            jurisdiction) to use EmberPod. By using the Service, you represent
            that you are and that you have the legal capacity to enter into
            these Terms. The Service is intended for use by individuals and
            small businesses engaged in lawful commerce.
          </p>
        </Section>

        <Section title="2. Your account">
          <p>
            You are responsible for the accuracy of the information on your
            account, for keeping your password secure, and for all activity
            that occurs under your account. Notify us immediately at{" "}
            <a
              href="mailto:hello@ember-pod.com"
              className="text-white underline decoration-white/30 hover:decoration-white"
            >
              hello@ember-pod.com
            </a>{" "}
            if you suspect unauthorized access. We may suspend or terminate
            accounts that we believe have been compromised or used in violation
            of these Terms.
          </p>
        </Section>

        <Section title="3. What EmberPod does">
          <p>
            EmberPod helps you create and publish print-on-demand products. The
            Service can generate artwork and listing copy, connect to
            third-party commerce and fulfillment platforms (for example Etsy,
            Printful, and Printify) via authenticated APIs, and publish
            listings on your behalf after you review and approve them. The
            specific features available to you depend on your plan, the
            accounts you connect, and the current stage of product rollout.
          </p>
        </Section>

        <Section title="4. Third-party platforms">
          <p>
            EmberPod relies on external services that you separately agree to
            when you connect them &mdash; including, without limitation, Etsy,
            Printful, Printify, Stripe, Apple App Store, and Google Play. Your
            use of those services is governed by their own terms and policies.
          </p>
          <p className="mt-4">
            <strong className="text-white">We are not responsible for
            decisions, actions, outages, price changes, suspensions,
            deactivations, or refund policies of those third parties.</strong>{" "}
            For example, if Etsy suspends your shop, Printful cancels an
            order, or a payment is declined by your bank, EmberPod cannot
            override that decision. You are responsible for complying with the
            terms of every platform you connect.
          </p>
        </Section>

        <Section title="5. Your content and licenses">
          <p>
            You keep ownership of any artwork, photos, text, or other content
            you upload to the Service (&ldquo;Your Content&rdquo;). To operate the
            Service, you grant EmberPod a worldwide, non-exclusive,
            royalty-free license to host, store, copy, reformat, display, and
            transmit Your Content solely so we can provide the Service to you
            &mdash; for example, to upload artwork to a connected
            print-on-demand provider or to show a preview of your listing in
            the app.
          </p>
          <p className="mt-4">
            You represent that you have all rights necessary to upload Your
            Content and to grant the license above, and that Your Content does
            not infringe anyone else&rsquo;s rights or violate any law.
          </p>
        </Section>

        <Section title="6. AI-generated content">
          <p>
            EmberPod can generate designs, titles, descriptions, and tags using
            third-party AI models. Outputs are produced on demand based on the
            prompts and preferences you provide. As between you and EmberPod,
            you may use AI-generated outputs for your own commercial
            print-on-demand listings, subject to these Terms and the terms of
            the underlying AI providers.
          </p>
          <p className="mt-4">
            <strong className="text-white">You are responsible for the
            outputs you choose to publish.</strong> AI models can produce
            content that coincidentally resembles an existing work, infringes
            a trademark, or violates a third-party platform&rsquo;s rules.
            EmberPod makes no guarantee that an output is original, unique,
            non-infringing, or eligible for copyright or trademark
            registration. Review every output before you publish it, and do
            not upload outputs you are not permitted to use.
          </p>
        </Section>

        <Section title="7. Acceptable use">
          <p>You agree not to use the Service to:</p>
          <ul className="mt-3 space-y-2 list-disc list-outside pl-5 marker:text-white/30">
            <li>
              Violate any law or regulation, or any third party&rsquo;s rights
              &mdash; including intellectual-property rights, publicity
              rights, and privacy rights.
            </li>
            <li>
              Upload or generate content that is infringing, defamatory,
              obscene, sexually explicit involving minors, hateful, harassing,
              or that glorifies violence.
            </li>
            <li>
              Circumvent or attempt to circumvent the terms of any connected
              third-party platform (for example by publishing counterfeit,
              trademarked, or prohibited designs on Etsy).
            </li>
            <li>
              Reverse-engineer, decompile, scrape, or attempt to extract the
              source code of the Service, except as permitted by law.
            </li>
            <li>
              Use the Service to send spam, malware, or unsolicited
              advertising.
            </li>
            <li>
              Interfere with, disrupt, or overload the Service or any
              connected platform.
            </li>
            <li>
              Share a single account with multiple people, resell access, or
              use the Service to build a competing product.
            </li>
          </ul>
          <p className="mt-4">
            We may remove content, suspend features, or terminate accounts
            that we reasonably believe violate these rules.
          </p>
        </Section>

        <Section title="8. Fees, subscriptions, and credits">
          <p>
            Some features of EmberPod require a paid plan or consumable
            credits. Pricing is disclosed in the app and on our website before
            you are charged. Subscriptions automatically renew on the cycle you
            select (monthly or yearly) until you cancel, and you can cancel at
            any time from your account settings &mdash; cancellation takes
            effect at the end of the current billing period.
          </p>
          <p className="mt-4">
            Payments made through Apple App Store are handled by Apple and are
            subject to Apple&rsquo;s refund rules. Payments made through
            Google Play are handled by Google and are subject to Google&rsquo;s
            refund rules. Payments made on the web are handled by Stripe.
            Except where required by law, fees are non-refundable and unused
            credits expire in accordance with the plan you purchased.
          </p>
        </Section>

        <Section title="9. Trials, betas, and early access">
          <p>
            Features marked as beta, preview, or early access are provided on
            an &ldquo;as is&rdquo; basis and may be changed or removed at any time. We
            may collect additional telemetry on these features to improve
            them. Do not rely on a beta feature for anything mission-critical.
          </p>
        </Section>

        <Section title="10. Intellectual property of EmberPod">
          <p>
            The Service &mdash; including the EmberPod name, logo, app, UI,
            website copy, and underlying software &mdash; is owned by EmberPod
            and is protected by copyright, trademark, and other laws. These
            Terms do not grant you any right to use the EmberPod name or logo
            outside of your permitted use of the Service.
          </p>
        </Section>

        <Section title="11. Termination">
          <p>
            You can close your account at any time from your account settings
            or by emailing us. We can suspend or terminate your account if you
            breach these Terms, if we are legally required to, or if we stop
            offering the Service in your region. On termination, your license
            to use the Service ends, and we will delete your data as described
            in the Privacy Policy.
          </p>
        </Section>

        <Section title="12. Disclaimers">
          <p>
            The Service is provided <strong className="text-white">&ldquo;as is&rdquo;
            and &ldquo;as available&rdquo;</strong> without warranties of any kind, whether
            express or implied, including without limitation warranties of
            merchantability, fitness for a particular purpose, non-infringement,
            and any warranty arising out of course of dealing or usage of
            trade. EmberPod does not warrant that the Service will be
            uninterrupted, error-free, or that any AI-generated content will
            meet your expectations or be non-infringing.
          </p>
        </Section>

        <Section title="13. Limitation of liability">
          <p>
            To the fullest extent permitted by law, EmberPod and its
            affiliates, officers, employees, and agents will not be liable for
            any indirect, incidental, special, consequential, exemplary, or
            punitive damages, or for any loss of profits, revenue, goodwill,
            data, or business opportunities, arising out of or relating to your
            use of the Service &mdash; even if we have been advised of the
            possibility of such damages.
          </p>
          <p className="mt-4">
            Our total cumulative liability for any claim arising out of or
            relating to the Service is limited to the greater of (a) the fees
            you paid to EmberPod in the 12 months before the claim arose, or
            (b) US $100. Some jurisdictions do not allow certain limitations,
            so some of the above may not apply to you.
          </p>
        </Section>

        <Section title="14. Indemnification">
          <p>
            You agree to defend, indemnify, and hold EmberPod harmless from any
            claim, loss, damage, or expense (including reasonable attorneys&rsquo;
            fees) arising out of (a) Your Content, (b) your use of the
            Service, (c) your violation of these Terms, or (d) your violation
            of any third-party right, including the terms of any platform you
            connect.
          </p>
        </Section>

        <Section title="15. Governing law and disputes">
          <p>
            These Terms are governed by the laws of the State of Delaware,
            United States, without regard to its conflict-of-laws rules. Any
            dispute arising out of or relating to these Terms or the Service
            will be resolved exclusively in the state or federal courts
            located in Delaware, and you consent to personal jurisdiction
            there. Nothing in this section prevents either party from seeking
            injunctive relief in any court of competent jurisdiction to
            protect its intellectual-property rights.
          </p>
          <p className="mt-4">
            If you are a consumer located in the European Union, United
            Kingdom, or another jurisdiction whose laws give you the benefit
            of the courts of your home country, nothing in these Terms
            overrides those rights.
          </p>
        </Section>

        <Section title="16. Changes to these Terms">
          <p>
            We may update these Terms from time to time. When we do, we will
            change the &ldquo;Effective&rdquo; date above and, for material changes, give
            you reasonable prior notice (for example by email or an in-app
            notice). Your continued use of the Service after the effective
            date means you accept the updated Terms.
          </p>
        </Section>

        <Section title="17. Contact">
          <p>
            Questions about these Terms can be sent to{" "}
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
              <Link href="/privacy" className="hover:text-white transition">
                Privacy
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
