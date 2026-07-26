import { CheckCircle2, Circle, ExternalLink, Globe, Lock } from "lucide-react";
import type { ProjectStatus } from "../../../types/admin";
import type { ProjectFormValues } from "../ProjectForm";
import type { PublishingValidationSummary } from "./projectEditorCompletion";

const statusOptions: Array<{ value: ProjectStatus; title: string; description: string }> = [
  { value: "draft", title: "Draft", description: "Only visible in admin until published." },
  { value: "published", title: "Published", description: "Visible on the public portfolio." },
  { value: "archived", title: "Archived", description: "Hidden from public listings." },
];

function socialImageUrl(values: ProjectFormValues) {
  return values.featuredImageUrl || values.cardImageUrl || values.desktopImageUrl || values.mobileImageUrl;
}

function socialImageSource(values: ProjectFormValues) {
  if (values.featuredImageUrl) return "Featured image";
  if (values.cardImageUrl) return "Card image";
  if (values.desktopImageUrl) return "Desktop image";
  if (values.mobileImageUrl) return "Mobile image";
  return "No image selected";
}

function seoDescription(values: ProjectFormValues) {
  return values.heroSummary.trim() || values.overviewContent.trim() || "Add a project summary to improve metadata quality.";
}

export function ProjectPublishingStep({
  values,
  validation,
  onChange,
}: {
  values: ProjectFormValues;
  validation: PublishingValidationSummary;
  onChange: (values: ProjectFormValues) => void;
}) {
  const socialPreview = socialImageUrl(values);
  const isPublic = values.status === "published";

  function updateField<K extends keyof ProjectFormValues>(key: K, value: ProjectFormValues[K]) {
    onChange({ ...values, [key]: value });
  }

  return (
    <section className="step-panel publishing-step-panel" aria-labelledby="project-publishing-heading">
      <header className="step-panel-header">
        <h2 id="project-publishing-heading">Publishing</h2>
        <p>Finalize publication settings, metadata preview, and readiness before publishing.</p>
      </header>

      <article className="publishing-status-panel" aria-labelledby="publishing-status-heading">
        <h3 id="publishing-status-heading">Publication Status</h3>
        <p className={validation.readyToPublish ? "publishing-readiness is-ready" : "publishing-readiness is-blocked"} role="status">
          {validation.readyToPublish ? "Publication readiness: Ready to publish" : "Publication readiness: Resolve pending checklist items"}
        </p>
        <div className="publishing-status-grid" role="radiogroup" aria-label="Publication status">
          {statusOptions.map((option) => {
            const checked = values.status === option.value;
            return (
              <label className={checked ? "publishing-status-card is-active" : "publishing-status-card"} key={option.value}>
                <input
                  type="radio"
                  name="project-status"
                  value={option.value}
                  checked={checked}
                  onChange={(event) => updateField("status", event.target.value as ProjectStatus)}
                />
                <div>
                  <strong>{option.title}</strong>
                  <p>{option.description}</p>
                </div>
              </label>
            );
          })}
        </div>
      </article>

      <article className="publishing-controls-panel" aria-labelledby="publishing-controls-heading">
        <h3 id="publishing-controls-heading">Publishing Controls</h3>

        <div className="publishing-controls-grid">
          <label className="field-block" htmlFor="publishing-slug">
            <span className="field-label-row">
              <span>Slug</span>
              <span>/portfolio/{values.slug.trim() || "your-project"}</span>
            </span>
            <input
              id="publishing-slug"
              value={values.slug}
              onChange={(event) => updateField("slug", event.target.value)}
              aria-invalid={Boolean(validation.items.find((item) => item.id === "publishing")?.issue)}
            />
          </label>

          <label className="field-block" htmlFor="publishing-display-order">
            <span className="field-label-text">Display Order</span>
            <input
              id="publishing-display-order"
              type="number"
              min={0}
              step={1}
              value={values.displayOrder}
              onChange={(event) => updateField("displayOrder", event.target.value)}
            />
          </label>

          <div className="publishing-visibility-card" role="status" aria-live="polite">
            <div>
              <strong>Visibility</strong>
              <small>{isPublic ? "Public" : "Not public"}</small>
            </div>
            {isPublic ? <Globe aria-hidden="true" focusable="false" /> : <Lock aria-hidden="true" focusable="false" />}
          </div>
        </div>
      </article>

      <article className="publishing-seo-panel" aria-labelledby="publishing-seo-heading">
        <h3 id="publishing-seo-heading">SEO & Social Preview</h3>

        <div className="publishing-seo-grid">
          <label className="field-block" htmlFor="publishing-seo-title">
            <span className="field-label-text">SEO Title</span>
            <input
              id="publishing-seo-title"
              value={values.title}
              onChange={(event) => updateField("title", event.target.value)}
            />
            <span className="field-help">Uses the project title stored in the existing schema.</span>
          </label>

          <label className="field-block" htmlFor="publishing-seo-description">
            <span className="field-label-row">
              <span>SEO Description</span>
              <span>{seoDescription(values).length}/160</span>
            </span>
            <textarea
              id="publishing-seo-description"
              value={values.heroSummary}
              onChange={(event) => updateField("heroSummary", event.target.value)}
            />
            <span className="field-help">Mapped to project summary/excerpt in the existing payload.</span>
          </label>

          <div className="publishing-social-preview" aria-label="Social image preview">
            <p className="publishing-social-label">Social Image</p>
            {socialPreview ? <img src={socialPreview} alt="Social preview" /> : <div className="social-placeholder">Select project images to generate a social preview.</div>}
            <small>Source: {socialImageSource(values)}</small>
          </div>
        </div>
      </article>

      <article className="publishing-preview-panel" aria-labelledby="publishing-preview-heading">
        <h3 id="publishing-preview-heading">Preview</h3>
        <a
          className="publishing-preview-link"
          href={values.slug.trim() ? `http://localhost:3000/portfolio/${values.slug.trim()}` : "#"}
          onClick={(event) => {
            if (!values.slug.trim()) {
              event.preventDefault();
            }
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          {values.slug.trim() ? `http://localhost:3000/portfolio/${values.slug.trim()}` : "Set a slug to enable preview"}
          <ExternalLink aria-hidden="true" focusable="false" />
        </a>
      </article>

      <article className="publishing-checklist-panel" aria-labelledby="publishing-checklist-heading">
        <header>
          <h3 id="publishing-checklist-heading">Final Checklist</h3>
          <p>{validation.completeCount}/{validation.total} complete</p>
        </header>

        <ul aria-label="Publishing readiness checklist">
          {validation.items.map((item) => (
            <li key={item.id} className={item.complete ? "is-complete" : "is-pending"}>
              {item.complete ? <CheckCircle2 aria-hidden="true" focusable="false" /> : <Circle aria-hidden="true" focusable="false" />}
              <div>
                <strong>{item.label}</strong>
                <small>{item.complete ? "Complete" : item.issue || "Incomplete"}</small>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
