import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Start Your Project | Westford Arcline Studio" },
      {
        name: "description",
        content:
          "Request a quote for architectural visualization, real estate 3D marketing, or product CGI. Response within two business days.",
      },
      { property: "og:title", content: "Contact — Westford Arcline Studio" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Please enter a valid email").max(200),
  projectType: z.string().min(1, "Select a project type"),
  budget: z.string().min(1, "Select an estimated budget"),
  deadline: z.string().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a little about the project").max(2000),
});

const PROJECT_TYPES = ["Architectural Visualization", "Real Estate 3D Marketing", "Product 3D Rendering", "Animation / Walkthrough", "Other"];
const BUDGETS = ["Under $5k", "$5k – $15k", "$15k – $40k", "$40k – $100k", "$100k+"];

function ContactPage() {
  const [values, setValues] = useState({
    name: "", company: "", email: "", projectType: "", budget: "", deadline: "", message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const iss of parsed.error.issues) errs[iss.path[0] as string] = iss.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
  }

  return (
    <section className="container-x pt-40 md:pt-48 pb-28 md:pb-36">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow mb-6">Contact</p>
          <h1 className="display-xl">Start your project.</h1>
          <p className="mt-8 text-muted-foreground text-lg leading-relaxed max-w-md">
            Share a few details and we'll return with a proposal, timeline and reference frames within two business days.
          </p>

          <div className="mt-14 space-y-8 text-sm">
            <div>
              <p className="eyebrow mb-2">Studio</p>
              <p><a href="mailto:hello@unfinish3d.com" className="link-underline">hello@unfinish3d.com</a></p>
            </div>
            <div>
              <p className="eyebrow mb-2">Phone</p>
              <p><a href="tel:+18647723779" className="link-underline">+1 (864) 772-3779</a></p>
            </div>
            <div>
              <p className="eyebrow mb-2">Office</p>
              <p className="leading-relaxed">
                Westford Partners LLC<br />
                802 S 28th St<br />
                Middlesboro, KY 40965<br />
                United States
              </p>
            </div>
            <div>
              <p className="eyebrow mb-2">Response</p>
              <p>Within 2 business days</p>
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={140}>
          {sent ? (
            <div className="rounded-[14px] border border-border p-10 md:p-14 bg-surface">
              <p className="eyebrow mb-4">Received</p>
              <h2 className="display-lg">Thank you.</h2>
              <p className="mt-6 text-muted-foreground max-w-md leading-relaxed">
                We've received your brief and will be in touch within two business days with a proposal and reference frames.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Field label="Name" name="name" value={values.name} onChange={onChange} error={errors.name} required />
                <Field label="Company" name="company" value={values.company} onChange={onChange} error={errors.company} />
              </div>
              <Field label="Email" name="email" type="email" value={values.email} onChange={onChange} error={errors.email} required />

              <div className="grid md:grid-cols-2 gap-8">
                <SelectField
                  label="Project Type" name="projectType" value={values.projectType} onChange={onChange}
                  options={PROJECT_TYPES} error={errors.projectType} required
                />
                <SelectField
                  label="Budget" name="budget" value={values.budget} onChange={onChange}
                  options={BUDGETS} error={errors.budget} required
                />
              </div>
              <Field label="Deadline" name="deadline" placeholder="e.g. Launch in Q3 2026" value={values.deadline} onChange={onChange} error={errors.deadline} />

              <TextareaField label="Message" name="message" value={values.message} onChange={onChange} error={errors.message} required />

              <div className="pt-4 flex flex-wrap gap-3 items-center">
                <button type="submit" className="btn-primary !py-5 !px-10 text-base">
                  Start Your Project <span aria-hidden>→</span>
                </button>
                <Link to="/checkout" className="btn-ghost !py-5 !px-8">
                  Or reserve a slot now
                </Link>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                By submitting you agree to be contacted by Westford Arcline Studio about your project.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label, name, value, onChange, error, type = "text", required, placeholder,
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string; type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow block mb-3">{label}{required ? "" : " (Optional)"}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent border-0 border-b border-border py-3 text-lg focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/60"
      />
      {error && <span className="mt-2 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function TextareaField({
  label, name, value, onChange, error, required,
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string; required?: boolean;
}) {
  return (
    <label className="block">
      <span className="eyebrow block mb-3">{label}{required ? "" : " (Optional)"}</span>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={5}
        className="w-full bg-transparent border-0 border-b border-border py-3 text-lg focus:outline-none focus:border-foreground transition-colors resize-none"
      />
      {error && <span className="mt-2 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function SelectField({
  label, name, value, onChange, options, error, required,
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[]; error?: string; required?: boolean;
}) {
  return (
    <label className="block">
      <span className="eyebrow block mb-3">{label}{required ? "" : " (Optional)"}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border-0 border-b border-border py-3 text-lg focus:outline-none focus:border-foreground transition-colors appearance-none pr-6"
        style={{ backgroundImage: "linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(135deg, currentColor 50%, transparent 50%)", backgroundPosition: "calc(100% - 12px) 18px, calc(100% - 7px) 18px", backgroundSize: "5px 5px, 5px 5px", backgroundRepeat: "no-repeat" }}
      >
        <option value="">Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {error && <span className="mt-2 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
