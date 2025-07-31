import { useState } from "react";
import { Histogram } from "rte-utils";
import 'rte-utils/dist/index.css'; // Import the CSS styles
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
          <h3>Histogram</h3>
          <div style={{ display: "flex", gap: "1rem", alignItems: "start" }}>
            <Histogram
              max={{ value: 100, color: "#D3D64E" }}
              relative={{ value: variableValue, color: "#C0C402" }}
              barWidth={40}
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
            >
              <div className="histogram-value-container">
                <p className="histogram-value">42</p>
                <p className="histogram-unit">MW</p>
              </div>
              <div>
                <p className="histogram-label">Injection</p>
              </div>
            </Histogram>
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
