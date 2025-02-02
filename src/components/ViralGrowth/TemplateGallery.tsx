import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Sparkles, Trophy, TrendingUp, Lock } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: 'trending' | 'premium' | 'free';
  jobTitle: string;
  unlocked: boolean;
}

const trendingTemplates: Template[] = [
  {
    id: 'ai-engineer-2025',
    name: 'AI Engineer 2025',
    description: 'Optimized for next-gen AI roles with focus on LLMs and MLOps',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    category: 'trending',
    jobTitle: 'AI Engineer',
    unlocked: false
  },
  {
    id: 'growth-hacker',
    name: 'Growth Hacker Special',
    description: 'Perfect for modern digital marketing and growth roles',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    category: 'premium',
    jobTitle: 'Growth Marketing Manager',
    unlocked: false
  },
  {
    id: 'web3-developer',
    name: 'Web3 Developer Pro',
    description: 'Showcase your blockchain and DeFi expertise',
    thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0',
    category: 'premium',
    jobTitle: 'Blockchain Developer',
    unlocked: false
  }
];

export const TemplateGallery: React.FC = () => {
  const { isPremium } = useResumeStore();

  const handleShare = async (template: Template) => {
    const shareText = `🚀 Just discovered this amazing ${template.name} resume template on Resume Apex! Perfect for ${template.jobTitle} roles in 2025. Check it out:`;
    const shareUrl = `https://resumeapex.com/templates/${template.id}?ref=${encodeURIComponent(crypto.randomUUID())}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${template.name} Resume Template`,
          text: shareText,
          url: shareUrl
        });
      } else {
        // Fallback to LinkedIn share
        const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`;
        window.open(linkedInUrl, '_blank');
      }
    } catch (error) {
      console.error('Error sharing template:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Trending Templates
            <TrendingUp className="h-5 w-5 text-violet-400" />
          </h2>
          <p className="text-white/60">Optimized for 2025's most in-demand roles</p>
        </div>
        {!isPremium && (
          <div className="px-4 py-2 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-lg border border-violet-500/20">
            <p className="text-sm text-white/80">
              <span className="text-violet-400 font-medium">Pro tip:</span> Share to unlock premium templates
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingTemplates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-xl blur-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
            
            <div className="relative glass rounded-xl overflow-hidden">
              <div className="aspect-[4/3] relative">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {!template.unlocked && !isPremium && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="p-4 text-center">
                      <Lock className="h-8 w-8 text-white/80 mx-auto mb-2" />
                      <p className="text-white font-medium">Share to Unlock</p>
                    </div>
                  </div>
                )}
                
                <div className="absolute top-4 right-4 flex gap-2">
                  {template.category === 'trending' && (
                    <span className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm flex items-center gap-1">
                      <Trophy className="h-4 w-4" />
                      Trending
                    </span>
                  )}
                  {template.category === 'premium' && (
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm flex items-center gap-1">
                      <Sparkles className="h-4 w-4" />
                      Premium
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{template.name}</h3>
                <p className="text-white/60 text-sm mb-4">{template.description}</p>
                
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleShare(template)}
                    className="px-4 py-2 bg-violet-500/20 text-violet-300 rounded-lg hover:bg-violet-500/30 transition-all duration-200 flex items-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    Share to Unlock
                  </button>
                  
                  <button className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-all duration-200">
                    Use Template
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};