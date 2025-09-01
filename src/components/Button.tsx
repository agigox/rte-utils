import React from 'react';
import './Button.css';

interface ButtonProps {
  text: string;
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const icons: Record<string, React.ReactNode> = {
  plusIcon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0C8.27614 0 8.50436 0.205203 8.54048 0.47144L8.54545 0.545455V7.45455H15.4545C15.7558 7.45455 16 7.69875 16 8C16 8.27614 15.7948 8.50436 15.5286 8.54048L15.4545 8.54545H8.54545V15.4545C8.54545 15.7558 8.30125 16 8 16C7.72386 16 7.49564 15.7948 7.45953 15.5286L7.45455 15.4545V8.54545H0.545455C0.244208 8.54545 0 8.30125 0 8C0 7.72386 0.205203 7.49564 0.47144 7.45953L0.545455 7.45455H7.45455V0.545455C7.45455 0.244208 7.69875 0 8 0Z"
        fill="white"
      />
    </svg>
  ),
};

export const Button = ({ text, icon, onClick, disabled = false, className = '' }: ButtonProps) => {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      disabled={disabled}
      data-name="Button"
    >
      {icon && icons[icon] && (
        <div className="button-icon" data-name={icon}>
          {icons[icon]}
        </div>
      )}
      <div className="button-text">
        <p>{text}</p>
      </div>
    </button>
  );
};
