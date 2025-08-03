import { Input } from "./Input";
import { Switch } from "./Switch";
import "./ProductionUnit.css";
import { Chip } from "./Chip";
interface ImagePreviewProps {
  checked?: boolean;
}
const ImagePreview: React.FC<ImagePreviewProps> = ({ checked }) => {
  return (
    <div className="image-preview-container">
      <img
        src={
          checked
            ? "https://placehold.co/60x60/000000/FFFFFF/png"
            : "https://placehold.co/60x60/FF0000/000000/png"
        }
        alt={checked ? "Checked" : "Unchecked"}
      />
    </div>
  );
};
interface ProductionUnitProps {
  onChangeInput?: (value: number) => void;
  onChangeSwitch?: (checked: boolean) => void;
  value?: number;
  checked?: boolean;
  unitName?: string;
  energyCost?: number;
}
export const ProductionUnit = ({
  onChangeInput,
  onChangeSwitch,
  value,
  checked,
  unitName = "Production Unit",
  energyCost = 0,
}: ProductionUnitProps) => {
  return (
    <div className="production-unit-container">
      <ImagePreview checked={checked} />
      <div>{unitName}</div>
      <Chip label={`${energyCost} MW`} />
      <Input
        label="PA"
        type="number"
        onChange={
          onChangeInput
            ? (val: string) => onChangeInput(Number(val))
            : undefined
        }
        value={value !== undefined ? value.toString() : undefined}
      />
      <Switch
        checked={checked}
        onChange={onChangeSwitch}
        className="production-unit-switch"
      />
    </div>
  );
};
