import type { Meta, StoryObj } from '@storybook/react';
import { SunIcon } from './Icons';
import { OptionItem } from './OptionItem';

const meta: Meta<typeof OptionItem> = {
  title: 'Components/OptionItem',
  component: OptionItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A selectable option item that can be used as a radio button or checkbox. Supports controlled and uncontrolled modes, optional icon display, and disabled state.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['radio', 'checkbox'],
      description: 'The type of the tickbox',
    },
    content: {
      control: 'text',
      description: 'The text content to display next to the tickbox',
    },
    icon: {
      control: false,
      description: 'The icon to display next to the tickbox',
    },
    checked: {
      control: 'boolean',
      description: 'The checked state of the tickbox (controlled mode)',
    },
    disabled: {
      control: 'boolean',
      description: 'The disabled state of the tickbox',
    },
    onChange: {
      control: false,
      description: 'Callback fired when the checked state changes - receives the new boolean value',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Checkbox Stories ────────────────────────────────────────────────────────

export const CheckboxDefault: Story = {
  args: {
    type: 'checkbox',
    content: 'Option A',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default unchecked checkbox in uncontrolled mode.',
      },
    },
  },
};

export const CheckboxChecked: Story = {
  args: {
    type: 'checkbox',
    content: 'Option A',
    checked: true,
  },
};

export const CheckboxDisabled: Story = {
  args: {
    type: 'checkbox',
    content: 'Option indisponible',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled checkbox — clicks are ignored.',
      },
    },
  },
};

export const CheckboxDisabledChecked: Story = {
  args: {
    type: 'checkbox',
    content: 'Option verrouillée',
    checked: true,
    disabled: true,
  },
};

// ─── Radio Stories ───────────────────────────────────────────────────────────

export const RadioDefault: Story = {
  args: {
    type: 'radio',
    content: 'Choix 1',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default unchecked radio button in uncontrolled mode.',
      },
    },
  },
};

export const RadioChecked: Story = {
  args: {
    type: 'radio',
    content: 'Choix 1',
    checked: true,
  },
};

export const RadioDisabled: Story = {
  args: {
    type: 'radio',
    content: 'Choix indisponible',
    disabled: true,
  },
};

export const RadioDisabledChecked: Story = {
  args: {
    type: 'radio',
    content: 'Choix verrouillé',
    checked: true,
    disabled: true,
  },
};

// ─── With Icon ───────────────────────────────────────────────────────────────

export const WithIcon: Story = {
  args: {
    type: 'checkbox',
    content: 'Avec icône',
    icon: <SunIcon size={24} />,
  },
  parameters: {
    docs: {
      description: {
        story: 'OptionItem with an icon displayed on the right side.',
      },
    },
  },
};

export const WithIconChecked: Story = {
  args: {
    type: 'checkbox',
    content: 'Avec icône',
    checked: true,
    icon: <SunIcon size={24} />,
  },
};

// ─── Group Examples ──────────────────────────────────────────────────────────

export const RadioGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '300px' }}>
      <OptionItem type="radio" content="Été" onChange={() => {}} checked={true} />
      <OptionItem type="radio" content="Hiver" onChange={() => {}} />
      <OptionItem type="radio" content="Printemps" onChange={() => {}} />
      <OptionItem type="radio" content="Automne" onChange={() => {}} disabled />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Example of multiple radio OptionItems displayed as a group. Note: group logic (single selection) must be handled externally.',
      },
    },
  },
};

export const CheckboxGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '300px' }}>
      <OptionItem type="checkbox" content="Soleil" onChange={() => {}} checked={true} />
      <OptionItem type="checkbox" content="Pluie" onChange={() => {}} checked={true} />
      <OptionItem type="checkbox" content="Vent" onChange={() => {}} />
      <OptionItem type="checkbox" content="Neige" onChange={() => {}} disabled />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Example of multiple checkbox OptionItems displayed as a group with multiple selections.',
      },
    },
  },
};
