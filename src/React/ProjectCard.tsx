import React, { useState } from 'react';
import { ImageMetadata } from 'astro';
import SpotlightCard from './SpotlightCard';

interface ProjectCardProps {
  title: string;
  description: string;
  image: ImageMetadata;
  link: string;
  preview: string;
  status: string;
  technologies: string[];
  features: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
  category: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  image, 
  link, 
  preview, 
  status, 
  technologies, 
  features, 
  metrics, 
  category 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'live':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in development':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'on development':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <SpotlightCard className="group h-full" spotlightColor="rgba(164, 118, 255, 0.1)">
      <div className="h-full flex flex-col bg-[#0a0a0a] rounded-2xl overflow-hidden border border-[#ffffff10] hover:border-[#ffffff20] transition-all duration-300">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img
            src={image.src}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-black/50 backdrop-blur-sm text-white border border-white/20">
              {category}
            </span>
            <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(status)}`}>
              {status}
            </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex-1 flex flex-col p-6">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-[var(--white-icon)] text-sm leading-relaxed">
              {description}
            </p>
          </div>

          {/* Technologies */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {technologies.slice(0, 5).map((tech, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 text-xs bg-[#1a1a1a] border border-[#ffffff10] rounded-full text-[var(--white-icon)] hover:text-white hover:border-purple-500/50 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
              {technologies.length > 5 && (
                <span className="px-3 py-1 text-xs bg-[#1a1a1a] border border-[#ffffff10] rounded-full text-[var(--white-icon)]">
                  +{technologies.length - 5}
                </span>
              )}
            </div>
          </div>

          {/* Metrics (if available) */}
          {metrics && (
            <div className="mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {metrics.map((metric, index) => (
                  <div key={index} className="bg-[#1a1a1a] rounded-lg p-3 border border-[#ffffff10]">
                    <div className="text-lg font-bold text-white">{metric.value}</div>
                    <div className="text-xs text-[var(--white-icon)]">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expandable Features */}
          <div className="mb-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors duration-300"
            >
              <span>Key Features</span>
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isExpanded && (
              <div className="mt-3 space-y-2 animate-in slide-in-from-top-2 duration-300">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-[var(--white-icon)]">{feature}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-auto">
            <div className="flex gap-3">
              <a
                href={preview}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all duration-300 hover:scale-105 font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Live Demo</span>
              </a>
              
              {link !== "#" && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-4 py-3 border border-[var(--white-icon-tr)] hover:border-white text-[var(--white-icon)] hover:text-white rounded-xl transition-all duration-300 hover:scale-105"
                  aria-label="View Source Code"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
};

export default ProjectCard;