import {
  Activity,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  CircleHelp,
  Download,
  Ellipsis,
  ExternalLink,
  Eye,
  File,
  FileText,
  FlaskConical,
  Image,
  LayoutDashboard,
  Menu,
  MessageCircle,
  Pencil,
  Plus,
  Search,
  Settings,
  Sun,
  UploadCloud,
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
  | "check"
  | "chevron"
  | "close"
  | "dashboard"
  | "download"
  | "edit"
  | "external"
  | "eye"
  | "file"
  | "file-text"
  | "flask"
  | "image"
  | "menu"
  | "message"
  | "more"
  | "plus"
  | "search"
  | "settings"
  | "sun"
  | "upload"
  | "user"
  | "wrench";

const icons: Record<AdminIconName, LucideIcon> = {
  activity: Activity,
  analytics: BarChart3,
  bell: Bell,
  briefcase: BriefcaseBusiness,
  chart: BarChart3,
  check: Check,
  chevron: ChevronDown,
  close: X,
  dashboard: LayoutDashboard,
  download: Download,
  edit: Pencil,
  external: ExternalLink,
  eye: Eye,
  file: File,
  "file-text": FileText,
  flask: FlaskConical,
  image: Image,
  menu: Menu,
  message: MessageCircle,
  more: Ellipsis,
  plus: Plus,
  search: Search,
  settings: Settings,
  sun: Sun,
  upload: UploadCloud,
  user: User,
  wrench: Wrench,
};

export function AdminIcon({ name }: { name: AdminIconName }) {
  const Icon = icons[name] ?? CircleHelp;
  return <Icon aria-hidden="true" focusable="false" />;
}
