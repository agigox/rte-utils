import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A simple Avatar component that accepts any React content as children.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display inside the avatar (text, images, icons, etc.)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'JD',
  },
};

export const WithImage: Story = {
  args: {
    children: (
      <img
        src="https://placehold.co/150/4CAF50/ffffff?text=A"
        alt="Avatar"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    ),
  },
};

export const WithIcon: Story = {
  args: {
    children: '👤',
  },
};

export const WithInitials: Story = {
  args: {
    children: 'AB',
  },
};

export const WithEmoji: Story = {
  args: {
    children: '🚀',
  },
};

export const WithCustomContent: Story = {
  args: {
    children: (
      <div
        style={{
          background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
        }}
      >
        ✓
      </div>
    ),
  },
};
