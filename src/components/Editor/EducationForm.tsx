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
        <h2 className="text-xl font-semibold">Education</h2>
        <button
          onClick={() => document.getElementById('add-education-form')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus className="h-4 w-4" />
          Add Education
        </button>
      </div>

      {/* Existing Education List */}
      {resumeData.education.map((edu) => (
        <div key={edu.id} className="p-4 bg-gray-50 rounded-lg space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{edu.degree} in {edu.field}</h3>
              <p className="text-gray-600">{edu.institution}</p>
              <p className="text-sm text-gray-500">
                Graduation: {edu.graduationDate}
                {edu.gpa && ` • GPA: ${edu.gpa}`}
              </p>
            </div>
            <button
              onClick={() => removeEducation(edu.id)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}

      {/* Add New Education Form */}
      <form id="add-education-form" onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium mb-4">Add New Education</h3>

        <div className="relative">
          <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Institution"
            value={newEducation.institution}
            onChange={(e) => setNewEducation(prev => ({ ...prev, institution: e.target.value }))}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Degree (e.g., Bachelor's)"
              value={newEducation.degree}
              onChange={(e) => setNewEducation(prev => ({ ...prev, degree: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Field of Study"
              value={newEducation.field}
              onChange={(e) => setNewEducation(prev => ({ ...prev, field: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="date"
              placeholder="Graduation Date"
              value={newEducation.graduationDate}
              onChange={(e) => setNewEducation(prev => ({ ...prev, graduationDate: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="GPA (optional)"
              value={newEducation.gpa}
              onChange={(e) => setNewEducation(prev => ({ ...prev, gpa: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Education
        </button>
      </form>
    </div>
  );
};