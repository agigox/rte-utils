import type { Meta, StoryObj } from "@storybook/react";
import { InputNumber } from "./InputNumber";

const meta: Meta<typeof InputNumber> = {
  title: "Components/InputNumber",
  component: InputNumber,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A specialized InputNumber component with floating labels, min/max constraints, and intelligent validation. Features real-time error styling while typing invalid values, visual constraint indicators that highlight when focused, and automatic value clamping on blur for number inputs. This allows users to type multi-digit numbers freely while ensuring final values are within valid ranges.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label text displayed as floating label",
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
        "Minimum value constraint with value and optional label (validates on blur with real-time error styling)",
    },
    max: {
      control: "object",
      description:
        "Maximum value constraint with value and optional label (validates on blur with real-time error styling)",
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
  },
};

export const WithValue: Story = {
  args: {
    label: "Input with Value",
    value: "Sample text",
  },
};

export const Number: Story = {
  args: {
    label: "Power Output",
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
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    disabled: true,
    value: "Cannot edit this",
  },
};

export const CustomConstraints: Story = {
  args: {
    label: "Energy Capacity",
    min: { value: 10, label: "Min" },
    max: { value: 500, label: "Max" },
    value: "250",
  },
};

export const TextWithConstraints: Story = {
  args: {
    label: "Production Unit",
    min: { value: 0, label: "Start" },
    max: { value: 100, label: "End" },
    required: true,
  },
};

export const LargeNumbers: Story = {
  args: {
    label: "Megawatt Output",
    min: { value: 0, label: "0 MW" },
    max: { value: 2000, label: "2000 MW" },
    value: "1200",
  },
};

export const ValidationDemo: Story = {
  args: {
    label: "Smart Validation Demo",
    min: { value: 10, label: "Min: 10" },
    max: { value: 100, label: "Max: 100" },
    value: "50",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Try typing values outside the 10-100 range. The input shows red styling while typing invalid values (like typing '150' or '5'), but allows you to complete multi-digit entries. Values are automatically corrected when you click outside the input (blur event).",
      },
    },
  },
};

export const FocusHighlight: Story = {
  args: {
    label: "Focus to See Highlight",
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
    label: "Real-time Error Feedback",
    min: { value: 20, label: "Min: 20" },
    max: { value: 80, label: "Max: 80" },
    value: "50",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Type values outside the 20-80 range to see immediate error styling. The input border turns red while typing invalid values, providing instant visual feedback. The value will be automatically corrected when you click outside the input (blur).",
      },
    },
  },
};

export const ExtremeClamping: Story = {
  args: {
    label: "Extreme Value Test",
    min: { value: 1, label: "Min: 1" },
    max: { value: 5, label: "Max: 5" },
    value: "3",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Test with a very narrow range (1-5). Try typing large numbers like '999' or negative numbers like '-10'. You'll see red error styling while typing, and values will be clamped to boundaries when you blur (click outside).",
      },
    },
  },
};

export const DecimalClamping: Story = {
  args: {
    label: "Decimal Values",
    min: { value: 0.5, label: "Min: 0.5" },
    max: { value: 10.5, label: "Max: 10.5" },
    value: "5.25",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Test clamping with decimal values. Try typing '0.1' or '20.7' and then click outside. Values will be clamped to '0.5' and '10.5' respectively on blur.",
      },
    },
  },
};

export const ZeroRangeClamping: Story = {
  args: {
    label: "Zero to Range",
    min: { value: 0, label: "Zero" },
    max: { value: 100, label: "Hundred" },
    value: "25",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Test with zero as minimum. Try typing negative values like '-50' or large values like '500'. They'll show as red while typing and be corrected to '0' or '100' when you blur.",
      },
    },
  },
};

export const NegativeRangeClamping: Story = {
  args: {
    label: "Negative Range",
    min: { value: -100, label: "Min: -100" },
    max: { value: -10, label: "Max: -10" },
    value: "-50",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Test with negative number ranges. Try typing positive numbers like '50' or very negative numbers like '-200'. Values will be clamped to the range boundaries on blur.",
      },
    },
  },
};
