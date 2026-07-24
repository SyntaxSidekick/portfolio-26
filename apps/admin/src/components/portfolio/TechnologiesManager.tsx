import { useEffect, useMemo, useState } from "react";
import { createTechnology, deleteTechnology, listTechnologies, updateTechnology, type TechnologyPayload } from "../../api/technologies";
import { isTechnologyIconSupported, TechnologyIcon } from "../../lib/technologyIcons";
import type { TechnologyCategory, TechnologyReference } from "../../types/admin";

const categories: TechnologyCategory[] = ["frontend", "framework", "language", "styling", "backend", "database", "cms", "design", "testing", "build-tool", "devops", "cloud", "accessibility", "other"];

const emptyForm: TechnologyPayload = {
  key: "",
  name: "",
  slug: "",
  category: "other",
  iconKey: "",
  brandColor: "",
  active: true,
  displayOrder: 0,
};

export function TechnologiesManager() {
  const [technologies, setTechnologies] = useState<TechnologyReference[]>([]);
  const [form, setForm] = useState<TechnologyPayload>(emptyForm);
  const [editing, setEditing] = useState<TechnologyReference | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("name");
  const [notice, setNotice] = useState("");

  const load = () => listTechnologies().then(setTechnologies).catch((error: unknown) => setNotice(error instanceof Error ? error.message : "Unable to load technologies"));

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return technologies
      .filter((technology) => category === "all" || technology.category === category)
      .filter((technology) => status === "all" || String(technology.active) === status)
      .filter((technology) => !query || [technology.name, technology.slug, technology.key ?? "", technology.iconKey].some((value) => value.toLowerCase().includes(query)))
      .sort((a, b) => {
        if (sort === "usage") return (b.usageCount ?? 0) - (a.usageCount ?? 0) || a.name.localeCompare(b.name);
        if (sort === "category") return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
        return a.name.localeCompare(b.name);
      });
  }, [category, search, sort, status, technologies]);

  const startEdit = (technology: TechnologyReference) => {
    setEditing(technology);
    setForm({
      key: technology.key ?? "",
      name: technology.name,
      slug: technology.slug,
      category: technology.category,
      iconKey: technology.iconKey,
      brandColor: technology.brandColor ?? "",
      active: technology.active,
      displayOrder: technology.displayOrder,
    });
  };

  const save = async () => {
    try {
      const payload = { ...form, key: form.key?.trim() || form.name, slug: form.slug.trim() || form.name };
      await (editing ? updateTechnology(editing.id, payload) : createTechnology(payload));
      setForm(emptyForm);
      setEditing(null);
      setNotice("Technology saved.");
      await load();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Unable to save technology");
    }
  };

  const remove = async (technology: TechnologyReference) => {
    try {
      await deleteTechnology(technology.id);
      setNotice("Technology deleted.");
      await load();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Unable to delete technology");
    }
  };

  return (
    <>
      {notice ? <p className="notice">{notice}</p> : null}
      <div className="filters">
        <label>Search<input value={search} onChange={(event) => setSearch(event.target.value)} /></label>
        <label>Category<select value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">All categories</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label>Status<select value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">All statuses</option><option value="true">Active</option><option value="false">Inactive</option></select></label>
        <label>Sort<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="name">Name</option><option value="usage">Usage</option><option value="category">Category</option></select></label>
      </div>
      <article className="panel">
        <div className="panel-header"><h2>Technologies</h2></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Name</th><th>Slug</th><th>Category</th><th>Icon</th><th>Brand</th><th>Usage</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map((technology) => (
                <tr key={technology.id}>
                  <td><strong>{technology.name}</strong><small>{technology.source === "system" ? "System" : "Custom"}</small></td>
                  <td>{technology.slug}</td>
                  <td>{technology.category}</td>
                  <td><span className="technology-icon-cell"><TechnologyIcon className="technology-icon" iconKey={technology.iconKey} name={technology.name} brandColor={technology.brandColor} size={22} /><code>{technology.iconKey}</code></span></td>
                  <td><span className="brand-preview" style={{ backgroundColor: technology.brandColor ?? "transparent" }} />{technology.brandColor ?? ""}</td>
                  <td>{technology.usageCount ?? 0}</td>
                  <td><span className={`tag ${technology.active ? "green-tag" : "neutral-tag"}`}>{technology.active ? "Active" : "Inactive"}</span></td>
                  <td className="actions"><button type="button" onClick={() => startEdit(technology)}>Edit</button><button type="button" onClick={() => remove(technology)} disabled={technology.source === "system" || Boolean(technology.usageCount)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
      <article className="panel form-panel">
        <div className="panel-header"><h2>{editing ? "Edit technology" : "Create technology"}</h2></div>
        <div className="form-stack">
          <label>Key<input value={form.key ?? ""} disabled={editing?.source === "system"} onChange={(event) => setForm({ ...form, key: event.target.value })} /></label>
          <label>Name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
          <label>Slug<input value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} /></label>
          <label>Category<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value as TechnologyCategory })}>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
          <div className="icon-field">
            <label>Icon key<input required value={form.iconKey} onChange={(event) => setForm({ ...form, iconKey: event.target.value })} /></label>
            <TechnologyIcon className="technology-icon" iconKey={form.iconKey} name={form.name || "Technology"} brandColor={form.brandColor} size={28} />
          </div>
          {form.iconKey && !isTechnologyIconSupported(form.iconKey) ? <p className="empty-copy">No registered brand icon. Initials fallback will be used.</p> : null}
          <label>Brand color<input value={form.brandColor ?? ""} onChange={(event) => setForm({ ...form, brandColor: event.target.value })} /></label>
          <label>Display order<input type="number" value={form.displayOrder} onChange={(event) => setForm({ ...form, displayOrder: Number(event.target.value) })} /></label>
          <label className="check-row"><input type="checkbox" checked={form.active} onChange={(event) => setForm({ ...form, active: event.target.checked })} /> Active</label>
          <div className="heading-actions"><button className="button button-primary" type="button" onClick={save}>Save Technology</button>{editing ? <button className="button button-secondary" type="button" onClick={() => { setEditing(null); setForm(emptyForm); }}>Cancel</button> : null}</div>
        </div>
      </article>
    </>
  );
}
