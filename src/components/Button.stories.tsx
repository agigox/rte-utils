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
          'A customizable button component with icon and text support. Features a rounded design with hover and disabled states, plus customizable background and text colors.',
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
export const WithIconSettings: Story = {
  args: {
    text: 'nouvelle proposition',
    icon: 'settingIcon',
  },
};
export const Disabled: Story = {
  args: {
    text: 'nouvelle proposition',
    disabled: true,
    icon: 'plusIcon',
  },
};

export const CustomColors: Story = {
  args: {
    text: 'custom colors',
    icon: 'plusIcon',
    bgColor: '#FF6B6B',
    textColor: '#FFFFFF',
  },
};

export const GreenButton: Story = {
  args: {
    text: 'success button',
    icon: 'settingIcon',
    bgColor: '#4ECDC4',
    textColor: '#2C3E50',
  },
};

export const DarkButton: Story = {
  args: {
    text: 'dark theme',
    icon: 'plusIcon',
    bgColor: '#2C3E50',
    textColor: '#ECF0F1',
  },
};

export const PurpleButton: Story = {
  args: {
    text: 'purple style',
    bgColor: '#9B59B6',
    textColor: '#FFFFFF',
  },
};

export const SmallButton: Story = {
  args: {
    text: 'small button',
    icon: 'plusIcon',
    size: 'small',
  },
};

export const LargeButton: Story = {
  args: {
    text: 'large button',
    icon: 'settingIcon',
    size: 'large',
  },
};

export const SmallCustomColors: Story = {
  args: {
    text: 'small custom',
    icon: 'plusIcon',
    size: 'small',
    bgColor: '#E74C3C',
    textColor: '#FFFFFF',
  },
};
