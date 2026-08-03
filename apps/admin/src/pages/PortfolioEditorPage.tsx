import { useNavigate, useParams } from "react-router-dom";
import { ProjectEditor } from "../components/portfolio/editor/ProjectEditor";
import { useProjectEditor } from "../components/portfolio/editor/hooks/useProjectEditor";

export function PortfolioEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    mode,
    draft,
    setDraft,
    categories,
    technologies,
    existingSlugEntries,
    currentProjectId,
    loading,
    saving,
    error,
    message,
    isDirty,
    isPublishedProjectEdit,
    saveDraft,
    publishProject,
    previewProject,
  } = useProjectEditor(id);

  if (loading) return <article className="panel empty-panel">Loading project...</article>;
  if (error && mode === "edit" && !draft.title) return <article className="panel empty-panel">{error}</article>;

  return (
    <ProjectEditor
      editing={mode === "edit"}
      values={draft}
      categories={categories}
      technologies={technologies}
      existingSlugEntries={existingSlugEntries}
      currentProjectId={currentProjectId}
      saving={saving}
      error={error}
      message={message}
      isDirty={isDirty}
      isPublishedProjectEdit={isPublishedProjectEdit}
      onChange={setDraft}
      onSave={saveDraft}
      onPublish={publishProject}
      onCancel={() => navigate("/portfolio")}
      onPreview={previewProject}
    />
  );
}
