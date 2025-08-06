import React, { useState } from "react";
import "./Switch.css";

interface OnProps {
  isOff?: boolean;
}
const ImgOn = ({ isOff }: OnProps) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.56529 2.85352C9.66365 2.57607 9.96837 2.43116 10.246 2.5293C13.4295 3.65507 15.3392 6.91015 14.7684 10.2383C14.1974 13.5667 11.3114 16 7.93443 16C4.55739 16 1.67151 13.5667 1.10045 10.2383C0.5296 6.91011 2.4393 3.65504 5.62291 2.5293C5.9005 2.43115 6.20523 2.57605 6.30357 2.85352C6.40176 3.13124 6.2561 3.43599 5.97838 3.53418C3.28438 4.48672 1.669 7.2423 2.1522 10.0586C2.63557 12.8747 5.07706 14.9336 7.93443 14.9336C10.7918 14.9336 13.2333 12.8747 13.7167 10.0586C14.1999 7.24233 12.5844 4.48676 9.89049 3.53418C9.61276 3.43599 9.4671 3.13124 9.56529 2.85352ZM7.93443 0C8.22892 3.10447e-05 8.46754 0.238727 8.46763 0.533203V7.4668C8.46763 7.76135 8.22898 8.00095 7.93443 8.00098C7.63986 8.00098 7.40123 7.76137 7.40123 7.4668V0.533203C7.40132 0.238707 7.63991 0 7.93443 0Z"
      fill={isOff ? "#999FA1" : "#009CDF"}
    />
  </svg>
);
const SwitchThumb = ({ isOff }: OnProps) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill={isOff ? "white" : "#009cdf"} />
  </svg>
);

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  showIcon?: boolean;
  label?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  disabled = false,
  showIcon = true,
  label,
}) => {
  const [internalChecked, setInternalChecked] = useState(checked);

  // Use controlled value if provided, otherwise use internal state
  const isChecked = checked !== undefined ? checked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;

    const newChecked = !isChecked;
    // Only update internal state if uncontrolled
    if (checked === undefined) {
      setInternalChecked(newChecked);
    }
    onChange?.(newChecked);
  };

  const switchClasses = [
    "switch",
    isChecked ? "switch--checked" : "",
    disabled ? "switch--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const wrapperClasses = [
    "switch-wrapper",
    isChecked ? "switch-wrapper--checked" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="switch-container">
      <div className={wrapperClasses}>
        {showIcon ? (
          <div className="switch-icon">
            <ImgOn isOff={!isChecked} />
          </div>
        ) : label ? (
          <div className="switch-label">{label}</div>
        ) : null}
        <button
          type="button"
          role="switch"
          aria-checked={isChecked}
          className={switchClasses}
          onClick={handleToggle}
          disabled={disabled}
        >
          <span className="switch-track">
            <span className="switch-thumb">
              <SwitchThumb isOff={!isChecked} />
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};
