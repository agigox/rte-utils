import type { Meta, StoryObj } from '@storybook/react';
import { MaintenanceIcon, SettingsIcon, UserIcon } from './Icons';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A reusable Tooltip component that displays contextual information on hover. It can wrap any React element and show a tooltip in different positions (top, bottom, left, right).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'The text content to display inside the tooltip',
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of the tooltip relative to the trigger element',
    },
    children: {
      control: false,
      description: 'The trigger element that shows the tooltip on hover',
    },
    offset: {
      control: { type: 'number', min: 0, max: 50, step: 1 },
      description: 'Distance in pixels between the tooltip and the trigger element',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a helpful tooltip',
    position: 'top',
  },
  render: (args) => (
    <Tooltip {...args}>
      <button
        style={{
          padding: '8px 16px',
          backgroundColor: '#005896',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Hover me
      </button>
    </Tooltip>
  ),
};

export const WithIcon: Story = {
  args: {
    content: 'Maintenance required',
    position: 'top',
  },
  render: (args) => (
    <Tooltip {...args}>
      <MaintenanceIcon size={24} />
    </Tooltip>
  ),
};

export const TopPosition: Story = {
  args: {
    content: 'Tooltip on top',
    position: 'top',
  },
  render: (args) => (
    <div style={{ marginTop: '60px' }}>
      <Tooltip {...args}>
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: '#005896',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Top Tooltip
        </button>
      </Tooltip>
    </div>
  ),
};

export const BottomPosition: Story = {
  args: {
    content: 'Tooltip on bottom',
    position: 'bottom',
  },
  render: (args) => (
    <div style={{ marginBottom: '60px' }}>
      <Tooltip {...args}>
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: '#005896',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Bottom Tooltip
        </button>
      </Tooltip>
    </div>
  ),
};

export const LeftPosition: Story = {
  args: {
    content: 'Tooltip on left',
    position: 'left',
  },
  render: (args) => (
    <div style={{ marginLeft: '150px' }}>
      <Tooltip {...args}>
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: '#005896',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Left Tooltip
        </button>
      </Tooltip>
    </div>
  ),
};

export const RightPosition: Story = {
  args: {
    content: 'Tooltip on right',
    position: 'right',
  },
  render: (args) => (
    <div style={{ marginRight: '150px' }}>
      <Tooltip {...args}>
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: '#005896',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Right Tooltip
        </button>
      </Tooltip>
    </div>
  ),
};

export const AllPositions: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '80px',
        padding: '80px',
      }}
    >
      <Tooltip content="Tooltip on top" position="top">
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: '#005896',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Top
        </button>
      </Tooltip>

      <Tooltip content="Tooltip on bottom" position="bottom">
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: '#005896',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Bottom
        </button>
      </Tooltip>

      <Tooltip content="Tooltip on left" position="left">
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: '#005896',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Left
        </button>
      </Tooltip>

      <Tooltip content="Tooltip on right" position="right">
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: '#005896',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Right
        </button>
      </Tooltip>
    </div>
  ),
};

export const LongText: Story = {
  args: {
    content: 'This is a longer tooltip with more information about the feature',
    position: 'top',
  },
  render: (args) => (
    <Tooltip {...args}>
      <SettingsIcon size={24} />
    </Tooltip>
  ),
};

export const MultipleIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Tooltip content="User settings" position="top">
        <UserIcon size={24} />
      </Tooltip>

      <Tooltip content="System configuration" position="top">
        <SettingsIcon size={24} />
      </Tooltip>

      <Tooltip content="Maintenance required" position="top">
        <MaintenanceIcon size={24} />
      </Tooltip>
    </div>
  ),
};

export const WithCustomElement: Story = {
  args: {
    content: 'Click to learn more',
    position: 'top',
  },
  render: (args) => (
    <Tooltip {...args}>
      <div
        style={{
          padding: '12px 24px',
          backgroundColor: '#E1F5FD',
          color: '#005896',
          borderRadius: '8px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Info Badge
      </div>
    </Tooltip>
  ),
};

export const WithCustomOffset: Story = {
  args: {
    content: 'Tooltip with custom offset (20px)',
    position: 'top',
    offset: 20,
  },
  render: (args) => (
    <div style={{ marginTop: '80px' }}>
      <Tooltip {...args}>
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: '#005896',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Hover me (20px offset)
        </button>
      </Tooltip>
    </div>
  ),
};
