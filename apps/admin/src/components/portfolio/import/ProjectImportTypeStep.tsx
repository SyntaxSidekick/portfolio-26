import type { ProjectType } from "../../../types/admin";
import type { ProjectImportTypeConfig } from "../../../utils/project-import";
import { AdminIcon } from "../../shared/AdminIcon";

export function ProjectImportTypeStep({ value, configs, onChange }: { value: ProjectType | ""; configs: ProjectImportTypeConfig[]; onChange: (value: ProjectType | "") => void }) {
  const iconFor = (type: ProjectType) => ({ "case-study": "file-text", github: "briefcase", design: "image", codepen: "flask" } as const)[type];
  return <article className="panel import-card import-type-card"><div className="panel-header"><div><h2>1. Project Type</h2><p>Select the project type to configure the template and validation rules.</p></div></div><div className="import-card-body"><label className="sr-only" htmlFor="projectImportType">Import type</label><select id="projectImportType" name="projectImportType" required value={value} onChange={(event) => onChange(event.target.value as ProjectType | "")}><option value="">Select project type...</option>{configs.map((config) => <option key={config.type} value={config.type}>{config.label}</option>)}</select><div className="import-type-list">{configs.map((config) => <button className={`import-type-option ${value === config.type ? "selected" : ""} ${config.type}`} type="button" key={config.type} onClick={() => onChange(config.type)}><AdminIcon name={iconFor(config.type)} /><span><strong>{config.label}</strong><small>{config.description}</small></span></button>)}</div></div></article>;
}
