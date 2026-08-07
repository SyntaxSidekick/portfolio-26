"use client";

import { useState, type ReactNode } from "react";
import type { PortfolioProjectType } from "@/lib/portfolio-data";

type PortfolioFilter = "all" | PortfolioProjectType;

type PortfolioFilteredContentProps = {
  children: ReactNode;
};

const filterOptions: Array<{ value: PortfolioFilter; label: string }> = [
  { value: "all", label: "All Projects" },
  { value: "case-study", label: "Case Studies" },
  { value: "github", label: "GitHub Projects" },
  { value: "design", label: "Design Projects" },
  { value: "codepen", label: "CodePen Projects" },
];

export function PortfolioFilteredContent({
  children,
}: PortfolioFilteredContentProps) {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>("all");

  return (
    <div className="portfolio-filtered-content" data-active-filter={activeFilter}>
      <div
        className="portfolio-category-filters"
        aria-label="Filter projects by discipline"
      >
        {filterOptions.map((option) => (
          <button
            className="button button-secondary"
            key={option.value}
            type="button"
            data-active={activeFilter === option.value ? "true" : undefined}
            aria-pressed={activeFilter === option.value}
            onClick={() => setActiveFilter(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="portfolio-filtered-sections">{children}</div>
    </div>
  );
}
