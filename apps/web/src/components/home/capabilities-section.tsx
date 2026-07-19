const capabilities = [
  {
    icon: "</>",
    title: "Front-End Architecture",
    description: "Scalable, maintainable front-end systems with modern best practices."
  },
  {
    icon: "▱",
    title: "Design Systems",
    description: "Building reusable component libraries that ensure consistency and speed."
  },
  {
    icon: "◎",
    title: "Accessibility",
    description: "WCAG-compliant experiences that are inclusive and usable for everyone."
  },
  {
    icon: "◴",
    title: "Performance",
    description: "Optimized for speed, Core Web Vitals, and exceptional user experiences."
  },
  {
    icon: "◢",
    title: "UX Engineering",
    description: "Bridging the gap between design and development seamlessly."
  },
  {
    icon: "⌘",
    title: "AI Development",
    description: "Leveraging AI tools to build smarter, faster, and more efficient solutions."
  }
];

export function CapabilitiesSection() {
  return (
    <section className="section capabilities" aria-labelledby="capabilities-title">
      <div className="container">
        <header className="section-header">
          <p className="eyebrow">What I Do</p>

          <h2 id="capabilities-title">
            Engineering better experiences<br />
            through <span>clean code and thoughtful design.</span>
          </h2>
        </header>

        <div className="capability-grid">
          {capabilities.map((capability) => (
            <article className="capability-card" key={capability.title}>
              <div className="capability-icon" aria-hidden="true">
                {capability.icon}
              </div>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
