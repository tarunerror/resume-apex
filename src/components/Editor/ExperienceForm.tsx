import React, { useState, useRef } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Briefcase, Calendar, Plus, X } from 'lucide-react';
import { QuillEditor } from './QuillEditor';
import ReactQuill from 'react-quill';

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

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Experience</h2>
        <button
          onClick={() => document.getElementById('add-experience-form')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus className="h-4 w-4" />
          Add Experience
        </button>
      </div>

      {/* Existing Experience List */}
      {resumeData.experience.map((exp) => (
        <div key={exp.id} className="p-4 bg-gray-50 rounded-lg space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{exp.position}</h3>
              <p className="text-gray-600">{exp.company}</p>
              <p className="text-sm text-gray-500">
                {exp.startDate} - {exp.endDate}
              </p>
            </div>
            <button
              onClick={() => removeExperience(exp.id)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}

      {/* Add New Experience Form */}
      <form id="add-experience-form" onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium mb-4">Add New Experience</h3>
        
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Company"
            value={newExperience.company}
            onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Position"
            value={newExperience.position}
            onChange={(e) => setNewExperience(prev => ({ ...prev, position: e.target.value }))}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="date"
              placeholder="Start Date"
              value={newExperience.startDate}
              onChange={(e) => setNewExperience(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="date"
              placeholder="End Date"
              value={newExperience.endDate}
              onChange={(e) => setNewExperience(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <QuillEditor
            ref={quillRef}
            value={newExperience.description}
            onChange={(value) => setNewExperience(prev => ({ ...prev, description: value }))}
            className="bg-white"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Achievements</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add an achievement"
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={addAchievement}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <ul className="space-y-2">
            {newExperience.achievements.map((achievement, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                <span>{achievement}</span>
                <button
                  type="button"
                  onClick={() => removeAchievement(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Experience
        </button>
      </form>
    </div>
  );
};