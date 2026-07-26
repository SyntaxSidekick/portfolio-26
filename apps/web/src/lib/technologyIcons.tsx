import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faAws,
  faBootstrap,
  faCloudflare,
  faCss3,
  faDocker,
  faDrupal,
  faFigma,
  faGit,
  faGithub,
  faHtml5,
  faJenkins,
  faJs,
  faMarkdown,
  faNodeJs,
  faNpm,
  faPhp,
  faReact,
  faSass,
  faVuejs,
  faWordpress,
} from "@fortawesome/free-brands-svg-icons";
import type { CSSProperties } from "react";

export const technologyIcons: Record<string, IconDefinition> = {
  accessibility: faHtml5,
  aws: faAws,
  bootstrap: faBootstrap,
  cloudflare: faCloudflare,
  css: faCss3,
  css3: faCss3,
  docker: faDocker,
  drupal: faDrupal,
  figma: faFigma,
  git: faGit,
  github: faGithub,
  "github-actions": faGithub,
  html5: faHtml5,
  javascript: faJs,
  jenkins: faJenkins,
  markdown: faMarkdown,
  nodejs: faNodeJs,
  npm: faNpm,
  php: faPhp,
  react: faReact,
  sass: faSass,
  vue: faVuejs,
  wordpress: faWordpress,
};

export function isTechnologyIconSupported(iconKey?: string) {
  return Boolean(iconKey && technologyIcons[iconKey]);
}

export function getTechnologyInitials(name: string, customInitials?: string) {
  if (customInitials?.trim()) {
    return customInitials.trim().toUpperCase();
  }

  const words = name
    .trim()
    .split(/[\s&/+.,()-]+/)
    .map((word) => word.replace(/\+/g, "p").replace(/[^a-z0-9]/gi, ""))
    .filter(Boolean);

  if (words.length >= 2) return `${words[0][0]}${words[1][0]}`.toUpperCase();

  const characters = (words[0] ?? name).replace(/\+/g, "p").replace(/[^a-z0-9]/gi, "");
  return characters ? characters.slice(0, 2).toUpperCase() : "?";
}

export function getReadableTextColor(backgroundColor: string): "#000000" | "#ffffff" {
  const raw = backgroundColor.trim().replace(/^#/, "");
  const hex = raw.length === 3 ? raw.split("").map((char) => `${char}${char}`).join("") : raw;
  if (!/^[0-9a-f]{6}$/i.test(hex)) return "#ffffff";

  const red = Number.parseInt(hex.slice(0, 2), 16);
  const green = Number.parseInt(hex.slice(2, 4), 16);
  const blue = Number.parseInt(hex.slice(4, 6), 16);
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
  return brightness > 150 ? "#000000" : "#ffffff";
}

export function TechnologyIcon({
  iconKey,
  name,
  brandColor,
  initials,
  size = 20,
  className,
}: {
  iconKey?: string;
  name: string;
  brandColor?: string;
  initials?: string;
  size?: number;
  className?: string;
}) {
  const icon = iconKey ? technologyIcons[iconKey] : undefined;

  if (!icon) {
    const color = brandColor || "#2563eb";
    return (
      <span
        className={`technology-icon-fallback ${className ?? ""}`.trim()}
        style={{ "--technology-color": color, "--technology-foreground": getReadableTextColor(color) } as CSSProperties}
        aria-hidden="true"
      >
        {getTechnologyInitials(name, initials)}
      </span>
    );
  }

  const [width, height, , , pathData] = icon.icon;

  return (
    <svg className={className} viewBox={`0 0 ${width} ${height}`} style={{ width: size, height: size, color: brandColor ?? "currentColor" }} aria-hidden="true" focusable="false">
      {Array.isArray(pathData) ? pathData.map((path, index) => <path d={path} fill="currentColor" key={index} />) : <path d={pathData} fill="currentColor" />}
    </svg>
  );
}
