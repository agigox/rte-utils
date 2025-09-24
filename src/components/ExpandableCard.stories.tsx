import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { ExpandableCard } from './ExpandableCard';

const meta: Meta<typeof ExpandableCard> = {
  title: 'Components/ExpandableCard',
  component: ExpandableCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A controlled expandable card component that transforms from a compact title view to an expanded details view with smooth width and height animations. Expansion state is controlled externally.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Collapse' : 'Expand'} Card
        </button>
        <ExpandableCard
          titleContent={<div>Click the button above!</div>}
          detailsContent={(
            <div>
              <h3>Expanded Details</h3>
              <p>This is the expanded content with more information.</p>
              <p>You can include any React components here.</p>
            </div>
          )}
          isExpanded={isExpanded}
          onToggle={setIsExpanded}
        />
      </div>
    );
  },
};

export const ProductCard: Story = {
  render: () => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setIsExpanded(true)}>Expand</button>
          <button onClick={() => setIsExpanded(false)}>Collapse</button>
        </div>
        <ExpandableCard
          titleContent={<div style={{ fontWeight: 'bold', fontSize: '16px' }}>Product Overview</div>}
          detailsContent={(
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
          )}
          collapsedWidth={250}
          collapsedHeight={80}
          expandedWidth={450}
          expandedHeight={350}
          isExpanded={isExpanded}
          onToggle={setIsExpanded}
        />
      </div>
    );
  },
};

export const UserProfile: Story = {
  render: () => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <button onClick={() => setIsExpanded(!isExpanded)}>
          Toggle Profile
        </button>
        <ExpandableCard
          titleContent={(
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#3498db',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                JD
              </div>
              <span>John Doe</span>
            </div>
          )}
          detailsContent={(
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#3498db',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '20px',
                  }}
                >
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
          )}
          collapsedWidth={200}
          collapsedHeight={70}
          expandedWidth={400}
          expandedHeight={320}
          isExpanded={isExpanded}
          onToggle={setIsExpanded}
        />
      </div>
    );
  },
};

export const ExternalControl: Story = {
  render: () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [autoToggle, setAutoToggle] = useState(false);
    
    // Auto-toggle demonstration
    useEffect(() => {
      if (autoToggle) {
        const interval = setInterval(() => {
          setIsExpanded(prev => !prev);
        }, 2000);
        return () => clearInterval(interval);
      }
    }, [autoToggle]);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => setIsExpanded(true)}>Expand</button>
          <button onClick={() => setIsExpanded(false)}>Collapse</button>
          <button onClick={() => setIsExpanded(!isExpanded)}>Toggle</button>
          <button onClick={() => setAutoToggle(!autoToggle)}>
            {autoToggle ? 'Stop' : 'Start'} Auto-toggle
          </button>
        </div>
        <p>Status: <strong>{isExpanded ? 'Expanded' : 'Collapsed'}</strong></p>
        <ExpandableCard
          titleContent={<div style={{ textAlign: 'center' }}>Controlled Externally</div>}
          detailsContent={(
            <div>
              <h3>External Control Demo</h3>
              <p>This card's expansion state is controlled by the buttons above.</p>
              <p>Notice how the card doesn't respond to clicks - it's fully controlled externally.</p>
              <p>Current state: <strong>{isExpanded ? 'Expanded' : 'Collapsed'}</strong></p>
            </div>
          )}
          isExpanded={isExpanded}
          onToggle={setIsExpanded}
        />
      </div>
    );
  },
};

export const CustomSizes: Story = {
  render: () => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Collapse' : 'Expand'} Large Card
        </button>
        <ExpandableCard
          titleContent={<div>Custom Dimensions</div>}
          detailsContent={(
            <div>
              <h3>Large Expanded View</h3>
              <p>This card has custom dimensions when expanded.</p>
              <p>Perfect for content that needs more space.</p>
              <p>Expanded size: 500x400px</p>
              <p>Collapsed size: 150x40px</p>
            </div>
          )}
          collapsedWidth={150}
          collapsedHeight={40}
          expandedWidth={500}
          expandedHeight={400}
          isExpanded={isExpanded}
          onToggle={setIsExpanded}
        />
      </div>
    );
  },
};

export const FastAnimation: Story = {
  render: () => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Collapse' : 'Expand'} (Fast)
        </button>
        <p>Animation Duration: 150ms</p>
        <ExpandableCard
          titleContent={<div>Fast Animation</div>}
          detailsContent={(
            <div>
              <h3>Quick Transition</h3>
              <p>This card animates quickly (150ms).</p>
              <p>Perfect for snappy interactions!</p>
            </div>
          )}
          animationDuration={150}
          isExpanded={isExpanded}
          onToggle={setIsExpanded}
        />
      </div>
    );
  },
};

export const SlowAnimation: Story = {
  render: () => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Collapse' : 'Expand'} (Slow)
        </button>
        <p>Animation Duration: 800ms</p>
        <ExpandableCard
          titleContent={<div>Slow Animation</div>}
          detailsContent={(
            <div>
              <h3>Slow Transition</h3>
              <p>This card animates slowly (800ms) for a more dramatic effect.</p>
              <p>Great for emphasizing the transformation!</p>
            </div>
          )}
          animationDuration={800}
          isExpanded={isExpanded}
          onToggle={setIsExpanded}
        />
      </div>
    );
  },
};

export const FixedPositioning: Story = {
  render: () => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
      <div>
        <div style={{ padding: '20px', position: 'fixed', top: '10px', left: '10px', zIndex: 1001, background: 'white', border: '1px solid #ccc', borderRadius: '4px' }}>
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'Collapse' : 'Expand'} Fixed Card
          </button>
        </div>
        <div style={{ padding: '100px 20px', minHeight: '200vh' }}>
          <p>This story demonstrates a fixed position card. The card is positioned at the top-right corner.</p>
          <p>Scroll down to see how the card stays in place...</p>
          <p>Use the control button in the top-left to toggle the card.</p>
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i}>Scroll content line {i + 1}</p>
          ))}
        </div>
        <ExpandableCard
          titleContent={<div style={{ textAlign: 'center' }}>Fixed Position</div>}
          detailsContent={(
            <div>
              <h3>Fixed Position Card</h3>
              <p>This card is positioned at a fixed location on the screen.</p>
              <p>Top: 20px, right: 20px</p>
              <p>It stays in place when you scroll!</p>
            </div>
          )}
          top={20}
          right={20}
          collapsedWidth={150}
          collapsedHeight={40}
          expandedWidth={300}
          expandedHeight={200}
          animationDuration={500}
          isExpanded={isExpanded}
          onToggle={setIsExpanded}
        />
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'This story demonstrates a card with fixed positioning. The card appears in the top-right corner and remains there even when scrolling. Use the control button to toggle its state.',
      },
    },
  },
};

export const TopRightCorner: Story = {
  render: () => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
      <div>
        <div style={{ padding: '20px' }}>
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'Close' : 'Open'} Notifications
          </button>
          <p>A notification icon in the top-right corner. Click the button to toggle.</p>
        </div>
        <ExpandableCard
          titleContent={<div style={{ fontSize: '24px', textAlign: 'center' }}>🔔</div>}
          detailsContent={(
            <div>
              <h3>Notification Center</h3>
              <p>You have 3 new messages</p>
              <ul>
                <li>Meeting reminder at 3 PM</li>
                <li>Project update from team</li>
                <li>New comment on your post</li>
              </ul>
            </div>
          )}
          top={20}
          right={20}
          collapsedWidth={60}
          collapsedHeight={60}
          expandedWidth={300}
          expandedHeight={250}
          isExpanded={isExpanded}
          onToggle={setIsExpanded}
        />
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'A notification-style card that starts as a small bell icon in the top-right corner and expands to show notification details.',
      },
    },
  },
};

export const FloatingButton: Story = {
  render: () => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
      <div>
        <div style={{ padding: '20px' }}>
          <p>A floating action button in the bottom-right corner. Click the button below to toggle.</p>
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'Hide' : 'Show'} Actions
          </button>
        </div>
        <ExpandableCard
          titleContent={<div style={{ fontSize: '24px', textAlign: 'center' }}>+</div>}
          detailsContent={(
            <div>
              <h3>Quick Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  style={{
                    padding: '8px 12px',
                    border: 'none',
                    borderRadius: '4px',
                    backgroundColor: '#3498db',
                    color: 'white',
                  }}
                >
                  New Document
                </button>
                <button
                  style={{
                    padding: '8px 12px',
                    border: 'none',
                    borderRadius: '4px',
                    backgroundColor: '#2ecc71',
                    color: 'white',
                  }}
                >
                  Upload File
                </button>
                <button
                  style={{
                    padding: '8px 12px',
                    border: 'none',
                    borderRadius: '4px',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
          top={window.innerHeight - 220}
          right={20}
          collapsedWidth={60}
          collapsedHeight={60}
          expandedWidth={200}
          expandedHeight={180}
          isExpanded={isExpanded}
          onToggle={setIsExpanded}
        />
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'A floating action button that expands to show quick action options.',
      },
    },
  },
};
