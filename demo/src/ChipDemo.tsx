import { Chip } from "rte-utils";

export function ChipDemo() {
  return (
    <div style={{ marginTop: "1rem" }}>
      <h3>Chip</h3>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          flexWrap: "wrap",
          border: "1px solid #ccc",
          padding: "1rem",
        }}
      >
        <Chip>Default Chip</Chip>

        <Chip bgColor="#FCE8E7">-1488 MWh</Chip>

        <Chip bgColor="#D3EAD9">+64 €</Chip>

        <Chip bgColor="#f8d7da">Error</Chip>

        <Chip bgColor="#d1ecf1">Info</Chip>

        <Chip bgColor="#007bff">Custom Blue</Chip>

        <Chip bgColor="#6f42c1">Custom Purple</Chip>

        <Chip bgColor="#28a745">Long Chip Label Example</Chip>

        {/* Advanced examples with complex children */}
        <Chip bgColor="#e0f2fe">
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span>⚡</span>
            With Icon
          </span>
        </Chip>

        <Chip bgColor="#f3e8ff">
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            Status
            <span
              style={{
                backgroundColor: "#10b981",
                color: "white",
                borderRadius: "50%",
                width: "16px",
                height: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                fontWeight: "bold",
              }}
            >
              5
            </span>
          </div>
        </Chip>
      </div>
    </div>
  );
}
