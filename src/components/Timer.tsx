import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Timer.css";

export interface TimerProps {
  phases: { duration: number; title?: string }[];
  onComplete?: () => void;
  onPhaseComplete?: (phaseIndex: number, phaseDuration: number) => void;
  onTick?: (currentTime: number, phaseIndex: number) => void;
  onStart?: () => void;
  onPause?: () => void;
  onStop?: () => void;
  onReset?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  // New: external action handler triggered by the last button
  onExternalAction?: (ctx: {
    currentTime: number;
    currentPhase: number;
    isRunning: boolean;
    isPaused: boolean;
  }) => void;
  autoStart?: boolean;
  className?: string;
  title?: string;
  gameActions?: { [phaseIndex: number]: string };
  user?: "actor" | "admin";
}

export interface TimerRef {
  start: () => void;
  pause: () => void;
  stop: () => void;
  reset: () => void;
  setPhases: (phases: { duration: number; title?: string }[]) => void;
  getCurrentTime: () => number;
  getCurrentPhase: () => number;
  isRunning: () => boolean;
  isPaused: () => boolean;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

export const Timer = React.forwardRef<TimerRef, TimerProps>(
  (
    {
      phases = [],
      onComplete,
      onPhaseComplete,
      onTick,
      onStart,
      onPause,
      onStop,
      onReset,
      onPrevious,
      onNext,
      onExternalAction, // <-- new
      autoStart = true,
      className = "",
      title = "TIMER",
      gameActions = {},
      user = "admin",
    },
    ref
  ) => {
    const [currentPhase, setCurrentPhase] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const start = useCallback(() => {
      if (phases.length === 0 || currentPhase >= phases.length) return;
      setIsRunning(true);
      setIsPaused(false);
      onStart?.();
    }, [phases.length, currentPhase, onStart]);

    const pause = useCallback(() => {
      setIsRunning(false);
      setIsPaused(true);
      onPause?.();
    }, [onPause]);

    const stop = useCallback(() => {
      setIsRunning(false);
      setIsPaused(false);
      setCurrentTime(0);
      setCurrentPhase(0);
      onStop?.();
    }, [onStop]);

    const reset = useCallback(() => {
      setIsRunning(false);
      setIsPaused(false);
      setCurrentTime(0);
      setCurrentPhase(0);
      onReset?.();
    }, [onReset]);

    const setTimerPhases = useCallback(
      (newPhases: { duration: number; title?: string }[]) => {
        setIsRunning(false);
        setIsPaused(false);
        setCurrentTime(0);
        setCurrentPhase(0);
      },
      []
    );

    React.useImperativeHandle(ref, () => ({
      start,
      pause,
      stop,
      reset,
      setPhases: setTimerPhases,
      getCurrentTime: () => currentTime,
      getCurrentPhase: () => currentPhase,
      isRunning: () => isRunning,
      isPaused: () => isPaused,
    }));

    useEffect(() => {
      if (autoStart && phases.length > 0) {
        start();
      }
    }, [autoStart, phases.length, start]);

    useEffect(() => {
      if (isRunning && currentPhase < phases.length) {
        intervalRef.current = setInterval(() => {
          setCurrentTime((prev) => {
            const newTime = prev + 1;
            onTick?.(newTime, currentPhase);

            // Check if current phase is complete
            if (newTime >= (phases[currentPhase]?.duration || 0)) {
              onPhaseComplete?.(
                currentPhase,
                phases[currentPhase]?.duration || 0
              );

              // Move to next phase or complete
              if (currentPhase + 1 < phases.length) {
                setCurrentPhase(currentPhase + 1);
                return 0; // Reset time for next phase
              } else {
                // All phases complete
                setIsRunning(false);
                setIsPaused(false);
                onComplete?.();
                return newTime;
              }
            }

            return newTime;
          });
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
    }, [isRunning, currentPhase, phases, onTick, onPhaseComplete, onComplete]);

    const currentPhaseDuration = phases[currentPhase]?.duration || 0;
    const progress =
      currentPhaseDuration > 0 ? (currentTime / currentPhaseDuration) * 100 : 0;
    // Determine if we finished all steps and are at the end
    const isAtEnd =
      phases.length > 0 &&
      !isRunning &&
      currentPhase === Math.max(0, phases.length - 1) &&
      currentTime >= (phases[Math.max(0, currentPhase)]?.duration || 0);

    const timerClasses = [
      "timer-header-control",
      className,
      isRunning ? "timer--running" : "",
      isPaused ? "timer--paused" : "",
      isAtEnd ? "timer--completed" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const remainingTime =
      currentPhaseDuration > 0 ? currentPhaseDuration - currentTime : 0;

    const renderStepIndicators = () => {
      const steps = [];
      const maxSteps = phases.length; // as requested: number of steps equals number of phases

      for (let i = 0; i < maxSteps; i++) {
        const isActive = i === currentPhase;
        const isCompleted = i < currentPhase;
        const hasAction = gameActions[i];

        let stepClass = "step-indicator";
        if (!hasAction && !isActive && !isCompleted) {
          stepClass += " step-indicator--placeholder";
        } else if (isActive) {
          stepClass += " step-indicator--active";
        } else if (isCompleted) {
          stepClass += " step-indicator--completed";
        } else {
          stepClass += " step-indicator--upcoming";
        }

        // Add the step indicator
        steps.push(
          <div
            key={i}
            className={stepClass}
            data-step={i + 1}
            title={
              phases[i]?.title
                ? `Step ${i + 1}: ${phases[i]?.title}`
                : hasAction
                ? `Step ${i + 1}: ${hasAction}`
                : `Step ${i + 1}`
            }
          >
            {hasAction || isActive || isCompleted ? i + 1 : ""}
          </div>
        );

        // For actor users, add progress bar between current step (n) and next step (n+1)
        if (user === "actor" && isActive && i < maxSteps - 1) {
          steps.push(
            <div
              key={`progress-${i}`}
              className="timer-progress-bar timer-progress-bar--inline"
            >
              <div
                className="timer-progress-fill"
                style={{ width: `${Math.min(100, progress)}%` }}
              />
            </div>
          );
        }
      }

      return (
        <div className="step-indicators">
          {steps}
          <div
            className={`step-expand ${isAtEnd ? "step-expand--end" : ""}`}
            title={isAtEnd ? "All steps completed" : "In progress"}
          >
            {isAtEnd ? (
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
      );
    };

    return (
      <div className={timerClasses}>
        <div className="timer-section">
          <div className="timer-content">
            <div className="timer-display-area">
              {user === "admin" && (
                <div className="timer-header">
                  <span className="timer-title">
                    {(phases[currentPhase]?.title || title).toUpperCase()}
                  </span>
                  <span className="timer-time">
                    {formatTime(Math.max(0, remainingTime))}
                  </span>
                </div>
              )}
              {user === "admin" && (
                <div className="timer-progress-bar">
                  <div
                    className="timer-progress-fill"
                    style={{ width: `${Math.min(100, progress)}%` }}
                  />
                </div>
              )}
              {renderStepIndicators()}
              {user === "actor" && (
                <div className="timer-header">
                  <span className="timer-title">
                    {(phases[currentPhase]?.title || title).toUpperCase()}
                  </span>
                  <span className="timer-time">
                    {formatTime(Math.max(0, remainingTime))}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {user === "admin" && (
          <div className="timer-controls-section">
            <button
              className="control-button control-button--previous"
              onClick={() => onPrevious?.()}
              disabled={currentPhase === 0}
              title="Previous"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.9813 2.39178C12.1589 2.38845 12.3342 2.43251 12.4892 2.51941C12.6441 2.60631 12.7731 2.73291 12.8629 2.88621C12.9527 3.0395 13 3.21395 13 3.3916L12.5 3.3916H13V12.6085C13 12.7862 12.9527 12.9606 12.8629 13.1139C12.7731 13.2672 12.6441 13.3938 12.4892 13.4807C12.3342 13.5676 12.1589 13.6117 11.9813 13.6084C11.8037 13.605 11.6301 13.5545 11.4785 13.4618L3.93741 8.85335C3.79124 8.76403 3.67046 8.63865 3.58667 8.48923C3.50287 8.33982 3.45886 8.17138 3.45886 8.00007C3.45886 7.82877 3.50287 7.66033 3.58667 7.51092C3.67046 7.3615 3.79124 7.23612 3.93741 7.14679L11.4785 2.53832C11.6301 2.44568 11.8037 2.3951 11.9813 2.39178ZM12 3.3916L4.45886 8.00007L4.19814 7.57343L4.45886 8.00007L12 12.6085V3.3916Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 2C2.27614 2 2.5 2.22386 2.5 2.5V13.5C2.5 13.7761 2.27614 14 2 14C1.72386 14 1.5 13.7761 1.5 13.5V2.5C1.5 2.22386 1.72386 2 2 2Z"
                  fill="black"
                />
              </svg>
            </button>

            <button
              className="control-button control-button--next"
              onClick={() => onNext?.()}
              disabled={!(isAtEnd && currentPhase < phases.length - 1)}
              title="Next"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.51084 2.51941C3.66579 2.43251 3.84109 2.38845 4.01871 2.39178C4.19633 2.3951 4.36986 2.44568 4.52145 2.53832L12.0626 7.14679C12.2088 7.23612 12.3295 7.3615 12.4133 7.51092C12.4971 7.66033 12.5411 7.82877 12.5411 8.00007C12.5411 8.17138 12.4971 8.33982 12.4133 8.48923C12.3295 8.63865 12.2088 8.76403 12.0626 8.85335L4.52145 13.4618C4.36986 13.5545 4.19633 13.605 4.01871 13.6084C3.84109 13.6117 3.66579 13.5676 3.51084 13.4807C3.3559 13.3938 3.2269 13.2672 3.13711 13.1139C3.04733 12.9606 3 12.7862 3 12.6085V3.3916C3 3.21395 3.04733 3.0395 3.13711 2.88621C3.22689 2.73292 3.35589 2.60631 3.51084 2.51941ZM11.5411 8.00007L4 3.3916V12.6085L11.5411 8.00007Z"
                  fill="black"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14 2C14.2761 2 14.5 2.22386 14.5 2.5V13.5C14.5 13.7761 14.2761 14 14 14C13.7239 14 13.5 13.7761 13.5 13.5V2.5C13.5 2.22386 13.7239 2 14 2Z"
                  fill="black"
                />
              </svg>
            </button>

            <button
              className={`control-button control-button--play-pause ${
                isRunning ? "control-button--pause" : "control-button--play"
              }`}
              onClick={isRunning ? pause : start}
              title={isRunning ? "Pause" : "Start"}
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
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 15.1788 6.47789 17.8975 9.27283 18.989C9.65866 19.1397 9.8493 19.5746 9.69862 19.9604C9.54794 20.3463 9.113 20.5369 8.72717 20.3862C5.37607 19.0775 3 15.8172 3 12C3 7.02944 7.02944 3 12 3C16.2192 3 19.7585 5.90255 20.7337 9.81878C20.9078 10.5179 21 11.2487 21 12C21 12.4142 20.6642 12.75 20.25 12.75C19.8358 12.75 19.5 12.4142 19.5 12C19.5 11.3719 19.4229 10.7628 19.2781 10.1812C18.4655 6.91754 15.5141 4.5 12 4.5Z"
                    fill="black"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.75 15.75V22.25H20.25V15.75H18.75ZM17.25 15.3636C17.25 14.5918 17.9689 14.25 18.4615 14.25H20.5385C21.0311 14.25 21.75 14.5918 21.75 15.3636V22.6364C21.75 23.4082 21.0311 23.75 20.5385 23.75H18.4615C17.9689 23.75 17.25 23.4082 17.25 22.6364V15.3636Z"
                    fill="black"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.75 15.75V22.25H14.25V15.75H12.75ZM11.25 15.3636C11.25 14.5918 11.9689 14.25 12.4615 14.25H14.5385C15.0311 14.25 15.75 14.5918 15.75 15.3636V22.6364C15.75 23.4082 15.0311 23.75 14.5385 23.75H12.4615C11.9689 23.75 11.25 23.4082 11.25 22.6364V15.3636Z"
                    fill="black"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.54996 7.40004C8.21858 7.64857 8.15143 8.11867 8.39996 8.45004L11.4 12.45C11.6485 12.7814 12.1186 12.8486 12.45 12.6C12.7813 12.3515 12.8485 11.8814 12.6 11.55L9.59996 7.55004C9.35143 7.21867 8.88133 7.15152 8.54996 7.40004Z"
                    fill="black"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
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
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                  />
                  <path
                    d="M12 12L9 8"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.75 0.75H14.25"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20.7759 18.1242L13.7125 14.0646C13.6415 14.0238 13.5603 14.0015 13.4771 14.0001C13.3939 13.9986 13.3118 14.018 13.2392 14.0563C13.1667 14.0946 13.1063 14.1503 13.0642 14.2178C13.0222 14.2854 13 14.3622 13 14.4404V22.5596C13 22.6378 13.0222 22.7146 13.0642 22.7822C13.1063 22.8497 13.1667 22.9054 13.2392 22.9437C13.3118 22.982 13.3939 23.0014 13.4771 22.9999C13.5603 22.9985 13.6415 22.9762 13.7125 22.9354L20.7759 18.8758C20.8443 18.8365 20.9009 18.7813 20.9401 18.7154C20.9794 18.6496 21 18.5755 21 18.5C21 18.4245 20.9794 18.3504 20.9401 18.2846C20.9009 18.2187 20.8443 18.1635 20.7759 18.1242V18.1242Z"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}
            </button>

            <button
              className="control-button control-button--stop"
              onClick={stop}
              title="Stop"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.14697 2.14648C9.34224 1.95133 9.65878 1.95126 9.854 2.14648C10.0489 2.34174 10.0491 2.65836 9.854 2.85352L8.50049 4.20703V7.13281L11.0337 5.66992L11.5298 3.82129C11.6012 3.5547 11.8755 3.3966 12.1421 3.46777C12.4088 3.53922 12.5679 3.8134 12.4966 4.08008L12.0767 5.64648L13.6421 6.06543C13.9088 6.1369 14.0681 6.41198 13.9966 6.67871C13.925 6.94527 13.6499 7.10368 13.3833 7.03223L11.5347 6.53613L8.99951 7.99902L11.5347 9.46191L13.3833 8.96777C13.65 8.8963 13.9251 9.05456 13.9966 9.32129C14.068 9.58799 13.9088 9.86213 13.6421 9.93359L12.0767 10.3535L12.4966 11.9199C12.5677 12.1865 12.4086 12.4608 12.1421 12.5322C11.8756 12.6033 11.6013 12.4451 11.5298 12.1787L11.0337 10.3281L8.50049 8.86523V11.793L9.854 13.1465C10.0489 13.3417 10.0491 13.6584 9.854 13.8535C9.65885 14.0487 9.34226 14.0484 9.14697 13.8535L8.00049 12.707L6.854 13.8535C6.65885 14.0487 6.34226 14.0484 6.14697 13.8535C5.95171 13.6583 5.95171 13.3417 6.14697 13.1465L7.50049 11.793V8.86523L4.96533 10.3281L4.47021 12.1787C4.39865 12.4451 4.12439 12.6034 3.85791 12.5322C3.59128 12.4608 3.43314 12.1866 3.50439 11.9199L3.92334 10.3535L2.35791 9.93359C2.09118 9.86212 1.93292 9.58802 2.00439 9.32129C2.07593 9.05464 2.35001 8.89631 2.6167 8.96777L4.46436 9.46191L6.99951 7.99902L4.46436 6.53613L2.6167 7.03223C2.35014 7.10366 2.07608 6.94513 2.00439 6.67871C1.93292 6.41198 2.09118 6.1369 2.35791 6.06543L3.92334 5.64648L3.50439 4.08008C3.43293 3.81334 3.59118 3.53924 3.85791 3.46777C4.12453 3.39654 4.39878 3.55467 4.47021 3.82129L4.96533 5.66992L7.50049 7.13281V4.20703L6.14697 2.85352C5.95171 2.65825 5.95171 2.34175 6.14697 2.14648C6.34224 1.95133 6.65878 1.95126 6.854 2.14648L8.00049 3.29297L9.14697 2.14648Z"
                  fill="black"
                />
              </svg>
            </button>

            <button
              className="control-button control-button--action"
              onClick={() =>
                onExternalAction?.({
                  currentTime,
                  currentPhase,
                  isRunning,
                  isPaused,
                })
              }
              title="Action"
            >
              <svg
                width="18"
                height="12"
                viewBox="0 0 18 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.19571 0.9375H13.9316L13.9576 0.939919L13.9055 1.5C13.9576 0.939919 13.958 0.939955 13.9584 0.939992L13.9593 0.940074L13.9612 0.940263L13.966 0.940753L13.9794 0.942218C13.9899 0.943426 14.0036 0.945121 14.0203 0.947429C14.0536 0.952044 14.0989 0.959129 14.1545 0.969722C14.2655 0.990879 14.4186 1.02621 14.5998 1.08426C14.9611 1.20007 15.4415 1.40866 15.9224 1.78153C16.9079 2.54562 17.8125 3.93493 17.8125 6.375C17.8125 8.84977 16.7446 10.2418 15.6228 10.9916C15.0757 11.3573 14.5319 11.5602 14.1264 11.6723C13.9228 11.7285 13.7514 11.7626 13.6282 11.7828C13.5666 11.7929 13.5167 11.7996 13.4807 11.8039C13.4626 11.8061 13.448 11.8076 13.437 11.8087L13.4234 11.81L13.4186 11.8104L13.4168 11.8106L13.416 11.8106C13.4157 11.8107 13.4154 11.8107 13.3704 11.25L13.416 11.8106L13.3929 11.8125H13.3704C12.4693 11.8125 11.7717 11.6348 11.2171 11.3425C10.6627 11.0503 10.2868 10.6623 10.0046 10.2977C9.86569 10.1182 9.74696 9.94078 9.64616 9.78996C9.5407 9.6322 9.46023 9.51197 9.38106 9.41262C9.22707 9.21935 9.16773 9.21939 9.13503 9.21941H9.13398C9.09752 9.21941 9.03241 9.22191 8.87346 9.41718C8.79345 9.51548 8.71127 9.63581 8.60695 9.79107C8.60069 9.80039 8.59437 9.80981 8.58797 9.81934C8.49236 9.96175 8.38151 10.1269 8.25589 10.2929C7.98421 10.6519 7.62551 11.0405 7.10214 11.335C6.57573 11.6313 5.91831 11.8125 5.07599 11.8125H5.0488L5.02173 11.8099L5.07599 11.25C5.02173 11.8099 5.02205 11.8099 5.02173 11.8099L5.0204 11.8097L5.01868 11.8096L5.01405 11.8091L5.00016 11.8076C4.98888 11.8063 4.97357 11.8045 4.95451 11.8019C4.91641 11.7969 4.8632 11.7892 4.79703 11.7779C4.66485 11.7553 4.47999 11.718 4.25972 11.6585C3.82115 11.5401 3.23123 11.3305 2.63538 10.9643C1.42058 10.2176 0.212463 8.83259 0.187947 6.38062C0.163902 3.97575 1.11355 2.587 2.13375 1.81616C2.63171 1.43991 3.12954 1.22329 3.50294 1.10027C3.69026 1.03855 3.84839 0.999684 3.96267 0.975868C4.01989 0.963945 4.06636 0.955744 4.10027 0.950316C4.11724 0.947601 4.13108 0.945576 4.14159 0.944124L4.15484 0.942358L4.15953 0.941769L4.16139 0.941543L4.1622 0.941446C4.16257 0.941403 4.16292 0.941361 4.22872 1.5L4.1622 0.941446L4.19571 0.9375ZM4.26997 2.0625C4.25203 2.06549 4.22575 2.07021 4.19218 2.07721C4.11398 2.09351 3.99723 2.1219 3.85498 2.16877C3.56924 2.26291 3.18912 2.42877 2.81194 2.71376C2.08184 3.2654 1.29234 4.31414 1.31289 6.36938C1.33297 8.37752 2.28763 9.43001 3.22447 10.0058C3.70444 10.3008 4.18756 10.4737 4.55306 10.5724C4.73484 10.6215 4.88477 10.6515 4.98688 10.669C5.03785 10.6778 5.07667 10.6833 5.1013 10.6866C5.10355 10.6869 5.10569 10.6871 5.10771 10.6874C5.76441 10.683 6.21815 10.5416 6.55042 10.3546C6.89104 10.1629 7.13992 9.90327 7.35877 9.61404C7.46458 9.47422 7.55912 9.33345 7.65787 9.18641L7.67313 9.1637C7.77297 9.01508 7.8831 8.85179 8.00097 8.70698C8.23778 8.41606 8.59073 8.09441 9.13398 8.09441C9.6812 8.09441 10.0292 8.42071 10.2609 8.71155C10.3706 8.8492 10.4746 9.00486 10.569 9.14611L10.5815 9.1648C10.6838 9.31787 10.7824 9.46461 10.8943 9.6092C11.1139 9.89292 11.3735 10.1532 11.7416 10.3472C12.1049 10.5387 12.6087 10.6838 13.3424 10.6874C13.3439 10.6873 13.3456 10.6871 13.3473 10.6869C13.368 10.6844 13.4015 10.6799 13.4459 10.6727C13.5349 10.658 13.6667 10.6321 13.8268 10.5879C14.1487 10.4989 14.5748 10.3389 14.9976 10.0563C15.8156 9.50956 16.6875 8.46406 16.6875 6.375C16.6875 4.25124 15.9198 3.20305 15.2331 2.6706C14.8779 2.3952 14.5221 2.24075 14.2564 2.1556C14.124 2.11316 14.0158 2.08853 13.944 2.07485C13.9117 2.0687 13.887 2.0648 13.8709 2.0625H4.26997ZM13.8498 2.05973C13.8494 2.05969 13.8497 2.05972 13.8508 2.05985L13.8498 2.05973Z"
                  fill="black"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.625 5.0625C4.77651 5.0625 4.3125 5.59288 4.3125 6C4.3125 6.40712 4.77651 6.9375 5.625 6.9375C6.47349 6.9375 6.9375 6.40712 6.9375 6C6.9375 5.59288 6.47349 5.0625 5.625 5.0625ZM3.1875 6C3.1875 4.75027 4.40242 3.9375 5.625 3.9375C6.84758 3.9375 8.0625 4.75027 8.0625 6C8.0625 7.24973 6.84758 8.0625 5.625 8.0625C4.40242 8.0625 3.1875 7.24973 3.1875 6Z"
                  fill="black"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.375 5.0625C11.5265 5.0625 11.0625 5.59288 11.0625 6C11.0625 6.40712 11.5265 6.9375 12.375 6.9375C13.2235 6.9375 13.6875 6.40712 13.6875 6C13.6875 5.59288 13.2235 5.0625 12.375 5.0625ZM9.9375 6C9.9375 4.75027 11.1524 3.9375 12.375 3.9375C13.5976 3.9375 14.8125 4.75027 14.8125 6C14.8125 7.24973 13.5976 8.0625 12.375 8.0625C11.1524 8.0625 9.9375 7.24973 9.9375 6Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  }
);

Timer.displayName = "Timer";
