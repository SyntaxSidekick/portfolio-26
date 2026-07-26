import { CheckCircle2, Circle } from "lucide-react";
import type { CompletionSummary } from "./projectEditorCompletion";

export function ProjectCompletionChecklist({ completion }: { completion: CompletionSummary }) {
  return (
    <section className="completion-checklist panel" aria-labelledby="completion-checklist-heading">
      <header className="panel-header completion-header">
        <h2 id="completion-checklist-heading">Project Checklist</h2>
        <p>
          <strong>{completion.percent}%</strong> Complete
        </p>
      </header>

      <div className="completion-progress" aria-hidden="true">
        <span style={{ width: `${completion.percent}%` }} />
      </div>

      <ul>
        {completion.items.map((item) => (
          <li className={item.complete ? "is-complete" : "is-pending"} key={item.id}>
            {item.complete ? (
              <CheckCircle2 aria-hidden="true" focusable="false" />
            ) : (
              <Circle aria-hidden="true" focusable="false" />
            )}
            <div>
              <strong>{item.label}</strong>
              <small>{item.complete ? "Complete" : item.issue || "Pending"}</small>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
