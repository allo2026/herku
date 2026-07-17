import { createFileRoute, Link } from "@tanstack/react-router";
import interior from "@/assets/portfolio-interior-1.jpg";
import tower from "@/assets/portfolio-tower.jpg";
import chair from "@/assets/portfolio-chair.jpg";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Architectural, Real Estate & Product CGI | Westford Arcline" },
      {
        name: "description",
        content:
          "Three focused disciplines: architectural visualization, real estate 3D marketing, and product 3D rendering — engineered for enterprise clients.",
      },
      { property: "og:title", content: "Services — Westford Arcline Studio" },
      { property: "og:description", content: "Architectural visualization, real estate 3D marketing, and product CGI." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const SERVICES = [
  {
    n: "01",
    title: "Architectural Visualization",
    lead:
      "Transform architectural concepts into stunning photorealistic renders before construction begins.",
    items: ["Exterior Rendering", "Interior Rendering", "Masterplans", "Urban Developments", "Concept Visualization"],
    image: interior,
  },
  {
    n: "02",
    title: "Real Estate 3D Marketing",
    lead:
      "Marketing visuals designed to help developers sell projects before completion — from off-plan units to entire masterplans.",
    items: ["Residential Projects", "Commercial Buildings", "Luxury Developments", "Marketing Campaign Assets", "Investor Presentations"],
    image: tower,
  },
  {
    n: "03",
    title: "Product 3D Rendering",
    lead:
      "High-end CGI for brands that need beautiful marketing visuals without the cost and logistics of physical photography.",
    items: ["Furniture", "Consumer Products", "Electronics", "Packaging", "Lifestyle Scenes"],
    image: chair,
  },
];

function ServicesPage() {
  return (
    <>
      <section className="container-x pt-40 md:pt-48 pb-20">
        <Reveal>
          <p className="eyebrow mb-6">Services</p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="display-xxl max-w-5xl">
            A focused practice.<br />Three disciplines.
          </h1>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-10 max-w-2xl text-muted-foreground text-lg leading-relaxed">
            We keep our practice narrow so our craft can stay deep. Every project falls within one of three
            disciplines — each supported by a dedicated team and a purpose-built pipeline.
          </p>
        </Reveal>
      </section>

      {SERVICES.map((s, i) => (
        <section key={s.n} className={i % 2 === 0 ? "bg-surface border-y border-border" : ""}>
          <div className="container-x py-24 md:py-32">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <Reveal className={"lg:col-span-6 " + (i % 2 === 1 ? "lg:order-2" : "")}>
                <div className="aspect-[4/5] overflow-hidden rounded-[14px] border border-border">
                  <img src={s.image} alt={s.title} loading="lazy" className="h-full w-full object-cover" />
                </div>
              </Reveal>
              <Reveal className="lg:col-span-6" delay={160}>
                <p className="eyebrow mb-6">{s.n} — Service</p>
                <h2 className="display-lg">{s.title}</h2>
                <p className="mt-8 text-muted-foreground text-lg leading-relaxed max-w-xl">{s.lead}</p>
                <ul className="mt-10 border-t border-border">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-center justify-between py-4 border-b border-border text-sm">
                      <span>{it}</span>
                      <span className="text-muted-foreground text-xs">Included</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="btn-primary mt-10 inline-flex">
                  Discuss a project <span aria-hidden>→</span>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <section className="container-x py-28 md:py-36 text-center">
        <Reveal>
          <p className="eyebrow mb-6">Beyond stills</p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="display-lg max-w-3xl mx-auto">
            Animations, walkthroughs, VR and 360° tours are available on request.
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <Link to="/contact" className="btn-ghost mt-10 inline-flex">Talk to the studio</Link>
        </Reveal>
      </section>
    </>
  );
}
