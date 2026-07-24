import { useCallback, useState, type ReactNode } from "react";
import { useDashboardShortcuts } from "../../hooks/useDashboardShortcuts";
import type { Theme } from "../../hooks/useTheme";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";

export function AdminLayout({
  children,
  query,
  theme,
  onQueryChange,
  onToggleTheme,
}: {
  children: ReactNode;
  query: string;
  theme: Theme;
  onQueryChange: (query: string) => void;
  onToggleTheme: () => void;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [openGroups, setOpenGroups] = useState({ posts: true, portfolio: true });
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  useDashboardShortcuts(closeSidebar);

  const shellClass = ["admin-shell", collapsed ? "sidebar-collapsed" : "", sidebarOpen ? "sidebar-open" : ""].join(" ");

  return (
    <div className={shellClass}>
      <a className="skip-link" href="#main-content">
        Skip to dashboard content
      </a>
      <AdminSidebar
        openGroups={openGroups}
        onClose={closeSidebar}
        onToggleCollapse={() => setCollapsed((value) => !value)}
        onToggleGroup={(group) => setOpenGroups((value) => ({ ...value, [group]: !value[group] }))}
      />
      <div className="workspace">
        <AdminHeader query={query} theme={theme} onOpenSidebar={() => setSidebarOpen(true)} onQueryChange={onQueryChange} onToggleTheme={onToggleTheme} />
        <main id="main-content" className="dashboard">
          {children}
          <footer className="dashboard-footer">
            <p>
              Thank you for creating with <a href="#wordpress">WordPress.</a>
            </p>
            <p>Version 6.6.2</p>
          </footer>
        </main>
      </div>
      <button className="sidebar-scrim" type="button" aria-label="Close navigation" onClick={closeSidebar} />
    </div>
  );
}
