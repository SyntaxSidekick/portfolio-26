import type { SiteStat } from "../../types/admin";
import { AdminIcon } from "../shared/AdminIcon";

export function StatsGrid({ stats }: { stats: SiteStat[] }) {
  return (
    <section className="stats-grid" aria-label="Site statistics">
      {stats.map((stat) => (
        <article className="stat-card" key={stat.id}>
          <div>
            <p>{stat.label}</p>
            <strong>{stat.value}</strong>
            <span className="trend up">{stat.trend}</span>
          </div>
          <span className={`stat-icon ${stat.color}`}>
            <AdminIcon name={stat.icon} />
          </span>
        </article>
      ))}
    </section>
  );
}
