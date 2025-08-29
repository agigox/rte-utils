import React, { useState, useRef, useEffect } from 'react';
import './InputNumber.css';

interface InputNumberProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  min?: { value: number; label?: string };
  max?: { value: number; label?: string };
}

export const InputNumber: React.FC<InputNumberProps> = ({
  label,
  value = '',
  onChange,
  disabled = false,
  className = '',
  required = false,
  min = { value: 0 },
  max = { value: 100 },
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

    // Always update internal value for display
    setInternalValue(newValue);

    // Check if value is out of range for visual feedback
    if (newValue !== '') {
      const numValue = parseFloat(newValue);
      if (!isNaN(numValue)) {
        const outOfRange = numValue < min.value || numValue > max.value;
        setIsOutOfRange(outOfRange);

        if (outOfRange) {
          // Clamp the value and notify parent with clamped value
          const clampedValue = Math.max(min.value, Math.min(max.value, numValue));
          onChange?.(clampedValue.toString());
        } else {
          // Value is in range, notify parent with actual value
          onChange?.(newValue);
        }
      } else {
        setIsOutOfRange(false);
        onChange?.(newValue);
      }
    } else {
      setIsOutOfRange(false);
      onChange?.(newValue);
    }
  };
  const handleFocus = () => {
    setIsFocused(true);
    // Select all text when focusing
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);

    // Clamp value on blur
    if (internalValue !== '') {
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
    'input-container',
    isFocused ? 'input-container--focused' : '',
    isLabelFloating ? 'input-container--floating' : '',
    disabled ? 'input-container--disabled' : '',
    isOutOfRange ? 'input-container--error' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      <div className="input-constraints">
        {min.label && <div className="input-min">
          {min.label}
          <br />
          {min.value}
        </div>}

        <div className="input-field">
          <input
            ref={inputRef}
            type="number"
            value={internalValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            required={required}
            className="input-element"
            aria-label={label}
            min={min.value}
            max={max.value}
            step={1}
          />
          <label className="input-label">
            {label}
            {required && <span className="input-required">*</span>}
          </label>
        </div>
        {max.label && <div className="input-max">
          {max.label}
          <br /> {max.value}
        </div>}
      </div>
    </div>
  );
};
