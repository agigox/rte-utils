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
    volumeMax: {
      control: 'object',
    },
    priceMax: {
      control: 'object',
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

export const WithTrashButton: Story = {
  args: {
    volume: '25',
    price: '75',
    showTrashButton: true,
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