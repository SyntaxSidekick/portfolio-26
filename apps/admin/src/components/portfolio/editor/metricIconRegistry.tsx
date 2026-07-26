import {
  CircleCheck,
  CloudDownload,
  Clock,
  Database,
  DollarSign,
  Star,
  TrendingUp,
  ShieldCheck,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { MetricType } from "../../../types/admin";

export type MetricAccent = "purple" | "green" | "blue" | "amber";

export const metricPresets = {
  users: {
    icon: Users,
    accent: "purple",
    label: "Users",
  },
  downloads: {
    icon: CloudDownload,
    accent: "green",
    label: "Downloads",
  },
  uptime: {
    icon: ShieldCheck,
    accent: "blue",
    label: "Uptime",
  },
  performance: {
    icon: Zap,
    accent: "amber",
    label: "Performance",
  },
  growth: {
    icon: TrendingUp,
    accent: "green",
    label: "Growth",
  },
  time: {
    icon: Clock,
    accent: "amber",
    label: "Time",
  },
  revenue: {
    icon: DollarSign,
    accent: "green",
    label: "Revenue",
  },
  rating: {
    icon: Star,
    accent: "purple",
    label: "Rating",
  },
  database: {
    icon: Database,
    accent: "blue",
    label: "Database",
  },
  completion: {
    icon: CircleCheck,
    accent: "amber",
    label: "Completion",
  },
} satisfies Record<MetricType, { icon: LucideIcon; accent: MetricAccent; label: string }>;

export const metricTypeOptions: Array<{ value: MetricType; label: string }> = [
  { value: "users", label: "Users" },
  { value: "downloads", label: "Downloads" },
  { value: "uptime", label: "Uptime" },
  { value: "performance", label: "Performance" },
  { value: "growth", label: "Growth" },
  { value: "time", label: "Time" },
  { value: "revenue", label: "Revenue" },
  { value: "rating", label: "Rating" },
  { value: "database", label: "Database" },
  { value: "completion", label: "Completion" },
];

const legacyIconMap: Record<string, MetricType> = {
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

export function coerceMetricType(type?: string | null, legacyIconKey?: string | null): MetricType {
  if (type && type in metricPresets) {
    return type as MetricType;
  }
  if (legacyIconKey && legacyIconMap[legacyIconKey]) {
    return legacyIconMap[legacyIconKey];
  }
  return "users";
}

export function metricAccentClass(accent: MetricAccent) {
  return `metric-accent-${accent}`;
}

export function getMetricPreset(type?: string | null, legacyIconKey?: string | null) {
  const resolvedType = coerceMetricType(type, legacyIconKey);
  return metricPresets[resolvedType];
}
