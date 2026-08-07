import type { PublicProject } from "@/lib/portfolio-api";

type ProjectGalleryProps = {
  project: PublicProject;
};

export function ProjectGallery({ project }: ProjectGalleryProps) {
  const gallery = [
    ...(project.media?.gallery?.length ? project.media.gallery : project.gallery ?? []),
  ].sort((first, second) => (first.order ?? 0) - (second.order ?? 0));

  if (gallery.length === 0) {
    return null;
  }

  return (
    <section className="project-section project-gallery-section" aria-labelledby="project-gallery-title">
      <div className="panel">
        <header className="project-section-header">
          <p className="project-section-kicker" aria-hidden="true" />
          <h2 id="project-gallery-title">Project Gallery</h2>
        </header>

        <ul className="project-gallery-list">
          {gallery.map((image) => (
            <li key={image.id || image.url}>
              <figure>
                <img
                  src={image.url}
                  alt={image.alt || `${project.title} project image`}
                  width="800"
                  height="500"
                />
                {image.caption ? <figcaption>{image.caption}</figcaption> : null}
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
