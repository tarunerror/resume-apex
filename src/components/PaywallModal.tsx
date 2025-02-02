import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Download, Sparkles, X, Zap, Trophy, Clock } from 'lucide-react';
import { useResumeStore } from '../store/useResumeStore';
import ReactCanvasConfetti from 'react-canvas-confetti';

interface PaywallModalProps {
  onClose: () => void;
}

declare const Razorpay: any;

export const PaywallModal: React.FC<PaywallModalProps> = ({ onClose }) => {
  const { setPremium, analysis } = useResumeStore();
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handlePayment = () => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: 10000, // Amount in paise (₹100)
      currency: 'INR',
      name: 'Resume Apex',
      description: 'Lifetime Access',
      handler: function(response: any) {
        if (response.razorpay_payment_id) {
          setShowSuccess(true);
          setTimeout(() => {
            setPremium(true);
            onClose();
          }, 3000);
        }
      },
      prefill: {
        name: '',
        email: '',
        contact: ''
      },
      theme: {
        color: '#8B5CF6'
      }
    };

    const razorpay = new Razorpay(options);
    razorpay.open();
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-gradient-to-br from-violet-900/90 to-purple-900/90 backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-white/10 p-8 text-center"
        >
          <ReactCanvasConfetti
            fire={true}
            colors={['#8B5CF6', '#EC4899', '#6366F1']}
            origin={{ x: 0.5, y: 0.8 }}
          />
          <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Welcome to Premium!
          </h2>
          <p className="text-white/80">
            All premium features are now unlocked. Your resume journey just got a major upgrade!
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-gradient-to-br from-violet-900/90 to-purple-900/90 backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-white/10"
      >
        <div className="absolute inset-0 bg-gradient-radial from-violet-500/10 via-transparent to-transparent" />
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white/80 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="relative p-6 space-y-6">
          {analysis && (
            <div className="bg-green-500/20 text-green-300 p-4 rounded-lg">
              <p className="font-medium">Your resume score: {analysis.score}/100</p>
              <p className="text-sm">Unlock premium to maximize your potential!</p>
            </div>
          )}

          <div className="space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-200 to-fuchsia-200 bg-clip-text text-transparent">
              Unlock Premium Features
            </h2>
            <p className="text-violet-200/80">One-time payment, lifetime access!</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-violet-400/10 rounded-lg">
                <Download className="h-5 w-5 text-violet-300" />
              </div>
              <div>
                <h3 className="font-medium text-violet-100">Unlimited Exports</h3>
                <p className="text-sm text-violet-200/70">Export to PDF & DOCX without watermarks</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-violet-400/10 rounded-lg">
                <Sparkles className="h-5 w-5 text-violet-300" />
              </div>
              <div>
                <h3 className="font-medium text-violet-100">AI-Powered Optimization</h3>
                <p className="text-sm text-violet-200/70">Get smart suggestions to improve your resume</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-violet-400/10 rounded-lg">
                <Zap className="h-5 w-5 text-violet-300" />
              </div>
              <div>
                <h3 className="font-medium text-violet-100">ATS Keywords Analysis</h3>
                <p className="text-sm text-violet-200/70">Ensure your resume passes ATS scans</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-violet-400/10 rounded-lg">
                <Clock className="h-5 w-5 text-violet-300" />
              </div>
              <div>
                <h3 className="font-medium text-violet-100">Limited Time Offer</h3>
                <p className="text-sm text-violet-200/70">₹100 for lifetime access (Regular: ₹999)</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={handlePayment}
            className="w-full px-4 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg hover:from-violet-600 hover:to-fuchsia-600 transition-all duration-200 shadow-lg shadow-violet-500/25 font-medium"
          >
            Unlock Premium Now - ₹100 Only
          </button>
          
          <p className="text-center text-sm text-violet-200/60">
            Secure payment powered by Razorpay
          </p>
        </div>
      </motion.div>
    </div>
  );
};