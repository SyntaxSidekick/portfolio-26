import { TechnologyIcon } from "@/lib/technologyIcons";
import type { PublicProject } from "@/lib/portfolio-api";

type ProjectTechnologiesProps = {
  technologies: PublicProject["technologies"];
  label?: string;
};

export function ProjectTechnologies({
  technologies,
  label = "Technologies used",
}: ProjectTechnologiesProps) {
  const sortedTechnologies = [...technologies].sort(
    (first, second) => (first.displayOrder ?? 0) - (second.displayOrder ?? 0),
  );

  if (sortedTechnologies.length === 0) {
    return null;
  }

  return (
    <ul
      className="tag-list project-technologies"
      data-size="compact"
      data-tone="blue"
      aria-label={label}
    >
      {sortedTechnologies.map((technology) => (
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
    </ul>
  );
}
