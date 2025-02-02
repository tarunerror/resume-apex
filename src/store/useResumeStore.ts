import { create } from 'zustand';
import { ResumeData } from '../types/resume';
import { ResumeAnalysis } from '../services/deepseek';

interface ResumeStore {
  resumeData: ResumeData;
  analysis: ResumeAnalysis | null;
  isAnalyzing: boolean;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  updateSummary: (summary: string) => void;
  addExperience: (experience: Omit<ResumeData['experience'][0], 'id'>) => void;
  updateExperience: (id: string, experience: Partial<ResumeData['experience'][0]>) => void;
  removeExperience: (id: string) => void;
  addEducation: (education: Omit<ResumeData['education'][0], 'id'>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  setAnalysis: (analysis: ResumeAnalysis | null) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
}

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
};

export const useResumeStore = create<ResumeStore>((set) => ({
  resumeData: initialResumeData,
  analysis: null,
  isAnalyzing: false,
  updatePersonalInfo: (info) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        personalInfo: { ...state.resumeData.personalInfo, ...info },
      },
    })),
  updateSummary: (summary) =>
    set((state) => ({
      resumeData: { ...state.resumeData, summary },
    })),
  addExperience: (experience) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: [
          ...state.resumeData.experience,
          { ...experience, id: crypto.randomUUID() },
        ],
      },
    })),
  updateExperience: (id, experience) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: state.resumeData.experience.map((exp) =>
          exp.id === id ? { ...exp, ...experience } : exp
        ),
      },
    })),
  removeExperience: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: state.resumeData.experience.filter((exp) => exp.id !== id),
      },
    })),
  addEducation: (education) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: [
          ...state.resumeData.education,
          { ...education, id: crypto.randomUUID() },
        ],
      },
    })),
  removeEducation: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.filter((edu) => edu.id !== id),
      },
    })),
  addSkill: (skill) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: [...new Set([...state.resumeData.skills, skill])],
      },
    })),
  removeSkill: (skill) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: state.resumeData.skills.filter((s) => s !== skill),
      },
    })),
  setAnalysis: (analysis) => set({ analysis }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
}));