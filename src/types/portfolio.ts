export type ProjectCategory = 'Data Analytics' | 'Software' | 'AI / ML' | 'Cloud & DevOps' | 'Automation';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  description: string;
  longDescription: string;
  problemSolved?: string;
  keyTechnicalWork?: string[];
  architectureHighlights: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  image: string;
  githubUrl: string;
  demoUrl?: string;
  adminDemoUrl?: string;
  userDemoUrl?: string;
  extraLinks?: { label: string; url: string; badge?: string }[];
  featured: boolean;
  visualType?: 'data-dashboard' | 'fullstack-app' | 'devops-arch' | 'ai-simulation' | 'automation-flow' | 'iot-embedded' | string;
  pipeline?: {
    step: string;
    description: string;
  }[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    highlight: string;
  }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  description: string;
  bullets: string[];
  skills: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
}

export interface RoleResume {
  id: string;
  roleTitle: string;
  subtitle: string;
  skillsFocus: string[];
  summary: string;
  keyProjects: string[];
  highlights: string[];
}
