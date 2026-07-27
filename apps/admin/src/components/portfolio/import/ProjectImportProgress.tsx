export function ProjectImportProgress({ step }: { step: 1 | 2 | 3 | 4 }) {
  const steps = ["Upload & Options", "Preview & Validate", "Review & Confirm", "Import Results"];
  return <nav className="import-progress" aria-label="CSV import progress">{steps.map((label, index) => {
    const number = index + 1;
    const state = number < step ? "complete" : number === step ? "current" : "future";
    return <div className={`import-progress-step ${state}`} key={label} aria-current={number === step ? "step" : undefined}><span>{number}</span><strong>{label}</strong></div>;
  })}</nav>;
}
