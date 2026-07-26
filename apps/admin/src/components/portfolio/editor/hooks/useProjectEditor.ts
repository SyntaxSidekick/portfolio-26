import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listCategories } from "../../../../api/categories";
import { isAbortError } from "../../../../api/client";
import { createProject, getProject, updateProject } from "../../../../api/projects";
import { listTechnologies } from "../../../../api/technologies";
import type { ProjectStatus } from "../../../../types/admin";
import type { CategoryReference, TechnologyReference } from "../../../../types/admin";
import { emptyProjectFormValues, formValuesToProjectPayload, projectToFormValues, type ProjectFormValues } from "../../ProjectForm";

type EditorMode = "create" | "edit";

function snapshot(values: ProjectFormValues) {
  return JSON.stringify(values);
}

function getSaveErrorMessage(reason: unknown) {
  const fallback = "Project could not be saved. Please review highlighted fields and try again.";
  if (!(reason instanceof Error)) {
    return fallback;
  }

  const lower = reason.message.toLowerCase();
  if (lower.includes("duplicate") || lower.includes("e11000") || lower.includes("slug")) {
    return "Slug is already in use. Update the slug in Publishing and try again.";
  }

  return reason.message || fallback;
}

export function useProjectEditor(projectId: string | undefined) {
  const navigate = useNavigate();
  const mode: EditorMode = projectId ? "edit" : "create";

  const [draft, setDraft] = useState<ProjectFormValues>(emptyProjectFormValues);
  const [categories, setCategories] = useState<CategoryReference[]>([]);
  const [technologies, setTechnologies] = useState<TechnologyReference[]>([]);
  const [loading, setLoading] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [initialStatus, setInitialStatus] = useState<ProjectStatus>("draft");
  const [savedSnapshot, setSavedSnapshot] = useState(() => snapshot(emptyProjectFormValues));

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    Promise.all([listCategories(controller.signal), listTechnologies(controller.signal)])
      .then(([nextCategories, nextTechnologies]) => {
        if (!active) {
          return;
        }
        setCategories(nextCategories);
        setTechnologies(nextTechnologies);
      })
      .catch((reason: unknown) => {
        if (!active || isAbortError(reason)) {
          return;
        }
        setError(reason instanceof Error ? reason.message : "Failed to load reference data");
      });

    if (projectId) {
      getProject(projectId, controller.signal)
        .then((project) => {
          if (!active) {
            return;
          }
          const nextDraft = projectToFormValues(project);
          setDraft(nextDraft);
          setInitialStatus(project.status);
          setSavedSnapshot(snapshot(nextDraft));
        })
        .catch((reason: unknown) => {
          if (!active || isAbortError(reason)) {
            return;
          }
          setError(reason instanceof Error ? reason.message : "Project could not be loaded");
        })
        .finally(() => {
          if (active) {
            setLoading(false);
          }
        });
    }

    return () => {
      active = false;
      controller.abort();
    };
  }, [projectId]);

  const isDirty = useMemo(() => snapshot(draft) !== savedSnapshot, [draft, savedSnapshot]);

  async function persistProject(nextDraft: ProjectFormValues, successMessage: string, navigateTo: (savedProjectId: string) => string) {
    if (saving) {
      return false;
    }

    setDraft(nextDraft);
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const payload = formValuesToProjectPayload(nextDraft, categories, technologies);
      const savedProject = projectId ? await updateProject(projectId, payload) : await createProject(payload);
      const normalizedDraft = projectToFormValues(savedProject);
      setDraft(normalizedDraft);
      setInitialStatus(savedProject.status);
      setSavedSnapshot(snapshot(normalizedDraft));
      setMessage(successMessage);
      navigate(navigateTo(savedProject.id));
      return true;
    } catch (reason) {
      setError(getSaveErrorMessage(reason));
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function saveDraft(nextDraft: ProjectFormValues) {
    return persistProject(nextDraft, "Draft saved.", (savedProjectId) => `/portfolio/${savedProjectId}/edit`);
  }

  async function publishProject(nextDraft: ProjectFormValues) {
    return persistProject({ ...nextDraft, status: "published" }, "Project published successfully.", () => "/portfolio");
  }

  const isPublishedProjectEdit = mode === "edit" && initialStatus === "published";

  function previewProject() {
    if (!draft.slug || draft.status !== "published") {
      setError("Preview is available after the project has a slug and is published.");
      return;
    }
    window.open(`http://localhost:3000/portfolio/${draft.slug}`, "_blank", "noopener,noreferrer");
  }

  return {
    mode,
    draft,
    setDraft,
    categories,
    technologies,
    loading,
    saving,
    error,
    setError,
    message,
    isDirty,
    isPublishedProjectEdit,
    saveDraft,
    publishProject,
    previewProject,
  };
}
