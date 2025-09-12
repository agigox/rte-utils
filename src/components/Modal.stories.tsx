import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { useState } from 'react';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A Modal component with animated width and height transitions. Works like Ant Design with an `open` prop for controlling visibility. Features smooth open/close animations and responsive design. The modal can be closed by clicking the X button, clicking outside the modal, or pressing the Escape key.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the modal is visible',
    },
    children: {
      control: false,
      description: 'Content to display inside the modal',
    },
    width: {
      control: 'text',
      description: 'Width of the modal (CSS value)',
    },
    height: {
      control: 'text',
      description: 'Height of the modal (CSS value)',
    },
    onClose: {
      control: false,
      description: 'Callback function called when modal closes',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the modal content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWithTrigger = ({ children, triggerText = 'Open Modal', triggerStyle = {}, ...modalProps }: any) => {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        style={{ 
          padding: '12px 24px', 
          borderRadius: '6px', 
          border: '1px solid #ccc', 
          cursor: 'pointer',
          ...triggerStyle
        }}
      >
        {triggerText}
      </button>
      <Modal 
        {...modalProps}
        open={open}
        onClose={() => setOpen(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export const Default: Story = {
  args: {
    width: '400px',
    height: '300px',
  },
  render: (args) => (
    <ModalWithTrigger {...args}>
      <h2 style={{ margin: '0 0 16px 0', color: '#333' }}>Default Modal</h2>
      <p style={{ margin: 0, color: '#666' }}>
        This is a basic modal with default dimensions (400px × 300px). 
        Notice the smooth width and height animation when opening and closing.
      </p>
    </ModalWithTrigger>
  ),
};

export const LargeModal: Story = {
  args: {
    width: '600px',
    height: '500px',
  },
  render: (args) => (
    <ModalWithTrigger 
      {...args}
      triggerText="Open Large Modal"
      triggerStyle={{ padding: '16px 32px', borderRadius: '8px', backgroundColor: '#009CDF', color: 'white', border: 'none' }}
    >
      <h2 style={{ margin: '0 0 20px 0', color: '#333' }}>Large Modal</h2>
      <p style={{ margin: '0 0 16px 0', color: '#666' }}>
        This is a larger modal (600px × 500px) with more content to showcase the animation effect.
      </p>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ color: '#333', marginBottom: '8px' }}>Features:</h3>
        <ul style={{ color: '#666', paddingLeft: '20px' }}>
          <li>Smooth width and height animations</li>
          <li>Customizable dimensions</li>
          <li>Click outside to close</li>
          <li>Press Escape to close</li>
          <li>Responsive design</li>
        </ul>
      </div>
      <p style={{ margin: 0, color: '#666' }}>
        The animation creates a smooth scaling effect from zero dimensions to the target size.
      </p>
    </ModalWithTrigger>
  ),
};

export const SmallModal: Story = {
  args: {
    width: '250px',
    height: '150px',
  },
  render: (args) => (
    <ModalWithTrigger 
      {...args}
      triggerText="Small Modal"
      triggerStyle={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: '#10b981', color: 'white', border: 'none', fontSize: '14px' }}
    >
      <h3 style={{ margin: '0 0 12px 0', color: '#333', fontSize: '16px' }}>Compact Modal</h3>
      <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
        A smaller modal (250px × 150px) perfect for simple messages or confirmations.
      </p>
    </ModalWithTrigger>
  ),
};

const ModalWithCustomTrigger = ({ children, trigger, ...modalProps }: any) => {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <div onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
        {trigger}
      </div>
      <Modal 
        {...modalProps}
        open={open}
        onClose={() => setOpen(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export const WithDivTrigger: Story = {
  args: {
    width: '500px',
    height: '400px',
  },
  render: (args) => (
    <ModalWithCustomTrigger 
      {...args}
      trigger={
        <div style={{ 
          padding: '20px', 
          border: '2px dashed #009CDF', 
          borderRadius: '8px', 
          backgroundColor: '#f0f9ff', 
          textAlign: 'center',
          transition: 'all 0.2s ease'
        }}>
          <span style={{ color: '#009CDF', fontWeight: 'bold' }}>📦 Click this div to open modal</span>
        </div>
      }
    >
      <h2 style={{ margin: '0 0 16px 0', color: '#333' }}>Triggered by Div</h2>
      <p style={{ margin: '0 0 16px 0', color: '#666' }}>
        This modal was triggered by clicking a custom div element instead of a button.
        You can use any React element as a trigger.
      </p>
      <div style={{ 
        padding: '16px', 
        backgroundColor: '#f8fafc', 
        borderRadius: '6px', 
        border: '1px solid #e2e8f0' 
      }}>
        <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>Custom Trigger Examples:</h4>
        <ul style={{ color: '#666', margin: '0', paddingLeft: '20px' }}>
          <li>Buttons</li>
          <li>Divs with custom styling</li>
          <li>Images</li>
          <li>Icons</li>
          <li>Cards or any clickable element</li>
        </ul>
      </div>
    </ModalWithCustomTrigger>
  ),
};

export const WithCallbacks: Story = {
  args: {
    width: '450px',
    height: '250px',
  },
  render: (args) => (
    <ModalWithTrigger 
      {...args}
      triggerText="Modal with Callbacks"
      triggerStyle={{ padding: '12px 24px', borderRadius: '6px', backgroundColor: '#8b5cf6', color: 'white', border: 'none' }}
      onClose={() => console.log('Modal closed!')}
    >
      <h2 style={{ margin: '0 0 16px 0', color: '#333' }}>Modal with Callbacks</h2>
      <p style={{ margin: '0 0 16px 0', color: '#666' }}>
        This modal has an onClose callback function. 
        Check the browser console to see the callback message when you close the modal!
      </p>
      <div style={{ 
        padding: '12px', 
        backgroundColor: '#fef3c7', 
        borderRadius: '4px', 
        borderLeft: '4px solid #f59e0b' 
      }}>
        <strong style={{ color: '#92400e' }}>💡 Tip:</strong>
        <span style={{ color: '#92400e', marginLeft: '8px' }}>
          Open the browser console to see callback logs
        </span>
      </div>
    </ModalWithTrigger>
  ),
};

export const ResponsiveModal: Story = {
  args: {
    width: '80vw',
    height: '60vh',
  },
  render: (args) => (
    <ModalWithTrigger 
      {...args}
      triggerText="Responsive Modal"
      triggerStyle={{ padding: '12px 24px', borderRadius: '6px', backgroundColor: '#ef4444', color: 'white', border: 'none' }}
    >
      <h2 style={{ margin: '0 0 16px 0', color: '#333' }}>Responsive Modal</h2>
      <p style={{ margin: '0 0 16px 0', color: '#666' }}>
        This modal uses viewport units (80vw × 60vh) to be responsive to screen size.
        Try resizing your browser window to see how it adapts.
      </p>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px',
        marginTop: '20px'
      }}>
        <div style={{ padding: '16px', backgroundColor: '#ddd6fe', borderRadius: '6px' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>Flexible Width</h4>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Adapts to screen width</p>
        </div>
        <div style={{ padding: '16px', backgroundColor: '#dcfce7', borderRadius: '6px' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>Flexible Height</h4>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Scales with viewport</p>
        </div>
      </div>
    </ModalWithTrigger>
  ),
};

export const AnimationShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
      <ModalWithTrigger 
        width="200px" 
        height="150px"
        triggerText="Tiny (200×150)"
        triggerStyle={{ padding: '10px 16px', borderRadius: '4px', backgroundColor: '#06b6d4', color: 'white', border: 'none' }}
      >
        <h4 style={{ margin: '0 0 12px 0' }}>Tiny Modal</h4>
        <p style={{ margin: 0, fontSize: '14px' }}>Quick animation demo</p>
      </ModalWithTrigger>
      
      <ModalWithTrigger 
        width="350px" 
        height="250px"
        triggerText="Medium (350×250)"
        triggerStyle={{ padding: '10px 16px', borderRadius: '4px', backgroundColor: '#10b981', color: 'white', border: 'none' }}
      >
        <h3 style={{ margin: '0 0 12px 0' }}>Medium Modal</h3>
        <p style={{ margin: 0 }}>Notice how the animation scales smoothly regardless of the target size.</p>
      </ModalWithTrigger>
      
      <ModalWithTrigger 
        width="700px" 
        height="500px"
        triggerText="Large (700×500)"
        triggerStyle={{ padding: '10px 16px', borderRadius: '4px', backgroundColor: '#f59e0b', color: 'white', border: 'none' }}
      >
        <h2 style={{ margin: '0 0 16px 0' }}>Large Modal</h2>
        <p style={{ margin: '0 0 16px 0' }}>
          This demonstrates how the animation works with larger dimensions.
          The scaling effect is consistent across all sizes.
        </p>
        <div style={{ height: '200px', backgroundColor: '#f3f4f6', borderRadius: '6px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ margin: 0, color: '#666' }}>Extra content to show scrollable area</p>
        </div>
      </ModalWithTrigger>
    </div>
  ),
};

// New story to show the direct open prop usage (like Ant Design)
export const ControlledModal: Story = {
  args: {
    open: false,
    width: '400px',
    height: '300px',
  },
  render: (args) => (
    <Modal {...args}>
      <h2 style={{ margin: '0 0 16px 0', color: '#333' }}>Controlled Modal</h2>
      <p style={{ margin: 0, color: '#666' }}>
        This modal is controlled by the 'open' prop in the Storybook controls. 
        Toggle it in the controls panel below to see the animation!
      </p>
    </Modal>
  ),
};