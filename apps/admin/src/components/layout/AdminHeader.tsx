import type { Theme } from "../../hooks/useTheme";
import { AdminIcon } from "../shared/AdminIcon";

export function AdminHeader({
  query,
  theme,
  onOpenSidebar,
  onQueryChange,
  onToggleTheme,
}: {
  query: string;
  theme: Theme;
  onOpenSidebar: () => void;
  onQueryChange: (query: string) => void;
  onToggleTheme: () => void;
}) {
  return (
    <header className="topbar">
      <button className="icon-button menu-button" type="button" onClick={onOpenSidebar} aria-label="Open navigation">
        <AdminIcon name="menu" />
      </button>

      <form className="search" role="search" onSubmit={(event) => event.preventDefault()}>
        <AdminIcon name="search" />
        <label className="sr-only" htmlFor="site-search">
          Search dashboard
        </label>
        <input id="site-search" type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search..." autoComplete="off" />
        <kbd>Ctrl K</kbd>
      </form>

      <div className="topbar-actions">
        <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"} aria-pressed={theme === "light"}>
          <AdminIcon name="sun" />
          <span className="theme-track">
            <span className="theme-thumb" />
          </span>
        </button>
        <button className="icon-button notification-button" type="button" aria-label="Notifications">
          <AdminIcon name="bell" />
          <span className="notification-count">8</span>
        </button>
        <button className="profile-button" type="button" aria-expanded="false">
          <span className="avatar avatar-photo">RK</span>
          <span className="profile-copy">
            <strong>Riad Kilani</strong>
            <small>Administrator</small>
          </span>
          <AdminIcon name="chevron" />
        </button>
      </div>
    </header>
  );
}
