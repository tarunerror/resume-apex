import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Code, Plus, X } from 'lucide-react';

export const SkillsForm: React.FC = () => {
  const { resumeData, addSkill, removeSkill } = useResumeStore();
  const [newSkill, setNewSkill] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim()) {
      addSkill(newSkill.trim());
      setNewSkill('');
    }
  };

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-semibold">Skills</h2>

      {/* Skills List */}
      <div className="flex flex-wrap gap-2">
        {resumeData.skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full"
          >
            <span>{skill}</span>
            <button
              onClick={() => removeSkill(skill)}
              className="text-blue-500 hover:text-blue-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add New Skill Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Code className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Add a skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </form>

      {/* Skill Categories */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Popular Skills</h3>
        <div className="flex flex-wrap gap-2">
          {[
            'JavaScript', 'React', 'Node.js', 'Python',
            'TypeScript', 'SQL', 'Git', 'AWS',
            'Docker', 'REST APIs', 'GraphQL', 'Agile'
          ].map((skill) => (
            <button
              key={skill}
              onClick={() => {
                if (!resumeData.skills.includes(skill)) {
                  addSkill(skill);
                }
              }}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm"
              disabled={resumeData.skills.includes(skill)}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};