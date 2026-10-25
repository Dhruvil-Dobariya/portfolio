export interface ExperienceRole {
  title: string;
  period: string;
  description: string;
  focus?: string[];
}

export const experience = {
  company: "SaaS Innova Pvt. Ltd.",
  monogram: "si.",
  location: "Surat, Gujarat",
  roles: [
    {
      title: "Software Engineer",
      period: "Oct 2025 — Present",
      description:
        "End-to-end feature ownership across production SaaS platforms: web interfaces, backend services, and cross-platform mobile apps.",
      focus: ["Full-stack delivery", "Production debugging", "Performance"],
    },
    {
      title: "Associate Software Engineer",
      period: "Jul 2024 — Oct 2025",
      description:
        "Built a full-stack foundation across business logic, API development, relational data, and the interfaces that connect them.",
    },
  ] satisfies ExperienceRole[],
  summary:
    "Two years across the same engineering org, moving from associate to full engineer while shipping production SaaS platforms across web, backend, and mobile — subscription systems, CRM tooling, AI-driven review software, and multi-warehouse inventory apps.",
};
