import type { LucideIcon } from "lucide-react";
import { ArrowRight, Send } from "lucide-react";
import { SocialMediaLinks } from "@/components/icons/SocialMediaLinks";

type ContactDetail = {
  label: string;
  href?: string;
  icon: LucideIcon;
};

type ContactCtaProps = {
  headingId: string;
  eyebrow: string;
  heading: string;
  description?: string;
  opportunities?: readonly string[];
  availabilityItems?: readonly string[];
  cta: {
    label: string;
    href: string;
    variant?: "primary" | "secondary";
  };
  secondaryText?: string;
  contactDetails?: readonly ContactDetail[];
  showSocialLinks?: boolean;
  socialLabel?: string;
};

export function ContactCta({
  headingId,
  eyebrow,
  heading,
  description,
  opportunities = [],
  availabilityItems = [],
  cta,
  secondaryText,
  contactDetails = [],
  showSocialLinks = false,
  socialLabel = "Professional profiles",
}: ContactCtaProps) {
  const hasSupportingContent =
    description ||
    opportunities.length > 0 ||
    availabilityItems.length > 0 ||
    secondaryText ||
    contactDetails.length > 0 ||
    showSocialLinks;
  const buttonVariant = cta.variant === "primary" ? "button-primary" : "button-secondary";

  return (
    <section className="shared-contact-cta" aria-labelledby={headingId}>
      <div className="shared-contact-panel">
        <div className="shared-contact-main">
          <div className="shared-contact-icon" aria-hidden="true">
            <Send />
          </div>

          <div className="shared-contact-content">
            <p className="eyebrow">{eyebrow}</p>

            <h2 id={headingId}>{heading}</h2>

            {description ? <p>{description}</p> : null}

            {opportunities.length > 0 ? (
              <ul className="shared-contact-opportunities">
                {opportunities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}

            {availabilityItems.length > 0 ? (
              <div className="shared-contact-availability">
                {availabilityItems.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="shared-contact-action">
            <a className={`button ${buttonVariant}`} href={cta.href}>
              <span>{cta.label}</span>
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>

        {hasSupportingContent ? (
          <div className="shared-contact-connect">
            {secondaryText ? <p>{secondaryText}</p> : null}

            {contactDetails.length > 0 ? (
              <address className="shared-contact-details">
                {contactDetails.map((detail) => {
                  const Icon = detail.icon;
                  const content = (
                    <>
                      <Icon aria-hidden="true" />
                      <span>{detail.label}</span>
                    </>
                  );

                  return detail.href ? (
                    <a href={detail.href} key={detail.label}>
                      {content}
                    </a>
                  ) : (
                    <span key={detail.label}>{content}</span>
                  );
                })}
              </address>
            ) : null}

            {showSocialLinks ? (
              <nav className="shared-contact-socials" aria-label={socialLabel}>
                <SocialMediaLinks showLabels variant="bio" />
              </nav>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
