import React, { useState } from 'react';
import { Download, FileText, CreditCard } from 'lucide-react';
import { useResumeStore } from '../store/useResumeStore';
import { usePDF } from 'react-to-pdf';
import { generateDOCX } from '../utils/docxExport';
import { PaywallModal } from './PaywallModal';

export const ExportOptions: React.FC = () => {
  const { resumeData, isPremium, exportCount, incrementExportCount } = useResumeStore();
  const [showPaywall, setShowPaywall] = useState(false);
  const { toPDF, targetRef } = usePDF({
    filename: `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
  });

  const handleExport = async (type: 'pdf' | 'docx') => {
    if (!isPremium && exportCount >= 1) {
      setShowPaywall(true);
      return;
    }

    incrementExportCount();

    if (type === 'pdf') {
      await toPDF();
    } else {
      const docx = await generateDOCX(resumeData);
      const blob = new Blob([docx], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={() => handleExport('pdf')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Download className="h-4 w-4" />
          Export PDF
        </button>
        <button
          onClick={() => handleExport('docx')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <FileText className="h-4 w-4" />
          Export DOCX
        </button>
        {!isPremium && (
          <button
            onClick={() => setShowPaywall(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <CreditCard className="h-4 w-4" />
            Upgrade to Premium
          </button>
        )}
      </div>

      {showPaywall && <PaywallModal onClose={() => setShowPaywall(false)} />}
      
      <div ref={targetRef} style={{ display: 'none' }}>
        {/* This is where the PDF content will be rendered */}
      </div>
    </>
  );
};