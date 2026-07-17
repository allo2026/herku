import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "../components/site/Header";
import { Footer } from "../components/site/Footer";
import { WhatsAppButton } from "../components/site/WhatsAppButton";

function NotFoundComponent() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container-x pt-40 pb-32">
        <p className="eyebrow mb-6">404</p>
        <h1 className="display-xl max-w-3xl">This page is not part of the studio archive.</h1>
        <p className="mt-6 text-muted-foreground max-w-lg">
          The page you're looking for doesn't exist or has been moved. Return home or explore our work.
        </p>
        <div className="mt-10 flex gap-3 flex-wrap">
          <Link to="/" className="btn-primary">Go home</Link>
          <Link to="/portfolio" className="btn-ghost">View portfolio</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow mb-4">Error</p>
        <h1 className="display-lg">This page didn't load</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Something went wrong on our end. Try again or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn-primary"
          >
            Try again
          </button>
          <a href="/" className="btn-ghost">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Westford Arcline Studio — Photorealistic 3D Rendering & Visualization" },
      {
        name: "description",
        content:
          "Westford Arcline Studio creates premium architectural visualization, real estate 3D marketing, and product CGI for architects, developers and global brands.",
      },
      { name: "author", content: "Westford Arcline Studio" },
      { property: "og:site_name", content: "Westford Arcline Studio" },
      { property: "og:title", content: "Westford Arcline Studio — Photorealistic 3D Rendering & Visualization" },
      {
        property: "og:description",
        content: "Premium architectural visualization, real estate marketing imagery, and product CGI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </QueryClientProvider>
  );
}
