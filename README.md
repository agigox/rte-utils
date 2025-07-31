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
import { Histogram } from 'rte-utils';
import 'rte-utils/dist/index.css';

function App() {
  return (
    <div>
      <Histogram
        max={{ value: 100, color: "#D3D64E" }}
        relative={{ value: 56, color: "#C0C402" }}
        barWidth={32}
      >
        <div className="histogram-value-container">
          <p className="histogram-value">56</p>
          <p className="histogram-unit">MWh</p>
        </div>
        <div>
          <p className="histogram-label">Soutirage</p>
        </div>
      </Histogram>
    </div>
  );
}

export default App;
```

### Advanced Example with Animation

```tsx
import React, { useState } from 'react';
import { Histogram } from 'rte-utils';
import 'rte-utils/dist/index.css';

function EnergyDashboard() {
  const [currentValue, setCurrentValue] = useState(45);

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Histogram
        max={{ value: 100, color: "#D3D64E" }}
        relative={{ value: currentValue, color: "#C0C402" }}
        barHeight={120}
        barWidth={40}
      >
        <div className="histogram-value-container">
          <p className="histogram-value">{currentValue}</p>
          <p className="histogram-unit">MWh</p>
        </div>
        <div>
          <p className="histogram-label">Consommation</p>
        </div>
      </Histogram>
      
      <button onClick={() => setCurrentValue(prev => prev + 10)}>
        Increase (+10)
      </button>
    </div>
  );
}
```

## Components

### Histogram

A histogram component with smooth animations for energy data visualization.

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `max` | `{ value: number; color: string }` | ✅ | - | Maximum value configuration with value and color |
| `relative` | `{ value: number; color: string }` | ✅ | - | Relative/current value configuration with value and color |
| `barHeight` | `number` | ❌ | `103` | Height of the histogram bar in pixels |
| `barWidth` | `number` | ❌ | `32` | Width of the histogram bar in pixels |
| `children` | `React.ReactNode` | ❌ | - | Child components (typically text content) |

#### Features

- **Smooth animations**: 2-second Chart.js-style transitions
- **Incremental updates**: Animations from previous to new values (not from 0)
- **Dynamic two-color visualization**: 
  - Background bar color defined by `max.color` represents the maximum value
  - Foreground bar color defined by `relative.color` represents the relative value
- **Customizable**: Colors, dimensions, and styling options
- **TypeScript support**: Full type definitions included

## Styling

The component uses external CSS classes for styling. Make sure to import the CSS file:

```tsx
import 'rte-utils/dist/index.css';
```

You can override the default styles by targeting the CSS classes:

- `.histogram-container`
- `.histogram-content`
- `.histogram-bar`
- `.histogram-svg`
- `.histogram-text-container`
- `.histogram-value-container`
- `.histogram-value`
- `.histogram-unit`
- `.histogram-label`

## License

MIT