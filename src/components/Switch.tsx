import React, { useState } from 'react';
import './Switch.css';

const imgOn = "http://localhost:3845/assets/86c15ca80cb444eb8cc1db3e8335b63ac51c31a9.svg";
const imgOff = "http://localhost:3845/assets/ad7677e073e42d60a4ed84f42b17c5e56222a75d.svg";
const imgGroupOn = "http://localhost:3845/assets/25f95806464af11dea630fdf68fa80d5415c7da4.svg";
const imgGroupOff = "http://localhost:3845/assets/164245110dc3649da31e9ff08005286a44c3c907.svg";

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  label?: string;
  className?: string;
  showIcon?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  disabled = false,
  size = 'medium',
  label,
  className = '',
  showIcon = true,
}) => {
  const [internalChecked, setInternalChecked] = useState(checked);

  const handleToggle = () => {
    if (disabled) return;
    
    const newChecked = !internalChecked;
    setInternalChecked(newChecked);
    onChange?.(newChecked);
  };

  const switchClasses = [
    'switch',
    `switch--${size}`,
    internalChecked ? 'switch--checked' : '',
    disabled ? 'switch--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className="switch-container">
      {label && (
        <label className="switch-label" htmlFor={`switch-${Math.random()}`}>
          {label}
        </label>
      )}
      <div className="switch-wrapper">
        {showIcon && (
          <div className="switch-icon">
            <img 
              alt="Power icon" 
              src={internalChecked ? imgOn : imgOff}
              className="switch-power-icon"
            />
          </div>
        )}
        <button
          type="button"
          role="switch"
          aria-checked={internalChecked}
          className={switchClasses}
          onClick={handleToggle}
          disabled={disabled}
        >
          <span className="switch-track">
            <span className="switch-thumb">
              {internalChecked && (
                <img 
                  alt="" 
                  src={imgGroupOn} 
                  className="switch-thumb-icon"
                />
              )}
              {!internalChecked && (
                <img 
                  alt="" 
                  src={imgGroupOff} 
                  className="switch-thumb-icon"
                />
              )}
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};