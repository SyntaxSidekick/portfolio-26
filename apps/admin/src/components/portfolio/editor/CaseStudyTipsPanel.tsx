import { CheckCircle2, Lightbulb } from "lucide-react";

const tips = [
  "Keep each section focused and concise.",
  "Use measurable outcomes whenever possible.",
  "Include useful supporting visuals.",
  "Reorder sections to improve the narrative.",
];

export function CaseStudyTipsPanel() {
  return (
    <section className="case-study-tips panel" aria-labelledby="case-study-tips-title">
      <header className="case-study-tips-header">
        <span className="case-study-tips-icon" aria-hidden="true"><Lightbulb /></span>
        <h2 id="case-study-tips-title">Case Study Tips</h2>
      </header>
      <ul>
        {tips.map((tip) => (
          <li key={tip}>
            <CheckCircle2 aria-hidden="true" focusable="false" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
