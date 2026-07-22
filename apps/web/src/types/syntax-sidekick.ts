export type SyntaxSidekickArticle = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  contentHtml?: string;
  tableOfContents: Array<{
    id: string;
    label: string;
  }>;
  publishedAt: string;
  url: string;
  path: string;
  featuredImage: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  } | null;
  author?: string;
  categories: string[];
};

export type WordPressPost = {
  id: number;
  slug: string;
  date: string;
  link: string;
  title?: {
    rendered?: string;
  };
  excerpt?: {
    rendered?: string;
  };
  content?: {
    rendered?: string;
  };
  _embedded?: {
    author?: Array<{
      name?: string;
    }>;
    "wp:term"?: Array<
      Array<{
        name?: string;
        taxonomy?: string;
      }>
    >;
    "wp:featuredmedia"?: Array<{
      alt_text?: string;
      source_url?: string;
      media_details?: {
        width?: number;
        height?: number;
        sizes?: Record<
          string,
          {
            source_url?: string;
            width?: number;
            height?: number;
          }
        >;
      };
    }>;
  };
};
