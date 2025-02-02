import React from 'react';
import { motion } from 'framer-motion';
import { useTemplateStore } from '../store/useTemplateStore';
import { Sparkles, Check, Lock } from 'lucide-react';
import { useResumeStore } from '../store/useResumeStore';

export const TemplateSelector: React.FC = () => {
  const { templates, activeTemplateId, setActiveTemplate } = useTemplateStore();
  const { isPremium } = useResumeStore();
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'modern', label: 'Modern' },
    { id: 'classic', label: 'Classic' },
    { id: 'creative', label: 'Creative' },
    { id: 'tech', label: 'Tech' },
    { id: 'minimal', label: 'Minimal' },
    { id: 'executive', label: 'Executive' },
    { id: 'academic', label: 'Academic' },
  ];

  const filteredTemplates = templates.filter(
    template => selectedCategory === 'all' || template.category === selectedCategory
  );

  return (
    <div className="p-6 space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-violet-500 text-white'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <motion.div
            key={template.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-xl blur-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
            
            <div className="relative glass rounded-xl overflow-hidden">
              {/* Preview Image */}
              <div className="aspect-[4/3] relative">
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Lock Overlay for Premium Templates */}
                {!isPremium && template.id !== 'minimal-edge' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="p-4 text-center">
                      <Lock className="h-8 w-8 text-white/80 mx-auto mb-2" />
                      <p className="text-white font-medium">Premium Template</p>
                    </div>
                  </div>
                )}
                
                {/* Active Template Indicator */}
                {activeTemplateId === template.id && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm flex items-center gap-1">
                      <Check className="h-4 w-4" />
                      Active
                    </span>
                  </div>
                )}
                
                {/* Template Category */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm flex items-center gap-1">
                    <Sparkles className="h-4 w-4" />
                    {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                  </span>
                </div>
              </div>
              
              {/* Template Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{template.name}</h3>
                <p className="text-white/60 text-sm mb-4">{template.description}</p>
                
                {/* Keywords */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-2 py-1 bg-white/5 text-white/60 rounded-full text-xs"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                
                {/* Action Button */}
                <button
                  onClick={() => setActiveTemplate(template.id)}
                  disabled={!isPremium && template.id !== 'minimal-edge'}
                  className={`w-full px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTemplateId === template.id
                      ? 'bg-green-500 text-white'
                      : isPremium || template.id === 'minimal-edge'
                      ? 'bg-violet-500 text-white hover:bg-violet-600'
                      : 'bg-white/10 text-white/40 cursor-not-allowed'
                  }`}
                >
                  {activeTemplateId === template.id ? 'Currently Active' : 'Use Template'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};