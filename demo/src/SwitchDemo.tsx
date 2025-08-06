import React, { useState } from "react";
import { Switch } from "../../src/components";

export const SwitchDemo: React.FC = () => {
  const [basicSwitch, setBasicSwitch] = useState(false);
  const [labeledSwitch, setLabeledSwitch] = useState(true);
  const [powerSwitch, setPowerSwitch] = useState(false);
  const [disabledSwitch] = useState(false);

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h2>Switch Component Demo</h2>

      <div style={{ marginBottom: "30px" }}>
        <h3>Basic Switch (with icon)</h3>
        <Switch checked={basicSwitch} onChange={setBasicSwitch} />
        <p>State: {basicSwitch ? "On" : "Off"}</p>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h3>Switch with Text Label</h3>
        <Switch
          checked={labeledSwitch}
          onChange={setLabeledSwitch}
          showIcon={false}
          label="Power Mode"
        />
        <p>State: {labeledSwitch ? "On" : "Off"}</p>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h3>Icon vs Label Examples</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Switch
              checked={powerSwitch}
              onChange={setPowerSwitch}
              showIcon={true}
            />
            <span>With power icon</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Switch
              checked={powerSwitch}
              onChange={setPowerSwitch}
              showIcon={false}
              label="ON/OFF"
            />
            <span>With text label</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Switch
              checked={powerSwitch}
              onChange={setPowerSwitch}
              showIcon={false}
            />
            <span>Without icon or label</span>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h3>Disabled States</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Switch checked={disabledSwitch} disabled showIcon={true} />
            <span>Disabled with icon</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Switch checked={true} disabled showIcon={false} label="Disabled" />
            <span>Disabled with label</span>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h3>Various Label Examples</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          <Switch checked={false} showIcon={false} label="Start" />
          <Switch checked={true} showIcon={false} label="Active" />
          <Switch checked={false} showIcon={false} label="Mode" />
          <Switch checked={true} showIcon={false} label="🔋" />
          <Switch checked={false} showIcon={false} label="Wi-Fi" />
        </div>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h3>Priority Demo (Icon takes precedence)</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Switch
              checked={true}
              showIcon={true}
              label="This label won't show"
            />
            <span>Both showIcon=true and label provided → Icon is shown</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Switch
              checked={true}
              showIcon={false}
              label="This label will show"
            />
            <span>showIcon=false and label provided → Label is shown</span>
          </div>
        </div>
      </div>
    </div>
  );
};
