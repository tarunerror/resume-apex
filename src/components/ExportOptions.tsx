import React from 'react';
import { Download, FileText, CreditCard } from 'lucide-react';
import { useResumeStore } from '../store/useResumeStore';
import { usePDF } from 'react-to-pdf';
import { generateDOCX } from '../utils/docxExport';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const ExportOptions: React.FC = () => {
  const { resumeData } = useResumeStore();
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

  const handlePayment = async () => {
    const stripe = await stripePromise;
    if (!stripe) return;

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: 'price_premium_resume',
      }),
    });

    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => toPDF()}
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
      <button
        onClick={handlePayment}
        className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        <CreditCard className="h-4 w-4" />
        Upgrade to Premium
      </button>
      <div ref={targetRef} style={{ display: 'none' }}>
        {/* This is where the PDF content will be rendered */}
      </div>
    </div>
  );
};