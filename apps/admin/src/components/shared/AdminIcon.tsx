import {
  Activity,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  ChevronDown,
  CircleHelp,
  Ellipsis,
  ExternalLink,
  Eye,
  File,
  Image,
  LayoutDashboard,
  Menu,
  MessageCircle,
  Pencil,
  Plus,
  Search,
  Settings,
  Sun,
  User,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";

export type AdminIconName =
  | "activity"
  | "analytics"
  | "bell"
  | "briefcase"
  | "chart"
  | "chevron"
  | "close"
  | "dashboard"
  | "edit"
  | "external"
  | "eye"
  | "file"
  | "image"
  | "menu"
  | "message"
  | "more"
  | "plus"
  | "search"
  | "settings"
  | "sun"
  | "user"
  | "wrench";

const icons: Record<AdminIconName, LucideIcon> = {
  activity: Activity,
  analytics: BarChart3,
  bell: Bell,
  briefcase: BriefcaseBusiness,
  chart: BarChart3,
  chevron: ChevronDown,
  close: X,
  dashboard: LayoutDashboard,
  edit: Pencil,
  external: ExternalLink,
  eye: Eye,
  file: File,
  image: Image,
  menu: Menu,
  message: MessageCircle,
  more: Ellipsis,
  plus: Plus,
  search: Search,
  settings: Settings,
  sun: Sun,
  user: User,
  wrench: Wrench,
};

export function AdminIcon({ name }: { name: AdminIconName }) {
  const Icon = icons[name] ?? CircleHelp;
  return <Icon aria-hidden="true" focusable="false" />;
}
