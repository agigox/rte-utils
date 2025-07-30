# RTE Utils

React components library in TypeScript for agigox projects.

## Installation

```bash
npm install rte-utils
```

## Usage

### Import Component and Styles

You need to import both the component and its CSS styles:

```tsx
import { Histogramme } from 'rte-utils';
import 'rte-utils/dist/index.css'; // Import the CSS styles
```

### Basic Example

```tsx
import React from 'react';
import { Histogramme } from 'rte-utils';
import 'rte-utils/dist/index.css';

function App() {
  return (
    <div>
      <Histogramme
        maxValue={100}
        relativeValue={56}
        value={56}
        unit="MWh"
        label="Soutirage"
      />
    </div>
  );
}

export default App;
```

### Advanced Example with Animation

```tsx
import React, { useState } from 'react';
import { Histogramme } from 'rte-utils';
import 'rte-utils/dist/index.css';

function EnergyDashboard() {
  const [currentValue, setCurrentValue] = useState(45);

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Histogramme
        maxValue={100}
        relativeValue={currentValue}
        value={currentValue}
        unit="MWh"
        label="Consommation"
        backgroundColor="#0066cc"
        barHeight={120}
        width={60}
      />
      
      <button onClick={() => setCurrentValue(prev => prev + 10)}>
        Increase (+10)
      </button>
    </div>
  );
}
```

## Components

### Histogramme

A histogram component with smooth animations for energy data visualization.

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `maxValue` | `number` | ✅ | - | Maximum value for the bar chart |
| `relativeValue` | `number` | ✅ | - | Relative/current value to compare against max |
| `value` | `number` | ✅ | - | Value to display in text |
| `unit` | `string` | ✅ | - | Unit label (e.g., "MWh") |
| `label` | `string` | ✅ | - | Description label (e.g., "Soutirage") |
| `backgroundColor` | `string` | ❌ | `#005896` | Background color of the container |
| `barHeight` | `number` | ❌ | `103` | Height of the histogram bar in pixels |
| `width` | `number` | ❌ | `54` | Width of the component in pixels |

#### Features

- **Smooth animations**: 2-second Chart.js-style transitions
- **Incremental updates**: Animations from previous to new values (not from 0)
- **Two-color visualization**: 
  - Background bar (`#D3D64E`) represents the maximum value
  - Foreground bar (`#C0C402`) represents the relative value
- **Customizable**: Colors, dimensions, and styling options
- **TypeScript support**: Full type definitions included

## Styling

The component uses external CSS classes for styling. Make sure to import the CSS file:

```tsx
import 'rte-utils/dist/index.css';
```

You can override the default styles by targeting the CSS classes:

- `.histogramme-container`
- `.histogramme-content`
- `.histogramme-bar`
- `.histogramme-svg`
- `.histogramme-text-container`
- `.histogramme-value-container`
- `.histogramme-value`
- `.histogramme-unit`
- `.histogramme-label`

## License

MIT