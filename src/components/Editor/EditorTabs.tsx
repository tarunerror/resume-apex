import React from 'react';
import { FileText, GraduationCap, Briefcase, Code } from 'lucide-react';
import clsx from 'clsx';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface EditorTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const tabs: Tab[] = [
  { id: 'personal', label: 'Personal', icon: <FileText className="h-4 w-4" /> },
  { id: 'experience', label: 'Experience', icon: <Briefcase className="h-4 w-4" /> },
  { id: 'education', label: 'Education', icon: <GraduationCap className="h-4 w-4" /> },
  { id: 'skills', label: 'Skills', icon: <Code className="h-4 w-4" /> },
];

export const EditorTabs: React.FC<EditorTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={clsx(
            'flex items-center gap-2 px-4 py-2 border-b-2 font-medium text-sm',
            activeTab === tab.id
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};