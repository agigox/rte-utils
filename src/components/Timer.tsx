import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Timer.css';
import { NextIcon, PreviousIcon } from './Icons';

export interface TimerProps {
  // Required phase configuration - duration in milliseconds
  phases: { duration: number; title?: string }[];

  // Required external state - always controlled
  externalState: {
    currentPhase: string; // phase title instead of index
    currentTime: number; // in milliseconds internally
    isRunning: boolean;
    isPaused: boolean;
    isFrozen: boolean;
  };

  // Required state change handler
  onStateChange: (state: {
    currentPhase: string; // phase title instead of index
    currentTime: number; // in milliseconds internally
    isRunning: boolean;
    isPaused: boolean;
    isFrozen: boolean;
  }) => void;

  // Optional event callbacks
  onComplete?: () => void;
  onPhaseComplete?: (phaseTitle: string, phaseDuration: number) => void;
  onTick?: (currentTime: number, phaseTitle: string) => void;
  onUnfreeze?: () => void;
  onUnpause?: () => void;
  onPause?: () => void;
  onFreeze?: (frozen: boolean) => void;
  onAnonymiseToggle?: (anonymised: boolean) => void;
  onStop?: () => void;
  onReset?: () => void;
  onPrevious?: (phaseName: string) => void;
  onNext?: (phaseName: string) => void;
  onPhaseClick?: (phaseName: string) => void;

  // UI configuration
  className?: string;
  gameActions?: { [phaseIndex: number]: string };
  user?: 'actor' | 'admin';
}

export interface TimerRef {
  start: () => void;
  pause: () => void;
  freeze: (force?: boolean) => void; // toggle or force
  toggleAnonymise: (force?: boolean) => void; // NEW
  stop: () => void;
  reset: () => void;
  setPhases: (phases: { duration: number; title?: string }[]) => void;
  getCurrentTime: () => number;
  getCurrentPhase: () => string; // returns phase title
  isRunning: () => boolean;
  isPaused: () => boolean;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const Timer = React.forwardRef<TimerRef, TimerProps>(
  (
    {
      phases = [],
      externalState,
      onStateChange,
      onComplete,
      onPhaseComplete,
      onTick,
      onUnfreeze,
      onUnpause,
      onPause,
      onFreeze,
      onAnonymiseToggle,
      onStop,
      onReset,
      onPrevious,
      onNext,
      onPhaseClick,
      className = '',
      gameActions = {},
      user = 'admin',
    },
    ref
  ) => {
    // Extract state from externalState - no internal timer state
    const { currentPhase, currentTime, isRunning, isPaused, isFrozen } = externalState;

    // Helper functions to work with phase indices internally
    const getCurrentPhaseIndex = useCallback(() => {
      return phases.findIndex(
        (phase) => (phase.title || `Phase ${phases.indexOf(phase) + 1}`) === currentPhase
      );
    }, [phases, currentPhase]);

    const getPhaseByIndex = useCallback(
      (index: number) => {
        return phases[index];
      },
      [phases]
    );

    const getPhaseTitle = useCallback(
      (index: number) => {
        const phase = phases[index];
        return phase?.title || `Phase ${index + 1}`;
      },
      [phases]
    );

    // Keep only UI-specific state (not timer logic)
    const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
    const [isAnonymised, setIsAnonymised] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const start = useCallback(() => {
      const currentPhaseIndex = getCurrentPhaseIndex();
      if (phases.length === 0 || currentPhaseIndex === -1 || currentPhaseIndex >= phases.length)
        return;

      // Determine which callback to trigger based on current state
      const wasUnpausing = isPaused && !isFrozen;
      const wasUnfreezing = isFrozen;

      onStateChange({
        ...externalState,
        isRunning: true,
        isPaused: false,
        isFrozen: false,
      });

      // Call appropriate callback based on previous state
      if (wasUnfreezing) {
        onUnfreeze?.();
      } else if (wasUnpausing) {
        onUnpause?.();
      }
    }, [
      phases.length,
      getCurrentPhaseIndex,
      externalState,
      onStateChange,
      isPaused,
      isFrozen,
      onUnfreeze,
      onUnpause,
    ]);

    const pause = useCallback(() => {
      if (isFrozen) return;

      onStateChange({
        ...externalState,
        isRunning: false,
        isPaused: true,
      });
      onPause?.();
    }, [isFrozen, externalState, onStateChange, onPause]);

    const freeze = useCallback(
      (force?: boolean) => {
        const nextFrozen = force === undefined ? !isFrozen : force;

        const newState = {
          ...externalState,
          isFrozen: nextFrozen,
          // When unfreezing, restore to running state (unless it was explicitly paused)
          // When freezing, stop running but preserve pause state
          isRunning: nextFrozen ? false : !externalState.isPaused,
          isPaused: externalState.isPaused, // Preserve pause state
        };

        onStateChange(newState);
        onFreeze?.(nextFrozen);

        // Call onUnfreeze when unfreezing
        if (!nextFrozen && isFrozen) {
          onUnfreeze?.();
        }
      },
      [isFrozen, externalState, onStateChange, onFreeze, onUnfreeze]
    );

    const toggleAnonymise = useCallback(
      (force?: boolean) => {
        setIsAnonymised((prev) => {
          const next = force === undefined ? !prev : force;
          onAnonymiseToggle?.(next);
          return next;
        });
      },
      [onAnonymiseToggle]
    );

    const stop = useCallback(() => {
      onStateChange({
        currentPhase: getPhaseTitle(0), // Reset to first phase title
        currentTime: 0,
        isRunning: false,
        isPaused: false,
        isFrozen: false,
      });
      onStop?.();
    }, [onStateChange, onStop, getPhaseTitle]);

    const reset = useCallback(() => {
      onStateChange({
        currentPhase: getPhaseTitle(0), // Reset to first phase title
        currentTime: 0,
        isRunning: false,
        isPaused: false,
        isFrozen: false,
      });
      onReset?.();
    }, [onStateChange, onReset, getPhaseTitle]);

    const setTimerPhases = useCallback(() => {
      // No-op since phases come from props
    }, []);

    React.useImperativeHandle(ref, () => ({
      start,
      pause,
      freeze,
      toggleAnonymise,
      stop,
      reset,
      setPhases: setTimerPhases,
      getCurrentTime: () => currentTime,
      getCurrentPhase: () => currentPhase,
      isRunning: () => isRunning,
      isPaused: () => isPaused,
    }));

    useEffect(() => {
      const currentPhaseIndex = getCurrentPhaseIndex();
      if (isRunning && !isFrozen && currentPhaseIndex !== -1 && currentPhaseIndex < phases.length) {
        intervalRef.current = setInterval(() => {
          const newTimeMs = currentTime + 1000; // increment by 1000ms (1 second)
          const currentPhase = getPhaseByIndex(currentPhaseIndex);
          const phaseDurationMs = currentPhase?.duration || 0;

          // Check if phase will be complete after this tick
          const willCompletePhase = newTimeMs >= phaseDurationMs;

          // For phase completion, show exact duration (00:00) first
          const timeToUpdate = willCompletePhase ? phaseDurationMs : newTimeMs;

          // Update the elapsed time first
          onStateChange({
            ...externalState,
            currentTime: timeToUpdate,
          });
          onTick?.(Math.floor(timeToUpdate / 1000), getPhaseTitle(currentPhaseIndex)); // Pass seconds to callback

          // Use setTimeout to allow the 00:00 display to render before phase completion
          if (willCompletePhase) {
            setTimeout(() => {
              onPhaseComplete?.(getPhaseTitle(currentPhaseIndex), phaseDurationMs);

              // Move to next phase or complete
              if (currentPhaseIndex + 1 < phases.length) {
                onStateChange({
                  ...externalState,
                  currentPhase: getPhaseTitle(currentPhaseIndex + 1),
                  currentTime: 0,
                });
              } else {
                onStateChange({
                  ...externalState,
                  currentTime: phaseDurationMs, // Ensure we set time to exact duration
                  isRunning: false,
                  isPaused: false,
                });
                onComplete?.();
              }
            }, 1000); // Wait 1 full second to show 00:00 before phase transition
          }
        }, 1000);
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }, [
      isRunning,
      isFrozen,
      getCurrentPhaseIndex,
      currentTime,
      phases.length,
      externalState,
      onStateChange,
      onTick,
      onPhaseComplete,
      onComplete,
      getPhaseByIndex,
      getPhaseTitle,
    ]);

    // Clear selected phase when current phase changes
    useEffect(() => {
      setSelectedPhase(null);
    }, [currentPhase]);

    const currentPhaseIndex = getCurrentPhaseIndex();
    const currentPhaseData = getPhaseByIndex(currentPhaseIndex);
    const currentPhaseDurationMs = currentPhaseData?.duration || 0;
    const currentTimeSeconds = Math.floor(currentTime / 1000); // convert ms to seconds for display
    const currentPhaseDurationSeconds = Math.floor(currentPhaseDurationMs / 1000); // convert ms to seconds for display
    const progress = currentPhaseDurationMs > 0 ? (currentTime / currentPhaseDurationMs) * 100 : 0;
    // Determine if we finished all steps and are at the end
    const isAtEnd =
      phases.length > 0 &&
      !isRunning &&
      currentPhaseIndex === Math.max(0, phases.length - 1) &&
      currentTime >= currentPhaseDurationMs;

    const timerClasses = [
      'timer-header-control',
      className,
      isRunning ? 'timer--running' : '',
      isPaused ? 'timer--paused' : '',
      isFrozen ? 'timer--frozen' : '',
      // isAnonymised ? 'timer--anonymised' : '',
      isAtEnd ? 'timer--completed' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const remainingTime =
      currentPhaseDurationSeconds > 0 ? currentPhaseDurationSeconds - currentTimeSeconds : 0;

    // Force remaining time to 0 if we're at the exact phase duration or beyond
    const finalRemainingTime = isAtEnd || currentTime >= currentPhaseDurationMs ? 0 : remainingTime;

    const renderStepIndicators = () => {
      const steps = [] as React.ReactNode[];
      const maxSteps = phases.length;

      for (let i = 0; i < maxSteps; i++) {
        const isActive = i === currentPhaseIndex;
        const isCompleted = i < currentPhaseIndex;
        const hasAction = gameActions[i];
        const isClickable = isActive || isCompleted; // only active or completed

        let stepClass = 'step-indicator';
        if (!hasAction && !isActive && !isCompleted) {
          stepClass += ' step-indicator--placeholder';
        } else if (isActive) {
          stepClass +=
            ' step-indicator--active' +
            (user === 'actor' ? ' step-indicator--actor' : ' step-indicator--admin');
        } else if (isCompleted) {
          stepClass += ' step-indicator--completed';
        } else {
          stepClass += ' step-indicator--upcoming';
        }
        if (isClickable) stepClass += ' step-indicator--clickable'; // add clickable style
        if (selectedPhase === i) stepClass += ' step-indicator--selected'; // highlight clicked

        const handleClick = () => {
          if (!isClickable) return;
          setSelectedPhase(i);
          onPhaseClick?.(getPhaseTitle(i));
        };

        const commonProps = {
          className: stepClass,
          'data-step': i + 1,
          title: phases[i]?.title
            ? `Step ${i + 1}: ${phases[i]?.title}`
            : hasAction
              ? `Step ${i + 1}: ${hasAction}`
              : `Step ${i + 1}`,
          onClick: isClickable ? handleClick : undefined,
          role: isClickable ? ('button' as const) : undefined,
          tabIndex: isClickable ? 0 : undefined,
          onKeyDown: isClickable
            ? (e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleClick();
                }
              }
            : undefined,
        };

        steps.push(
          <div key={i} {...commonProps}>
            {hasAction || isActive || isCompleted ? i + 1 : ''}
          </div>
        );

        if (user === 'actor' && isActive) {
          steps.push(
            <div key={`header-inline-${i}`} className="timer-header--block">
              <div className="timer-header timer-header--inline">
                <span className="timer-title">
                  {(currentPhaseData?.title || 'TIMER').toUpperCase()}
                </span>
                <span className="timer-time">{formatTime(Math.max(0, finalRemainingTime))}</span>
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
        <div className="steps-indicator-container">
          <div className="step-indicators">
            {steps}
            <div
              className={`step-expand ${isAtEnd ? 'step-expand--end' : ''}`}
              title={isAtEnd ? 'All steps completed' : 'In progress'}
            >
              {user === 'actor' ? (
                isAtEnd ? (
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
                ) : (
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
                )
              ) : isAtEnd ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 8C16 8.276 15.776 8.5 15.5 8.5L13.4766 8.5C13.238 11.1345 11.1345 13.238 8.5 13.4766L8.5 15.5C8.5 15.776 8.276 16 8 16C7.724 16 7.5 15.776 7.5 15.5L7.5 13.4766C4.86554 13.238 2.763 11.1345 2.52441 8.5L0.5 8.5C0.224 8.5 -3.61755e-07 8.276 -3.49691e-07 8C-3.29564e-07 7.724 0.224 7.5 0.5 7.5L2.52441 7.5C2.763 4.86555 4.86554 2.76198 7.5 2.52344L7.5 0.5C7.5 0.224 7.724 -3.61755e-07 8 -3.4969e-07C8.276 -3.29563e-07 8.5 0.224 8.5 0.5L8.5 2.52344C11.1345 2.76199 13.238 4.86551 13.4766 7.5L15.5 7.5C15.776 7.5 16 7.724 16 8ZM12.5 8C12.5 5.51867 10.4813 3.5 8 3.5C5.51867 3.5 3.5 5.51867 3.5 8C3.5 10.4813 5.51867 12.5 8 12.5C10.4813 12.5 12.5 10.4813 12.5 8ZM10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 8C16 8.276 15.776 8.5 15.5 8.5L13.4766 8.5C13.238 11.1345 11.1345 13.238 8.5 13.4766L8.5 15.5C8.5 15.776 8.276 16 8 16C7.724 16 7.5 15.776 7.5 15.5L7.5 13.4766C4.86554 13.238 2.763 11.1345 2.52441 8.5L0.5 8.5C0.224 8.5 -3.61755e-07 8.276 -3.49691e-07 8C-3.29564e-07 7.724 0.224 7.5 0.5 7.5L2.52441 7.5C2.763 4.86555 4.86554 2.76198 7.5 2.52344L7.5 0.5C7.5 0.224 7.724 -3.61755e-07 8 -3.4969e-07C8.276 -3.29563e-07 8.5 0.224 8.5 0.5L8.5 2.52344C11.1345 2.76199 13.238 4.86551 13.4766 7.5L15.5 7.5C15.776 7.5 16 7.724 16 8ZM12.5 8C12.5 5.51867 10.4813 3.5 8 3.5C5.51867 3.5 3.5 5.51867 3.5 8C3.5 10.4813 5.51867 12.5 8 12.5C10.4813 12.5 12.5 10.4813 12.5 8ZM10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8Z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </div>
          </div>
          <div
            className="navigation-phase"
            style={{
              visibility:
                selectedPhase !== null && selectedPhase !== currentPhaseIndex
                  ? 'visible'
                  : 'hidden',
            }}
          >
            {selectedPhase !== null
              ? (
                  getPhaseByIndex(selectedPhase)?.title || `Phase ${selectedPhase + 1}`
                ).toUpperCase()
              : ''}
          </div>
        </div>
      );
    };

    return (
      <div className={timerClasses}>
        <div className="timer-section">
          <div className="timer-content">
            <div className="timer-display-area">
              {user === 'admin' && (
                <div className="timer-header">
                  <span className="timer-title">
                    {(currentPhaseData?.title || 'TIMER').toUpperCase()}
                  </span>
                  <span className="timer-time">{formatTime(Math.max(0, finalRemainingTime))}</span>
                </div>
              )}
              {user === 'admin' && (
                <div className="timer-progress-bar">
                  <div
                    className="timer-progress-fill"
                    style={{ width: `${Math.min(100, progress)}%` }}
                  />
                </div>
              )}
              {renderStepIndicators()}
            </div>
          </div>
        </div>

        {user === 'admin' && (
          <div className="timer-controls-section">
            <button
              className="control-button control-button--previous"
              onClick={() => {
                // Navigate to previous phase if available
                const targetIndex =
                  selectedPhase !== null ? selectedPhase - 1 : currentPhaseIndex - 1;
                if (targetIndex >= 0) {
                  setSelectedPhase(targetIndex);
                  onPrevious?.(getPhaseTitle(targetIndex));
                }
              }}
              disabled={selectedPhase !== null ? selectedPhase <= 0 : currentPhaseIndex <= 0}
              title="Previous"
            >
              <PreviousIcon />
            </button>

            <button
              className="control-button control-button--next"
              onClick={() => {
                // Navigate to next phase if available
                const currentRef = selectedPhase !== null ? selectedPhase : currentPhaseIndex;
                const targetIndex = currentRef + 1;
                if (targetIndex < phases.length && targetIndex <= currentPhaseIndex) {
                  setSelectedPhase(targetIndex);
                  onNext?.(getPhaseTitle(targetIndex));
                }
              }}
              disabled={
                selectedPhase !== null
                  ? selectedPhase >= currentPhaseIndex || selectedPhase >= phases.length - 1
                  : currentPhaseIndex >= phases.length - 1
              }
              title="Next"
            >
              <NextIcon />
            </button>

            <button
              className={`control-button control-button--play-pause ${
                isRunning ? 'control-button--pause' : 'control-button--play'
              } ${isFrozen ? 'control-button--disabled' : ''}`}
              onClick={isRunning ? pause : start}
              title={isFrozen ? 'Frozen' : isRunning ? 'Pause' : isPaused ? 'Resume' : 'Start'}
              disabled={isFrozen}
            >
              {isRunning ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 15.1788 6.47789 17.8975 9.27283 18.989C9.65866 19.1397 9.8493 19.5746 9.69862 19.9604C9.54794 20.3463 9.113 20.5369 8.72717 20.3862C5.37607 19.0775 3 15.8172 3 12C3 7.02944 7.02944 3 12 3C16.2192 3 19.7585 5.90255 20.7337 9.81878C20.9078 10.5179 21 11.2487 21 12C21 12.4142 20.6642 12.75 20.25 12.75C19.8358 12.75 19.5 12.4142 19.5 12C19.5 11.3719 19.4229 10.7628 19.2781 10.1812C18.4655 6.91754 15.5141 4.5 12 4.5Z"
                    fill="black"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.75 15.75V22.25H20.25V15.75H18.75ZM17.25 15.3636C17.25 14.5918 17.9689 14.25 18.4615 14.25H20.5385C21.0311 14.25 21.75 14.5918 21.75 15.3636V22.6364C21.75 23.4082 21.0311 23.75 20.5385 23.75H18.4615C17.9689 23.75 17.25 23.4082 17.25 22.6364V15.3636Z"
                    fill="black"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.75 15.75V22.25H14.25V15.75H12.75ZM11.25 15.3636C11.25 14.5918 11.9689 14.25 12.4615 14.25H14.5385C15.0311 14.25 15.75 14.5918 15.75 15.3636V22.6364C15.75 23.4082 15.0311 23.75 14.5385 23.75H12.4615C11.9689 23.75 11.25 23.4082 11.25 22.6364V15.3636Z"
                    fill="black"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.54996 7.40004C8.21858 7.64857 8.15143 8.11867 8.39996 8.45004L11.4 12.45C11.6485 12.7814 12.1186 12.8486 12.45 12.6C12.7813 12.3515 12.8485 11.8814 12.6 11.55L9.59996 7.55004C9.35143 7.21867 8.88133 7.15152 8.54996 7.40004Z"
                    fill="black"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 0.75C9 0.335786 9.33579 0 9.75 0H14.25C14.6642 0 15 0.335786 15 0.75C15 1.16421 14.6642 1.5 14.25 1.5H9.75C9.33579 1.5 9 1.16421 9 0.75Z"
                    fill="black"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.25 12C20.25 11.3103 20.1654 10.6404 20.0059 10C19.112 6.41005 15.8666 3.75 12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 15.498 5.92698 18.4875 9 19.6876"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 12L9 8"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.75 0.75H14.25"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.7759 18.1242L13.7125 14.0646C13.6415 14.0238 13.5603 14.0015 13.4771 14.0001C13.3939 13.9986 13.3118 14.018 13.2392 14.0563C13.1667 14.0946 13.1063 14.1503 13.0642 14.2178C13.0222 14.2854 13 14.3622 13 14.4404V22.5596C13 22.6378 13.0222 22.7146 13.0642 22.7822C13.1063 22.8497 13.1667 22.9054 13.2392 22.9437C13.3118 22.982 13.3939 23.0014 13.4771 22.9999C13.5603 22.9985 13.6415 22.9762 13.7125 22.9354L20.7759 18.8758C20.8443 18.8365 20.9009 18.7813 20.9401 18.7154C20.9794 18.6496 21 18.5755 21 18.5C21 18.4245 20.9794 18.3504 20.9401 18.2846C20.9009 18.2187 20.8443 18.1635 20.7759 18.1242V18.1242Z"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>

            <button
              className={`control-button control-button--freeze ${isFrozen ? 'control-button--freeze-active' : ''}`}
              onClick={() => freeze()}
              title={isFrozen ? 'Unfreeze' : 'Freeze'}
              disabled={!isRunning && !isPaused && !isFrozen}
            >
              {/* Simple snowflake / asterisk style placeholder icon */}
              <svg
                width="14"
                height="12"
                viewBox="0 0 14 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.14697 0.146484C8.34224 -0.0486747 8.65878 -0.0487434 8.854 0.146484C9.04889 0.341739 9.04905 0.658358 8.854 0.853516L7.50049 2.20703V5.13281L10.0337 3.66992L10.5298 1.82129C10.6012 1.5547 10.8755 1.3966 11.1421 1.46777C11.4088 1.53922 11.5679 1.8134 11.4966 2.08008L11.0767 3.64648L12.6421 4.06543C12.9088 4.1369 13.0681 4.41198 12.9966 4.67871C12.925 4.94527 12.6499 5.10368 12.3833 5.03223L10.5347 4.53613L7.99951 5.99902L10.5347 7.46191L12.3833 6.96777C12.65 6.8963 12.9251 7.05456 12.9966 7.32129C13.068 7.58799 12.9088 7.86213 12.6421 7.93359L11.0767 8.35352L11.4966 9.91992C11.5677 10.1865 11.4086 10.4608 11.1421 10.5322C10.8756 10.6033 10.6013 10.4451 10.5298 10.1787L10.0337 8.32812L7.50049 6.86523V9.79297L8.854 11.1465C9.04889 11.3417 9.04905 11.6584 8.854 11.8535C8.65885 12.0487 8.34226 12.0484 8.14697 11.8535L7.00049 10.707L5.854 11.8535C5.65885 12.0487 5.34226 12.0484 5.14697 11.8535C4.95171 11.6583 4.95171 11.3417 5.14697 11.1465L6.50049 9.79297V6.86523L3.96533 8.32812L3.47021 10.1787C3.39865 10.4451 3.12439 10.6034 2.85791 10.5322C2.59128 10.4608 2.43314 10.1866 2.50439 9.91992L2.92334 8.35352L1.35791 7.93359C1.09118 7.86212 0.932919 7.58802 1.00439 7.32129C1.07593 7.05464 1.35001 6.89631 1.6167 6.96777L3.46436 7.46191L5.99951 5.99902L3.46436 4.53613L1.6167 5.03223C1.35014 5.10366 1.07608 4.94513 1.00439 4.67871C0.932919 4.41198 1.09118 4.1369 1.35791 4.06543L2.92334 3.64648L2.50439 2.08008C2.43293 1.81334 2.59118 1.53924 2.85791 1.46777C3.12453 1.39654 3.39878 1.55467 3.47021 1.82129L3.96533 3.66992L6.50049 5.13281V2.20703L5.14697 0.853516C4.95171 0.658253 4.95171 0.341747 5.14697 0.146484C5.34224 -0.0486746 5.65878 -0.0487434 5.854 0.146484L7.00049 1.29297L8.14697 0.146484Z"
                  fill="black"
                />
              </svg>
            </button>
            <button
              className={`control-button control-button--anonymise ${isAnonymised ? 'control-button--anonymise-active' : ''}`}
              onClick={() => toggleAnonymise()}
              title={isAnonymised ? 'Show Names' : 'Hide Names'}
            >
              {/* Simple snowflake / asterisk style placeholder icon */}
              <svg
                width="18"
                height="12"
                viewBox="0 0 18 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.19571 0.9375H13.9316L13.9576 0.939919L13.9055 1.5C13.9576 0.939919 13.958 0.939955 13.9584 0.939992L13.9593 0.940074L13.9612 0.940263L13.966 0.940753L13.9794 0.942218C13.9899 0.943426 14.0036 0.945121 14.0203 0.947429C14.0536 0.952044 14.0989 0.959129 14.1545 0.969722C14.2655 0.990879 14.4186 1.02621 14.5998 1.08426C14.9611 1.20007 15.4415 1.40866 15.9224 1.78153C16.9079 2.54562 17.8125 3.93493 17.8125 6.375C17.8125 8.84977 16.7446 10.2418 15.6228 10.9916C15.0757 11.3573 14.5319 11.5602 14.1264 11.6723C13.9228 11.7285 13.7514 11.7626 13.6282 11.7828C13.5666 11.7929 13.5167 11.7996 13.4807 11.8039C13.4626 11.8061 13.448 11.8076 13.437 11.8087L13.4234 11.81L13.4186 11.8104L13.4168 11.8106L13.416 11.8106C13.4157 11.8107 13.4154 11.8107 13.3704 11.25L13.416 11.8106L13.3929 11.8125H13.3704C12.4693 11.8125 11.7717 11.6348 11.2171 11.3425C10.6627 11.0503 10.2868 10.6623 10.0046 10.2977C9.86569 10.1182 9.74696 9.94078 9.64616 9.78996C9.5407 9.6322 9.46023 9.51197 9.38106 9.41262C9.22707 9.21935 9.16773 9.21939 9.13503 9.21941H9.13398C9.09752 9.21941 9.03241 9.22191 8.87346 9.41718C8.79345 9.51548 8.71127 9.63581 8.60695 9.79107C8.60069 9.80039 8.59437 9.80981 8.58797 9.81934C8.49236 9.96175 8.38151 10.1269 8.25589 10.2929C7.98421 10.6519 7.62551 11.0405 7.10214 11.335C6.57573 11.6313 5.91831 11.8125 5.07599 11.8125H5.0488L5.02173 11.8099L5.07599 11.25C5.02173 11.8099 5.02205 11.8099 5.02173 11.8099L5.0204 11.8097L5.01868 11.8096L5.01405 11.8091L5.00016 11.8076C4.98888 11.8063 4.97357 11.8045 4.95451 11.8019C4.91641 11.7969 4.8632 11.7892 4.79703 11.7779C4.66485 11.7553 4.47999 11.718 4.25972 11.6585C3.82115 11.5401 3.23123 11.3305 2.63538 10.9643C1.42058 10.2176 0.212463 8.83259 0.187947 6.38062C0.163902 3.97575 1.11355 2.587 2.13375 1.81616C2.63171 1.43991 3.12954 1.22329 3.50294 1.10027C3.69026 1.03855 3.84839 0.999684 3.96267 0.975868C4.01989 0.963945 4.06636 0.955744 4.10027 0.950316C4.11724 0.947601 4.13108 0.945576 4.14159 0.944124L4.15484 0.942358L4.15953 0.941769L4.16139 0.941543L4.1622 0.941446C4.16257 0.941403 4.16292 0.941361 4.22872 1.5L4.1622 0.941446L4.19571 0.9375ZM4.26997 2.0625C4.25203 2.06549 4.22575 2.07021 4.19218 2.07721C4.11398 2.09351 3.99723 2.1219 3.85498 2.16877C3.56924 2.26291 3.18912 2.42877 2.81194 2.71376C2.08184 3.2654 1.29234 4.31414 1.31289 6.36938C1.33297 8.37752 2.28763 9.43001 3.22447 10.0058C3.70444 10.3008 4.18756 10.4737 4.55306 10.5724C4.73484 10.6215 4.88477 10.6515 4.98688 10.669C5.03785 10.6778 5.07667 10.6833 5.1013 10.6866C5.10355 10.6869 5.10569 10.6871 5.10771 10.6874C5.76441 10.683 6.21815 10.5416 6.55042 10.3546C6.89104 10.1629 7.13992 9.90327 7.35877 9.61404C7.46458 9.47422 7.55912 9.33345 7.65787 9.18641L7.67313 9.1637C7.77297 9.01508 7.8831 8.85179 8.00097 8.70698C8.23778 8.41606 8.59073 8.09441 9.13398 8.09441C9.6812 8.09441 10.0292 8.42071 10.2609 8.71155C10.3706 8.8492 10.4746 9.00486 10.569 9.14611L10.5815 9.1648C10.6838 9.31787 10.7824 9.46461 10.8943 9.6092C11.1139 9.89292 11.3735 10.1532 11.7416 10.3472C12.1049 10.5387 12.6087 10.6838 13.3424 10.6874C13.3439 10.6873 13.3456 10.6871 13.3473 10.6869C13.368 10.6844 13.4015 10.6799 13.4459 10.6727C13.5349 10.658 13.6667 10.6321 13.8268 10.5879C14.1487 10.4989 14.5748 10.3389 14.9976 10.0563C15.8156 9.50956 16.6875 8.46406 16.6875 6.375C16.6875 4.25124 15.9198 3.20305 15.2331 2.6706C14.8779 2.3952 14.5221 2.24075 14.2564 2.1556C14.124 2.11316 14.0158 2.08853 13.944 2.07485C13.9117 2.0687 13.887 2.0648 13.8709 2.0625H4.26997ZM13.8498 2.05973C13.8494 2.05969 13.8497 2.05972 13.8508 2.05985L13.8498 2.05973Z"
                  fill={isAnonymised ? 'white' : 'black'}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.625 5.0625C4.77651 5.0625 4.3125 5.59288 4.3125 6C4.3125 6.40712 4.77651 6.9375 5.625 6.9375C6.47349 6.9375 6.9375 6.40712 6.9375 6C6.9375 5.59288 6.47349 5.0625 5.625 5.0625ZM3.1875 6C3.1875 4.75027 4.40242 3.9375 5.625 3.9375C6.84758 3.9375 8.0625 4.75027 8.0625 6C8.0625 7.24973 6.84758 8.0625 5.625 8.0625C4.40242 8.0625 3.1875 7.24973 3.1875 6Z"
                  fill={isAnonymised ? 'white' : 'black'}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.375 5.0625C11.5265 5.0625 11.0625 5.59288 11.0625 6C11.0625 6.40712 11.5265 6.9375 12.375 6.9375C13.2235 6.9375 13.6875 6.40712 13.6875 6C13.6875 5.59288 13.2235 5.0625 12.375 5.0625ZM9.9375 6C9.9375 4.75027 11.1524 3.9375 12.375 3.9375C13.5976 3.9375 14.8125 4.75027 14.8125 6C14.8125 7.24973 13.5976 8.0625 12.375 8.0625C11.1524 8.0625 9.9375 7.24973 9.9375 6Z"
                  fill={isAnonymised ? 'white' : 'black'}
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  }
);

Timer.displayName = 'Timer';
