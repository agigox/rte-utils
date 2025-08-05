import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A specialized Input component with floating labels, min/max constraints, and automatic value validation. Features visual constraint indicators that highlight when focused, and automatic clamping for number inputs.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label text displayed as floating label",
    },
    type: {
      control: "select",
      options: ["text", "number"],
      description: "HTML input type (text or number with validation)",
    },
    value: {
      control: "text",
      description: "Controlled value of the input",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the input is required (shows red asterisk)",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    min: {
      control: "object",
      description:
        "Minimum value constraint with value and optional label (auto-validates numbers)",
    },
    max: {
      control: "object",
      description:
        "Maximum value constraint with value and optional label (auto-validates numbers)",
    },
    onChange: {
      description: "Function called when input value changes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Default Input",
    type: "text",
  },
};

export const WithValue: Story = {
  args: {
    label: "Input with Value",
    value: "Sample text",
    type: "text",
  },
};

export const Number: Story = {
  args: {
    label: "Power Output",
    type: "number",
    min: { value: 0, label: "Pmin" },
    max: { value: 1000, label: "Pmax" },
    value: "500",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Number input with spinner controls and min/max validation. Try typing a value greater than 1000 or using the spinner arrows.",
      },
    },
  },
};

export const Required: Story = {
  args: {
    label: "Required Field",
    type: "text",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    type: "text",
    disabled: true,
    value: "Cannot edit this",
  },
};

export const CustomConstraints: Story = {
  args: {
    label: "Energy Capacity",
    type: "number",
    min: { value: 10, label: "Min" },
    max: { value: 500, label: "Max" },
    value: "250",
  },
};

export const TextWithConstraints: Story = {
  args: {
    label: "Production Unit",
    type: "text",
    min: { value: 0, label: "Start" },
    max: { value: 100, label: "End" },
    required: true,
  },
};

export const LargeNumbers: Story = {
  args: {
    label: "Megawatt Output",
    type: "number",
    min: { value: 0, label: "0 MW" },
    max: { value: 2000, label: "2000 MW" },
    value: "1200",
  },
};

export const ValidationDemo: Story = {
  args: {
    label: "Auto-Clamping Demo",
    type: "number",
    min: { value: 10, label: "Min: 10" },
    max: { value: 100, label: "Max: 100" },
    value: "50",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Try typing values outside the 10-100 range. The input shows error styling while typing invalid values, but only clamps the value when you blur (leave) the input field. This allows you to freely type valid values like '50' without interference.",
      },
    },
  },
};

export const FocusHighlight: Story = {
  args: {
    label: "Focus to See Highlight",
    type: "number",
    min: { value: 0, label: "Minimum" },
    max: { value: 1000, label: "Maximum" },
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Click on the input to see the min/max labels change color and weight when focused.",
      },
    },
  },
};
