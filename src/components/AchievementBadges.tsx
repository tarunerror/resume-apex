import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, Target, Zap } from 'lucide-react';
import { useResumeStore } from '../store/useResumeStore';

export const AchievementBadges: React.FC = () => {
  const { resumeData, analysis } = useResumeStore();

  const badges = [
    {
      id: 'profile-complete',
      icon: CheckCircle2,
      label: 'Profile Master',
      description: 'Completed all sections',
      earned: Boolean(
        resumeData.personalInfo.fullName &&
        resumeData.experience.length > 0 &&
        resumeData.education.length > 0 &&
        resumeData.skills.length > 0
      ),
    },
    {
      id: 'ats-optimized',
      icon: Target,
      label: 'ATS Master',
      description: 'Resume optimized for ATS',
      earned: analysis?.score >= 80,
    },
    {
      id: 'experience-pro',
      icon: Award,
      label: 'Experience Pro',
      description: '3+ detailed experiences',
      earned: resumeData.experience.length >= 3,
    },
    {
      id: 'skill-expert',
      icon: Zap,
      label: 'Skill Expert',
      description: '10+ relevant skills',
      earned: resumeData.skills.length >= 10,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {badges.map((badge) => {
        const Icon = badge.icon;
        return (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-4 rounded-lg border ${
              badge.earned
                ? 'border-blue-200 bg-blue-50'
                : 'border-gray-200 bg-gray-50 opacity-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-full ${
                  badge.earned ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium text-sm">{badge.label}</h4>
                <p className="text-xs text-gray-500">{badge.description}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};