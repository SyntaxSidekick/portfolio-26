import { Eye, Rocket } from "lucide-react";
import { projectEditorSteps } from "./projectEditorConfig";

function nextButtonLabel(currentStep: number) {
  if (currentStep === 0) {
    return "Next: Images";
  }
  if (currentStep === 1) {
    return "Next: Case Study";
  }
  if (currentStep === 2) {
    return "Next: Technologies";
  }

  const next = projectEditorSteps[Math.min(currentStep + 1, projectEditorSteps.length - 1)]?.shortLabel ?? "Next";
  return `Next: ${next}`;
}

export function ProjectEditorActions({
  currentStep,
  isDirty,
  saving,
  canPublish,
  publishLabel,
  onCancel,
  onPreview,
  onSaveDraft,
  onPreviousStep,
  onNextStep,
  onPublish,
}: {
  currentStep: number;
  isDirty: boolean;
  saving: boolean;
  canPublish: boolean;
  publishLabel: string;
  onCancel: () => void;
  onPreview: () => void;
  onSaveDraft: () => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
  onPublish: () => void;
}) {
  const progressPercent = Math.round(((currentStep + 1) / projectEditorSteps.length) * 100);
  const isLastStep = currentStep === projectEditorSteps.length - 1;

  return (
    <section className="editor-actions" aria-label="Project editor actions">
      <div className="editor-progress">
        <p className="editor-progress-label">Step {currentStep + 1} of {projectEditorSteps.length}</p>
        <div className="editor-progress-track" aria-hidden="true"><span style={{ width: `${progressPercent}%` }} /></div>
      </div>

      <p className={isDirty ? "changes-indicator dirty" : "changes-indicator"} role="status">{isDirty ? "You have unsaved changes" : "All changes saved"}</p>

      <div className="editor-actions-group">
        <button className="button button-secondary" type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className="button button-secondary" type="button" onClick={onPreview}>
          <Eye aria-hidden="true" focusable="false" />
          Preview
        </button>
        <button className="button button-secondary" type="button" onClick={onSaveDraft} disabled={saving}>
          {saving ? "Saving..." : "Save Draft"}
        </button>
        {currentStep > 0 ? (
          <button className="button button-secondary" type="button" onClick={onPreviousStep}>
            Back
          </button>
        ) : null}
        {isLastStep ? (
          <button className="button button-primary" type="button" onClick={onPublish} disabled={saving || !canPublish}>
            <Rocket aria-hidden="true" focusable="false" />
            {saving ? (publishLabel === "Update Project" ? "Updating..." : "Publishing...") : publishLabel}
          </button>
        ) : (
          <button className="button button-primary" type="button" onClick={onNextStep}>
            <Rocket aria-hidden="true" focusable="false" />
            {nextButtonLabel(currentStep)}
          </button>
        )}
      </div>
    </section>
  );
}
