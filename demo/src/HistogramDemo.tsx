import { useState } from "react";
import { Histogram } from "rte-utils";


export function HistogramDemo() {
  const [variableValue, setVariableValue] = useState<number>(56);
  return (
    <div style={{ marginTop: "1rem" }}>
      <h3>Histogram</h3>
      <div style={{ marginTop: "1rem" }}>
              <p>Variable Value: {variableValue}</p>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={() => setVariableValue((prev) => prev + 10)}>
                  Increase (+10)
                </button>
                <button onClick={() => setVariableValue((prev) => prev - 10)}>
                  Decrease (-10)
                </button>
                <button onClick={() => setVariableValue(56)}>Reset to 56</button>
              </div>
            </div>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "end",
          border: "1px solid #ccc",
          padding: "1rem",
        }}
      >
        <Histogram
          max={{ value: 100, color: "#D3D64E" }}
          relative={{ value: variableValue, color: "#C0C402" }}
          barWidth={32}
          barHeight={125}
        >
          <div className="histogram-value-container">
            <p className="histogram-value">{variableValue}</p>
            <p className="histogram-unit">MWh</p>
          </div>
          <div>
            <p className="histogram-label">Soutirage</p>
          </div>
        </Histogram>
        <Histogram
          max={{ value: 80, color: "#C7ABFA" }}
          relative={{ value: 42, color: "#A77CF7" }}
          barWidth={32}
          barHeight={94}
        >
          <div className="histogram-value-container">
            <p className="histogram-value">42</p>
            <p className="histogram-unit">MW</p>
          </div>
          <div>
            <p className="histogram-label">Injection</p>
          </div>
        </Histogram>
        <Histogram
          max={{ value: 80, color: "#C7ABFA" }}
          relative={{ value: 42, color: "#A77CF7" }}
          barWidth={16}
          barHeight={46}
        />
        <Histogram
          max={{ value: 100, color: "#D3D64E" }}
          relative={{ value: variableValue, color: "#C0C402" }}
          barWidth={16}
          barHeight={62}
        />
        <Histogram
          max={{ value: 100, color: "#000000", opacity: 0.2 }}
          relative={{ value: variableValue, color: "#4DA466" }}
          barWidth={24}
          barHeight={88}
          orientation="horizontal"
          cornerRadius={{
            topLeft: 12,
            topRight: 12,
            bottomLeft: 12,
            bottomRight: 12,
          }}
        />
      </div>
    </div>
  );
}
