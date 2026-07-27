import type { DragEvent } from "react";
import type { ProjectImportTypeConfig } from "../../../utils/project-import";
import { AdminIcon } from "../../shared/AdminIcon";

export function ProjectImportDropzone({ config, file, busy, rowCount, onFile, onDownload, onRemove }: { config: ProjectImportTypeConfig | null; file: File | null; busy: boolean; rowCount: number; onFile: (file: File) => void; onDownload: () => void; onRemove: () => void }) {
  const pick = (files: FileList | null) => {
    const file = files?.[0];
    if (file) onFile(file);
  };
  const drop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    pick(event.dataTransfer.files);
  };
  return <article className="panel import-card import-upload-card"><div className="panel-header"><div><h2>2. CSV File</h2><p>Upload your CSV file to validate and preview the data.</p></div></div><div className="import-card-body"><label className={`import-dropzone ${file ? "has-file" : ""}`} onDragOver={(event) => event.preventDefault()} onDrop={drop} tabIndex={0}><AdminIcon name="upload" /><strong>{file ? file.name : "Drop your CSV file here"}</strong><span>{file ? `${Math.round(file.size / 1024)} KB, ${rowCount} parsed row${rowCount === 1 ? "" : "s"}` : "or"}</span><span className="button button-primary">Choose File</span><small>Supports CSV files up to 5MB<br />Maximum 1,000 rows</small><input className="sr-only" type="file" accept=".csv,text/csv" disabled={!config || busy} onChange={(event) => pick(event.target.files)} /></label><div className="import-upload-actions"><button className="button button-secondary" type="button" disabled={!config} onClick={onDownload}><AdminIcon name="download" />Download Template</button>{file ? <button className="button button-secondary" type="button" onClick={onRemove}>Remove file</button> : null}</div><div className="import-requirements"><h3><AdminIcon name="check" /> File Requirements</h3><ul><li>CSV format with header row</li><li>Maximum file size: 5MB</li><li>Maximum rows: 1,000</li><li>UTF-8 encoding recommended</li></ul></div></div></article>;
}
