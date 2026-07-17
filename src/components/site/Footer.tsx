import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-x py-20 md:py-28">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">Westford Arcline Studio</p>
            <h2 className="display-lg max-w-xl">
              Let's build something<br />worth looking at.
            </h2>
            <Link to="/contact" className="btn-primary mt-10">
              Start Your Project
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10 lg:justify-self-end">
            <div>
              <p className="eyebrow mb-5">Services</p>
              <ul className="space-y-3 text-sm">
                <li><Link to="/services" className="link-underline">Architectural Visualization</Link></li>
                <li><Link to="/services" className="link-underline">Real Estate 3D Marketing</Link></li>
                <li><Link to="/services" className="link-underline">Product 3D Rendering</Link></li>
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-5">Studio</p>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="link-underline">About</Link></li>
                <li><Link to="/process" className="link-underline">Process</Link></li>
                <li><Link to="/portfolio" className="link-underline">Portfolio</Link></li>
                <li><Link to="/faq" className="link-underline">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-5">Contact</p>
              <ul className="space-y-3 text-sm">
                <li><a href="mailto:hello@unfinish3d.com" className="link-underline">hello@unfinish3d.com</a></li>
                <li><a href="tel:+18647723779" className="link-underline">+1 (864) 772-3779</a></li>
                <li className="text-muted-foreground leading-relaxed pt-2">
                  Westford Partners LLC<br />
                  802 S 28th St<br />
                  Middlesboro, KY 40965
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="hairline mt-20 mb-8" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Westford Partners LLC · Westford Arcline Studio. All rights reserved.</p>
          <p>Photorealistic CGI · Architectural Visualization · Product Rendering</p>
        </div>
      </div>
    </footer>
  );
}
