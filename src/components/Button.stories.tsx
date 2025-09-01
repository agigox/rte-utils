import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A blue button component with customizable icon and text. Features a rounded design with hover and disabled states.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'nouvelle proposition',
  },
};

export const WithIcon: Story = {
  args: {
    text: 'nouvelle proposition',
    icon: 'plusIcon',
  },
};

export const Disabled: Story = {
  args: {
    text: 'nouvelle proposition',
    disabled: true,
    icon: 'plusIcon',
  },
};
