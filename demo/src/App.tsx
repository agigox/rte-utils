import { useState } from "react";
import "rte-utils/dist/index.css"; // Import the CSS styles
import { HistogramDemo } from "./HistogramDemo";
import { ChipDemo } from "./ChipDemo";
import { SwitchDemo } from "./SwitchDemo";
import { InputNumberDemo } from "./InputNumberDemo";
import { ProductionUnitDemo } from "./ProductionUnitDemo";
import { AvatarDemo } from "./AvatarDemo";

type DemoTab =
  | "production-unit"
  | "histogram"
  | "chip"
  | "switch"
  | "input-number"
  | "avatar";

function App() {
  const [activeTab, setActiveTab] = useState<DemoTab>("production-unit");

  const tabs = [
    {
      id: "production-unit" as const,
      label: "Production Unit",
      component: <ProductionUnitDemo />,
    },
    {
      id: "histogram" as const,
      label: "Histogram",
      component: <HistogramDemo />,
    },
    { id: "chip" as const, label: "Chip", component: <ChipDemo /> },
    { id: "switch" as const, label: "Switch", component: <SwitchDemo /> },
    {
      id: "input-number" as const,
      label: "InputNumber",
      component: <InputNumberDemo />,
    },
    { id: "avatar" as const, label: "Avatar", component: <AvatarDemo /> },
  ];

  const activeComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>RTE Utils Demo</h1>
      <p>Interactive demo application for testing rte-utils components</p>

      {/* Tab Navigation */}
      <div
        style={{
          marginTop: "2rem",
          marginBottom: "2rem",
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          borderBottom: "1px solid #e0e0e0",
          paddingBottom: "1rem",
        }}
      >
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              backgroundColor: activeTab === tab.id ? "#007bff" : "#f8f9fa",
              color: activeTab === tab.id ? "#ffffff" : "#6c757d",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
              border: "2px solid transparent",
              fontSize: "14px",
              fontWeight: activeTab === tab.id ? "600" : "400",
              userSelect: "none",
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.backgroundColor = "#e9ecef";
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.backgroundColor = "#f8f9fa";
              }
            }}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Active Component */}
      <div style={{ marginTop: "2rem" }}>{activeComponent}</div>

      {/* Footer Info */}
      <div
        style={{
          marginTop: "3rem",
          padding: "1rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          fontSize: "0.9rem",
          color: "#6c757d",
        }}
      >
        <p>
          <strong>Navigation:</strong> Click on the tabs above to switch between
          different component demos.
        </p>
        <p>
          <strong>Components:</strong> {tabs.length} available components to
          explore.
        </p>
      </div>
    </div>
  );
}

export default App;
