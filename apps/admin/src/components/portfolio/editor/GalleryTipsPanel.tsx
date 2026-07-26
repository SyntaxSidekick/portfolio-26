import { CheckCircle2, Images } from "lucide-react";

const tips = [
  "Use high-resolution images (1920 x 1080 recommended).",
  "Show key project screens and meaningful interactions.",
  "Mix wide shots with focused detail views.",
  "Choose a strong cover image for first impression.",
];

export function GalleryTipsPanel() {
  return (
    <section className="case-study-tips panel" aria-labelledby="gallery-tips-title">
      <header className="case-study-tips-header">
        <span className="case-study-tips-icon" aria-hidden="true"><Images /></span>
        <h2 id="gallery-tips-title">Gallery Tips</h2>
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
