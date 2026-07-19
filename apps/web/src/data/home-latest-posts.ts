// Temporary homepage data copied from the approved static homepage. Replace during WordPress integration.
export type HomeLatestPost = {
  title: string;
  excerpt: string;
  date: string;
  datetime: string;
  category: string;
  readTime: string;
  imageSrc: string;
  imageAlt: string;
};

export const homeLatestPosts: HomeLatestPost[] = [
  {
    title: "Native CSS Is Quietly Replacing Sass, But It Isn't Replacing the Need for Sass",
    excerpt:
      "CSS has evolved and closed the gap with Sass significantly. Here's what that means for modern front-end development.",
    date: "Jan 10, 2025",
    datetime: "2025-01-10",
    category: "CSS",
    readTime: "6 min read",
    imageSrc: "https://placehold.co/900x480/132742/47a6ff?text=CSS+%26+Sass",
    imageAlt: ""
  },
  {
    title: "Everyday Types Explained From the Ground Up",
    excerpt:
      "A quick intro before we continue the series. It has been a minute since the last post, but I'm back and better than ever.",
    date: "Jan 16, 2025",
    datetime: "2025-01-16",
    category: "TypeScript",
    readTime: "8 min read",
    imageSrc: "https://placehold.co/900x480/07121d/2380c9?text=TypeScript+Types",
    imageAlt: ""
  },
  {
    title: "How Material Design Motion Improves Perceived Performance in React Apps",
    excerpt:
      "Strategic motion design can make interfaces feel faster and more responsive, even when they are not.",
    date: "Jan 10, 2025",
    datetime: "2025-01-10",
    category: "React",
    readTime: "7 min read",
    imageSrc: "https://placehold.co/900x480/11152b/8c6dff?text=React+Motion",
    imageAlt: ""
  }
];
