import { Input } from "./Input";
import { Switch } from "./Switch";

export const ProductionUnit = () => {
  return (
    <div className="production-unit-container">
      <Input label="Production Unit" type="number" />
      <Switch
        label="Production Unit"
        checked={true}
        onChange={(checked) => console.log("Switch toggled:", checked)}
        className="production-unit-switch"
      />
    </div>
  );
};
