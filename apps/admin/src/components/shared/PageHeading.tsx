import { AdminIcon } from "./AdminIcon";
import type { ReactNode } from "react";

export function PageHeading({ title, description, action, children }: { title: string; description: string; action?: string; children?: ReactNode }) {
  return (
    <section className="page-heading">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="heading-actions">
        {children ?? <a className="button button-secondary" href="#view-site">View Site <AdminIcon name="external" /></a>}
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
