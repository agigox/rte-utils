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
