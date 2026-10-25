export interface SkillGroup {
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { label: "Languages", items: ["JavaScript", "TypeScript", "SQL"] },
  {
    label: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "React Native (Expo)",
      "Redux",
      "Tailwind CSS",
    ],
  },
  {
    label: "Backend",
    items: [
      "NestJS",
      "Node.js",
      "Express.js",
      "REST APIs",
      "GraphQL",
      "TypeORM",
      "Microservices",
    ],
  },
  {
    label: "Databases",
    items: [
      "PostgreSQL",
      "MySQL",
      "Supabase",
      "Schema Design",
      "Indexing",
      "Query Optimization",
    ],
  },
  {
    label: "Integrations",
    items: [
      "RabbitMQ",
      "Socket.io",
      "WebRTC",
      "SALTO Smart Access SDK",
      "Bluetooth Low Energy",
      "OAuth 2.0",
      "Payment Gateway Integration",
    ],
  },
  {
    label: "Security",
    items: [
      "JWT Authentication",
      "Role-Based Access Control",
      "Data Privacy Controls",
    ],
  },
  {
    label: "Deployment & release",
    items: [
      "Docker",
      "GitHub Actions (CI/CD)",
      "Nginx",
      "PM2",
      "GleSYS Cloud",
      "Google Play Console",
      "App Store Connect",
    ],
  },
  {
    label: "Tools",
    items: [
      "Git",
      "GitHub",
      "Bitbucket",
      "Postman",
      "Swagger",
      "Source Tree",
      "Chrome DevTools",
      "Jira",
      "Shortcut",
    ],
  },
  {
    label: "Practices",
    items: [
      "Agile",
      "Scrum",
      "SDLC",
      "Code Review",
      "Unit Testing",
      "Performance Optimization",
    ],
  },
];
