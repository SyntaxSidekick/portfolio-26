import { useEffect, useState } from "react";
import { isAbortError } from "../api/client";
import { listProjects, patchProject } from "../api/projects";
import { PostsPanel } from "../components/blog/PostsPanel";
import { AnalyticsPanel } from "../components/dashboard/AnalyticsPanel";
import { CommentsPanel } from "../components/dashboard/CommentsPanel";
import { StatsGrid } from "../components/dashboard/StatsGrid";
import { TrafficPanel } from "../components/dashboard/TrafficPanel";
import { ProjectsTable } from "../components/portfolio/ProjectsTable";
import { PageHeading } from "../components/shared/PageHeading";
import { blogPosts, recentComments, siteStats, trafficSources } from "../data/mockData";
import { useAdminCharts } from "../hooks/useAdminCharts";
import type { Theme } from "../hooks/useTheme";
import { filterRows } from "../shared/filterRows";
import type { PortfolioProject } from "../types/admin";

export function DashboardPage({ query, theme }: { query: string; theme: Theme }) {
  const { trafficRef, sourceRef } = useAdminCharts(theme);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState("");
  const [featuredTogglePendingIds, setFeaturedTogglePendingIds] = useState<Set<string>>(new Set());
  const filteredPosts = filterRows(blogPosts, query, ["title", "category", "status"]);
  const filteredProjects = filterRows(projects, query, ["title", "excerpt", "status"]);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setProjectsLoading(true);
    setProjectsError("");
    listProjects(controller.signal)
      .then((projects) => {
        if (active) setProjects(projects);
      })
      .catch((error: unknown) => {
        if (active && !isAbortError(error)) setProjectsError(error instanceof Error ? error.message : "Projects could not be loaded");
      })
      .finally(() => {
        if (active) setProjectsLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  async function handleToggleFeatured(project: PortfolioProject, featured: boolean) {
    setFeaturedTogglePendingIds((current) => {
      const next = new Set(current);
      next.add(project.id);
      return next;
    });
    setProjectsError("");

    try {
      const updated = await patchProject(project.id, { featured });
      setProjects((current) => current.map((item) => (item.id === updated.id ? updated : item)));
    } catch (error: unknown) {
      setProjectsError(error instanceof Error ? error.message : "Featured state could not be updated");
    } finally {
      setFeaturedTogglePendingIds((current) => {
        const next = new Set(current);
        next.delete(project.id);
        return next;
      });
    }
  }

  return (
    <>
      <PageHeading title="Dashboard" description="Welcome back, Riad! Here's what's happening with your site." action="New Post" />
      <StatsGrid stats={siteStats} />
      <section className="dashboard-grid primary-grid">
        <AnalyticsPanel trafficRef={trafficRef} />
        <TrafficPanel sourceRef={sourceRef} sources={trafficSources} />
        <CommentsPanel comments={recentComments} />
      </section>
      <section className="dashboard-grid secondary-grid">
        <PostsPanel posts={filteredPosts} />
        {projectsLoading ? <article className="panel empty-panel">Loading projects...</article> : null}
        {projectsError ? <article className="panel empty-panel">{projectsError}</article> : null}
        {!projectsLoading && !projectsError ? <ProjectsTable projects={filteredProjects} onToggleFeatured={handleToggleFeatured} featuredTogglePendingIds={featuredTogglePendingIds} /> : null}
      </section>
    </>
  );
}
