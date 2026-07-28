import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCodepen,
  faGithub,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import type { SocialPlatform } from "./types";

export type FontAwesomeSocialIcon = {
  kind: "fontawesome";
  icon: IconDefinition;
};

export type SocialIconDefinition = FontAwesomeSocialIcon;

export const socialIconMap = {
  linkedin: { kind: "fontawesome", icon: faLinkedin },
  github: { kind: "fontawesome", icon: faGithub },
  codepen: { kind: "fontawesome", icon: faCodepen },
  x: { kind: "fontawesome", icon: faXTwitter },
} satisfies Record<SocialPlatform, SocialIconDefinition>;
