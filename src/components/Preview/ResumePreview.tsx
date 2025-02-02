import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Mail, Phone, MapPin, Linkedin, Globe, Github } from 'lucide-react';

export const ResumePreview: React.FC = () => {
  const { resumeData } = useResumeStore();
  const { personalInfo } = resumeData;

  return (
    <div className="max-w-[850px] mx-auto p-8 bg-white rounded-lg shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 mb-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-4">{personalInfo.fullName}</h1>
        
        {/* Contact Grid - Using grid for better alignment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {personalInfo.email && (
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin className="h-4 w-4 flex-shrink-0" />
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:underline truncate">
                LinkedIn
              </a>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-2">
              <Github className="h-4 w-4 flex-shrink-0" />
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-white hover:underline truncate">
                GitHub
              </a>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 flex-shrink-0" />
              <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="text-white hover:underline truncate">
                Portfolio
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {resumeData.summary && (
        <div className="mb-8 bg-gray-50 rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Experience</h2>
          <div className="space-y-4">
            {resumeData.experience.map((exp, index) => (
              <div 
                key={exp.id} 
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                <div className="text-blue-600 font-medium">{exp.company}</div>
                <div className="text-sm text-gray-500">
                  {exp.startDate} - {exp.endDate}
                </div>
                <div className="mt-2 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: exp.description }} />
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index} className="text-gray-700">{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
          <div className="space-y-4">
            {resumeData.education.map((edu, index) => (
              <div 
                key={edu.id} 
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                <div className="text-blue-600 font-medium">{edu.institution}</div>
                <div className="text-sm text-gray-500">
                  Graduation: {edu.graduationDate}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <div className="mb-8 bg-gray-50 rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white text-blue-600 rounded-full text-sm border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};