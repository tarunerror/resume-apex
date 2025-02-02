import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Gift, X } from 'lucide-react';

interface ReferralModalProps {
  onClose: () => void;
  onShare: () => void;
}

export const ReferralModal: React.FC<ReferralModalProps> = ({ onClose, onShare }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-gradient-to-br from-violet-900/90 to-purple-900/90 backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-white/10"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white/80 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6">
          <div className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="h-8 w-8 text-violet-400" />
          </div>

          <h2 className="text-2xl font-bold text-center text-white mb-2">
            Share & Unlock Premium
          </h2>
          
          <p className="text-center text-white/60 mb-6">
            Share Resume Apex with your network to unlock premium templates and features
          </p>

          <div className="space-y-4">
            <button
              onClick={onShare}
              className="w-full px-4 py-3 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Share2 className="h-5 w-5" />
              Share on LinkedIn
            </button>

            <div className="text-center">
              <p className="text-sm text-white/40">
                Premium features will be unlocked immediately after sharing
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};