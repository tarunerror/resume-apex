import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useResumeStore } from '../store/useResumeStore';
import { ResumePreview } from './Preview/ResumePreview';

export const ResumeBattle: React.FC = () => {
  const [showComparison, setShowComparison] = useState(false);
  const { resumeData } = useResumeStore();
  const [selectedVersion, setSelectedVersion] = useState<'A' | 'B'>('A');

  // Mock data for version B (in real app, this would come from storage)
  const versionB = {
    ...resumeData,
    experience: resumeData.experience.map(exp => ({
      ...exp,
      description: `Alternative version: ${exp.description}`,
    })),
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Resume Battle Arena</h2>
          <p className="text-sm text-gray-500">Compare different versions of your resume</p>
        </div>

        <div className="flex h-[calc(90vh-4rem)]">
          <div className="flex-1 border-r border-gray-200 overflow-y-auto p-4">
            <div className="sticky top-0 bg-white pb-4">
              <h3 className="text-lg font-medium mb-2">Version A</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedVersion('A')}
                  className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm"
                >
                  <ThumbsUp className="h-4 w-4" />
                  Select
                </button>
              </div>
            </div>
            <ResumePreview data={resumeData} />
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="sticky top-0 bg-white pb-4">
              <h3 className="text-lg font-medium mb-2">Version B</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedVersion('B')}
                  className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm"
                >
                  <ThumbsUp className="h-4 w-4" />
                  Select
                </button>
              </div>
            </div>
            <ResumePreview data={versionB} />
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowComparison(false)}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
            >
              Close
            </button>
            <button
              onClick={() => {/* Handle version selection */}}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Use Selected Version
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};