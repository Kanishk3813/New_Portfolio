import React from 'react';
import InfiniteMenu from './InfiniteMenu';
import { ImageMetadata } from 'astro';

interface Project {
  title: string;
  image: ImageMetadata;
  link: string;
  preview: string;
  status: string;
}

interface ProjectsMenuProps {
  projects: Project[];
}

const ProjectsMenu: React.FC<ProjectsMenuProps> = ({ projects }) => {
  const menuItems = projects.map(project => ({
    title: project.title,
    image: project.image.src,
    link: project.preview,
    status: project.status
  }));

  return (
    <div className="w-full h-[80vh]">
      <InfiniteMenu items={menuItems} />
    </div>
  );
};

export default ProjectsMenu; 