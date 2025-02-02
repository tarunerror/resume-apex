import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { GraduationCap, Calendar, X, Plus } from 'lucide-react';

interface NewEducation {
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
  gpa?: string;
}

const initialEducation: NewEducation = {
  institution: '',
  degree: '',
  field: '',
  graduationDate: '',
  gpa: '',
};

export const EducationForm: React.FC = () => {
  const { resumeData, addEducation, removeEducation } = useResumeStore();
  const [newEducation, setNewEducation] = useState<NewEducation>(initialEducation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEducation.institution && newEducation.degree) {
      addEducation(newEducation);
      setNewEducation(initialEducation);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Education</h2>
        <button
          onClick={() => document.getElementById('add-education-form')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200"
        >
          <Plus className="h-4 w-4" />
          Add Education
        </button>
      </div>

      {/* Existing Education List */}
      <div className="space-y-4">
        {resumeData.education.map((edu) => (
          <div key={edu.id} className="glass p-4 rounded-lg space-y-2 hover:bg-white/10 transition-all duration-200">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="font-semibold text-white">{edu.degree} in {edu.field}</h3>
                <p className="text-white/80">{edu.institution}</p>
                <p className="text-sm text-white/60">
                  Graduation: {edu.graduationDate}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </p>
              </div>
              <button
                onClick={() => removeEducation(edu.id)}
                className="text-white/60 hover:text-red-400 transition-colors p-1 hover:bg-red-400/10 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Education Form */}
      <form id="add-education-form" onSubmit={handleSubmit} className="glass p-6 rounded-lg space-y-4">
        <h3 className="text-lg font-medium text-white mb-4">Add New Education</h3>

        <div className="relative">
          <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 h-4 w-4" />
          <input
            type="text"
            placeholder="Institution"
            value={newEducation.institution}
            onChange={(e) => setNewEducation(prev => ({ ...prev, institution: e.target.value }))}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 h-4 w-4" />
            <input
              type="text"
              placeholder="Degree (e.g., Bachelor's)"
              value={newEducation.degree}
              onChange={(e) => setNewEducation(prev => ({ ...prev, degree: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 h-4 w-4" />
            <input
              type="text"
              placeholder="Field of Study"
              value={newEducation.field}
              onChange={(e) => setNewEducation(prev => ({ ...prev, field: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 h-4 w-4" />
            <input
              type="date"
              placeholder="Graduation Date"
              value={newEducation.graduationDate}
              onChange={(e) => setNewEducation(prev => ({ ...prev, graduationDate: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="GPA (optional)"
              value={newEducation.gpa}
              onChange={(e) => setNewEducation(prev => ({ ...prev, gpa: e.target.value }))}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 mt-4"
        >
          Add Education
        </button>
      </form>
    </div>
  );
};