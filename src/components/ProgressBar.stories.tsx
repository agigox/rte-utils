import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A simple progress bar component that shows progress either by counting down to an end date or displaying a paused state with remaining time.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    progressEndDate: {
      control: 'number',
      description: 'Timestamp when progress should finish (milliseconds). Progress updates in real-time.',
    },
    leftTime: {
      control: 'number',
      description: 'Remaining time in milliseconds (for paused state).',
    },
    progressTime: {
      control: 'number',
      description: 'Total duration in milliseconds (for paused state).',
    },
    className: {
      control: 'text',
      description: 'Optional CSS class name.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    progressEndDate: Date.now() + 10000, // 10 seconds from now
  },
};

export const LiveProgress: Story = {
  args: {
    progressEndDate: Date.now() + 300000, // 30 seconds from now
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar that updates in real-time until the end date is reached.',
      },
    },
  },
};

export const PausedAt20Percent: Story = {
  args: {
    leftTime: 8000, // 8 seconds left
    progressTime: 10000, // out of 10 seconds total
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar in paused state showing 20% progress (8s left out of 10s total).',
      },
    },
  },
};

export const PausedAt50Percent: Story = {
  args: {
    leftTime: 5000, // 5 seconds left  
    progressTime: 10000, // out of 10 seconds total
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar showing 50% progress (halfway through).',
      },
    },
  },
};

export const PausedAt80Percent: Story = {
  args: {
    leftTime: 2000, // 2 seconds left
    progressTime: 10000, // out of 10 seconds total  
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar showing 80% progress (almost complete).',
      },
    },
  },
};

export const WithCustomClassName: Story = {
  args: {
    progressEndDate: Date.now() + 15000,
    className: 'custom-progress-bar-style',
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar with custom CSS class applied.',
      },
    },
  },
};

export const CompleteProgress: Story = {
  args: {
    leftTime: 0, // no time left
    progressTime: 10000, // 10 seconds total
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar showing 100% completion.',
      },
    },
  },
};
