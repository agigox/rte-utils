import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile Chip component for displaying tags, labels, or status indicators with customizable colors and width options.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Text content displayed in the chip'
    },
    bgColor: {
      control: 'color',
      description: 'Background color of the chip'
    },
    textColor: {
      control: 'color',
      description: 'Text color of the chip'
    },
    width: {
      control: 'select',
      options: ['fit-content', 'full-width'],
      description: 'Width behavior of the chip'
    }
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Chip',
    width: 'fit-content',
  },
};

export const CustomColors: Story = {
  args: {
    label: 'Custom Colors',
    bgColor: '#E1F5FD',
    textColor: '#005896',
    width: 'fit-content',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Chip',
    bgColor: '#f3f4f6',
    textColor: '#374151',
    width: 'full-width',
  },
  parameters: {
    layout: 'padded',
  }
};

export const Status: Story = {
  args: {
    label: 'Active',
    bgColor: '#dcfce7',
    textColor: '#166534',
    width: 'fit-content',
  },
};

export const Warning: Story = {
  args: {
    label: 'Warning',
    bgColor: '#fef3c7',
    textColor: '#92400e',
    width: 'fit-content',
  },
};

export const Error: Story = {
  args: {
    label: 'Error',
    bgColor: '#fecaca',
    textColor: '#991b1b',
    width: 'fit-content',
  },
};