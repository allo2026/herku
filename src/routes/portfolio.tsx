import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { WORKS, type Category } from "@/lib/portfolio-data";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Architectural, Real Estate & Product CGI | Westford Arcline" },
      {
        name: "description",
        content:
          "Selected 3D visualization work across architecture, real estate marketing and product rendering.",
      },
      { property: "og:title", content: "Portfolio — Westford Arcline Studio" },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: PortfolioPage,
});

const FILTERS: ("All" | Category)[] = ["All", "Architecture", "Real Estate", "Products"];

function PortfolioPage() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");

  const items = useMemo(
    () => (active === "All" ? WORKS : WORKS.filter((w) => w.category === active)),
    [active]
  );

  return (
    <>
      <section className="container-x pt-40 md:pt-48 pb-16">
        <Reveal>
          <p className="eyebrow mb-6">Portfolio</p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="display-xxl max-w-5xl">Selected work,<br />precisely composed.</h1>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-10 max-w-2xl text-muted-foreground text-lg leading-relaxed">
            A curated archive of recent projects — architectural visualization, real estate campaigns, and product CGI
            produced for studios, developers and global brands.
          </p>
        </Reveal>
      </section>

      <section className="border-y border-border sticky top-16 md:top-20 z-30 bg-background/85 backdrop-blur-xl">
        <div className="container-x flex items-center gap-2 md:gap-3 overflow-x-auto py-4">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`whitespace-nowrap rounded-full px-5 py-2 text-[13px] transition-all duration-300 border ${
                active === f
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-foreground border-border hover:border-foreground"
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-xs text-muted-foreground hidden md:inline">
            {items.length} projects
          </span>
        </div>
      </section>

      <section className="container-x py-16 md:py-24">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 [column-fill:_balance]">
          {items.map((w, i) => (
            <Reveal
              key={w.id}
              delay={(i % 6) * 60}
              className="mb-4 md:mb-6 break-inside-avoid"
            >
              <figure className="group relative overflow-hidden rounded-[14px] border border-border bg-surface">
                <div className={
                  w.span === "tall" ? "aspect-[4/5]" :
                  w.span === "wide" ? "aspect-[16/10]" :
                  "aspect-[1/1]"
                }>
                  <img
                    src={w.image}
                    alt={`${w.title} — ${w.category} CGI`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.05]"
                  />
                </div>
                <figcaption className="absolute inset-0 flex items-end p-6 md:p-8 text-white bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div>
                    <p className="text-[11px] tracking-[0.2em] uppercase text-white/70">
                      {w.category} · {w.year}
                    </p>
                    <p className="mt-1 text-xl tracking-[-0.02em]">{w.title}</p>
                    <p className="text-sm text-white/70">{w.client}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
