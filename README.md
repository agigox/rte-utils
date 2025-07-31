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

### Horizontal Orientation Example

```tsx
import React from 'react';
import { Histogram } from 'rte-utils';
import 'rte-utils/dist/index.css';

function HorizontalChart() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Histogram
        max={{ value: 100, color: "#D3D64E" }}
        relative={{ value: 75, color: "#C0C402" }}
        barWidth={200}  // This becomes height in horizontal mode
        barHeight={24}  // This becomes width in horizontal mode
        orientation="horizontal"
      >
        <div className="histogram-value-container">
          <p className="histogram-value">75</p>
          <p className="histogram-unit">%</p>
        </div>
        <div>
          <p className="histogram-label">Progress</p>
        </div>
      </Histogram>
    </div>
  );
}
```

### Custom Corner Radius Example

```tsx
import React from 'react';
import { Histogram } from 'rte-utils';
import 'rte-utils/dist/index.css';

function CustomCornerChart() {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {/* Rounded top corners only */}
      <Histogram
        max={{ value: 100, color: "#E0E0E0" }}
        relative={{ value: 60, color: "#4CAF50" }}
        barWidth={32}
        barHeight={120}
        cornerRadius={{ topLeft: 16, topRight: 16, bottomLeft: 0, bottomRight: 0 }}
      />
      
      {/* Fully rounded corners */}
      <Histogram
        max={{ value: 100, color: "#F0F0F0", opacity: 0.5 }}
        relative={{ value: 80, color: "#2196F3" }}
        barWidth={32}
        barHeight={120}
        cornerRadius={{ topLeft: 16, topRight: 16, bottomLeft: 16, bottomRight: 16 }}
      />
      
      {/* Asymmetric corners */}
      <Histogram
        max={{ value: 100, color: "#FFECB3" }}
        relative={{ value: 45, color: "#FF9800" }}
        barWidth={32}
        barHeight={120}
        cornerRadius={{ topLeft: 20, topRight: 4, bottomLeft: 4, bottomRight: 20 }}
      />
    </div>
  );
}
```

### Opacity and Advanced Styling Example

```tsx
import React from 'react';
import { Histogram } from 'rte-utils';
import 'rte-utils/dist/index.css';

function AdvancedStylingChart() {
  return (
    <Histogram
      max={{ value: 100, color: "#000000", opacity: 0.1 }}
      relative={{ value: 65, color: "#E91E63" }}
      barWidth={40}
      barHeight={150}
      orientation="vertical"
      cornerRadius={{ topLeft: 8, topRight: 8, bottomLeft: 4, bottomRight: 4 }}
    >
      <div className="histogram-value-container">
        <p className="histogram-value">65</p>
        <p className="histogram-unit">kW</p>
      </div>
      <div>
        <p className="histogram-label">Power Usage</p>
      </div>
    </Histogram>
  );
}
```

## Components

### Histogram

A histogram component with smooth animations for energy data visualization.

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `max` | `{ value: number; color: string; opacity?: number }` | ✅ | - | Maximum value configuration with value, color, and optional opacity |
| `relative` | `{ value: number; color: string }` | ✅ | - | Relative/current value configuration with value and color |
| `barHeight` | `number` | ❌ | `103` | Height of the histogram bar in pixels |
| `barWidth` | `number` | ❌ | `32` | Width of the histogram bar in pixels |
| `orientation` | `'vertical' \| 'horizontal'` | ❌ | `'vertical'` | Orientation of the histogram bars |
| `cornerRadius` | `{ topLeft?: number; topRight?: number; bottomLeft?: number; bottomRight?: number }` | ❌ | `{ topLeft: 2, topRight: 2, bottomLeft: 2, bottomRight: 2 }` | Individual corner radius configuration |
| `children` | `React.ReactNode` | ❌ | - | Child components (typically text content) |

#### Features

- **Smooth animations**: 1-second Chart.js-style transitions with easeOutQuart easing
- **Multiple orientations**: Support for both vertical and horizontal layouts
- **Individual corner control**: Customize each corner radius independently
- **Dynamic two-color visualization**: 
  - Background bar color defined by `max.color` represents the maximum value
  - Foreground bar color defined by `relative.color` represents the relative value
- **Opacity control**: Optional opacity setting for background bars
- **Smart corner rendering**: Foreground bars intelligently apply corner radii based on fill level
- **Customizable**: Colors, dimensions, orientations, and styling options
- **TypeScript support**: Full type definitions included

## Styling

The component uses external CSS classes for styling. Make sure to import the CSS file:

```tsx
import 'rte-utils/dist/index.css';
```

You can override the default styles by targeting the CSS classes:

- `.histogram-container` - Main container
- `.histogram-container--horizontal` - Horizontal layout modifier
- `.histogram-content` - Content wrapper
- `.histogram-content--horizontal` - Horizontal content modifier
- `.histogram-bar` - Bar container
- `.histogram-svg` - SVG element
- `.histogram-text-container` - Text content container
- `.histogram-text-container--horizontal` - Horizontal text layout modifier
- `.histogram-value-container` - Value display wrapper
- `.histogram-value` - Main value text
- `.histogram-unit` - Unit text
- `.histogram-label` - Label text

## License

MIT