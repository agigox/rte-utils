import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A specialized Switch component with built-in power icons and visual feedback. Features SVG-based icons and smooth state transitions for power control interfaces.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the switch is checked/active (controlled mode)",
    },
    disabled: {
      control: "boolean",
      description: "Whether the switch is disabled and non-interactive",
    },
    showIcon: {
      control: "boolean",
      description: "Whether to show the power icon next to the switch",
    },
    onChange: {
      description:
        "Function called when switch state changes - receives boolean value",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    showIcon: true,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    disabled: false,
    showIcon: true,
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    showIcon: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    showIcon: true,
  },
};

export const WithoutIcon: Story = {
  args: {
    checked: false,
    disabled: false,
    showIcon: false,
  },
};

export const CheckedWithoutIcon: Story = {
  args: {
    checked: true,
    disabled: false,
    showIcon: false,
  },
};

export const PowerControl: Story = {
  args: {
    checked: true,
    disabled: false,
    showIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Typical usage in power control interfaces - active state with power icon visible.",
      },
    },
  },
};

export const MinimalToggle: Story = {
  args: {
    checked: false,
    disabled: false,
    showIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Minimal toggle switch without power icon for simple on/off controls.",
      },
    },
  },
};
