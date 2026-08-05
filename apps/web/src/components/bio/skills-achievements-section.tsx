import { CareerHighlights } from "@/components/bio/career-highlights";
import { CoreCapabilities } from "@/components/bio/core-capabilities";

export function SkillsAchievementsSection() {
  return (
    <section
      className="skills-achievements"
      aria-labelledby="skills-heading"
    >
      <div className="skills-achievements-layout">
        <CoreCapabilities />
        <CareerHighlights />
      </div>
    </section>
  );
}
