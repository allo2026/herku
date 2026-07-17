import { createFileRoute, Link } from "@tanstack/react-router";
import aboutImg from "@/assets/about-studio.jpg";
import kitchen from "@/assets/portfolio-kitchen.jpg";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Westford Arcline Studio" },
      {
        name: "description",
        content:
          "Westford Arcline Studio combines artistic vision with technical precision to produce CGI that inspires trust and drives business results.",
      },
      { property: "og:title", content: "About — Westford Arcline Studio" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="container-x pt-40 md:pt-48 pb-24">
        <Reveal><p className="eyebrow mb-6">About</p></Reveal>
        <Reveal delay={120}>
          <h1 className="display-xxl max-w-5xl">Visualizing<br />Tomorrow.</h1>
        </Reveal>
        <Reveal delay={260} className="grid md:grid-cols-2 gap-10 mt-16 max-w-5xl">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Westford Arcline Studio transforms concepts into photorealistic visual experiences that help architects,
            developers and brands present ideas with clarity and confidence.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We combine artistic vision with technical precision to produce CGI that inspires trust and drives business
            results — imagery treated as strategy, not decoration.
          </p>
        </Reveal>
      </section>

      <section className="pb-24 md:pb-32">
        <Reveal>
          <div className="aspect-[16/8] overflow-hidden">
            <img src={aboutImg} alt="Photorealistic bedroom interior with mountain view" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </Reveal>
      </section>

      <section className="container-x pb-28 md:pb-36">
        <div className="grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Principles</p>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={120}>
            <h2 className="display-lg max-w-3xl">Four commitments that shape every frame we ship.</h2>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-14">
          {[
            { t: "Craft over volume", d: "We limit our intake. Every project gets the attention that its brief deserves." },
            { t: "Photography as a discipline", d: "Cameras, lenses and light are used with the intent of an editorial shoot." },
            { t: "Enterprise-grade delivery", d: "NDAs, secure transfers, and structured revisions — built for how enterprise teams operate." },
            { t: "Timeless over trendy", d: "We compose for imagery that still holds up in a campaign three years from now." },
          ].map((p, i) => (
            <Reveal key={p.t} delay={i * 80}>
              <div className="rounded-[14px] border border-border p-8 md:p-10 h-full">
                <p className="text-xs text-muted-foreground mb-16">0{i + 1}</p>
                <h3 className="text-xl tracking-[-0.02em]">{p.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="container-x py-24 md:py-32 grid lg:grid-cols-12 gap-10 items-center">
          <Reveal className="lg:col-span-6">
            <div className="aspect-[4/3] overflow-hidden rounded-[14px]">
              <img src={kitchen} alt="Photorealistic minimalist kitchen interior" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6" delay={140}>
            <p className="eyebrow mb-4">The Studio</p>
            <h2 className="display-lg">A small team, deeply specialized.</h2>
            <p className="mt-8 text-muted-foreground text-lg leading-relaxed">
              Modelers, lighting artists and art directors working under a single pipeline. No account managers between
              you and the frame — you speak directly to the people producing it.
            </p>
            <Link to="/contact" className="btn-primary mt-10 inline-flex">
              Work with the studio <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
