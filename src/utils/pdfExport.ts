import { usePDF } from 'react-to-pdf';
import { useResumeStore } from '../store/useResumeStore';

export const generatePDF = async (element: HTMLElement) => {
  const { isPremium } = useResumeStore();
  
  const { toPDF } = usePDF({
    targetRef: element,
    filename: 'resume.pdf',
    options: {
      format: 'letter',
      onComplete: (pdf) => {
        if (!isPremium) {
          // Add watermark to the PDF
          const watermark = 'Created with Resume Apex Free Version';
          pdf.setTextColor(200);
          pdf.setFontSize(24);
          pdf.text(watermark, pdf.internal.pageSize.width / 2, pdf.internal.pageSize.height / 2, {
            align: 'center',
            angle: 45
          });
        }
      }
    },
  });

  return await toPDF();
};