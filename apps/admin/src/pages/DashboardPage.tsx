import { PostsPanel } from "../components/blog/PostsPanel";
import { AnalyticsPanel } from "../components/dashboard/AnalyticsPanel";
import { CommentsPanel } from "../components/dashboard/CommentsPanel";
import { StatsGrid } from "../components/dashboard/StatsGrid";
import { TrafficPanel } from "../components/dashboard/TrafficPanel";
import { ProjectsTable } from "../components/portfolio/ProjectsTable";
import { PageHeading } from "../components/shared/PageHeading";
import { blogPosts, portfolioProjects, recentComments, siteStats, trafficSources } from "../data/mockData";
import { useAdminCharts } from "../hooks/useAdminCharts";
import type { Theme } from "../hooks/useTheme";
import { filterRows } from "../shared/filterRows";

export function DashboardPage({ query, theme }: { query: string; theme: Theme }) {
  const { trafficRef, sourceRef } = useAdminCharts(theme);
  const filteredPosts = filterRows(blogPosts, query, ["title", "category", "status"]);
  const filteredProjects = filterRows(portfolioProjects, query, ["title", "excerpt", "status"]);

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
        <ProjectsTable projects={filteredProjects} />
      </section>
    </>
  );
}
