import React from 'react';
import { Download, FileText, CreditCard } from 'lucide-react';
import { useResumeStore } from '../store/useResumeStore';
import { usePDF } from 'react-to-pdf';
import { generateDOCX } from '../utils/docxExport';

export const ExportOptions: React.FC = () => {
  const { resumeData, exportsUsed, incrementExport } = useResumeStore();
  const { toPDF, targetRef } = usePDF({
    filename: `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
  });

  const handleDOCXExport = async () => {
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
  };

  const handleExport = () => {
    if (exportsUsed >= 1) {
      setShowPaywall(true);
      return;
    }
    toPDF();
    incrementExport();
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleExport}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Download className="h-4 w-4" />
        Export PDF
      </button>
      <button
        onClick={handleDOCXExport}
        className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        <FileText className="h-4 w-4" />
        Export DOCX
      </button>
      <div ref={targetRef} style={{ display: 'none' }}>
        {exportsUsed === 0 && (
          <div className="absolute inset-0 flex items-center justify-center opacity-50 text-red-500 text-2xl font-bold">
            FREE TRIAL VERSION
          </div>
        )}
      </div>
    </div>
  );
};