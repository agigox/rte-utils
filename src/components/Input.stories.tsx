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
          "A specialized Input component with floating labels, min/max constraints, and immediate value validation. Features automatic value clamping for number inputs - values are instantly corrected when they exceed min/max bounds, providing immediate feedback to users.",
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
        "Minimum value constraint with value and optional label (instantly clamps number values)",
    },
    max: {
      control: "object",
      description:
        "Maximum value constraint with value and optional label (instantly clamps number values)",
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
          "Number input with instant value clamping. Try typing values greater than 1000 or less than 0 - they will be immediately corrected to the valid range.",
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
    label: "Instant Clamping Demo",
    type: "number",
    min: { value: 10, label: "Min: 10" },
    max: { value: 100, label: "Max: 100" },
    value: "50",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Try typing values outside the 10-100 range. Values are instantly clamped: typing '150' will immediately show '100', typing '5' will immediately show '10'. This provides instant feedback and prevents invalid values.",
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

export const ErrorStyling: Story = {
  args: {
    label: "Immediate Value Correction",
    type: "number",
    min: { value: 20, label: "Min: 20" },
    max: { value: 80, label: "Max: 80" },
    value: "50",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Type values outside the 20-80 range to see immediate correction. Typing '90' will instantly become '80', typing '10' will instantly become '20'. The input ensures values always stay within the valid range.",
      },
    },
  },
};

export const ExtremeClamping: Story = {
  args: {
    label: "Extreme Value Test",
    type: "number",
    min: { value: 1, label: "Min: 1" },
    max: { value: 5, label: "Max: 5" },
    value: "3",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Test with a very narrow range (1-5). Try typing large numbers like '999' or negative numbers like '-10' to see instant clamping to the boundaries.",
      },
    },
  },
};

export const DecimalClamping: Story = {
  args: {
    label: "Decimal Values",
    type: "number",
    min: { value: 0.5, label: "Min: 0.5" },
    max: { value: 10.5, label: "Max: 10.5" },
    value: "5.25",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Test clamping with decimal values. Try typing '0.1' (will become '0.5') or '20.7' (will become '10.5').",
      },
    },
  },
};

export const ZeroRangeClamping: Story = {
  args: {
    label: "Zero to Range",
    type: "number",
    min: { value: 0, label: "Zero" },
    max: { value: 100, label: "Hundred" },
    value: "25",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Test with zero as minimum. Try typing negative values like '-50' to see them clamp to '0', or large values like '500' to see them clamp to '100'.",
      },
    },
  },
};

export const NegativeRangeClamping: Story = {
  args: {
    label: "Negative Range",
    type: "number",
    min: { value: -100, label: "Min: -100" },
    max: { value: -10, label: "Max: -10" },
    value: "-50",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Test with negative number ranges. Try typing positive numbers like '50' (will become '-10') or very negative numbers like '-200' (will become '-100').",
      },
    },
  },
};
