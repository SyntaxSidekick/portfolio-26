import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { SocialMediaIcon } from "@/components/icons/SocialMediaIcon";
import type { Recommendation } from "@/data/recommendations";
import { FontAwesomeSvg } from "@/lib/fontAwesomeIcon";

type RecommendationCardProps = {
  recommendation: Recommendation;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <article className="card recommendation-card">
      <div className="recommendation-content">
        <FontAwesomeSvg icon={faQuoteLeft} aria-hidden="true" focusable="false" />
        <p className="recommendation-quote">{recommendation.quote}</p>
      </div>

      <header className="recommendation-person">
        {recommendation.avatar.src ? (
          <img src={recommendation.avatar.src} alt={recommendation.avatar.alt} />
        ) : (
          <span className="recommendation-avatar" aria-label={recommendation.avatar.alt}>
            {getInitials(recommendation.name)}
          </span>
        )}

        <div>
          <h3>{recommendation.name}</h3>
          <p>{recommendation.title}</p>
          <p>{recommendation.company}</p>
        </div>
      </header>

      <footer className="recommendation-source">
        <SocialMediaIcon platform="linkedin" size={16} aria-hidden="true" focusable="false" />
        <span>LinkedIn Recommendation</span>
      </footer>
    </article>
  );
}
