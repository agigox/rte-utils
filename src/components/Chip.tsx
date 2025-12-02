import React from 'react';
import './Chip.css';

interface ChipProps {
  // Define any props you want to pass to the Chip component
  children: React.ReactNode;
  bgColor?: string;
  width?: 'fit-content' | 'full-width';
  size?: 'small' | 'large';
  onClick?: () => void;
  disabled?: boolean;
}

export const Chip: React.FC<ChipProps> = ({
  children,
  bgColor,
  width = 'fit-content',
  size = 'large',
  onClick,
  disabled = false,
}) => {
  const chipClasses = [
    'chip-container',
    width === 'full-width' ? 'chip-container--full-width' : 'chip-container--fit-content',
    `chip-container--${size}`,
    onClick && !disabled ? 'chip-container--clickable' : '',
    disabled ? 'chip-container--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = () => {
    if (onClick && !disabled) {
      onClick();
    }
  };

  return (
    <div
      className={chipClasses}
      style={{ backgroundColor: bgColor }}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      onKeyDown={
        onClick && !disabled
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <div className="chip-content">
        <div className="chip-label">{children}</div>
      </div>
    </div>
  );
};
