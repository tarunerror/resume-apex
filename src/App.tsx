import React, { useState, useEffect } from 'react';
import Split from 'react-split';
import { PersonalInfoForm } from './components/Editor/PersonalInfoForm';
import { ExperienceForm } from './components/Editor/ExperienceForm';
import { EducationForm } from './components/Editor/EducationForm';
import { SkillsForm } from './components/Editor/SkillsForm';
import { EditorTabs } from './components/Editor/EditorTabs';
import { ResumePreview } from './components/Preview/ResumePreview';
import { StrengthMeter } from './components/ResumeAnalysis/StrengthMeter';
import { ExportOptions } from './components/ExportOptions';
import { ProgressTracker } from './components/ProgressTracker';
import { AchievementBadges } from './components/AchievementBadges';
import { OnboardingModal } from './components/OnboardingModal';
import { PaywallModal } from './components/PaywallModal';
import { Monitor, Smartphone, Maximize2, Minimize2, Sparkles, Wand2, X } from 'lucide-react';
import { useResumeStore } from './store/useResumeStore';
import { analyzeResume } from './services/deepseek';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { TemplateSelector } from './components/TemplateSelector';

function App() {
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState('personal');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [splitSizes, setSplitSizes] = useState([40, 60]);
  const { resumeData, setAnalysis, setIsAnalyzing, analysis, isAnalyzing, isPremium } = useResumeStore();

  // Analyze resume whenever data changes
  useEffect(() => {
    const debounceTimeout = setTimeout(async () => {
      setIsAnalyzing(true);
      try {
        const result = await analyzeResume(resumeData);
        setAnalysis(result);
        
        // Show paywall if score is good but user isn't premium
        if (result.score >= 70 && !isPremium && !showPaywall) {
          setShowPaywall(true);
        }
      } finally {
        setIsAnalyzing(false);
      }
    }, 1000);

    return () => clearTimeout(debounceTimeout);
  }, [resumeData, setAnalysis, setIsAnalyzing, isPremium]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'skills':
        return <SkillsForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  const togglePanelSize = () => {
    if (splitSizes[0] === 40) {
      setSplitSizes([65, 35]);
    } else if (splitSizes[0] === 65) {
      setSplitSizes([15, 85]);
    } else {
      setSplitSizes([40, 60]);
    }
  };

  return (
    <div className="h-screen flex flex-col relative">
      <div className="animated-bg" />
      
      {/* Header */}
      <header className="glass border-b border-white/10 px-4 py-3 relative z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <div className="relative">
              <Wand2 className="w-6 h-6 text-violet-400 animate-float" />
              <div className="absolute inset-0 blur-sm opacity-50">
                <Wand2 className="w-6 h-6 text-violet-400" />
              </div>
            </div>
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
              Resume Apex
            </span>
            <Sparkles className="w-5 h-5 text-violet-400 animate-pulse-slow" />
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowTemplates(true)}
              className="px-4 py-2 bg-violet-500/20 text-violet-300 rounded-lg hover:bg-violet-500/30 transition-all duration-200 flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Templates
            </button>
            <ExportOptions onPaywallTrigger={() => setShowPaywall(true)} />
            <div className="flex items-center gap-2 glass glass-hover rounded-lg p-1">
              <button
                onClick={() => setPreviewMode('desktop')}
                className={clsx(
                  'p-2 rounded-md transition-all duration-300',
                  previewMode === 'desktop'
                    ? 'bg-white/10 text-violet-400 shadow-lg shadow-violet-500/20'
                    : 'text-white/70 hover:bg-white/5'
                )}
              >
                <Monitor className="h-5 w-5" />
              </button>
              <button
                onClick={() => setPreviewMode('mobile')}
                className={clsx(
                  'p-2 rounded-md transition-all duration-300',
                  previewMode === 'mobile'
                    ? 'bg-white/10 text-violet-400 shadow-lg shadow-violet-500/20'
                    : 'text-white/70 hover:bg-white/5'
                )}
              >
                <Smartphone className="h-5 w-5" />
              </button>
              <button
                onClick={togglePanelSize}
                className="p-2 rounded-md transition-all duration-300 text-white/70 hover:bg-white/5"
                title="Toggle panel size"
              >
                {splitSizes[0] === 40 ? (
                  <Maximize2 className="h-5 w-5" />
                ) : (
                  <Minimize2 className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <Split
        className="flex-1 flex relative z-10"
        sizes={splitSizes}
        minSize={[300, 300]}
        maxSize={[800, Infinity]}
        gutterSize={8}
        snapOffset={30}
        dragInterval={1}
        gutterStyle={() => ({
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          cursor: 'col-resize',
        })}
        onDragEnd={(sizes) => setSplitSizes(sizes)}
      >
        {/* Editor Panel */}
        <div className="h-full overflow-hidden flex flex-col glass glass-hover">
          <EditorTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <ProgressTracker onComplete={() => !isPremium && setShowPaywall(true)} />
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {renderActiveTab()}
          </div>
          <div className="p-4 border-t border-white/10">
            <StrengthMeter analysis={analysis} isLoading={isAnalyzing} />
            <AchievementBadges onUnlock={() => !isPremium && setShowPaywall(true)} />
          </div>
        </div>

        {/* Preview Panel */}
        <div className="h-full overflow-y-auto glass glass-hover custom-scrollbar">
          <div
            className={clsx(
              'h-full transition-all duration-300 ease-in-out p-4',
              previewMode === 'mobile' ? 'max-w-[414px] mx-auto' : 'max-w-none'
            )}
          >
            <ResumePreview />
          </div>
        </div>
      </Split>

      {/* Templates Modal */}
      {showTemplates && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-gradient-to-br from-violet-900/90 to-purple-900/90 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden border border-white/10"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-bold text-white">Resume Templates</h2>
                <p className="text-white/60">Choose from our professionally designed templates</p>
              </div>
              <button
                onClick={() => setShowTemplates(false)}
                className="text-white/60 hover:text-white/80 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[calc(90vh-5rem)]">
              <TemplateSelector />
            </div>
          </motion.div>
        </div>
      )}

      {/* Modals */}
      {showOnboarding && (
        <OnboardingModal
          onClose={() => setShowOnboarding(false)}
          onStartTrial={() => setShowOnboarding(false)}
        />
      )}
      
      {showPaywall && (
        <PaywallModal onClose={() => setShowPaywall(false)} />
      )}
    </div>
  );
}

export default App;