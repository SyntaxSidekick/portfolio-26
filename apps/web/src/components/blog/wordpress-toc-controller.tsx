"use client";

import { useEffect } from "react";

export function WordPressTocController() {
  useEffect(() => {
    const toc = document.querySelector<HTMLElement>("#ez-toc-container");

    if (!toc) {
      return;
    }

    const parent = toc.parentNode;
    const nextSibling = toc.nextSibling;
    const mediaQuery = window.matchMedia("(max-width: 960px)");

    const syncToc = () => {
      if (mediaQuery.matches) {
        if (!toc.parentNode && parent) {
          parent.insertBefore(toc, nextSibling);
        }
      } else {
        toc.remove();
      }
    };

    syncToc();
    mediaQuery.addEventListener("change", syncToc);

    return () => {
      mediaQuery.removeEventListener("change", syncToc);

      if (!toc.parentNode && parent) {
        parent.insertBefore(toc, nextSibling);
      }
    };
  }, []);

  return null;
}
