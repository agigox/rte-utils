import { useState } from "react";
import { Input } from "./Input";
import { Switch } from "./Switch";
import "./ProductionUnit.css";
import { Chip } from "./Chip";

interface ProductionUnitProps {
  onChangeInput?: (value: number) => void;
  onChangeSwitch?: (checked: boolean) => void;
  defaultValue?: number;
  defaultChecked?: boolean;
  unitName?: string;
  energyCost?: number;
  checkedImage?: React.ReactNode;
  uncheckedImage?: React.ReactNode;
  readonly?: boolean;
}
export const ProductionUnit = ({
  onChangeInput,
  onChangeSwitch,
  defaultValue,
  defaultChecked = false,
  unitName = "Production Unit",
  energyCost = 0,
  checkedImage,
  uncheckedImage,
  readonly = false,
}: ProductionUnitProps) => {
  // Internal state management
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const [internalValue, setInternalValue] = useState(defaultValue);

  const handleSwitchChange = (newChecked: boolean) => {
    // Update internal state
    setInternalChecked(newChecked);

    // Notify parent component if handler provided
    if (onChangeSwitch) {
      onChangeSwitch(newChecked);
    }
  };

  const handleInputChange = (val: string) => {
    const numValue = Number(val);
    // Update internal state
    setInternalValue(numValue);

    // Notify parent component if handler provided
    if (onChangeInput) {
      onChangeInput(numValue);
    }
  };

  return (
    <div className="production-unit-container">
      <div className="production-unit-content">
        <div className="image-preview-container">
          {internalChecked ? checkedImage : uncheckedImage}
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
              internalValue !== undefined ? internalValue.toString() : undefined
            }
            disabled={!internalChecked || readonly}
          />{" "}
        </div>
      </div>

      <Switch
        checked={internalChecked}
        onChange={handleSwitchChange}
        disabled={readonly}
      />
    </div>
  );
};
