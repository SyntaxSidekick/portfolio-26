import Link from "next/link";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { SocialMediaIcon } from "@/components/icons/SocialMediaIcon";
import { FontAwesomeSvg } from "@/lib/fontAwesomeIcon";

type Recommendation = {
  name: string;
  title: string;
  company: string;
  quote: string;
  avatar: {
    src: string;
    alt: string;
  };
};

const recommendations = [
  {
    name: "Kevin Borkman",
    title: "Lead Solutions Integration Engineer",
    company: "Bonnier Corporation",
    quote:
      "Riad's genuine curiosity and drive to understand systems deeply always impressed me. He consistently helped teammates ramp up quickly and approached engineering challenges thoughtfully.",
    avatar: {
      src: "/assets/images/recommendations/kevin-borkman.jpg",
      alt: "Kevin Borkman"
    }
  },
  {
    name: "John Michael",
    title: "Director, Digital Experience Design",
    company: "Marriott Vacations Worldwide",
    quote:
      "Riad is a talented designer with a strong ability to translate ideas into polished, user-friendly visual designs. He played a key role in creating thoughtful application interfaces.",
    avatar: {
      src: "/assets/images/recommendations/john-michael.jpg",
      alt: "John Michael"
    }
  },
  {
    name: "Jonathan Rosero",
    title: "Product Manager",
    company: "Bonnier Corporation",
    quote:
      "Riad was flexible when requirements shifted, and his front-end work and guidance held up well across multiple brands, Drupal implementations, and WordPress environments.",
    avatar: {
      src: "/assets/images/recommendations/jonathan-rosero.jpg",
      alt: "Jonathan Rosero"
    }
  }
] satisfies Recommendation[];

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
          {recommendations.map((recommendation) => (
            <li className="recommendation-item" key={recommendation.name}>
              <article className="card recommendation-card">
                <div className="recommendation-content">
                  <FontAwesomeSvg icon={faQuoteLeft} aria-hidden="true" focusable="false" />
                  <p className="recommendation-quote">{recommendation.quote}</p>
                </div>

                <header className="recommendation-person">
                  <img src={recommendation.avatar.src} alt={recommendation.avatar.alt} />

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
