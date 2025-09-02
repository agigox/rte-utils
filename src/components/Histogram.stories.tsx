import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Histogram } from './Histogram';

const meta: Meta<typeof Histogram> = {
  title: 'Components/Histogram',
  component: Histogram,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A Histogram component with smooth animations for energy data visualization. Supports both vertical and horizontal orientations with customizable corner radii.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    max: {
      control: 'object',
      description: 'Maximum value configuration with value, color, and optional opacity',
    },
    relative: {
      control: 'object',
      description: 'Relative/current value configuration with value and color',
    },
    barHeight: {
      control: 'number',
      description: 'Height of the histogram bar in pixels',
    },
    barWidth: {
      control: 'number',
      description: 'Width of the histogram bar in pixels',
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Orientation of the histogram bars',
    },
    cornerRadius: {
      control: 'object',
      description: 'Individual corner radius configuration',
    },
    showGain: {
      control: 'boolean',
      description: 'Enable gain display when relative value increases',
    },
    children: {
      control: 'text',
      description: 'Child components (typically text content)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    max: { value: 100, color: '#D3D64E' },
    relative: { value: 56, color: '#C0C402' },
    barWidth: 32,
    barHeight: 125,
    children: (
      <>
        <div className="histogram-value-container">
          <p className="histogram-value">56</p>
          <p className="histogram-unit">MWh</p>
        </div>
        <div>
          <p className="histogram-label">Power</p>
        </div>
      </>
    ),
  },
};

export const WithoutText: Story = {
  args: {
    max: { value: 80, color: '#C7ABFA' },
    relative: { value: 42, color: '#A77CF7' },
    barWidth: 32,
    barHeight: 94,
  },
};

export const Horizontal: Story = {
  args: {
    max: { value: 100, color: '#000000', opacity: 0.2 },
    relative: { value: 75, color: '#4DA466' },
    barWidth: 24,
    barHeight: 88,
    orientation: 'horizontal',
    cornerRadius: {
      topLeft: 12,
      topRight: 12,
      bottomLeft: 12,
      bottomRight: 12,
    },
  },
};

export const CustomCorners: Story = {
  args: {
    max: { value: 100, color: '#FFE0B2' },
    relative: { value: 65, color: '#FF9800' },
    barWidth: 32,
    barHeight: 120,
    cornerRadius: {
      topLeft: 20,
      topRight: 4,
      bottomLeft: 4,
      bottomRight: 20,
    },
    children: (
      <>
        <div className="histogram-value-container">
          <p className="histogram-value">65</p>
          <p className="histogram-unit">kW</p>
        </div>
        <div>
          <p className="histogram-label">Usage</p>
        </div>
      </>
    ),
  },
};

export const SmallSize: Story = {
  args: {
    max: { value: 100, color: '#E3F2FD' },
    relative: { value: 30, color: '#2196F3' },
    barWidth: 16,
    barHeight: 46,
  },
};

export const LargeSize: Story = {
  args: {
    max: { value: 200, color: '#E8F5E8' },
    relative: { value: 150, color: '#4CAF50' },
    barWidth: 48,
    barHeight: 180,
    children: (
      <>
        <div className="histogram-value-container">
          <p className="histogram-value">150</p>
          <p className="histogram-unit">GWh</p>
        </div>
        <div>
          <p className="histogram-label">Production</p>
        </div>
      </>
    ),
  },
};

export const SmallValueWithRounding: Story = {
  args: {
    max: { value: 100, color: '#E0E0E0' },
    relative: { value: 2, color: '#FF4444' },
    barHeight: 100,
    barWidth: 32,
    orientation: 'vertical',
    cornerRadius: {
      topLeft: 8,
      topRight: 8,
      bottomLeft: 8,
      bottomRight: 8,
    },
    children: (
      <>
        <div className="histogram-value-container">
          <p className="histogram-value">2</p>
          <p className="histogram-unit">MWh</p>
        </div>
        <div>
          <p className="histogram-label">Low Production</p>
        </div>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the rendering issue with small values and corner radius where fill color may overflow.',
      },
    },
  },
};



export const HorizontalFullWidth: Story = {
  args: {
    barHeight: 88,
    barWidth: 24,
    cornerRadius: {
      bottomLeft: 12,
      bottomRight: 12,
      topLeft: 12,
      topRight: 12,
    },
    max: {
      color: '#000000',
      opacity: 0.2,
      value: 10000,
    },
    orientation: 'horizontal',
    relative: {
      color: '#4DA466',
      value: 10000,
    },
    children: (
      <>
        <div className="histogram-value-container">
          <p className="histogram-value">10000</p>
          <p className="histogram-unit">MW</p>
        </div>
        <div>
          <p className="histogram-label">Full Width Test</p>
        </div>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests horizontal orientation with relative = max (should fill completely)',
      },
    },
  },
};

export const HorizontalHalfWidth: Story = {
  args: {
    barHeight: 88,
    barWidth: 24,
    cornerRadius: {
      bottomLeft: 12,
      bottomRight: 12,
      topLeft: 12,
      topRight: 12,
    },
    max: {
      color: '#000000',
      opacity: 0.2,
      value: 100,
    },
    orientation: 'horizontal',
    relative: {
      color: '#4DA466',
      value: 50,
    },
    children: (
      <>
        <div className="histogram-value-container">
          <p className="histogram-value">50</p>
          <p className="histogram-unit">MW</p>
        </div>
        <div>
          <p className="histogram-label">Half Width Test</p>
        </div>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests horizontal orientation with relative = 50% of max (should be in the middle)',
      },
    },
  },
};

export const OrientationComparison: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Side-by-side comparison of vertical vs horizontal orientation with identical relative values to verify the fix.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 16px 0' }}>Vertical (50%)</h4>
        <Histogram
          max={{ value: 100, color: '#000000', opacity: 0.2 }}
          relative={{ value: 50, color: '#4DA466' }}
          barHeight={88}
          barWidth={24}
          orientation="vertical"
          cornerRadius={{ topLeft: 12, topRight: 12, bottomLeft: 12, bottomRight: 12 }}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 16px 0' }}>Horizontal (50%)</h4>
        <Histogram
          max={{ value: 100, color: '#000000', opacity: 0.2 }}
          relative={{ value: 50, color: '#4DA466' }}
          barHeight={88}
          barWidth={24}
          orientation="horizontal"
          cornerRadius={{ topLeft: 12, topRight: 12, bottomLeft: 12, bottomRight: 12 }}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 16px 0' }}>Vertical (100%)</h4>
        <Histogram
          max={{ value: 100, color: '#000000', opacity: 0.2 }}
          relative={{ value: 100, color: '#4DA466' }}
          barHeight={88}
          barWidth={24}
          orientation="vertical"
          cornerRadius={{ topLeft: 12, topRight: 12, bottomLeft: 12, bottomRight: 12 }}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 16px 0' }}>Horizontal (100%)</h4>
        <Histogram
          max={{ value: 100, color: '#000000', opacity: 0.2 }}
          relative={{ value: 100, color: '#4DA466' }}
          barHeight={88}
          barWidth={24}
          orientation="horizontal"
          cornerRadius={{ topLeft: 12, topRight: 12, bottomLeft: 12, bottomRight: 12 }}
        />
      </div>
    </div>
  ),
};

export const WithGainDisplay: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the gain display feature. Click the button to increase the value by 20 points and see the gain animation.',
      },
    },
  },
  render: () => {
    const [value, setValue] = React.useState(30);
    
    const handleIncrease = () => {
      setValue(prev => Math.min(prev + 20, 100)); // Increase by 20, max 100
    };
    
    const handleReset = () => {
      setValue(30); // Reset to initial value
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={handleIncrease}
            disabled={value >= 100}
            style={{
              padding: '8px 16px',
              backgroundColor: value >= 100 ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: value >= 100 ? 'not-allowed' : 'pointer'
            }}
          >
            Gain +20 Points
          </button>
          <button 
            onClick={handleReset}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Current Value: {value}</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Click "Gain +20 Points" to see the gain animation</div>
          </div>
          <Histogram
            max={{ value: 100, color: '#000000', opacity: 0.2 }}
            relative={{ value: value, color: '#4DA466' }}
            barHeight={120}
            barWidth={32}
            orientation="vertical"
            showGain={true}
            cornerRadius={{ topLeft: 8, topRight: 8, bottomLeft: 8, bottomRight: 8 }}
          >
            <div className="histogram-value-container">
              <span className="histogram-value">{value}</span>
              <span className="histogram-unit">pts</span>
            </div>
            <span className="histogram-label">Score</span>
          </Histogram>
        </div>
      </div>
    );
  },
};

export const WithGainDisplayHorizontal: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the gain display feature in horizontal orientation. Click the button to increase the value and see the gain animation.',
      },
    },
  },
  render: () => {
    const [value, setValue] = React.useState(40);
    
    const handleIncrease = () => {
      setValue(prev => Math.min(prev + 15, 100)); // Increase by 15, max 100
    };
    
    const handleReset = () => {
      setValue(40); // Reset to initial value
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={handleIncrease}
            disabled={value >= 100}
            style={{
              padding: '8px 16px',
              backgroundColor: value >= 100 ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: value >= 100 ? 'not-allowed' : 'pointer'
            }}
          >
            Gain +15 Points
          </button>
          <button 
            onClick={handleReset}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Current Value: {value}</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Horizontal orientation with gain display</div>
          </div>
          <Histogram
            max={{ value: 100, color: '#000000', opacity: 0.2 }}
            relative={{ value: value, color: '#28a745' }}
            barHeight={120}
            barWidth={24}
            orientation="horizontal"
            showGain={true}
            cornerRadius={{ topLeft: 6, topRight: 6, bottomLeft: 6, bottomRight: 6 }}
          >
            <div className="histogram-value-container">
              <span className="histogram-value">{value}</span>
              <span className="histogram-unit">pts</span>
            </div>
            <span className="histogram-label">Energy Score</span>
          </Histogram>
        </div>
      </div>
    );
  },
};
