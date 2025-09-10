import React, { useState } from 'react';
import './Accordion.css';

interface AccordionProps {
  title: string;
  content?: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  theme?: 'white' | 'blue';
  onToggle?: (isOpen: boolean) => void;
}

const ArrowIcon = ({ isOpen, theme }: { isOpen: boolean; theme: 'white' | 'blue' }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`accordion-arrow ${isOpen ? 'accordion-arrow--open' : ''}`}
  >
    <path
      d="M4 6L8 10L12 6"
      stroke={theme === 'blue' ? '#ffffff' : '#11161A'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Accordion = ({
  title,
  content = 'Content',
  defaultOpen = false,
  className = '',
  theme = 'white',
  onToggle,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onToggle?.(newIsOpen);
  };

  const themeClass = theme === 'blue' ? 'accordion--blue' : 'accordion--white';

  return (
    <div className={`accordion ${themeClass} ${className}`} data-name="Accordion">
      <div className="accordion-header" onClick={handleToggle}>
        <div className="accordion-title">
          <p>{title}</p>
        </div>
        <ArrowIcon isOpen={isOpen} theme={theme} />
      </div>
      {isOpen && (
        <div className="accordion-content">
          <div className="accordion-content-item">{content}</div>
        </div>
      )}
    </div>
  );
};
