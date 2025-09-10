import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An accordion component that can expand and collapse to show/hide content. Features a clickable header with an animated arrow icon, smooth transitions between states, and supports both white and blue themes. Content can be a string or React component.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onToggle: { action: 'toggled' },
    theme: {
      control: { type: 'select' },
      options: ['white', 'blue'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// White Theme Stories
export const WhiteClosed: Story = {
  args: {
    title: 'Bouclage énergétique',
    content: 'Content',
    theme: 'white',
    defaultOpen: false,
  },
};

export const WhiteOpen: Story = {
  args: {
    title: 'Bouclage énergétique',
    content: 'Content',
    theme: 'white',
    defaultOpen: true,
  },
};

// Blue Theme Stories
export const BlueClosed: Story = {
  args: {
    title: 'Bouclage énergétique',
    content: 'Content',
    theme: 'blue',
    defaultOpen: false,
  },
};

export const BlueOpen: Story = {
  args: {
    title: 'Bouclage énergétique',
    content: 'Content',
    theme: 'blue',
    defaultOpen: true,
  },
};

// React Component Content
export const WithReactComponent: Story = {
  args: {
    title: 'React Component Content',
    content: (
      <div>
        <h4 style={{ margin: '0 0 8px 0' }}>Custom React Content</h4>
        <p style={{ margin: '0 0 8px 0' }}>This is a custom React component with:</p>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Multiple elements</li>
          <li>Rich formatting</li>
          <li>Dynamic content</li>
        </ul>
      </div>
    ),
    theme: 'white',
    defaultOpen: true,
  },
};

export const BlueWithReactComponent: Story = {
  args: {
    title: 'Blue Theme with React',
    content: (
      <div>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '8px', borderRadius: '4px', marginBottom: '8px' }}>
          <strong>Highlighted Section</strong>
        </div>
        <p style={{ margin: '0' }}>React components work great with the blue theme!</p>
      </div>
    ),
    theme: 'blue',
    defaultOpen: true,
  },
};

export const Interactive: Story = {
  args: {
    title: 'Interactive Accordion',
    content: 'Click the header to toggle this content',
    theme: 'white',
    defaultOpen: false,
  },
};
