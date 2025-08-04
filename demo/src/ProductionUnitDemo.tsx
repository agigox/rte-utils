import React, { useState } from "react";
import { Avatar, ProductionUnit } from "../../src/components";
import Lottie from "lottie-react";
import NuclearAnimation from "./assets/NuclearAnimation.json";

export const ProductionUnitDemo: React.FC = () => {
  const [solarValue, setSolarValue] = useState(0);
  const [windValue, setWindValue] = useState(0);
  const [nuclearValue, setNuclearValue] = useState(0);
  const [solarOn, setSolarOn] = useState(false);
  const [windOn, setWindOn] = useState(false);
  const [nuclearOn, setNuclearOn] = useState(false);

  const totalProduction =
    (solarOn ? solarValue : 0) +
    (windOn ? windValue : 0) +
    (nuclearOn ? nuclearValue : 0);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px" }}>
      <h2>Production Unit Component Demo</h2>

      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h3>Total Production: {totalProduction} MW</h3>
        <p>
          Toggle switches to activate/deactivate production units and adjust
          their output values.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "40px",
        }}
      >
        {/* Nuclear Plant Unit */}
        <ProductionUnit
          unitName="Chalaronne"
          energyCost={1200}
          defaultChecked={true}
          defaultValue={800}
          readonly={false}
          checkedImage={
            <Avatar>
              <Lottie
                animationData={NuclearAnimation}
                style={{ width: 80, height: 80 }}
                loop={true}
              />
            </Avatar>
          }
          uncheckedImage={<Avatar>JD</Avatar>}
          onChangeInput={(value) => setNuclearValue(value)}
          onChangeSwitch={(checked) => setNuclearOn(checked)}
        />
      </div>

      <div
        style={{
          padding: "20px",
          backgroundColor: "#e3f2fd",
          borderRadius: "8px",
        }}
      >
        <h3>Production Status</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "10px",
          }}
        >
          <div>
            <strong>Solar Panel:</strong>{" "}
            {solarOn ? `${solarValue} MW` : "Offline"}
          </div>
          <div>
            <strong>Wind Turbine:</strong>{" "}
            {windOn ? `${windValue} MW` : "Offline"}
          </div>
          <div>
            <strong>Nuclear Plant:</strong>{" "}
            {nuclearOn ? `${nuclearValue} MW` : "Offline"}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
