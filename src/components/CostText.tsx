import React from "react";
import "./CostText.css";

interface CostTextProps {
  cost?: number;
  textColor?: string;
}

export const CostText: React.FC<CostTextProps> = ({ cost, textColor }) => {
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
