export function FormPanel({ title, fields }: { title: string; fields: string[] }) {
  return (
    <article className="panel form-panel">
      <div className="panel-header">
        <h2>{title}</h2>
      </div>
      <div className="form-stack">
        {fields.map((field) => (
          <label key={field}>
            {field}
            <input placeholder={field} />
          </label>
        ))}
        <div className="heading-actions">
          <button className="button button-secondary" type="button">
            Save Draft
          </button>
          <button className="button button-primary" type="button">
            Publish
          </button>
        </div>
      </div>
    </article>
  );
}
