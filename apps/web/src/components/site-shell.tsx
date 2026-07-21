"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type SiteShellProps = Readonly<{
  children: ReactNode;
}>;

const pageScopes = [
  { path: "/portfolio/", page: "portfolio-single" },
  { path: "/blog/", page: "blog-single" },
  { path: "/bio", page: "bio" },
  { path: "/portfolio", page: "portfolio" },
  { path: "/blog", page: "blog" },
  { path: "/contact", page: "contact" },
  { path: "/privacy", page: "privacy" },
  { path: "/terms", page: "terms" }
] as const;

function getPageScope(pathname: string) {
  if (pathname === "/") {
    return "home";
  }

  return pageScopes.find((scope) => pathname === scope.path || pathname.startsWith(scope.path))?.page ?? "not-found";
}

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.dataset.page = getPageScope(pathname);
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href=".main-content">
        Skip to main content
      </a>

      <SiteHeader />

      {children}

      <SiteFooter />
    </>
  );
}
