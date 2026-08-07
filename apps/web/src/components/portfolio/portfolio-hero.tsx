import { Code2, GitBranch, Palette, Rocket } from "lucide-react";
import type { PortfolioCounts } from "@/lib/portfolio-data";

type PortfolioHeroProps = {
  totalProjects: number;
  counts: PortfolioCounts;
};

export function PortfolioHero({ totalProjects, counts }: PortfolioHeroProps) {
  return (
    <section className="portfolio-hero" aria-labelledby="portfolio-title">
      <div className="portfolio-hero-content">
        <p className="portfolio-kicker">Portfolio</p>
        <h1 id="portfolio-title">
          Selected <span>Work</span>
        </h1>
        <p className="portfolio-intro">
          A curated collection of projects built with <strong>purpose</strong>,{" "}
          <strong>precision</strong>, and <strong>real-world impact</strong>.
        </p>
      </div>

      {totalProjects > 0 ? (
        <dl className="portfolio-stats" aria-label="Portfolio project counts">
          <div>
            <dt>Total Projects</dt>
            <dd>{totalProjects}</dd>
          </div>
          <div data-project-type="case-study">
            <Rocket aria-hidden="true" />
            <dt>Case Studies</dt>
            <dd>{counts["case-study"]}</dd>
          </div>
          <div data-project-type="github">
            <GitBranch aria-hidden="true" />
            <dt>GitHub Projects</dt>
            <dd>{counts.github}</dd>
          </div>
          <div data-project-type="design">
            <Palette aria-hidden="true" />
            <dt>Design Projects</dt>
            <dd>{counts.design}</dd>
          </div>
          <div data-project-type="codepen">
            <Code2 aria-hidden="true" />
            <dt>CodePen Projects</dt>
            <dd>{counts.codepen}</dd>
          </div>
        </dl>
      ) : null}
    </section>
  );
}
