import React from 'react';
import './ValueWithUnit.css';

interface ValueWithUnitProps {
  cost?: number;
  textColor?: string;
  type?: 'euro' | 'megawatt' | 'europermegawatt';
  size?: 'default' | 'small';
}

export const ValueWithUnit: React.FC<ValueWithUnitProps> = ({ cost, textColor, type = 'europermegawatt', size = 'default' }) => {
  return (
    <div className={`cost-text-container ${size === 'small' ? 'cost-text-container--small' : ''}`}>
      <div className={`cost-number ${size === 'small' ? 'cost-number--small' : ''}`} style={{ color: textColor }}>
        {cost}
      </div>
      <div className={`cost-unit ${size === 'small' ? 'cost-unit--small' : ''}`} style={{ color: textColor }}>
        {type === 'euro' || type === 'europermegawatt' ? '€' : 'MWh'}
      </div>
      {type === 'europermegawatt' && (
        <div className="cost-unit-per" style={{ color: textColor }}>
          /MWh
        </div>
      )}
    </div>
  );
};

