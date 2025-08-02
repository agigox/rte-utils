import React, { useState } from 'react';
import { Switch } from '../../src/components';

export const SwitchDemo: React.FC = () => {
  const [basicSwitch, setBasicSwitch] = useState(false);
  const [labeledSwitch, setLabeledSwitch] = useState(true);
  const [disabledSwitch] = useState(false);

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h2>Switch Component Demo</h2>
      
      <div style={{ marginBottom: '30px' }}>
        <h3>Basic Switch</h3>
        <Switch
          checked={basicSwitch}
          onChange={setBasicSwitch}
        />
        <p>State: {basicSwitch ? 'On' : 'Off'}</p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Switch with Label</h3>
        <Switch
          label="Enable notifications"
          checked={labeledSwitch}
          onChange={setLabeledSwitch}
        />
        <p>State: {labeledSwitch ? 'On' : 'Off'}</p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Different Sizes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Switch label="Small" size="small" />
          <Switch label="Medium (default)" size="medium" />
          <Switch label="Large" size="large" />
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Disabled Switch</h3>
        <Switch
          label="Disabled switch"
          checked={disabledSwitch}
          disabled
        />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>With and Without Icons</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Switch label="With power icon" showIcon={true} />
          <Switch label="Without icon" showIcon={false} />
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Figma Design Recreation</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <Switch checked={false} showIcon={true} />
            <span style={{ fontSize: '12px', color: '#666' }}>Off State</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <Switch checked={true} showIcon={true} />
            <span style={{ fontSize: '12px', color: '#666' }}>On State</span>
          </div>
        </div>
      </div>
    </div>
  );
};