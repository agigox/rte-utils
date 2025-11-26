import { useState } from 'react';
import './ToggleBtns.css';

interface Option {
  value: string;
  label: string;
}

interface ToggleBtnsProps {
  onClick: (e: string) => void;
  options: Option[];
  className?: string;
  defaultValue?: string;
}

export const ToggleBtns: React.FC<ToggleBtnsProps> = ({
  onClick,
  options,
  className = '',
  defaultValue,
}) => {
  const [selected, setSelected] = useState(defaultValue || options[0]?.value);

  const handleSelect = (value: string) => {
    setSelected(value);
    onClick(value);
  };

  return (
    <div className={`toggle-btns ${className}`}>
      {options.map((option, index) => (
        <button
          key={option.value}
          onClick={() => handleSelect(option.value)}
          className={`toggle-btn ${selected === option.value ? 'toggle-btn--active' : ''} ${
            index === 0 ? 'toggle-btn--first' : index === options.length - 1 ? 'toggle-btn--last' : ''
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
