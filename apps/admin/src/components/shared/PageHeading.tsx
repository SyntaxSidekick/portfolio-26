import { AdminIcon } from "./AdminIcon";

export function PageHeading({ title, description, action }: { title: string; description: string; action?: string }) {
  return (
    <section className="page-heading">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="heading-actions">
        <a className="button button-secondary" href="#view-site">
          View Site <AdminIcon name="external" />
        </a>
        {action ? (
          <button className="button button-primary" type="button">
            <AdminIcon name="plus" />
            {action}
          </button>
        ) : null}
      </div>
    </section>
  );
}
