import { useEffect, useMemo, useState } from "react";
import { deleteMedia, listMedia, patchMedia, uploadMedia } from "../api/media";
import { PageHeading } from "../components/shared/PageHeading";
import type { MediaItem } from "../types/admin";

const formatBytes = (size: number) => size < 1024 * 1024 ? `${Math.round(size / 1024)} KB` : `${(size / 1024 / 1024).toFixed(1)} MB`;

export function MediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const [checked, setChecked] = useState<string[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notice, setNotice] = useState("");

  const load = () => {
    setLoading(true);
    listMedia({ page, limit: 40, search, type: "image", sort })
      .then((result) => { setItems(result.items); setPages(result.pagination.pages || 1); })
      .catch((error: unknown) => setNotice(error instanceof Error ? error.message : "Media could not be loaded"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [page, sort]);

  const selectedDraft = useMemo(() => selected, [selected]);

  async function handleFiles(files: FileList | File[]) {
    setUploading(true);
    setNotice("");
    try {
      const uploaded = await uploadMedia(Array.from(files));
      setNotice(`${uploaded.length} file${uploaded.length === 1 ? "" : "s"} uploaded.`);
      setSelected(uploaded[0] ?? null);
      await listMedia({ page: 1, limit: 40, search, type: "image", sort }).then((result) => { setItems(result.items); setPages(result.pagination.pages || 1); });
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function saveSelected() {
    if (!selected) return;
    const saved = await patchMedia(selected.id, { title: selected.title, alt: selected.alt, caption: selected.caption, description: selected.description, tags: selected.tags });
    setSelected(saved);
    setItems((current) => current.map((item) => item.id === saved.id ? saved : item));
    setNotice("Media details saved.");
  }

  async function remove(id: string) {
    try {
      await deleteMedia(id);
      setItems((current) => current.filter((item) => item.id !== id));
      if (selected?.id === id) setSelected(null);
      setNotice("Media deleted.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Media could not be deleted");
    }
  }

  return (
    <>
      <PageHeading title="Media Library" description="Upload, manage, and reuse media across portfolio content." />
      {notice ? <p className="notice">{notice}</p> : null}
      <section className="panel media-library-panel">
        <div className="panel-header">
          <h2>Library</h2>
          <div className="heading-actions">
            <label className="button button-primary">Upload Media<input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" multiple onChange={(event) => event.target.files && handleFiles(event.target.files)} /></label>
            <button className="button button-secondary" type="button" onClick={() => setView(view === "grid" ? "list" : "grid")}>{view === "grid" ? "List view" : "Grid view"}</button>
          </div>
        </div>
        <div className="media-toolbar">
          <label>Search<input value={search} onChange={(event) => setSearch(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") load(); }} /></label>
          <label>Sort<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="newest">Newest</option><option value="oldest">Oldest</option><option value="name">Name</option><option value="size">Size</option></select></label>
          <button className="button button-secondary" type="button" onClick={load}>Apply</button>
        </div>
        <div className="upload-drop" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); void handleFiles(event.dataTransfer.files); }}>{uploading ? "Uploading..." : "Drag images here to upload"}</div>
        {loading ? <p className="empty-panel">Loading media...</p> : null}
        {!loading && !items.length ? <p className="empty-panel">No media uploaded yet.</p> : null}
        <div className={view === "grid" ? "media-library-grid" : "media-library-list"}>
          {items.map((item) => (
            <button className={`media-library-item${selected?.id === item.id ? " is-active" : ""}`} type="button" key={item.id} onClick={() => setSelected(item)}>
              <input type="checkbox" checked={checked.includes(item.id)} onChange={(event) => { event.stopPropagation(); setChecked(event.target.checked ? [...checked, item.id] : checked.filter((id) => id !== item.id)); }} />
              <img src={item.thumbnailUrl || item.url} alt={item.alt || ""} />
              <strong>{item.title || item.filename}</strong>
              <small>{item.width && item.height ? `${item.width} x ${item.height}` : "Dimensions pending"} · {formatBytes(item.size)}</small>
              <time>{new Date(item.createdAt).toLocaleDateString()}</time>
            </button>
          ))}
        </div>
        <div className="pagination-row"><button type="button" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button><span>Page {page} of {pages}</span><button type="button" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button></div>
      </section>
      {selectedDraft ? (
        <aside className="panel media-detail-panel">
          <div className="panel-header"><h2>Attachment Details</h2><button className="button button-secondary" type="button" onClick={() => remove(selectedDraft.id)}>Delete</button></div>
          <div className="form-stack">
            <img className="media-detail-preview" src={selectedDraft.largeUrl || selectedDraft.url} alt={selectedDraft.alt || ""} />
            <p className="empty-copy">{selectedDraft.filename} · {selectedDraft.mimeType} · {formatBytes(selectedDraft.size)}</p>
            <label>URL<input readOnly value={selectedDraft.url} onFocus={(event) => event.currentTarget.select()} /></label>
            <label>Title<input value={selectedDraft.title} onChange={(event) => setSelected({ ...selectedDraft, title: event.target.value })} /></label>
            <label>Alt text<input value={selectedDraft.alt} onChange={(event) => setSelected({ ...selectedDraft, alt: event.target.value })} /></label>
            <label>Caption<input value={selectedDraft.caption ?? ""} onChange={(event) => setSelected({ ...selectedDraft, caption: event.target.value })} /></label>
            <label>Description<textarea value={selectedDraft.description ?? ""} onChange={(event) => setSelected({ ...selectedDraft, description: event.target.value })} /></label>
            <label>Tags<input value={selectedDraft.tags.join(", ")} onChange={(event) => setSelected({ ...selectedDraft, tags: event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean) })} /></label>
            <button className="button button-primary" type="button" onClick={saveSelected}>Save Details</button>
          </div>
        </aside>
      ) : null}
    </>
  );
}
