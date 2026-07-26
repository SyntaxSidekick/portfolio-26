import type { ProjectFormValues } from "../ProjectForm";
import { BookOpen, ExternalLink, GitBranch, GripVertical, Link2, Palette, PlayCircle } from "lucide-react";
import { buildProjectLinkRows, canonicalLinkTypeForSlot } from "./projectLinksConfig";

const defaultTypes = {
  projectUrl: canonicalLinkTypeForSlot("projectUrl"),
  repositoryUrl: canonicalLinkTypeForSlot("repositoryUrl"),
  codepenUrl: canonicalLinkTypeForSlot("codepenUrl"),
  caseStudyUrl: canonicalLinkTypeForSlot("caseStudyUrl"),
} as const;

function iconForType(type: ReturnType<typeof buildProjectLinkRows>[number]["type"]) {
  if (type === "live-project") return ExternalLink;
  if (type === "github-repository") return GitBranch;
  if (type === "documentation") return BookOpen;
  if (type === "figma-design-file") return Palette;
  if (type === "video") return PlayCircle;
  return Link2;
}

function compactUrl(url: string) {
  return url.replace(/^https?:\/\//i, "");
}

export function LinksSummaryPanel({ values }: { values: ProjectFormValues }) {
  const primaryUrl = values.projectUrl.trim();
  const rows = buildProjectLinkRows(values, { ...defaultTypes })
    .filter((row) => row.visible)
    .map((row, index) => ({ ...row, order: index + 1, isPrimary: primaryUrl ? row.url === primaryUrl : index === 0 }));

  return (
    <section className="links-summary-panel panel" aria-labelledby="links-summary-title">
      <header className="panel-header links-summary-header">
        <h2 id="links-summary-title">Links Summary</h2>
        <p><strong>{rows.length}</strong> Links Added</p>
      </header>

      {rows.length > 0 ? (
        <ul className="links-summary-list">
          {rows.map((row) => (
            <li className="links-summary-item" key={row.slot}>
              <span className="links-summary-grip" aria-hidden="true"><GripVertical /></span>
              <span className="links-summary-icon" aria-hidden="true">{(() => {
                const Icon = iconForType(row.type);
                return <Icon />;
              })()}</span>
              <div>
                <strong>{row.title}</strong>
                <small>{compactUrl(row.url)}</small>
              </div>
              <span className="links-status-tag is-visible">Visible</span>
              {row.isPrimary ? <span className="links-status-tag is-primary">Primary</span> : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-copy" style={{ padding: "0 16px 16px" }}>No visible links configured.</p>
      )}
    </section>
  );
}
