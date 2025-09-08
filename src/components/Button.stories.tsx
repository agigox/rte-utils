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

export const WithLeftIcon: Story = {
  args: {
    text: 'nouvelle proposition',
    leftIcon: 'plusIcon',
  },
};
export const WithRightIcon: Story = {
  args: {
    text: 'nouvelle proposition',
    rightIcon: 'settingIcon',
  },
};
export const Disabled: Story = {
  args: {
    text: 'nouvelle proposition',
    disabled: true,
    leftIcon: 'plusIcon',
  },
};

export const CustomColors: Story = {
  args: {
    text: 'custom colors',
    leftIcon: 'plusIcon',
    bgColor: '#FF6B6B',
    textColor: '#FFFFFF',
  },
};

export const GreenButton: Story = {
  args: {
    text: 'success button',
    leftIcon: 'settingIcon',
    bgColor: '#4ECDC4',
    textColor: '#2C3E50',
  },
};

export const DarkButton: Story = {
  args: {
    text: 'dark theme',
    leftIcon: 'plusIcon',
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
    leftIcon: 'plusIcon',
    size: 'small',
  },
};

export const LargeButton: Story = {
  args: {
    text: 'large button',
    leftIcon: 'settingIcon',
    size: 'large',
  },
};

export const SmallCustomColors: Story = {
  args: {
    text: 'small custom',
    leftIcon: 'plusIcon',
    size: 'small',
    bgColor: '#E74C3C',
    textColor: '#FFFFFF',
  },
};

export const WithBothIcons: Story = {
  args: {
    text: 'both icons',
    leftIcon: 'plusIcon',
    rightIcon: 'settingIcon',
  },
};

export const RightIconOnly: Story = {
  args: {
    text: 'settings',
    rightIcon: 'settingIcon',
    bgColor: '#3498DB',
    textColor: '#FFFFFF',
  },
};

export const BothIconsCustom: Story = {
  args: {
    text: 'complete',
    leftIcon: 'plusIcon',
    rightIcon: 'settingIcon',
    size: 'small',
    bgColor: '#8E44AD',
    textColor: '#FFFFFF',
  },
};
