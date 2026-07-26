import { useMemo, useState } from "react";
import { Check, ImagePlus, MoveHorizontal, Trash2, UploadCloud, X } from "lucide-react";
import { listMedia, toMediaReference, uploadMedia } from "../../../api/media";
import type { GalleryImage, MediaItem } from "../../../types/admin";
import type { ProjectFormValues } from "../ProjectForm";

function makeImageFromMedia(item: MediaItem, order: number): GalleryImage {
  return {
    id: item.id,
    url: item.url,
    alt: item.alt || item.title || "",
    caption: item.caption ?? "",
    order,
    isFeatured: false,
  };
}

function normalizeGallery(images: GalleryImage[]) {
  const ordered = [...images].map((item, index) => ({ ...item, order: index }));
  if (ordered.length === 0) {
    return ordered;
  }

  const featuredIndex = ordered.findIndex((item) => item.isFeatured);
  if (featuredIndex === -1) {
    ordered[0] = { ...ordered[0], isFeatured: true };
    return ordered;
  }

  return ordered.map((item, index) => ({ ...item, isFeatured: index === featuredIndex }));
}

function reorder<T>(items: T[], from: number, to: number) {
  if (from === to || from < 0 || to < 0 || from >= items.length || to >= items.length) {
    return items;
  }
  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

export function ProjectGalleryStep({
  values,
  onChange,
}: {
  values: ProjectFormValues;
  onChange: (values: ProjectFormValues) => void;
}) {
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [librarySelection, setLibrarySelection] = useState<Set<string>>(new Set());
  const [selectedGalleryIds, setSelectedGalleryIds] = useState<Set<string>>(new Set());
  const [replaceTargetId, setReplaceTargetId] = useState<string | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const gallery = useMemo(() => normalizeGallery(values.gallery), [values.gallery]);

  function updateGallery(nextGallery: GalleryImage[]) {
    onChange({ ...values, gallery: normalizeGallery(nextGallery) });
  }

  async function loadMedia() {
    setLoadingMedia(true);
    try {
      const result = await listMedia({ search, type: "image", limit: 60 });
      setMediaItems(result.items);
    } catch {
      setMediaItems([]);
    } finally {
      setLoadingMedia(false);
    }
  }

  function openLibrary(targetId?: string) {
    setReplaceTargetId(targetId ?? null);
    setLibrarySelection(new Set());
    setLibraryOpen(true);
    void loadMedia();
  }

  function closeLibrary() {
    setLibraryOpen(false);
    setLibrarySelection(new Set());
    setReplaceTargetId(null);
  }

  function toggleLibrarySelection(id: string) {
    setLibrarySelection((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (replaceTargetId) {
          return new Set([id]);
        }
        next.add(id);
      }
      return next;
    });
  }

  function appendUniqueImages(items: MediaItem[]) {
    const existing = new Set(gallery.map((image) => image.id));
    const additions = items.filter((item) => !existing.has(item.id)).map((item, index) => makeImageFromMedia(item, gallery.length + index));
    if (additions.length === 0) {
      return;
    }
    updateGallery([...gallery, ...additions]);
  }

  function applyLibrarySelection() {
    const selectedItems = mediaItems.filter((item) => librarySelection.has(item.id));
    if (selectedItems.length === 0) {
      return;
    }

    if (replaceTargetId) {
      const replacement = selectedItems[0];
      const replacementAlreadyPresent = gallery.some((image) => image.id === replacement.id && image.id !== replaceTargetId);
      if (replacementAlreadyPresent) {
        updateGallery(gallery.filter((image) => image.id !== replaceTargetId));
        closeLibrary();
        return;
      }

      updateGallery(
        gallery.map((image) =>
          image.id === replaceTargetId
            ? {
                ...image,
                id: replacement.id,
                url: replacement.url,
                alt: image.alt || replacement.alt || replacement.title || "",
                caption: image.caption || replacement.caption || "",
              }
            : image,
        ),
      );
      closeLibrary();
      return;
    }

    appendUniqueImages(selectedItems);
    closeLibrary();
  }

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) {
      return;
    }
    setUploading(true);
    try {
      const uploaded = await uploadMedia(Array.from(files));
      appendUniqueImages(uploaded);
    } finally {
      setUploading(false);
    }
  }

  function selectGallery(id: string) {
    setSelectedGalleryIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function selectAllGallery() {
    if (selectedGalleryIds.size === gallery.length) {
      setSelectedGalleryIds(new Set());
      return;
    }
    setSelectedGalleryIds(new Set(gallery.map((image) => image.id)));
  }

  function removeSelectedGallery() {
    if (selectedGalleryIds.size === 0) {
      return;
    }
    updateGallery(gallery.filter((image) => !selectedGalleryIds.has(image.id)));
    setSelectedGalleryIds(new Set());
  }

  function setCover(id: string) {
    updateGallery(gallery.map((image) => ({ ...image, isFeatured: image.id === id })));
  }

  function removeSingle(id: string) {
    updateGallery(gallery.filter((image) => image.id !== id));
    setSelectedGalleryIds((current) => {
      const next = new Set(current);
      next.delete(id);
      return next;
    });
  }

  function moveImage(index: number, direction: -1 | 1) {
    updateGallery(reorder(gallery, index, index + direction));
  }

  function handleDragStart(index: number) {
    setDragIndex(index);
  }

  function handleDrop(targetIndex: number) {
    if (dragIndex === null) {
      return;
    }
    updateGallery(reorder(gallery, dragIndex, targetIndex));
    setDragIndex(null);
  }

  return (
    <section className="step-panel gallery-step-panel" aria-labelledby="project-gallery-heading">
      <header className="step-panel-header gallery-step-header">
        <div>
          <h2 id="project-gallery-heading">Project Gallery</h2>
          <p>Add screenshots and images to showcase your project.</p>
        </div>
      </header>

      <article className="gallery-drop-panel" aria-label="Add gallery images">
        <label className="gallery-drop-zone">
          <input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" multiple onChange={(event) => void handleUpload(event.target.files)} />
          <UploadCloud aria-hidden="true" focusable="false" />
          <strong>Drag and drop images here</strong>
          <p>or click to browse your files</p>
          <small>{uploading ? "Uploading..." : "PNG, JPG, WEBP up to upload limit each"}</small>
        </label>
        <div className="gallery-drop-actions">
          <button className="button button-secondary" type="button" onClick={() => openLibrary()}>
            <ImagePlus aria-hidden="true" focusable="false" />
            Select from Media Library
          </button>
        </div>
      </article>

      <article className="gallery-images-panel" aria-labelledby="gallery-images-heading">
        <header className="gallery-images-header">
          <div>
            <h3 id="gallery-images-heading">Gallery Images ({gallery.length})</h3>
            <p>Drag to reorder. The cover image is featured in previews.</p>
          </div>
          <div className="gallery-list-actions">
            <button className="button button-secondary" type="button" onClick={selectAllGallery}>Select All</button>
            <button className="button button-secondary" type="button" onClick={removeSelectedGallery} disabled={selectedGalleryIds.size === 0}>
              <Trash2 aria-hidden="true" focusable="false" />
              Remove Selected
            </button>
          </div>
        </header>

        {gallery.length > 0 ? (
          <ul className="gallery-image-grid" aria-label="Project gallery images">
            {gallery.map((image, index) => (
              <li
                key={image.id}
                className={image.isFeatured ? "gallery-image-card is-cover" : "gallery-image-card"}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => handleDrop(index)}
              >
                <div className="gallery-image-topbar">
                  <label className="gallery-select-check">
                    <input type="checkbox" checked={selectedGalleryIds.has(image.id)} onChange={() => selectGallery(image.id)} />
                    <span className="sr-only">Select image</span>
                  </label>
                  {image.isFeatured ? <span className="tag blue-tag">Cover</span> : null}
                  <button className="icon-button" type="button" onClick={() => setCover(image.id)} aria-label="Set as gallery cover">
                    <Check aria-hidden="true" focusable="false" />
                  </button>
                </div>

                <div className="gallery-image-thumb-wrap" aria-hidden="true">
                  {image.url ? <img src={image.url} alt="" className="gallery-image-thumb" /> : <div className="gallery-image-placeholder">Image</div>}
                </div>

                <div className="gallery-image-meta">
                  <p>{index + 1}. {image.id}</p>
                </div>

                <label className="field-block">
                  <span className="field-label-text">Alt text</span>
                  <input
                    value={image.alt}
                    onChange={(event) => {
                      updateGallery(gallery.map((entry) => entry.id === image.id ? { ...entry, alt: event.target.value } : entry));
                    }}
                  />
                </label>

                <label className="field-block">
                  <span className="field-label-text">Caption</span>
                  <input
                    value={image.caption}
                    onChange={(event) => {
                      updateGallery(gallery.map((entry) => entry.id === image.id ? { ...entry, caption: event.target.value } : entry));
                    }}
                  />
                </label>

                <div className="gallery-image-actions">
                  <button type="button" onClick={() => moveImage(index, -1)} disabled={index === 0}>
                    <MoveHorizontal aria-hidden="true" focusable="false" />
                    Left
                  </button>
                  <button type="button" onClick={() => moveImage(index, 1)} disabled={index === gallery.length - 1}>
                    <MoveHorizontal aria-hidden="true" focusable="false" />
                    Right
                  </button>
                  <button type="button" onClick={() => openLibrary(image.id)}>Replace</button>
                  <button type="button" className="danger-text" onClick={() => removeSingle(image.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-copy">No gallery images yet. Add images from your media library or upload new ones.</p>
        )}
      </article>

      {libraryOpen ? (
        <div className="media-picker-dialog" role="dialog" aria-modal="true" aria-label="Gallery media library">
          <div className="panel media-picker-modal">
            <div className="panel-header">
              <h2>{replaceTargetId ? "Replace Gallery Image" : "Add Gallery Images"}</h2>
              <button className="button button-secondary" type="button" onClick={closeLibrary}><X aria-hidden="true" focusable="false" /></button>
            </div>
            <div className="media-toolbar">
              <label>
                Search
                <input value={search} onChange={(event) => setSearch(event.target.value)} />
              </label>
              <button className="button button-secondary" type="button" onClick={() => void loadMedia()}>{loadingMedia ? "Searching..." : "Search"}</button>
              <span>{replaceTargetId ? "Select one image to replace." : `${librarySelection.size} selected`}</span>
            </div>
            <div className="media-library-grid">
              {mediaItems.map((item) => {
                const active = librarySelection.has(item.id);
                return (
                  <button className={active ? "media-library-item is-active" : "media-library-item"} type="button" key={item.id} onClick={() => toggleLibrarySelection(item.id)}>
                    <img src={item.thumbnailUrl || item.url} alt={item.alt || ""} />
                    <strong>{item.title || item.filename}</strong>
                    <small>{item.width && item.height ? `${item.width} x ${item.height}` : ""}</small>
                  </button>
                );
              })}
            </div>
            <div className="gallery-library-actions">
              <button className="button button-secondary" type="button" onClick={closeLibrary}>Cancel</button>
              <button className="button button-primary" type="button" onClick={applyLibrarySelection} disabled={librarySelection.size === 0}>
                {replaceTargetId ? "Replace Image" : `Add ${librarySelection.size} Image${librarySelection.size === 1 ? "" : "s"}`}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
