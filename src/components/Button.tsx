import React from 'react';
import './Button.css';

interface ButtonProps {
  text: string;
  leftIcon?: string;
  rightIcon?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  bgColor?: string;
  textColor?: string;
  size?: 'small' | 'large';
}

const getIcon = (iconName: string, color: string = 'white'): React.ReactNode => {
  const iconMap: Record<string, React.ReactNode> = {
    plusIcon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 0C8.27614 0 8.50436 0.205203 8.54048 0.47144L8.54545 0.545455V7.45455H15.4545C15.7558 7.45455 16 7.69875 16 8C16 8.27614 15.7948 8.50436 15.5286 8.54048L15.4545 8.54545H8.54545V15.4545C8.54545 15.7558 8.30125 16 8 16C7.72386 16 7.49564 15.7948 7.45953 15.5286L7.45455 15.4545V8.54545H0.545455C0.244208 8.54545 0 8.30125 0 8C0 7.72386 0.205203 7.49564 0.47144 7.45953L0.545455 7.45455H7.45455V0.545455C7.45455 0.244208 7.69875 0 8 0Z"
          fill={color}
        />
      </svg>
    ),
    settingIcon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.78828 3.03085C10.0975 3.37414 10.5379 3.57013 11 3.57013C11.462 3.57013 11.9024 3.37414 12.2116 3.03085L12.995 2.16335C13.4578 1.65028 14.1935 1.48418 14.8319 1.74862C15.4703 2.01307 15.873 2.65078 15.8375 3.34085L15.7775 4.50752C15.754 4.96893 15.927 5.4187 16.2537 5.7454C16.5804 6.07209 17.0302 6.24514 17.4916 6.22168L18.6583 6.16252C19.3475 6.12854 19.9836 6.53156 20.2473 7.16924C20.511 7.80691 20.3452 8.5415 19.8333 9.00418L18.965 9.78835C18.6221 10.0979 18.4265 10.5381 18.4265 11C18.4265 11.4619 18.6221 11.9022 18.965 12.2117L19.8333 12.995C20.3464 13.4579 20.5125 14.1936 20.248 14.832C19.9836 15.4703 19.3459 15.8731 18.6558 15.8375L17.4891 15.7775C17.0279 15.7541 16.5782 15.927 16.2516 16.2535C15.9249 16.58 15.7517 17.0296 15.775 17.4908L15.835 18.6575C15.8684 19.3461 15.4658 19.9815 14.8289 20.2452C14.1919 20.5089 13.458 20.3441 12.995 19.8333L12.2116 18.9658C11.9021 18.623 11.4618 18.4274 11 18.4274C10.5381 18.4274 10.0978 18.623 9.78828 18.9658L9.00495 19.8333C8.54185 20.3424 7.80925 20.5064 7.17332 20.2433C6.53739 19.9803 6.13474 19.3466 6.16662 18.6592L6.22662 17.4925C6.25096 17.03 6.07763 16.579 5.74985 16.2519C5.42206 15.9247 4.9707 15.7523 4.50828 15.7775L3.34162 15.8375C2.65202 15.8719 2.01534 15.4688 1.75157 14.8307C1.4878 14.1926 1.65399 13.4576 2.16662 12.995L3.03495 12.2117C3.37776 11.9022 3.57341 11.4619 3.57341 11C3.57341 10.5381 3.37776 10.0979 3.03495 9.78835L2.16662 9.00418C1.65823 8.54096 1.49469 7.80879 1.75767 7.17327C2.02065 6.53776 2.65373 6.13523 3.34078 6.16668L4.50745 6.22585C4.96977 6.25017 5.42065 6.07695 5.74777 5.74936C6.07489 5.42176 6.24744 4.97063 6.22245 4.50835L6.16662 3.34085C6.13474 2.65339 6.53739 2.01978 7.17332 1.75671C7.80925 1.49363 8.54185 1.65761 9.00495 2.16668L9.78828 3.03085Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.0625 15.0626C10.0625 14.5448 10.4822 14.1251 11 14.1251C11.5178 14.1251 11.9375 14.5448 11.9375 15.0626C11.9375 15.5803 11.5178 16.0001 11 16.0001C10.4822 16.0001 10.0625 15.5803 10.0625 15.0626Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11 5.37506C11.3452 5.37506 11.625 5.65488 11.625 6.00006V12.2501C11.625 12.5952 11.3452 12.8751 11 12.8751C10.6548 12.8751 10.375 12.5952 10.375 12.2501V6.00006C10.375 5.65488 10.6548 5.37506 11 5.37506Z"
          fill={color}
        />
      </svg>
    ),
    arrowDownIcon: (
      <svg
        width="16"
        height="10"
        viewBox="0 0 16 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15.8235 1.61477C16.065 1.35365 16.0578 0.946887 15.8072 0.694302C15.5566 0.441718 15.153 0.434496 14.8933 0.677901L7.87732 7.74957L1.10614 0.677901C0.847065 0.434503 0.442824 0.441725 0.192211 0.694302C-0.0577526 0.946887 -0.0649185 1.35365 0.176588 1.61477L7.87729 9.5L15.8235 1.61477Z"
          fill="white"
        />
      </svg>
    ),
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
