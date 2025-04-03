import React, { useState, useEffect } from "react";
import "./achievements.css";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  credential: string;
  image: string;
  description?: string;
  skills?: string[];
  projectLink?: string;
  additionalImages?: string[];
  pdfUrl?: string;
}

interface Hackathon {
  name: string;
  position: string;
  organizer: string;
  date: string;
  description: string;
  image: string;
  problemDescription?: string;
  prizeMoney?: string;
  company?: string;
  teamImage?: string;
  techStack?: string[];
  projectLink?: string;
  additionalImages?: string[];
  pdfUrl?: string;
}

interface Workshop {
  title: string;
  organizer: string;
  role: string;
  date: string;
  description: string;
  image: string;
  attendees?: number;
  topics?: string[];
  feedback?: string;
  materialsLink?: string;
  additionalImages?: string[];
  pdfUrl?: string;
}

interface Props {
  type: "certificate" | "hackathon" | "workshop";
  data: Certificate | Hackathon | Workshop;
}

const AchievementCard: React.FC<Props> = ({ type, data }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    const nav = document.getElementById("main-nav");
    
    if (showModal) {
      document.body.style.overflow = "hidden";
      // Hide the navbar when modal is open
      if (nav) nav.style.display = "none";
    } else {
      document.body.style.overflow = "auto";
      // Show the navbar when modal is closed
      if (nav) nav.style.display = "";
    }
  
    return () => {
      document.body.style.overflow = "auto";
      // Ensure navbar is visible when component unmounts
      if (nav) nav.style.display = "";
    };
  }, [showModal]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [showModal]);

  const openModal = (e: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const toggleDescription = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const getDescriptionText = () => {
    switch (type) {
      case "certificate":
        return (data as Certificate).description;
      case "hackathon":
        return (data as Hackathon).description;
      case "workshop":
        return (data as Workshop).description;
      default:
        return "";
    }
  };

  const renderCardContent = () => {
    switch (type) {
      case "certificate":
        const cert = data as Certificate;
        return (
          <>
            <div className="certificate-badge mb-4 rounded-lg overflow-hidden flex items-center justify-center h-40 bg-[#0a0a0a]">
              <img
                src={cert.image}
                alt={cert.title}
                className="max-h-32 max-w-full object-contain"
              />
            </div>
            <div className="min-h-[4rem] flex flex-col">
              <h4 className="text-xl font-medium mb-2 text-white break-words">
                {cert.title}
              </h4>
              <p className="text-[var(--white-icon)] mb-1">
                Issued by {cert.issuer}
              </p>
            </div>
            <div className="flex justify-between items-center mt-auto">
              <p className="text-[var(--white-icon)] text-sm">{cert.date}</p>
              <a
                href={cert.credential}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--sec)] hover:text-white transition duration-300 ease-in-out text-sm flex items-center gap-1"
              >
                Verify
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </>
        );

      case "hackathon":
        const hack = data as Hackathon;
        return (
          <>
            <div className="flex items-start gap-4 mb-4">
              <div className="h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
                <img
                  src={hack.image}
                  alt={hack.name}
                  className="max-h-12 max-w-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xl font-medium mb-1 text-white break-words">
                  {hack.name}
                </h4>
                <p className="text-[var(--sec)] font-medium">{hack.position}</p>
              </div>
            </div>

            <div
              className={`relative overflow-hidden ${isDescriptionExpanded ? "" : "max-h-20"}`}
            >
              <p className="text-[var(--white-icon)] mb-3 break-words">
                {hack.description}
              </p>
              {!isDescriptionExpanded &&
                hack.description &&
                hack.description.length > 120 && (
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#1414149c] to-transparent pointer-events-none"></div>
                )}
            </div>

            {hack.description && hack.description.length > 120 && (
              <button
                onClick={toggleDescription}
                className="text-[var(--sec)] hover:text-white text-sm mb-3 flex items-center gap-1"
              >
                {isDescriptionExpanded ? "Show less" : "Read more"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transform transition-transform ${isDescriptionExpanded ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            )}

            <div className="flex justify-between items-center text-sm flex-wrap mt-auto">
              <p className="text-[var(--white-icon)]">{hack.organizer}</p>
              <p className="text-[var(--white-icon)]">{hack.date}</p>
            </div>
          </>
        );

      case "workshop":
        const workshop = data as Workshop;
        return (
          <>
            <div className="flex items-start gap-4 mb-4">
              <div className="h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
                <img
                  src={workshop.image}
                  alt={workshop.title}
                  className="max-h-12 max-w-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xl font-medium mb-1 text-white break-words">
                  {workshop.title}
                </h4>
                <p className="text-[var(--sec)] font-medium">{workshop.role}</p>
              </div>
            </div>

            <div
              className={`relative overflow-hidden ${isDescriptionExpanded ? "" : "max-h-20"}`}
            >
              <p className="text-[var(--white-icon)] mb-3 break-words">
                {workshop.description}
              </p>
              {!isDescriptionExpanded &&
                workshop.description &&
                workshop.description.length > 120 && (
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#1414149c] to-transparent pointer-events-none"></div>
                )}
            </div>

            {workshop.description && workshop.description.length > 120 && (
              <button
                onClick={toggleDescription}
                className="text-[var(--sec)] hover:text-white text-sm mb-3 flex items-center gap-1"
              >
                {isDescriptionExpanded ? "Show less" : "Read more"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transform transition-transform ${isDescriptionExpanded ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            )}

            <div className="flex justify-between items-center text-sm flex-wrap mt-auto">
              <p className="text-[var(--white-icon)]">{workshop.organizer}</p>
              <p className="text-[var(--white-icon)]">{workshop.date}</p>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const renderExpandedContent = () => {
    switch (type) {
      case "certificate":
        const cert = data as Certificate;
        return (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/5">
              <div className="certificate-badge rounded-lg overflow-hidden flex items-center justify-center h-48 bg-[#0a0a0a] mb-4">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="max-h-40 max-w-full object-contain"
                />
              </div>

              {cert.additionalImages && cert.additionalImages.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {cert.additionalImages.map((img, index) => (
                    <div
                      key={index}
                      className="rounded-lg overflow-hidden bg-[#0a0a0a] aspect-video flex items-center justify-center"
                    >
                      <img
                        src={img}
                        alt={`Additional ${index}`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full md:w-3/5">
              <h3 className="text-2xl font-medium mb-2 text-white">
                {cert.title}
              </h3>
              <p className="text-[var(--sec)] font-medium mb-4">
                Issued by {cert.issuer} • {cert.date}
              </p>

              {cert.description && (
                <div className="mb-4">
                  <h4 className="text-lg font-medium mb-2 text-white">
                    About this certification
                  </h4>
                  <p className="text-[var(--white-icon)]">{cert.description}</p>
                </div>
              )}

              {cert.skills && cert.skills.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg font-medium mb-2 text-white">
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-sm bg-[#ffffff10] rounded-md text-[var(--white-icon)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 mt-6">
                {cert.pdfUrl && (
                  <a
                    href={cert.pdfUrl}
                    download
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ffffff10] text-white font-medium transition-all hover:bg-[#ffffff20]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.2em"
                      height="1.2em"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download Certificate
                  </a>
                )}

                <a
                  href={cert.credential}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--sec)] text-white font-medium transition-all hover:bg-opacity-90"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.2em"
                    height="1.2em"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                  </svg>
                  Verify Credential
                </a>

                {cert.projectLink && (
                  <a
                    href={cert.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--white-icon-tr)] text-white font-medium transition-all hover:bg-[#ffffff10]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.2em"
                      height="1.2em"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <polyline points="9 21 3 21 3 15"></polyline>
                      <line x1="21" y1="3" x2="14" y2="10"></line>
                      <line x1="3" y1="21" x2="10" y2="14"></line>
                    </svg>
                    View Project
                  </a>
                )}
              </div>
            </div>
          </div>
        );

      case "hackathon":
        const hack = data as Hackathon;
        return (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/5">
              {hack.teamImage && (
                <div className="rounded-lg overflow-hidden aspect-video bg-[#0a0a0a] mb-4">
                  <img
                    src={hack.teamImage}
                    alt={`${hack.name} Team`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {hack.additionalImages && hack.additionalImages.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {hack.additionalImages.map((img, index) => (
                    <div
                      key={index}
                      className="rounded-lg overflow-hidden bg-[#0a0a0a] aspect-video flex items-center justify-center"
                    >
                      <img
                        src={img}
                        alt={`Additional ${index}`}
                        className="max-h-full max-w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full md:w-3/5">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
                  <img
                    src={hack.image}
                    alt={hack.name}
                    className="max-h-12 max-w-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-medium mb-1 text-white">
                    {hack.name}
                  </h3>
                  <p className="text-[var(--sec)] font-medium">
                    {hack.position} • {hack.date}
                  </p>
                </div>
              </div>

              {hack.company && (
                <div className="mb-4">
                  <h4 className="text-lg font-medium mb-1 text-white">
                    Company
                  </h4>
                  <p className="text-[var(--white-icon)]">{hack.company}</p>
                </div>
              )}

              {hack.prizeMoney && (
                <div className="mb-4">
                  <h4 className="text-lg font-medium mb-1 text-white">Prize</h4>
                  <p className="text-[var(--white-icon)]">{hack.prizeMoney}</p>
                </div>
              )}

              {hack.problemDescription && (
                <div className="mb-4">
                  <h4 className="text-lg font-medium mb-1 text-white">
                    Challenge
                  </h4>
                  <p className="text-[var(--white-icon)]">
                    {hack.problemDescription}
                  </p>
                </div>
              )}

              {hack.techStack && hack.techStack.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg font-medium mb-1 text-white">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {hack.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-sm bg-[#ffffff10] rounded-md text-[var(--white-icon)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 mt-6">
                {hack.pdfUrl && (
                  <a
                    href={hack.pdfUrl}
                    download
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ffffff10] text-white font-medium transition-all hover:bg-[#ffffff20]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.2em"
                      height="1.2em"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download Certificate
                  </a>
                )}

                {hack.projectLink && (
                  <a
                    href={hack.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--sec)] text-white font-medium transition-all hover:bg-opacity-90"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.2em"
                      height="1.2em"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    View Project
                  </a>
                )}
              </div>
            </div>
          </div>
        );

      case "workshop":
        const workshop = data as Workshop;
        return (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/5">
              <div className="rounded-lg overflow-hidden aspect-video bg-[#0a0a0a] mb-4">
                <img
                  src={workshop.image}
                  alt={workshop.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {workshop.additionalImages &&
                workshop.additionalImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {workshop.additionalImages.map((img, index) => (
                      <div
                        key={index}
                        className="rounded-lg overflow-hidden bg-[#0a0a0a] aspect-video flex items-center justify-center"
                      >
                        <img
                          src={img}
                          alt={`Additional ${index}`}
                          className="max-h-full max-w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
            </div>

            <div className="w-full md:w-3/5">
              <h3 className="text-2xl font-medium mb-1 text-white">
                {workshop.title}
              </h3>
              <p className="text-[var(--sec)] font-medium mb-4">
                {workshop.role} • {workshop.date}
              </p>

              <p className="text-[var(--white-icon)] mb-4">
                {workshop.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-lg font-medium mb-1 text-white">
                    Organizer
                  </h4>
                  <p className="text-[var(--white-icon)]">
                    {workshop.organizer}
                  </p>
                </div>

                {workshop.attendees && (
                  <div>
                    <h4 className="text-lg font-medium mb-1 text-white">
                      Attendees
                    </h4>
                    <p className="text-[var(--white-icon)]">
                      {workshop.attendees}+
                    </p>
                  </div>
                )}
              </div>

              {workshop.topics && workshop.topics.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg font-medium mb-1 text-white">
                    Topics Covered
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {workshop.topics.map((topic, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-sm bg-[#ffffff10] rounded-md text-[var(--white-icon)]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {workshop.feedback && (
                <div className="mb-4">
                  <h4 className="text-lg font-medium mb-1 text-white">
                    Feedback
                  </h4>
                  <p className="text-[var(--white-icon)] italic">
                    "{workshop.feedback}"
                  </p>
                </div>
              )}

              {/* Also fix workshop buttons to be consistent */}
              <div className="flex flex-wrap gap-3 mt-6">
                {workshop.pdfUrl && (
                  <a
                    href={workshop.pdfUrl}
                    download
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ffffff10] text-white font-medium transition-all hover:bg-[#ffffff20]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.2em"
                      height="1.2em"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download Certificate
                  </a>
                )}

                {workshop.materialsLink && (
                  <a
                    href={workshop.materialsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--sec)] text-white font-medium transition-all hover:bg-opacity-90"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.2em"
                      height="1.2em"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                      <polyline points="16 6 12 2 8 6"></polyline>
                      <line x1="12" y1="2" x2="12" y2="15"></line>
                    </svg>
                    View Materials
                  </a>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div
        className="achievement-card relative overflow-hidden rounded-xl border border-[var(--white-icon-tr)] bg-[#1414149c] p-5 flex flex-col w-full min-h-[320px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex-1 flex flex-col">{renderCardContent()}</div>

        <div
          onClick={openModal}
          className="mt-4 flex items-center gap-1 text-[var(--sec)] hover:text-white transition duration-300 ease-in-out text-sm cursor-pointer z-[1] mt-auto"
          aria-label="View more details"
        >
          View more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>

        {/* Background effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-[var(--sec)] to-transparent opacity-0 transition-opacity duration-300 pointer-events-none ${isHovered ? "opacity-10" : ""}`}
        ></div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-4"
          onClick={handleClickOutside}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl border border-[var(--white-icon-tr)] bg-[#141414] p-6 animate-modalFadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 text-[var(--white-icon)] hover:text-white transition duration-300 ease-in-out"
              aria-label="Close modal"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Modal content */}
            <div className="pt-2">{renderExpandedContent()}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default AchievementCard;
