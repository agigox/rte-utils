import React from "react";
import "./Chip.css";

interface ChipProps {
  // Define any props you want to pass to the Chip component
  label?: string;
  bgColor?: string;
  textColor?: string;
  width?: "fit-content" | "full-width";
}

export const Chip: React.FC<ChipProps> = ({ 
  label, 
  bgColor, 
  textColor, 
  width = "fit-content" 
}) => {
  const chipClasses = [
    "chip-container",
    width === "full-width" ? "chip-container--full-width" : "chip-container--fit-content"
  ].join(" ");

  return (
    <div className={chipClasses} style={{ backgroundColor: bgColor }}>
      <div className="chip-content">
        <p className="chip-label" style={{ color: textColor }}>
          {label}
        </p>
      </div>
    </div>
  );
};
