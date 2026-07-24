import { useEffect, useState } from "react";
import { isAbortError } from "../../api/client";
import type { CategoryPayload } from "../../api/categories";
import type { TechnologyPayload } from "../../api/technologies";
import type { CategoryReference, TechnologyReference } from "../../types/admin";

type Item = CategoryReference | TechnologyReference;

export function TaxonomyManager<T extends Item>({
  title,
  load,
  create,
  update,
  remove,
  technology,
}: {
  title: string;
  load: (signal?: AbortSignal) => Promise<T[]>;
  create: (payload: CategoryPayload | TechnologyPayload) => Promise<T>;
  update: (id: string, payload: CategoryPayload | TechnologyPayload) => Promise<T>;
  remove: (id: string) => Promise<void>;
  technology?: boolean;
}) {
  const [items, setItems] = useState<T[]>([]);
  const [editing, setEditing] = useState<T | undefined>();
  const [form, setForm] = useState({ name: "", slug: "", iconKey: "", brandColor: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    load(controller.signal)
      .then((items) => {
        if (active) setItems(items);
      })
      .catch((error: unknown) => {
        if (active && !isAbortError(error)) setError(error instanceof Error ? error.message : "Items could not be loaded");
      });
    return () => {
      active = false;
      controller.abort();
    };
  }, [load]);

  function startEdit(item: T) {
    setEditing(item);
    setForm({ name: item.name, slug: item.slug, iconKey: "iconKey" in item ? item.iconKey ?? "" : "", brandColor: "brandColor" in item ? item.brandColor ?? "" : "" });
  }

  function reset() {
    setEditing(undefined);
    setForm({ name: "", slug: "", iconKey: "", brandColor: "" });
  }

  async function submit() {
    setError("");
    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }
    const payload = technology ? form : { name: form.name, slug: form.slug };
    const saved = editing ? await update(editing.id, payload) : await create(payload);
    setItems((current) => editing ? current.map((item) => item.id === saved.id ? saved : item) : [...current, saved]);
    setMessage(`${saved.name} saved.`);
    reset();
  }

  async function handleDelete(item: T) {
    if (!confirm(`Delete ${item.name}?`)) return;
    try {
      await remove(item.id);
      setItems((current) => current.filter((currentItem) => currentItem.id !== item.id));
      setMessage(`${item.name} deleted.`);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Delete failed");
    }
  }

  return (
    <section className="dashboard-grid secondary-grid">
      <article className="panel">
        <div className="panel-header"><h2>{title}</h2></div>
        {error ? <p className="notice error">{error}</p> : null}
        {message ? <p className="notice success">{message}</p> : null}
        <div className="table-wrap">
          <table><thead><tr><th>Name</th><th>Slug</th>{technology ? <th>Icon</th> : null}<th>Usage</th><th>Actions</th></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td>{item.name}</td><td>{item.slug}</td>{technology ? <td>{"iconKey" in item ? item.iconKey : ""}</td> : null}<td>{item.usageCount ?? 0}</td><td className="actions"><button type="button" onClick={() => startEdit(item)}>Edit</button><button type="button" onClick={() => handleDelete(item)}>Delete</button></td></tr>)}</tbody></table>
        </div>
      </article>
      <article className="panel form-panel">
        <div className="panel-header"><h2>{editing ? "Edit" : "Create"}</h2></div>
        <div className="form-stack">
          <label>Name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
          <label>Slug<input value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} /></label>
          {technology ? <label>Icon key<input value={form.iconKey} onChange={(event) => setForm({ ...form, iconKey: event.target.value })} /></label> : null}
          {technology ? <label>Brand color<input value={form.brandColor} onChange={(event) => setForm({ ...form, brandColor: event.target.value })} /></label> : null}
          <div className="heading-actions"><button className="button button-secondary" type="button" onClick={reset}>Cancel</button><button className="button button-primary" type="button" onClick={submit}>Save</button></div>
        </div>
      </article>
    </section>
  );
}
