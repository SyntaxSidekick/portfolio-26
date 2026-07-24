import type { ProjectStatus } from "../../types/admin";

export function PortfolioFilters({
  type,
  status,
  onType,
  onStatus,
}: {
  type: string;
  status: string;
  onType: (value: string) => void;
  onStatus: (value: ProjectStatus | "All") => void;
}) {
  return (
    <section className="filters" aria-label="Portfolio filters">
      <label>
        Project type
        <select value={type} onChange={(event) => onType(event.target.value)}>
          <option>All</option>
          <option value="case-study">Case Studies</option>
          <option value="github">GitHub Projects</option>
          <option value="design">Design Projects</option>
          <option value="codepen">Code Experiments</option>
        </select>
      </label>
      <label>
        Status
        <select value={status} onChange={(event) => onStatus(event.target.value as ProjectStatus | "All")}>
          <option>All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </label>
    </section>
  );
}
