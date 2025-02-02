import { create } from 'zustand';

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'modern' | 'classic' | 'creative' | 'tech' | 'minimal' | 'executive' | 'academic';
  preview: string;
  keywords: string[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

interface TemplateStore {
  templates: Template[];
  activeTemplateId: string;
  setActiveTemplate: (id: string) => void;
}

const templates: Template[] = [
  {
    id: 'tech-innovator',
    name: 'Tech Innovator',
    description: 'Modern and sleek design optimized for tech roles with emphasis on skills and projects',
    category: 'tech',
    preview: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    keywords: ['Software Engineer', 'Developer', 'Tech Lead', 'DevOps', 'Full Stack'],
    colors: {
      primary: '#2563eb',
      secondary: '#1e40af',
      accent: '#3b82f6'
    }
  },
  {
    id: 'executive-pro',
    name: 'Executive Pro',
    description: 'Professional template for senior management and executive positions',
    category: 'executive',
    preview: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
    keywords: ['CEO', 'Director', 'Manager', 'Executive', 'Leadership'],
    colors: {
      primary: '#334155',
      secondary: '#1e293b',
      accent: '#475569'
    }
  },
  {
    id: 'creative-portfolio',
    name: 'Creative Portfolio',
    description: 'Eye-catching design for creative professionals with portfolio showcase',
    category: 'creative',
    preview: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634',
    keywords: ['Designer', 'Artist', 'Creative Director', 'UX/UI', 'Photographer'],
    colors: {
      primary: '#d946ef',
      secondary: '#a21caf',
      accent: '#e879f9'
    }
  },
  {
    id: 'minimal-edge',
    name: 'Minimal Edge',
    description: 'Clean and minimalist design that lets your content shine',
    category: 'minimal',
    preview: 'https://images.unsplash.com/photo-1507878866276-a947ef722fee',
    keywords: ['Any Role', 'Modern', 'Clean', 'Simple', 'Professional'],
    colors: {
      primary: '#18181b',
      secondary: '#27272a',
      accent: '#71717a'
    }
  },
  {
    id: 'academic-scholar',
    name: 'Academic Scholar',
    description: 'Traditional format ideal for academic and research positions',
    category: 'academic',
    preview: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f',
    keywords: ['Professor', 'Researcher', 'PhD', 'Scientist', 'Academic'],
    colors: {
      primary: '#4338ca',
      secondary: '#3730a3',
      accent: '#4f46e5'
    }
  },
  {
    id: 'classic-elegance',
    name: 'Classic Elegance',
    description: 'Timeless design suitable for traditional industries',
    category: 'classic',
    preview: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf',
    keywords: ['Business', 'Finance', 'Legal', 'Consulting', 'Traditional'],
    colors: {
      primary: '#78350f',
      secondary: '#92400e',
      accent: '#b45309'
    }
  },
  {
    id: 'startup-innovator',
    name: 'Startup Innovator',
    description: 'Dynamic and modern design for startup and innovation roles',
    category: 'modern',
    preview: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    keywords: ['Startup', 'Product Manager', 'Growth', 'Innovation', 'Tech'],
    colors: {
      primary: '#059669',
      secondary: '#047857',
      accent: '#10b981'
    }
  }
];

export const useTemplateStore = create<TemplateStore>((set) => ({
  templates,
  activeTemplateId: 'minimal-edge',
  setActiveTemplate: (id) => set({ activeTemplateId: id }),
}));