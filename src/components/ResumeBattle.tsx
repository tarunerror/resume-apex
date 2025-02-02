import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';
import { useResumeStore } from '../store/useResumeStore';
import { ResumePreview } from './Preview/ResumePreview';
import { analyzeResume } from '../services/deepseek';
import ReactCanvasConfetti from 'react-canvas-confetti';

export const ResumeBattle: React.FC = () => {
  const [showComparison, setShowComparison] = useState(false);
  const { resumeData } = useResumeStore();
  const [selectedVersion, setSelectedVersion] = useState<'A' | 'B'>('A');
  const [analysis, setAnalysis] = useState<{ A: number; B: number }>({ A: 0, B: 0 });
  const [winner, setWinner] = useState<'A' | 'B' | null>(null);

  // Mock data for version B (in real app, this would come from storage)
  const versionB = {
    ...resumeData,
    experience: resumeData.experience.map(exp => ({
      ...exp,
      description: `Alternative version: ${exp.description}`,
    })),
  };

  const handleCompare = async () => {
    const scoreA = (await analyzeResume(resumeData)).score;
    const scoreB = (await analyzeResume(versionB)).score;
    setAnalysis({ A: scoreA, B: scoreB });
    setWinner(scoreA > scoreB ? 'A' : 'B');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-gradient-to-br from-violet-900/90 to-purple-900/90 backdrop-blur-xl rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden border border-white/10"
      >
        <ReactCanvasConfetti
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0
          }}
          fire={winner !== null}
          colors={['#8B5CF6', '#EC4899', '#6366F1']}
        />

        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Resume Battle Arena
            <Sparkles className="h-5 w-5 text-violet-400 animate-pulse" />
          </h2>
          <p className="text-violet-200/80">Compare different versions of your resume with AI feedback</p>
        </div>

        <div className="flex h-[calc(90vh-12rem)]">
          {['A', 'B'].map((version) => (
            <div key={version} className="flex-1 border-white/10 overflow-y-auto p-6">
              <div className="sticky top-0 bg-gradient-to-b from-violet-900/90 to-violet-900/50 backdrop-blur-xl pb-4 mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">Version {version}</h3>
                  <div className="flex items-center gap-2">
                    {analysis[version as 'A' | 'B'] > 0 && (
                      <span className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm">
                        Score: {analysis[version as 'A' | 'B']}
                      </span>
                    )}
                    {winner === version && (
                      <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        Winner
                      </span>
                    )}
                    <button
                      onClick={() => setSelectedVersion(version as 'A' | 'B')}
                      className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                        selectedVersion === version
                          ? 'bg-violet-500 text-white'
                          : 'bg-violet-500/20 text-violet-300 hover:bg-violet-500/30'
                      }`}
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                  winner === version ? 'opacity-0' : 'opacity-100'
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-900/90 to-transparent" />
                </div>
                <ResumePreview data={version === 'A' ? resumeData : versionB} />
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-white/10 bg-violet-900/50">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowComparison(false)}
              className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              Close
            </button>
            <div className="flex items-center gap-4">
              <button
                onClick={handleCompare}
                className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-all duration-300 flex items-center gap-2"
              >
                <ArrowLeftRight className="h-4 w-4" />
                Compare Versions
              </button>
              <button
                onClick={() => {/* Handle version selection */}}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
              >
                Use Selected Version
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};