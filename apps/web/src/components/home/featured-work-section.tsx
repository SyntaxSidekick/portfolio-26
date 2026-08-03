import Link from "next/link";
import { HomeSectionCta } from "@/components/home/home-section-cta";
import { tryGetPublishedProjects, type PublicProject } from "@/lib/portfolio-api";
import { TechnologyIcon } from "@/lib/technologyIcons";

function getProjectImage(project: PublicProject) {
  return (
    project.media?.cardImage ??
    project.media?.featuredImage ??
    project.featuredImage ?? {
      url: "https://placehold.co/900x520/071525/2da8ff?text=Project",
      alt: `${project.title} project preview`,
    }
  );
}

function getProjectMetrics(project: PublicProject) {
  return (project.primaryMetrics?.length ? project.primaryMetrics : project.metrics)
    .slice()
    .sort((first, second) => first.displayOrder - second.displayOrder)
    .slice(0, 3);
}

export async function FeaturedWorkSection() {
  const { projects } = await tryGetPublishedProjects();
  const featuredCaseStudies = projects.filter(
    (project) => project.projectType === "case-study" && project.featured,
  ).slice(0, 3);

  return (
    <section className="section featured-work" id="featured-work" aria-labelledby="featured-title">
      <div className="container">
        <header className="section-header">
          <p className="eyebrow">Featured Case Studies</p>

          <h2 id="featured-title">
            Real problems. Thoughtful solutions. <span>Measurable impact.</span>
          </h2>
        </header>

        <ul className="project-grid">
          {featuredCaseStudies.map((project) => {
            const image = getProjectImage(project);
            const metrics = getProjectMetrics(project);
            const category = project.categories[0]?.name ?? project.details?.subtype ?? "Case Study";
            const visibleTechnologies = project.technologies.slice(0, 3);
            const hiddenTechnologyCount = Math.max(project.technologies.length - visibleTechnologies.length, 0);

            return (
              <li className="project-item" key={project.id}>
                <article className="card project-card">
                  <div className="project-image">
                    <span className="image-label">Featured</span>

                    <img src={image.url} alt={image.alt} />
                  </div>

                  <div className="project-body">
                    <div className="project-title-row">
                      <h3>{project.title}</h3>
                      <p>{category}</p>
                    </div>

                    <p className="project-description">{project.excerpt}</p>

                    <dl className="project-results">
                      {metrics.map((result) => (
                        <div key={`${project.title}-${result.label}`}>
                          <dt>{result.value}</dt>
                          <dd>{result.label}</dd>
                        </div>
                      ))}
                    </dl>

                    <ul
                      className="tag-list project-tags"
                      data-size="compact"
                      data-tone="blue"
                      aria-label="Technologies used"
                    >
                      {visibleTechnologies.map((technology) => (
                        <li key={technology.id}>
                          <TechnologyIcon
                            iconKey={technology.iconKey ?? technology.slug}
                            name={technology.name}
                            brandColor={technology.brandColor}
                            size={14}
                          />
                          <span>{technology.name}</span>
                        </li>
                      ))}
                      {hiddenTechnologyCount > 0 ? (
                        <li aria-label={`${hiddenTechnologyCount} more technologies`}>
                          <span aria-hidden="true">+{hiddenTechnologyCount}</span>
                        </li>
                      ) : null}
                    </ul>

                    <Link className="text-link" href={`/portfolio/${project.slug}`}>
                      View Case Study
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>

        <HomeSectionCta href="/portfolio" label="View Full Portfolio" />
      </div>
    </section>
  );
}
