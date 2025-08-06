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
          "A specialized Switch component with built-in power icons and visual feedback. Can display either an icon or a text label next to the switch. When showIcon is true, it takes precedence over the label prop.",
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
      description:
        "Whether to show the power icon next to the switch. Takes precedence over label.",
    },
    label: {
      control: "text",
      description:
        "Text label to display next to the switch. Only shown when showIcon is false.",
    },
    onChange: {
      control: false,
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

export const WithLabel: Story = {
  args: {
    checked: false,
    disabled: false,
    showIcon: false,
    label: "ON/OFF",
  },
  parameters: {
    docs: {
      description: {
        story: "Switch with a text label instead of icon.",
      },
    },
  },
};

export const WithLabelChecked: Story = {
  args: {
    checked: true,
    disabled: false,
    showIcon: false,
    label: "Power",
  },
  parameters: {
    docs: {
      description: {
        story: "Active switch with text label.",
      },
    },
  },
};

export const LabelDisabled: Story = {
  args: {
    checked: false,
    disabled: true,
    showIcon: false,
    label: "Disabled",
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled switch with text label.",
      },
    },
  },
};

export const IconTakesPrecedence: Story = {
  args: {
    checked: true,
    disabled: false,
    showIcon: true,
    label: "This label won't show",
  },
  parameters: {
    docs: {
      description: {
        story:
          "When both showIcon and label are provided, the icon takes precedence and the label is ignored.",
      },
    },
  },
};

export const CustomLabels: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      <Switch checked={false} showIcon={false} label="Start" />
      <Switch checked={true} showIcon={false} label="Active" />
      <Switch checked={false} showIcon={false} label="Mode" />
      <Switch checked={true} showIcon={false} label="🔋" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Various switches with different custom labels including emoji.",
      },
    },
  },
};
