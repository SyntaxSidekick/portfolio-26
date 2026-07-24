import type { RefObject } from "react";
import type { TrafficSource } from "../../types/admin";
import { AdminIcon } from "../shared/AdminIcon";

export function TrafficPanel({ sourceRef, sources }: { sourceRef: RefObject<HTMLCanvasElement | null>; sources: TrafficSource[] }) {
  return (
    <article className="panel traffic-panel">
      <div className="panel-header">
        <h2>Traffic Sources</h2>
      </div>
      <div className="traffic-content">
        <div className="donut-wrap">
          <canvas ref={sourceRef} aria-label="Traffic source donut chart" />
          <div className="donut-label">
            <strong>48.7K</strong>
            <span>Total</span>
          </div>
        </div>
        <ul className="legend">
          {sources.map((source, index) => (
            <li key={source.id}>
              <span className={`legend-dot source-${index}`} />
              <span>{source.label}</span>
              <strong>{source.value}</strong>
            </li>
          ))}
        </ul>
      </div>
      <a className="panel-link" href="#traffic-report">
        View full report <AdminIcon name="external" />
      </a>
    </article>
  );
}
