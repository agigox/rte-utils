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
          <Icons.CheckboxEmpty />
          <span>Checkbox Empty</span>
        </div>

        <div className="icon-item">
          <Icons.CheckboxFilled />
          <span>Checkbox Filled</span>
        </div>

        <div className="icon-item">
          <Icons.Key />
          <span>Key</span>
        </div>

        <div className="icon-item">
          <Icons.Comment />
          <span>Comment</span>
        </div>

        <div className="icon-item">
          <Icons.UserWithCircle />
          <span>User With Circle</span>
        </div>

        <div className="icon-item">
          <Icons.SouthEastArrow />
          <span>South East Arrow</span>
        </div>

        <div className="icon-item">
          <Icons.RightArrowNew />
          <span>Right Arrow (New)</span>
        </div>

        <div className="icon-item">
          <Icons.Drag />
          <span>Drag</span>
        </div>

        
        <div className="icon-item">
          <Icons.Bot />
          <span>Bot</span>
        </div>
        <div className="icon-item">
          <Icons.Decline />
          <span>Decline</span>
        </div>
        <div className="icon-item">
          <Icons.NoBot />
          <span>NoBot</span>
        </div>
        <div className="icon-item">
          <Icons.SettingsCog />
          <span>Settings Cog</span>
        </div>
        <div className="icon-item">
          <Icons.CopyFile />
          <span>Copy File</span>
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

// New Icons Story - Showcasing all newly added icons
export const NewIconsShowcase: Story = {
  render: () => (
    <div className="icons-showcase">
      <h2>Newly Added Icons</h2>
      <p>Latest additions to the icon library</p>

      <div className="icons-grid">
        <div className="icon-item">
          <Icons.CheckboxEmpty />
          <span>Checkbox Empty</span>
        </div>

        <div className="icon-item">
          <Icons.CheckboxFilled />
          <span>Checkbox Filled</span>
        </div>

        <div className="icon-item">
          <Icons.Key />
          <span>Key</span>
        </div>

        <div className="icon-item">
          <Icons.Comment />
          <span>Comment</span>
        </div>

        <div className="icon-item">
          <Icons.UserWithCircle />
          <span>User With Circle</span>
        </div>

        <div className="icon-item">
          <Icons.SouthEastArrow />
          <span>South East Arrow</span>
        </div>

        <div className="icon-item">
          <Icons.RightArrowNew />
          <span>Right Arrow (New)</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Showcase of the newly added icons including checkbox states, key, comment, user with circle, directional arrows, and more.',
      },
    },
  },
};

// Checkbox Icons Story
export const CheckboxIconsExample: Story = {
  render: () => (
    <div className="icons-showcase">
      <h2>Checkbox Icons</h2>
      <p>Checkbox states for form elements</p>

      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <Icons.CheckboxEmpty size={24} />
          <div style={{ marginTop: '8px', fontSize: '14px' }}>Empty</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icons.CheckboxFilled size={24} />
          <div style={{ marginTop: '8px', fontSize: '14px' }}>Filled</div>
        </div>
      </div>

      <div style={{ marginTop: '24px' }}>
        <h3>Different Sizes</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Icons.CheckboxEmpty size={12} />
          <Icons.CheckboxEmpty size={16} />
          <Icons.CheckboxEmpty size={24} />
          <Icons.CheckboxEmpty size={32} />
          <span style={{ marginLeft: '16px' }}>→</span>
          <Icons.CheckboxFilled size={12} />
          <Icons.CheckboxFilled size={16} />
          <Icons.CheckboxFilled size={24} />
          <Icons.CheckboxFilled size={32} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Checkbox icons in empty and filled states. Perfect for custom checkbox implementations.',
      },
    },
  },
};

// Directional Arrows Story
export const DirectionalArrowsExample: Story = {
  render: () => (
    <div className="icons-showcase">
      <h2>Directional Arrows</h2>
      <p>Various arrow icons for navigation and actions</p>

      <div style={{ display: 'flex', gap: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ textAlign: 'center' }}>
          <Icons.RightArrowNew size={24} color="#009CDF" />
          <div style={{ marginTop: '8px', fontSize: '14px' }}>Right Arrow</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icons.SouthEastArrow size={24} color="#009CDF" />
          <div style={{ marginTop: '8px', fontSize: '14px' }}>South East</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icons.ArrowDown size={24} />
          <div style={{ marginTop: '8px', fontSize: '14px' }}>Down</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icons.Previous size={24} />
          <div style={{ marginTop: '8px', fontSize: '14px' }}>Previous</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icons.Next size={24} />
          <div style={{ marginTop: '8px', fontSize: '14px' }}>Next</div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Collection of directional arrow icons for various navigation and action purposes.',
      },
    },
  },
};

// Communication Icons Story
export const CommunicationIconsExample: Story = {
  render: () => (
    <div className="icons-showcase">
      <h2>Communication Icons</h2>
      <p>Icons for messaging and user interactions</p>

      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <Icons.Comment size={32} color="#009CDF" />
          <div style={{ marginTop: '8px', fontSize: '14px' }}>Comment</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icons.Send size={32} color="#009CDF" />
          <div style={{ marginTop: '8px', fontSize: '14px' }}>Send</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icons.User size={32} />
          <div style={{ marginTop: '8px', fontSize: '14px' }}>User</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icons.UserWithCircle size={32} />
          <div style={{ marginTop: '8px', fontSize: '14px' }}>User Circle</div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icons related to communication, messaging, and user representation.',
      },
    },
  },
};

// Security Icons Story
export const SecurityIconsExample: Story = {
  render: () => (
    <div className="icons-showcase">
      <h2>Security & Access Icons</h2>
      <p>Icons for authentication and security features</p>

      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <Icons.Key size={32} color="#009CDF" />
          <div style={{ marginTop: '8px', fontSize: '14px' }}>Key</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icons.Anonymize size={32} />
          <div style={{ marginTop: '8px', fontSize: '14px' }}>Anonymize</div>
        </div>
      </div>

      <div style={{ marginTop: '24px' }}>
        <h3>Key with Custom Colors</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Icons.Key size={28} color="#ff0000" />
          <Icons.Key size={28} color="#00aa00" />
          <Icons.Key size={28} color="#0066cc" />
          <Icons.Key size={28} color="#ff9800" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icons representing security, authentication, and access control features.',
      },
    },
  },
};
