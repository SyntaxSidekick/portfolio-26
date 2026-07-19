// Temporary homepage data copied from the approved static homepage. Replace during portfolio API integration.
export type HomeFeaturedProject = {
  title: string;
  category: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  results: Array<{
    value: string;
    label: string;
  }>;
  tags: string[];
};

export const homeFeaturedProjects: HomeFeaturedProject[] = [
  {
    title: "SyntaxSideKick",
    category: "Modern Coding Blog",
    description:
      "A custom WordPress platform delivering tutorials, guides, and resources on modern front-end development.",
    imageSrc: "https://placehold.co/900x520/071525/2da8ff?text=SyntaxSidekick",
    imageAlt: "SyntaxSideKick project interface preview",
    results: [
      { value: "90+", label: "Lighthouse Score" },
      { value: "WCAG 2.2 AA", label: "Accessibility" },
      { value: "100%", label: "Performance Score" }
    ],
    tags: ["WordPress", "HTML5", "CSS3", "JavaScript", "+2"]
  },
  {
    title: "Brisa Oceano",
    category: "Luxury Resort Platform",
    description:
      "Redesigned the digital experience for a luxury resort brand with a focus on performance and conversions.",
    imageSrc: "https://placehold.co/900x520/101a25/cba883?text=Brisa+Oceano",
    imageAlt: "Brisa Oceano resort website preview",
    results: [
      { value: "40%", label: "Reduction in Bounce Rate" },
      { value: "15%", label: "Increase in Booking" },
      { value: "30%", label: "Faster Page Load" }
    ],
    tags: ["Next.js", "Tailwind CSS", "CMS", "GSAP", "+1"]
  },
  {
    title: "PipelineOS",
    category: "Internal Platform",
    description:
      "Built an internal platform to streamline operations, improve reporting, and increase team productivity.",
    imageSrc: "https://placehold.co/900x520/d9e6ef/14344b?text=PipelineOS",
    imageAlt: "PipelineOS application dashboard preview",
    results: [
      { value: "2.5x", label: "Faster Task Completion" },
      { value: "100%", label: "Team Adoption" },
      { value: "50+", label: "Hours Saved Per Month" }
    ],
    tags: ["React", "TypeScript", "Node.js", "MongoDB", "+1"]
  }
];
