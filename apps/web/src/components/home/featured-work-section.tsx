import Link from "next/link";
import { homeFeaturedProjects } from "@/data/home-featured-projects";

export function FeaturedWorkSection() {
  return (
    <section className="section featured-work" id="featured-work" aria-labelledby="featured-title">
      <div className="container">
        <header className="section-header">
          <p className="eyebrow">Featured Case Studies</p>

          <h2 id="featured-title">
            Real problems. Thoughtful solutions. <span>Measurable impact.</span>
          </h2>
        </header>

        <div className="project-grid">
          {homeFeaturedProjects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-image">
                <span className="image-label">Featured</span>

                <img src={project.imageSrc} alt={project.imageAlt} />
              </div>

              <div className="project-body">
                <div className="project-title-row">
                  <h3>{project.title}</h3>
                  <p>{project.category}</p>
                </div>

                <p className="project-description">{project.description}</p>

                <dl className="project-results">
                  {project.results.map((result) => (
                    <div key={`${project.title}-${result.label}`}>
                      <dt>{result.value}</dt>
                      <dd>{result.label}</dd>
                    </div>
                  ))}
                </dl>

                <ul className="project-tags" aria-label="Technologies used">
                  {project.tags.map((tag) => (
                    <li key={`${project.title}-${tag}`}>{tag}</li>
                  ))}
                </ul>

                <Link className="text-link" href="#">
                  View Case Study
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="section-action">
          <Link className="button button-primary" href="#">
            <span aria-hidden="true">&#9635;</span>
            <span>View Full Portfolio</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
