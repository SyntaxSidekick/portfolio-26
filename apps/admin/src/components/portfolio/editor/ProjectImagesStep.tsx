import type { MediaReference } from "../../../types/admin";
import type { ProjectFormValues } from "../ProjectForm";
import {
  keyFor,
  requiredImages,
  RequiredImagesSection,
  type ImageField,
} from "./ProjectImagesStep.sections";

export interface ImagesStepErrors {
  featuredImageUrl?: string;
  desktopImageUrl?: string;
  mobileImageUrl?: string;
  cardImageUrl?: string;
  featuredImageAlt?: string;
  desktopImageAlt?: string;
  mobileImageAlt?: string;
  cardImageAlt?: string;
}

export function validateImagesStep(values: ProjectFormValues): ImagesStepErrors {
  const errors: ImagesStepErrors = {};
  requiredImages.forEach(({ field }) => {
    const urlKey = keyFor(field, "Url") as keyof ImagesStepErrors;
    const altKey = keyFor(field, "Alt") as keyof ImagesStepErrors;
    if (!(values[keyFor(field, "Url")] as string).trim()) {
      errors[urlKey] = "Image is required.";
    }
    if ((values[keyFor(field, "Url")] as string).trim() && !(values[keyFor(field, "Alt")] as string).trim()) {
      errors[altKey] = "Alt text is required.";
    }
  });
  return errors;
}

export function ProjectImagesStep({
  values,
  errors,
  onChange,
}: {
  values: ProjectFormValues;
  errors: ImagesStepErrors;
  onChange: (values: ProjectFormValues) => void;
}) {
  function updateField<K extends keyof ProjectFormValues>(key: K, value: ProjectFormValues[K]) {
    onChange({ ...values, [key]: value });
  }

  function updateMedia(field: ImageField, media: MediaReference | null) {
    onChange({
      ...values,
      [keyFor(field, "Url")]: media?.url ?? "",
      [keyFor(field, "Id")]: media?.id ?? "",
      [keyFor(field, "Alt")]: media?.alt ?? values[keyFor(field, "Alt")] ?? "",
    });
  }

  return (
    <section className="step-panel images-step-panel" aria-labelledby="project-images-heading">
      <header className="step-panel-header">
        <h2 id="project-images-heading">Project Images</h2>
        <p>Upload and manage required core project images used across cards, hero, and device views.</p>
      </header>

      <RequiredImagesSection values={values} errors={errors} updateField={updateField} updateMedia={updateMedia} />
    </section>
  );
}
