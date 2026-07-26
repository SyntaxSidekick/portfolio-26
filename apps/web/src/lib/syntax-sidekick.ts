import type {
  SyntaxSidekickArticle,
  WordPressPost
} from "@/types/syntax-sidekick";

const DEFAULT_SYNTAX_SIDEKICK_URL = "https://syntaxsidekick.com";

export const SYNTAX_SIDEKICK_REVALIDATE_SECONDS = 3600;
export const HOME_ARTICLE_LIMIT = 3;
const WORDPRESS_MAX_POSTS_PER_PAGE = 100;
const SYNTAX_SIDEKICK_TIMEOUT_MS = 3000;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric"
});

export function formatArticleDate(date: string) {
  return dateFormatter.format(new Date(date));
}

export async function getSyntaxSidekickArticles(
  limit: number
): Promise<SyntaxSidekickArticle[]> {
  const posts = await fetchSyntaxSidekickPostPage({ limit, page: 1 });

  return posts.map((post) => normalizePost(post)).filter(isArticle);
}

export async function getSyntaxSidekickArticleBySlug(
  slug: string
): Promise<SyntaxSidekickArticle | null> {
  const posts = await fetchSyntaxSidekickPostPage({ limit: 1, page: 1, slug });

  return normalizePost(posts[0]);
}

export async function getAllSyntaxSidekickArticles(): Promise<
  SyntaxSidekickArticle[]
> {
  const firstPage = await fetchSyntaxSidekickPostPageWithTotalPages({
    limit: WORDPRESS_MAX_POSTS_PER_PAGE,
    page: 1
  });

  const allPosts = [...firstPage.posts];

  for (let page = 2; page <= firstPage.totalPages; page += 1) {
    const posts = await fetchSyntaxSidekickPostPage({
      limit: WORDPRESS_MAX_POSTS_PER_PAGE,
      page
    });

    allPosts.push(...posts);
  }

  return allPosts.map((post) => normalizePost(post)).filter(isArticle);
}

async function fetchSyntaxSidekickPostPageWithTotalPages({
  limit,
  page
}: {
  limit: number;
  page: number;
}): Promise<{ posts: WordPressPost[]; totalPages: number }> {
  const response = await fetchSyntaxSidekickPostPageResponse({ limit, page });

  return {
    posts: response.posts,
    totalPages: response.totalPages
  };
}

async function fetchSyntaxSidekickPostPage({
  limit,
  page,
  slug
}: {
  limit: number;
  page: number;
  slug?: string;
}) {
  const response = await fetchSyntaxSidekickPostPageResponse({
    limit,
    page,
    slug
  });

  return response.posts;
}

async function fetchSyntaxSidekickPostPageResponse({
  limit,
  page,
  slug
}: {
  limit: number;
  page: number;
  slug?: string;
}): Promise<{ posts: WordPressPost[]; totalPages: number }> {
  try {
    const endpoint = new URL(
      "/wp-json/wp/v2/posts",
      process.env.SYNTAX_SIDEKICK_URL ?? DEFAULT_SYNTAX_SIDEKICK_URL
    );

    const searchParams = new URLSearchParams({
      per_page: String(limit),
      page: String(page),
      order: "desc",
      orderby: "date",
      status: "publish",
      _embed: "1"
    });

    if (slug) {
      searchParams.set("slug", slug);
    }

    endpoint.search = searchParams.toString();

    const response = await fetchWithTimeout(endpoint, {
      next: {
        revalidate: SYNTAX_SIDEKICK_REVALIDATE_SECONDS
      }
    });

    if (!response.ok) {
      return { posts: [], totalPages: 0 };
    }

    const posts: unknown = await response.json();

    if (!Array.isArray(posts)) {
      return { posts: [], totalPages: 0 };
    }

    return {
      posts: posts.filter(isWordPressPost),
      totalPages: Number(response.headers.get("x-wp-totalpages") ?? 1)
    };
  } catch {
    return { posts: [], totalPages: 0 };
  }
}

async function fetchWithTimeout(input: URL | string, init?: RequestInit) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SYNTAX_SIDEKICK_TIMEOUT_MS);

  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function normalizePost(post: unknown): SyntaxSidekickArticle | null {
  if (!isWordPressPost(post)) {
    return null;
  }

  const title = normalizeRenderedText(post.title?.rendered ?? "");

  if (!title || !post.link) {
    return null;
  }

  const featuredImage = getFeaturedImage(post, title);
  const articleContent = addHeadingIds(post.content?.rendered ?? "");

  return {
    id: post.id,
    slug: post.slug,
    title,
    excerpt: normalizeExcerpt(post.excerpt?.rendered ?? ""),
    contentHtml: articleContent.content || undefined,
    tableOfContents: articleContent.tableOfContents,
    publishedAt: post.date,
    url: post.link,
    path: `/blog/${post.slug}`,
    featuredImage,
    author: post._embedded?.author?.find((author) => author.name)?.name,
    categories: getCategories(post)
  };
}

export function addHeadingIds(html: string) {
  const headings: Array<{ id: string; label: string }> = [];
  const usedIds = new Map<string, number>();

  const content = html.replace(
    /<h2([^>]*)>(.*?)<\/h2>/gi,
    (_match, attributes: string, innerHtml: string) => {
      const label = normalizeRenderedText(innerHtml);
      const existingId = attributes.match(/\s+id=(["'])(.*?)\1/i)?.[2];
      const baseId = existingId || createHeadingId(label);
      const count = usedIds.get(baseId) ?? 0;
      const id = count === 0 ? baseId : `${baseId}-${count + 1}`;
      const attributesWithoutId = attributes.replace(/\s+id=(["']).*?\1/i, "");

      usedIds.set(baseId, count + 1);
      headings.push({ id, label });

      return `<h2${attributesWithoutId} id="${id}">${innerHtml}</h2>`;
    }
  );

  return {
    content,
    tableOfContents: headings
  };
}

function createHeadingId(label: string) {
  return (
    label
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "section"
  );
}

function isWordPressPost(post: unknown): post is WordPressPost {
  return (
    typeof post === "object" &&
    post !== null &&
    typeof (post as WordPressPost).id === "number" &&
    typeof (post as WordPressPost).slug === "string" &&
    typeof (post as WordPressPost).date === "string" &&
    typeof (post as WordPressPost).link === "string"
  );
}

function isArticle(
  article: SyntaxSidekickArticle | null
): article is SyntaxSidekickArticle {
  return article !== null;
}

function getCategories(post: WordPressPost) {
  return (
    post._embedded?.["wp:term"]
      ?.flat()
      .filter((term) => term.taxonomy === "category" && term.name)
      .map((term) => normalizeRenderedText(term.name ?? "")) ?? []
  );
}

function getFeaturedImage(post: WordPressPost, title: string) {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];

  if (!media?.source_url) {
    return null;
  }

  const preferredImage =
    media.media_details?.sizes?.large ??
    media.media_details?.sizes?.medium_large ??
    media.media_details?.sizes?.medium;

  return {
    src: preferredImage?.source_url ?? media.source_url,
    alt: normalizeRenderedText(media.alt_text ?? "") || title,
    width: preferredImage?.width ?? media.media_details?.width,
    height: preferredImage?.height ?? media.media_details?.height
  };
}

function normalizeExcerpt(value: string) {
  return normalizeRenderedText(
    value
      .replace(/<a\b[^>]*class=["'][^"']*more-link[^"']*["'][^>]*>.*?<\/a>/gis, "")
      .replace(/\s*\[[^\]]*read more[^\]]*\]\s*/gi, "")
  );
}

function normalizeRenderedText(value: string) {
  return decodeHtmlEntities(value.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function decodeHtmlEntities(value: string) {
  const namedEntities: Record<string, string> = {
    amp: "&",
    apos: "'",
    hellip: "...",
    laquo: "<<",
    ldquo: '"',
    lsquo: "'",
    nbsp: " ",
    quot: '"',
    raquo: ">>",
    rdquo: '"',
    rsquo: "'"
  };

  return value.replace(/&(#\d+|#x[\da-f]+|[a-z]+);/gi, (entity, code: string) => {
    if (code.startsWith("#x")) {
      return String.fromCodePoint(Number.parseInt(code.slice(2), 16));
    }

    if (code.startsWith("#")) {
      return String.fromCodePoint(Number.parseInt(code.slice(1), 10));
    }

    return namedEntities[code.toLowerCase()] ?? entity;
  });
}
