import { useEffect, useState } from "react";
import { createCategory } from "../../../api/categories";
import type { CategoryReference, TechnologyReference } from "../../../types/admin";
import type { ProjectFormValues } from "../ProjectForm";
import type { BasicsStepErrors } from "./projectEditorCompletion";
import { basicsFieldIds, basicsFieldOrder } from "./ProjectBasicsStep.constants";
import {
  BasicsCategoryStatusFields,
  BasicsIdentityFields,
  BasicsQuickPreview,
  BasicsSettingsFields,
  BasicsSummaryField,
} from "./ProjectBasicsStep.sections";
export { basicsFieldIds, basicsFieldOrder } from "./ProjectBasicsStep.constants";

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ProjectBasicsStep({
  values,
  categories,
  technologies,
  errors,
  onChange,
}: {
  values: ProjectFormValues;
  categories: CategoryReference[];
  technologies: TechnologyReference[];
  errors: BasicsStepErrors;
  onChange: (values: ProjectFormValues) => void;
}) {
  const [availableCategories, setAvailableCategories] = useState<CategoryReference[]>(categories);

  useEffect(() => {
    setAvailableCategories(categories);
  }, [categories]);

  function updateField<K extends keyof ProjectFormValues>(key: K, value: ProjectFormValues[K]) {
    onChange({ ...values, [key]: value });
  }

  function updateTitle(title: string) {
    onChange({
      ...values,
      title,
      slug: values.slug.trim() ? values.slug : slugify(title),
    });
  }

  async function handleCreateCategory(name: string) {
    const trimmed = name.trim();
    const existing = availableCategories.find((category) => category.name.trim().toLowerCase() === trimmed.toLowerCase());
    if (existing) {
      return existing;
    }

    const created = await createCategory({
      name: trimmed,
      slug: slugify(trimmed),
    });

    setAvailableCategories((current) => {
      if (current.some((category) => category.id === created.id)) {
        return current;
      }
      return [...current, created].sort((a, b) => a.name.localeCompare(b.name));
    });

    return created;
  }

  return (
    <section className="step-panel" aria-labelledby="project-basics-heading">
      <header className="step-panel-header">
        <h2 id="project-basics-heading">Project Basics</h2>
        <p>The essential information about your project.</p>
      </header>

      <BasicsIdentityFields values={values} errors={errors} updateTitle={updateTitle} updateField={updateField} />

      <BasicsSummaryField values={values} errors={errors} updateField={updateField} />

      <BasicsCategoryStatusFields values={values} categories={availableCategories} errors={errors} updateField={updateField} onCreateCategory={handleCreateCategory} />

      <BasicsSettingsFields values={values} errors={errors} updateField={updateField} />

      <label className="sr-only" htmlFor={basicsFieldIds.slug}>
        Slug
        <input
          id={basicsFieldIds.slug}
          name="slug"
          value={values.slug}
          onChange={(event) => updateField("slug", event.target.value)}
          aria-invalid={Boolean(errors.slug)}
        />
      </label>

      <BasicsQuickPreview values={values} categories={categories} technologies={technologies} />

    </section>
  );
}
