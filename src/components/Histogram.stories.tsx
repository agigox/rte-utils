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
