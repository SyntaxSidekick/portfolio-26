import { CheckCircle2, ChevronDown, GripVertical, Trash2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function ProjectCaseStudySectionHeader({
  sectionTitle,
  sectionSubtitle,
  icon: Icon,
  completed,
  isEditing,
  isCollapsed,
  removable,
  disableMoveUp,
  disableMoveDown,
  onMoveUp,
  onMoveDown,
  onRemove,
  onEdit,
  onToggleCollapse,
}: {
  sectionTitle: string;
  sectionSubtitle: string;
  icon: LucideIcon;
  completed: boolean;
  isEditing: boolean;
  isCollapsed: boolean;
  removable: boolean;
  disableMoveUp: boolean;
  disableMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  onEdit: () => void;
  onToggleCollapse: () => void;
}) {
  return (
    <header className="case-study-section-header">
      <div className="case-study-section-toggle">
        <span className="case-study-section-grip" aria-hidden="true"><GripVertical /></span>
        <span className="case-study-section-complete" aria-hidden="true">{completed ? <CheckCircle2 /> : <span />}</span>
        <span className="case-study-section-icon" aria-hidden="true"><Icon /></span>
        <span>
          <strong>{sectionTitle}</strong>
          <small>{sectionSubtitle}</small>
        </span>
      </div>

      <div className="case-study-section-actions">
        <button type="button" onClick={onMoveUp} disabled={disableMoveUp} aria-label={`Move ${sectionTitle} up`}>Up</button>
        <button type="button" onClick={onMoveDown} disabled={disableMoveDown} aria-label={`Move ${sectionTitle} down`}>Down</button>
        {removable ? (
          <button type="button" className="danger-text" onClick={onRemove} aria-label={`Remove ${sectionTitle}`}>
            <Trash2 aria-hidden="true" focusable="false" />
            Remove
          </button>
        ) : null}
        {!isEditing ? <button type="button" onClick={onEdit}>Edit</button> : null}
        {!isEditing ? (
          <button type="button" onClick={onToggleCollapse} aria-label={isCollapsed ? `Expand ${sectionTitle}` : `Collapse ${sectionTitle}`}>
            {isCollapsed ? "Expand" : "Collapse"}
            <ChevronDown aria-hidden="true" focusable="false" className={isCollapsed ? "is-collapsed" : ""} />
          </button>
        ) : null}
      </div>
    </header>
  );
}
