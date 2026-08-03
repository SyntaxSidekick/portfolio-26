import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import type { CaseStudySectionKey, MetricType, ProjectResult } from "../../../types/admin";
import type { ProjectFormValues } from "../ProjectForm";
import { isGitHubProject } from "./projectValidationRules";
import { getCaseStudyIcon } from "./caseStudyIconRegistry";
import { coerceMetricType } from "./metricIconRegistry";
import { CaseStudyCoreSectionEditor, CaseStudySectionSummary, LessonsLearnedEditor, MetricEditableGrid, MetricInlineEditor } from "./ProjectCaseStudyStep.sections";
import { ProjectCaseStudySectionHeader } from "./ProjectCaseStudySectionHeader";
import {
  buildSectionOrder,
  deepClone,
  deriveSectionExcerpt,
  deriveSectionHeading,
  deriveSectionStatus,
  hasResultMismatch,
  makeId,
  mediaKeyMap,
  moveItem,
  normalizeResultOrder,
  normalizeSectionOrder,
  optionalSections,
  requiredSections,
  sectionMediaFor,
  sectionMeta,
  type EditableSection,
} from "./caseStudyStepUtils";

export interface CaseStudyStepErrors {
  overviewContent?: string;
  challengeContent?: string;
  solutionContent?: string;
  keyResults?: string;
}

export const caseStudyFieldOrder: Array<keyof CaseStudyStepErrors> = ["overviewContent", "challengeContent", "solutionContent", "keyResults"];

export const caseStudyFieldIds: Record<keyof CaseStudyStepErrors, string> = {
  overviewContent: "case-study-overview-content",
  challengeContent: "case-study-challenge-content",
  solutionContent: "case-study-solution-content",
  keyResults: "case-study-key-results",
};

type MetricDraft = {
  id: string;
  type: MetricType;
  value: string;
  label: string;
};

export function validateCaseStudyStep(values: ProjectFormValues): CaseStudyStepErrors {
  const errors: CaseStudyStepErrors = {};

  if (isGitHubProject(values)) {
    if (hasResultMismatch(values)) {
      errors.keyResults = "Each key result needs both a label and a value.";
    }
    return errors;
  }

  if (!values.overviewContent.trim()) {
    errors.overviewContent = "Overview content is required.";
  }
  if (!values.challengeContent.trim()) {
    errors.challengeContent = "Challenge content is required.";
  }
  if (!values.solutionContent.trim()) {
    errors.solutionContent = "Solution content is required.";
  }
  if (hasResultMismatch(values)) {
    errors.keyResults = "Each key result needs both a label and a value.";
  }

  return errors;
}

export function deriveCaseStudySectionOrder(values: ProjectFormValues) {
  return buildSectionOrder(values);
}

export function ProjectCaseStudyStep({
  values,
  errors,
  onChange,
}: {
  values: ProjectFormValues;
  errors: CaseStudyStepErrors;
  onChange: (values: ProjectFormValues) => void;
}) {
  const [collapsedSections, setCollapsedSections] = useState<Partial<Record<CaseStudySectionKey, boolean>>>({});
  const [editingSection, setEditingSection] = useState<CaseStudySectionKey | null>(null);
  const [editingSnapshot, setEditingSnapshot] = useState<ProjectFormValues | null>(null);
  const [showAddSectionMenu, setShowAddSectionMenu] = useState(false);
  const [editingMetricId, setEditingMetricId] = useState<string | null>(null);
  const [metricDraft, setMetricDraft] = useState<MetricDraft | null>(null);

  const sectionOrder = useMemo(() => buildSectionOrder(values), [values]);
  const optionalAvailable = optionalSections.filter((section) => !sectionOrder.includes(section));
  const normalizedResults = useMemo(() => normalizeResultOrder(values.keyResults), [values.keyResults]);

  function updateField<K extends keyof ProjectFormValues>(key: K, value: ProjectFormValues[K]) {
    onChange({ ...values, [key]: value });
  }

  function updateSectionOrder(nextOrder: CaseStudySectionKey[]) {
    updateField("caseStudySectionOrder", normalizeSectionOrder(nextOrder));
  }

  function moveSection(section: CaseStudySectionKey, direction: -1 | 1) {
    const currentIndex = sectionOrder.indexOf(section);
    if (currentIndex < 0) return;
    updateSectionOrder(moveItem(sectionOrder, currentIndex, direction));
  }

  function startSectionEdit(section: CaseStudySectionKey) {
    setEditingSnapshot(deepClone(values));
    setEditingSection(section);
    setEditingMetricId(null);
    setMetricDraft(null);
    setCollapsedSections((current) => ({ ...current, [section]: false }));
  }

  function saveSectionEdit() {
    if (editingSection === "key-results") {
      updateField("keyResults", normalizeResultOrder(values.keyResults));
    }
    setEditingSection(null);
    setEditingSnapshot(null);
    setEditingMetricId(null);
    setMetricDraft(null);
  }

  function cancelSectionEdit() {
    if (editingSnapshot) {
      onChange(editingSnapshot);
    }
    setEditingSection(null);
    setEditingSnapshot(null);
    setEditingMetricId(null);
    setMetricDraft(null);
  }

  function toggleSectionCollapse(section: CaseStudySectionKey) {
    setCollapsedSections((current) => ({ ...current, [section]: !current[section] }));
  }

  function addOptionalSection(section: CaseStudySectionKey) {
    if (!optionalSections.includes(section) || sectionOrder.includes(section)) return;
    updateSectionOrder([...sectionOrder, section]);
    setCollapsedSections((current) => ({ ...current, [section]: false }));
    setShowAddSectionMenu(false);
  }

  function removeOptionalSection(section: CaseStudySectionKey) {
    if (!optionalSections.includes(section)) return;
    if (!window.confirm(`Remove ${sectionMeta[section].title} section?`)) return;

    const nextValues = { ...values };
    if (section === "key-results") {
      nextValues.keyResults = [];
    }
    if (section === "lessons-learned") {
      nextValues.highlights = [];
      nextValues.highlightsMediaId = "";
      nextValues.highlightsMediaUrl = "";
      nextValues.highlightsMediaAlt = "";
    }

    onChange(nextValues);
    updateSectionOrder(sectionOrder.filter((item) => item !== section));
  }

  function updateMedia(section: EditableSection, nextMedia: { id?: string; url: string; alt: string } | null) {
    const keys = mediaKeyMap[section];
    onChange({
      ...values,
      [keys.id]: nextMedia?.id ?? "",
      [keys.url]: nextMedia?.url ?? "",
      [keys.alt]: nextMedia?.alt ?? values[keys.alt],
    });
  }

  function openMetricEditor(result?: ProjectResult) {
    if (editingSection !== "key-results") {
      startSectionEdit("key-results");
    }

    if (!result) {
      setEditingMetricId("new");
      setMetricDraft({ id: makeId(), type: "users", value: "", label: "" });
      return;
    }

    setEditingMetricId(result.id);
    setMetricDraft({
      id: result.id,
      type: coerceMetricType(result.type, result.iconKey),
      value: result.value,
      label: result.label,
    });
  }

  function closeMetricEditor() {
    setEditingMetricId(null);
    setMetricDraft(null);
  }

  function saveMetric() {
    if (!metricDraft) return;

    if (editingMetricId === "new") {
      updateField("keyResults", [
        ...normalizeResultOrder(values.keyResults),
        {
          id: metricDraft.id,
          type: metricDraft.type,
          value: metricDraft.value,
          label: metricDraft.label,
          order: values.keyResults.length,
        },
      ]);
    } else {
      updateField(
        "keyResults",
        normalizeResultOrder(values.keyResults).map((result) =>
          result.id === metricDraft.id
            ? {
                ...result,
                type: metricDraft.type,
                value: metricDraft.value,
                label: metricDraft.label,
              }
            : result,
        ),
      );
    }

    closeMetricEditor();
  }

  function removeMetric(metricId: string) {
    updateField(
      "keyResults",
      normalizeResultOrder(values.keyResults)
        .filter((result) => result.id !== metricId)
        .map((result, index) => ({ ...result, order: index })),
    );
    closeMetricEditor();
  }

  function addHighlight() {
    updateField("highlights", [
      ...values.highlights,
      { id: makeId(), text: "", displayOrder: values.highlights.length },
    ]);
  }

  return (
    <section className="step-panel case-study-step-panel" aria-labelledby="case-study-content-title">
      <header className="step-panel-header case-study-header">
        <div>
          <h2 id="case-study-content-title">Case Study Content</h2>
          <p>Structured sections with opinionated defaults. Edit content and optional section media only.</p>
        </div>
        <div className="section-add-menu">
          <button
            className="button button-secondary"
            type="button"
            aria-haspopup="menu"
            aria-expanded={showAddSectionMenu}
            onClick={() => setShowAddSectionMenu((value) => !value)}
            disabled={optionalAvailable.length === 0}
          >
            <Plus aria-hidden="true" focusable="false" />
            Add Section
          </button>
          {showAddSectionMenu && optionalAvailable.length > 0 ? (
            <div className="section-add-menu-popover" role="menu" aria-label="Add case study section">
              {optionalAvailable.map((section) => (
                <button key={section} type="button" role="menuitem" onClick={() => addOptionalSection(section)}>
                  {sectionMeta[section].title}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      <div className="case-study-section-list" role="list">
        {sectionOrder.map((section, sectionIndex) => {
          const Icon = getCaseStudyIcon(section);
          const completed = deriveSectionStatus(values, section);
          const isEditing = editingSection === section;
          const isCollapsed = !isEditing && Boolean(collapsedSections[section]);
          const removable = optionalSections.includes(section);
          const sectionError = section === "overview" ? errors.overviewContent : section === "challenge" ? errors.challengeContent : section === "solution" ? errors.solutionContent : section === "key-results" ? errors.keyResults : undefined;
          const heading = deriveSectionHeading(values, section);
          const excerpt = deriveSectionExcerpt(values, section);
          const media = section in mediaKeyMap ? sectionMediaFor(values, section as EditableSection) : null;

          return (
            <article className={`case-study-section ${isEditing ? "is-editing" : "is-summary"}`} key={section} role="listitem">
              <ProjectCaseStudySectionHeader
                sectionTitle={sectionMeta[section].title}
                sectionSubtitle={sectionMeta[section].subtitle}
                icon={Icon}
                completed={completed}
                isEditing={isEditing}
                isCollapsed={isCollapsed}
                removable={removable}
                disableMoveUp={sectionIndex === 0}
                disableMoveDown={sectionIndex === sectionOrder.length - 1}
                onMoveUp={() => moveSection(section, -1)}
                onMoveDown={() => moveSection(section, 1)}
                onRemove={() => removeOptionalSection(section)}
                onEdit={() => startSectionEdit(section)}
                onToggleCollapse={() => toggleSectionCollapse(section)}
              />

              {!isEditing && !isCollapsed ? (
                <CaseStudySectionSummary
                  section={section}
                  heading={heading}
                  excerpt={excerpt}
                  media={media}
                  normalizedResults={normalizedResults}
                  keyResultsFieldId={caseStudyFieldIds.keyResults}
                  onEditMetric={openMetricEditor}
                />
              ) : null}

              {isEditing ? (
                <div id={`case-study-section-${section}`} className="case-study-section-body">
                  {(section === "overview" || section === "challenge" || section === "solution") ? (
                    <>
                      {section === "overview" ? (
                        <CaseStudyCoreSectionEditor
                          heading={values.overviewHeading}
                          content={values.overviewContent}
                          contentFieldId={caseStudyFieldIds.overviewContent}
                          contentError={errors.overviewContent}
                          headingInputId="case-study-overview-heading"
                          mediaLabel="Overview image"
                          mediaValue={sectionMediaFor(values, "overview")}
                          onHeadingChange={(next) => updateField("overviewHeading", next)}
                          onContentChange={(next) => updateField("overviewContent", next)}
                          onMediaChange={(nextMedia) => updateMedia("overview", nextMedia)}
                        />
                      ) : null}

                      {section === "challenge" ? (
                        <CaseStudyCoreSectionEditor
                          heading={values.challengeHeading}
                          content={values.challengeContent}
                          contentFieldId={caseStudyFieldIds.challengeContent}
                          contentError={errors.challengeContent}
                          headingInputId="case-study-challenge-heading"
                          mediaLabel="Challenge image"
                          mediaValue={sectionMediaFor(values, "challenge")}
                          onHeadingChange={(next) => updateField("challengeHeading", next)}
                          onContentChange={(next) => updateField("challengeContent", next)}
                          onMediaChange={(nextMedia) => updateMedia("challenge", nextMedia)}
                        />
                      ) : null}

                      {section === "solution" ? (
                        <CaseStudyCoreSectionEditor
                          heading={values.solutionHeading}
                          content={values.solutionContent}
                          contentFieldId={caseStudyFieldIds.solutionContent}
                          contentError={errors.solutionContent}
                          headingInputId="case-study-solution-heading"
                          mediaLabel="Solution image"
                          mediaValue={sectionMediaFor(values, "solution")}
                          onHeadingChange={(next) => updateField("solutionHeading", next)}
                          onContentChange={(next) => updateField("solutionContent", next)}
                          onMediaChange={(nextMedia) => updateMedia("solution", nextMedia)}
                        />
                      ) : null}
                    </>
                  ) : null}

                  {section === "key-results" ? (
                    <div className="case-study-results-block" id={caseStudyFieldIds.keyResults}>
                      <div className="case-study-repeatable-header">
                        <strong>Key Results</strong>
                        <button className="button button-secondary" type="button" onClick={() => openMetricEditor()}>
                          Add Metric
                        </button>
                      </div>

                      <MetricEditableGrid
                        normalizedResults={normalizedResults}
                        onEditMetric={openMetricEditor}
                        onMoveMetric={(index, direction) => {
                          updateField("keyResults", moveItem(normalizedResults, index, direction).map((entry, order) => ({ ...entry, order })));
                        }}
                      />

                      <MetricInlineEditor
                        metricDraft={metricDraft}
                        editingMetricId={editingMetricId}
                        onChangeType={(next) => setMetricDraft((current) => (current ? { ...current, type: next } : current))}
                        onChangeValue={(next) => setMetricDraft((current) => (current ? { ...current, value: next } : current))}
                        onChangeLabel={(next) => setMetricDraft((current) => (current ? { ...current, label: next } : current))}
                        onRemove={() => {
                          if (metricDraft) {
                            removeMetric(metricDraft.id);
                          }
                        }}
                        onCancel={closeMetricEditor}
                        onSave={saveMetric}
                      />

                      {errors.keyResults ? <span className="field-error" role="alert">{errors.keyResults}</span> : null}
                    </div>
                  ) : null}

                  {section === "lessons-learned" ? (
                    <LessonsLearnedEditor
                      highlights={values.highlights}
                      mediaValue={sectionMediaFor(values, "lessons-learned")}
                      onAddItem={addHighlight}
                      onChangeItem={(itemIndex, text) => {
                        updateField("highlights", values.highlights.map((entry, index) => index === itemIndex ? { ...entry, text } : entry));
                      }}
                      onMoveItem={(itemIndex, direction) => {
                        updateField("highlights", moveItem(values.highlights, itemIndex, direction));
                      }}
                      onRemoveItem={(itemIndex) => {
                        updateField("highlights", values.highlights.filter((_, index) => index !== itemIndex));
                      }}
                      onMediaChange={(nextMedia) => updateMedia("lessons-learned", nextMedia)}
                    />
                  ) : null}

                  <div className="case-study-edit-actions">
                    <button type="button" onClick={cancelSectionEdit}>Cancel</button>
                    <button type="button" className="button button-primary" onClick={saveSectionEdit}>Save Section</button>
                  </div>
                </div>
              ) : null}

              {sectionError ? <p className="field-error case-study-section-error" role="alert">{sectionError}</p> : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
