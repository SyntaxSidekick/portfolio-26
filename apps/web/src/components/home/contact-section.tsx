import { ContactCta } from "@/components/contact-cta";

const homeAvailability = ["Open to Work", "Remote or Onsite"];

export function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <ContactCta
          availabilityItems={homeAvailability}
          cta={{ label: "Let's Connect", href: "mailto:hello@riadkilani.com", variant: "primary" }}
          description="I'm currently seeking senior front-end engineering, UX engineering, architecture, and interactive design opportunities where thoughtful systems create measurable impact."
          eyebrow="Let's Build Something Great"
          heading="I'm currently open to new opportunities."
          headingId="home-contact-cta-title"
          secondaryText="Connect with me on these platforms."
          showSocialLinks
          socialLabel="Social links"
        />
      </div>
    </section>
  );
}
