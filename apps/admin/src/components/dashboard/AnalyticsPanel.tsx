import type { RefObject } from "react";
import { AdminIcon } from "../shared/AdminIcon";

export function AnalyticsPanel({ trafficRef }: { trafficRef: RefObject<HTMLCanvasElement | null> }) {
  return (
    <article className="panel analytics-panel">
      <div className="panel-header">
        <h2>Analytics Overview</h2>
        <select aria-label="Analytics date range">
          <option>Last 30 Days</option>
          <option>Last 7 Days</option>
          <option>Last 90 Days</option>
        </select>
      </div>
      <div className="analytics-summary">
        <div>
          <span>Total Views</span>
          <strong>
            48.7K <small>{"\u2191"} 18.2%</small>
          </strong>
        </div>
        <div>
          <span>Unique Visitors</span>
          <strong>
            28.3K <small>{"\u2191"} 15.7%</small>
          </strong>
        </div>
        <div>
          <span>Page Views</span>
          <strong>
            72.1K <small>{"\u2191"} 20.5%</small>
          </strong>
        </div>
      </div>
      <div className="chart-wrap">
        <canvas ref={trafficRef} aria-label="Thirty day traffic line chart" />
      </div>
      <a className="panel-link" href="#analytics">
        View full analytics <AdminIcon name="external" />
      </a>
    </article>
  );
}
