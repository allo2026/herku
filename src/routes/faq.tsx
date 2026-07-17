import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Westford Arcline Studio" },
      {
        name: "description",
        content:
          "Common questions about our 3D visualization services: timelines, file formats, revisions, animations, NDAs and more.",
      },
      { property: "og:title", content: "FAQ — Westford Arcline Studio" },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

const FAQS = [
  {
    q: "How long does a typical project take?",
    a: "Most architectural still images are delivered in 2–3 weeks from brief lock. Product renders are typically 1–2 weeks. Larger campaigns and animations are scoped case-by-case.",
  },
  {
    q: "Can you work directly from CAD, Revit or Rhino files?",
    a: "Yes. We work natively with DWG, RVT, 3DM, SKP, IFC and most exchange formats. If you only have PDFs or sketches, we can model from those as well.",
  },
  {
    q: "What file formats do you accept for source material?",
    a: "CAD (DWG, DXF), BIM (RVT, IFC), 3D (3DM, SKP, FBX, OBJ), images (JPG, PNG, TIFF, PSD) and reference documents (PDF, DOCX).",
  },
  {
    q: "Do you offer revisions?",
    a: "Yes. Every project includes two structured revision rounds — one on lighting/composition, one on final polish. Additional rounds are quoted transparently.",
  },
  {
    q: "Can you create animations, walkthroughs or VR?",
    a: "Absolutely. We produce cinematic walkthroughs, camera flythroughs, 360° panoramas and interactive VR experiences from the same scene we build for stills.",
  },
  {
    q: "Do you sign NDAs and handle sensitive projects?",
    a: "Yes. NDAs are standard on our workflow. We can also work under client-provided agreements and secure file transfer protocols.",
  },
  {
    q: "How does pricing work?",
    a: "Pricing is per-image or per-scope, based on complexity, resolution and licensing. Every quote includes deliverables, timeline and revision terms upfront — no surprises.",
  },
  {
    q: "Do you work internationally?",
    a: "Yes. We serve clients across North America, Europe, the Middle East and Asia. Time zones are handled with async delivery and scheduled review calls.",
  },
];

function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <section className="container-x pt-40 md:pt-48 pb-16">
        <Reveal><p className="eyebrow mb-6">FAQ</p></Reveal>
        <Reveal delay={120}>
          <h1 className="display-xxl max-w-5xl">Questions,<br />answered plainly.</h1>
        </Reveal>
      </section>

      <section className="container-x pb-28 md:pb-36">
        <div className="border-t border-foreground max-w-4xl">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 50}>
                <div className="border-b border-border">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between text-left py-6 md:py-8 gap-6"
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg md:text-xl tracking-[-0.02em]">{f.q}</span>
                    <span className={`shrink-0 h-8 w-8 rounded-full border border-border grid place-items-center transition-transform duration-500 ${isOpen ? "rotate-45 bg-foreground text-background border-foreground" : ""}`}>
                      +
                    </span>
                  </button>
                  <div
                    className="grid transition-[grid-template-rows,opacity,padding] duration-500 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0, paddingBottom: isOpen ? "1.5rem" : 0 }}
                  >
                    <div className="overflow-hidden">
                      <p className="text-muted-foreground max-w-2xl leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200} className="mt-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h2 className="display-lg max-w-2xl">Still have questions?</h2>
          <Link to="/contact" className="btn-primary">Get in touch <span aria-hidden>→</span></Link>
        </Reveal>
      </section>
    </>
  );
}
