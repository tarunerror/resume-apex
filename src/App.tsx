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
import { Monitor, Smartphone, Maximize2, Minimize2 } from 'lucide-react';
import { useResumeStore } from './store/useResumeStore';
import { analyzeResume } from './services/deepseek';
import clsx from 'clsx';

function App() {
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState('personal');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [splitSizes, setSplitSizes] = useState([40, 60]);
  const { resumeData, setAnalysis, setIsAnalyzing, analysis, isAnalyzing } = useResumeStore();

  useEffect(() => {
    const debounceTimeout = setTimeout(async () => {
      setIsAnalyzing(true);
      try {
        const result = await analyzeResume(resumeData);
        setAnalysis(result);
      } finally {
        setIsAnalyzing(false);
      }
    }, 1000);

    return () => clearTimeout(debounceTimeout);
  }, [resumeData, setAnalysis, setIsAnalyzing]);

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
    <div className="h-screen bg-gradient flex flex-col">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Resume Apex
          </h1>
          <div className="flex items-center gap-4">
            <ExportOptions />
            <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg">
              <button
                onClick={() => setPreviewMode('desktop')}
                className={clsx(
                  'p-2 rounded-md transition-colors',
                  previewMode === 'desktop'
                    ? 'bg-white/10 text-blue-400'
                    : 'text-white/70 hover:bg-white/5'
                )}
              >
                <Monitor className="h-5 w-5" />
              </button>
              <button
                onClick={() => setPreviewMode('mobile')}
                className={clsx(
                  'p-2 rounded-md transition-colors',
                  previewMode === 'mobile'
                    ? 'bg-white/10 text-blue-400'
                    : 'text-white/70 hover:bg-white/5'
                )}
              >
                <Smartphone className="h-5 w-5" />
              </button>
              <button
                onClick={togglePanelSize}
                className="p-2 rounded-md transition-colors text-white/70 hover:bg-white/5"
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
        className="flex-1 flex"
        sizes={splitSizes}
        minSize={[300, 300]}
        maxSize={[800, Infinity]}
        gutterSize={8}
        snapOffset={30}
        dragInterval={1}
        gutterStyle={() => ({
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          cursor: 'col-resize',
        })}
        onDragEnd={(sizes) => setSplitSizes(sizes)}
      >
        {/* Editor Panel */}
        <div className="h-full overflow-hidden flex flex-col bg-white/10 backdrop-blur-md">
          <EditorTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <ProgressTracker />
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {renderActiveTab()}
          </div>
          <div className="p-4 border-t border-white/20">
            <StrengthMeter analysis={analysis} isLoading={isAnalyzing} />
            <AchievementBadges />
          </div>
        </div>

        {/* Preview Panel */}
        <div className="h-full overflow-y-auto bg-white/5 backdrop-blur-md custom-scrollbar">
          <div
            className={clsx(
              'h-full transition-all duration-300 ease-in-out',
              previewMode === 'mobile' ? 'max-w-[414px] mx-auto' : 'max-w-none'
            )}
          >
            <ResumePreview />
          </div>
        </div>
      </Split>

      {/* Onboarding Modal */}
      {showOnboarding && (
        <OnboardingModal
          onClose={() => setShowOnboarding(false)}
          onStartTrial={() => {
            setShowOnboarding(false);
          }}
        />
      )}
    </div>
  );
}

export default App;