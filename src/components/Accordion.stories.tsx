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
          'An accordion component that can expand and collapse to show/hide different content. Features a clickable header with an animated arrow icon, smooth transitions between states, and supports both white and blue themes. Can display different content when opened vs closed, or no content if not provided.',
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

// Basic Stories - Only opened content
export const WithOpenedContentOnly: Story = {
  args: {
    title: 'Bouclage énergétique',
    openedContent: 'This appears when opened',
    theme: 'white',
    defaultOpen: false,
  },
};

export const WithClosedContentOnly: Story = {
  args: {
    title: 'Bouclage énergétique',
    closedContent: 'This appears when closed',
    theme: 'white',
    defaultOpen: false,
  },
};

// Different content for opened and closed states
export const WithBothContents: Story = {
  args: {
    title: 'Bouclage énergétique',
    openedContent: 'Opened: Detailed information is now visible',
    closedContent: 'Closed: Summary view only',
    theme: 'white',
    defaultOpen: false,
  },
};

// Blue theme with both contents
export const BlueWithBothContents: Story = {
  args: {
    title: 'Bouclage énergétique',
    openedContent: 'Opened: Full details in blue theme',
    closedContent: 'Closed: Brief info in blue theme',
    theme: 'blue',
    defaultOpen: false,
  },
};

// React Component Content
export const WithReactComponents: Story = {
  args: {
    title: 'React Component Content',
    openedContent: (
      <div>
        <h4 style={{ margin: '0 0 8px 0' }}>Opened State</h4>
        <p style={{ margin: '0 0 8px 0' }}>This is detailed React content with:</p>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Multiple elements</li>
          <li>Rich formatting</li>
          <li>Dynamic content</li>
        </ul>
      </div>
    ),
    closedContent: (
      <div>
        <strong>Closed State</strong>
        <p style={{ margin: '4px 0 0 0' }}>Brief summary here</p>
      </div>
    ),
    theme: 'white',
    defaultOpen: false,
  },
};

export const BlueWithReactComponents: Story = {
  args: {
    title: 'Blue Theme with React',
    openedContent: (
      <div>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '8px', borderRadius: '4px', marginBottom: '8px' }}>
          <strong>Opened: Full Details</strong>
        </div>
        <p style={{ margin: '0' }}>Complete information displayed</p>
      </div>
    ),
    closedContent: (
      <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '2px' }}>
        <strong>Closed: Summary</strong>
      </div>
    ),
    theme: 'blue',
    defaultOpen: false,
  },
};

// No content provided - shows only header
export const HeaderOnly: Story = {
  args: {
    title: 'Header Only Accordion',
    theme: 'white',
    defaultOpen: false,
  },
};

export const Interactive: Story = {
  args: {
    title: 'Interactive Demo',
    openedContent: 'Now you see the opened content!',
    closedContent: 'This shows when closed - click to expand!',
    theme: 'white',
    defaultOpen: false,
  },
};
