import { NavLink, useLocation } from "react-router-dom";
import { AdminIcon, type AdminIconName } from "../shared/AdminIcon";

interface NavGroupProps {
  title: string;
  icon: AdminIconName;
  open: boolean;
  onToggle: () => void;
  links: [string, string][];
}

function NavGroup({ title, icon, open, onToggle, links }: NavGroupProps) {
  return (
    <div className={`nav-group ${open ? "is-open" : ""}`}>
      <button className="nav-item nav-trigger" type="button" aria-expanded={open} onClick={onToggle}>
        <AdminIcon name={icon} />
        <span>{title}</span>
        <AdminIcon name="chevron" />
      </button>
      <div className="subnav">
        {links.map(([label, to]) => (
          <NavLink key={label} to={to}>
            {label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export function AdminSidebar({
  openGroups,
  onToggleGroup,
  onClose,
  onToggleCollapse,
}: {
  openGroups: { posts: boolean; portfolio: boolean };
  onToggleGroup: (group: "posts" | "portfolio") => void;
  onClose: () => void;
  onToggleCollapse: () => void;
}) {
  const location = useLocation();

  return (
    <aside className="sidebar" aria-label="Administration navigation">
      <div className="brand">
        <div className="brand-mark" aria-hidden="true">
          RK
        </div>
        <div className="brand-copy">
          <span className="brand-name">
            <b>Riad</b> Kilani
          </span>
          <span className="brand-role">Admin</span>
        </div>
        <button className="icon-button sidebar-close" type="button" onClick={onClose} aria-label="Close navigation">
          <AdminIcon name="close" />
        </button>
      </div>

      <nav className="sidebar-nav">
        <NavLink className={({ isActive }) => `nav-item ${isActive && location.pathname === "/" ? "is-active" : ""}`} to="/" aria-current={location.pathname === "/" ? "page" : undefined}>
          <AdminIcon name="dashboard" />
          <span>Dashboard</span>
        </NavLink>
        <NavGroup
          title="Posts"
          icon="file"
          open={openGroups.posts}
          onToggle={() => onToggleGroup("posts")}
          links={[
            ["All Posts", "/blog"],
            ["Add New", "/blog?new=1"],
            ["Categories", "/blog?panel=categories"],
            ["Tags", "/blog?panel=tags"],
          ]}
        />
        <NavGroup
          title="Portfolio"
          icon="briefcase"
          open={openGroups.portfolio}
          onToggle={() => onToggleGroup("portfolio")}
          links={[
            ["All Projects", "/portfolio"],
            ["Add New", "/portfolio/new"],
            ["Categories", "/portfolio/categories"],
            ["Technologies", "/portfolio/technologies"],
          ]}
        />
        <NavLink className="nav-item" to="/media">
          <AdminIcon name="image" />
          <span>Media</span>
        </NavLink>
        <NavLink className="nav-item" to="/galleries">
          <AdminIcon name="image" />
          <span>Galleries</span>
        </NavLink>
        <NavLink className="nav-item" to="/settings">
          <AdminIcon name="settings" />
          <span>Settings</span>
        </NavLink>
        <a className="nav-item" href="#comments">
          <AdminIcon name="message" />
          <span>Comments</span>
          <span className="count-badge">12</span>
        </a>
        <a className="nav-item" href="#tools">
          <AdminIcon name="wrench" />
          <span>Tools</span>
        </a>
        <a className="nav-item" href="#analytics">
          <AdminIcon name="chart" />
          <span>Analytics</span>
        </a>
      </nav>

      <button className="collapse-button" type="button" onClick={onToggleCollapse}>
        <AdminIcon name="chevron" />
        <span>Collapse Menu</span>
      </button>
    </aside>
  );
}
