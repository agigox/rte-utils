import React, { useState } from "react";
import { ProductionUnit } from "../../src/components";

export const ProductionUnitDemo: React.FC = () => {
  const [solarValue, setSolarValue] = useState(0);
  const [windValue, setWindValue] = useState(0);
  const [nuclearValue, setNuclearValue] = useState(0);
  const [solarOn, setSolarOn] = useState(false);
  const [windOn, setWindOn] = useState(false);
  const [nuclearOn, setNuclearOn] = useState(false);

  const totalProduction = (solarOn ? solarValue : 0) + (windOn ? windValue : 0) + (nuclearOn ? nuclearValue : 0);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px" }}>
      <h2>Production Unit Component Demo</h2>
      
      <div style={{ 
        marginBottom: "20px", 
        padding: "15px", 
        backgroundColor: "#f5f5f5", 
        borderRadius: "8px" 
      }}>
        <h3>Total Production: {totalProduction} MW</h3>
        <p>Toggle switches to activate/deactivate production units and adjust their output values.</p>
      </div>

      <div style={{ 
        display: "flex", 
        flexDirection: "column",
        marginBottom: "40px"
      }}>
        {/* Solar Panel Unit */}
        <ProductionUnit
          unitName="Solar Panel Array"
          energyCost={25}
          defaultChecked={true}
          defaultValue={50}
          checkedImage={
            <img 
              src="https://placehold.co/60x60/FFD700/000000/png?text=☀️" 
              alt="Solar Panel Active"
              style={{ borderRadius: "8px" }}
            />
          }
          uncheckedImage={
            <img 
              src="https://placehold.co/60x60/808080/FFFFFF/png?text=☀️" 
              alt="Solar Panel Inactive"
              style={{ borderRadius: "8px" }}
            />
          }
          onChangeInput={(value) => setSolarValue(value)}
          onChangeSwitch={(checked) => setSolarOn(checked)}
        />

        {/* Wind Turbine Unit */}
        <ProductionUnit
          unitName="Wind Turbine Farm"
          energyCost={40}
          defaultChecked={false}
          defaultValue={75}
          checkedImage={
            <div style={{
              width: 60,
              height: 60,
              borderRadius: '8px',
              backgroundColor: '#4CAF50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              animation: 'spin 2s linear infinite'
            }}>
              🌪️
            </div>
          }
          uncheckedImage={
            <div style={{
              width: 60,
              height: 60,
              borderRadius: '8px',
              backgroundColor: '#9E9E9E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              🌪️
            </div>
          }
          onChangeInput={(value) => setWindValue(value)}
          onChangeSwitch={(checked) => setWindOn(checked)}
        />

        {/* Nuclear Plant Unit */}
        <ProductionUnit
          unitName="Nuclear Power Plant"
          energyCost={1200}
          defaultChecked={true}
          defaultValue={800}
          checkedImage={
            <div style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              backgroundColor: '#2196F3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              color: 'white',
              fontWeight: 'bold',
              boxShadow: '0 0 15px rgba(33, 150, 243, 0.5)'
            }}>
              ⚛️
            </div>
          }
          uncheckedImage={
            <div style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              backgroundColor: '#F44336',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              color: 'white',
              fontWeight: 'bold'
            }}>
              ⚠️
            </div>
          }
          onChangeInput={(value) => setNuclearValue(value)}
          onChangeSwitch={(checked) => setNuclearOn(checked)}
        />
      </div>

      <div style={{ 
        padding: "20px", 
        backgroundColor: "#e3f2fd", 
        borderRadius: "8px" 
      }}>
        <h3>Production Status</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
          <div>
            <strong>Solar Panel:</strong> {solarOn ? `${solarValue} MW` : "Offline"}
          </div>
          <div>
            <strong>Wind Turbine:</strong> {windOn ? `${windValue} MW` : "Offline"}
          </div>
          <div>
            <strong>Nuclear Plant:</strong> {nuclearOn ? `${nuclearValue} MW` : "Offline"}
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
