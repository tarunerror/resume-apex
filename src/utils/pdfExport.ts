import { usePDF } from 'react-to-pdf';

export const generatePDF = async (element: HTMLElement) => {
  const { toPDF } = usePDF({
    targetRef: element,
    filename: 'resume.pdf',
    options: {
      format: 'letter',
    },
  });

  return await toPDF();
};