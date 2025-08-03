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
        <Chip label="Default Chip" />

        <Chip label="-1488 MWh" bgColor="#FCE8E7" textColor="#C81640" />

        <Chip label="+64 €" bgColor="#D3EAD9" textColor="#176B57" />

        <Chip label="Error" bgColor="#f8d7da" textColor="#721c24" />

        <Chip label="Info" bgColor="#d1ecf1" textColor="#0c5460" />

        <Chip label="Custom Blue" bgColor="#007bff" textColor="#ffffff" />

        <Chip label="Custom Purple" bgColor="#6f42c1" textColor="#ffffff" />

        <Chip
          label="Long Chip Label Example"
          bgColor="#28a745"
          textColor="#ffffff"
        />
      </div>
    </div>
  );
}
