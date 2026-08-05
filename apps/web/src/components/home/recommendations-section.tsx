import Link from "next/link";
import { RecommendationCard } from "@/components/recommendations/recommendation-card";
import { featuredRecommendations } from "@/data/recommendations";

export function RecommendationsSection() {
  return (
    <section className="section recommendations" aria-labelledby="recommendations-title">
      <div className="container">
        <header className="section-header recommendations-header">
          <p className="eyebrow">Recommendations</p>

          <h2 id="recommendations-title">
            Trusted by the people <span>I&apos;ve worked with.</span>
          </h2>

          <p className="recommendations-intro">
            Feedback from engineering leaders, product managers, clients, and colleagues.
          </p>

          <p className="recommendations-proof">
            17 LinkedIn recommendations across enterprise teams, agencies, startups, and client engagements.
          </p>
        </header>

        <ul className="recommendation-grid">
          {featuredRecommendations.map((recommendation) => (
            <li className="recommendation-item" key={recommendation.name}>
              <RecommendationCard recommendation={recommendation} />
            </li>
          ))}
        </ul>

        <div className="section-action">
          <Link className="button button-secondary" href="/bio#recommendations">
            <span>View All Recommendations</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
