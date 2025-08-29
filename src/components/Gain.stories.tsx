import type { Meta, StoryObj } from '@storybook/react';
import { Gain } from './Gain';

const meta: Meta<typeof Gain> = {
  title: 'Components/Gain',
  component: Gain,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A points animation component that displays floating score increases with a smooth animation effect.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const GameScore: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Click the button to see the points animation in action. Points float up and fade out over 2 seconds.',
      },
    },
  },
};