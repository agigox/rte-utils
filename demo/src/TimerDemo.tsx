import React, { useState, useRef } from "react";
import { Timer, TimerRef } from "../../src/components";

export const TimerDemo: React.FC = () => {
  const [durationsInput, setDurationsInput] = useState("30,45,60");
  const [gameStatus, setGameStatus] = useState("Ready");
  const [currentPhase, setCurrentPhase] = useState(0);
  const [phaseInfo, setPhaseInfo] = useState("");
  const [selectedUserType, setSelectedUserType] = useState<'admin' | 'actor'>('admin');
  const controlledTimerRef = useRef<TimerRef>(null);
  const [customPhases, setCustomPhases] = useState([
    { duration: 30, title: "Phase 1" },
    { duration: 45, title: "Phase 2" },
    { duration: 60, title: "Phase 3" },
  ]);

  const handleDurationsChange = (input: string) => {
    setDurationsInput(input);
    const newDurations = input
      .split(",")
      .map((d) => parseInt(d.trim()))
      .filter((d) => !isNaN(d) && d > 0);

    if (newDurations.length > 0) {
      const newPhases = newDurations.map((d, idx) => ({
        duration: d,
        title: `Phase ${idx + 1}`,
      }));
      setCustomPhases(newPhases);
      controlledTimerRef.current?.setPhases(newPhases);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px" }}>
      <h2>Game Timer Component Demo</h2>

      <div
        style={{
          marginBottom: "30px",
          padding: "20px",
          backgroundColor: "#e8f4fd",
          borderRadius: "8px",
        }}
      >
        <h3 style={{ marginTop: "0" }}>Multi-Phase Game Timer</h3>
        <p>
          This timer counts up from 00:00 to each target duration in sequence.
          Perfect for games with multiple phases where each phase has a time
          limit for completing actions.
        </p>
        <ul style={{ paddingLeft: "20px", margin: "10px 0" }}>
          <li>
            <strong>Count-up Timer:</strong> Starts from 00:00 and counts up to
            each target
          </li>
          <li>
            <strong>Multi-phase Support:</strong> Automatically transitions
            between phases
          </li>
          <li>
            <strong>Progress Tracking:</strong> Shows progress within current
            phase
          </li>
          <li>
            <strong>Game Admin Controls:</strong> Start/pause/stop affects
            entire game sequence
          </li>
          <li>
            <strong>Phase Callbacks:</strong> Notifications for each phase
            completion
          </li>
        </ul>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h3>User Type Comparison - Admin vs Actor</h3>
        <div
          style={{
            marginBottom: "20px",
            padding: "15px",
            backgroundColor: "#f0f8ff",
            borderRadius: "8px",
          }}
        >
          <p style={{ margin: "0 0 10px 0" }}>
            The Timer component supports two user types:
          </p>
          <ul style={{ margin: "0", paddingLeft: "20px" }}>
            <li>
              <strong>Admin:</strong> Full controls with timer header at top
            </li>
            <li>
              <strong>Actor:</strong> No game controls, timer header positioned after step indicators
            </li>
          </ul>
        </div>

        <div style={{ display: "flex", gap: "40px", justifyContent: "center", marginBottom: "20px" }}>
          <div style={{ textAlign: "center" }}>
            <h4 style={{ margin: "0 0 15px 0" }}>Admin View</h4>
            <Timer
              phases={[
                { duration: 25, title: "Setup" },
                { duration: 35, title: "Activity" },
                { duration: 20, title: "Review" },
              ]}
              user="admin"
              autoStart={false}
              gameActions={{ 0: "Begin Setup", 1: "Start Activity", 2: "Review Phase" }}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <h4 style={{ margin: "0 0 15px 0" }}>Actor View</h4>
            <Timer
              phases={[
                { duration: 25, title: "Setup" },
                { duration: 35, title: "Activity" },
                { duration: 20, title: "Review" },
              ]}
              user="actor"
              autoStart={false}
              gameActions={{ 0: "Begin Setup", 1: "Start Activity", 2: "Review Phase" }}
            />
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h3>Interactive User Type Demo</h3>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ marginRight: "10px", fontWeight: "bold" }}>
            Select User Type:
          </label>
          <select
            value={selectedUserType}
            onChange={(e) => setSelectedUserType(e.target.value as 'admin' | 'actor')}
            style={{
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          >
            <option value="admin">Admin (Full Controls)</option>
            <option value="actor">Actor (Simplified View)</option>
          </select>
        </div>
        <Timer
          phases={[
            { duration: 30, title: "Planning" },
            { duration: 45, title: "Execution" },
            { duration: 15, title: "Review" },
          ]}
          user={selectedUserType}
          autoStart={false}
          gameActions={{ 0: "Start Planning", 1: "Begin Execution", 2: "Final Review" }}
          onComplete={() => alert(`Game completed in ${selectedUserType} mode!`)}
        />
        <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
          Switch between Admin and Actor modes to see the different interfaces.
          {selectedUserType === 'admin' 
            ? ' Admin mode shows all game controls.' 
            : ' Actor mode hides controls and repositions the timer header.'}
        </p>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h3>Figma-Inspired Timer (Header Control)</h3>
        <Timer
          phases={[
            { duration: 30, title: "ARENH P1" },
            { duration: 45, title: "ARENH P2" },
            { duration: 60, title: "ARENH P3" },
          ]}
          title="ARENH"
          gameActions={{
            0: "Setup phase",
            1: "Action phase",
            2: "Resolution phase",
          }}
          onComplete={() => alert("Game completed! All phases finished.")}
          onPhaseComplete={(phase, duration) =>
            console.log(`Phase ${phase + 1} completed in ${duration} seconds!`)
          }
          onPrevious={() => console.log("Previous clicked")}
          onNext={() => console.log("Next clicked")}
        />
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h3>Timer with Placeholder Steps</h3>
        <Timer
          phases={[
            { duration: 15, title: "Start" },
            { duration: 20, title: "Middle" },
            { duration: 25, title: "End" },
          ]}
          title="DEMO"
          gameActions={{
            0: "Start",
            1: "Middle",
            2: "End",
          }}
          onComplete={() => alert("Demo with placeholders completed!")}
          onPhaseComplete={(phase, duration) =>
            console.log(`Phase ${phase + 1} completed in ${duration} seconds!`)
          }
        />
        <p>
          <em>Phases without actions show as placeholders until reached.</em>
        </p>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h3>Quick Demo Timer (Auto-start)</h3>
        <Timer
          phases={[
            { duration: 5, title: "Start" },
            { duration: 6, title: "Middle" },
            { duration: 7, title: "End" },
          ]}
          autoStart={true}
          onComplete={() => alert("Quick demo completed!")}
          onPhaseComplete={(phase, duration) =>
            alert(`Phase ${phase + 1} completed! Duration: ${duration}s`)
          }
        />
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h3>Single Phase Timer</h3>
        <Timer
          phases={[{ duration: 120, title: "Single" }]}
          onComplete={() => alert("Single phase completed!")}
        />
        <p>
          <em>Single phase - no phase indicator shown</em>
        </p>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h3>Minimal Timer (Display Only)</h3>
        <Timer
          phases={[
            { duration: 60, title: "Phase 1" },
            { duration: 90, title: "Phase 2" },
          ]}
        />
        <p>
          <em>No controls or progress bar - display and phase info only</em>
        </p>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h3>Progress Bar Only</h3>
        <Timer
          phases={[
            { duration: 8, title: "Short" },
            { duration: 12, title: "Long" },
            { duration: 10, title: "Medium" },
          ]}
          autoStart={true}
        />
        <p>
          <em>
            Progress visualization without time display - useful for subtle
            indicators
          </em>
        </p>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h3>Game Timer with Status Tracking</h3>
        <div
          style={{
            marginBottom: "20px",
            padding: "15px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
          }}
        >
          <p>
            <strong>Game Status:</strong> {gameStatus}
          </p>
          <p>
            <strong>Current Phase:</strong> {currentPhase + 1}
          </p>
          <p>
            <strong>Phase Info:</strong> {phaseInfo}
          </p>
        </div>
        <Timer
          phases={[
            { duration: 10, title: "P1" },
            { duration: 15, title: "P2" },
            { duration: 12, title: "P3" },
          ]}
          onStart={() => {
            setGameStatus("Game Running");
            setCurrentPhase(0);
            setPhaseInfo(
              "Game started! Complete your actions within the time limit."
            );
          }}
          onPause={() => setGameStatus("Game Paused")}
          onStop={() => {
            setGameStatus("Game Stopped");
            setCurrentPhase(0);
            setPhaseInfo("Game was stopped by admin");
          }}
          onReset={() => {
            setGameStatus("Ready to Start");
            setCurrentPhase(0);
            setPhaseInfo("Ready to begin new game");
          }}
          onTick={(time, phase) => {
            setCurrentPhase(phase);
            setPhaseInfo(
              `Phase ${phase + 1}: ${time}s elapsed - complete your actions!`
            );
          }}
          onPhaseComplete={(phase, duration) => {
            setPhaseInfo(
              `Phase ${phase + 1} completed! You had ${duration}s to act.`
            );
          }}
          onComplete={() => {
            setGameStatus("Game Completed! 🎉");
            setPhaseInfo("Congratulations! You completed all game phases.");
          }}
        />
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h3>Game Admin Control Panel</h3>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="durations-input"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Configure Game Phases (comma-separated seconds):
          </label>
          <input
            id="durations-input"
            type="text"
            value={durationsInput}
            onChange={(e) => handleDurationsChange(e.target.value)}
            placeholder="30,45,60"
            style={{
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "200px",
              fontSize: "14px",
            }}
          />
          <p style={{ fontSize: "12px", color: "#666", margin: "5px 0" }}>
            Current game phases:{" "}
            {customPhases.map((p) => p.duration).join(", ")} seconds
          </p>
        </div>

        <Timer ref={controlledTimerRef} phases={customPhases} />

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => controlledTimerRef.current?.start()}
            style={{
              padding: "8px 16px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            🎮 Start Game
          </button>
          <button
            onClick={() => controlledTimerRef.current?.pause()}
            style={{
              padding: "8px 16px",
              backgroundColor: "#ffc107",
              color: "#212529",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            ⏸️ Pause Game
          </button>
          <button
            onClick={() => controlledTimerRef.current?.stop()}
            style={{
              padding: "8px 16px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            🛑 Stop Game
          </button>
          <button
            onClick={() => controlledTimerRef.current?.reset()}
            style={{
              padding: "8px 16px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            🔄 Reset Game
          </button>
        </div>

        <div style={{ marginTop: "15px", fontSize: "14px", color: "#666" }}>
          <p>
            <strong>Admin Control:</strong> As a game admin, you can control the
            entire game sequence programmatically. Changes to phase durations
            require a reset to take effect.
          </p>
          <p>
            <strong>Current state:</strong> Running:{" "}
            {controlledTimerRef.current?.isRunning() ? "Yes" : "No"}, Paused:{" "}
            {controlledTimerRef.current?.isPaused() ? "Yes" : "No"}, Current
            Time: {controlledTimerRef.current?.getCurrentTime() || 0}s, Phase:{" "}
            {(controlledTimerRef.current?.getCurrentPhase() || 0) + 1}
          </p>
        </div>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h3>Multiple Game Sessions</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <h4 style={{ margin: "0 0 15px 0", color: "#333" }}>Quick Game</h4>
            <Timer
              phases={[
                { duration: 10, title: "Q1" },
                { duration: 15, title: "Q2" },
                { duration: 20, title: "Q3" },
              ]}
              onComplete={() => alert("Quick game session complete!")}
            />
          </div>

          <div
            style={{
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <h4 style={{ margin: "0 0 15px 0", color: "#333" }}>
              Standard Game
            </h4>
            <Timer
              phases={[
                { duration: 30, title: "S1" },
                { duration: 45, title: "S2" },
                { duration: 60, title: "S3" },
              ]}
              onComplete={() => alert("Standard game session complete!")}
            />
          </div>

          <div
            style={{
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <h4 style={{ margin: "0 0 15px 0", color: "#333" }}>
              Extended Game
            </h4>
            <Timer
              phases={[
                { duration: 60, title: "E1" },
                { duration: 90, title: "E2" },
                { duration: 120, title: "E3" },
                { duration: 90, title: "E4" },
              ]}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          marginBottom: "40px",
          padding: "20px",
          backgroundColor: "#fff3cd",
          borderRadius: "8px",
        }}
      >
        <h3 style={{ marginTop: "0" }}>Game Timer Features</h3>
        <ul style={{ paddingLeft: "20px" }}>
          <li>
            <strong>Multi-Phase Support:</strong> Define multiple phases with
            different durations
          </li>
          <li>
            <strong>Count-Up Timer:</strong> Counts from 00:00 to each target
            duration
          </li>
          <li>
            <strong>Automatic Transitions:</strong> Immediate transition between
            phases
          </li>
          <li>
            <strong>Phase Progress:</strong> Progress bar shows completion
            within current phase
          </li>
          <li>
            <strong>Game Callbacks:</strong> onComplete, onPhaseComplete, onTick
            with phase info
          </li>
          <li>
            <strong>Admin Control:</strong> Start/pause/stop/reset affects
            entire game sequence
          </li>
          <li>
            <strong>Dynamic Configuration:</strong> Change phase durations
            programmatically
          </li>
          <li>
            <strong>Visual States:</strong> Different colors for running,
            paused, and completed states
          </li>
          <li>
            <strong>Responsive Design:</strong> Works on all screen sizes
          </li>
          <li>
            <strong>Game-Focused UI:</strong> Phase indicators and time limits
            clearly displayed
          </li>
          <li>
            <strong>User Type Support:</strong> Admin mode with full controls, 
            Actor mode with simplified view and repositioned timer header
          </li>
        </ul>
      </div>

      <div
        style={{
          marginBottom: "40px",
          padding: "20px",
          backgroundColor: "#d1ecf1",
          borderRadius: "8px",
        }}
      >
        <h3 style={{ marginTop: "0" }}>Usage Example for Games</h3>
        <pre
          style={{
            backgroundColor: "#f8f9fa",
            padding: "15px",
            borderRadius: "4px",
            fontSize: "14px",
            overflow: "auto",
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
