export interface ExperienceRole {
  title: string;
  period: string;
}

export const experience = {
  company: "SaaS Innova Pvt. Ltd.",
  location: "Surat, Gujarat",
  roles: [
    { title: "Software Engineer", period: "Oct 2025 — Present" },
    { title: "Associate Software Engineer", period: "Jul 2024 — Oct 2025" },
  ] satisfies ExperienceRole[],
  summary:
    "Two years across the same engineering org, moving from associate to full engineer while shipping production SaaS platforms across web, backend, and mobile — subscription systems, CRM tooling, AI-driven review software, and multi-warehouse inventory apps.",
};
