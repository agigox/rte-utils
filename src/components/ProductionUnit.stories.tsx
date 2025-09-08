import type { Meta, StoryObj } from '@storybook/react';
import { ProductionUnit } from './ProductionUnit';

const meta: Meta<typeof ProductionUnit> = {
  title: 'Components/ProductionUnit',
  component: ProductionUnit,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A complex ProductionUnit component that combines multiple UI elements including images, chips, inputs, and switches for managing production units.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    unitName: {
      control: 'text',
      description: 'Name of the production unit',
    },
    energyCost: {
      control: 'number',
      description: 'Energy cost in MW',
    },
    defaultValue: {
      control: 'number',
      description: 'Default value for the input (uncontrolled mode)',
    },
    value: {
      control: 'number',
      description: 'Controlled value for the input (overrides defaultValue)',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state for the switch (uncontrolled mode)',
    },
    checked: {
      control: 'boolean',
      description: 'Controlled checked state for the switch (overrides defaultChecked)',
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the component is in readonly mode (disables input and switch)',
    },
    checkedImage: {
      control: false,
      description: 'React node to display when the unit is active/checked',
    },
    uncheckedImage: {
      control: false,
      description: 'React node to display when the unit is inactive/unchecked',
    },
    min: {
      control: 'object',
      description: 'Minimum power constraint with value and optional label',
    },
    max: {
      control: 'object',
      description: 'Maximum power constraint with value and optional label',
    },
    onChangeInput: {
      control: false,
      description: 'Function called when input value changes',
    },
    onChangeSwitch: {
      control: false,
      description: 'Function called when switch state changes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock images for the stories
const SolarCheckedImage = () => (
  <div
    style={{
      width: '60px',
      height: '60px',
      backgroundColor: '#FFA726',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px',
      boxShadow: '0 0 15px rgba(255, 167, 38, 0.5)',
    }}
  >
    ☀️
  </div>
);

const SolarUncheckedImage = () => (
  <div
    style={{
      width: '60px',
      height: '60px',
      backgroundColor: '#FFC107',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px',
    }}
  >
    ⚠️
  </div>
);

const WindCheckedImage = () => (
  <div
    style={{
      width: '60px',
      height: '60px',
      backgroundColor: '#66BB6A',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px',
      boxShadow: '0 0 15px rgba(102, 187, 106, 0.5)',
    }}
  >
    💨
  </div>
);

const WindUncheckedImage = () => (
  <div
    style={{
      width: '60px',
      height: '60px',
      backgroundColor: '#A5D6A7',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px',
    }}
  >
    ⚠️
  </div>
);

const NuclearCheckedImage = () => (
  <div
    style={{
      width: '60px',
      height: '60px',
      backgroundColor: '#2196F3',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px',
      boxShadow: '0 0 15px rgba(33, 150, 243, 0.5)',
    }}
  >
    ⚛️
  </div>
);

const NuclearUncheckedImage = () => (
  <div
    style={{
      width: '60px',
      height: '60px',
      backgroundColor: '#F44336',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px',
    }}
  >
    ⚠️
  </div>
);

export const Default: Story = {
  args: {
    unitName: 'Nuclear',
    energyCost: 1200,
    defaultValue: 800,
    defaultChecked: true,
    readonly: false,
    editable: false,
  },
  render: (args) => (
    <ProductionUnit
      {...args}
      checkedImage={<NuclearCheckedImage />}
      uncheckedImage={<NuclearUncheckedImage />}
    />
  ),
};

export const Active: Story = {
  args: {
    unitName: 'Solar Farm B',
    energyCost: 400,
    defaultValue: 350,
    defaultChecked: true,
    readonly: false,
  },
  render: (args) => (
    <ProductionUnit
      {...args}
      checkedImage={<SolarCheckedImage />}
      uncheckedImage={<SolarUncheckedImage />}
    />
  ),
};

export const Readonly: Story = {
  args: {
    unitName: 'Wind Farm C',
    energyCost: 600,
    defaultValue: 500,
    defaultChecked: true,
    readonly: true,
  },
  render: (args) => (
    <ProductionUnit
      {...args}
      checkedImage={<WindCheckedImage />}
      uncheckedImage={<WindUncheckedImage />}
    />
  ),
};

export const Controlled: Story = {
  args: {
    unitName: 'Hydro Plant D',
    energyCost: 800,
    value: 650,
    checked: true,
    readonly: false,
  },
  render: (args) => (
    <ProductionUnit
      {...args}
      checkedImage={<NuclearCheckedImage />}
      uncheckedImage={<NuclearUncheckedImage />}
    />
  ),
};

export const WithoutImages: Story = {
  args: {
    unitName: 'Generic Plant',
    energyCost: 300,
    defaultValue: 200,
    defaultChecked: false,
    readonly: false,
    checkedImage: undefined,
    uncheckedImage: undefined,
  },
  render: (args) => <ProductionUnit {...args} />,
};

export const SmallWind: Story = {
  args: {
    unitName: 'Wind Turbine #3',
    energyCost: 150,
    defaultValue: 120,
    defaultChecked: true,
    readonly: false,
  },
  render: (args) => (
    <ProductionUnit
      {...args}
      checkedImage={<WindCheckedImage />}
      uncheckedImage={<WindUncheckedImage />}
    />
  ),
};

export const WithConstraints: Story = {
  args: {
    unitName: 'Constrained Solar',
    energyCost: 500,
    defaultValue: 400,
    defaultChecked: true,
    readonly: false,
    min: { value: 200, label: '200 MW min' },
    max: { value: 600, label: '600 MW max' },
  },
  render: (args) => (
    <ProductionUnit
      {...args}
      checkedImage={<SolarCheckedImage />}
      uncheckedImage={<SolarUncheckedImage />}
    />
  ),
};

export const NuclearWithLimits: Story = {
  args: {
    unitName: 'Nuclear Reactor #1',
    energyCost: 1200,
    defaultValue: 800,
    defaultChecked: true,
    readonly: false,
    min: { value: 500, label: '500 MW minimum' },
    max: { value: 1000, label: '1000 MW maximum' },
  },
  render: (args) => (
    <ProductionUnit
      {...args}
      checkedImage={<NuclearCheckedImage />}
      uncheckedImage={<NuclearUncheckedImage />}
    />
  ),
};
