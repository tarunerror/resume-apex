import React from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, Clock, Send } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  postedAt: string;
  type: 'full-time' | 'part-time' | 'contract';
}

interface JobListingProps {
  job: Job;
  onApply: (jobId: string) => void;
}

export const JobListing: React.FC<JobListingProps> = ({ job, onApply }) => {
  const { resumeData } = useResumeStore();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-xl blur-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
      
      <div className="relative glass p-6 rounded-xl hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
            <div className="flex items-center gap-4 text-white/60">
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {job.company}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {job.postedAt}
              </div>
            </div>
          </div>
          
          <button
            onClick={() => onApply(job.id)}
            className="relative group px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Quick Apply
            </span>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-400 to-fuchsia-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </button>
        </div>
        
        <div className="mt-4">
          <div className="flex gap-2 mb-4">
            <span className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm">
              {job.type}
            </span>
            <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
              {job.salary}
            </span>
          </div>
          
          <p className="text-white/80 line-clamp-3">
            {job.description}
          </p>
        </div>
        
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10"
          >
            <h4 className="text-sm font-medium text-white/80 mb-2">Resume Match Score</h4>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                />
              </div>
              <span className="text-white/60 text-sm">75%</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};