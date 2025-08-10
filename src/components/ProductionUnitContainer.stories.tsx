import type { Meta, StoryObj } from '@storybook/react';
import { ProductionUnitContainer } from './ProductionUnitContainer';

const meta: Meta<typeof ProductionUnitContainer> = {
  title: 'Components/ProductionUnitContainer',
  component: ProductionUnitContainer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A wrapper container for production units with customizable background color and height.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    bgColor: {
      control: 'color',
      description: 'Background color of the container',
    },
    height: {
      control: 'text',
      description: 'Height of the container (CSS height value)',
    },
    children: {
      control: false,
      description: 'Child components to render inside the container',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample content for demonstration
const SampleContent = () => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <h3>Production Unit Content</h3>
    <p>This is sample content inside the container</p>
  </div>
);

const MultipleItems = () => (
  <>
    <div style={{ padding: '10px', border: '1px solid #ccc', margin: '5px' }}>
      <strong>Solar Panel #1</strong>
      <p>Status: Active</p>
    </div>
    <div style={{ padding: '10px', border: '1px solid #ccc', margin: '5px' }}>
      <strong>Wind Turbine #2</strong>
      <p>Status: Inactive</p>
    </div>
    <div style={{ padding: '10px', border: '1px solid #ccc', margin: '5px' }}>
      <strong>Nuclear Plant #3</strong>
      <p>Status: Active</p>
    </div>
  </>
);

export const Default: Story = {
  args: {
    bgColor: '#ffffff',
    height: '200px',
  },
  render: (args) => (
    <ProductionUnitContainer {...args}>
      <SampleContent />
    </ProductionUnitContainer>
  ),
};

export const WithCustomBackground: Story = {
  args: {
    bgColor: '#f0f8ff',
    height: '250px',
  },
  render: (args) => (
    <ProductionUnitContainer {...args}>
      <SampleContent />
    </ProductionUnitContainer>
  ),
};

export const DarkTheme: Story = {
  args: {
    bgColor: '#2d3748',
    height: '200px',
  },
  render: (args) => (
    <ProductionUnitContainer {...args}>
      <div style={{ padding: '20px', textAlign: 'center', color: 'white' }}>
        <h3>Dark Theme Container</h3>
        <p>This container has a dark background</p>
      </div>
    </ProductionUnitContainer>
  ),
};

export const AutoHeight: Story = {
  args: {
    bgColor: '#f7fafc',
  },
  render: (args) => (
    <ProductionUnitContainer {...args}>
      <SampleContent />
    </ProductionUnitContainer>
  ),
};

export const WithMultipleItems: Story = {
  args: {
    bgColor: '#fff5f5',
    height: '300px',
  },
  render: (args) => (
    <ProductionUnitContainer {...args}>
      <MultipleItems />
    </ProductionUnitContainer>
  ),
};

export const LargeContainer: Story = {
  args: {
    bgColor: '#f0fff4',
    height: '400px',
  },
  render: (args) => (
    <ProductionUnitContainer {...args}>
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Large Container</h2>
        <p>This container has more space for content</p>
        <div style={{ marginTop: '20px' }}>
          <button style={{ margin: '5px', padding: '10px 20px' }}>Action 1</button>
          <button style={{ margin: '5px', padding: '10px 20px' }}>Action 2</button>
        </div>
      </div>
    </ProductionUnitContainer>
  ),
};

export const MinimalContainer: Story = {
  args: {
    bgColor: '#ffffff',
    height: '100px',
  },
  render: (args) => (
    <ProductionUnitContainer {...args}>
      <div style={{ padding: '10px', fontSize: '14px' }}>Minimal content</div>
    </ProductionUnitContainer>
  ),
};
