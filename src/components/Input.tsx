import React, { useState, useRef, useEffect } from "react";
import "./Input.css";

interface InputProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: "text" | "number";
  disabled?: boolean;
  className?: string;
  required?: boolean;
  min?: { value: number; label?: string };
  max?: { value: number; label?: string };
}

export const Input: React.FC<InputProps> = ({
  label,
  value = "",
  onChange,
  type = "text",
  disabled = false,
  className = "",
  required = false,
  min = { value: 0, label: "Pmin" },
  max = { value: 100, label: "Pmax" },
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [isOutOfRange, setIsOutOfRange] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Check if value is out of range for visual feedback (but don't clamp yet)
    if (type === "number" && newValue !== "") {
      const numValue = parseFloat(newValue);
      if (!isNaN(numValue)) {
        const outOfRange = numValue < min.value || numValue > max.value;
        setIsOutOfRange(outOfRange);
      } else {
        setIsOutOfRange(false);
      }
    } else {
      setIsOutOfRange(false);
    }
    
    // Allow typing without immediate validation
    // Validation will happen on blur
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);

    // Validate and clamp value on blur for number inputs
    if (type === "number" && internalValue !== "") {
      const numValue = parseFloat(internalValue);
      if (!isNaN(numValue)) {
        const clampedValue = Math.max(min.value, Math.min(max.value, numValue));
        if (clampedValue !== numValue) {
          const clampedString = clampedValue.toString();
          setInternalValue(clampedString);
          onChange?.(clampedString);
        }
        setIsOutOfRange(false); // Reset out-of-range state after clamping
      }
    }
  };

  const isLabelFloating = isFocused || internalValue.length > 0;

  const containerClasses = [
    "input-container",
    isFocused ? "input-container--focused" : "",
    isLabelFloating ? "input-container--floating" : "",
    disabled ? "input-container--disabled" : "",
    isOutOfRange ? "input-container--error" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      <div className="input-constraints">
        <div className="input-min">
          {min.label}
          <br />
          {min.value}
        </div>

        <div className="input-field">
          <input
            ref={inputRef}
            type={type}
            value={internalValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            required={required}
            className="input-element"
            aria-label={label}
            min={type === "number" ? min.value : undefined}
            max={type === "number" ? max.value : undefined}
            step={type === "number" ? 1 : undefined}
          />
          <label className="input-label">
            {label}
            {required && <span className="input-required">*</span>}
          </label>
        </div>
        <div className="input-max">
          {max.label}
          <br /> {max.value}
        </div>
      </div>
    </div>
  );
};
