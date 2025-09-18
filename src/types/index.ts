// Common types used throughout the portfolio application

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  features: string[];
  category: 'web' | 'mobile' | 'desktop' | 'library' | 'genai' | 'other';
  status: 'completed' | 'in-progress' | 'archived' | 'coming-soon';
  year: number;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  location: string;
  companyUrl?: string;
  logoUrl?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'languages' | 'frameworks';
  proficiency: number; // 1-100
  icon?: string;
  description?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  avatarUrl?: string;
  resumeUrl?: string;
  taglines: string[];
}

// CLI-specific types
export interface CLICommand {
  name: string;
  description: string;
  usage: string;
  aliases?: string[];
  category: 'navigation' | 'info' | 'action' | 'system';
}

export interface CLIFileSystem {
  name: string;
  type: 'file' | 'directory';
  path: string;
  content?: string;
  children?: CLIFileSystem[];
  extension?: string;
}

export interface CLISession {
  currentPath: string;
  history: string[];
  historyIndex: number;
  output: CLIOutput[];
}

export interface CLIOutput {
  id: string;
  type: 'command' | 'output' | 'error' | 'info';
  content: string;
  timestamp: Date;
}

// Theme and UI types
export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    muted: string;
  };
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
}

// Animation types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
  repeat?: boolean | number;
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormErrors {
  [key: string]: string;
}

// Utility types
export type Status = 'idle' | 'loading' | 'success' | 'error';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export type ViewMode = 'gui' | 'cli';

// Environment and performance types
export interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  loadTime: number;
  renderTime: number;
}

export interface DeviceCapabilities {
  webgl: boolean;
  webgl2: boolean;
  touchSupport: boolean;
  devicePixelRatio: number;
  maxTextureSize: number;
}

// API response types
export interface APIResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  timestamp: string;
}

// Event types
export interface CustomEvent<T = any> {
  type: string;
  payload: T;
  timestamp: Date;
}