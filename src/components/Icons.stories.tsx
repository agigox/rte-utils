import type { Meta, StoryObj } from '@storybook/react';
import { Icons } from './Icons';
import './Icons.css';

const meta: Meta<typeof Icons> = {
  title: 'Components/Icons',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story to showcase all icons with their names
export const AllIcons: Story = {
  render: () => (
    <div className="icons-showcase">
      <h2>RTE Utils Icon Library</h2>
      <p>All available SVG icons consolidated from the component library</p>

      <div className="icons-grid">
        <div className="icon-item">
          <Icons.Send />
          <span>Send</span>
        </div>

        <div className="icon-item">
          <Icons.Edit />
          <span>Edit</span>
        </div>

        <div className="icon-item">
          <Icons.Trash />
          <span>Trash</span>
        </div>

        <div className="icon-item">
          <Icons.User />
          <span>User</span>
        </div>

        <div className="icon-item">
          <Icons.Success />
          <span>Success</span>
        </div>

        <div className="icon-item">
          <Icons.Failure />
          <span>Failure</span>
        </div>

        <div className="icon-item">
          <Icons.Partial />
          <span>Partial</span>
        </div>

        <div className="icon-item">
          <Icons.Spinner />
          <span>Spinner</span>
        </div>

        <div className="icon-item">
          <Icons.Plus />
          <span>Plus</span>
        </div>

        <div className="icon-item">
          <Icons.PlusCircle />
          <span>Plus Circle</span>
        </div>

        <div className="icon-item">
          <Icons.MinusCircle />
          <span>Minus Circle</span>
        </div>

        <div className="icon-item">
          <Icons.ArrowDown />
          <span>Arrow Down</span>
        </div>

        <div className="icon-item">
          <Icons.Power />
          <span>Power</span>
        </div>

        <div className="icon-item">
          <Icons.SwitchThumb />
          <span>Switch Thumb</span>
        </div>

        <div className="icon-item">
          <Icons.Target />
          <span>Target</span>
        </div>

        <div className="icon-item">
          <Icons.Previous />
          <span>Previous</span>
        </div>

        <div className="icon-item">
          <Icons.Next />
          <span>Next</span>
        </div>

        <div className="icon-item">
          <Icons.Pause />
          <span>Pause</span>
        </div>

        <div className="icon-item">
          <Icons.Play />
          <span>Play</span>
        </div>

        <div className="icon-item">
          <Icons.Freeze />
          <span>Freeze</span>
        </div>

        <div className="icon-item">
          <Icons.Anonymize />
          <span>Anonymize</span>
        </div>

        <div className="icon-item">
          <Icons.Maintenance />
          <span>Maintenance</span>
        </div>

        <div className="icon-item">
          <Icons.Refresh />
          <span>Refresh</span>
        </div>

        <div className="icon-item">
          <Icons.PlusCircleTransparent />
          <span>Plus Circle Transparent</span>
        </div>

        <div className="icon-item">
          <Icons.Pen />
          <span>Pen</span>
        </div>
        
        <div className="icon-item">
          <Icons.Drag />
          <span>Drag</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Complete showcase of all available icons in the RTE Utils library. These icons are extracted from various components and consolidated for reuse across projects.',
      },
    },
  },
};

// Story showing different sizes
export const IconSizes: Story = {
  render: () => (
    <div className="icons-showcase">
      <h2>Icon Sizes</h2>
      <p>Icons can be resized using the size prop</p>

      <div className="size-examples">
        <div className="size-row">
          <h3>Small (16px)</h3>
          <div className="icons-row">
            <Icons.Send size={16} />
            <Icons.Edit size={16} />
            <Icons.User size={16} />
            <Icons.Success size={16} />
            <Icons.Plus size={16} />
          </div>
        </div>

        <div className="size-row">
          <h3>Medium (24px)</h3>
          <div className="icons-row">
            <Icons.Send size={24} />
            <Icons.Edit size={24} />
            <Icons.User size={24} />
            <Icons.Success size={24} />
            <Icons.Plus size={24} />
          </div>
        </div>

        <div className="size-row">
          <h3>Large (32px)</h3>
          <div className="icons-row">
            <Icons.Send size={32} />
            <Icons.Edit size={32} />
            <Icons.User size={32} />
            <Icons.Success size={32} />
            <Icons.Plus size={32} />
          </div>
        </div>

        <div className="size-row">
          <h3>Extra Large (48px)</h3>
          <div className="icons-row">
            <Icons.Send size={48} />
            <Icons.Edit size={48} />
            <Icons.User size={48} />
            <Icons.Success size={48} />
            <Icons.Plus size={48} />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how icons can be scaled to different sizes using the size prop.',
      },
    },
  },
};

// Story showing custom colors
export const IconColors: Story = {
  render: () => (
    <div className="icons-showcase">
      <h2>Custom Colors</h2>
      <p>Icons can be colored using the color prop</p>

      <div className="color-examples">
        <div className="color-row">
          <h3>Default Colors</h3>
          <div className="icons-row">
            <Icons.Send />
            <Icons.Edit />
            <Icons.Success />
            <Icons.Failure />
            <Icons.Partial />
          </div>
        </div>

        <div className="color-row">
          <h3>Custom Red (#ff0000)</h3>
          <div className="icons-row">
            <Icons.Send color="#ff0000" />
            <Icons.Edit color="#ff0000" />
            <Icons.User color="#ff0000" />
            <Icons.Plus color="#ff0000" />
            <Icons.Target color="#ff0000" />
          </div>
        </div>

        <div className="color-row">
          <h3>Custom Blue (#0066cc)</h3>
          <div className="icons-row">
            <Icons.Send color="#0066cc" />
            <Icons.Edit color="#0066cc" />
            <Icons.User color="#0066cc" />
            <Icons.Plus color="#0066cc" />
            <Icons.Target color="#0066cc" />
          </div>
        </div>

        <div className="color-row">
          <h3>Custom Green (#00aa00)</h3>
          <div className="icons-row">
            <Icons.Send color="#00aa00" />
            <Icons.Edit color="#00aa00" />
            <Icons.User color="#00aa00" />
            <Icons.Plus color="#00aa00" />
            <Icons.Target color="#00aa00" />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows how to customize icon colors using the color prop.',
      },
    },
  },
};

// Story showing disabled state
export const DisabledIcons: Story = {
  render: () => (
    <div className="icons-showcase">
      <h2>Disabled State</h2>
      <p>Some icons support disabled states</p>

      <div className="disabled-examples">
        <div className="disabled-row">
          <h3>Normal State</h3>
          <div className="icons-row">
            <Icons.Send disabled={false} />
            <Icons.Edit disabled={false} />
            <Icons.Trash disabled={false} />
            <Icons.Power isOff={false} />
          </div>
        </div>

        <div className="disabled-row">
          <h3>Disabled State</h3>
          <div className="icons-row">
            <Icons.Send disabled={true} />
            <Icons.Edit disabled={true} />
            <Icons.Trash disabled={true} />
            <Icons.Power isOff={true} />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates icons that support disabled states, typically shown with muted colors.',
      },
    },
  },
};

// Story showing stateful icons
export const StatefulIcons: Story = {
  render: () => (
    <div className="icons-showcase">
      <h2>Stateful Icons</h2>
      <p>Icons with different states or configurations</p>

      <div className="state-examples">
        <div className="state-row">
          <h3>Arrow (Different Themes)</h3>
          <div className="icons-row">
            <div className="theme-example white-theme">
              <Icons.ArrowDown theme="white" />
              <span>White Theme</span>
            </div>
            <div className="theme-example blue-theme">
              <Icons.ArrowDown theme="blue" />
              <span>Blue Theme</span>
            </div>
          </div>
        </div>

        <div className="state-row">
          <h3>Arrow (Open/Closed)</h3>
          <div className="icons-row">
            <Icons.ArrowDown isOpen={false} />
            <span>Closed</span>
            <Icons.ArrowDown isOpen={true} />
            <span>Open</span>
          </div>
        </div>

        <div className="state-row">
          <h3>Anonymize (On/Off)</h3>
          <div className="icons-row">
            <div className="anon-example">
              <Icons.Anonymize isAnonymised={false} />
              <span>Visible</span>
            </div>
            <div className="anon-example anon-active">
              <Icons.Anonymize isAnonymised={true} />
              <span>Anonymized</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Icons that have different states or configurations, such as themes, open/closed states, or on/off toggles.',
      },
    },
  },
};

// Individual icon examples for more detailed documentation
export const SendIconExample: Story = {
  render: () => <Icons.Send />,
  parameters: {
    docs: {
      description: {
        story: 'Send/Email icon used in BuyLine component for submit actions.',
      },
    },
  },
};

export const EditIconExample: Story = {
  render: () => <Icons.Edit />,
  parameters: {
    docs: {
      description: {
        story: 'Edit/Pencil icon used in BuyLine component for edit actions.',
      },
    },
  },
};

export const StatusIconsExample: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Icons.Success />
      <Icons.Failure />
      <Icons.Partial />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Status icons (Success, Failure, Partial) used to indicate different states in BuyLine component.',
      },
    },
  },
};
