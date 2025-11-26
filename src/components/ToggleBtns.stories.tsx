import type { Meta, StoryObj } from '@storybook/react';
import { ToggleBtns } from './ToggleBtns';

const meta: Meta<typeof ToggleBtns> = {
  title: 'Components/ToggleBtns',
  component: ToggleBtns,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A toggle button group component that allows users to select between multiple options. Displays options as connected buttons with active state styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Array of options with value and label properties',
    },
    onClick: {
      control: false,
      description: 'Function called when an option is selected - receives the selected value',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the component',
    },
    defaultValue: {
      control: 'text',
      description: 'The default selected value (if not provided, first option is selected)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    onClick: (value: string) => console.log('Selected:', value),
  },
};

export const ThreeOptions: Story = {
  args: {
    options: [
      { value: 'small', label: 'S' },
      { value: 'medium', label: 'M' },
      { value: 'large', label: 'L' },
    ],
    onClick: (value: string) => console.log('Selected:', value),
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle buttons with three options for size selection.',
      },
    },
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: defaultOptions,
    defaultValue: 'no',
    onClick: (value: string) => console.log('Selected:', value),
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle buttons with a default selected value of "no".',
      },
    },
  },
};

export const DayNight: Story = {
  args: {
    options: [
      { value: 'day', label: 'Day' },
      { value: 'night', label: 'Night' },
    ],
    onClick: (value: string) => console.log('Selected:', value),
  },
  parameters: {
    docs: {
      description: {
        story: 'Day/Night mode toggle.',
      },
    },
  },
};

export const OnOff: Story = {
  args: {
    options: [
      { value: 'on', label: 'On' },
      { value: 'off', label: 'Off' },
    ],
    onClick: (value: string) => console.log('Selected:', value),
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple on/off toggle buttons.',
      },
    },
  },
};

export const ViewModes: Story = {
  args: {
    options: [
      { value: 'grid', label: 'Grid' },
      { value: 'list', label: 'List' },
    ],
    onClick: (value: string) => console.log('Selected:', value),
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle between different view modes.',
      },
    },
  },
};

export const MultipleToggleGroups: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
      <ToggleBtns
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ]}
        onClick={(value) => console.log('Toggle 1:', value)}
      />
      <ToggleBtns
        options={[
          { value: 'on', label: 'On' },
          { value: 'off', label: 'Off' },
        ]}
        onClick={(value) => console.log('Toggle 2:', value)}
      />
      <ToggleBtns
        options={[
          { value: 'enabled', label: 'Enabled' },
          { value: 'disabled', label: 'Disabled' },
        ]}
        onClick={(value) => console.log('Toggle 3:', value)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple independent toggle button groups.',
      },
    },
  },
};
