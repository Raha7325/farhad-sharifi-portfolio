/**
 * ─────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH — Farhad's professional identity.
 *  Content sourced from cv.pdf. See CONTENT-MAPPING.md for the mapping.
 * ─────────────────────────────────────────────────────────────────────
 */

export type Social = {
  label: string;
  handle: string;
  /** Rendered as a real link only when it starts with "http" / "mailto". */
  href: string;
};

export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export type SkillCategory = {
  name: string;
  items: string[];
};

export type Project = {
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  role: string;
  stack: string[];
  contributions: string[];
  status: string;
  /** Only documented, verifiable outcomes. */
  impact?: string;
  links: {
    live: string;
    source: string;
  };
};

export const profile = {
  name: {
    first: "Farhad",
    last: "Sharifi",
  },

  title: "Software Engineer | Technical Leader",

  /** One line under the hero headline. */
  statement:
    "I turn ambitious ideas into production-ready products — moving between architecture, execution, and leadership.",

  /** Longer introduction used in the About section. */
  about: [
    "Farhad is a business-minded engineer with over 8 years of experience turning ambitious ideas into production-ready products.",
    "He moves between architecture, execution, and leadership — challenging conventions, building teams, and making technology work for business.",
    "From co-founding a large-scale travel platform to leading complete platform re-architectures, he owns the distance between ambitious vision and shipped product.",
  ],

  /** Guiding principles — safe editorial copy, not claims of fact. */
  values: [
    {
      title: "Systems over heroics",
      body: "Great technology organizations are designed, not rescued. Scalable systems and clear workflows outperform last-minute firefighting.",
    },
    {
      title: "Taste is a technical skill",
      body: "Craft, clarity and restraint in execution — in code as much as in design.",
    },
    {
      title: "Clarity compounds",
      body: "A team that understands the mission outperforms a team that micromanages it.",
    },
    {
      title: "Ownership without ego",
      body: "The best outcomes belong to teams; the accountability belongs to leadership.",
    },
  ],

  location: "Tehran, Iran",

  email: "faradidev@gmail.com",

  phone: "+98 919 841 1256",

  socials: {
    linkedin: {
      label: "LinkedIn",
      handle: "in/farhad-sharifi",
      href: "https://www.linkedin.com/in/farhad-sharifi/",
    } satisfies Social,
    github: { label: "GitHub", handle: "@faraadi", href: "https://github.com/faraadi" } satisfies Social,
  },

  experience: [
    {
      role: "Co-founder & Chief Technology Officer",
      company: "SafarAra Travels",
      period: "2025 — Present",
      summary:
        "Co-founded the company and built a large-scale online travel platform from zero — owning the technical vision, architecture, and engineering strategy end to end.",
      highlights: [
        "Designed the platform core: multi-provider, multi-currency flight & hotel search integrating 10+ suppliers across B2C and B2B channels.",
        "Built the operational back-office covering bookings, inventory, pricing, and financial workflows.",
        "Delivered an API-first integration layer that lets B2B partners plug their own systems into SafarAra.",
        "Made AI-driven development — coding agents and custom workflows — part of the engineering lifecycle, compressing implementation and testing time.",
      ],
      stack: ["TypeScript", "NestJS", "Microservices", "AWS", "AI-Driven Development"],
    },
    {
      role: "Technical Team Lead",
      company: "Renotive",
      period: "2024 — 2026",
      summary:
        "Owned the platform end to end: full re-architecture, cloud infrastructure, and the day-to-day engineering practice — through a high-pressure migration.",
      highlights: [
        "Led the complete re-architecture from Directus to a custom NestJS application built from scratch.",
        "Designed and ran the AWS footprint — ECS, EC2, RDS, Docker, and Redis.",
        "Took end-to-end ownership of production: reliability, security, and infrastructure hardening.",
        "Established the engineering workflow: code reviews, development routines, and team collaboration processes.",
      ],
      stack: ["NestJS", "TypeScript", "AWS ECS", "Docker", "Redis", "RDS"],
    },
    {
      role: "Technical Team Lead",
      company: "iToll",
      period: "2023 — 2024",
      summary:
        "Led the engineering team, translating product and business requirements into shipped solutions on Laravel and Nuxt.js.",
      highlights: [
        "Developed complex applications with Laravel and Nuxt.js.",
        "Led the team with technical mentorship, code reviews, and 1:1 sessions.",
        "Advised stakeholders and managers on technical feasibility, product capabilities, and business initiatives.",
      ],
      stack: ["Laravel", "Nuxt.js", "TypeScript"],
    },
    {
      role: "Chief Technology Officer",
      company: "Chabok Real-time Solutions (Atieh Dadeh Pardaz)",
      period: "2022 — 2023",
      summary:
        "Re-architected the company's legacy systems into microservices — cutting infrastructure cost in half while improving scalability and customer satisfaction.",
      highlights: [
        "Migrated legacy codebases to a TypeScript + Nest.js + MongoDB microservice architecture.",
        "Delivered a 50% infrastructure budget reduction and a 30% customer-satisfaction boost.",
        "Advised the CEO and board members on product strategy, plans, and the features roadmap.",
        "Kept legacy and obsolete services running through budgetary limitations.",
      ],
      stack: ["TypeScript", "Nest.js", "MongoDB", "Microservices"],
    },
    {
      role: "Technical Team Lead",
      company: "Chabok Real-time Solutions (Atieh Dadeh Pardaz)",
      period: "2021 — 2022",
      summary:
        "Led the front-end team and built the tooling that made Vue 3 adoption work in production.",
      highlights: [
        "Developed shared libraries and SDKs with TypeScript and Vite.",
        "Built a custom SSR framework that serves Vue 3 apps statically to client browsers.",
        "Led a cross-functional front-end team with technical direction and mentorship.",
      ],
      stack: ["TypeScript", "Vite", "Vue 3"],
    },
    {
      role: "Senior Front-end Developer",
      company: "Yasna Team",
      period: "2020 — 2021",
      summary:
        "Built a custom CMS for e-commerce businesses and led performance work with measurable results.",
      highlights: [
        "Co-developed a custom CMS targeting e-commerce businesses.",
        "Cut build size by 30% through code splitting, lazy loading, and efficient asset management.",
        "Refactored legacy codebases into a 20% smaller codebase.",
      ],
      stack: ["Custom CMS", "Code Splitting", "Lazy Loading", "Asset Optimization"],
    },
    {
      role: "Software Engineer",
      company: "Polygon Studio",
      period: "2018 — 2020",
      summary:
        "Built browser-based 3D and VR products — an online 3D editor, a virtual-tour platform, and Unity-powered asset tooling.",
      highlights: [
        "Developed an online 3D model editor with Three.js and JavaScript.",
        "Built a headless-Unity asset optimizer and bundler — 30% boost in client rendering performance.",
        "Shipped a virtual visit platform that renders almost any 3D model in any browser.",
      ],
      stack: ["JavaScript", "Three.js", "Headless Unity"],
    },
  ] satisfies ExperienceEntry[],

  skills: [
    {
      name: "Languages",
      items: ["TypeScript / JavaScript", "Go", "PHP"],
    },
    {
      name: "Backend",
      items: ["Nest.js", "Express", "Gin", "Laravel", "OpenAPI"],
    },
    {
      name: "Frontend",
      items: ["Vue", "React", "Nuxt", "Next.js", "TailwindCSS"],
    },
    {
      name: "Data & Messaging",
      items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Kafka", "RabbitMQ", "gRPC"],
    },
    {
      name: "Cloud & Infrastructure",
      items: ["AWS", "Docker", "Linux", "CI/CD", "ELK Stack", "Prometheus", "Grafana"],
    },
    {
      name: "Architecture",
      items: ["Microservices", "Modular Monoliths", "Monorepos (Nx, Turborepo)"],
    },
    {
      name: "AI-Driven Engineering",
      items: ["Agentic Workflows", "Context Engineering", "Agent Orchestration"],
    },
  ] satisfies SkillCategory[],

  projects: [
    {
      title: "SafarAra",
      tagline: "Large-scale online travel platform — B2C & B2B.",
      problem:
        "Launching an online travel platform from scratch that could handle high-traffic workloads, complex business workflows, and integrate many flight and hotel suppliers under multi-currency, B2C and B2B models.",
      solution:
        "Scalable, distributed systems with a multi-provider, multi-currency core integrating 10+ suppliers, a full operational back-office, and an API-first integration platform for B2B partners.",
      role: "Co-founder & CTO",
      stack: ["TypeScript", "NestJS", "Microservices", "AWS", "AI-Driven Development"],
      contributions: [
        "Owned the technical vision, architecture, and engineering strategy from day one.",
        "Designed supplier integrations, inventory, bookings, pricing, and financial operations.",
        "Enabled B2B partners to build travel services on top of the platform via an API-first layer.",
      ],
      status: "Live",
      impact: "Integrates 10+ flight and hotel suppliers across B2C and B2B channels.",
      links: { live: "https://safarara.com", source: "" },
    },
    {
      title: "Renotive Platform Re-architecture",
      tagline: "Full platform rebuild on NestJS and AWS.",
      problem:
        "The existing Directus-based platform limited scalability, reliability, and the team's ability to ship fast in a high-pressure environment.",
      solution:
        "A complete re-architecture: a custom NestJS application built from scratch, cloud infrastructure on AWS (ECS, EC2, RDS, Docker, Redis), and hardened production operations.",
      role: "Technical Team Lead",
      stack: ["NestJS", "AWS", "Docker", "Redis", "RDS"],
      contributions: [
        "Led the migration from Directus to a custom NestJS application.",
        "Took end-to-end ownership of production reliability, security, and infrastructure hardening.",
        "Established engineering workflows, code review practices, and team collaboration processes.",
      ],
      status: "In production",
      impact: "Full platform re-architecture delivered while maintaining production reliability.",
      links: { live: "", source: "" },
    },
    {
      title: "Chabok Platform Migration",
      tagline: "Legacy monolith to microservices, 50% infra savings.",
      problem:
        "Legacy and obsolete codebases were driving high infrastructure costs, poor scalability, and low customer satisfaction under tight budgetary limitations.",
      solution:
        "Re-architected the platform into microservices using TypeScript, Nest.js, and MongoDB — cutting infrastructure spend in half while improving scalability and development efficiency.",
      role: "Chief Technology Officer",
      stack: ["TypeScript", "Nest.js", "MongoDB", "Microservices"],
      contributions: [
        "Led the migration from legacy codebases to a microservice-based architecture.",
        "Maintained legacy services in parallel to keep the business running through the transition.",
        "Advised the CEO and board on product strategy throughout the migration.",
      ],
      status: "Completed",
      impact: "50% lower infrastructure spend · 30% higher customer satisfaction.",
      links: { live: "", source: "" },
    },
  ] satisfies Project[],

  education: {
    degree: "Bachelor of Software Engineering",
    school: "Islamic Azad University — Tehran North Branch",
    period: "2015 — 2020",
    languages: ["Persian", "English"],
    highlights: [
      "Works comfortably across borders — led a US-based platform team (Renotive, New York) while based in Tehran.",
      "Runs a deliberate AI-driven engineering practice: agentic workflows, context engineering, and agent orchestration are part of the daily toolchain.",
    ],
  },
} as const;

/** Stable ids used by the nav, the story stage, and the sections themselves. */
export const SECTIONS = [
  { id: "top", label: "Top" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "expertise", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export const NAV_SECTIONS = SECTIONS.filter(
  (s) => s.id !== "top" && !("navHidden" in s && s.navHidden),
).map((s) => ({ id: s.id, label: s.label }));
