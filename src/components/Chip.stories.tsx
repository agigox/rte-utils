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
    size: {
      control: 'select',
      options: ['small', 'large'],
      description: 'Size of the chip - affects padding',
    },
    onClick: {
      action: 'clicked',
      description: 'Optional click handler - makes the chip clickable',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state - prevents clicking',
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

export const SmallChip: Story = {
  args: {
    bgColor: '#e0f2fe',
    width: 'fit-content',
    size: 'small',
  },
  render: (args) => <Chip {...args}>Small Chip</Chip>,
};

export const LargeChip: Story = {
  args: {
    bgColor: '#e0f2fe',
    width: 'fit-content',
    size: 'large',
  },
  render: (args) => <Chip {...args}>Large Chip</Chip>,
};

export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Chip size="small" bgColor="#fecaca">
        Small
      </Chip>
      <Chip size="large" bgColor="#dcfce7">
        Large (Default)
      </Chip>
    </div>
  ),
};

export const Clickable: Story = {
  args: {
    bgColor: '#e0f2fe',
    width: 'fit-content',
    onClick: () => alert('Chip clicked!'),
  },
  render: (args) => <Chip {...args}>Click Me</Chip>,
  parameters: {
    docs: {
      description: {
        story:
          'Chip becomes clickable when an onClick handler is provided. Shows hover effects and pointer cursor.',
      },
    },
  },
};

export const ClickableDisabled: Story = {
  args: {
    bgColor: '#e0f2fe',
    width: 'fit-content',
    onClick: () => alert('This should not trigger'),
    disabled: true,
  },
  render: (args) => <Chip {...args}>Disabled Chip</Chip>,
  parameters: {
    docs: {
      description: {
        story: 'When disabled is true, the chip cannot be clicked and shows reduced opacity.',
      },
    },
  },
};

export const ClickableStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Chip bgColor="#dcfce7">Not Clickable</Chip>
        <span style={{ fontSize: '12px', color: '#666' }}>No onClick handler</span>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Chip bgColor="#e0f2fe" onClick={() => console.log('Clicked!')}>
          Clickable
        </Chip>
        <span style={{ fontSize: '12px', color: '#666' }}>Has onClick handler</span>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Chip bgColor="#fef3c7" onClick={() => console.log('Should not fire')} disabled>
          Disabled
        </Chip>
        <span style={{ fontSize: '12px', color: '#666' }}>Clickable but disabled</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comparison of different clickable states. Try hovering and clicking each chip to see the different behaviors.',
      },
    },
  },
};
