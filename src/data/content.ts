import {
  Boxes,
  Braces,
  Code2,
  Coins,
  CreditCard,
  Database,
  DoorOpen,
  FileText,
  GitBranch,
  Globe2,
  HeartPulse,
  LayoutDashboard,
  ScanLine,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Tags,
  Terminal,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export interface StackLayer {
  index: string;
  name: string;
  title: string;
  text: string;
  tech: string[];
  icon: LucideIcon;
}

export const stackLayers: StackLayer[] = [
  {
    index: "01",
    name: "Interface",
    title: "Built for people.",
    text: "React on the web. React Native in your hand.",
    tech: ["React", "Next.js", "React Native"],
    icon: Globe2,
  },
  {
    index: "02",
    name: "Services",
    title: "Connected by design.",
    text: "Typed APIs, secure access, and reliable business logic.",
    tech: ["NestJS", "GraphQL", "REST"],
    icon: Braces,
  },
  {
    index: "03",
    name: "Foundation",
    title: "Strong foundations.",
    text: "Relational schemas and queries built with care.",
    tech: ["PostgreSQL", "TypeORM", "MySQL"],
    icon: Database,
  },
];

export interface SketchNode {
  icon: LucideIcon;
  label: string;
}

export interface CaseStory {
  label: string;
  title: string;
  summary: string;
  tags: string[];
  problem: string;
  result: string;
  sketch: SketchNode[];
  callout: SketchNode;
  footnote?: string;
}

// Indexed in the same order as `projects` in ./projects.ts.
export const caseStories: CaseStory[] = [
  {
    label: "Smart access · Web + mobile",
    title: "Digital membership. Physical possibility.",
    summary:
      "A subscription platform that connects payments, membership, and a tap at the gate. Owned across web, mobile, and backend.",
    tags: ["NestJS", "React Native", "BLE", "Payments"],
    problem:
      "A digital membership needs to grant dependable physical access, even when the mobile device is offline.",
    result:
      "Subscription, payment, and entry workflows connected in one product, with local Bluetooth access and validated transactions.",
    sketch: [
      { icon: Smartphone, label: "Mobile app" },
      { icon: Server, label: "NestJS API" },
      { icon: DoorOpen, label: "Gate · BLE" },
    ],
    callout: { icon: CreditCard, label: "Payments validated server-side" },
    footnote:
      "The mobile app talks to the gate directly over Bluetooth; payments and entitlement checks run through backend services.",
  },
  {
    label: "Relationship intelligence · Full stack",
    title: "A clearer picture. A stronger connection.",
    summary:
      "A CRM that makes relationship health actionable. Typed data across web and mobile, with the stability production demands.",
    tags: ["React", "GraphQL", "PostgreSQL", "Expo"],
    problem:
      "Supplier and customer activity needs to become a useful signal for the people managing those relationships.",
    result:
      "Health scoring and engagement history support outreach decisions; web and mobile clients share a typed data layer.",
    sketch: [
      { icon: Globe2, label: "Web + mobile" },
      { icon: Braces, label: "GraphQL" },
      { icon: Database, label: "PostgreSQL" },
    ],
    callout: { icon: HeartPulse, label: "Relationship health scoring" },
  },
  {
    label: "AI review · SaaS platform",
    title: "From a file to an informed decision.",
    summary:
      "An AI review pipeline backed by company credits, multi-provider authentication, and Stripe billing.",
    tags: ["NestJS", "TypeORM", "Stripe"],
    problem:
      "An AI review workflow needs the account, billing, and credit infrastructure to operate as a SaaS product.",
    result:
      "File analysis, statistical summaries, plan purchases, and company-level credit allocation in a connected workflow.",
    sketch: [
      { icon: FileText, label: "Upload" },
      { icon: Sparkles, label: "AI analysis" },
      { icon: LayoutDashboard, label: "Dashboard" },
    ],
    callout: { icon: Coins, label: "Credits + Stripe billing" },
  },
  {
    label: "Inventory · Cross-platform mobile",
    title: "Every warehouse. One connected flow.",
    summary:
      "Barcode scanning, warehouse-specific pricing, and a traceable path from supplier to customer.",
    tags: ["React Native", "GraphQL", "PostgreSQL"],
    problem:
      "Multiple warehouses need independently tracked stock and prices, with procurement and sales history that stays connected.",
    result:
      "A cross-platform workflow for scanning products, tracking procurement, and managing warehouse-level inventory and sales.",
    sketch: [
      { icon: ScanLine, label: "Scan" },
      { icon: Boxes, label: "Warehouse" },
      { icon: Users, label: "Customer" },
    ],
    callout: { icon: Tags, label: "Per-warehouse pricing" },
  },
];

export interface Principle {
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
  nodes: string[];
}

export const principles: Principle[] = [
  {
    label: "Experience",
    title: "Start with the person.",
    description:
      "A complex system should feel simple to use. I connect thoughtful web interfaces and mobile experiences to the services behind them.",
    icon: Globe2,
    nodes: ["React", "React Native"],
  },
  {
    label: "Architecture",
    title: "Make the connections count.",
    description:
      "Shape the schema, define the API, and make the business rules explicit. Authentication, payments, and real-time events belong to the same picture.",
    icon: GitBranch,
    nodes: ["NestJS", "GraphQL"],
  },
  {
    label: "Production",
    title: "Expect the real world.",
    description:
      "Validate transactions. Handle retries. Trace the issue from the screen to the database. Reliability lives in the paths that don’t go as planned.",
    icon: ShieldCheck,
    nodes: ["Validation", "Authorization"],
  },
  {
    label: "Refinement",
    title: "Follow through.",
    description:
      "Profile the endpoint, inspect the heap, and rethink the expensive query. Shipping is a milestone; understanding production behavior is part of the work.",
    icon: Workflow,
    nodes: ["Profiling", "Query optimization"],
  },
];

export const processSteps = [
  "Understand",
  "Design",
  "Build",
  "Test",
  "Optimize",
  "Ship",
];

export interface Capability {
  name: string;
  label: string;
  copy: string;
  description: string;
  groups: string[];
  icon: LucideIcon;
}

// `groups` refer to labels in ./skills.ts.
export const capabilities: Capability[] = [
  {
    name: "Interface",
    label: "The human layer",
    copy: "Fast, considered experiences across screens.",
    description:
      "Component systems, typed state, and responsive interfaces — on the web and in your hand.",
    groups: ["Languages", "Frontend"],
    icon: Code2,
  },
  {
    name: "Backend & data",
    label: "The structural layer",
    copy: "A dependable foundation for the product.",
    description:
      "APIs, business logic, and relational data that fit together. Clear boundaries and queries designed with care.",
    groups: ["Backend", "Databases"],
    icon: Database,
  },
  {
    name: "Connections",
    label: "The connected layer",
    copy: "Where software meets the wider world.",
    description:
      "From secure identity and payments to live communication and physical access. Integrations that belong to the product.",
    groups: ["Integrations", "Security"],
    icon: GitBranch,
  },
  {
    name: "Workflow",
    label: "The delivery layer",
    copy: "Good software takes a good process.",
    description:
      "Ship, review, test, trace, and improve — from CI/CD pipelines and server setup to app-store releases, and the details that matter once it’s in production.",
    groups: ["Deployment & release", "Tools", "Practices"],
    icon: Terminal,
  },
];

export const navigation = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "toolkit", label: "Toolkit" },
];

export const heroWords = [
  "web apps",
  "mobile apps",
  "APIs",
  "data models",
  "integrations",
];

export const marqueeRows = [
  [
    "React",
    "Next.js",
    "React Native",
    "TypeScript",
    "Redux",
    "Tailwind CSS",
    "Expo",
  ],
  [
    "NestJS",
    "Node.js",
    "GraphQL",
    "PostgreSQL",
    "Supabase",
    "TypeORM",
    "Docker",
    "GitHub Actions",
    "Nginx",
    "RabbitMQ",
    "Socket.io",
    "WebRTC",
    "Stripe",
    "Postman",
    "Swagger",
  ],
];
