import React from 'react';
import { Github, Twitter, Linkedin, Heart, Code, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  return (
    <footer className="relative mt-20">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-violet-950/50 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Wand2 className="h-6 w-6 text-violet-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Resume Apex
              </span>
            </div>
            <p className="text-white/60">
              Craft your perfect resume with AI-powered tools and professional templates.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ y: -2 }}
                href="https://github.com/resume-apex"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-violet-400 transition-colors"
              >
                <Github className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                href="https://twitter.com/resume_apex"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-violet-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                href="https://linkedin.com/company/resume-apex"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-violet-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Templates', 'Features', 'Pricing', 'Blog'].map((item) => (
                <motion.li key={item} whileHover={{ x: 2 }}>
                  <a href="#" className="text-white/60 hover:text-violet-400 transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {['Resume Tips', 'Career Advice', 'Examples', 'Help Center'].map((item) => (
                <motion.li key={item} whileHover={{ x: 2 }}>
                  <a href="#" className="text-white/60 hover:text-violet-400 transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-white/60 mb-4">
              Get the latest resume tips and career advice delivered to your inbox.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 transition-all duration-200"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors duration-200"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm">
              © {new Date().getFullYear()} Resume Apex. Made with{' '}
              <Heart className="h-4 w-4 inline-block text-red-400 mx-1" /> and{' '}
              <Code className="h-4 w-4 inline-block text-violet-400 mx-1" />
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-white/60 hover:text-violet-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-violet-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white/60 hover:text-violet-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};