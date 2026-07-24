import { useEffect, useState } from "react";
import { listMedia, toMediaReference, uploadMedia } from "../../api/media";
import type { MediaItem, MediaReference } from "../../types/admin";

export function MediaPicker({
  value,
  onChange,
  label,
  requiredAlt,
}: {
  value?: MediaReference | null;
  onChange: (media: MediaReference | null) => void;
  label: string;
  requiredAlt?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);

  const load = () => listMedia({ search, type: "image", limit: 24 }).then((result) => setItems(result.items)).catch(() => setItems([]));

  useEffect(() => {
    if (open) void load();
  }, [open]);

  async function handleUpload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    try {
      const uploaded = await uploadMedia(Array.from(files));
      if (uploaded[0]) onChange(toMediaReference(uploaded[0]));
      setOpen(false);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="media-picker">
      <div className="media-picker-header">
        <span>{label}</span>
        <div className="heading-actions">
          <button className="button button-secondary" type="button" onClick={() => setOpen(true)}>{value ? "Replace" : "Select Image"}</button>
          <label className="button button-secondary">Upload<input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" onChange={(event) => handleUpload(event.target.files)} /></label>
          {value ? <button className="button button-secondary" type="button" onClick={() => onChange(null)}>Remove</button> : null}
        </div>
      </div>
      {value ? <div className="media-picker-preview"><img src={value.thumbnailUrl || value.url} alt={value.alt || ""} /><small>{value.title || value.url}{value.width && value.height ? ` · ${value.width} x ${value.height}` : ""}</small>{requiredAlt && !value.alt ? <span className="notice error">Alt text required</span> : null}</div> : <div className="media-placeholder">No image selected.</div>}
      {open ? (
        <div className="media-picker-dialog" role="dialog" aria-modal="true" aria-label={`${label} media picker`}>
          <div className="panel media-picker-modal">
            <div className="panel-header"><h2>Select Image</h2><button className="button button-secondary" type="button" onClick={() => setOpen(false)}>Close</button></div>
            <div className="media-toolbar"><label>Search<input value={search} onChange={(event) => setSearch(event.target.value)} /></label><button className="button button-secondary" type="button" onClick={load}>Search</button><span>{uploading ? "Uploading..." : ""}</span></div>
            <div className="media-library-grid">
              {items.map((item) => <button className="media-library-item" type="button" key={item.id} onClick={() => { onChange(toMediaReference(item)); setOpen(false); }}><img src={item.thumbnailUrl || item.url} alt={item.alt || ""} /><strong>{item.title || item.filename}</strong><small>{item.width && item.height ? `${item.width} x ${item.height}` : ""}</small></button>)}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
