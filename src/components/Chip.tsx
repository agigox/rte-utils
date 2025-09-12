import React from 'react';
import './Chip.css';

interface ChipProps {
  // Define any props you want to pass to the Chip component
  children: React.ReactNode;
  bgColor?: string;
  width?: 'fit-content' | 'full-width';
  size?: 'small' | 'large';
}

export const Chip: React.FC<ChipProps> = ({ children, bgColor, width = 'fit-content', size = 'large' }) => {
  const chipClasses = [
    'chip-container',
    width === 'full-width' ? 'chip-container--full-width' : 'chip-container--fit-content',
    `chip-container--${size}`,
  ].join(' ');

  return (
    <div className={chipClasses} style={{ backgroundColor: bgColor }}>
      <div className="chip-content">
        <div className="chip-label">{children}</div>
      </div>
    </div>
  );
};
