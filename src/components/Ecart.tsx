import React from 'react';
import { Chip } from './Chip';
import './Ecart.css';
import { ValueWithUnit } from './ValueWithUnit';

interface EcartProps {
  /** The label text to display before the chip */
  label: string;
  /** The value to display inside the chip */
  value: string;
  /** Background color of the chip */
  chipBgColor?: string;
  /** Text color of the chip content */
  chipTextColor?: string;
  /** Icon to display next to the label - 'plus', 'minus', or none */
  icon?: 'plus' | 'minus';
  /** Style object to apply to the ecart-container */
  style?: React.CSSProperties;
  /** Additional CSS class name */
  className?: string;
}

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="12" fill="#EAECED" />
    <path
      d="M12.8555 11.1641H15.8789V12.875H12.8555V15.8828H11.1445V12.875H8.12109V11.1641H11.1445V8.11719H12.8555V11.1641Z"
      fill="#11161A"
    />
  </svg>
);

const MinusIcon = () => (
  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" width="24" height="24" rx="12" fill="#EAECED" />
    <path d="M15.1534 11.0396V12.96H9.84656V11.0396H15.1534Z" fill="#11161A" />
  </svg>
);

export const Ecart: React.FC<EcartProps> = ({
  label,
  value,
  chipBgColor = '#d3d64e',
  chipTextColor = '#11161a',
  icon,
  style,
  className = '',
}) => {
  return (
    <div 
      className={`ecart-container ${className}`} 
      style={style}
      data-name="Ecart"
    >
      <div className="ecart-content">
        <div className="ecart-label">
          <span>{label}</span>
        </div>
        <div className="ecart-icon-container">
          {icon && (
            <div className="ecart-icon-wrapper">
              {icon === 'plus' ? <PlusIcon /> : <MinusIcon />}
            </div>
          )}
          <div className="ecart-value-wrapper">
            <Chip bgColor={chipBgColor}>
              <ValueWithUnit cost={parseFloat(value)} type="megawatt" textColor={chipTextColor} />
            </Chip>
          </div>
        </div>
      </div>
    </div>
  );
};
