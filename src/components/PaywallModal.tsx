import React from 'react';
import { motion } from 'framer-motion';
import { Loader, Lock } from 'lucide-react';

interface PaywallModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({ onClose, onSuccess }) => {
  const handlePayment = async () => {
    // Implement Razorpay/PayU integration here
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: 10000, // ₹100 in paise
      currency: 'INR',
      name: 'Resume Apex',
      description: 'Lifetime Access',
      handler: function(response: any) {
        onSuccess();
        onClose();
      },
    };
    
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-bold">Upgrade to Premium</h2>
          </div>
          
          <div className="space-y-4 mb-6">
            <p className="text-gray-600">
              Unlock unlimited exports and premium features with a one-time payment:
            </p>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="font-medium">Lifetime Access</span>
              <span className="text-2xl font-bold text-purple-600">₹100</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Later
            </button>
            <button
              onClick={handlePayment}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center justify-center gap-2"
            >
              <Loader className="h-4 w-4" />
              Proceed to Payment
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}; 