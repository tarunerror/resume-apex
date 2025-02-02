import React from 'react';
import { motion } from 'framer-motion';
import { Award, Download, CreditCard, Clock, CheckCircle } from 'lucide-react';

interface OnboardingModalProps {
  onClose: () => void;
  onStartTrial: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onClose, onStartTrial }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative bg-gradient-to-br from-violet-900/90 to-purple-900/90 backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-white/10"
      >
        <div className="absolute inset-0 bg-gradient-radial from-violet-500/10 via-transparent to-transparent" />
        
        <div className="relative p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-200 to-fuchsia-200 bg-clip-text text-transparent">
              Build an ATS-crushing resume in 15 minutes
            </h2>
            <p className="text-violet-200/80">Pay once, use forever!</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-violet-400/10 rounded-lg">
                <Clock className="h-5 w-5 text-violet-300" />
              </div>
              <div>
                <h3 className="font-medium text-violet-100">Quick & Easy</h3>
                <p className="text-sm text-violet-200/70">Create a professional resume in minutes</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-violet-400/10 rounded-lg">
                <CheckCircle className="h-5 w-5 text-violet-300" />
              </div>
              <div>
                <h3 className="font-medium text-violet-100">ATS-Optimized</h3>
                <p className="text-sm text-violet-200/70">Ensure your resume passes automated systems</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-violet-400/10 rounded-lg">
                <Award className="h-5 w-5 text-violet-300" />
              </div>
              <div>
                <h3 className="font-medium text-violet-100">Free Trial</h3>
                <p className="text-sm text-violet-200/70">Try all features with one free export</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-violet-400/10 rounded-lg">
                <CreditCard className="h-5 w-5 text-violet-300" />
              </div>
              <div>
                <h3 className="font-medium text-violet-100">Special Launch Offer</h3>
                <p className="text-sm text-violet-200/70">₹100 for lifetime access (90% off)</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border border-violet-400/20 text-violet-200 hover:bg-violet-400/10 transition-all duration-200"
            >
              Maybe Later
            </button>
            <button
              onClick={onStartTrial}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg hover:from-violet-600 hover:to-fuchsia-600 transition-all duration-200 shadow-lg shadow-violet-500/25"
            >
              Start Building
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};