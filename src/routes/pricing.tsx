import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Photorealistic 3D Rendering Packages | Westford Arcline Studio" },
      {
        name: "description",
        content:
          "Transparent pricing for architectural visualization, real estate 3D marketing, and product CGI. Essential from $400, Professional from $850, Enterprise from $1,500.",
      },
      { property: "og:title", content: "Pricing — Westford Arcline Studio" },
      {
        property: "og:description",
        content: "Essential, Professional, and Enterprise 3D rendering packages from $400 to $1,500+.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

type Tier = {
  id: string;
  name: string;
  price: string;
  best: string;
  features: string[];
  cta: string;
  ctaTo: "/checkout" | "/contact";
  popular?: boolean;
};

const TIERS: Tier[] = [
  {
    id: "essential",
    name: "Essential",
    price: "$400",
    best: "Small projects, startups, single products, interior concepts, or individual renders.",
    features: [
      "1–3 High-Resolution Renders",
      "Professional Lighting",
      "Photorealistic Materials",
      "Standard Camera Angles",
      "Up to 2 Revision Rounds",
      "Delivery within 5–7 Business Days",
    ],
    cta: "Get Started",
    ctaTo: "/checkout",
  },
  {
    id: "professional",
    name: "Professional",
    price: "$850",
    best: "Architects, developers, real estate agencies, and established brands.",
    features: [
      "4–8 High-Resolution Renders",
      "Premium Lighting & Composition",
      "Interior & Exterior Scenes",
      "Advanced Material Detailing",
      "Commercial Usage License",
      "Up to 4 Revision Rounds",
      "Priority Support",
      "Delivery within 4–6 Business Days",
    ],
    cta: "Request a Quote",
    ctaTo: "/contact",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$1,500",
    best: "Large developments, luxury real estate, commercial projects, product launches, and enterprise clients.",
    features: [
      "Unlimited Consultation",
      "Multiple Scenes & Angles",
      "Architectural Visualization",
      "Product CGI",
      "Real Estate Marketing Assets",
      "Marketing-Ready Deliverables",
      "Dedicated Project Manager",
      "Unlimited Revision Requests During Review",
      "Fastest Turnaround",
      "Highest Priority Support",
    ],
    cta: "Book a Consultation",
    ctaTo: "/contact",
  },
];

function PricingPage() {
  return (
    <section className="container-x pt-32 md:pt-40 pb-28">
      <Reveal>
        <p className="eyebrow mb-6">Pricing</p>
        <h1 className="display-xl max-w-4xl">Studio-grade CGI, transparently priced.</h1>
        <p className="mt-8 max-w-2xl text-muted-foreground text-lg leading-relaxed">
          Every project is bespoke, but our engagements start from one of three tiers.
          Choose the closest fit — we'll tailor scope, deliverables, and timing on the discovery call.
        </p>
      </Reveal>

      <div className="mt-20 grid gap-6 lg:grid-cols-3">
        {TIERS.map((t, i) => (
          <Reveal key={t.id} delay={i * 80}>
            <div
              className={`relative h-full flex flex-col rounded-[18px] border p-8 md:p-10 transition-all duration-500 ${
                t.popular
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background hover:border-foreground/50"
              }`}
            >
              {t.popular && (
                <span className="absolute -top-3 left-8 text-[10px] tracking-[0.22em] uppercase bg-background text-foreground border border-foreground rounded-full px-3 py-1">
                  Most Popular
                </span>
              )}

              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-2xl tracking-[-0.03em]">{t.name}</h2>
              </div>

              <div className="mt-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl tracking-[-0.04em]">{t.price}</span>
                  <span className={`text-sm ${t.popular ? "text-background/60" : "text-muted-foreground"}`}>
                    USD
                  </span>
                </div>
                <p className={`mt-2 text-xs tracking-[0.14em] uppercase ${t.popular ? "text-background/60" : "text-muted-foreground"}`}>
                  Starting at
                </p>
              </div>

              <div className={`mt-8 pt-8 border-t ${t.popular ? "border-background/20" : "border-border"}`}>
                <p className={`text-[11px] tracking-[0.18em] uppercase mb-3 ${t.popular ? "text-background/60" : "text-muted-foreground"}`}>
                  Best for
                </p>
                <p className={`text-sm leading-relaxed ${t.popular ? "text-background/85" : "text-foreground/80"}`}>
                  {t.best}
                </p>
              </div>

              <ul className={`mt-8 space-y-3 text-sm flex-1 ${t.popular ? "text-background/90" : ""}`}>
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      className={`mt-[9px] inline-block h-px w-4 shrink-0 ${
                        t.popular ? "bg-background/70" : "bg-foreground"
                      }`}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={t.ctaTo}
                className={`mt-10 inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm tracking-tight transition-all duration-300 ${
                  t.popular
                    ? "bg-background text-foreground hover:bg-background/90"
                    : "border border-foreground text-foreground hover:bg-foreground hover:text-background"
                }`}
              >
                {t.cta} <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-24 grid md:grid-cols-3 gap-8 border-t border-border pt-12">
          <FootNote label="Deposit" value="40% to reserve" copy="Balance due on final delivery. Fully refundable within 7 days." />
          <FootNote label="Licensing" value="Commercial included" copy="Full commercial license from Professional tier upward. Exclusive rights available on request." />
          <FootNote label="Custom scope" value="Talk to us" copy="Multi-frame campaigns, animations, and VR tours are quoted per project." />
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-24 flex items-center justify-between flex-wrap gap-6 border-t border-foreground pt-10">
          <div>
            <p className="eyebrow mb-3">Not sure which tier fits?</p>
            <h3 className="display-lg max-w-2xl">Send us the brief. We'll come back with a tailored estimate.</h3>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link to="/contact" className="btn-ghost">Contact studio</Link>
            <Link to="/checkout" className="btn-primary">Reserve a slot</Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function FootNote({ label, value, copy }: { label: string; value: string; copy: string }) {
  return (
    <div>
      <p className="eyebrow mb-3">{label}</p>
      <p className="text-xl tracking-[-0.02em]">{value}</p>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{copy}</p>
    </div>
  );
}
