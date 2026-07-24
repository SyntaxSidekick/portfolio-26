import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export function FontAwesomeSvg({
  icon,
  className,
}: {
  icon: IconDefinition;
  className?: string;
}) {
  const [width, height, , , pathData] = icon.icon;

  return (
    <svg className={className} viewBox={`0 0 ${width} ${height}`} aria-hidden="true" focusable="false">
      {Array.isArray(pathData) ? pathData.map((path, index) => <path d={path} fill="currentColor" key={index} />) : <path d={pathData} fill="currentColor" />}
    </svg>
  );
}
