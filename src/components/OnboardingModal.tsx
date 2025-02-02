import React from 'react';
import { motion } from 'framer-motion';
import { Award, Download, CreditCard } from 'lucide-react';

interface OnboardingModalProps {
  onClose: () => void;
  onStartTrial: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onClose, onStartTrial }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full"
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Welcome to Resume Apex!</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Award className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Free Trial</h3>
                <p className="text-sm text-gray-500">Create one full resume with watermarked export</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Download className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Premium Features</h3>
                <p className="text-sm text-gray-500">Unlimited exports, AI optimization, and more</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CreditCard className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium">One-Time Payment</h3>
                <p className="text-sm text-gray-500">₹100 for lifetime access to all features</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Maybe Later
            </button>
            <button
              onClick={onStartTrial}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};