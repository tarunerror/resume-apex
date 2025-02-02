import React from 'react';
import clsx from 'clsx';
import { ResumeAnalysis } from '../../services/deepseek';
import { AlertTriangle, CheckCircle, XCircle, Zap, Target, FileText } from 'lucide-react';

interface StrengthMeterProps {
  analysis: ResumeAnalysis | null;
  isLoading: boolean;
}

export const StrengthMeter: React.FC<StrengthMeterProps> = ({ analysis, isLoading }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-400/10';
    if (score >= 60) return 'bg-yellow-400/10';
    return 'bg-red-400/10';
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4 p-4 rounded-lg bg-neutral-800/50">
        <div className="h-8 bg-neutral-700 rounded w-1/3"></div>
        <div className="h-4 bg-neutral-700 rounded w-full"></div>
        <div className="h-4 bg-neutral-700 rounded w-2/3"></div>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <div className="space-y-6 p-4 rounded-lg bg-neutral-800/50">
      {/* Overall Score */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-200">Resume Strength</h3>
        <div className={clsx(
          'text-2xl font-bold px-4 py-2 rounded-full',
          getScoreColor(analysis.score),
          getScoreBackground(analysis.score)
        )}>
          {analysis.score}/100
        </div>
      </div>

      {/* ATS Score Breakdown */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Formatting', score: analysis.atsScore.formatting, icon: FileText },
          { label: 'Content', score: analysis.atsScore.content, icon: Target },
          { label: 'Keywords', score: analysis.atsScore.keywords, icon: Zap },
        ].map(({ label, score, icon: Icon }) => (
          <div key={label} className="p-3 rounded-lg bg-neutral-700/50">
            <div className="flex items-center gap-2 mb-2">
              <Icon className="h-4 w-4 text-neutral-400" />
              <span className="text-sm text-neutral-400">{label}</span>
            </div>
            <div className={clsx('text-lg font-semibold', getScoreColor(score))}>
              {score}%
            </div>
          </div>
        ))}
      </div>

      {/* Keyword Analysis */}
      <div className="space-y-3">
        <h4 className="font-medium text-neutral-300">Keyword Analysis</h4>
        <div className="flex flex-wrap gap-2">
          {analysis.keywordMatches.found.map((keyword) => (
            <span
              key={keyword}
              className="px-2 py-1 text-xs rounded-full bg-green-400/10 text-green-400"
            >
              {keyword}
            </span>
          ))}
          {analysis.keywordMatches.missing.map((keyword) => (
            <span
              key={keyword}
              className="px-2 py-1 text-xs rounded-full bg-neutral-700 text-neutral-400"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* Suggestions */}
      <div className="space-y-3">
        <h4 className="font-medium text-neutral-300">Improvement Suggestions</h4>
        {analysis.suggestions.map((suggestion, index) => (
          <div
            key={index}
            className={clsx(
              'flex items-start gap-2 p-3 rounded-lg',
              suggestion.priority === 'high' ? 'bg-red-400/10' :
              suggestion.priority === 'medium' ? 'bg-yellow-400/10' : 'bg-blue-400/10'
            )}
          >
            {suggestion.priority === 'high' ? (
              <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            ) : suggestion.priority === 'medium' ? (
              <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-medium text-sm text-neutral-200">
                {suggestion.section.charAt(0).toUpperCase() + suggestion.section.slice(1)}
              </p>
              <p className="text-sm text-neutral-400">{suggestion.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};