import { useState } from 'react';
import { CheckboxEmptyIcon, CheckboxFilledIcon, RadioEmptyIcon, RadioFilledIcon } from './Icons';
import './OptionItem.css';

export interface OptionItemProps {
  /**
   * The type of the tickbox
   */
  type: 'radio' | 'checkbox';
  /**
   * The text content to display next to the tickbox
   */
  content: string;
  /**
   * The content class name
   */
  className?: string;
  /**
   * The icon to display in the OptionItem
   */
  icon?: React.ReactNode;
  /**
   * The checked state of the OptionItem
   */
  checked?: boolean;
  /**
   * The disabled state of the OptionItem
   */
  disabled?: boolean;
  /**
   * The on change handler of the OptionItem
   */
  onChange: (checked: boolean) => void;
}

export const OptionItem = ({
  type,
  content,
  className,
  icon,
  checked,
  disabled,
  onChange,
}: OptionItemProps) => {
  const [internalChecked, setInternalChecked] = useState(checked);
  // Use controlled value if provided, otherwise use internal state
  const isChecked = checked !== undefined ? checked : internalChecked;
  const handleCheck = () => {
    if (disabled) return;

    const newChecked = !isChecked;
    // Only update internal state if uncontrolled
    if (checked === undefined) {
      setInternalChecked(newChecked);
    }
    onChange?.(newChecked);
  };

  return (
    <div
      className={`option-item${isChecked ? ' option-item-checked' : ''} ${disabled ? ' option-item-disabled' : ''}`}
      onClick={handleCheck}
    >
      {type === 'checkbox' ? (
        isChecked ? (
          <CheckboxFilledIcon size={24} />
        ) : (
          <CheckboxEmptyIcon size={24} />
        )
      ) : isChecked ? (
        <RadioFilledIcon size={24} />
      ) : (
        <RadioEmptyIcon size={24} />
      )}
      <div className="option-item-content">
        <span className={className}>{content}</span>
      </div>
      {icon}
    </div>
  );
};
