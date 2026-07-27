import { ImagePlus, Trash2, UploadCloud } from "lucide-react";
import { MediaPicker } from "../../media/MediaPicker";
import type { GalleryImage, MediaReference } from "../../../types/admin";
import type { ProjectFormValues } from "../ProjectForm";
import type { ImagesStepErrors } from "./ProjectImagesStep";

export type ImageField = "featured" | "desktop" | "mobile" | "card";

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
  return (
    <article className="image-section-card" aria-labelledby="required-images-heading">
      <header className="image-section-header">
        <div>
          <h3 id="required-images-heading">Required Images</h3>
          <p>These images are used in key areas of your portfolio.</p>
        </div>
      </header>

      <div className="required-image-grid">
        {requiredImages.map((item) => {
          const value = toReference(values, item.field);
          const altKey = keyFor(item.field, "Alt");
          const urlError = errors[keyFor(item.field, "Url") as keyof ImagesStepErrors];
          const altError = errors[altKey as keyof ImagesStepErrors];
          return (
            <article className="required-image-card" key={item.field}>
              <header>
                <div>
                  <h4>{item.title} <span aria-hidden="true">*</span></h4>
                  <p>{item.description}</p>
                </div>
                <span className={value ? "image-state is-complete" : "image-state"} aria-label={value ? "Image added" : "Image missing"} />
              </header>

              <MediaPicker label={item.title} value={value} requiredAlt onChange={(media) => updateMedia(item.field, media)} />
              {item.field === "card" ? (
                <div className="optional-thumbnail-picker">
                  <MediaPicker
                    label="Card Thumbnail (Optional Override)"
                    value={values.cardThumbnailUrl ? { id: values.cardThumbnailId, url: values.cardThumbnailUrl, alt: values.cardImageAlt } : null}
                    onChange={updateCardThumbnail}
                  />
                  <p className="image-recommendation">Use this only if you want a custom lightweight thumbnail separate from the main card image.</p>
                </div>
              ) : null}
              <p className="image-recommendation">{item.recommendation}</p>
              <label className="image-alt-field">
                Alt text
                <input value={values[altKey] as string} onChange={(event) => updateField(altKey, event.target.value as never)} required={Boolean(value)} />
              </label>
              {urlError ? <span className="field-error">{urlError}</span> : null}
              {altError ? <span className="field-error">{altError}</span> : null}
            </article>
          );
        })}
      </div>
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
