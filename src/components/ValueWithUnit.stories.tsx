import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ValueWithUnit } from './ValueWithUnit';

const meta: Meta<typeof ValueWithUnit> = {
  title: 'Components/ValueWithUnit',
  component: ValueWithUnit,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Displays a numeric value with a unit. Supports euros (€), megawatts (MWh), and €/MWh formatting with optional color.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    cost: {
      control: { type: 'number' },
      description: 'Numeric value to display',
    },
    textColor: {
      control: { type: 'color' },
      description: 'Text color for value and unit',
    },
    type: {
      control: { type: 'select' },
      options: ['euro', 'megawatt', 'europermegawatt'],
      description: 'Unit type to display',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'small'],
      description: 'Size variant of the component',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Euro: Story = {
  args: {
    cost: 120,
    type: 'euro',
    textColor: '#111',
  },
};

export const Megawatt: Story = {
  args: {
    cost: 56,
    type: 'megawatt',
    textColor: '#111',
  },
};

export const EuroPerMegawatt: Story = {
  args: {
    cost: 42,
    type: 'europermegawatt',
    textColor: '#111',
  },
};

export const CustomColor: Story = {
  args: {
    cost: 99,
    type: 'euro',
    textColor: '#0B5ED7',
  },
};

export const SmallEuro: Story = {
  args: {
    cost: 120,
    type: 'euro',
    textColor: '#111',
    size: 'small',
  },
};

export const SmallMegawatt: Story = {
  args: {
    cost: 56,
    type: 'megawatt',
    textColor: '#111',
    size: 'small',
  },
};

export const SmallEuroPerMegawatt: Story = {
  args: {
    cost: 42,
    type: 'europermegawatt',
    textColor: '#111',
    size: 'small',
  },
};
