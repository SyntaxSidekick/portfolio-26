import type { Metadata } from "next";
import "@/styles/pages/bio/index.css";
import "@/styles/pages/bio/bio-intro.css";
import "@/styles/pages/bio/career-journey.css";
import "@/styles/pages/bio/bio-process.css";
import "@/styles/pages/bio/skills-achievements.css";
import "@/styles/pages/bio/core-capabilities.css";
import "@/styles/pages/bio/career-highlights.css";
import "@/styles/pages/bio/bio-recommendations.css";
import { ContactCta } from "@/components/contact-cta";
import { BioIntro } from "@/components/bio/bio-intro";
import { BioRecommendations } from "@/components/bio/bio-recommendations";
import { CareerJourneySection } from "@/components/bio/career-journey-section";
import { SkillsAchievementsSection } from "@/components/bio/skills-achievements-section";
import { BioProcess } from "@/components/bio/bio-process";

export const metadata: Metadata = {
  title: "About Riad Kilani | UX Engineer & Front-End Architect",
  description:
    "Learn about Riad Kilani's experience in front-end architecture, UX engineering, design systems, accessibility, and performance."
};

function BioPageContent() {
  return (
    <main id="bio-page" className="page bio">
      <div className="bio-container">
        <BioIntro />

        <CareerJourneySection />

        <BioProcess />

        <SkillsAchievementsSection />

        <BioRecommendations />

        <ContactCta
          cta={{ label: "Get In Touch", href: ".contact" }}
          description="I’m open to senior front-end, UX engineering, architecture, interactive design, consulting, and product design opportunities where thoughtful systems and measurable outcomes matter."
          eyebrow="Have a complex product challenge?"
          heading="Let’s Build Something Impactful"
          headingId="bio-contact-cta-title"
          secondaryText="Prefer to explore my work first? Connect with me on these platforms."
          showSocialLinks
        />
      </div>
    </main>
  );
}

export default function Page() {
  return <BioPageContent />;
}
