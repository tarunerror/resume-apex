import React, { useState, useRef } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Briefcase, Calendar, Plus, X, Wand2, Sparkles } from 'lucide-react';
import { QuillEditor } from './QuillEditor';
import ReactQuill from 'react-quill';
import { generateBulletPoints, optimizeContent } from '../../services/deepseek';

interface NewExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
}

const initialExperience: NewExperience = {
  company: '',
  position: '',
  startDate: '',
  endDate: '',
  description: '',
  achievements: [],
};

export const ExperienceForm: React.FC = () => {
  const { resumeData, addExperience, removeExperience } = useResumeStore();
  const [newExperience, setNewExperience] = useState<NewExperience>(initialExperience);
  const [newAchievement, setNewAchievement] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isGeneratingBullets, setIsGeneratingBullets] = useState(false);
  const quillRef = useRef<ReactQuill>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExperience.company && newExperience.position) {
      addExperience(newExperience);
      setNewExperience(initialExperience);
      setNewAchievement('');
    }
  };

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setNewExperience(prev => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement.trim()]
      }));
      setNewAchievement('');
    }
  };

  const removeAchievement = (index: number) => {
    setNewExperience(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const handleOptimizeDescription = async () => {
    if (!newExperience.description.trim()) return;
    
    setIsOptimizing(true);
    try {
      const optimizedContent = await optimizeContent(
        newExperience.description,
        'experience',
        { jobTitle: newExperience.position }
      );
      setNewExperience(prev => ({ ...prev, description: optimizedContent }));
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleGenerateBullets = async () => {
    if (!newExperience.description.trim()) return;
    
    setIsGeneratingBullets(true);
    try {
      const bullets = await generateBulletPoints(
        newExperience.description,
        newExperience.position
      );
      setNewExperience(prev => ({
        ...prev,
        achievements: [...prev.achievements, ...bullets]
      }));
    } finally {
      setIsGeneratingBullets(false);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Experience</h2>
        <button
          onClick={() => document.getElementById('add-experience-form')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200"
        >
          <Plus className="h-4 w-4" />
          Add Experience
        </button>
      </div>

      {/* Existing Experience List */}
      <div className="space-y-4">
        {resumeData.experience.map((exp) => (
          <div key={exp.id} className="glass p-4 rounded-lg space-y-2 hover:bg-white/10 transition-all duration-200">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="font-semibold text-white">{exp.position}</h3>
                <p className="text-white/80">{exp.company}</p>
                <p className="text-sm text-white/60">
                  {exp.startDate} - {exp.endDate}
                </p>
                <div className="mt-2 text-white/80 prose prose-invert prose-sm" dangerouslySetInnerHTML={{ __html: exp.description }} />
                {exp.achievements.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index} className="text-white/70 text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button
                onClick={() => removeExperience(exp.id)}
                className="text-white/60 hover:text-red-400 transition-colors p-1 hover:bg-red-400/10 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Experience Form */}
      <form id="add-experience-form" onSubmit={handleSubmit} className="glass p-6 rounded-lg space-y-4">
        <h3 className="text-lg font-medium text-white mb-4">Add New Experience</h3>
        
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 h-4 w-4" />
          <input
            type="text"
            placeholder="Company"
            value={newExperience.company}
            onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
          />
        </div>

        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 h-4 w-4" />
          <input
            type="text"
            placeholder="Position"
            value={newExperience.position}
            onChange={(e) => setNewExperience(prev => ({ ...prev, position: e.target.value }))}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 h-4 w-4" />
            <input
              type="date"
              placeholder="Start Date"
              value={newExperience.startDate}
              onChange={(e) => setNewExperience(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 h-4 w-4" />
            <input
              type="date"
              placeholder="End Date"
              value={newExperience.endDate}
              onChange={(e) => setNewExperience(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-white/80">Description</label>
            <button
              type="button"
              onClick={handleOptimizeDescription}
              disabled={!newExperience.description.trim() || isOptimizing}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-violet-500/20 text-violet-300 rounded-md hover:bg-violet-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Wand2 className="h-4 w-4" />
              {isOptimizing ? 'Optimizing...' : 'Optimize'}
            </button>
          </div>
          <QuillEditor
            ref={quillRef}
            value={newExperience.description}
            onChange={(value) => setNewExperience(prev => ({ ...prev, description: value }))}
            className="bg-white/5 rounded-lg border border-white/10"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-white/80">Achievements</label>
            <button
              type="button"
              onClick={handleGenerateBullets}
              disabled={!newExperience.description.trim() || isGeneratingBullets}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-violet-500/20 text-violet-300 rounded-md hover:bg-violet-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Sparkles className="h-4 w-4" />
              {isGeneratingBullets ? 'Generating...' : 'Generate Bullets'}
            </button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add an achievement"
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
            <button
              type="button"
              onClick={addAchievement}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <ul className="space-y-2">
            {newExperience.achievements.map((achievement, index) => (
              <li key={index} className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/10">
                <span className="text-white/80">{achievement}</span>
                <button
                  type="button"
                  onClick={() => removeAchievement(index)}
                  className="text-white/60 hover:text-red-400 transition-colors p-1 hover:bg-red-400/10 rounded-full"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 mt-4"
        >
          Add Experience
        </button>
      </form>
    </div>
  );
};