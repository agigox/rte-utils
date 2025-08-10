import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile Chip component for displaying content with customizable colors and width options. Can contain text, icons, or any React elements as children.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Content to display inside the chip',
    },
    bgColor: {
      control: 'color',
      description: 'Background color of the chip',
    },
    width: {
      control: 'select',
      options: ['fit-content', 'full-width'],
      description: 'Width behavior of the chip',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 'fit-content',
  },
  render: (args) => <Chip {...args}>Default Chip</Chip>,
};

export const CustomColors: Story = {
  args: {
    bgColor: '#E1F5FD',
    width: 'fit-content',
  },
  render: (args) => <Chip {...args}>Custom Colors</Chip>,
};

export const FullWidth: Story = {
  args: {
    bgColor: '#f3f4f6',
    width: 'full-width',
  },
  parameters: {
    layout: 'padded',
  },
  render: (args) => <Chip {...args}>Full Width Chip</Chip>,
};

export const Status: Story = {
  args: {
    bgColor: '#dcfce7',
    width: 'fit-content',
  },
  render: (args) => <Chip {...args}>Active</Chip>,
};

export const Warning: Story = {
  args: {
    bgColor: '#fef3c7',
    width: 'fit-content',
  },
  render: (args) => <Chip {...args}>Warning</Chip>,
};

export const Error: Story = {
  args: {
    bgColor: '#fecaca',
    width: 'fit-content',
  },
  render: (args) => <Chip {...args}>Error</Chip>,
};

export const WithIcon: Story = {
  args: {
    bgColor: '#e0f2fe',
    width: 'fit-content',
  },
  render: (args) => (
    <Chip {...args}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span>⚡</span>
        Energy Active
      </span>
    </Chip>
  ),
};

export const WithBadge: Story = {
  args: {
    bgColor: '#f3e8ff',
    width: 'fit-content',
  },
  render: (args) => (
    <Chip {...args}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        Status
        <span
          style={{
            backgroundColor: '#10b981',
            color: 'white',
            borderRadius: '50%',
            width: '16px',
            height: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            fontWeight: 'bold',
          }}
        >
          3
        </span>
      </span>
    </Chip>
  ),
};

export const MultilineContent: Story = {
  args: {
    bgColor: '#fef7cd',
    width: 'fit-content',
  },
  render: (args) => (
    <Chip {...args}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '12px', fontWeight: 'bold' }}>Production</div>
        <div style={{ fontSize: '14px' }}>850 MW</div>
      </div>
    </Chip>
  ),
};
