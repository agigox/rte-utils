import React from 'react';
import './Timer.css';

export interface DemoTimerProps {
  // Required phase configuration - duration in milliseconds
  phases: { duration: number; title?: string }[];

  // Target phase to display (0-based index)
  targetPhase: number;

  // Target time in milliseconds to display in the target phase
  targetTime: number;

  // Optional className
  className?: string;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * DemoTimer component displays a Timer at a specific phase and time for demonstration purposes.
 * Renders in actor view (no controls, inline timer display after active step).
 *
 * Example: To show Phase 2 at 3 seconds (3000ms):
 * <DemoTimer
 *   phases={[
 *     { duration: 6000, title: 'Phase 1' },
 *     { duration: 9000, title: 'Phase 2' }
 *   ]}
 *   targetPhase={1}
 *   targetTime={3000}
 * />
 */
export const DemoTimer: React.FC<DemoTimerProps> = ({
  phases,
  targetPhase,
  targetTime,
  className = '',
}) => {
  // Validate targetPhase
  const currentPhaseIndex = Math.max(0, Math.min(targetPhase, phases.length - 1));
  const currentPhaseData = phases[currentPhaseIndex];
  const phaseTitle = currentPhaseData?.title || `Phase ${currentPhaseIndex + 1}`;

  // Validate targetTime - clamp to phase duration
  const phaseDuration = currentPhaseData?.duration || 0;
  const clampedTime = Math.max(0, Math.min(targetTime, phaseDuration));

  const currentTimeSeconds = Math.floor(clampedTime / 1000);
  const currentPhaseDurationSeconds = Math.floor(phaseDuration / 1000);
  const progress = phaseDuration > 0 ? (clampedTime / phaseDuration) * 100 : 0;
  const remainingTime =
    currentPhaseDurationSeconds > 0 ? currentPhaseDurationSeconds - currentTimeSeconds : 0;

  const timerClasses = ['timer-header-control', className].filter(Boolean).join(' ');

  const renderStepIndicators = () => {
    const steps = [] as React.ReactNode[];
    const maxSteps = phases.length;

    for (let i = 0; i < maxSteps; i++) {
      const isActive = i === currentPhaseIndex;
      const isCompleted = i < currentPhaseIndex;

      let stepClass = 'step-indicator';
      if (isActive) {
        stepClass += ' step-indicator--active step-indicator--actor';
      } else if (isCompleted) {
        stepClass += ' step-indicator--completed';
      } else {
        stepClass += ' step-indicator--upcoming';
      }

      steps.push(
        <div
          key={i}
          className={stepClass}
          data-step={i + 1}
          title={phases[i]?.title ? `Step ${i + 1}: ${phases[i]?.title}` : `Step ${i + 1}`}
        >
          {i + 1}
        </div>
      );

      if (isActive) {
        steps.push(
          <div key={`header-inline-${i}`} className="timer-header--block">
            <div className="timer-header timer-header--inline">
              <span className="timer-title">{phaseTitle.toUpperCase()}</span>
              <span className="timer-time">{formatTime(Math.max(0, remainingTime))}</span>
            </div>
            <div className="timer-progress-bar timer-progress-bar--inline">
              <div
                className="timer-progress-fill"
                style={{ width: `${Math.min(100, progress)}%` }}
              />
            </div>
          </div>
        );
      }
    }

    return (
      <div className="step-indicators">
        {steps}
        <div className="step-expand" title="In progress">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="24"
              width="24"
              height="24"
              rx="12"
              transform="rotate(90 24 0)"
              fill="#292E33"
            />
            <path
              d="M20 12C20 12.276 19.776 12.5 19.5 12.5L17.4766 12.5C17.238 15.1345 15.1345 17.238 12.5 17.4766L12.5 19.5C12.5 19.776 12.276 20 12 20C11.724 20 11.5 19.776 11.5 19.5L11.5 17.4766C8.86554 17.238 6.763 15.1345 6.52441 12.5L4.5 12.5C4.224 12.5 4 12.276 4 12C4 11.724 4.224 11.5 4.5 11.5L6.52441 11.5C6.763 8.86555 8.86554 6.76198 11.5 6.52344L11.5 4.5C11.5 4.224 11.724 4 12 4C12.276 4 12.5 4.224 12.5 4.5L12.5 6.52344C15.1345 6.76199 17.238 8.86551 17.4766 11.5L19.5 11.5C19.776 11.5 20 11.724 20 12ZM16.5 12C16.5 9.51867 14.4813 7.5 12 7.5C9.51867 7.5 7.5 9.51867 7.5 12C7.5 14.4813 9.51867 16.5 12 16.5C14.4813 16.5 16.5 14.4813 16.5 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div className={timerClasses}>
      <div className="timer-section">
        <div className="timer-content">
          <div className="timer-display-area">{renderStepIndicators()}</div>
        </div>
      </div>
    </div>
  );
};

DemoTimer.displayName = 'DemoTimer';
