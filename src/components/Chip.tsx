import React from "react";
import "./Chip.css";

interface ChipProps {
  // Define any props you want to pass to the Chip component
  label?: string;
  bgColor?: string;
  textColor?: string;
}

export const Chip: React.FC<ChipProps> = ({ label, bgColor, textColor }) => {
  return (
    <div className="chip-container" style={{ backgroundColor: bgColor }}>
      <div className="chip-content">
        <p className="chip-label" style={{ color: textColor }}>
          {label}
        </p>
      </div>
    </div>
  );
};
