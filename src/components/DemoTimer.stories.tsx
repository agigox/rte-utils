import type { Meta, StoryObj } from '@storybook/react';
import { DemoTimer } from './DemoTimer';
import { useState } from 'react';

const meta: Meta<typeof DemoTimer> = {
  title: 'Components/DemoTimer',
  component: DemoTimer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A demonstration Timer component that displays a Timer at a specific phase and time. The user is always an actor (no controls), and the timer is static for demonstration purposes. Step indicators can be made clickable by providing an onPhaseChange callback.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    phases: {
      control: 'object',
      description: 'Array of phases with shape { duration: number; title?: string }.',
    },
    targetPhase: {
      control: 'number',
      description: 'The phase index (0-based) to display in the demo.',
    },
    targetTime: {
      control: 'number',
      description: 'The time in milliseconds to display within the target phase.',
    },
    className: {
      control: 'text',
      description: 'Optional CSS class name.',
    },
    onPhaseChange: {
      description: 'Optional callback when a phase is clicked.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    phases: [
      { duration: 6000, title: 'Phase 1' },
      { duration: 9000, title: 'Phase 2' },
    ],
    targetPhase: 1,
    targetTime: 3000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default demo showing Phase 2 at 3 seconds (3000ms).',
      },
    },
  },
};

export const Phase1Start: Story = {
  args: {
    phases: [
      { duration: 6000, title: 'Phase 1' },
      { duration: 9000, title: 'Phase 2' },
    ],
    targetPhase: 0,
    targetTime: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo showing Phase 1 at the start (0 seconds).',
      },
    },
  },
};

export const Phase1Middle: Story = {
  args: {
    phases: [
      { duration: 6000, title: 'Phase 1' },
      { duration: 9000, title: 'Phase 2' },
    ],
    targetPhase: 0,
    targetTime: 3000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo showing Phase 1 at 3 seconds.',
      },
    },
  },
};

export const Phase1End: Story = {
  args: {
    phases: [
      { duration: 6000, title: 'Phase 1' },
      { duration: 9000, title: 'Phase 2' },
    ],
    targetPhase: 0,
    targetTime: 6000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo showing Phase 1 at the end (6 seconds).',
      },
    },
  },
};

export const Phase2Start: Story = {
  args: {
    phases: [
      { duration: 6000, title: 'Phase 1' },
      { duration: 9000, title: 'Phase 2' },
    ],
    targetPhase: 1,
    targetTime: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo showing Phase 2 at the start (0 seconds).',
      },
    },
  },
};

export const Phase2Middle: Story = {
  args: {
    phases: [
      { duration: 6000, title: 'Phase 1' },
      { duration: 9000, title: 'Phase 2' },
    ],
    targetPhase: 1,
    targetTime: 4500,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo showing Phase 2 at 4.5 seconds (middle of the phase).',
      },
    },
  },
};

export const Phase2End: Story = {
  args: {
    phases: [
      { duration: 6000, title: 'Phase 1' },
      { duration: 9000, title: 'Phase 2' },
    ],
    targetPhase: 1,
    targetTime: 9000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo showing Phase 2 at the end (9 seconds).',
      },
    },
  },
};

export const MultiPhaseDemo: Story = {
  args: {
    phases: [
      { duration: 30000, title: 'Warmup' },
      { duration: 45000, title: 'Main' },
      { duration: 60000, title: 'Wrap' },
      { duration: 15000, title: 'Cooldown' },
    ],
    targetPhase: 2,
    targetTime: 30000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo with multiple phases showing Wrap phase at 30 seconds.',
      },
    },
  },
};

export const MinimalTimerExample: Story = {
  args: {
    phases: [
      { duration: 6000, title: 'Phase 1' },
      { duration: 9000, title: 'Phase 2' },
    ],
    targetPhase: 1,
    targetTime: 3000,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example matching the MinimalTimer story: phases with 6s and 9s durations, showing Phase 2 at 3 seconds.',
      },
    },
  },
};

export const InteractivePhaseNavigation = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const phases = [
    { duration: 6000, title: 'Phase 1' },
    { duration: 9000, title: 'Phase 2' },
    { duration: 12000, title: 'Phase 3' },
  ];

  const handlePhaseChange = (phaseIndex: number) => {
    setCurrentPhase(phaseIndex);
    setCurrentTime(0); // Reset time when changing phase
  };

  return (
    <div>
      <DemoTimer
        phases={phases}
        targetPhase={currentPhase}
        targetTime={currentTime}
        onPhaseChange={handlePhaseChange}
      />
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p>Click on the step indicators to navigate between phases!</p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          Current Phase: {currentPhase + 1} | Time: {currentTime}ms
        </p>
      </div>
    </div>
  );
};

InteractivePhaseNavigation.parameters = {
  docs: {
    description: {
      story:
        'Interactive demo showing clickable step indicators. Click on any phase number to navigate to that phase.',
    },
  },
};
