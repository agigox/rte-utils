import React, { useState, useRef, useEffect } from 'react';
import './InputNumber.css';
import { MaintenanceIcon } from './Icons';

interface InputNumberProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  onErrorChange?: (hasError: boolean) => void;
  onFocus?: () => void;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  min?: { value: number; label?: string };
  max?: { value: number; label?: string; tooltipText?: string };
  showSuccess?: boolean;
  inputWidth?: number;
  theme?: 'light' | 'dark' | 'slate' | 'black' | 'pending' | 'refused' | 'partial' | 'accepted';
}

export const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      label,
      value = '',
      onChange,
      onErrorChange,
      onFocus: onFocusProp,
      disabled = false,
      className = '',
      required = false,
      min = { value: 0 },
      max = { value: 100 },
      showSuccess = false,
      inputWidth,
      theme = 'light',
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(value);
    const [isFocused, setIsFocused] = useState(false);
    const [isOutOfRange, setIsOutOfRange] = useState(false);
    const [calculatedWidth, setCalculatedWidth] = useState(54); // Smaller default minimum width
    const [showMaxTooltip, setShowMaxTooltip] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const labelRef = useRef<HTMLLabelElement>(null);

    // Expose focus method through ref
    React.useImperativeHandle(
      ref,
      () =>
        ({
          focus: () => {
            inputRef.current?.focus();
          },
          blur: () => {
            inputRef.current?.blur();
          },
          select: () => {
            inputRef.current?.select();
          },
        }) as unknown as HTMLInputElement
    );

    // Use provided inputWidth or calculated width
    const finalInputWidth = inputWidth || calculatedWidth;

    // Calculate input width based on label text only if inputWidth is not provided
    useEffect(() => {
      if (!inputWidth && labelRef.current) {
        // Create a temporary element to measure text width
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
          // Get computed styles for accurate measurement
          const styles = window.getComputedStyle(labelRef.current);
          context.font = `${styles.fontSize} ${styles.fontFamily}`;

          // Measure the label text width
          const textWidth = context.measureText(label + (required ? '*' : '')).width;

          // Add minimal padding - just enough for label background and input padding
          // 24px = 12px left padding + 12px right padding for input
          // 8px = 4px padding on each side for label background
          const calculatedWidth = Math.max(54, textWidth + 32); // More precise padding calculation
          setCalculatedWidth(calculatedWidth);
        }
      }
    }, [label, required, inputWidth]);

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
          onErrorChange?.(outOfRange);

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
          onErrorChange?.(false);
          onChange?.(newValue);
        }
      } else {
        setIsOutOfRange(false);
        onErrorChange?.(false);
        onChange?.(newValue);
      }
    };
    const handleFocus = () => {
      setIsFocused(true);
      // Select all text when focusing
      if (inputRef.current) {
        inputRef.current.select();
      }
      onFocusProp?.();
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
          onErrorChange?.(false);
        }
      }
    };

    const isLabelFloating = isFocused || internalValue.length > 0;

    const containerClasses = [
      'input-container',
      `input-container--${theme}`,
      isFocused ? 'input-container--focused' : '',
      isLabelFloating ? 'input-container--floating' : '',
      disabled ? 'input-container--disabled' : '',
      isOutOfRange ? 'input-container--error' : '',
      showSuccess ? 'input-container--success' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        <div className="input-constraints">
          {min.label && (
            <div className="input-min">
              <div className="input-min-label">{min.label}</div>
              <div className="input-min-value">{min.value}</div>
            </div>
          )}

          <div className="input-field" style={{ width: `${finalInputWidth}px` }}>
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
              style={{ width: `${finalInputWidth}px` }}
              aria-label={label}
              min={min.value}
              max={max.value}
              step={1}
            />
            <label ref={labelRef} className="input-label">
              {label}
              {required && <span className="input-required">*</span>}
            </label>
          </div>
          {max.label && (
            <div className="input-max-container">
              <div className={`input-max ${max.tooltipText ? 'input-max--with-tooltip' : ''}`}>
                <div className="input-max-label">{max.label}</div>
                <div className="input-max-value">{max.value}</div>
              </div>
              {max.tooltipText && (
                <div
                  className="input-max-tooltip-wrapper"
                  onMouseEnter={() => setShowMaxTooltip(true)}
                  onMouseLeave={() => setShowMaxTooltip(false)}
                >
                  <MaintenanceIcon size={16} />
                  {showMaxTooltip && <div className="input-max-tooltip">{max.tooltipText}</div>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

InputNumber.displayName = 'InputNumber';
