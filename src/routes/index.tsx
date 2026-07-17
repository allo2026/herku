import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-architecture.jpg";
import interior from "@/assets/portfolio-interior-1.jpg";
import tower from "@/assets/portfolio-tower.jpg";
import chair from "@/assets/portfolio-chair.jpg";
import masterplan from "@/assets/portfolio-masterplan.jpg";
import headphones from "@/assets/portfolio-headphones.jpg";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Westford Arcline Studio — Photorealistic 3D Rendering & Visualization" },
      {
        name: "description",
        content:
          "Premium architectural visualization, real estate 3D marketing, and product CGI. Trusted by architects, developers and global brands.",
      },
      { property: "og:title", content: "Westford Arcline Studio — Photorealistic 3D Rendering" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const CLIENTS = [
  "FOSTER STUDIO", "HALDEN GROUP", "NORD & OAK", "MARREN ESTATES",
  "KOVA AUDIO", "VERDANT HOMES", "COASTLINE", "STUDIO NORTH",
  "MAISON AURUM", "ATELIER MOSS",
];

const SERVICES = [
  {
    n: "01",
    title: "Architectural Visualization",
    desc: "Transform architectural concepts into stunning photorealistic renders before construction begins.",
    items: ["Exterior Rendering", "Interior Rendering", "Masterplans", "Urban Developments", "Concept Visualization"],
    image: interior,
  },
  {
    n: "02",
    title: "Real Estate 3D Marketing",
    desc: "Marketing visuals engineered to help developers sell projects before completion.",
    items: ["Residential Projects", "Commercial Buildings", "Luxury Developments", "Marketing Campaign Assets", "Investor Presentations"],
    image: tower,
  },
  {
    n: "03",
    title: "Product 3D Rendering",
    desc: "High-end CGI for brands that need beautiful marketing visuals without expensive photography.",
    items: ["Furniture", "Consumer Products", "Electronics", "Packaging", "Lifestyle Scenes"],
    image: chair,
  },
];

const REASONS = [
  { t: "Photorealistic Quality", d: "Every frame is built to withstand editorial print scrutiny — no shortcuts, no filler." },
  { t: "Fast Turnaround", d: "A production pipeline tuned for launches, campaigns, and investor deadlines." },
  { t: "Unlimited Creative Possibilities", d: "Light, weather, materials and camera — controlled with cinematic precision." },
  { t: "Designed for Marketing & Sales", d: "Imagery framed to convert: made for brochures, campaigns and pitch decks." },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Photorealistic architectural visualization of a modern luxury villa at dusk"
            width={1920}
            height={1200}
            className="h-full w-full object-cover reveal-img"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/60" />
        </div>

        <div className="relative z-10 container-x pt-32 md:pt-40 pb-16 min-h-[100svh] flex flex-col justify-end text-white">
          <div className="max-w-5xl">
            <p className="eyebrow !text-white/70 fade-up" style={{ animationDelay: "120ms" }}>
              Westford Arcline Studio — Est. 2016
            </p>
            <h1
              className="display-xxl mt-6 text-white fade-up"
              style={{ animationDelay: "220ms" }}
            >
              Photorealistic 3D<br />visualizations that<br />bring ideas to life.
            </h1>
            <p
              className="mt-8 max-w-2xl text-base md:text-lg text-white/80 leading-relaxed fade-up"
              style={{ animationDelay: "420ms" }}
            >
              We create premium architectural visualization, real estate marketing imagery, and product CGI that helps
              businesses communicate ideas, attract buyers, and accelerate sales.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 fade-up" style={{ animationDelay: "560ms" }}>
              <Link to="/contact" className="btn-primary !bg-white !text-black hover:!bg-white/90">
                Request a Quote <span aria-hidden>→</span>
              </Link>
              <Link
                to="/portfolio"
                className="btn-ghost !border-white/40 !text-white hover:!bg-white hover:!text-black"
              >
                View Portfolio
              </Link>
            </div>
          </div>

          <div className="mt-16 flex items-end justify-between text-xs text-white/60 fade-up" style={{ animationDelay: "700ms" }}>
            <div className="flex items-center gap-2">
              <span className="inline-block h-px w-8 bg-white/50" />
              <span>Scroll</span>
            </div>
            <div className="hidden md:flex gap-10">
              <div>
                <p className="text-3xl text-white font-medium">240+</p>
                <p>Projects delivered</p>
              </div>
              <div>
                <p className="text-3xl text-white font-medium">37</p>
                <p>Countries served</p>
              </div>
              <div>
                <p className="text-3xl text-white font-medium">2 yrs</p>
                <p>In production</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="py-16 md:py-20 border-b border-border overflow-hidden">
        <p className="text-center eyebrow mb-10">Trusted by Architects, Developers &amp; Product Brands</p>
        <div className="relative overflow-hidden">
          <div className="flex marquee-track w-max gap-16 whitespace-nowrap opacity-70">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span key={i} className="text-lg md:text-xl tracking-[0.25em] text-muted-foreground">
                {c}
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
        </div>
      </section>

      {/* INTRO STATEMENT */}
      <section className="container-x py-28 md:py-40">
        <div className="grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-3">
            <p className="eyebrow">— The Studio</p>
          </Reveal>
          <Reveal className="lg:col-span-9" delay={120}>
            <h2 className="display-xl max-w-4xl">
              We build imagery that sells buildings, launches products, and lets architecture be understood before a single
              stone is set.
            </h2>
            <div className="mt-14 grid md:grid-cols-2 gap-10 max-w-4xl text-muted-foreground text-base leading-relaxed">
              <p>
                Westford Arcline Studio is a specialist visualization practice serving architects, developers and global product
                brands. Every image is composed like a photograph — with attention to light, lens, and the story the frame is
                asked to tell.
              </p>
              <p>
                We are technical enough to work directly from CAD, Revit and Rhino, and disciplined enough to deliver on the
                timelines campaigns and sales cycles demand.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="border-t border-border bg-surface">
        <div className="container-x py-24 md:py-32">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <Reveal>
              <p className="eyebrow mb-4">Services</p>
              <h2 className="display-lg max-w-2xl">A focused practice, three disciplines.</h2>
            </Reveal>
            <Reveal delay={140}>
              <Link to="/services" className="btn-ghost">All services</Link>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <Reveal key={s.n} delay={i * 120}>
                <Link
                  to="/services"
                  className="group block rounded-[14px] overflow-hidden border border-border bg-background transition-all duration-500 hover:shadow-[var(--shadow-hover)] hover:-translate-y-1"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <span className="eyebrow">{s.n}</span>
                      <span className="text-xs text-muted-foreground transition-transform duration-500 group-hover:translate-x-1">→</span>
                    </div>
                    <h3 className="text-2xl tracking-[-0.02em] mb-3">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{s.desc}</p>
                    <ul className="space-y-2 border-t border-border pt-6 text-sm">
                      {s.items.map((it) => (
                        <li key={it} className="flex items-center justify-between">
                          <span>{it}</span>
                          <span className="text-muted-foreground text-xs">·</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="container-x py-28 md:py-36">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <Reveal>
            <p className="eyebrow mb-4">Selected Work</p>
            <h2 className="display-lg max-w-2xl">Recent frames from the studio.</h2>
          </Reveal>
          <Reveal delay={140}>
            <Link to="/portfolio" className="btn-ghost">Full portfolio</Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <Reveal className="col-span-12 md:col-span-7">
            <FeatureTile image={masterplan} title="Vellis Masterplan" tag="Real Estate" ratio="aspect-[16/10]" />
          </Reveal>
          <Reveal className="col-span-12 md:col-span-5" delay={120}>
            <FeatureTile image={headphones} title="Onyx Headphones" tag="Products" ratio="aspect-[16/10]" />
          </Reveal>
          <Reveal className="col-span-12 md:col-span-5" delay={80}>
            <FeatureTile image={interior} title="Atelier Interior" tag="Architecture" ratio="aspect-[16/10]" />
          </Reveal>
          <Reveal className="col-span-12 md:col-span-7" delay={200}>
            <FeatureTile image={tower} title="Meridian Tower" tag="Real Estate" ratio="aspect-[16/10]" />
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-y border-border bg-surface">
        <div className="container-x py-24 md:py-32">
          <Reveal>
            <p className="eyebrow mb-4">Process</p>
            <h2 className="display-lg max-w-3xl">Four disciplined steps from brief to final frame.</h2>
          </Reveal>

          <div className="mt-16 grid md:grid-cols-4 gap-10">
            {[
              { n: "01", t: "Discovery", d: "Brief, references, program and creative direction. We agree on frames before we render." },
              { n: "02", t: "Modeling", d: "CAD, Revit or Rhino translated into a scene resolved down to trim and material weight." },
              { n: "03", t: "Rendering", d: "Lighting, lens, atmosphere. Iterated until the frame reads as photography, not CGI." },
              { n: "04", t: "Delivery", d: "Print-ready master files with tuned crops for campaigns, brochures and web." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="pt-8 border-t border-foreground/80">
                  <p className="text-sm">{s.n}</p>
                  <h3 className="mt-8 text-xl tracking-[-0.02em]">{s.t}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-14">
            <Link to="/process" className="btn-ghost">Read the full process</Link>
          </Reveal>
        </div>
      </section>

      {/* WHY */}
      <section className="container-x py-28 md:py-36">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Why Westford Arcline</p>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={120}>
            <h2 className="display-lg max-w-3xl">Built for teams that ship — with imagery that holds up on billboards and boardrooms.</h2>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {REASONS.map((r, i) => (
            <Reveal key={r.t} delay={i * 100}>
              <div className="h-full rounded-[14px] border border-border p-8 md:p-10 bg-background transition-colors duration-500 hover:bg-surface">
                <div className="mb-16 text-xs text-muted-foreground">0{i + 1}</div>
                <h3 className="text-xl tracking-[-0.02em] mb-3">{r.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="bg-foreground text-background">
        <div className="container-x py-24 md:py-40">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <Reveal className="lg:col-span-8">
              <p className="eyebrow !text-background/60 mb-6">Start your project</p>
              <h2 className="display-xl">
                Ready to see it<br />before it exists?
              </h2>
            </Reveal>
            <Reveal className="lg:col-span-4" delay={140}>
              <p className="text-background/70 mb-8 max-w-md">
                Share your brief and we'll return with a proposal, timeline and reference frames within two business days.
              </p>
              <Link
                to="/contact"
                className="btn-primary !bg-background !text-foreground hover:!bg-background/90"
              >
                Request a Quote <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function FeatureTile({ image, title, tag, ratio }: { image: string; title: string; tag: string; ratio: string }) {
  return (
    <div className="group relative overflow-hidden rounded-[14px] border border-border">
      <div className={ratio + " overflow-hidden"}>
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex items-end justify-between bg-gradient-to-t from-black/60 via-black/10 to-transparent text-white">
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-white/75">{tag}</p>
          <h3 className="mt-1 text-xl md:text-2xl tracking-[-0.02em]">{title}</h3>
        </div>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">→</span>
      </div>
    </div>
  );
}
