import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/process", label: "Process" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/checkout", label: "Checkout" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-background/85 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <span className="inline-block h-2 w-2 rounded-full bg-foreground transition-transform duration-500 group-hover:scale-125" />
          <span className="text-[13px] font-medium tracking-[-0.01em]">
            Westford Arcline<span className="text-muted-foreground"> / Studio</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="link-underline text-[13px] text-foreground/80 hover:text-foreground transition-colors"
              activeProps={{ className: "link-underline text-[13px] text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/contact" className="hidden md:inline-flex btn-primary !py-2.5 !px-5 text-[13px]">
            Request a Quote
          </Link>
          <button
            aria-label="Toggle menu"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border"
            onClick={() => setOpen((v) => !v)}
          >
            <div className="flex flex-col gap-[5px]">
              <span className={`block h-px w-4 bg-foreground transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`block h-px w-4 bg-foreground transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-500 ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container-x py-8 flex flex-col gap-6">
          {NAV.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="text-3xl tracking-[-0.03em] fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-4 self-start">
            Request a Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
