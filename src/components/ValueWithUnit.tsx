import React from 'react';
import './ValueWithUnit.css';

interface ValueWithUnitProps {
  cost?: number;
  textColor?: string;
  type?: 'euro' | 'megawatt' | 'europermegawatt';
}

export const ValueWithUnit: React.FC<ValueWithUnitProps> = ({ cost, textColor, type = 'europermegawatt' }) => {
  return (
    <div className="cost-text-container">
      <div className="cost-number" style={{ color: textColor }}>
        {cost}
      </div>
      <div className="cost-unit" style={{ color: textColor }}>
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

