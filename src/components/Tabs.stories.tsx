import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { useState } from 'react';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A tabs component with uppercase labels and count badges. Features active state styling with blue colors and proper accessibility support. Designed to match the Figma design with rounded corners and clean typography.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      control: 'object',
      description: 'Array of tab items with id, label, and optional count',
    },
    activeTabId: {
      control: 'text',
      description: 'ID of the currently active tab (controlled mode)',
    },
    onTabChange: {
      description: 'Callback function called when tab changes',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    children: {
      control: false,
      description: 'Content to display in the tabs body',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultTabs = [
  { id: 'tous', label: 'Tous', count: 9 },
  { id: 'achats', label: 'Achats', count: 2 },
  { id: 'ventes', label: 'Ventes', count: 7 },
];

export const Default: Story = {
  args: {
    tabs: defaultTabs,
    activeTabId: 'achats',
  },
};

export const WithContent: Story = {
  args: {
    tabs: defaultTabs,
    activeTabId: 'achats',
    children: (
      <div className="tab-body-content">
        Content Achat
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs component with content displayed in the body area below the tab headers.',
      },
    },
  },
};

export const WithoutCounts: Story = {
  args: {
    tabs: [
      { id: 'overview', label: 'Overview' },
      { id: 'details', label: 'Details' },
      { id: 'settings', label: 'Settings' },
    ],
    activeTabId: 'details',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs component without count badges, showing only the labels.',
      },
    },
  },
};

export const TwoTabs: Story = {
  args: {
    tabs: [
      { id: 'buy', label: 'Achats', count: 5 },
      { id: 'sell', label: 'Ventes', count: 3 },
    ],
    activeTabId: 'buy',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs component with only two tabs, demonstrating flexible layout.',
      },
    },
  },
};

export const ManyTabs: Story = {
  args: {
    tabs: [
      { id: 'all', label: 'Tous', count: 25 },
      { id: 'buy', label: 'Achats', count: 8 },
      { id: 'sell', label: 'Ventes', count: 12 },
      { id: 'pending', label: 'En Attente', count: 3 },
      { id: 'completed', label: 'Terminés', count: 2 },
    ],
    activeTabId: 'pending',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs component with five tabs, showing how it adapts to more items.',
      },
    },
  },
};

export const LargeCounts: Story = {
  args: {
    tabs: [
      { id: 'all', label: 'Tous', count: 999 },
      { id: 'active', label: 'Actifs', count: 156 },
      { id: 'inactive', label: 'Inactifs', count: 843 },
    ],
    activeTabId: 'active',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs component with large count numbers, testing badge sizing.',
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState('achats');
    
    const getContent = (tabId: string) => {
      switch (tabId) {
        case 'tous':
          return 'Affichage de tous les éléments (9 au total)';
        case 'achats':
          return 'Affichage des achats (2 éléments)';
        case 'ventes':
          return 'Affichage des ventes (7 éléments)';
        default:
          return 'Contenu non disponible';
      }
    };

    return (
      <Tabs
        tabs={defaultTabs}
        activeTabId={activeTab}
        onTabChange={setActiveTab}
      >
        <div className="tab-body-content">
          {getContent(activeTab)}
        </div>
      </Tabs>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive tabs component where clicking tabs changes the content. The content updates based on the selected tab.',
      },
    },
  },
};

export const Controlled: Story = {
  args: {
    tabs: defaultTabs,
    activeTabId: 'ventes',
  },
  render: (args) => (
    <Tabs
      {...args}
      onTabChange={(tabId) => {
        console.log('Tab changed to:', tabId);
        alert(`Switched to tab: ${tabId}`);
      }}
    >
      <div className="tab-body-content">
        Controlled tabs - check console for tab changes
      </div>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Controlled tabs component where the parent manages the active state. Click tabs to see console output and alerts.',
      },
    },
  },
};

export const Uncontrolled: Story = {
  args: {
    tabs: defaultTabs,
  },
  render: (args) => (
    <Tabs {...args}>
      <div className="tab-body-content">
        Uncontrolled tabs - internal state management
      </div>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Uncontrolled tabs component that manages its own active state internally. Defaults to the first tab.',
      },
    },
  },
};

export const CustomStyling: Story = {
  args: {
    tabs: [
      { id: 'energy', label: 'Énergie', count: 42 },
      { id: 'power', label: 'Puissance', count: 18 },
      { id: 'grid', label: 'Réseau', count: 7 },
    ],
    activeTabId: 'energy',
    className: 'custom-tabs',
  },
  render: (args) => (
    <div>
      <style>
        {`
          .custom-tabs {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border: 1px solid #e5e7eb;
          }
        `}
      </style>
      <Tabs {...args}>
        <div className="tab-body-content">
          Custom styled tabs with shadow and border
        </div>
      </Tabs>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs component with custom styling applied via className prop, demonstrating extensibility.',
      },
    },
  },
};