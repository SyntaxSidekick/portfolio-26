import type { LucideIcon } from "lucide-react";
import { Code2, Layers3, Rocket, UsersRound } from "lucide-react";

type JourneyIconTone =
  | "architecture"
  | "engineering"
  | "performance"
  | "discovery";

type JourneyMilestone = {
  years: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconTone: JourneyIconTone;
};

const journeyMilestones = [
  {
    years: "2007–2012",
    title: "The Foundation",
    description:
      "Started my career building websites and UI components with a focus on clean code and solid front-end fundamentals.",
    icon: Code2,
    iconTone: "architecture",
  },
  {
    years: "2013–2016",
    title: "Expanding Skills",
    description:
      "Deepened my expertise in JavaScript, performance, and front-end architecture while delivering complex client projects.",
    icon: Layers3,
    iconTone: "engineering",
  },
  {
    years: "2017–2020",
    title: "Leading & Scaling",
    description:
      "Led front-end initiatives, built design systems, and mentored developers while helping products scale to thousands of users.",
    icon: Rocket,
    iconTone: "performance",
  },
  {
    years: "2021–Present",
    title: "Strategic & Forward-Thinking",
    description:
      "Focused on accessibility, performance, UX engineering, and AI workflow engineering development while delivering measurable results for clients and teams.",
    icon: UsersRound,
    iconTone: "discovery",
  },
] satisfies JourneyMilestone[];

export function CareerJourneySection() {
  return (
    <section className="career-journey" aria-labelledby="career-journey-heading">
      <header className="section-heading">
        <p className="eyebrow">MY JOURNEY</p>
        <h2 id="career-journey-heading">17+ Years of Growth &amp; Impact</h2>
      </header>

      <ol className="journey-timeline" aria-label="Career journey milestones">
        {journeyMilestones.map((milestone) => {
          const Icon = milestone.icon;

          return (
            <li className="journey-milestone" key={milestone.years}>
              <article className="journey-content">
                <div className="journey-icon" data-icon={milestone.iconTone} aria-hidden="true">
                  <Icon />
                </div>

                <p className="journey-years">{milestone.years}</p>
                <h3>{milestone.title}</h3>
                <p className="journey-description">{milestone.description}</p>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
