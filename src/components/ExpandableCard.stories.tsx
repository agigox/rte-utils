import type { Meta, StoryObj } from '@storybook/react';
import { ExpandableCard } from './ExpandableCard';

const meta: Meta<typeof ExpandableCard> = {
  title: 'Components/ExpandableCard',
  component: ExpandableCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An expandable card component that transforms from a compact title view to an expanded details view with smooth width and height animations. Click to toggle between states.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    titleContent: <div>Click me!</div>,
    detailsContent: (
      <div>
        <h3>Expanded Details</h3>
        <p>This is the expanded content with more information.</p>
        <p>You can include any React components here.</p>
      </div>
    ),
  },
};

export const ProductCard: Story = {
  args: {
    titleContent: <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Product Overview</div>,
    detailsContent: (
      <div>
        <h3>Product Details</h3>
        <p><strong>Name:</strong> Premium Widget</p>
        <p><strong>Price:</strong> $99.99</p>
        <p><strong>Description:</strong> A high-quality widget designed for professional use.</p>
        <ul>
          <li>Durable construction</li>
          <li>Easy to use</li>
          <li>2-year warranty</li>
          <li>Free shipping</li>
        </ul>
      </div>
    ),
    collapsedWidth: 250,
    collapsedHeight: 80,
    expandedWidth: 450,
    expandedHeight: 350,
  },
};

export const UserProfile: Story = {
  args: {
    titleContent: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#3498db',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold'
        }}>
          JD
        </div>
        <span>John Doe</span>
      </div>
    ),
    detailsContent: (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#3498db',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '20px'
          }}>
            JD
          </div>
          <div>
            <h3 style={{ margin: '0 0 4px 0' }}>John Doe</h3>
            <p style={{ margin: 0, color: '#7f8c8d' }}>Senior Developer</p>
          </div>
        </div>
        <p><strong>Email:</strong> john.doe@example.com</p>
        <p><strong>Phone:</strong> +1 (555) 123-4567</p>
        <p><strong>Location:</strong> New York, NY</p>
        <p><strong>Bio:</strong> Experienced full-stack developer with expertise in React, Node.js, and cloud technologies.</p>
      </div>
    ),
    collapsedWidth: 200,
    collapsedHeight: 70,
    expandedWidth: 400,
    expandedHeight: 320,
  },
};

export const NotificationCard: Story = {
  args: {
    titleContent: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#e74c3c'
        }}></div>
        <span>New Message</span>
      </div>
    ),
    detailsContent: (
      <div>
        <h3>Message from Support Team</h3>
        <p style={{ color: '#7f8c8d', fontSize: '14px', margin: '0 0 12px 0' }}>
          Received 2 minutes ago
        </p>
        <p>
          Hello! We've received your support request and one of our team members
          will get back to you within 24 hours.
        </p>
        <p>
          Reference ID: #SUP-2024-001
        </p>
        <div style={{
          marginTop: '16px',
          padding: '8px 12px',
          backgroundColor: '#ecf0f1',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          Priority: Medium
        </div>
      </div>
    ),
    collapsedWidth: 180,
    collapsedHeight: 50,
    expandedWidth: 380,
    expandedHeight: 280,
  },
};

export const CustomSizes: Story = {
  args: {
    titleContent: <div>Custom Dimensions</div>,
    detailsContent: (
      <div>
        <h3>Large Expanded View</h3>
        <p>This card has custom dimensions when expanded.</p>
        <p>Perfect for content that needs more space.</p>
      </div>
    ),
    collapsedWidth: 150,
    collapsedHeight: 40,
    expandedWidth: 500,
    expandedHeight: 400,
  },
};

export const FastAnimation: Story = {
  args: {
    titleContent: <div>Fast Animation</div>,
    detailsContent: (
      <div>
        <h3>Quick Transition</h3>
        <p>This card animates quickly (150ms).</p>
      </div>
    ),
    animationDuration: 150,
  },
};

export const SlowAnimation: Story = {
  args: {
    titleContent: <div>Slow Animation</div>,
    detailsContent: (
      <div>
        <h3>Slow Transition</h3>
        <p>This card animates slowly (800ms) for a more dramatic effect.</p>
      </div>
    ),
    animationDuration: 800,
  },
};

export const FixedPositioning: Story = {
  args: {
    titleContent: <div>Fixed Position</div>,
    detailsContent: (
      <div>
        <h3>Fixed Position Card</h3>
        <p>This card is positioned at a fixed location on the screen.</p>
        <p>Top: 20px, Left: 100px</p>
      </div>
    ),
    top: 20,
    left: 100,
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const TopRightCorner: Story = {
  args: {
    titleContent: <div>🔔</div>,
    detailsContent: (
      <div>
        <h3>Notification Center</h3>
        <p>You have 3 new messages</p>
        <ul>
          <li>Meeting reminder at 3 PM</li>
          <li>Project update from team</li>
          <li>New comment on your post</li>
        </ul>
      </div>
    ),
    top: 20,
    left: window.innerWidth - 250,
    collapsedWidth: 60,
    collapsedHeight: 60,
    expandedWidth: 300,
    expandedHeight: 250,
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const FloatingButton: Story = {
  args: {
    titleContent: <div style={{ fontSize: '24px' }}>+</div>,
    detailsContent: (
      <div>
        <h3>Quick Actions</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button style={{ padding: '8px 12px', border: 'none', borderRadius: '4px', backgroundColor: '#3498db', color: 'white' }}>
            New Document
          </button>
          <button style={{ padding: '8px 12px', border: 'none', borderRadius: '4px', backgroundColor: '#2ecc71', color: 'white' }}>
            Upload File
          </button>
          <button style={{ padding: '8px 12px', border: 'none', borderRadius: '4px', backgroundColor: '#e74c3c', color: 'white' }}>
            Create Folder
          </button>
        </div>
      </div>
    ),
    top: window.innerHeight - 120,
    left: 50,
    collapsedWidth: 60,
    collapsedHeight: 60,
    expandedWidth: 200,
    expandedHeight: 180,
  },
  parameters: {
    layout: 'fullscreen',
  },
};