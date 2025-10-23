import { useState } from 'react';
import { InputNumber } from './InputNumber';
import { Switch } from './Switch';
import './ProductionUnit.css';
import { Chip } from './Chip';
import { ValueWithUnit } from '.';
import { MaintenanceIcon } from './Icons';
import { Tooltip } from './Tooltip';

type ProductionUnitLimit = {
  value: number;
  label?: string;
  tooltipText?: string;
};

type EnergyConfig = {
  cost: number;
  tooltipText?: string;
};

interface ProductionUnitProps {
  onChangeInput?: (value: number) => void;
  onChangeSwitch?: (checked: boolean) => void;
  defaultValue?: number;
  defaultChecked?: boolean;
  value?: number;
  checked?: boolean;
  unitName?: string;
  energy?: EnergyConfig;
  energyCost?: number; // Deprecated, use energy instead
  checkedImage?: React.ReactNode;
  uncheckedImage?: React.ReactNode;
  readonly?: boolean;
  min?: ProductionUnitLimit;
  max?: ProductionUnitLimit;
  unitLabel?: string;
  editable?: boolean;
}
export const ProductionUnit = ({
  onChangeInput,
  onChangeSwitch,
  defaultValue,
  defaultChecked = false,
  value,
  checked,
  unitName = 'Production Unit',
  energy,
  energyCost = 0, // Deprecated fallback
  checkedImage,
  uncheckedImage,
  readonly = false,
  min = { value: 10, label: 'Pmin' },
  max = { value: 100, label: 'Pmax' },
  unitLabel = 'W',
  editable = true,
}: ProductionUnitProps) => {
  // Internal state management for uncontrolled mode
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const [internalValue, setInternalValue] = useState(defaultValue);

  // Support both old energyCost and new energy prop for backward compatibility
  const energyConfig: EnergyConfig = energy || { cost: energyCost };

  // Use controlled props if provided, otherwise use internal state
  const isChecked = checked !== undefined ? checked : internalChecked;
  const currentValue = value !== undefined ? value : internalValue;

  const handleSwitchChange = (newChecked: boolean) => {
    // Update internal state only if uncontrolled
    if (checked === undefined) {
      setInternalChecked(newChecked);
    }

    // Notify parent component if handler provided
    if (onChangeSwitch) {
      onChangeSwitch(newChecked);
    }
  };

  const handleInputChange = (val: string) => {
    // Only convert to number if the string is not empty and is a valid number
    if (val === '') {
      // Handle empty string case
      if (value === undefined) {
        setInternalValue(undefined);
      }
      if (onChangeInput) {
        onChangeInput(0); // or whatever default you prefer for empty values
      }
      return;
    }

    const numValue = parseFloat(val);
    if (!isNaN(numValue)) {
      // Update internal state only if uncontrolled
      if (value === undefined) {
        setInternalValue(numValue);
      }

      // Notify parent component if handler provided
      if (onChangeInput) {
        onChangeInput(numValue);
      }
    }
  };

  return (
    <div
      className="production-unit-container-box"
      style={{
        boxShadow: editable ? '0px 2px 16px 0px rgba(0, 0, 0, 0.16)' : 'none',
      }}
    >
      <div className="production-unit-container">
        <div className="production-unit-content">
          <div className="image-preview-container">
            {isChecked ? checkedImage : uncheckedImage}
            <div className="image-preview-label">{unitLabel}</div>
          </div>
          <div className="production-unit-chip">
            <div className="production-unit-chip-name">{unitName}</div>

            <div className="production-unit-energy-container">
              <Chip width="fit-content" bgColor="#E1F5FD">
                <ValueWithUnit cost={energyConfig.cost} textColor="#005896" />
              </Chip>
              {energyConfig.tooltipText && (
                <Tooltip content={energyConfig.tooltipText}>
                  <MaintenanceIcon size={16} />
                </Tooltip>
              )}
            </div>
          </div>
          <div className="production-unit-switch-container">
            <InputNumber
              label="PA"
              onChange={handleInputChange}
              value={currentValue !== undefined ? currentValue.toString() : undefined}
              disabled={!isChecked || readonly}
              min={{ value: min.value, label: min.label }}
              max={{ value: max.value, label: max.label, tooltipText: max.tooltipText }}
            />{' '}
          </div>
        </div>

        {editable ? (
          <Switch checked={isChecked} onChange={handleSwitchChange} disabled={readonly} />
        ) : isChecked ? (
          <Chip bgColor="#E1F5FD">
            <span style={{ color: '#005896' }}>Souscrit</span>
          </Chip>
        ) : null}
      </div>
    </div>
  );
};
