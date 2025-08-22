import React, { useRef, useState } from 'react';
import { Timer, TimerRef } from '../../src/components';

export const TimerDemo: React.FC = () => {
  const controlledTimerRef = useRef<TimerRef>(null);
  
  // Timer states for different demos
  const [mainTimerState, setMainTimerState] = useState({
    currentPhase: "Phase 1",
    currentTime: 0,
    isRunning: false,
    isPaused: false,
    isFrozen: false,
  });
  
  const [controlledTimerState, setControlledTimerState] = useState({
    currentPhase: "Phase 1",
    currentTime: 0,
    isRunning: false,
    isPaused: false,
    isFrozen: false,
  });
  
  // Timer states for multiple game sessions
  const [quickGameState, setQuickGameState] = useState({
    currentPhase: "Phase 1",
    currentTime: 0,
    isRunning: false,
    isPaused: false,
    isFrozen: false,
  });
  
  const [standardGameState, setStandardGameState] = useState({
    currentPhase: "Phase 1",
    currentTime: 0,
    isRunning: false,
    isPaused: false,
    isFrozen: false,
  });
  
  const [extendedGameState, setExtendedGameState] = useState({
    currentPhase: "Phase 1",
    currentTime: 0,
    isRunning: false,
    isPaused: false,
    isFrozen: false,
  });
  
  const customPhases = [
    { duration: 30000, title: 'Phase 1' },
    { duration: 45000, title: 'Phase 2' },
    { duration: 60000, title: 'Phase 3' },
  ];
  const [status, setStatus] = useState('Ready');
  const [phaseInfo, setPhaseInfo] = useState('');
  const [selectedFinishedPhase, setSelectedFinishedPhase] = useState<number | null>(null);
  const [clickedPhase, setClickedPhase] = useState<number | null>(null);
  
  const handleMainTimerStateChange = (newState: typeof mainTimerState) => {
    setMainTimerState(newState);
    // Update UI state based on timer state changes
    if (newState.isRunning && !mainTimerState.isRunning) {
      setStatus('Running');
    } else if (newState.isPaused && !mainTimerState.isPaused) {
      setStatus('Paused');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h2>Game Timer Component Demo</h2>
      <div style={{
        textAlign: 'center'
      }}>
        <div style={{
          marginBottom: 20,
          padding: 15,
          backgroundColor: '#f8f9fa',
          borderRadius: 8
        }}>
          <p>
            <strong>Status:</strong> {status}
          </p>
          <p>
            <strong>Current Phase:</strong> {mainTimerState.currentPhase + 1}
          </p>
          <p>
            <strong>Phase Info:</strong> {phaseInfo}
          </p>
          {selectedFinishedPhase !== null && <p style={{
            color: '#0a58ca'
          }}>
            Navigated to finished phase: #{selectedFinishedPhase + 1}
          </p>}
          {clickedPhase !== null && <p style={{
            color: '#198754'
          }}>Clicked phase indicator: #{clickedPhase + 1}</p>}
        </div>
        <Timer
          phases={[
            { duration: 3, title: 'Intro' },
            { duration: 5, title: 'Action' },
            { duration: 4, title: 'Summary' },
          ]}
          externalState={mainTimerState}
          onStateChange={handleMainTimerStateChange}
          onUnfreeze={() => {
            setStatus('Unfrozen');
            setPhaseInfo('Game unfrozen!');
          }}
          onUnpause={() => {
            setStatus('Unpaused');
            setPhaseInfo('Game unpaused!');
          }}
          onPause={() => setStatus('Paused')}
          onStop={() => {
            setStatus('Stopped');
            setPhaseInfo('Game stopped');
            setSelectedFinishedPhase(null);
          }}
          onReset={() => {
            setStatus('Reset');
            setPhaseInfo('Ready to start');
            setSelectedFinishedPhase(null);
          }}
          onTick={(time, phase) => {
            setPhaseInfo(`Phase ${phase + 1}: ${time}s elapsed`);
          }}
          onPhaseComplete={(phase, duration) => {
            setPhaseInfo(`Phase ${phase + 1} completed! (${duration}s)`);
          }}
          onComplete={() => {
            setStatus('All phases completed!');
            setPhaseInfo('Game finished successfully!');
          }}
          onPrevious={() => {
            setSelectedFinishedPhase(prev => {
              const fallback = mainTimerState.currentPhase > 0 ? mainTimerState.currentPhase - 1 : 0;
              return prev === null ? fallback : Math.max(0, prev - 1);
            });
          }}
          onNext={() => {
            setSelectedFinishedPhase(prev => {
              const fallback = mainTimerState.currentPhase + 1;
              return prev === null ? fallback : prev + 1;
            });
          }}
          onPhaseClick={phase => setClickedPhase(phase)}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>Game Admin Control Panel (Simplified)</h3>

        <Timer
          ref={controlledTimerRef}
          phases={customPhases}
          externalState={controlledTimerState}
          onStateChange={setControlledTimerState}
        />

        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => controlledTimerRef.current?.start()}
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            🎮 Start Game
          </button>
          <button
            onClick={() => controlledTimerRef.current?.pause()}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ffc107',
              color: '#212529',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            ⏸️ Pause Game
          </button>
          <button
            onClick={() => controlledTimerRef.current?.stop()}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            🛑 Stop Game
          </button>
          <button
            onClick={() => controlledTimerRef.current?.reset()}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            🔄 Reset Game
          </button>
          <button
            onClick={() => (controlledTimerRef.current as any)?.freeze?.()}
            style={{
              padding: '8px 16px',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            ❄️ Freeze Game
          </button>
        </div>

        {/* Removed dynamic state display */}
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>Multiple Game Sessions</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          <div
            style={{
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '8px',
            }}
          >
            <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>Quick Game</h4>
            <Timer
              phases={[
                { duration: 10, title: 'Q1' },
                { duration: 15000, title: 'Q2' },
                { duration: 20000, title: 'Q3' },
              ]}
              externalState={quickGameState}
              onStateChange={setQuickGameState}
            />
          </div>

          <div
            style={{
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '8px',
            }}
          >
            <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>Standard Game</h4>
            <Timer
              phases={[
                { duration: 30000, title: 'S1' },
                { duration: 45000, title: 'S2' },
                { duration: 60000, title: 'S3' },
              ]}
              externalState={standardGameState}
              onStateChange={setStandardGameState}
            />
          </div>

          <div
            style={{
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '8px',
            }}
          >
            <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>Extended Game</h4>
            <Timer
              phases={[
                { duration: 60000, title: 'E1' },
                { duration: 90, title: 'E2' },
                { duration: 120, title: 'E3' },
                { duration: 90, title: 'E4' },
              ]}
              externalState={extendedGameState}
              onStateChange={setExtendedGameState}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          marginBottom: '40px',
          padding: '20px',
          backgroundColor: '#fff3cd',
          borderRadius: '8px',
        }}
      >
        <h3 style={{ marginTop: '0' }}>Game Timer Features</h3>
        <ul style={{ paddingLeft: '20px' }}>
          <li>
            <strong>Multi-Phase Support:</strong> Define multiple phases with different durations
          </li>
          <li>
            <strong>Count-Up Timer:</strong> Counts from 00:00 to each target duration
          </li>
          <li>
            <strong>Automatic Transitions:</strong> Immediate transition between phases
          </li>
          <li>
            <strong>Phase Progress:</strong> Progress bar shows completion within current phase
          </li>
          <li>
            <strong>Game Callbacks:</strong> onComplete, onPhaseComplete, onTick with phase info
          </li>
          <li>
            <strong>Admin Control:</strong> Start/pause/stop/reset affects entire game sequence
          </li>
          <li>
            <strong>Dynamic Configuration:</strong> Change phase durations programmatically
          </li>
          <li>
            <strong>Visual States:</strong> Different colors for running, paused, and completed
            states
          </li>
          <li>
            <strong>Responsive Design:</strong> Works on all screen sizes
          </li>
          <li>
            <strong>Game-Focused UI:</strong> Phase indicators and time limits clearly displayed
          </li>
          <li>
            <strong>User Type Support:</strong> Admin mode with full controls, Actor mode with
            simplified view and repositioned timer header
          </li>
        </ul>
      </div>

      <div
        style={{
          marginBottom: '40px',
          padding: '20px',
          backgroundColor: '#d1ecf1',
          borderRadius: '8px',
        }}
      >
        <h3 style={{ marginTop: '0' }}>Usage Example for Games</h3>
        <pre
          style={{
            backgroundColor: '#f8f9fa',
            padding: '15px',
            borderRadius: '4px',
            fontSize: '14px',
            overflow: 'auto',
          }}
        >
          {`// Game with 3 phases: Setup (30s), Action (60s), Resolution (45s)
<Timer
  durations={[30, 60, 45]}
  onPhaseComplete={(phase, duration) => {
    // Handle phase completion - award points, change game state, etc.
    if (phase === 0) handleSetupComplete();
    if (phase === 1) handleActionComplete();
    if (phase === 2) handleResolutionComplete();
  }}
  onTick={(currentTime, phaseIndex) => {
    // Update game state every second
    updateGameUI(currentTime, phaseIndex);
  }}
  onComplete={() => {
    // Game finished - show results
    showGameResults();
  }}
/>`}
        </pre>
      </div>
    </div>
  );
};
