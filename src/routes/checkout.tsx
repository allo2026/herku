import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Reserve Your Project | Westford Arcline Studio" },
      {
        name: "description",
        content:
          "Reserve a production slot with Westford Arcline Studio. Choose a package, add optional deliverables, and secure your project with a refundable deposit.",
      },
      { property: "og:title", content: "Checkout — Westford Arcline Studio" },
      { property: "og:url", content: "/checkout" },
    ],
    links: [{ rel: "canonical", href: "/checkout" }],
  }),
  component: CheckoutPage,
});

type Pkg = { id: string; name: string; tag: string; price: number; frames: string; timeline: string; features: string[] };

const PACKAGES: Pkg[] = [
  {
    id: "essential",
    name: "Essential",
    tag: "Small projects, startups & single products",
    price: 400,
    frames: "1 – 3 renders",
    timeline: "5 – 7 business days",
    features: [
      "1–3 high-resolution renders",
      "Professional lighting",
      "Photorealistic materials",
      "Standard camera angles",
      "Up to 2 revision rounds",
    ],
  },
  {
    id: "signature",
    name: "Professional",
    tag: "Most popular — architects, developers & agencies",
    price: 850,
    frames: "4 – 8 renders",
    timeline: "4 – 6 business days",
    features: [
      "4–8 high-resolution renders",
      "Premium lighting & composition",
      "Interior & exterior scenes",
      "Advanced material detailing",
      "Commercial usage license",
      "Up to 4 revision rounds",
      "Priority support",
    ],
  },
  {
    id: "masterplan",
    name: "Enterprise",
    tag: "Large developments, luxury real estate & launches",
    price: 1500,
    frames: "Multiple scenes & angles",
    timeline: "Fastest turnaround",
    features: [
      "Unlimited consultation",
      "Architectural visualization",
      "Product CGI",
      "Real estate marketing assets",
      "Marketing-ready deliverables",
      "Dedicated project manager",
      "Unlimited revisions during review",
      "Highest priority support",
    ],
  },
];

type Addon = { id: string; name: string; desc: string; price: number };
const ADDONS: Addon[] = [
  { id: "animation", name: "30-second cinematic animation", desc: "1080p / 4K walkthrough from the same scene", price: 3800 },
  { id: "vr", name: "360° / VR panorama", desc: "Interactive tour deliverable for web and headset", price: 1600 },
  { id: "rush", name: "Priority production", desc: "50% faster turnaround — booked to a dedicated team", price: 2200 },
  { id: "extras", name: "Additional variation frames", desc: "Alternate lighting, weather or dressing per frame", price: 450 },
];

const DEPOSIT_RATE = 0.4; // 40% deposit to reserve slot

const currency = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function CheckoutPage() {
  const [pkgId, setPkgId] = useState<string>("signature");
  const [addons, setAddons] = useState<Record<string, boolean>>({});
  const [payFull, setPayFull] = useState(false);
  const [placed, setPlaced] = useState(false);

  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "",
    country: "United States", card: "", exp: "", cvc: "", notes: "",
  });

  const pkg = PACKAGES.find((p) => p.id === pkgId)!;
  const addonTotal = useMemo(
    () => ADDONS.filter((a) => addons[a.id]).reduce((s, a) => s + a.price, 0),
    [addons]
  );
  const subtotal = pkg.price + addonTotal;
  const tax = Math.round(subtotal * 0.06); // KY sales tax display only
  const total = subtotal + tax;
  const dueToday = payFull ? total : Math.round(total * DEPOSIT_RATE);
  const remaining = total - dueToday;

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPlaced(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (placed) {
    return (
      <section className="container-x pt-40 md:pt-48 pb-32 min-h-[80vh]">
        <Reveal>
          <p className="eyebrow mb-6">Reservation confirmed</p>
          <h1 className="display-xl max-w-3xl">Your production slot is reserved.</h1>
          <p className="mt-8 max-w-xl text-muted-foreground text-lg leading-relaxed">
            A receipt for {currency(dueToday)} has been sent to <span className="text-foreground">{form.email || "your inbox"}</span>.
            Our art director will reach out within one business day to schedule the discovery call.
          </p>
          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-3xl">
            <SummaryTile label="Package" value={pkg.name} />
            <SummaryTile label="Paid today" value={currency(dueToday)} />
            <SummaryTile label="Balance on delivery" value={currency(remaining)} />
          </div>
          <div className="mt-12 flex gap-3 flex-wrap">
            <Link to="/" className="btn-ghost">Back to home</Link>
            <Link to="/portfolio" className="btn-primary">Explore portfolio</Link>
          </div>
        </Reveal>
      </section>
    );
  }

  return (
    <section className="container-x pt-32 md:pt-40 pb-28">
      <Reveal>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <Link to="/contact" className="link-underline">Contact</Link>
          <span>/</span>
          <span className="text-foreground">Checkout</span>
        </div>
        <h1 className="display-xl max-w-4xl">Reserve your production slot.</h1>
        <p className="mt-6 max-w-2xl text-muted-foreground text-lg leading-relaxed">
          Choose a package, add optional deliverables, and secure your project with a refundable deposit.
          Slots are limited each month to protect craft.
        </p>
      </Reveal>

      <form onSubmit={onSubmit} className="mt-16 grid lg:grid-cols-12 gap-10 lg:gap-16">
        {/* LEFT: selection + details */}
        <div className="lg:col-span-7 space-y-16">
          {/* PACKAGES */}
          <Reveal>
            <SectionHeader step="01" title="Select a package" />
            <div className="mt-8 space-y-3">
              {PACKAGES.map((p) => {
                const active = p.id === pkgId;
                return (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setPkgId(p.id)}
                    className={`w-full text-left rounded-[14px] border p-6 md:p-8 transition-all duration-300 ${
                      active ? "border-foreground bg-surface" : "border-border hover:border-foreground/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex items-start gap-4">
                        <span
                          className={`mt-1 inline-block h-4 w-4 rounded-full border transition-colors ${
                            active ? "border-foreground bg-foreground" : "border-border"
                          }`}
                        />
                        <div>
                          <div className="flex items-baseline gap-3 flex-wrap">
                            <h3 className="text-xl tracking-[-0.02em]">{p.name}</h3>
                            {p.id === "signature" && (
                              <span className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground border border-border rounded-full px-2 py-[2px]">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{p.tag}</p>
                          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-1 text-xs text-muted-foreground">
                            <span><span className="text-foreground">Frames:</span> {p.frames}</span>
                            <span><span className="text-foreground">Timeline:</span> {p.timeline}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-2xl tracking-[-0.02em]">{currency(p.price)}</p>
                        <p className="text-[11px] text-muted-foreground">starting</p>
                      </div>
                    </div>
                    {active && (
                      <ul className="mt-6 pt-6 border-t border-border grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                        {p.features.map((f) => (
                          <li key={f} className="flex items-center gap-3">
                            <span className="inline-block h-px w-4 bg-foreground" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* ADD-ONS */}
          <Reveal>
            <SectionHeader step="02" title="Optional add-ons" />
            <div className="mt-8 border-t border-border">
              {ADDONS.map((a) => {
                const checked = !!addons[a.id];
                return (
                  <label
                    key={a.id}
                    className="flex items-center justify-between gap-6 py-5 border-b border-border cursor-pointer group"
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`mt-1 inline-flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                          checked ? "bg-foreground border-foreground text-background" : "border-border"
                        }`}
                      >
                        {checked && <span className="text-[10px] leading-none">✓</span>}
                      </span>
                      <div>
                        <p className="text-base tracking-[-0.01em]">{a.name}</p>
                        <p className="text-sm text-muted-foreground">{a.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{currency(a.price)}</span>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={(e) => setAddons((s) => ({ ...s, [a.id]: e.target.checked }))}
                      />
                    </div>
                  </label>
                );
              })}
            </div>
          </Reveal>

          {/* CONTACT */}
          <Reveal>
            <SectionHeader step="03" title="Your details" />
            <div className="mt-8 grid md:grid-cols-2 gap-8">
              <Field label="Full name" value={form.name} onChange={(v) => set("name", v)} required />
              <Field label="Company" value={form.company} onChange={(v) => set("company", v)} />
              <Field label="Email" type="email" value={form.email} onChange={(v) => set("email", v)} required />
              <Field label="Phone" value={form.phone} onChange={(v) => set("phone", v)} placeholder="+1 (555) 000-0000" />
              <Field label="Country" value={form.country} onChange={(v) => set("country", v)} />
            </div>
            <div className="mt-8">
              <Field
                label="Project notes (optional)"
                value={form.notes}
                onChange={(v) => set("notes", v)}
                placeholder="Anything we should know before the discovery call"
              />
            </div>
          </Reveal>

          {/* PAYMENT */}
          <Reveal>
            <SectionHeader step="04" title="Payment" />
            <div className="mt-8 rounded-[14px] border border-border p-6 md:p-8 bg-surface">
              <div className="flex items-start justify-between gap-6 flex-wrap">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-[#635BFF] flex items-center justify-center shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden>
                      <path d="M13.5 9.3c0-.7.6-1 1.5-1 1.3 0 3 .4 4.3 1.1V5.3C17.8 4.7 16.4 4.5 15 4.5c-3.5 0-5.8 1.8-5.8 4.9 0 4.8 6.6 4 6.6 6.1 0 .8-.7 1.1-1.7 1.1-1.5 0-3.4-.6-4.8-1.4v4.2c1.6.7 3.2 1 4.8 1 3.6 0 6-1.8 6-4.9-.1-5.2-6.6-4.3-6.6-6.2z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-base tracking-[-0.01em]">Secure card payment via Stripe</p>
                      <span className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground border border-border rounded-full px-2 py-[2px]">
                        Live soon
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 max-w-md">
                      Stripe Checkout is being activated for this studio. Reserve your slot now — we'll email a secure Stripe payment link within one business day, or you can pay instantly via bank transfer.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <LockIcon />
                  <span>256-bit TLS · PCI-DSS · powered by Stripe</span>
                </div>
                <div className="flex items-center gap-3 opacity-70">
                  <CardMark label="VISA" />
                  <CardMark label="MC" />
                  <CardMark label="AMEX" />
                  <CardMark label="ACH" />
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/18647723779?text=${encodeURIComponent("Hi, I'd like to reserve a project with Westford Arcline Studio.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-between gap-4 rounded-[14px] border border-border p-5 hover:border-foreground/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden>
                    <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1-1.1 2.5s1.1 2.9 1.3 3.1c.2.3 2.2 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.5 5.3L2 22l4.8-1.5C8.4 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm tracking-[-0.01em]">Prefer to talk first? Message us on WhatsApp</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Direct line to the art director · replies within the hour</p>
                </div>
              </div>
              <span aria-hidden className="text-lg">→</span>
            </a>
          </Reveal>
        </div>

        {/* RIGHT: order summary sticky */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <div className="rounded-[14px] border border-border bg-surface p-8 md:p-10">
                <p className="eyebrow mb-6">Order summary</p>

                <div className="space-y-4 pb-6 border-b border-border">
                  <SummaryRow label={pkg.name + " package"} value={currency(pkg.price)} sub={pkg.frames + " · " + pkg.timeline} />
                  {ADDONS.filter((a) => addons[a.id]).map((a) => (
                    <SummaryRow key={a.id} label={a.name} value={currency(a.price)} />
                  ))}
                </div>

                <div className="py-6 space-y-3 text-sm border-b border-border">
                  <Row label="Subtotal" value={currency(subtotal)} />
                  <Row label="Estimated tax" value={currency(tax)} muted />
                  <Row label="Total project" value={currency(total)} strong />
                </div>

                <div className="pt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-base">Due today</span>
                    <span className="text-3xl tracking-[-0.03em]">{currency(dueToday)}</span>
                  </div>
                  {!payFull && (
                    <p className="text-xs text-muted-foreground">
                      Remaining {currency(remaining)} invoiced on final delivery.
                    </p>
                  )}
                </div>

                <button type="submit" className="btn-primary w-full mt-8 !py-5 text-base">
                  Reserve slot · get Stripe link <span aria-hidden>→</span>
                </button>

                <p className="mt-4 text-[11px] text-muted-foreground leading-relaxed">
                  By reserving, you agree to Westford Partners LLC's Master Services Agreement.
                  Deposits are fully refundable within 7 days of payment.
                </p>
              </div>

              <div className="mt-6 rounded-[14px] border border-border p-6 text-xs text-muted-foreground space-y-2">
                <p className="text-foreground text-sm">Billed by</p>
                <p>Westford Partners LLC</p>
                <p>802 S 28th St, Middlesboro, KY 40965</p>
                <p>+1 (864) 772-3779 · hello@unfinish3d.com</p>
              </div>
            </Reveal>
          </div>
        </div>
      </form>
    </section>
  );
}

function CardMark({ label }: { label: string }) {
  return (
    <span className="text-[10px] tracking-[0.14em] border border-border rounded px-2 py-1 text-muted-foreground">
      {label}
    </span>
  );
}

function SectionHeader({ step, title }: { step: string; title: string }) {
  return (
    <div className="flex items-baseline gap-6 border-t border-foreground pt-6">
      <span className="text-sm text-muted-foreground">{step}</span>
      <h2 className="display-lg">{title}</h2>
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", placeholder, required,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; required?: boolean;
}) {
  return (
    <label className="block">
      <span className="eyebrow block mb-3">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-0 border-b border-border py-3 text-lg focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/60"
      />
    </label>
  );
}

function FieldRaw({
  label, value, onChange, placeholder, inputMode,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; inputMode?: "numeric" | "text";
}) {
  return (
    <label className="block">
      <span className="eyebrow block mb-3">{label}</span>
      <input
        inputMode={inputMode}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-0 border-b border-border py-3 text-lg focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/60"
      />
    </label>
  );
}

function SummaryRow({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <p className="text-sm">{label}</p>
        {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
      </div>
      <p className="text-sm">{value}</p>
    </div>
  );
}

function Row({ label, value, muted, strong }: { label: string; value: string; muted?: boolean; strong?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${muted ? "text-muted-foreground" : ""} ${strong ? "text-foreground pt-2" : ""}`}>
      <span>{label}</span>
      <span className={strong ? "text-lg" : ""}>{value}</span>
    </div>
  );
}

function SummaryTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[14px] border border-border p-6">
      <p className="eyebrow mb-3">{label}</p>
      <p className="text-2xl tracking-[-0.02em]">{value}</p>
    </div>
  );
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function formatCard(v: string) {
  const digits = v.replace(/\D/g, "").slice(0, 19);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExp(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  if (d.length < 3) return d;
  return d.slice(0, 2) + " / " + d.slice(2);
}
