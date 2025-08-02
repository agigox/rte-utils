import { Input } from "./Input";
import { Switch } from "./Switch";
interface ProductionUnitProps {
  onChangeInput?: (value: string) => void;
  onChangeSwitch?: (checked: boolean) => void;
  value?: string;
  checked?: boolean;
}
export const ProductionUnit = ({
  onChangeInput,
  onChangeSwitch,
  value,
  checked,
}: ProductionUnitProps) => {
  return (
    <div className="production-unit-container">
      <Input
        label="Production Unit"
        type="number"
        onChange={onChangeInput}
        value={value}
      />
      <Switch
        label="Production Unit"
        checked={checked}
        onChange={onChangeSwitch}
        className="production-unit-switch"
      />
    </div>
  );
};
