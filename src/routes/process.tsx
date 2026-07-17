import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Process — How We Produce Photorealistic CGI | Westford Arcline" },
      {
        name: "description",
        content:
          "From brief to final frame: our four-step visualization process — Discovery, Modeling, Rendering, Delivery.",
      },
      { property: "og:title", content: "Process — Westford Arcline Studio" },
      { property: "og:url", content: "/process" },
    ],
    links: [{ rel: "canonical", href: "/process" }],
  }),
  component: ProcessPage,
});

const STEPS = [
  {
    n: "01",
    t: "Discovery",
    d: "We start with the brief, references and creative direction. Program, deliverables, formats and deadline are locked here — with agreed camera framings before a single polygon is drawn.",
    bullets: ["Brief & references", "Program & deliverables", "Camera framing lock", "Timeline & milestones"],
  },
  {
    n: "02",
    t: "Modeling",
    d: "Your CAD, Revit or Rhino files are translated into a fully-resolved scene. Where geometry is missing, our modelers build it — down to trim, hardware and material weight.",
    bullets: ["CAD / BIM translation", "High-detail modeling", "Materials & textures", "Set dressing"],
  },
  {
    n: "03",
    t: "Rendering",
    d: "Light, lens and atmosphere are iterated until the frame reads as photography. We share draft frames for review; revisions are structured, not endless.",
    bullets: ["Lighting studies", "Draft frames", "Structured revisions", "Post-production"],
  },
  {
    n: "04",
    t: "Delivery",
    d: "Print-ready master files, optimized web crops, and — on request — animation, VR or 360° extensions of the same scene.",
    bullets: ["Print masters", "Web-optimized crops", "Optional animation / VR", "Archive & re-use"],
  },
];

function ProcessPage() {
  return (
    <>
      <section className="container-x pt-40 md:pt-48 pb-16">
        <Reveal><p className="eyebrow mb-6">Process</p></Reveal>
        <Reveal delay={120}>
          <h1 className="display-xxl max-w-5xl">From brief to final frame.</h1>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-10 max-w-2xl text-muted-foreground text-lg leading-relaxed">
            A structured, four-step workflow refined across a decade of visualization work. Predictable timelines,
            transparent revisions, and imagery built to last.
          </p>
        </Reveal>
      </section>

      <section className="container-x pb-28 md:pb-36">
        <div className="border-t border-foreground">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <article className="grid lg:grid-cols-12 gap-10 py-14 md:py-20 border-b border-border group">
                <div className="lg:col-span-2 flex lg:flex-col justify-between lg:justify-start items-start">
                  <p className="text-sm text-muted-foreground">{s.n}</p>
                  <span className="text-xs text-muted-foreground">Step</span>
                </div>
                <div className="lg:col-span-5">
                  <h2 className="display-lg">{s.t}</h2>
                </div>
                <div className="lg:col-span-5">
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{s.d}</p>
                  <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3">
                    {s.bullets.map((b) => (
                      <li key={b} className="text-sm flex items-center gap-3">
                        <span className="inline-block h-px w-4 bg-foreground" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h2 className="display-lg max-w-2xl">Have a project? Let's scope it.</h2>
          <Link to="/contact" className="btn-primary">Request a Quote <span aria-hidden>→</span></Link>
        </Reveal>
      </section>
    </>
  );
}
