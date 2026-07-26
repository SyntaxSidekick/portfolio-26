import { useMemo, useState } from "react";
import { BookOpen, ExternalLink, GitBranch, GripVertical, Link2, Palette, PlayCircle, Plus, Trash2, X } from "lucide-react";
import type { ProjectFormValues } from "../ProjectForm";
import {
  buildProjectLinkRows,
  canonicalLinkTypeForSlot,
  isValidUrl,
  linkTypeLabels,
  sanitizeUrl,
  type ProjectLinkSlot,
  type ProjectLinkType,
} from "./projectLinksConfig";

const canonicalOrder: ProjectLinkSlot[] = ["projectUrl", "repositoryUrl", "codepenUrl", "caseStudyUrl"];
const addableTypes: ProjectLinkType[] = ["live-project", "github-repository", "documentation", "video", "figma-design-file", "social-media-post"];

function defaultTypeState(): Record<ProjectLinkSlot, ProjectLinkType> {
  return {
    projectUrl: canonicalLinkTypeForSlot("projectUrl"),
    repositoryUrl: canonicalLinkTypeForSlot("repositoryUrl"),
    codepenUrl: canonicalLinkTypeForSlot("codepenUrl"),
    caseStudyUrl: canonicalLinkTypeForSlot("caseStudyUrl"),
  };
}

function iconForType(type: ProjectLinkType) {
  if (type === "live-project") return ExternalLink;
  if (type === "github-repository") return GitBranch;
  if (type === "documentation") return BookOpen;
  if (type === "video") return PlayCircle;
  if (type === "figma-design-file") return Palette;
  return Link2;
}

function deriveActiveSlots(values: ProjectFormValues) {
  return new Set(canonicalOrder.filter((slot) => Boolean(values[slot].trim())));
}

export function ProjectLinksStep({ values, onChange }: { values: ProjectFormValues; onChange: (values: ProjectFormValues) => void }) {
  const [typeBySlot, setTypeBySlot] = useState<Record<ProjectLinkSlot, ProjectLinkType>>(() => defaultTypeState());
  const [slotOrder, setSlotOrder] = useState<ProjectLinkSlot[]>(canonicalOrder);
  const [activeSlots, setActiveSlots] = useState<Set<ProjectLinkSlot>>(() => deriveActiveSlots(values));
  const [hiddenSlots, setHiddenSlots] = useState<Set<ProjectLinkSlot>>(new Set());
  const [draggingSlot, setDraggingSlot] = useState<ProjectLinkSlot | null>(null);
  const [linkTypeModalOpen, setLinkTypeModalOpen] = useState(false);
  const [pendingLinkType, setPendingLinkType] = useState<ProjectLinkType>("live-project");
  const [linkDisplayStyle, setLinkDisplayStyle] = useState<"icons-with-labels" | "icons-only" | "buttons">("icons-with-labels");
  const [showInProjectCard, setShowInProjectCard] = useState(true);

  const visibilityBySlot = useMemo(
    () => canonicalOrder.reduce((accumulator, slot) => {
      accumulator[slot] = activeSlots.has(slot) && !hiddenSlots.has(slot);
      return accumulator;
    }, {} as Record<ProjectLinkSlot, boolean>),
    [activeSlots, hiddenSlots],
  );

  const rows = useMemo(() => {
    const bySlot = new Map(buildProjectLinkRows(values, typeBySlot, visibilityBySlot).map((row) => [row.slot, row]));
    return slotOrder.filter((slot) => activeSlots.has(slot)).map((slot) => bySlot.get(slot)).filter((row): row is NonNullable<typeof row> => Boolean(row));
  }, [activeSlots, slotOrder, typeBySlot, values, visibilityBySlot]);

  const hasCapacityForNewLink = activeSlots.size < canonicalOrder.length;
  const primarySlot = useMemo(() => {
    const primaryUrl = values.projectUrl.trim();
    if (primaryUrl) {
      const match = rows.find((row) => row.url === primaryUrl);
      if (match) return match.slot;
    }
    return rows[0]?.slot ?? "projectUrl";
  }, [rows, values.projectUrl]);

  const urlErrors = useMemo(() => {
    return rows.reduce((accumulator, row) => {
      accumulator[row.slot] = isValidUrl(values[row.slot]) ? "" : "Use a valid absolute URL starting with http:// or https://";
      return accumulator;
    }, {} as Record<ProjectLinkSlot, string>);
  }, [rows, values]);

  function updateField<K extends keyof ProjectFormValues>(key: K, next: ProjectFormValues[K]) {
    onChange({ ...values, [key]: next });
  }

  function setVisible(slot: ProjectLinkSlot, visible: boolean) {
    setHiddenSlots((current) => {
      const next = new Set(current);
      if (visible) next.delete(slot);
      else next.add(slot);
      return next;
    });
  }

  function setPrimary(slot: ProjectLinkSlot) {
    if (slot === "projectUrl" || !activeSlots.has(slot)) return;

    const currentPrimary = values.projectUrl;
    const selected = values[slot];
    const primaryType = typeBySlot.projectUrl;
    const selectedType = typeBySlot[slot];
    const primaryHidden = hiddenSlots.has("projectUrl");
    const selectedHidden = hiddenSlots.has(slot);

    setTypeBySlot((current) => ({ ...current, projectUrl: selectedType, [slot]: primaryType }));
    setHiddenSlots((current) => {
      const next = new Set(current);
      if (selectedHidden) next.add("projectUrl");
      else next.delete("projectUrl");
      if (primaryHidden) next.add(slot);
      else next.delete(slot);
      return next;
    });

    onChange({ ...values, projectUrl: selected, [slot]: currentPrimary });
  }

  function reorderLinks(source: ProjectLinkSlot, target: ProjectLinkSlot) {
    if (source === target) return;
    const sourceIndex = slotOrder.indexOf(source);
    const targetIndex = slotOrder.indexOf(target);
    if (sourceIndex < 0 || targetIndex < 0) return;

    const next = [...slotOrder];
    const [entry] = next.splice(sourceIndex, 1);
    next.splice(targetIndex, 0, entry);
    setSlotOrder(next);
  }

  function removeLink(slot: ProjectLinkSlot) {
    setActiveSlots((current) => {
      const next = new Set(current);
      next.delete(slot);
      return next;
    });
    setHiddenSlots((current) => {
      const next = new Set(current);
      next.delete(slot);
      return next;
    });
    updateField(slot, "" as ProjectFormValues[ProjectLinkSlot]);
  }

  function openAddLinkModal() {
    if (!hasCapacityForNewLink) return;
    setPendingLinkType("live-project");
    setLinkTypeModalOpen(true);
  }

  function confirmAddLink() {
    const targetSlot = canonicalOrder.find((slot) => !activeSlots.has(slot));
    if (!targetSlot) {
      setLinkTypeModalOpen(false);
      return;
    }

    setTypeBySlot((current) => ({ ...current, [targetSlot]: pendingLinkType }));
    setActiveSlots((current) => {
      const next = new Set(current);
      next.add(targetSlot);
      return next;
    });
    setHiddenSlots((current) => {
      const next = new Set(current);
      next.delete(targetSlot);
      return next;
    });
    if (!values[targetSlot].trim()) {
      updateField(targetSlot, "https://" as ProjectFormValues[ProjectLinkSlot]);
    }
    setLinkTypeModalOpen(false);
  }

  return (
    <section className="step-panel links-step-panel" aria-labelledby="project-links-heading">
      <header className="step-panel-header links-step-header">
        <div>
          <h2 id="project-links-heading">Links & Resources</h2>
          <p>Add important links related to your project.</p>
        </div>
      </header>

      <article className="links-list-panel" aria-labelledby="links-list-heading">
        <h3 id="links-list-heading">Project Links</h3>

        <div className="links-list-grid" role="list" aria-label="Project link rows">
          {rows.map((row) => {
            const error = urlErrors[row.slot];
            const LinkIcon = iconForType(row.type);

            return (
              <article
                className="link-row-card"
                key={row.slot}
                role="listitem"
                draggable
                onDragStart={() => setDraggingSlot(row.slot)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => {
                  if (!draggingSlot) return;
                  reorderLinks(draggingSlot, row.slot);
                  setDraggingSlot(null);
                }}
              >
                <button type="button" className="link-drag-handle" aria-label={`Drag to reorder ${row.title}`}>
                  <GripVertical aria-hidden="true" focusable="false" />
                </button>

                <span className="link-type-icon" aria-hidden="true">
                  <LinkIcon />
                </span>

                <div className="link-row-main">
                  <div className="link-row-labels">
                    <strong>{row.title}</strong>
                    <small>{row.description}</small>
                  </div>

                  <label className="field-block" htmlFor={`link-url-${row.slot}`}>
                    <span className="field-label-text">URL</span>
                    <input
                      id={`link-url-${row.slot}`}
                      type="url"
                      value={values[row.slot]}
                      onChange={(event) => updateField(row.slot, event.target.value as ProjectFormValues[ProjectLinkSlot])}
                      onBlur={(event) => updateField(row.slot, sanitizeUrl(event.target.value) as ProjectFormValues[ProjectLinkSlot])}
                      aria-invalid={Boolean(error)}
                      aria-describedby={error ? `link-url-error-${row.slot}` : undefined}
                    />
                    {error ? <span id={`link-url-error-${row.slot}`} className="field-error" role="alert">{error}</span> : null}
                  </label>
                </div>

                <div className="link-row-actions" aria-label={`${row.title} row actions`}>
                  <label className="link-show-toggle" htmlFor={`link-visible-${row.slot}`}>
                    <span>Show on site</span>
                    <input id={`link-visible-${row.slot}`} type="checkbox" role="switch" checked={row.visible} onChange={(event) => setVisible(row.slot, event.target.checked)} />
                  </label>

                  <button type="button" className="button button-secondary" onClick={() => removeLink(row.slot)} aria-label={`Remove ${row.title}`}>
                    <Trash2 aria-hidden="true" focusable="false" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <button className="button button-secondary link-add-button" type="button" onClick={openAddLinkModal} disabled={!hasCapacityForNewLink}>
          <Plus aria-hidden="true" focusable="false" />
          Add Link
        </button>
      </article>

      <article className="links-settings-panel" aria-labelledby="links-settings-heading">
        <h3 id="links-settings-heading">Link Settings</h3>
        <p className="links-settings-help">Control how links are displayed on the project page.</p>

        <div className="links-settings-grid links-settings-grid-mock">
          <section className="links-setting-box" aria-label="Link display style">
            <strong>Link Display Style</strong>
            <small>Choose how links appear on the project page.</small>
            <div className="links-segmented" role="group" aria-label="Link display style">
              <button type="button" className={linkDisplayStyle === "icons-with-labels" ? "is-active" : ""} onClick={() => setLinkDisplayStyle("icons-with-labels")}>Icons with labels</button>
              <button type="button" className={linkDisplayStyle === "icons-only" ? "is-active" : ""} onClick={() => setLinkDisplayStyle("icons-only")}>Icons only</button>
              <button type="button" className={linkDisplayStyle === "buttons" ? "is-active" : ""} onClick={() => setLinkDisplayStyle("buttons")}>Buttons</button>
            </div>
          </section>

          <section className="links-setting-box" aria-label="Links open behavior">
            <strong>Links Open In</strong>
            <small>Choose how external links open.</small>
            <div className="links-segmented" role="group" aria-label="Links open in">
              <button type="button" className={values.openInNewTab ? "is-active" : ""} onClick={() => updateField("openInNewTab", true)}>New tab (recommended)</button>
              <button type="button" className={!values.openInNewTab ? "is-active" : ""} onClick={() => updateField("openInNewTab", false)}>Same tab</button>
            </div>
          </section>

          <section className="links-setting-box links-setting-toggle" aria-label="Project card links">
            <div>
              <strong>Show links in project card</strong>
              <small>Display key links on the project card.</small>
            </div>
            <input type="checkbox" role="switch" checked={showInProjectCard} onChange={(event) => setShowInProjectCard(event.target.checked)} />
          </section>

          <label className="field-block links-setting-box" htmlFor="links-primary-link">
            <span className="field-label-text">Primary Link</span>
            <select id="links-primary-link" value={primarySlot} onChange={(event) => setPrimary(event.target.value as ProjectLinkSlot)}>
              {rows.map((row) => (
                <option key={row.slot} value={row.slot}>{linkTypeLabels[typeBySlot[row.slot]]}</option>
              ))}
            </select>
            <span className="field-help">Select the main link for this project.</span>
          </label>
        </div>
      </article>

      <p className="field-help links-security-note">
        External preview links use safe new-tab attributes when enabled.
        <ExternalLink aria-hidden="true" focusable="false" />
      </p>

      {linkTypeModalOpen ? (
        <div className="links-type-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="add-link-type-title">
          <section className="links-type-modal panel">
            <header className="panel-header">
              <h2 id="add-link-type-title">Add Link</h2>
              <button className="button button-secondary" type="button" onClick={() => setLinkTypeModalOpen(false)} aria-label="Close add link dialog">
                <X aria-hidden="true" focusable="false" />
              </button>
            </header>

            <label className="field-block" htmlFor="add-link-type-select">
              <span className="field-label-text">Link Type</span>
              <select id="add-link-type-select" value={pendingLinkType} onChange={(event) => setPendingLinkType(event.target.value as ProjectLinkType)}>
                {addableTypes.map((type) => (
                  <option key={type} value={type}>{linkTypeLabels[type]}</option>
                ))}
              </select>
            </label>

            <div className="links-type-modal-actions">
              <button className="button button-secondary" type="button" onClick={() => setLinkTypeModalOpen(false)}>Cancel</button>
              <button className="button button-primary" type="button" onClick={confirmAddLink}>Add Link</button>
            </div>
          </section>
        </div>
      ) : null}
    </section>
  );
}
