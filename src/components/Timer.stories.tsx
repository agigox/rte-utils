import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Timer } from './Timer';
import type { TimerRef } from './Timer';

const meta: Meta<typeof Timer> = {
  title: 'Components/Timer',
  component: Timer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A multi-phase count-up timer component perfect for games and time-based activities. Counts up from 00:00 to each target duration in sequence, with progress tracking and phase management.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    phases: {
      control: 'object',
      description: 'Array of phases with shape { duration: number; title?: string }.',
    },
    externalState: {
      control: 'object',
      description: 'External timer state object with currentPhase, currentTime, isRunning, isPaused, isFrozen',
    },
    onStateChange: {
      control: false,
      description: 'Callback for state changes',
    },
    gameActions: {
      control: 'object',
      description:
        "Optional mapping of phase index to action label for tooltips/indicators (e.g., {0: 'Draw', 2: 'Score'}).",
    },
    user: {
      control: { type: 'select' },
      options: ['admin', 'actor'],
      description:
        "User type - 'admin' shows all controls, 'actor' hides game controls and repositions timer header",
    },
    onComplete: { control: false },
    onPhaseComplete: { control: false },
    onTick: { control: false },
    onUnfreeze: { control: false },
    onUnpause: { control: false },
    onPause: { control: false },
    onFreeze: { control: false },
  onAnonymiseToggle: { control: false },
    onStop: { control: false },
    onReset: { control: false },
    onPrevious: { control: false },
    onNext: { control: false },
    onPhaseClick: {
      control: false,
      description: 'Called when a completed or active phase indicator is clicked (phase index).',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [timerState, setTimerState] = useState({
      currentPhase: 'Preparation',
      currentTime: 0,
      isRunning: false,
      isPaused: false,
      isFrozen: false,
    });

    return (
      <Timer
        phases={[
          { duration: 30000, title: 'Preparation' }, // 30 seconds in milliseconds
          { duration: 45000, title: 'Play' }, // 45 seconds in milliseconds
          { duration: 60000, title: 'Wrap-up' }, // 60 seconds in milliseconds
        ]}
        externalState={timerState}
        onStateChange={setTimerState}
      />
    );
  },
};

export const GameTimer: Story = {
  render: () => {
    const [timerState, setTimerState] = useState({
      currentPhase: 'START',
      currentTime: 0,
      isRunning: true, // auto-start
      isPaused: false,
      isFrozen: false,
    });

    return (
      <Timer
        phases={[
          { duration: 5000, title: 'START' }, // 5 seconds in milliseconds
          { duration: 6000, title: 'MIDDLE' }, // 6 seconds in milliseconds
          { duration: 7000, title: 'END' }, // 7 seconds in milliseconds
        ]}
        externalState={timerState}
        onStateChange={setTimerState}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Game timer with 3 phases (5s, 6s, 7s) that auto-starts for demonstration.',
      },
    },
  },
};

export const SinglePhase: Story = {
  render: () => {
    const [timerState, setTimerState] = useState({
      currentPhase: 'Single',
      currentTime: 0,
      isRunning: false,
      isPaused: false,
      isFrozen: false,
    });

    return (
      <Timer
        phases={[{ duration: 120000, title: 'Single' }]} // 120 seconds in milliseconds
        externalState={timerState}
        onStateChange={setTimerState}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Single phase timer.',
      },
    },
  },
};

export const MinimalTimer: Story = {
  render: () => {
    const [timerState, setTimerState] = useState({
      currentPhase: "Phase 1",
      currentTime: 0,
      isRunning: false,
      isPaused: false,
      isFrozen: false,
    });

    return (
      <Timer
        phases={[
          { duration: 60000, title: 'Phase 1' },
          { duration: 90000, title: 'Phase 2' },
        ]}
        externalState={timerState}
        onStateChange={setTimerState}
      />
    );
  },
};

export const ProgressOnly: Story = {
  render: () => {
    const [timerState, setTimerState] = useState({
      currentPhase: 'Short',
      currentTime: 0,
      isRunning: true, // auto-start
      isPaused: false,
      isFrozen: false,
    });

    return (
      <Timer
        phases={[
          { duration: 8000, title: 'Short' },
          { duration: 12000, title: 'Long' },
        ]}
        externalState={timerState}
        onStateChange={setTimerState}
      />
    );
  },
};

export const WithPhaseTitles: Story = {
  render: () => {
    const [timerState, setTimerState] = useState({
      currentPhase: "Phase 1",
      currentTime: 0,
      isRunning: false,
      isPaused: false,
      isFrozen: false,
    });

    return (
      <Timer
        phases={[
          { duration: 10000, title: 'Warm-up' },
          { duration: 10000, title: 'Main' },
          { duration: 10000, title: 'Cooldown' },
        ]}
        externalState={timerState}
        onStateChange={setTimerState}
      />
    );
  },
};

export const WithCallbacks: Story = {
  render: () => {
    const [status, setStatus] = useState('Ready');
    const [currentPhase, setCurrentPhase] = useState('Intro'); // Use string for phase title
    const [currentTime, setCurrentTime] = useState(0);
    const [phaseInfo, setPhaseInfo] = useState('');
    const [selectedFinishedPhase, setSelectedFinishedPhase] = useState<number | null>(null);
    const [clickedPhase, setClickedPhase] = useState<number | null>(null);
    const [timerState, setTimerState] = useState({
      currentPhase: 'Intro',
      currentTime: 2000, // 2 seconds in milliseconds
      isRunning: false,
      isPaused: false,
      isFrozen: false,
    });


    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: 20, padding: 15, backgroundColor: '#f8f9fa', borderRadius: 8 }}>
          <p>
            <strong>Status:</strong> {status}
          </p>
          <p>
            <strong>Current Phase:</strong> {
              (() => {
                const phases = ['Intro', 'Action', 'Summary'];
                const phaseIndex = phases.indexOf(timerState.currentPhase);
                return phaseIndex + 1;
              })()
            }
          </p>
          <p>
            <strong>Current Time:</strong> {timerState.currentTime}s
          </p>
          <p>
            <strong>Phase Info:</strong> {phaseInfo}
          </p>
          <p>
            <strong>Timer State:</strong> Running: {timerState.isRunning ? 'Yes' : 'No'}, 
            Paused: {timerState.isPaused ? 'Yes' : 'No'}, 
            Frozen: {timerState.isFrozen ? 'Yes' : 'No'}
          </p>
          {selectedFinishedPhase !== null && (
            <p style={{ color: '#0a58ca' }}>
              Navigated to finished phase: #{selectedFinishedPhase + 1}
            </p>
          )}
          {clickedPhase !== null && (
            <p style={{ color: '#198754' }}>Clicked phase indicator: #{clickedPhase + 1}</p>
          )}
        </div>
        <Timer
          phases={[
            { duration: 6000, title: 'Intro' },
            { duration: 5000, title: 'Action' },
            { duration: 4000, title: 'Summary' },
          ]}
          externalState={timerState}
          onStateChange={(newState) => {
            setTimerState(newState);
            setCurrentPhase(newState.currentPhase);
            setCurrentTime(newState.currentTime);
            
            if (newState.isRunning && !newState.isPaused) {
              setStatus('Running');
            } else if (newState.isPaused) {
              setStatus('Paused');
            } else if (newState.isFrozen) {
              setStatus('Frozen');
            } else if (!newState.isRunning) {
              setStatus('Stopped');
            }
          }}
          onUnfreeze={() => {
            setStatus('Unfrozen');
            setPhaseInfo('Game unfrozen!');
          }}
          onUnpause={() => {
            setStatus('Unpaused');
            setPhaseInfo('Game unpaused!');
          }}
          onPause={() => {
            setStatus('Paused');
          }}
          onFreeze={(frozen) => {
            setStatus(frozen ? 'Frozen' : 'Resumed');
          }}
          onStop={() => {
            setStatus('Stopped');
            setCurrentPhase("Phase 1");
            setCurrentTime(0);
            setPhaseInfo('Game stopped');
            setSelectedFinishedPhase(null);
          }}
          onReset={() => {
            setStatus('Reset');
            setCurrentPhase("Phase 1");
            setCurrentTime(0);
            setPhaseInfo('Ready to start');
            setSelectedFinishedPhase(null);
          }}
          onTick={(time, phaseTitle) => {
            const phases = ['Intro', 'Action', 'Summary'];
            const phaseIndex = phases.indexOf(phaseTitle);
            setPhaseInfo(`Phase ${phaseIndex + 1}: ${time}s elapsed`);
            setCurrentTime(time);
          }}
          onPhaseComplete={(phaseTitle, duration) => {
            const phases = ['Intro', 'Action', 'Summary'];
            const phaseIndex = phases.indexOf(phaseTitle);
            setPhaseInfo(`Phase ${phaseIndex + 1} completed! (${duration}s)`);
          }}
          onComplete={() => {
            setStatus('All phases completed!');
            setPhaseInfo('Game finished successfully!');
          }}
          onPrevious={() => {
            setSelectedFinishedPhase((prev) => {
              const phases = ['Intro', 'Action', 'Summary'];
              const currentIndex = phases.indexOf(currentPhase);
              const fallback = currentIndex > 0 ? currentIndex - 1 : 0;
              return prev === null ? fallback : Math.max(0, prev - 1);
            });
          }}
          onNext={() => {
            setSelectedFinishedPhase((prev) => {
              const phases = ['Intro', 'Action', 'Summary'];
              const currentIndex = phases.indexOf(currentPhase);
              const fallback = currentIndex + 1;
              return prev === null ? fallback : prev + 1;
            });
          }}
          onPhaseClick={(phase) => {
            setClickedPhase(phase);
          }}
        />
      </div>
    );
  },
};

export const ControlledTimer: Story = {
  render: () => {
    const [phases, setPhases] = useState([
      { duration: 30000, title: 'Phase 1' },
      { duration: 45000, title: 'Phase 2' },
      { duration: 60000, title: 'Phase 3' },
    ]);
    const [durationsInput, setDurationsInput] = useState('30,45,60');
    const timerRef = React.useRef<TimerRef | null>(null);

    const handleDurationsChange = (input: string) => {
      setDurationsInput(input);
      const newDurations = input
        .split(',')
        .map((d) => parseInt(d.trim(), 10))
        .filter((d) => !isNaN(d) && d > 0);

      if (newDurations.length > 0) {
        const newPhases = newDurations.map((d, idx) => ({
          duration: d,
          title: `Phase ${idx + 1}`,
        }));
        setPhases(newPhases);
        timerRef.current?.setPhases(newPhases);
      }
    };

    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="durations-input" style={{ display: 'block', marginBottom: 8 }}>
            Set Phase Durations (comma-separated seconds):
          </label>
          <input
            id="durations-input"
            type="text"
            value={durationsInput}
            onChange={(e) => handleDurationsChange(e.target.value)}
            placeholder="30,45,60"
            style={{
              padding: 8,
              borderRadius: 4,
              border: '1px solid #ccc',
              width: 200,
            }}
          />
          <p style={{ fontSize: 12, color: '#666', margin: '5px 0' }}>
            Current phases: {phases.map((p) => p.duration).join(', ')} seconds
          </p>
        </div>
        <Timer
          ref={timerRef}
          phases={phases}
          externalState={{
            currentPhase: "Phase 1",
            currentTime: 0,
            isRunning: false,
            isPaused: false,
            isFrozen: false,
          }}
          onStateChange={() => {}}
        />
        <div style={{ marginTop: 20 }}>
          <button
            onClick={() => timerRef.current?.start()}
            style={{ margin: '0 4px', padding: '8px 16px' }}
          >
            External Start
          </button>
          <button
            onClick={() => timerRef.current?.pause()}
            style={{ margin: '0 4px', padding: '8px 16px' }}
          >
            External Pause
          </button>
          <button
            onClick={() => timerRef.current?.stop()}
            style={{ margin: '0 4px', padding: '8px 16px' }}
          >
            External Stop
          </button>
          <button
            onClick={() => timerRef.current?.reset()}
            style={{ margin: '0 4px', padding: '8px 16px' }}
          >
            External Reset
          </button>
          <button
            onClick={() => (timerRef.current as any)?.freeze?.()}
            style={{ margin: '0 4px', padding: '8px 16px' }}
          >
            External Freeze
          </button>
          <button
            onClick={() => (timerRef.current as any)?.toggleAnonymise?.()}
            style={{ margin: '0 4px', padding: '8px 16px' }}
          >
            External Anonymise
          </button>
        </div>
      </div>
    );
  },
};

export const FreezeDemo: Story = {
  render: () => {
    const timerRef = React.useRef<TimerRef | null>(null);
    return (
      <div style={{ textAlign: 'center' }}>
        <Timer
          ref={timerRef}
          phases={[
            { duration: 10000, title: 'Alpha' },
            { duration: 12000, title: 'Beta' },
          ]}
          externalState={{
            currentPhase: "Phase 1",
            currentTime: 0,
            isRunning: true, // auto-start
            isPaused: false,
            isFrozen: false,
          }}
          onStateChange={() => {}}
        />
        <div style={{ marginTop: 16 }}>
          <button onClick={() => timerRef.current?.start()} style={{ margin: '0 4px' }}>
            Start
          </button>
          <button onClick={() => timerRef.current?.pause()} style={{ margin: '0 4px' }}>
            Pause
          </button>
          <button onClick={() => (timerRef.current as any)?.freeze?.()} style={{ margin: '0 4px' }}>
            Freeze / Unfreeze
          </button>
          <button onClick={() => (timerRef.current as any)?.toggleAnonymise?.()} style={{ margin: '0 4px' }}>
            Anonymise / Reveal
          </button>
          <button onClick={() => timerRef.current?.reset()} style={{ margin: '0 4px' }}>
            Reset
          </button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the freeze functionality: while frozen, start/pause are disabled; unfreezing restores the previous running/paused state.',
      },
    },
  },
};

export const AdminUser: Story = {
  render: () => {
    const [timerState, setTimerState] = useState({
      currentPhase: "Phase 1",
      currentTime: 0,
      isRunning: false,
      isPaused: false,
      isFrozen: false,
    });

    return (
      <Timer
        phases={[
          { duration: 30000, title: 'Discussion' },
          { duration: 45000, title: 'Activity' },
          { duration: 15, title: 'Reflection' },
        ]}
        externalState={timerState}
        onStateChange={setTimerState}
        user="admin"
        gameActions={{ 0: 'Start Discussion', 1: 'Begin Activity', 2: 'Wrap Up' }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Admin view with full controls and timer header at the top. Includes game controls for managing the timer phases.',
      },
    },
  },
};

export const ActorUser: Story = {
  render: () => {
    const [timerState, setTimerState] = useState({
      currentPhase: "Phase 1",
      currentTime: 0,
      isRunning: true, // auto-start
      isPaused: false,
      isFrozen: false,
    });

    return (
      <Timer
        phases={[
          { duration: 30000, title: 'Discussion' },
          { duration: 45000, title: 'Activity' },
          { duration: 15, title: 'Reflection' },
        ]}
        externalState={timerState}
        onStateChange={setTimerState}
        user="actor"
        gameActions={{ 0: 'Start Discussion', 1: 'Begin Activity', 2: 'Wrap Up' }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Actor view with simplified interface - no game controls, timer header positioned after step indicators for better visibility during activities.',
      },
    },
  },
};

export const UserComparison: Story = {
  render: () => {
    const sharedPhases = [
      { duration: 20, title: 'Setup' },
      { duration: 35, title: 'Main Task' },
      { duration: 10000, title: 'Cleanup' },
    ];
    return (
      <div style={{ display: 'flex', gap: '40px', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '20px' }}>Admin View</h3>
          <Timer
            phases={sharedPhases}
            externalState={{
              currentPhase: "Phase 1",
              currentTime: 0,
              isRunning: false,
              isPaused: false,
              isFrozen: false,
            }}
            onStateChange={() => {}}
            user="admin"
            gameActions={{ 0: 'Begin Setup', 1: 'Start Task', 2: 'Finish' }}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '20px' }}>Actor View</h3>
          <Timer
            phases={sharedPhases}
            externalState={{
              currentPhase: "Phase 1",
              currentTime: 0,
              isRunning: false,
              isPaused: false,
              isFrozen: false,
            }}
            onStateChange={() => {}}
            user="actor"
            gameActions={{ 0: 'Begin Setup', 1: 'Start Task', 2: 'Finish' }}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Side-by-side comparison of Admin and Actor views showing the different interfaces and layouts.',
      },
    },
  },
};
