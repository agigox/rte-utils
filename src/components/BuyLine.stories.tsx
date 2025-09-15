import type { Meta, StoryObj } from '@storybook/react';
import { BuyLine } from './BuyLine';

const meta: Meta<typeof BuyLine> = {
  title: 'Components/BuyLine',
  component: BuyLine,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
    volume: {
      control: 'text',
    },
    price: {
      control: 'text',
    },
    defaultPrice: {
      control: 'number',
    },
    showSecondInput: {
      control: 'boolean',
    },
    showTrashButton: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    iconType: {
      control: 'select',
      options: ['send', 'edit'],
    },
    showStatus: {
      control: 'select',
      options: ['accepted', 'refused', 'partial'],
    },
    volumeMax: {
      control: 'object',
    },
    priceMax: {
      control: 'object',
    },
    labels: {
      control: 'object',
      description: 'Array of label objects with key and label properties',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark', 'slate'],
      description: 'Theme styling for the component',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithValues: Story = {
  args: {
    volume: '10',
    price: '50',
  },
};

export const WithEditIcon: Story = {
  args: {
    volume: '10',
    price: '50',
    iconType: 'edit',
  },
};

export const WithTrashButton: Story = {
  args: {
    volume: '25',
    price: '75',
    showTrashButton: true,
    iconType: 'edit',
  },
};

export const SingleInput: Story = {
  args: {
    showSecondInput: false,
    volume: '100',
    defaultPrice: 25,
  },
};

export const WithCustomMax: Story = {
  args: {
    volume: '50',
    price: '30',
    volumeMax: { value: 500 },
    priceMax: { value: 200 },
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Purchase 1',
    volume: '15',
    price: '60',
  },
};

export const EmptyWithTrash: Story = {
  args: {
    showTrashButton: true,
  },
};

export const Disabled: Story = {
  args: {
    volume: '50',
    price: '75',
    disabled: true,
  },
};

export const Interactive: Story = {
  args: {
    showTrashButton: true,
  },
  render: (args) => (
    <BuyLine
      {...args}
      onVolumeChange={(value) => console.log('Volume changed:', value)}
      onPriceChange={(value) => console.log('Price changed:', value)}
      onSend={() => console.log('Send clicked')}
      onClear={() => console.log('Clear clicked')}
    />
  ),
};

export const WithLabels: Story = {
  args: {
    volume: '300',
    price: '42',
    labels: [
      { key: 'volume', label: 'Volume' },
      { key: 'price', label: 'Prix' },
      { key: 'total', label: 'Coût total' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'BuyLine component with column labels displayed above the inputs and total chip. The labels align with their respective elements.',
      },
    },
  },
};

export const WithLabelsAndDefaultPrice: Story = {
  args: {
    volume: '500',
    defaultPrice: 25,
    showSecondInput: false,
    labels: [
      { key: 'volume', label: 'Volume' },
      { key: 'total', label: 'Coût total' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'BuyLine component with labels when using default price (single input). Only volume and total labels are shown.',
      },
    },
  },
};

export const WithoutTitle: Story = {
  args: {
    title: '',
    volume: '100',
    price: '45',
    labels: [
      { key: 'volume', label: 'Volume' },
      { key: 'price', label: 'Prix' },
      { key: 'total', label: 'Coût total' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'BuyLine component without a title. When no title is provided, the title div is not rendered, and the labels still position the inputs correctly with their 15px top offset.',
      },
    },
  },
};

export const ErrorHandling: Story = {
  args: {
    title: 'Error Test',
    volume: '15000',
    price: '12000',
    volumeMax: { value: 100 },
    priceMax: { value: 500 },
    showTrashButton: true,
    labels: [
      { key: 'volume', label: 'Volume' },
      { key: 'price', label: 'Prix' },
      { key: 'total', label: 'Coût total' },
    ],
  },
  render: (args) => (
    <BuyLine
      {...args}
      onVolumeChange={(value) => console.log('Volume changed:', value)}
      onPriceChange={(value) => console.log('Price changed:', value)}
      onSend={() => {
        console.log('Send clicked - Fields cleared after successful send');
      }}
      onClear={() => console.log('Clear clicked')}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates error handling functionality. The initial values exceed the max limits (volume: 15000 > 100, price: 12000 > 500), causing inputs to show error states. The send button is disabled when there are errors and the total shows 0. Try changing values to be within range to enable the send button. When send is successful, all fields are cleared automatically.',
      },
    },
  },
};

export const SuccessStateDemo: Story = {
  args: {
    volume: '150',
    price: '35',
    title: 'Achat Test',
    showTrashButton: true,
    labels: [
      { key: 'volume', label: 'Volume' },
      { key: 'price', label: 'Prix' },
      { key: 'total', label: 'Recette' },
    ],
  },
  render: (args) => (
    <BuyLine
      {...args}
      onVolumeChange={(value) => console.log('Volume changed:', value)}
      onPriceChange={(value) => console.log('Price changed:', value)}
      onSend={() => {
        console.log('Send action executed after 1 second delay');
        alert('Send action completed! The form has been cleared.');
      }}
      onClear={() => console.log('Clear clicked')}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the complete send workflow: Click the send button to see the green borders appear on InputNumber components, followed by a loading spinner for 1 second. After the delay, the onSend callback is executed and the form is automatically cleared. The component is disabled during the loading state to prevent duplicate submissions.',
      },
    },
  },
};

export const WithAcceptedStatus: Story = {
  args: {
    volume: '200',
    price: '45',
    title: 'Achat Accepté',
    showStatus: 'accepted',
  },
  parameters: {
    docs: {
      description: {
        story: 'BuyLine component showing accepted status with green success icon.',
      },
    },
  },
};

export const WithRefusedStatus: Story = {
  args: {
    volume: '150',
    price: '60',
    title: 'Achat Refusé',
    showStatus: 'refused',
  },
  parameters: {
    docs: {
      description: {
        story: 'BuyLine component showing refused status with red failure icon.',
      },
    },
  },
};

export const WithPartialStatus: Story = {
  args: {
    volume: '100',
    price: '35',
    title: 'Achat Partiel',
    showStatus: 'partial',
  },
  parameters: {
    docs: {
      description: {
        story: 'BuyLine component showing partial status with orange partial icon.',
      },
    },
  },
};

export const StatusComparison: Story = {
  args: {
    volume: '75',
    price: '40',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      <BuyLine {...args} title="Achat Accepté" showStatus="accepted" />
      <BuyLine {...args} title="Achat Partiel" showStatus="partial" />
      <BuyLine {...args} title="Achat Refusé" showStatus="refused" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of all status states: accepted (green), partial (orange), and refused (red).',
      },
    },
  },
};

export const DarkTheme: Story = {
  args: {
    title: 'Dark Purchase',
    volume: '150',
    price: '42',
    theme: 'dark',
    showTrashButton: true,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
    docs: {
      description: {
        story: 'BuyLine component with dark theme. Background is #292E33, input backgrounds are #292E33, input text is #FFFFFF, input borders are #B7BEC2, chip background is #005896, and chip text is #B3E5F9.',
      },
    },
  },
};

export const DarkThemeWithLabels: Story = {
  args: {
    title: 'Dark Purchase with Labels',
    volume: '300',
    price: '55',
    theme: 'dark',
    showTrashButton: true,
    labels: [
      { key: 'volume', label: 'Volume' },
      { key: 'price', label: 'Prix' },
      { key: 'total', label: 'Coût total' },
    ],
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
    docs: {
      description: {
        story: 'BuyLine component with dark theme and labels. Shows the complete dark theme implementation with all specified colors applied.',
      },
    },
  },
};

export const DarkThemeInteractive: Story = {
  args: {
    title: 'Interactive Dark',
    volume: '100',
    price: '30',
    theme: 'dark',
    showTrashButton: true,
  },
  render: (args) => (
    <BuyLine
      {...args}
      onVolumeChange={(value) => console.log('Volume changed:', value)}
      onPriceChange={(value) => console.log('Price changed:', value)}
      onSend={() => {
        console.log('Send action executed in dark theme');
        alert('Dark theme send action completed!');
      }}
      onClear={() => console.log('Clear clicked in dark theme')}
    />
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
    docs: {
      description: {
        story: 'Interactive dark theme BuyLine. Test the complete workflow with dark theme styling: click send to see the loading state and form clearing behavior.',
      },
    },
  },
};

export const SlateTheme: Story = {
  args: {
    title: 'Slate Purchase',
    volume: '120',
    price: '38',
    theme: 'slate',
    showTrashButton: true,
  },
  parameters: {
    backgrounds: {
      default: 'slate',
      values: [
        { name: 'slate', value: '#2a2a2a' },
      ],
    },
    docs: {
      description: {
        story: 'BuyLine component with slate theme. Background is #3B434A, same styling as dark theme but with a different background color.',
      },
    },
  },
};

export const SlateThemeWithLabels: Story = {
  args: {
    title: 'Slate Purchase with Labels',
    volume: '250',
    price: '62',
    theme: 'slate',
    showTrashButton: true,
    labels: [
      { key: 'volume', label: 'Volume' },
      { key: 'price', label: 'Prix' },
      { key: 'total', label: 'Coût total' },
    ],
  },
  parameters: {
    backgrounds: {
      default: 'slate',
      values: [
        { name: 'slate', value: '#2a2a2a' },
      ],
    },
    docs: {
      description: {
        story: 'BuyLine component with slate theme and labels. Shows the slate theme implementation with all specified colors applied.',
      },
    },
  },
};

export const ThemeComparison: Story = {
  args: {
    volume: '200',
    price: '35',
    title: 'Theme Test',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: '#000' }}>Light Theme</h3>
        <BuyLine {...args} />
      </div>
      <div style={{ backgroundColor: '#1a1a1a', padding: '16px', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#fff' }}>Dark Theme</h3>
        <BuyLine {...args} theme="dark" />
      </div>
      <div style={{ backgroundColor: '#2a2a2a', padding: '16px', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#fff' }}>Slate Theme</h3>
        <BuyLine {...args} theme="slate" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of all three themes: light, dark, and slate showing the color differences.',
      },
    },
  },
};
