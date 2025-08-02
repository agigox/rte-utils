import React, { useState } from 'react';
import { Input } from '../../src/components';

export const InputDemo: React.FC = () => {
  const [basicValue, setBasicValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errorValue, setErrorValue] = useState('');
  const [prefilledValue, setPrefilled] = useState('Pre-filled value');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleErrorValueChange = (value: string) => {
    setErrorValue(value);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h2>Input Component Demo</h2>
      
      <div style={{ marginBottom: '30px' }}>
        <h3>Basic Input with Floating Label</h3>
        <Input
          label="PA"
          value={basicValue}
          onChange={setBasicValue}
        />
        <p>Current value: "{basicValue}"</p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Email Input</h3>
        <Input
          label="Email Address"
          type="email"
          value={emailValue}
          onChange={setEmailValue}
          required
        />
        <p>Current value: "{emailValue}"</p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Password Input</h3>
        <Input
          label="Password"
          type="password"
          value={passwordValue}
          onChange={setPasswordValue}
          required
        />
        <p>Current value length: {passwordValue.length} characters</p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Input with Error State</h3>
        <Input
          label="Email with validation"
          type="email"
          value={errorValue}
          onChange={handleErrorValueChange}
          error={errorValue && !validateEmail(errorValue) ? 'Please enter a valid email address' : undefined}
        />
        <p>Current value: "{errorValue}"</p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Pre-filled Input</h3>
        <Input
          label="Username"
          value={prefilledValue}
          onChange={setPrefilled}
        />
        <p>Shows floating label from start when there's a value</p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Disabled Input</h3>
        <Input
          label="Disabled Field"
          value="Cannot edit this"
          disabled
        />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Different Input Types</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input label="Text Input" type="text" />
          <Input label="Number Input" type="number" />
          <Input label="Email Input" type="email" />
          <Input label="Password Input" type="password" />
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Animation Demo</h3>
        <p>Click in and out of the inputs above to see the floating label animation in action:</p>
        <ul>
          <li>Label starts in the center as placeholder</li>
          <li>On focus or when typing, label moves to top and changes color</li>
          <li>Label stays at top when input has content</li>
          <li>Returns to center when input is empty and unfocused</li>
        </ul>
      </div>
    </div>
  );
};