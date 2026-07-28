import { FontAwesomeSvg } from "@/lib/fontAwesomeIcon";
import { socialIconMap } from "./social-icon-map";
import type { SVGProps } from "react";
import type { SocialPlatform } from "./types";

export function SocialMediaIcon({
  platform,
  className,
  size = 18,
  ...svgProps
}: {
  platform: SocialPlatform;
  className?: string;
  size?: number;
} & SVGProps<SVGSVGElement>) {
  const definition = socialIconMap[platform];

  return <FontAwesomeSvg className={className} height={size} icon={definition.icon} width={size} {...svgProps} />;
}
