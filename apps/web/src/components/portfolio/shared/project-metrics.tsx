import {
  CircleCheck,
  CloudDownload,
  Clock,
  Database,
  DollarSign,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { PublicProject } from "@/lib/portfolio-api";

type ProjectMetric = PublicProject["metrics"][number];
type ProjectResult = NonNullable<PublicProject["keyResults"]>[number];
type MetricItem = ProjectMetric | ProjectResult;

type MetricType = NonNullable<ProjectResult["type"]>;

type ProjectMetricsProps = {
  metrics: MetricItem[];
  ariaLabel: string;
  variant?: "primary" | "compact";
};

const metricIcons = {
  users: Users,
  downloads: CloudDownload,
  uptime: ShieldCheck,
  performance: Zap,
  growth: TrendingUp,
  time: Clock,
  revenue: DollarSign,
  rating: Star,
  database: Database,
  completion: CircleCheck,
} satisfies Record<MetricType, LucideIcon>;

const metricTypeByIconKey: Record<string, MetricType> = {
  users: "users",
  "cloud-download": "downloads",
  "shield-check": "uptime",
  zap: "performance",
  "trending-up": "growth",
  clock: "time",
  award: "completion",
  star: "rating",
  activity: "performance",
  chart: "growth",
  "check-circle": "completion",
  database: "database",
};

function getMetricType(metric: MetricItem): MetricType {
  if ("type" in metric && metric.type) {
    return metric.type;
  }

  if ("iconKey" in metric && metric.iconKey) {
    return metricTypeByIconKey[metric.iconKey] ?? "growth";
  }

  return "growth";
}

export function ProjectMetrics({
  metrics,
  ariaLabel,
  variant = "primary",
}: ProjectMetricsProps) {
  if (metrics.length === 0) {
    return null;
  }

  return (
    <dl className="project-metric-list" data-variant={variant} aria-label={ariaLabel}>
      {metrics.map((metric) => {
        const metricType = getMetricType(metric);
        const Icon = metricIcons[metricType];
        return (
          <div className="project-metric-card" data-metric-type={metricType} key={metric.id}>
            <Icon aria-hidden="true" />
            <dt>{metric.value}</dt>
            <dd>{metric.label}</dd>
            {"description" in metric && metric.description ? (
              <dd>{metric.description}</dd>
            ) : null}
          </div>
        );
      })}
    </dl>
  );
}
