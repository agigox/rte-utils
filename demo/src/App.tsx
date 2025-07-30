import { useState } from "react";
import { Histogramme } from "rte-utils";

function App() {
  const [variableValue, setVariableValue] = useState(56);
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Agigox Utils Demo</h1>
      <p>Demo application for testing rte-utils components</p>

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

      <div style={{ marginTop: "2rem" }}>
        <h2>Components</h2>

        <div style={{ marginTop: "1rem" }}>
          <h3>Histogramme</h3>
          <div style={{ display: "flex", gap: "1rem", alignItems: "start" }}>
            <Histogramme
              maxValue={100}
              relativeValue={variableValue}
              value={variableValue}
              unit="MWh"
              label="Soutirage"
            />
            <Histogramme
              maxValue={80}
              relativeValue={42}
              value={42}
              unit="MW"
              label="Injection"
              backgroundColor="#0066cc"
            />
          </div>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Hooks</h2>
        <p>Test your custom hooks here...</p>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Utils</h2>
        <p>Test your utility functions here...</p>
      </div>
    </div>
  );
}

export default App;
