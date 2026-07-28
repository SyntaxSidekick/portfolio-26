import { socialLinks } from "@/config/social-links";
import { SocialMediaIcon } from "./SocialMediaIcon";
import type { SocialLink } from "./types";

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}

type SocialMediaLinksVariant = "default" | "footer" | "contact" | "bio";
type SocialMediaLinksSize = "sm" | "md" | "lg";

function getClassName(className?: string) {
  return ["social-media-links", className].filter(Boolean).join(" ");
}

export function SocialMediaLinks({
  links = socialLinks,
  className,
  itemClassName,
  iconSize = 18,
  asListItems = false,
  showLabels = false,
  size = "md",
  variant = "default",
}: {
  links?: readonly SocialLink[];
  className?: string;
  itemClassName?: string;
  iconSize?: number;
  asListItems?: boolean;
  showLabels?: boolean;
  size?: SocialMediaLinksSize;
  variant?: SocialMediaLinksVariant;
}) {
  const listClassName = getClassName(className);
  const linkClassName = ["social-media-link", itemClassName].filter(Boolean).join(" ");
  const items = links.map((link) => {
    const external = isExternalHref(link.href);

    const anchor = (
      <a
        aria-label={showLabels ? undefined : `Visit Riad Kilani on ${link.label}`}
        className={linkClassName}
        href={link.href}
        key={`${link.platform}-${link.href}`}
        rel={external ? "noopener noreferrer" : undefined}
        target={external ? "_blank" : undefined}
        title={showLabels ? undefined : link.label}
      >
        <SocialMediaIcon aria-hidden="true" platform={link.platform} size={iconSize} />
        {showLabels ? <span>{link.label}</span> : null}
      </a>
    );

    return asListItems ? <li key={`${link.platform}-${link.href}`}>{anchor}</li> : anchor;
  });

  if (asListItems) {
    return <>{items}</>;
  }

  return (
    <div
      className={listClassName}
      data-size={size === "md" ? undefined : size}
      data-variant={variant === "default" ? undefined : variant}
    >
      {items}
    </div>
  );
}
