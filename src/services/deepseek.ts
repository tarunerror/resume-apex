import { ResumeData } from '../types/resume';

const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
const API_URL = 'https://api.deepseek.com/v1';

export interface ResumeAnalysis {
  score: number;
  suggestions: {
    section: 'summary' | 'experience' | 'education' | 'skills';
    message: string;
    priority: 'high' | 'medium' | 'low';
  }[];
  keywordMatches: {
    found: string[];
    missing: string[];
  };
  atsScore: {
    total: number;
    formatting: number;
    content: number;
    keywords: number;
  };
}

const generateBasicAnalysis = (resumeData: ResumeData): ResumeAnalysis => {
  const suggestions = [];
  let score = 100;
  let formattingScore = 100;
  let contentScore = 100;
  let keywordsScore = 100;

  // Check personal info completeness
  if (!resumeData.personalInfo.fullName || !resumeData.personalInfo.email || !resumeData.personalInfo.phone) {
    suggestions.push({
      section: 'summary',
      message: 'Complete all required personal information fields',
      priority: 'high',
    });
    score -= 20;
    formattingScore -= 30;
  }

  // Analyze experience entries
  if (resumeData.experience.length === 0) {
    suggestions.push({
      section: 'experience',
      message: 'Add at least one work experience entry',
      priority: 'high',
    });
    score -= 25;
    contentScore -= 40;
  } else {
    resumeData.experience.forEach(exp => {
      if (!exp.description || exp.description.length < 50) {
        suggestions.push({
          section: 'experience',
          message: `Enhance description for ${exp.position} role with more details`,
          priority: 'medium',
        });
        contentScore -= 10;
      }
      if (exp.achievements.length < 2) {
        suggestions.push({
          section: 'experience',
          message: `Add more measurable achievements for ${exp.position} role`,
          priority: 'medium',
        });
        contentScore -= 10;
      }
    });
  }

  // Analyze education
  if (resumeData.education.length === 0) {
    suggestions.push({
      section: 'education',
      message: 'Add your educational background',
      priority: 'high',
    });
    score -= 20;
    contentScore -= 30;
  }

  // Analyze skills and keywords
  const commonKeywords = new Set([
    'leadership', 'management', 'development', 'analysis', 'design',
    'project', 'team', 'communication', 'strategy', 'planning',
    'javascript', 'python', 'java', 'react', 'node', 'sql',
    'agile', 'scrum', 'testing', 'deployment', 'cloud'
  ]);

  const foundKeywords = new Set<string>();
  const missingKeywords = new Set<string>();

  // Check skills section
  commonKeywords.forEach(keyword => {
    if (resumeData.skills.some(skill => 
      skill.toLowerCase().includes(keyword.toLowerCase())
    )) {
      foundKeywords.add(keyword);
    } else {
      // Check if keyword appears in experience descriptions
      const foundInExp = resumeData.experience.some(exp =>
        exp.description.toLowerCase().includes(keyword.toLowerCase()) ||
        exp.achievements.some(ach => ach.toLowerCase().includes(keyword.toLowerCase()))
      );
      if (foundInExp) {
        foundKeywords.add(keyword);
      } else {
        missingKeywords.add(keyword);
      }
    }
  });

  if (resumeData.skills.length < 5) {
    suggestions.push({
      section: 'skills',
      message: 'Add more relevant skills (aim for at least 5)',
      priority: 'medium',
    });
    score -= 15;
    keywordsScore -= 30;
  }

  // Calculate final scores
  keywordsScore = Math.max(0, keywordsScore - (missingKeywords.size * 5));
  const finalScore = Math.max(0, Math.floor((formattingScore + contentScore + keywordsScore) / 3));

  return {
    score: finalScore,
    suggestions,
    keywordMatches: {
      found: Array.from(foundKeywords),
      missing: Array.from(missingKeywords),
    },
    atsScore: {
      total: finalScore,
      formatting: formattingScore,
      content: contentScore,
      keywords: keywordsScore,
    },
  };
};

export const analyzeResume = async (resumeData: ResumeData): Promise<ResumeAnalysis> => {
  try {
    if (!DEEPSEEK_API_KEY) {
      console.warn('DeepSeek API key not found, using basic analysis');
      return generateBasicAnalysis(resumeData);
    }

    const response = await fetch(`${API_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify(resumeData),
    });

    if (!response.ok) {
      console.warn('DeepSeek API request failed, using basic analysis');
      return generateBasicAnalysis(resumeData);
    }

    return await response.json();
  } catch (error) {
    console.warn('Error analyzing resume, using basic analysis:', error);
    return generateBasicAnalysis(resumeData);
  }
};

export const optimizeContent = async (
  content: string,
  type: 'summary' | 'experience' | 'achievement',
  context?: {
    jobTitle?: string;
    industry?: string;
    keywords?: string[];
  }
): Promise<string> => {
  try {
    if (!DEEPSEEK_API_KEY) {
      console.warn('DeepSeek API key not found, returning original content');
      return content;
    }

    const response = await fetch(`${API_URL}/optimize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({ 
        content, 
        type,
        context: {
          ...context,
          targetLength: type === 'summary' ? 200 : 100,
          style: 'professional',
          focus: type === 'achievement' ? 'metrics' : 'skills',
        }
      }),
    });

    if (!response.ok) {
      console.warn('DeepSeek API request failed, returning original content');
      return content;
    }

    const data = await response.json();
    return data.optimizedContent;
  } catch (error) {
    console.warn('Error optimizing content, returning original:', error);
    return content;
  }
};

export const generateBulletPoints = async (
  description: string,
  jobTitle: string
): Promise<string[]> => {
  try {
    if (!DEEPSEEK_API_KEY) {
      return description.split('\n').filter(line => line.trim());
    }

    const response = await fetch(`${API_URL}/generate-bullets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({ 
        description,
        jobTitle,
        options: {
          maxBullets: 5,
          focusOn: ['achievements', 'skills', 'impact'],
          includeMetrics: true,
        }
      }),
    });

    if (!response.ok) {
      return description.split('\n').filter(line => line.trim());
    }

    const data = await response.json();
    return data.bullets;
  } catch (error) {
    console.warn('Error generating bullet points:', error);
    return description.split('\n').filter(line => line.trim());
  }
};