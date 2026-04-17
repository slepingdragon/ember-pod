import WaitlistForm from "@/components/WaitlistForm";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <div className="ambient" />
      <div className="noise" />
      <ScrollReveal />

      {/* ========================= NAV ========================= */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="mx-auto max-w-7xl px-6 mt-4">
          <nav className="glass rounded-2xl px-5 py-3 flex items-center justify-between">
            <a href="#" className="flex items-center gap-2 group">
              <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white text-black font-black text-sm">
                E
              </span>
              <span className="text-[15px] font-semibold tracking-tight">EmberPod</span>
            </a>
            <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
              <a href="#how" className="hover:text-white transition">How it works</a>
              <a href="#why" className="hover:text-white transition">Why EmberPod</a>
              <a href="#faq" className="hover:text-white transition">FAQ</a>
            </div>
            <a href="#waitlist" className="btn-primary rounded-full px-4 py-2 text-sm font-semibold">
              Join waitlist
            </a>
          </nav>
        </div>
      </header>

      {/* ========================= HERO ========================= */}
      <section className="relative pt-40 pb-28 md:pt-48 md:pb-40">
        <div className="grid-lines" />
        <div className="relative mx-auto max-w-7xl px-6 z-10">
          <div className="flex flex-col items-center text-center">
            <div className="glass rounded-full pl-2 pr-4 py-1.5 flex items-center gap-2 text-xs text-white/70">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white dot" />
              <span className="font-medium">Now accepting early access</span>
              <span className="text-white/30">•</span>
              <span>Limited spots</span>
            </div>

            <h1 className="mt-8 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tightest leading-[0.95] grad-text max-w-5xl">
              The easiest way<br />
              to start a print-
              <br className="md:hidden" />
              on-demand store.
            </h1>

            <p className="mt-8 max-w-2xl text-lg md:text-xl text-white/60 leading-relaxed">
              AI picks what&apos;s trending, designs your products, and lists them on Etsy for you.
              Your first shop — live in <span className="text-white font-semibold">10 minutes</span>.
            </p>

            <div id="waitlist" className="mt-10 w-full max-w-lg scroll-mt-32">
              <WaitlistForm />
            </div>

            <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <span className="inline-block h-1 w-1 rounded-full bg-white/60" /> 10-minute setup
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-1 w-1 rounded-full bg-white/60" /> Zero design skills needed
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-1 w-1 rounded-full bg-white/60" /> Etsy + Printful ready
              </div>
            </div>
          </div>

          {/* Phone mockups */}
          <div className="mt-24 relative flex items-end justify-center gap-4 sm:gap-8 reveal">
            {/* Left phone */}
            <div className="hidden md:block floaty" style={{ animationDelay: "-2s" }}>
              <div className="glass rounded-[2.2rem] p-3 w-56 h-[440px] relative">
                <div className="h-full w-full rounded-[1.6rem] bg-ink-900 border border-white/10 p-4 flex flex-col">
                  <div className="text-[10px] uppercase tracking-widest text-white/40">Trending now</div>
                  <div className="mt-3 space-y-2">
                    <div className="glass rounded-lg p-3 text-left">
                      <div className="text-xs text-white/50">#1</div>
                      <div className="text-sm font-semibold">Pickleball dads</div>
                      <div className="mt-1 flex gap-1">
                        <span className="h-1 w-8 rounded bg-white/80" />
                        <span className="h-1 w-4 rounded bg-white/20" />
                      </div>
                    </div>
                    <div className="glass rounded-lg p-3 text-left">
                      <div className="text-xs text-white/50">#2</div>
                      <div className="text-sm font-semibold">Matcha culture</div>
                      <div className="mt-1 flex gap-1">
                        <span className="h-1 w-6 rounded bg-white/70" />
                        <span className="h-1 w-6 rounded bg-white/20" />
                      </div>
                    </div>
                    <div className="glass rounded-lg p-3 text-left">
                      <div className="text-xs text-white/50">#3</div>
                      <div className="text-sm font-semibold">Retro sci-fi</div>
                      <div className="mt-1 flex gap-1">
                        <span className="h-1 w-5 rounded bg-white/60" />
                        <span className="h-1 w-7 rounded bg-white/20" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center phone */}
            <div className="floaty">
              <div className="glass-strong rounded-[2.6rem] p-3 w-64 sm:w-72 h-[520px] relative shadow-2xl shadow-black">
                <div className="h-full w-full rounded-[2rem] bg-ink-950 border border-white/10 p-5 flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] uppercase tracking-widest text-white/40">Swipe designs</div>
                    <div className="text-[10px] text-white/30">3 of 8</div>
                  </div>
                  <div className="mt-4 flex-1 rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[.02] relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-white/30 text-xs">
                      design preview
                    </div>
                    <div className="absolute top-3 right-3 h-6 px-2 rounded-full glass text-[10px] flex items-center gap-1">
                      <span className="h-1 w-1 rounded-full bg-white" /> trending
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-5">
                    <button className="h-11 w-11 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:bg-white/5 transition">
                      ✕
                    </button>
                    <button className="h-14 w-14 rounded-full bg-white text-black flex items-center justify-center text-xl font-bold">
                      ♥
                    </button>
                    <button className="h-11 w-11 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:bg-white/5 transition">
                      ↻
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right phone */}
            <div className="hidden md:block floaty" style={{ animationDelay: "-4s" }}>
              <div className="glass rounded-[2.2rem] p-3 w-56 h-[440px] relative">
                <div className="h-full w-full rounded-[1.6rem] bg-ink-900 border border-white/10 p-4 flex flex-col">
                  <div className="text-[10px] uppercase tracking-widest text-white/40">Ready to publish</div>
                  <div className="mt-3 rounded-lg border border-white/10 bg-white/[.03] p-3 text-left flex-1">
                    <div className="text-[11px] text-white/40">Title</div>
                    <div className="text-[13px] font-semibold leading-snug mt-1">
                      Pickleball Dad Club — Funny Sport Tee Gift
                    </div>
                    <div className="mt-3 text-[11px] text-white/40">Tags</div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {["pickleball", "dad gift", "funny tee", "sport", "fathers day"].map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="mt-3 w-full rounded-lg bg-white text-black py-2.5 text-xs font-semibold">
                    Publish to Etsy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= LOGO STRIP ========================= */}
      <section className="relative py-10 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-white/40">
            Built on the platforms you already trust
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-14 gap-y-4 text-white/50">
            <span className="text-xl font-semibold tracking-tight">Etsy</span>
            <span className="text-white/20">·</span>
            <span className="text-xl font-semibold tracking-tight">Printful</span>
            <span className="text-white/20">·</span>
            <span className="text-xl font-semibold tracking-tight">Printify</span>
            <span className="text-white/20">·</span>
            <span className="text-xl font-semibold tracking-tight">Shopify</span>
            <span className="text-white/20">·</span>
            <span className="text-xl font-semibold tracking-tight">Stripe</span>
          </div>
        </div>
      </section>

      {/* ========================= PROBLEM ========================= */}
      <section className="relative py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">The problem</p>
            <h2 className="mt-4 text-4xl md:text-6xl font-black tracking-tightest leading-[1.05] grad-text">
              Starting a POD store<br /> is too complicated.
            </h2>
            <p className="mt-6 text-white/60 text-lg max-w-2xl">
              Today&apos;s tools were built for power users — not for someone who&apos;s never sold
              anything online. Steep learning curves. Too many tabs. Too much jargon.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-5">
            <div className="glass rounded-2xl p-7 reveal">
              <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 6h16M4 12h10M4 18h16" />
                </svg>
              </div>
              <h3 className="mt-5 text-xl font-semibold">Too many tools.</h3>
              <p className="mt-2 text-white/55 text-[15px] leading-relaxed">
                Design software, mockup generators, Etsy dashboards, Printful, tag tools — your day
                disappears into tabs.
              </p>
            </div>
            <div className="glass rounded-2xl p-7 reveal">
              <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M9 10h.01M15 10h.01M8.5 15a4 4 0 0 1 7 0" />
                </svg>
              </div>
              <h3 className="mt-5 text-xl font-semibold">Design is intimidating.</h3>
              <p className="mt-2 text-white/55 text-[15px] leading-relaxed">
                You shouldn&apos;t need Photoshop, a tablet, or ten years of taste to launch your first product.
              </p>
            </div>
            <div className="glass rounded-2xl p-7 reveal">
              <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>
              <h3 className="mt-5 text-xl font-semibold">Listings take forever.</h3>
              <p className="mt-2 text-white/55 text-[15px] leading-relaxed">
                Writing titles, picking 13 tags, sizing mockups, linking fulfillment — hours per product.
                Every. Single. Time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= HOW IT WORKS ========================= */}
      <section id="how" className="relative py-28 md:py-36 border-t border-white/5 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">How it works</p>
            <h2 className="mt-4 text-4xl md:text-6xl font-black tracking-tightest leading-[1.05] grad-text max-w-3xl">
              Three taps.<br className="md:hidden" /> One live listing.
            </h2>
            <p className="mt-6 text-white/60 text-lg max-w-2xl">
              We flipped the workflow. Start with what&apos;s trending — end with a live product.
              No blank canvas. No guesswork.
            </p>
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-5 relative">
            <div className="hidden md:block absolute top-[88px] left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {[
              {
                step: "01",
                n: "1",
                title: "We show what's trending.",
                body: "Our trend engine combines Google Trends, Amazon autocomplete, and marketplace data into one score. Pick a niche that's about to pop.",
              },
              {
                step: "02",
                n: "2",
                title: "AI designs your products.",
                body: "Swipe through original AI-generated designs, Tinder-style. Keep what you love. Regenerate anything you don't.",
              },
              {
                step: "03",
                n: "3",
                title: "One tap publishes.",
                body: "Title, description, 13 tags, mockups, fulfillment — all drafted and wired. Review, tap publish. Done.",
              },
            ].map((s) => (
              <div key={s.step} className="glass rounded-2xl p-8 relative reveal">
                <div className="absolute -top-4 left-8 glass-strong rounded-full px-3 py-1 text-[11px] tracking-widest uppercase text-white/70">
                  Step {s.step}
                </div>
                <div className="h-14 w-14 rounded-2xl bg-white text-black flex items-center justify-center text-2xl font-black">
                  {s.n}
                </div>
                <h3 className="mt-6 text-2xl font-bold">{s.title}</h3>
                <p className="mt-3 text-white/55 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= WHY EMBERPOD ========================= */}
      <section id="why" className="relative py-28 md:py-36 border-t border-white/5 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Why EmberPod</p>
            <h2 className="mt-4 text-4xl md:text-6xl font-black tracking-tightest leading-[1.05] grad-text">
              Every other POD tool<br /> was built for pros.
            </h2>
            <p className="mt-6 text-white/60 text-lg max-w-2xl">
              We built EmberPod for the opposite person — someone brilliant who&apos;s never sold a thing online. Yet.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-5">
            <div className="glass rounded-2xl p-8 reveal">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 12l3-9 3 13 3-7 3 5 3-3 3 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Trend-first, not design-first.</h3>
              </div>
              <p className="mt-4 text-white/55 leading-relaxed">
                Most tools ask &quot;what do you want to sell?&quot; We tell you what&apos;s about to sell — backed by real search data.
              </p>
            </div>
            <div className="glass rounded-2xl p-8 reveal">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="6" y="2" width="12" height="20" rx="3" />
                    <path d="M10 19h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Actually mobile-first.</h3>
              </div>
              <p className="mt-4 text-white/55 leading-relaxed">
                Swipe designs from your couch. Publish from your phone. Not a desktop app squeezed into mobile — a mobile product, from day one.
              </p>
            </div>
            <div className="glass rounded-2xl p-8 reveal">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Legit, by design.</h3>
              </div>
              <p className="mt-4 text-white/55 leading-relaxed">
                Official Etsy, Printful, and Printify APIs. No sketchy browser automation. Your accounts are never at risk.
              </p>
            </div>
            <div className="glass rounded-2xl p-8 reveal">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 3v18M3 12h18" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Zero jargon.</h3>
              </div>
              <p className="mt-4 text-white/55 leading-relaxed">
                No &quot;BSR,&quot; no &quot;royalty tiers,&quot; no &quot;variant SKUs.&quot; We translate every step into plain English — and hide what you don&apos;t need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= BIG QUOTE ========================= */}
      <section className="relative py-28 md:py-36 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">Built for beginners</p>
          <blockquote className="mt-8 text-3xl sm:text-4xl md:text-5xl font-black tracking-tightest leading-[1.15] grad-text">
            &ldquo;If you&apos;ve never sold anything online,
            <br className="hidden md:block" /> EmberPod is where you start.&rdquo;
          </blockquote>
          <p className="mt-8 text-white/50 text-lg">
            No side-gig experience required. No creative background required. Just an idea and ten minutes.
          </p>
        </div>
      </section>

      {/* ========================= FAQ ========================= */}
      <section id="faq" className="relative py-28 md:py-36 border-t border-white/5 scroll-mt-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">FAQ</p>
            <h2 className="mt-4 text-4xl md:text-6xl font-black tracking-tightest leading-[1.05] grad-text">
              Answers, upfront.
            </h2>
          </div>

          <div className="mt-14 space-y-3">
            {[
              {
                q: "Do I need design skills?",
                a: "Not a bit. Our AI generates original artwork based on the niche you pick. You swipe through concepts until you find ones you love.",
              },
              {
                q: "Do I need an Etsy shop already?",
                a: "Nope. If you don't have one, we walk you through creating one in about two minutes, right inside onboarding.",
              },
              {
                q: "How much will it cost?",
                a: "A free plan lets you ship your first listings. Paid plans unlock more AI generations, more listings, and trend analytics. No surprise auto-renewals — we'll email you before we charge anything.",
              },
              {
                q: "Is this TOS-compliant?",
                a: "Yes. EmberPod uses the official Etsy Open API v3 and approved POD partner APIs (Printful, Printify). No browser hijacking, no account risk.",
              },
              {
                q: "When can I start?",
                a: "Early access opens soon. Join the waitlist and we'll let you in as spots free up.",
              },
            ].map((item) => (
              <details key={item.q} className="glass rounded-2xl p-6 group">
                <summary className="flex items-center justify-between">
                  <span className="text-lg font-semibold">{item.q}</span>
                  <span className="chev text-2xl text-white/50">+</span>
                </summary>
                <p className="mt-4 text-white/60 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= FINAL CTA ========================= */}
      <section className="relative py-28 md:py-40 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative glass-strong rounded-[2rem] p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 grid-lines opacity-60" />
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-black tracking-tightest leading-[1.05] grad-text">
                Your first store,<br /> live in ten minutes.
              </h2>
              <p className="mt-6 text-white/60 text-lg max-w-xl mx-auto">
                Be first in line when EmberPod opens. We&apos;ll email you the moment it&apos;s ready.
              </p>
              <div className="mt-10 max-w-lg mx-auto">
                <WaitlistForm variant="final" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= FOOTER ========================= */}
      <footer className="relative border-t border-white/5 py-12">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white text-black font-black text-sm">
              E
            </span>
            <span className="text-sm font-semibold tracking-tight">EmberPod</span>
            <span className="text-white/30">·</span>
            <span className="text-xs text-white/40">© 2026. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/50">
            <a href="mailto:hello@ember-pod.com" className="hover:text-white transition">
              hello@ember-pod.com
            </a>
            <a href="/privacy" className="hover:text-white transition">Privacy</a>
            <a href="/terms" className="hover:text-white transition">Terms</a>
          </div>
        </div>
      </footer>
    </>
  );
}
