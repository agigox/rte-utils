import React from "react";
import { Input } from "../../src/components";

export const InputDemo: React.FC = () => {
  const [currentValue, setCurrentValue] = React.useState("");

  return (
    <div>
      <h2>Input Component Demo</h2>

      <Input
        label="PA"
        type="number"
        value={currentValue}
        onChange={setCurrentValue}
      />
      <h2>Current Value: {currentValue}</h2>
    </div>
  );
};
