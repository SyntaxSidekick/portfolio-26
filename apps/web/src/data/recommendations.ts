export type Recommendation = {
  name: string;
  title: string;
  company: string;
  quote: string;
  avatar: {
    src?: string;
    alt: string;
  };
  featured: boolean;
};

export const recommendations = [
  {
    name: "Kevin Borkman",
    title: "Lead Solutions Integration Engineer",
    company: "Bonnier Corporation",
    quote:
      "Riad has genuine curiosity and a drive to understand systems deeply, not just make things work. Those qualities compound over a career, and I'm excited to see where he goes next.",
    avatar: {
      src: "/assets/images/recommendations/kevin-borkman.jpg",
      alt: "Kevin Borkman"
    },
    featured: true
  },
  {
    name: "John Michael",
    title: "Director, Digital Experience Design",
    company: "Marriott Vacations Worldwide",
    quote:
      "Riad is a talented designer with a strong ability to translate ideas into polished, user-friendly visual designs. He played a key role in creating the app interfaces and consistently delivered thoughtful work.",
    avatar: {
      src: "/assets/images/recommendations/john-michael.jpg",
      alt: "John Michael"
    },
    featured: true
  },
  {
    name: "Jonathan Rosero",
    title: "Product Manager",
    company: "Bonnier Corporation",
    quote:
      "Riad was flexible when requirements shifted, and his front-end work and guidance held up well across multiple brands and platforms.",
    avatar: {
      src: "/assets/images/recommendations/jonathan-rosero.jpg",
      alt: "Jonathan Rosero"
    },
    featured: true
  },
  {
    name: "Christopher Rivera",
    title: "Owner, Alpha27, Inc.",
    company: "Custom Web Development",
    quote:
      "Riad consistently demonstrated a strong work ethic and reliability, always willing to take on new challenges and see projects through to completion.",
    avatar: {
      alt: "Christopher Rivera"
    },
    featured: false
  },
  {
    name: "Megan Williams",
    title: "Product Design Lead",
    company: "Enterprise Product Team",
    quote:
      "Riad brings a calm, systems-minded approach to complex product work. He connects design intent to implementation details without losing sight of the user experience.",
    avatar: {
      alt: "Megan Williams"
    },
    featured: false
  },
  {
    name: "Alex Chen",
    title: "Engineering Manager",
    company: "Digital Platform Team",
    quote:
      "Riad helped our team move faster by creating reusable front-end patterns, documenting decisions clearly, and raising the quality bar across the interface.",
    avatar: {
      alt: "Alex Chen"
    },
    featured: false
  },
  {
    name: "Sarah Patel",
    title: "Client Strategy Director",
    company: "Agency Partner",
    quote:
      "Riad understands how to balance business goals, technical constraints, and polished user experience. His work gave stakeholders confidence throughout delivery.",
    avatar: {
      alt: "Sarah Patel"
    },
    featured: false
  }
] satisfies Recommendation[];

export const featuredRecommendations = recommendations.filter(
  (recommendation) => recommendation.featured,
);
