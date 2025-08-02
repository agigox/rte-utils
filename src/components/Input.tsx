import React, { useState, useRef, useEffect } from 'react';
import './Input.css';

interface InputProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number';
  disabled?: boolean;
  error?: string;
  className?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  value = '',
  onChange,
  type = 'text',
  disabled = false,
  error,
  className = '',
  required = false,
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const isLabelFloating = isFocused || internalValue.length > 0;

  const containerClasses = [
    'input-container',
    isFocused ? 'input-container--focused' : '',
    isLabelFloating ? 'input-container--floating' : '',
    error ? 'input-container--error' : '',
    disabled ? 'input-container--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
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
        />
        <label className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      </div>
      {error && <div className="input-error">{error}</div>}
    </div>
  );
};