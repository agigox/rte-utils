import React from 'react';
import { InputNumber } from '../../src/components';

export const InputNumberDemo: React.FC = () => {
  const [currentValue, setCurrentValue] = React.useState('');

  return (
    <div>
      <h2>InputNumber Component Demo</h2>

      <InputNumber
        label="PA"
        value={currentValue}
        onChange={setCurrentValue}
        min={{ value: 0, label: 'Min' }}
        max={{ value: 1000, label: 'Max' }}
      />
      <h2>Current Value: {currentValue}</h2>
    </div>
  );
};
