import React from 'react';
import { motion } from 'framer-motion';
import { useResumeStore } from '../store/useResumeStore';
import { CheckCircle, Circle } from 'lucide-react';

const sections = [
  { id: 'personal', label: 'Personal Info' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
];

export const ProgressTracker: React.FC = () => {
  const { resumeData } = useResumeStore();
  
  const getProgress = () => {
    let completed = 0;
    
    // Check personal info
    if (resumeData.personalInfo.fullName && 
        resumeData.personalInfo.email && 
        resumeData.personalInfo.phone) {
      completed++;
    }
    
    // Check experience
    if (resumeData.experience.length > 0) {
      completed++;
    }
    
    // Check education
    if (resumeData.education.length > 0) {
      completed++;
    }
    
    // Check skills
    if (resumeData.skills.length > 0) {
      completed++;
    }
    
    return (completed / sections.length) * 100;
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Progress</h3>
        <span className="text-sm font-medium text-blue-600">{Math.round(getProgress())}%</span>
      </div>
      
      <div className="space-y-3">
        {sections.map((section) => {
          const isComplete = section.id === 'personal' 
            ? Boolean(resumeData.personalInfo.fullName && resumeData.personalInfo.email)
            : resumeData[section.id]?.length > 0;

          return (
            <div key={section.id} className="flex items-center gap-2">
              {isComplete ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-green-500"
                >
                  <CheckCircle className="h-5 w-5" />
                </motion.div>
              ) : (
                <Circle className="h-5 w-5 text-gray-300" />
              )}
              <span className={isComplete ? 'text-gray-900' : 'text-gray-500'}>
                {section.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};