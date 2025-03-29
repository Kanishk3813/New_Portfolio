import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import Resume from './Resume';

interface ResumeModalProps {
  children: React.ReactNode;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div onClick={handleOpen}>
        {children}
      </div>
      {isOpen && createPortal(
        <Resume onClose={handleClose} />,
        document.body
      )}
    </>
  );
};

export default ResumeModal; 