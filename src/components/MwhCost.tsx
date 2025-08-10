import React from 'react';
import './MwhCost.css';

interface MwhCostProps {
  cost?: number;
  textColor?: string;
}

export const MwhCost: React.FC<MwhCostProps> = ({ cost, textColor }) => {
  return (
    <div className="cost-text-container">
      <div className="cost-number" style={{ color: textColor }}>
        {cost}
      </div>
      <div className="cost-unit" style={{ color: textColor }}>
        €
      </div>
      <div className="cost-unit-per" style={{ color: textColor }}>
        /Mwh
      </div>
    </div>
  );
};
