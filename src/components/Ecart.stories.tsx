import type { Meta, StoryObj } from '@storybook/react';
import { Ecart } from './Ecart';

const meta: Meta<typeof Ecart> = {
  title: 'Components/Ecart',
  component: Ecart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An Ecart component that displays a label with an optional +/- icon and a customizable chip showing a value. Built using the Chip component with configurable background and text colors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: [undefined, 'plus', 'minus'],
    },
    chipBgColor: {
      control: { type: 'color' },
    },
    chipTextColor: {
      control: { type: 'color' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic stories matching the Figma design
export const WithMinusIcon: Story = {
  args: {
    label: 'Soutirages',
    value: '1858',
    icon: 'minus',
    chipBgColor: '#d3d64e',
    chipTextColor: '#11161a',
  },
};

export const WithPlusIcon: Story = {
  args: {
    label: 'Productions',
    value: '2500',
    icon: 'plus',
    chipBgColor: '#4CAF50',
    chipTextColor: '#ffffff',
  },
};

export const WithoutIcon: Story = {
  args: {
    label: 'Consommation',
    value: '1200',
    chipBgColor: '#2196F3',
    chipTextColor: '#ffffff',
  },
};

// Different color themes
export const RedTheme: Story = {
  args: {
    label: 'Déficit',
    value: '450',
    icon: 'minus',
    chipBgColor: '#f44336',
    chipTextColor: '#ffffff',
  },
};

export const GreenTheme: Story = {
  args: {
    label: 'Excédent',
    value: '320',
    icon: 'plus',
    chipBgColor: '#4CAF50',
    chipTextColor: '#ffffff',
  },
};

export const BlueTheme: Story = {
  args: {
    label: 'Transport',
    value: '180',
    chipBgColor: '#2196F3',
    chipTextColor: '#ffffff',
  },
};

// Original yellow theme from Figma
export const YellowTheme: Story = {
  args: {
    label: 'Écart',
    value: '1858',
    icon: 'minus',
    chipBgColor: '#d3d64e',
    chipTextColor: '#11161a',
  },
};

// Dark theme
export const DarkTheme: Story = {
  args: {
    label: 'Total',
    value: '5000',
    icon: 'plus',
    chipBgColor: '#424242',
    chipTextColor: '#ffffff',
  },
};

// Custom colors
export const PurpleTheme: Story = {
  args: {
    label: 'Réserves',
    value: '890',
    chipBgColor: '#9C27B0',
    chipTextColor: '#ffffff',
  },
};

export const OrangeTheme: Story = {
  args: {
    label: 'Pertes',
    value: '125',
    icon: 'minus',
    chipBgColor: '#FF9800',
    chipTextColor: '#000000',
  },
};

// Container styling examples
export const WithSolidBackground: Story = {
  args: {
    label: 'Soutirages',
    value: '1858',
    icon: 'minus',
    chipBgColor: '#d3d64e',
    chipTextColor: '#11161a',
    style: { backgroundColor: '#f5f5f5' },
  },
};

export const WithTransparentBackground: Story = {
  args: {
    label: 'Productions',
    value: '2500',
    icon: 'plus',
    chipBgColor: '#4CAF50',
    chipTextColor: '#ffffff',
    style: { backgroundColor: 'rgba(76, 175, 80, 0.1)' },
  },
};

export const WithBlueTransparentBackground: Story = {
  args: {
    label: 'Transport',
    value: '180',
    chipBgColor: '#2196F3',
    chipTextColor: '#ffffff',
    style: { backgroundColor: 'rgba(33, 150, 243, 0.15)' },
  },
};

export const WithDarkBackground: Story = {
  args: {
    label: 'Déficit',
    value: '450',
    icon: 'minus',
    chipBgColor: '#f44336',
    chipTextColor: '#ffffff',
    style: { backgroundColor: '#333333' },
  },
};

export const WithBorderAndPadding: Story = {
  args: {
    label: 'Custom Style',
    value: '999',
    icon: 'plus',
    chipBgColor: '#9C27B0',
    chipTextColor: '#ffffff',
    style: { 
      backgroundColor: '#f8f9fa', 
      border: '2px solid #dee2e6', 
      borderRadius: '12px',
      padding: '12px 16px'
    },
  },
};