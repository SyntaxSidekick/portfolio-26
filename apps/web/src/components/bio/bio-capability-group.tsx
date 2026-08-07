import { technologyRegistry } from "@portfolio/technology-registry";
import type { CSSProperties, ReactNode } from "react";
import type { BioCapabilityGroup as BioCapabilityGroupType, BioCapabilityItem } from "@/data/bio-capabilities";
import { TechnologyIcon } from "@/lib/technologyIcons";

const technologyByKey = new Map(
  technologyRegistry.map((technology) => [technology.key, technology]),
);

type BioCapabilityGroupProps = {
  group: BioCapabilityGroupType;
  icon: ReactNode;
};

export function BioCapabilityGroup({ group, icon }: BioCapabilityGroupProps) {
  return (
    <article className={group.id === "design-prototyping-tools" ? "skill-group skill-group--tools" : "skill-group"}>
      <header className="skill-group__header">
        {icon}

        <div>
          <h3>{group.title}</h3>
          <p>{group.description}</p>
        </div>
      </header>

      <ul>
        {group.items.map((item) => (
          <CapabilityListItem item={item} key={item.id} />
        ))}
      </ul>
    </article>
  );
}

function CapabilityListItem({ item }: { item: BioCapabilityItem }) {
  const technology = item.technologyKey ? technologyByKey.get(item.technologyKey) : undefined;
  const iconKey = item.iconKey ?? technology?.iconKey;
  const brandColor = item.brandColor ?? technology?.brandColor ?? "var(--accent-light)";
  const style = { "--brand-color": brandColor } as CSSProperties;

  return (
    <li className="skill-item" style={style}>
      <span className="skill-icon" aria-hidden="true">
        <TechnologyIcon
          iconKey={iconKey}
          name={item.name}
          brandColor={brandColor}
          initials={item.initials}
          size={16}
        />
      </span>
      <span className="skill-name">{item.name}</span>
    </li>
  );
}
