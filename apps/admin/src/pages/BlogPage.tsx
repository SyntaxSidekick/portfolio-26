import { PostsPanel } from "../components/blog/PostsPanel";
import { PageHeading } from "../components/shared/PageHeading";
import { blogPosts } from "../data/mockData";
import { filterRows } from "../shared/filterRows";

export function BlogPage({ query }: { query: string }) {
  const posts = filterRows(blogPosts, query, ["title", "category", "status"]);

  return (
    <>
      <PageHeading title="Blog" description="WordPress post management surface prepared with typed local mock data." action="Create Post" />
      <PostsPanel posts={posts} />
    </>
  );
}
