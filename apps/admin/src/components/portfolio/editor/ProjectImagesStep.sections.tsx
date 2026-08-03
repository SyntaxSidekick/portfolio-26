import { Check, Image as ImageIcon, ImagePlus, Trash2, UploadCloud } from "lucide-react";
import { MediaPicker } from "../../media/MediaPicker";
import type { GalleryImage, MediaReference } from "../../../types/admin";
import type { ProjectFormValues } from "../ProjectForm";
import type { ImagesStepErrors } from "./ProjectImagesStep";

export type ImageField = "featured" | "desktop" | "mobile" | "card";

type ImageFieldConfig = {
  field: ImageField;
  title: string;
  description: string;
  recommendedSize: string;
  required: boolean;
};

export const requiredImages: Array<{
  field: ImageField;
  title: string;
  description: string;
  recommendation: string;
}> = [
  { field: "featured", title: "Featured Image", description: "Used on the project page hero.", recommendation: "1920 x 1080 recommended" },
  { field: "desktop", title: "Desktop Image", description: "Used in the case study hero.", recommendation: "1920 x 1080 recommended" },
  { field: "mobile", title: "Mobile Image", description: "Used in mobile view / social share.", recommendation: "1080 x 1350 recommended" },
  { field: "card", title: "Card Image", description: "Used in project cards & lists.", recommendation: "1200 x 800 recommended" },
];

const imageFieldCards = [
  { field: "featured", title: "Featured Image", description: "Used on the project page hero.", recommendedSize: "1920 × 1080", required: true },
  { field: "desktop", title: "Desktop Image", description: "Used in the case study hero.", recommendedSize: "1920 × 1080", required: true },
  { field: "mobile", title: "Mobile Image", description: "Used in mobile view / social share.", recommendedSize: "1080 × 1350", required: true },
  { field: "card", title: "Card Image", description: "Used in project cards & lists.", recommendedSize: "1200 × 800", required: true },
] satisfies readonly ImageFieldConfig[];

export const keyFor = (field: ImageField, suffix: "Url" | "Id" | "Alt") => `${field}Image${suffix}` as keyof ProjectFormValues;

export function toReference(values: ProjectFormValues, field: ImageField): MediaReference | null {
  const url = values[keyFor(field, "Url")] as string;
  if (!url) return null;
  return {
    id: values[keyFor(field, "Id")] as string,
    url,
    alt: values[keyFor(field, "Alt")] as string,
  };
}

export function RequiredImagesSection({
  values,
  errors,
  updateField,
  updateMedia,
  updateCardThumbnail,
}: {
  values: ProjectFormValues;
  errors: ImagesStepErrors;
  updateField: <K extends keyof ProjectFormValues>(key: K, value: ProjectFormValues[K]) => void;
  updateMedia: (field: ImageField, media: MediaReference | null) => void;
  updateCardThumbnail: (media: MediaReference | null) => void;
}) {
  const completeCount = imageFieldCards.filter(({ field }) => {
    const value = toReference(values, field);
    if (!value?.url?.trim()) {
      return false;
    }
    return Boolean((values[keyFor(field, "Alt")] as string).trim());
  }).length;

  const allRequiredComplete = completeCount === imageFieldCards.length;

  return (
    <article className="project-images-shell" aria-labelledby="required-images-heading">
      <header className="project-images-header">
        <div className="project-images-title-wrap">
          <span className="project-images-icon" aria-hidden="true">
            <ImageIcon />
          </span>
          <div>
            <h3 id="required-images-heading">Project Images</h3>
            <p>Upload and manage images used across different areas of your portfolio.</p>
          </div>
        </div>
        {allRequiredComplete ? <p className="tag green-tag image-completion-status">All required images uploaded</p> : null}
      </header>

      <div className="primary-image-grid">
        {imageFieldCards.map((card) => (
          <ImageUploadCard key={card.field} card={card} values={values} errors={errors} updateField={updateField} updateMedia={updateMedia} />
        ))}
      </div>

      <ThumbnailUploadSection values={values} updateField={updateField} updateCardThumbnail={updateCardThumbnail} />

      <ul className="image-guidelines" aria-label="Image guidelines">
        <li><Check aria-hidden="true" focusable="false" /><span>Use high quality images in recommended sizes</span></li>
        <li><Check aria-hidden="true" focusable="false" /><span>Keep text and logos centered for best cropping</span></li>
        <li><Check aria-hidden="true" focusable="false" /><span>PNG or WebP format recommended</span></li>
        <li><Check aria-hidden="true" focusable="false" /><span>Optimize images for fast loading</span></li>
      </ul>
    </article>
  );
}

function ImageUploadCard({
  card,
  values,
  errors,
  updateField,
  updateMedia,
}: {
  card: ImageFieldConfig;
  values: ProjectFormValues;
  errors: ImagesStepErrors;
  updateField: <K extends keyof ProjectFormValues>(key: K, value: ProjectFormValues[K]) => void;
  updateMedia: (field: ImageField, media: MediaReference | null) => void;
}) {
  const value = toReference(values, card.field);
  const altKey = keyFor(card.field, "Alt");
  const urlError = errors[keyFor(card.field, "Url") as keyof ImagesStepErrors];
  const altError = errors[altKey as keyof ImagesStepErrors];
  const complete = Boolean(value?.url?.trim()) && Boolean((values[altKey] as string).trim());

  return (
    <article className="primary-image-card" data-field={card.field}>
      <header className="primary-image-header">
        <div>
          <h4>
            {card.title} {card.required ? <span aria-hidden="true">*</span> : null}
          </h4>
        </div>
        <span className={complete ? "image-state is-complete" : "image-state"} aria-label={complete ? `${card.title} complete` : `${card.title} missing`} />
      </header>

      <p className="image-description">{card.description}</p>

      <MediaPicker label={card.title} value={value} emptyPrimaryActionLabel="Replace" requiredAlt onChange={(media) => updateMedia(card.field, media)} />

      <p className="image-recommendation">
        <span className="tag green-tag">Recommended</span>
        <span>{card.recommendedSize}</span>
      </p>

      <label className="image-alt-field">
        Alt text
        <input
          value={values[altKey] as string}
          onChange={(event) => updateField(altKey, event.target.value as never)}
          required={Boolean(value)}
        />
      </label>

      {urlError ? <span className="field-error">{urlError}</span> : null}
      {altError ? <span className="field-error">{altError}</span> : null}
    </article>
  );
}

function ThumbnailUploadSection({
  values,
  updateField,
  updateCardThumbnail,
}: {
  values: ProjectFormValues;
  updateField: <K extends keyof ProjectFormValues>(key: K, value: ProjectFormValues[K]) => void;
  updateCardThumbnail: (media: MediaReference | null) => void;
}) {
  const thumbnailValue = values.cardThumbnailUrl
    ? { id: values.cardThumbnailId, url: values.cardThumbnailUrl, alt: values.cardImageAlt }
    : null;

  return (
    <article className="thumbnail-image-section" aria-labelledby="thumbnail-image-heading">
      <div className="thumbnail-meta">
        <div className="thumbnail-preview-chip" aria-hidden="true">TH</div>
        <div>
          <h4 id="thumbnail-image-heading">Thumbnail Image</h4>
          <p>Small icon used in admin tables, tabs, and compact views.</p>
        </div>
      </div>

      <div className="thumbnail-current">
        <p className="thumbnail-label">Current Image</p>
        <div className="thumbnail-current-preview" role="img" aria-label={thumbnailValue?.alt || "No thumbnail selected"}>
          {thumbnailValue?.url ? <img src={thumbnailValue.url} alt={thumbnailValue.alt || "Thumbnail preview"} /> : <span>No image</span>}
        </div>
      </div>

      <div className="thumbnail-size">
        <p className="thumbnail-label">Recommended Size</p>
        <strong>58 × 34</strong>
        <small>PNG or WebP • Max 10KB</small>
      </div>

      <div className="thumbnail-actions">
        <MediaPicker label="Thumbnail Image" value={thumbnailValue} emptyPrimaryActionLabel="Replace" onChange={updateCardThumbnail} />
      </div>

      <label className="image-alt-field thumbnail-alt-field">
        Alt text
        <input value={values.cardImageAlt} onChange={(event) => updateField("cardImageAlt", event.target.value)} />
      </label>
    </article>
  );
}

export function SupportingImagesSection({
  values,
  addGalleryPlaceholder,
  removeGalleryImage,
  onChange,
}: {
  values: ProjectFormValues;
  addGalleryPlaceholder: () => void;
  removeGalleryImage: (id: string) => void;
  onChange: (values: ProjectFormValues) => void;
}) {
  return (
    <article className="image-section-card" aria-labelledby="supporting-images-heading">
      <header className="image-section-header">
        <div>
          <h3 id="supporting-images-heading">Optional Supporting Images</h3>
          <p>Add screenshots and supporting visuals for this project.</p>
        </div>
        <button className="button button-secondary" type="button" onClick={addGalleryPlaceholder}>
          <ImagePlus aria-hidden="true" focusable="false" />
          Add Images
        </button>
      </header>

      {values.gallery.length > 0 ? (
        <div className="supporting-image-grid">
          {values.gallery.map((image) => (
            <article className="supporting-image-card" key={image.id}>
              {image.url ? <img src={image.url} alt={image.alt || ""} /> : <div className="supporting-placeholder">Select image</div>}
              <MediaPicker
                label="Supporting image"
                value={image.url ? { id: image.id, url: image.url, alt: image.alt } : null}
                onChange={(media) => {
                  onChange({
                    ...values,
                    gallery: values.gallery.map((entry) => entry.id === image.id ? { ...entry, id: media?.id || entry.id, url: media?.url || "", alt: media?.alt || entry.alt } : entry),
                  });
                }}
              />
              <button className="icon-button image-remove-button" type="button" onClick={() => removeGalleryImage(image.id)} aria-label="Remove supporting image">
                <Trash2 aria-hidden="true" focusable="false" />
              </button>
            </article>
          ))}
        </div>
      ) : null}

      <div className="image-drop-zone">
        <UploadCloud aria-hidden="true" focusable="false" />
        <div>
          <strong>Drag and drop images here</strong>
          <p>or click to browse your files</p>
          <small>PNG, JPG, WEBP up to the media upload limit</small>
        </div>
      </div>
    </article>
  );
}

export function createGalleryPlaceholder(galleryLength: number): GalleryImage {
  return {
    id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now()),
    url: "",
    alt: "",
    caption: "",
    order: galleryLength,
    isFeatured: false,
  };
}
