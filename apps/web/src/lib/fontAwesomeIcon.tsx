import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { SVGProps } from "react";

export function FontAwesomeSvg({
  icon,
  className,
  ...svgProps
}: {
  icon: IconDefinition;
  className?: string;
} & SVGProps<SVGSVGElement>) {
  const [width, height, , , pathData] = icon.icon;

  return (
    <svg
      aria-hidden="true"
      className={className}
      focusable="false"
      viewBox={`0 0 ${width} ${height}`}
      {...svgProps}
    >
      {Array.isArray(pathData) ? pathData.map((path, index) => <path d={path} fill="currentColor" key={index} />) : <path d={pathData} fill="currentColor" />}
    </svg>
  );
}
