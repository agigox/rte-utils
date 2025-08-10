import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Timer } from "./Timer";
import type { TimerRef } from "./Timer";

const meta: Meta<typeof Timer> = {
  title: "Components/Timer",
  component: Timer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A multi-phase count-up timer component perfect for games and time-based activities. Counts up from 00:00 to each target duration in sequence, with progress tracking and phase management.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    phases: {
      control: "object",
      description:
        "Array of phases with shape { duration: number; title?: string }.",
    },
    autoStart: {
      control: "boolean",
      description: "Whether the timer should start automatically",
    },
    gameActions: {
      control: "object",
      description:
        "Optional mapping of phase index to action label for tooltips/indicators (e.g., {0: 'Draw', 2: 'Score'}).",
    },
    user: {
      control: { type: "select" },
      options: ["admin", "actor"],
      description: "User type - 'admin' shows all controls, 'actor' hides game controls and repositions timer header",
    },
    onComplete: { control: false },
    onPhaseComplete: { control: false },
    onTick: { control: false },
    onStart: { control: false },
    onPause: { control: false },
    onStop: { control: false },
    onReset: { control: false },
    onPrevious: { control: false },
    onNext: { control: false },
    onPhaseClick: { control: false, description: "Called when a completed or active phase indicator is clicked (phase index)." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    phases: [
      { duration: 30, title: "Preparation" },
      { duration: 45, title: "Play" },
      { duration: 60, title: "Wrap-up" },
    ],
    autoStart: false,
  },
};

export const GameTimer: Story = {
  args: {
    phases: [
      { duration: 5, title: "START" },
      { duration: 6, title: "MIDDLE" },
      { duration: 7, title: "END" },
    ],
    autoStart: true,
    onPhaseComplete: (phase: number, duration: number) =>
      console.log(`Phase ${phase + 1} completed! Duration was ${duration}s`),
    onComplete: () => alert("Game completed!"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Game timer with 3 phases (5s, 6s, 7s) that auto-starts for demonstration.",
      },
    },
  },
};

export const SinglePhase: Story = {
  args: {
    phases: [{ duration: 120, title: "Single" }],
    autoStart: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Single phase timer.",
      },
    },
  },
};

export const MinimalTimer: Story = {
  args: {
    phases: [
      { duration: 60, title: "Phase 1" },
      { duration: 90, title: "Phase 2" },
    ],
    autoStart: false,
  },
};

export const ProgressOnly: Story = {
  args: {
    phases: [
      { duration: 8, title: "Short" },
      { duration: 12, title: "Long" },
    ],
    autoStart: true,
  },
};

export const WithPhaseTitles: Story = {
  args: {
    phases: [
      { duration: 10, title: "Warm-up" },
      { duration: 10, title: "Main" },
      { duration: 10, title: "Cooldown" },
    ],
  },
};

export const WithCallbacks: Story = {
  render: () => {
    const [status, setStatus] = useState("Ready");
    const [currentPhase, setCurrentPhase] = useState(0);
    const [phaseInfo, setPhaseInfo] = useState("");
    const [selectedFinishedPhase, setSelectedFinishedPhase] = useState<number | null>(null);
    const [clickedPhase, setClickedPhase] = useState<number | null>(null); // NEW

    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ marginBottom: 20, padding: 15, backgroundColor: "#f8f9fa", borderRadius: 8 }}>
          <p>
            <strong>Status:</strong> {status}
          </p>
          <p>
            <strong>Current Phase:</strong> {currentPhase + 1}
          </p>
          <p>
            <strong>Phase Info:</strong> {phaseInfo}
          </p>
          {selectedFinishedPhase !== null && (
            <p style={{ color: "#0a58ca" }}>
              Navigated to finished phase: #{selectedFinishedPhase + 1}
            </p>
          )}
          {clickedPhase !== null && (
            <p style={{ color: "#198754" }}>Clicked phase indicator: #{clickedPhase + 1}</p>
          )}
        </div>
        <Timer
          phases={[
            { duration: 3, title: "Intro" },
            { duration: 5, title: "Action" },
            { duration: 4, title: "Summary" },
          ]}
          onStart={() => {
            setStatus("Running");
            setCurrentPhase(0);
            setPhaseInfo("Game started!");
          }}
          onPause={() => setStatus("Paused")}
          onStop={() => {
            setStatus("Stopped");
            setCurrentPhase(0);
            setPhaseInfo("Game stopped");
            setSelectedFinishedPhase(null);
          }}
          onReset={() => {
            setStatus("Reset");
            setCurrentPhase(0);
            setPhaseInfo("Ready to start");
            setSelectedFinishedPhase(null);
          }}
          onTick={(time, phase) => {
            setCurrentPhase(phase);
            setPhaseInfo(`Phase ${phase + 1}: ${time}s elapsed`);
          }}
          onPhaseComplete={(phase, duration) => {
            setPhaseInfo(`Phase ${phase + 1} completed! (${duration}s)`);
          }}
          onComplete={() => {
            setStatus("All phases completed!");
            setPhaseInfo("Game finished successfully!");
          }}
          onPrevious={() => {
            setSelectedFinishedPhase((prev) => {
              const fallback = currentPhase > 0 ? currentPhase - 1 : 0;
              return prev === null ? fallback : Math.max(0, prev - 1);
            });
          }}
          onNext={() => {
            setSelectedFinishedPhase((prev) => {
              const fallback = currentPhase + 1;
              return prev === null ? fallback : prev + 1;
            });
          }}
          onPhaseClick={(phase) => setClickedPhase(phase)}
        />
      </div>
    );
  },
};

export const ControlledTimer: Story = {
  render: () => {
    const [phases, setPhases] = useState([
      { duration: 30, title: "Phase 1" },
      { duration: 45, title: "Phase 2" },
      { duration: 60, title: "Phase 3" },
    ]);
    const [durationsInput, setDurationsInput] = useState("30,45,60");
    const timerRef = React.useRef<TimerRef | null>(null);

    const handleDurationsChange = (input: string) => {
      setDurationsInput(input);
      const newDurations = input
        .split(",")
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
      <div style={{ textAlign: "center" }}>
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="durations-input"
            style={{ display: "block", marginBottom: 8 }}
          >
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
              border: "1px solid #ccc",
              width: 200,
            }}
          />
          <p style={{ fontSize: 12, color: "#666", margin: "5px 0" }}>
            Current phases: {phases.map((p) => p.duration).join(", ")} seconds
          </p>
        </div>
        <Timer ref={timerRef} phases={phases} />
        <div style={{ marginTop: 20 }}>
          <button
            onClick={() => timerRef.current?.start()}
            style={{ margin: "0 4px", padding: "8px 16px" }}
          >
            External Start
          </button>
          <button
            onClick={() => timerRef.current?.pause()}
            style={{ margin: "0 4px", padding: "8px 16px" }}
          >
            External Pause
          </button>
          <button
            onClick={() => timerRef.current?.stop()}
            style={{ margin: "0 4px", padding: "8px 16px" }}
          >
            External Stop
          </button>
          <button
            onClick={() => timerRef.current?.reset()}
            style={{ margin: "0 4px", padding: "8px 16px" }}
          >
            External Reset
          </button>
        </div>
      </div>
    );
  },
};

export const AdminUser: Story = {
  args: {
    phases: [
      { duration: 30, title: "Discussion" },
      { duration: 45, title: "Activity" },
      { duration: 15, title: "Reflection" },
    ],
    user: "admin",
    autoStart: false,
    gameActions: { 0: "Start Discussion", 1: "Begin Activity", 2: "Wrap Up" },
    onPhaseClick: (p: number) => console.log("Admin clicked phase", p),
  },
  parameters: {
    docs: {
      description: {
        story: "Admin view with full controls and timer header at the top. Includes game controls for managing the timer phases.",
      },
    },
  },
};

export const ActorUser: Story = {
  args: {
    phases: [
      { duration: 30, title: "Discussion" },
      { duration: 45, title: "Activity" },
      { duration: 15, title: "Reflection" },
    ],
    user: "actor",
    autoStart: true,
    gameActions: { 0: "Start Discussion", 1: "Begin Activity", 2: "Wrap Up" },
    onPhaseClick: (p: number) => console.log("Actor clicked phase", p),
  },
  parameters: {
    docs: {
      description: {
        story: "Actor view with simplified interface - no game controls, timer header positioned after step indicators for better visibility during activities.",
      },
    },
  },
};

export const UserComparison: Story = {
  render: () => {
    const sharedPhases = [
      { duration: 20, title: "Setup" },
      { duration: 35, title: "Main Task" },
      { duration: 10, title: "Cleanup" },
    ];
    return (
      <div style={{ display: "flex", gap: "40px", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h3 style={{ marginBottom: "20px" }}>Admin View</h3>
          <Timer
            phases={sharedPhases}
            user="admin"
            autoStart={false}
            gameActions={{ 0: "Begin Setup", 1: "Start Task", 2: "Finish" }}
            onPhaseClick={(p) => console.log("Admin comparison clicked", p)}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <h3 style={{ marginBottom: "20px" }}>Actor View</h3>
          <Timer
            phases={sharedPhases}
            user="actor"
            autoStart={false}
            gameActions={{ 0: "Begin Setup", 1: "Start Task", 2: "Finish" }}
            onPhaseClick={(p) => console.log("Actor comparison clicked", p)}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Side-by-side comparison of Admin and Actor views showing the different interfaces and layouts.",
      },
    },
  },
};
