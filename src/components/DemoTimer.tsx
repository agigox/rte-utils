import React from 'react';
import './Timer.css';
import { NextIcon, PreviousIcon } from './Icons';

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
 * Shows all controls like the admin view but they are disabled (non-interactive).
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
        stepClass += ' step-indicator--active step-indicator--admin';
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
    }

    return (
      <div className="step-indicators">
        {steps}
        <div className="step-expand" title="In progress">
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
        </div>
      </div>
    );
  };

  return (
    <div className={timerClasses}>
      <div className="timer-section">
        <div className="timer-content">
          <div className="timer-display-area">
            <div className="timer-header">
              <span className="timer-title">{phaseTitle.toUpperCase()}</span>
              <span className="timer-time">{formatTime(Math.max(0, remainingTime))}</span>
            </div>
            <div className="timer-progress-bar">
              <div
                className="timer-progress-fill"
                style={{ width: `${Math.min(100, progress)}%` }}
              />
            </div>
            {renderStepIndicators()}
          </div>
        </div>
      </div>

      <div className="timer-controls-section">
        <button
          className="control-button control-button--previous"
          disabled
          title="Previous (disabled in demo)"
          style={{ cursor: 'not-allowed', opacity: 0.5 }}
        >
          <PreviousIcon />
        </button>

        <button
          className="control-button control-button--next"
          disabled
          title="Next (disabled in demo)"
          style={{ cursor: 'not-allowed', opacity: 0.5 }}
        >
          <NextIcon />
        </button>

        <button
          className="control-button control-button--play-pause control-button--play"
          disabled
          title="Start (disabled in demo)"
          style={{ cursor: 'not-allowed', opacity: 0.5 }}
        >
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
        </button>

        <button
          className="control-button control-button--freeze"
          disabled
          title="Freeze (disabled in demo)"
          style={{ cursor: 'not-allowed', opacity: 0.5 }}
        >
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
          className="control-button control-button--anonymise"
          disabled
          title="Anonymise (disabled in demo)"
          style={{ cursor: 'not-allowed', opacity: 0.5 }}
        >
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
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.625 5.0625C4.77651 5.0625 4.3125 5.59288 4.3125 6C4.3125 6.40712 4.77651 6.9375 5.625 6.9375C6.47349 6.9375 6.9375 6.40712 6.9375 6C6.9375 5.59288 6.47349 5.0625 5.625 5.0625ZM3.1875 6C3.1875 4.75027 4.40242 3.9375 5.625 3.9375C6.84758 3.9375 8.0625 4.75027 8.0625 6C8.0625 7.24973 6.84758 8.0625 5.625 8.0625C4.40242 8.0625 3.1875 7.24973 3.1875 6Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.375 5.0625C11.5265 5.0625 11.0625 5.59288 11.0625 6C11.0625 6.40712 11.5265 6.9375 12.375 6.9375C13.2235 6.9375 13.6875 6.40712 13.6875 6C13.6875 5.59288 13.2235 5.0625 12.375 5.0625ZM9.9375 6C9.9375 4.75027 11.1524 3.9375 12.375 3.9375C13.5976 3.9375 14.8125 4.75027 14.8125 6C14.8125 7.24973 13.5976 8.0625 12.375 8.0625C11.1524 8.0625 9.9375 7.24973 9.9375 6Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

DemoTimer.displayName = 'DemoTimer';
