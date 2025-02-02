import React from 'react';
import { Wand2 } from 'lucide-react';
import { optimizeContent } from '../../services/deepseek';

interface OptimizeButtonProps {
  content: string;
  type: 'summary' | 'experience' | 'achievement';
  onOptimize: (optimizedContent: string) => void;
}

export const OptimizeButton: React.FC<OptimizeButtonProps> = ({
  content,
  type,
  onOptimize,
}) => {
  const [isOptimizing, setIsOptimizing] = React.useState(false);

  const handleOptimize = async () => {
    setIsOptimizing(true);
    try {
      const optimizedContent = await optimizeContent(content, type);
      onOptimize(optimizedContent);
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <button
      onClick={handleOptimize}
      disabled={isOptimizing || !content.trim()}
      className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Wand2 className="h-4 w-4" />
      {isOptimizing ? 'Optimizing...' : 'Optimize'}
    </button>
  );
};