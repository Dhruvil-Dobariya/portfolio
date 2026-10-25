export interface Project {
  index: string;
  category: string;
  tagline: string;
  tech: string[];
  highlights: string[];
  icon: "access" | "crm" | "ai" | "inventory";
  impact: string[];
  flow: string[];
}

export const projects: Project[] = [
  {
    index: "01",
    category: "Subscription & Smart Access Platform",
    tagline: "A digital subscription that unlocks a physical gate.",
    tech: [
      "NestJS",
      "React.js",
      "React Native (Expo)",
      "SALTO Smart Access SDK",
      "Bluetooth Low Energy",
      "Payment Gateway",
      "GitHub Actions",
    ],
    highlights: [
      "Owned the full stack — web app, mobile app, and backend — for a membership platform where a digital subscription controls physical entry to a facility.",
      "Integrated a payment gateway with server-side transaction validation and retry handling to guard against duplicate and failed charges.",
      "Integrated a smart-access SDK over Bluetooth Low Energy so gates unlock directly from the mobile app with no internet dependency.",
      "Profiled and tuned high-traffic endpoints, cutting API response times and hardening error handling for production reliability.",
      "Released the mobile app to production on both the Google Play Store and the Apple App Store.",
      "Managed the project’s CI/CD pipelines with GitHub Actions workflows.",
    ],
    icon: "access",
    impact: ["Payment Gateway", "BLE Smart Access", "Full-Stack Ownership", "Play Store & App Store Release"],
    flow: ["Mobile App", "NestJS API", "BLE Gate + Payments"],
  },
  {
    index: "02",
    category: "CRM & Relationship Management Platform",
    tagline: "Relationship health, quantified.",
    tech: ["React.js", "TypeScript", "NestJS", "PostgreSQL", "GraphQL", "React Native (Expo)"],
    highlights: [
      "Built a CRM module tracking supplier and customer relationships through health scores, activity history, and engagement-gap tracking.",
      "Designed the health-scoring mechanism the business uses to flag at-risk accounts and prioritize outreach.",
      "Built the CRM data layer in NestJS, PostgreSQL and GraphQL, exposing typed queries and mutations to both web and mobile clients.",
      "Diagnosed and fixed memory leaks through heap snapshot analysis, improving stability and reducing memory usage.",
      "Shipped a React Native (Expo) app for suppliers and customers with real-time activity tracking and push notifications.",
    ],
    icon: "crm",
    impact: ["Health Scoring", "GraphQL API", "Real-Time Mobile"],
    flow: ["Web + Mobile", "GraphQL API", "PostgreSQL"],
  },
  {
    index: "03",
    category: "AI-Powered Review & Analysis Platform",
    tagline: "Upload a file. Let the model review it.",
    tech: [
      "React.js",
      "NestJS",
      "PostgreSQL",
      "TypeORM",
      "GraphQL",
      "Stripe",
      "OAuth",
      "GitHub Actions",
      "Nginx",
      "PM2",
      "GleSYS Cloud",
    ],
    highlights: [
      "Built the core review pipeline: users upload a file, select an applicable standard, and a trained AI model analyzes it into a full statistical dashboard summary.",
      "Implemented multi-provider authentication — email/password, Google, Microsoft, LinkedIn — with reset and forgot-password flows.",
      "Designed a company-level credit system: Free, Team and Pro plans, admin-allocated per-user caps, monthly resets against non-expiring purchased and referral credits.",
      "Integrated Stripe for plan purchases and credit top-ups, plus a referral system granting bonus credits for invites.",
      "Set up the production server with Nginx and PM2, and deployed the platform to GleSYS Cloud.",
      "Managed the project’s CI/CD pipelines with GitHub Actions workflows.",
    ],
    icon: "ai",
    impact: ["AI Review Pipeline", "Multi-Provider Auth", "Stripe Billing", "Production Deployment"],
    flow: ["Upload UI", "AI Analysis Engine", "Stripe + Credits"],
  },
  {
    index: "04",
    category: "Multi-Warehouse Inventory System",
    tagline: "Stock, tracked from supplier to customer.",
    tech: ["React Native (Expo)", "NestJS", "PostgreSQL", "TypeORM", "GraphQL"],
    highlights: [
      "Built a cross-platform app for companies running multiple independently-tracked warehouses.",
      "Implemented supplier-to-company procurement tracking and warehouse-wise pricing with per-product discounting.",
      "Built end-to-end sales history — supplier to warehouse to company to customer — backed by a dedicated customer management module.",
      "Added barcode-based product scanning and stock/price inquiry requests between warehouses and suppliers.",
    ],
    icon: "inventory",
    impact: ["Multi-Warehouse Sync", "Barcode Scanning", "Cross-Platform App"],
    flow: ["Mobile Scanner", "NestJS API", "Multi-Warehouse DB"],
  },
];
