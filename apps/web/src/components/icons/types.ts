export type SocialPlatform = "linkedin" | "github" | "codepen" | "x";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
};
