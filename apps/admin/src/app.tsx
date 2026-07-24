import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AdminLayout } from "./components/layout/AdminLayout";
import { useTheme } from "./hooks/useTheme";
import { BlogPage } from "./pages/BlogPage";
import { DashboardPage } from "./pages/DashboardPage";
import { GalleriesPage } from "./pages/GalleriesPage";
import { MediaPage } from "./pages/MediaPage";
import { PortfolioEditorPage } from "./pages/PortfolioEditorPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { PortfolioCategoriesPage } from "./pages/PortfolioCategoriesPage";
import { PortfolioDetailPage } from "./pages/PortfolioDetailPage";
import { PortfolioTechnologiesPage } from "./pages/PortfolioTechnologiesPage";
import { SettingsPage } from "./pages/SettingsPage";
import "./styles/global.css";

export function App() {
  const [theme, setTheme] = useTheme();
  const [query, setQuery] = useState("");

  return (
    <AdminLayout query={query} theme={theme} onQueryChange={setQuery} onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <Routes>
        <Route path="/" element={<DashboardPage query={query} theme={theme} />} />
        <Route path="/portfolio" element={<PortfolioPage query={query} />} />
        <Route path="/portfolio/new" element={<PortfolioEditorPage />} />
        <Route path="/portfolio/categories" element={<PortfolioCategoriesPage />} />
        <Route path="/portfolio/technologies" element={<PortfolioTechnologiesPage />} />
        <Route path="/portfolio/:id" element={<PortfolioDetailPage />} />
        <Route path="/portfolio/:id/edit" element={<PortfolioEditorPage />} />
        <Route path="/galleries" element={<GalleriesPage />} />
        <Route path="/blog" element={<BlogPage query={query} />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </AdminLayout>
  );
}
