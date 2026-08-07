import { TechnologyIcon } from "@/lib/technologyIcons";
import type { PublicProject } from "@/lib/portfolio-api";

export function ProjectTags({ project }: { project: PublicProject }) {
  const tags = project.technologies.slice(0, 5);

  if (tags.length === 0) {
    return null;
  }

  return (
    <ul
      className="tag-list portfolio-project-tags"
      aria-label={`${project.title} technologies`}
      data-size="compact"
      data-tone="blue"
    >
      {tags.map((technology) => (
        <li
          key={technology.id}
          aria-label={technology.name}
          title={technology.name}
        >
          <TechnologyIcon
            iconKey={technology.iconKey ?? technology.slug}
            name={technology.name}
            brandColor={technology.brandColor}
            size={14}
          />
          <span>{technology.name}</span>
        </li>
      ))}
    </ul>
  );
}
