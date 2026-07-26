import type { CaseStudySectionKey, MetricType, ProjectHighlight, ProjectResult } from "../../../types/admin";
import { MediaPicker } from "../../media/MediaPicker";
import { getMetricPreset, metricAccentClass, metricTypeOptions } from "./metricIconRegistry";

type MetricDraft = {
  id: string;
  type: MetricType;
  value: string;
  label: string;
};

function MetricCard({
  result,
  onEdit,
}: {
  result: ProjectResult;
  onEdit: (result: ProjectResult) => void;
}) {
  const preset = getMetricPreset(result.type, result.iconKey);
  const MetricIcon = preset.icon;

  return (
    <article className="metric-card" key={result.id}>
      <span className={`metric-card-icon ${metricAccentClass(preset.accent)}`} aria-hidden="true"><MetricIcon /></span>
      <strong>{result.value.trim() || "Value"}</strong>
      <small>{result.label.trim() || "Label"}</small>
      <button type="button" onClick={() => onEdit(result)}>Edit</button>
    </article>
  );
}

export function CaseStudySectionSummary({
  section,
  heading,
  excerpt,
  media,
  normalizedResults,
  keyResultsFieldId,
  onEditMetric,
}: {
  section: CaseStudySectionKey;
  heading: string;
  excerpt: string;
  media: { url: string; alt: string } | null;
  normalizedResults: ProjectResult[];
  keyResultsFieldId: string;
  onEditMetric: (result: ProjectResult) => void;
}) {
  return (
    <div className="case-study-section-summary">
      <div className="case-study-section-summary-content">
        <h4>{heading}</h4>
        <p>{excerpt || "Add content for this section."}</p>
        {section === "key-results" && normalizedResults.length > 0 ? (
          <div className="metric-card-grid" id={keyResultsFieldId}>
            {normalizedResults.slice(0, 4).map((result) => (
              <MetricCard key={result.id} result={result} onEdit={onEditMetric} />
            ))}
          </div>
        ) : null}
      </div>
      {media ? <img className="case-study-summary-media" src={media.url} alt={media.alt || ""} /> : null}
    </div>
  );
}

export function MetricEditableGrid({
  normalizedResults,
  onEditMetric,
  onMoveMetric,
}: {
  normalizedResults: ProjectResult[];
  onEditMetric: (result: ProjectResult) => void;
  onMoveMetric: (index: number, direction: -1 | 1) => void;
}) {
  if (normalizedResults.length === 0) {
    return <p className="empty-copy">No key results yet. Add compact metric cards to show measurable outcomes.</p>;
  }

  return (
    <div className="metric-card-grid metric-card-grid-edit">
      {normalizedResults.map((result, index) => {
        const preset = getMetricPreset(result.type, result.iconKey);
        const MetricIcon = preset.icon;
        return (
          <article className="metric-card" key={result.id}>
            <span className={`metric-card-icon ${metricAccentClass(preset.accent)}`} aria-hidden="true"><MetricIcon /></span>
            <strong>{result.value.trim() || "Value"}</strong>
            <small>{result.label.trim() || "Label"}</small>
            <div className="metric-card-actions">
              <button type="button" onClick={() => onEditMetric(result)}>Edit</button>
              <button type="button" onClick={() => onMoveMetric(index, -1)} disabled={index === 0}>Left</button>
              <button type="button" onClick={() => onMoveMetric(index, 1)} disabled={index === normalizedResults.length - 1}>Right</button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function MetricInlineEditor({
  metricDraft,
  editingMetricId,
  onChangeType,
  onChangeValue,
  onChangeLabel,
  onRemove,
  onCancel,
  onSave,
}: {
  metricDraft: MetricDraft | null;
  editingMetricId: string | null;
  onChangeType: (next: MetricType) => void;
  onChangeValue: (next: string) => void;
  onChangeLabel: (next: string) => void;
  onRemove: () => void;
  onCancel: () => void;
  onSave: () => void;
}) {
  if (!metricDraft) {
    return null;
  }

  return (
    <div className="metric-inline-editor" role="group" aria-label="Metric editor">
      <label className="field-block">
        <span className="field-label-text">Metric Type</span>
        <select value={metricDraft.type} onChange={(event) => onChangeType(event.target.value as MetricType)}>
          {metricTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
      <label className="field-block">
        <span className="field-label-text">Value</span>
        <input value={metricDraft.value} onChange={(event) => onChangeValue(event.target.value)} />
      </label>
      <label className="field-block">
        <span className="field-label-text">Label</span>
        <input value={metricDraft.label} onChange={(event) => onChangeLabel(event.target.value)} />
      </label>
      <div className="metric-inline-editor-actions">
        {editingMetricId && editingMetricId !== "new" ? (
          <button type="button" className="danger-text" onClick={onRemove}>Remove</button>
        ) : null}
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="button" className="button button-primary" onClick={onSave}>Save</button>
      </div>
    </div>
  );
}

export function CaseStudyCoreSectionEditor({
  heading,
  content,
  contentFieldId,
  contentError,
  headingInputId,
  mediaLabel,
  mediaValue,
  onHeadingChange,
  onContentChange,
  onMediaChange,
}: {
  heading: string;
  content: string;
  contentFieldId: string;
  contentError?: string;
  headingInputId: string;
  mediaLabel: string;
  mediaValue: { id?: string; url: string; alt: string } | null;
  onHeadingChange: (next: string) => void;
  onContentChange: (next: string) => void;
  onMediaChange: (nextMedia: { id?: string; url: string; alt: string } | null) => void;
}) {
  const contentErrorId = `${contentFieldId}-error`;

  return (
    <div className="case-study-section-content">
      <div className="case-study-section-fields">
        <label className="field-block" htmlFor={headingInputId}>
          <span className="field-label-text">Heading</span>
          <input id={headingInputId} value={heading} onChange={(event) => onHeadingChange(event.target.value)} />
        </label>
        <label className="field-block" htmlFor={contentFieldId}>
          <span className="field-label-text">Content <span aria-hidden="true">*</span></span>
          <textarea
            id={contentFieldId}
            value={content}
            onChange={(event) => onContentChange(event.target.value)}
            aria-invalid={Boolean(contentError)}
            aria-describedby={contentError ? contentErrorId : undefined}
          />
          {contentError ? <span id={contentErrorId} className="field-error" role="alert">{contentError}</span> : null}
        </label>
      </div>

      <div className="case-study-section-media">
        <span className="field-label-text">Section Image</span>
        <MediaPicker label={mediaLabel} value={mediaValue} requiredAlt onChange={onMediaChange} />
      </div>
    </div>
  );
}

export function LessonsLearnedEditor({
  highlights,
  mediaValue,
  onAddItem,
  onChangeItem,
  onMoveItem,
  onRemoveItem,
  onMediaChange,
}: {
  highlights: ProjectHighlight[];
  mediaValue: { id?: string; url: string; alt: string } | null;
  onAddItem: () => void;
  onChangeItem: (index: number, text: string) => void;
  onMoveItem: (index: number, direction: -1 | 1) => void;
  onRemoveItem: (index: number) => void;
  onMediaChange: (nextMedia: { id?: string; url: string; alt: string } | null) => void;
}) {
  return (
    <div className="case-study-section-content">
      <div className="case-study-repeatable">
        <div className="case-study-repeatable-header">
          <strong>Lessons Learned</strong>
          <button className="button button-secondary" type="button" onClick={onAddItem}>Add Item</button>
        </div>
        <div className="case-study-repeatable-list">
          {highlights.map((item, itemIndex) => (
            <div className="case-study-repeatable-item case-study-highlight-item" key={item.id}>
              <label className="field-block">
                <span className="field-label-text">Lesson</span>
                <input value={item.text} onChange={(event) => onChangeItem(itemIndex, event.target.value)} />
              </label>
              <div className="case-study-repeatable-actions">
                <button type="button" onClick={() => onMoveItem(itemIndex, -1)} disabled={itemIndex === 0}>Up</button>
                <button type="button" onClick={() => onMoveItem(itemIndex, 1)} disabled={itemIndex === highlights.length - 1}>Down</button>
                <button type="button" onClick={() => onRemoveItem(itemIndex)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="case-study-section-media">
        <span className="field-label-text">Section Image</span>
        <MediaPicker label="Lessons image" value={mediaValue} requiredAlt onChange={onMediaChange} />
      </div>
    </div>
  );
}
