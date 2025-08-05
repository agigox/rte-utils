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
          "A specialized Input component with floating labels and min/max constraints. Designed for numeric inputs with visual feedback and constraint indicators.",
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
      description: "HTML input type (text or number)",
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
      description: "Whether the input is required (shows asterisk)",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    min: {
      control: "object",
      description: "Minimum value constraint with value and optional label",
    },
    max: {
      control: "object",
      description: "Maximum value constraint with value and optional label",
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
