import { Check, CircleAlert } from "lucide-react";
import { projectEditorSteps } from "./projectEditorConfig";

export type StepVisualState = "completed" | "current" | "available" | "unavailable" | "error";

export function ProjectStepNavigation({
  getStepState,
  onStepSelect,
}: {
  getStepState: (index: number) => StepVisualState;
  onStepSelect: (index: number) => void;
}) {
  return (
    <nav className="step-navigation panel" aria-label="Project editor progress">
      <ol>
        {projectEditorSteps.map((step, index) => {
          const state = getStepState(index);
          return (
            <li key={step.key}>
              <button
                type="button"
                className={`step-button step-${state}`}
                onClick={() => onStepSelect(index)}
                aria-current={state === "current" ? "step" : undefined}
                aria-disabled={state === "unavailable"}
                disabled={state === "unavailable"}
              >
                <span className="step-indicator" aria-hidden="true">
                  {state === "error" ? <CircleAlert /> : state === "completed" ? <Check /> : <span>{step.number}</span>}
                </span>
                <strong>{step.shortLabel}</strong>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
