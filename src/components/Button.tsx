import React from 'react';
import './Button.css';
import { PlusIcon, SettingsIcon, ArrowDownIcon, NextIcon } from './Icons';

interface ButtonProps {
  text: string;
  leftIcon?: string;
  rightIcon?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  size?: 'small' | 'large';
}

const getIcon = (iconName: string, color: string = 'white'): React.ReactNode => {
  const iconMap: Record<string, React.ReactNode> = {
    PlusIcon: <PlusIcon size={16} color={color} />,
    SettingsIcon: <SettingsIcon size={22} color={color} />,
    ArrowDownIcon: <ArrowDownIcon size={16} color={color} />,
    NextIcon: <NextIcon size={16} color={color} />,
  };
  return iconMap[iconName];
};

export const Button = ({
  text,
  leftIcon,
  rightIcon,
  onClick,
  disabled = false,
  className = '',
  bgColor,
  textColor,
  borderColor,
  size = 'large',
}: ButtonProps) => {
  const getSizeStyles = (size: 'small' | 'large'): React.CSSProperties => {
    switch (size) {
      case 'small':
        return { height: '32px', padding: '8px 12px' };
      case 'large':
        return { height: '40px', padding: '12px 16px' };
      default:
        return { height: '40px', padding: '12px 16px' };
    }
  };

  const buttonStyle: React.CSSProperties = {
    ...getSizeStyles(size),
    ...(bgColor && { backgroundColor: bgColor }),
    ...(textColor && { color: textColor }),
    ...(borderColor && {
      border: `1px solid ${borderColor}`,
      boxSizing: 'border-box',
    }),
  };

  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      disabled={disabled}
      data-name="Button"
      style={buttonStyle}
    >
      {leftIcon && getIcon(leftIcon, textColor || 'white') && (
        <div className="button-icon" data-name={leftIcon}>
          {getIcon(leftIcon, textColor || 'white')}
        </div>
      )}
      <div className="button-text" style={textColor ? { color: textColor } : {}}>
        <p>{text}</p>
      </div>
      {rightIcon && getIcon(rightIcon, textColor || 'white') && (
        <div className="button-icon" data-name={rightIcon}>
          {getIcon(rightIcon, textColor || 'white')}
        </div>
      )}
    </button>
  );
};
