import { useState } from "react";
import { Input } from "./Input";
import { Switch } from "./Switch";
import "./ProductionUnit.css";
import { Chip } from "./Chip";
import { ProductionUnitContainer } from "./ProductionUnitContainer";

type ProductionUnitLimit = {
  value: number;
  label?: string;
};
interface ProductionUnitProps {
  onChangeInput?: (value: number) => void;
  onChangeSwitch?: (checked: boolean) => void;
  defaultValue?: number;
  defaultChecked?: boolean;
  value?: number;
  checked?: boolean;
  unitName?: string;
  energyCost?: number;
  checkedImage?: React.ReactNode;
  uncheckedImage?: React.ReactNode;
  readonly?: boolean;
  min?: ProductionUnitLimit;
  max?: ProductionUnitLimit;
}
export const ProductionUnit = ({
  onChangeInput,
  onChangeSwitch,
  defaultValue,
  defaultChecked = false,
  value,
  checked,
  unitName = "Production Unit",
  energyCost = 0,
  checkedImage,
  uncheckedImage,
  readonly = false,
  min = { value: 10, label: "Pmin" },
  max = { value: 100, label: "Pmax" },
}: ProductionUnitProps) => {
  // Internal state management for uncontrolled mode
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const [internalValue, setInternalValue] = useState(defaultValue);

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
    const numValue = Number(val);
    // Update internal state only if uncontrolled
    if (value === undefined) {
      setInternalValue(numValue);
    }

    // Notify parent component if handler provided
    if (onChangeInput) {
      onChangeInput(numValue);
    }
  };

  return (
    <ProductionUnitContainer>
      <div className="production-unit-container">
        <div className="production-unit-content">
          <div className="image-preview-container">
            {isChecked ? checkedImage : uncheckedImage}
          </div>
          <div className="production-unit-chip">
            <div className="production-unit-chip-name">{unitName}</div>

            <Chip
              label={`${energyCost} MW`}
              width="fit-content"
              bgColor="#E1F5FD"
              textColor="#005896"
            />
          </div>
          <div className="production-unit-switch-container">
            <Input
              label="PA"
              type="number"
              onChange={handleInputChange}
              value={
                currentValue !== undefined ? currentValue.toString() : undefined
              }
              disabled={!isChecked || readonly}
              min={{ value: min.value, label: min.label }}
              max={{ value: max.value, label: max.label }}
            />{" "}
          </div>
        </div>

        <Switch
          checked={isChecked}
          onChange={handleSwitchChange}
          disabled={readonly}
        />
      </div>
    </ProductionUnitContainer>
  );
};
