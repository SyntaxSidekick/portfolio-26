import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isAbortError } from "../api/client";
import { createProject, updateProject } from "../api/projects";
import { listCategories } from "../api/categories";
import { listTechnologies } from "../api/technologies";
import { emptyProjectFormValues, formValuesToProjectPayload, ProjectForm, projectToFormValues, type ProjectFormValues } from "../components/portfolio/ProjectForm";
import { PageHeading } from "../components/shared/PageHeading";
import type { CategoryReference, TechnologyReference } from "../types/admin";
import { getProject } from "../api/projects";

export function PortfolioEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);
  const [form, setForm] = useState<ProjectFormValues>(emptyProjectFormValues);
  const [categories, setCategories] = useState<CategoryReference[]>([]);
  const [technologies, setTechnologies] = useState<TechnologyReference[]>([]);
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    Promise.all([listCategories(controller.signal), listTechnologies(controller.signal)]).then(([nextCategories, nextTechnologies]) => {
      if (!active) return;
      setCategories(nextCategories);
      setTechnologies(nextTechnologies);
    }).catch((error: unknown) => {
      if (!isAbortError(error)) undefined;
    });
    if (id) {
      getProject(id, controller.signal)
        .then((project) => {
          if (active) setForm(projectToFormValues(project));
        })
        .catch((error: unknown) => {
          if (active && !isAbortError(error)) setError(error instanceof Error ? error.message : "Project could not be loaded");
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    }
    return () => {
      active = false;
      controller.abort();
    };
  }, [id]);

  async function handleSubmit() {
    setSaving(true);
    setError("");
    try {
      const payload = formValuesToProjectPayload(form, categories, technologies);
      const project = id ? await updateProject(id, payload) : await createProject(payload);
      setMessage("Project saved.");
      navigate(`/portfolio/${project.id}/edit`);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Project could not be saved");
    } finally {
      setSaving(false);
    }
  }

  function handlePreview() {
    if (!form.slug || form.status !== "published") {
      setError("Preview is available after the project has a slug and is published.");
      return;
    }
    window.open(`http://localhost:3000/portfolio/${form.slug}`, "_blank", "noopener,noreferrer");
  }

  if (loading) return <article className="panel empty-panel">Loading project...</article>;
  if (error && editing && !form.title) return <article className="panel empty-panel">{error}</article>;

  return (
    <>
      <PageHeading title={editing ? `Edit ${form.title}` : "Create Project"} description="Create and update portfolio project content stored in MongoDB through the API." />
      {error ? <p className="notice error">{error}</p> : null}
      {message ? <p className="notice success">{message}</p> : null}
      <ProjectForm values={form} saving={saving} onChange={setForm} onSubmit={handleSubmit} onPreview={handlePreview} />
    </>
  );
}
