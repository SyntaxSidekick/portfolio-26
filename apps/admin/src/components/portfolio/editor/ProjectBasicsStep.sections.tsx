import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { TechnologyIcon } from "../../../lib/technologyIcons";
import type { CategoryReference, ProjectStatus, ProjectType, TechnologyReference } from "../../../types/admin";
import type { ProjectFormValues } from "../ProjectForm";
import type { BasicsStepErrors } from "./projectEditorCompletion";
import { basicsFieldIds } from "./ProjectBasicsStep.constants";

const addCategoryOptionValue = "__add_category__";

const projectTypeOptions: Array<{ value: ProjectType; label: string }> = [
  { value: "case-study", label: "Case Study" },
  { value: "github", label: "GitHub Project" },
  { value: "design", label: "Design Project" },
  { value: "codepen", label: "Code Experiment" },
];

const statusOptions: Array<{ value: ProjectStatus; label: string }> = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

type UpdateField = <K extends keyof ProjectFormValues>(key: K, value: ProjectFormValues[K]) => void;

export function BasicsIdentityFields({
  values,
  errors,
  updateTitle,
  updateField,
}: {
  values: ProjectFormValues;
  errors: BasicsStepErrors;
  updateTitle: (title: string) => void;
  updateField: UpdateField;
}) {
  return (
    <div className="step-form-grid">
      <label className="field-block" htmlFor={basicsFieldIds.title}>
        <span className="field-label-text">Project Title <span aria-hidden="true">*</span></span>
        <input
          id={basicsFieldIds.title}
          name="title"
          required
          value={values.title}
          onChange={(event) => updateTitle(event.target.value)}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "project-title-error" : undefined}
        />
        {errors.title ? (
          <span id="project-title-error" className="field-error" role="alert">
            {errors.title}
          </span>
        ) : null}
      </label>

      <label className="field-block" htmlFor={basicsFieldIds.projectType}>
        <span className="field-label-text">Project Type <span aria-hidden="true">*</span></span>
        <select
          id={basicsFieldIds.projectType}
          name="projectType"
          required
          value={values.projectType}
          onChange={(event) => updateField("projectType", event.target.value as ProjectType)}
          aria-invalid={Boolean(errors.projectType)}
          aria-describedby={errors.projectType ? "project-type-error" : undefined}
        >
          {projectTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.projectType ? (
          <span id="project-type-error" className="field-error" role="alert">
            {errors.projectType}
          </span>
        ) : null}
      </label>
    </div>
  );
}

export function BasicsSummaryField({
  values,
  errors,
  isRequired,
  updateField,
}: {
  values: ProjectFormValues;
  errors: BasicsStepErrors;
  isRequired: boolean;
  updateField: UpdateField;
}) {
  return (
    <label className="field-block" htmlFor={basicsFieldIds.heroSummary}>
      <span className="field-label-row">
        <span>
          Short Description {isRequired ? <span aria-hidden="true">*</span> : null}
        </span>
        <span>{values.heroSummary.length}/160</span>
      </span>
      <input
        id={basicsFieldIds.heroSummary}
        name="heroSummary"
        required={isRequired}
        maxLength={160}
        value={values.heroSummary}
        onChange={(event) => updateField("heroSummary", event.target.value)}
        aria-invalid={Boolean(errors.heroSummary)}
        aria-describedby={errors.heroSummary ? "project-summary-error" : "project-summary-help"}
      />
      {!errors.heroSummary ? <span id="project-summary-help" className="field-help">Used in cards and excerpts.</span> : null}
      {errors.heroSummary ? (
        <span id="project-summary-error" className="field-error" role="alert">
          {errors.heroSummary}
        </span>
      ) : null}
    </label>
  );
}

export function BasicsCategoryStatusFields({
  values,
  categories,
  errors,
  updateField,
  onCreateCategory,
}: {
  values: ProjectFormValues;
  categories: CategoryReference[];
  errors: BasicsStepErrors;
  updateField: UpdateField;
  onCreateCategory: (name: string) => Promise<CategoryReference>;
}) {
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [createCategoryError, setCreateCategoryError] = useState("");

  async function handleCategoryChange(nextValue: string) {
    if (nextValue === addCategoryOptionValue) {
      const categoryName = window.prompt("Enter a new category name:", "");
      if (!categoryName || !categoryName.trim()) {
        return;
      }

      setCreatingCategory(true);
      setCreateCategoryError("");
      try {
        const created = await onCreateCategory(categoryName.trim());
        updateField("categories", [created.id]);
      } catch (error) {
        setCreateCategoryError(error instanceof Error ? error.message : "Category could not be created.");
      } finally {
        setCreatingCategory(false);
      }
      return;
    }

    updateField("categories", nextValue ? [nextValue] : []);
  }

  return (
    <div className="step-form-grid">
      <label className="field-block" htmlFor={basicsFieldIds.categories}>
        <span className="field-label-text">Project Category</span>
        <select
          id={basicsFieldIds.categories}
          value={values.categories[0] || ""}
          onChange={(event) => void handleCategoryChange(event.target.value)}
          aria-invalid={Boolean(errors.categories)}
          aria-describedby={errors.categories ? "project-categories-error" : "project-categories-help"}
          disabled={creatingCategory}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
          <option value={addCategoryOptionValue}>+ Add new category...</option>
        </select>
        <span id="project-categories-help" className="field-help">Choose an existing category or select "Add new category...".</span>
        {createCategoryError ? <span className="field-error" role="alert">{createCategoryError}</span> : null}
        {errors.categories ? (
          <span id="project-categories-error" className="field-error" role="alert">
            {errors.categories}
          </span>
        ) : null}
      </label>

      <label className="field-block" htmlFor="project-status">
        <span className="field-label-text">Status</span>
        <select
          id="project-status"
          name="status"
          value={values.status}
          onChange={(event) => updateField("status", event.target.value as ProjectStatus)}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export function BasicsSettingsFields({
  values,
  errors,
  updateField,
}: {
  values: ProjectFormValues;
  errors: BasicsStepErrors;
  updateField: UpdateField;
}) {
  return (
    <div className="step-form-grid">
      <label className="setting-card field-switch" htmlFor="project-featured">
        <span>
          <strong>Featured Project</strong>
          <small>Show this project as featured on the homepage.</small>
        </span>
        <input
          id="project-featured"
          name="featured"
          type="checkbox"
          role="switch"
          checked={values.featured}
          onChange={(event) => updateField("featured", event.target.checked)}
        />
      </label>
      <label className="setting-card field-block display-order-card" htmlFor={basicsFieldIds.displayOrder}>
        <span className="field-label-text">Display Order</span>
        <input
          id={basicsFieldIds.displayOrder}
          name="displayOrder"
          inputMode="numeric"
          value={values.displayOrder}
          onChange={(event) => updateField("displayOrder", event.target.value)}
          aria-invalid={Boolean(errors.displayOrder)}
          aria-describedby={errors.displayOrder ? "project-display-order-error" : undefined}
        />
        {errors.displayOrder ? (
          <span id="project-display-order-error" className="field-error" role="alert">
            {errors.displayOrder}
          </span>
        ) : null}
      </label>
    </div>
  );
}

export function BasicsQuickPreview({
  values,
  categories,
  technologies,
}: {
  values: ProjectFormValues;
  categories: CategoryReference[];
  technologies: TechnologyReference[];
}) {
  const selectedCategories = new Set(values.categories);
  const selectedTechnologyItems = technologies.filter((technology) => values.technologies.includes(technology.id)).slice(0, 4);
  const quickPreviewImage = values.cardImageUrl || values.featuredImageUrl || values.desktopImageUrl || values.mobileImageUrl;

  return (
    <article className="quick-preview-panel" aria-label="Quick card preview">
      <h3>Quick Preview (Card)</h3>
      <p>This is how your project appears in lists.</p>
      <div className="quick-preview-card">
        <div className="quick-preview-media" aria-hidden="true">
          {quickPreviewImage ? <img src={quickPreviewImage} alt="" /> : <span>Preview image</span>}
        </div>
        <div className="quick-preview-content">
          <div className="quick-preview-title-row">
            <strong>{values.title.trim() || "Untitled Project"}</strong>
            {values.featured ? <span className="tag blue-tag">Featured</span> : null}
          </div>
          <span>{categories.find((category) => selectedCategories.has(category.id))?.name || "No category selected"}</span>
          <small>{values.heroSummary.trim() || "Add a short description to populate project cards."}</small>
          {selectedTechnologyItems.length > 0 ? (
            <ul className="quick-preview-tech-list" aria-label="Selected technologies">
              {selectedTechnologyItems.map((technology) => (
                <li key={technology.id}>
                  <TechnologyIcon iconKey={technology.iconKey} name={technology.name} brandColor={technology.brandColor} size={13} />
                </li>
              ))}
            </ul>
          ) : null}
          <a href={values.projectUrl || "#"} onClick={(event) => event.preventDefault()}>
            View Project <ExternalLink aria-hidden="true" focusable="false" />
          </a>
        </div>
      </div>
    </article>
  );
}
