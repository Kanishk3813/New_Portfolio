import { useState } from 'react';
import { FileDown } from 'lucide-react';

interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string[];
  technologies: string[];
  logo: string;
  recommendationLetter?: string; // Optional path to recommendation letter
}

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export default function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <div className="relative">
      {/* Timeline dot */}
      <div className="absolute left-4 md:left-1/2 top-8 transform md:-translate-x-1/2 z-10">
        <div className="size-8 rounded-full bg-[var(--background)] border-2 border-[var(--sec)] flex items-center justify-center">
          <div className={`size-4 rounded-full bg-[var(--sec)] transition-all duration-300 ${isHovered ? 'scale-150' : ''}`}></div>
        </div>
      </div>

      {/* Card */}
      <div 
        className={`relative ml-12 md:ml-0 md:w-[45%] ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className={`
            p-6 rounded-xl border border-[var(--white-icon-tr)] 
            bg-[#1414149c] hover:bg-[#1a1a1a] transition-all duration-300
            ${isHovered ? 'transform translate-y-[-5px] shadow-lg shadow-[var(--sec-tr)]' : ''}
          `}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-lg bg-[#252525] flex items-center justify-center p-2">
                <img src={experience.logo} alt={experience.company} className="size-8" />
              </div>
              <div>
                <h3 className="text-xl font-medium">{experience.position}</h3>
                <p className="text-[var(--white-icon)]">{experience.company}</p>
              </div>
            </div>
            
            {/* Minimal Download Icon */}
            {experience.recommendationLetter && (
              <div className="relative group">
                <a 
                  href={experience.recommendationLetter}
                  download={`${experience.company}_Recommendation.pdf`}
                  className="flex items-center justify-center size-8 rounded-full bg-[var(--sec-tr)] hover:bg-[var(--sec)] transition-all duration-300"
                >
                  <FileDown size={16} className="text-[var(--white)] group-hover:text-black" />
                </a>
                
                {/* Tooltip on hover */}
                <div className="absolute right-0 -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-xs px-2 py-1 rounded bg-[#000000cc] text-white">
                  Download Recommendation
                </div>
              </div>
            )}
          </div>
          
          <div className="mb-4">
            <p className="text-[var(--white-icon)] text-sm">{experience.duration}</p>
            <ul className="mt-2 space-y-2">
              {experience.description.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[var(--sec)] mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {experience.technologies.map((tech, i) => (
              <span 
                key={i} 
                className="px-2 py-1 text-xs rounded-md bg-[var(--sec-tr)] text-[var(--white)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}