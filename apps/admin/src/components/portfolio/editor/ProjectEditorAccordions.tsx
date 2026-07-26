import { ChevronDown, FileText, GitBranch, Layers } from "lucide-react";

const editorSections = [
  { label: "Card Content", description: "Customize how your project appears in cards and lists.", icon: FileText },
  { label: "Repository", description: "Link your GitHub or other code repository.", icon: GitBranch },
  { label: "Case Study", description: "Tell the full story of your project.", icon: Layers },
] as const;

export function ProjectEditorAccordions() {
  return (
    <div className="editor-accordion-list" aria-label="Additional project sections">
      {editorSections.map((item) => {
        const Icon = item.icon;
        return (
          <button className="editor-accordion-item" type="button" key={item.label}>
            <span className="accordion-icon"><Icon aria-hidden="true" focusable="false" /></span>
            <span>
              <strong>{item.label}</strong>
              <small>{item.description}</small>
            </span>
            <ChevronDown aria-hidden="true" focusable="false" />
          </button>
        );
      })}
    </div>
  );
}
