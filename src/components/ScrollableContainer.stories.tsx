import type { Meta, StoryObj } from '@storybook/react';
import { ScrollableContainer } from './ScrollableContainer';

const meta: Meta<typeof ScrollableContainer> = {
  title: 'Components/ScrollableContainer',
  component: ScrollableContainer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A scrollable container that displays a custom scrollbar only when content overflows. Supports customizable scrollbar width, track and thumb colors, and border radius.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    scrollbarWidth: {
      control: { type: 'range', min: 2, max: 20, step: 1 },
    },
    trackColor: {
      control: { type: 'color' },
    },
    thumbColor: {
      control: { type: 'color' },
    },
    thumbBorderRadius: {
      control: { type: 'range', min: 0, max: 20, step: 1 },
    },
    trackBorderRadius: {
      control: { type: 'range', min: 0, max: 20, step: 1 },
    },
    thumbHeight: {
      control: { type: 'range', min: 10, max: 100, step: 5 },
    },
    height: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample list items for demo
const ListItem = ({ text, index }: { text: string; index: number }) => (
  <div
    style={{
      padding: '12px 16px',
      borderBottom: '1px solid #eee',
      backgroundColor: index % 2 === 0 ? '#fff' : '#fafafa',
    }}
  >
    {text}
  </div>
);

// Basic example with overflow
export const WithOverflow: Story = {
  args: {
    height: 200,
    scrollbarWidth: 6,
    trackColor: '#E8E8E8',
    thumbColor: '#C4C4C4',
    thumbHeight: 40,
  },
  render: (args) => (
    <div style={{ width: 300, border: '1px solid #ddd', borderRadius: 8 }}>
      <ScrollableContainer {...args}>
        {Array.from({ length: 10 }, (_, i) => (
          <ListItem key={i} text={`Item ${i + 1}`} index={i} />
        ))}
      </ScrollableContainer>
    </div>
  ),
};

// No overflow - scrollbar hidden
export const NoOverflow: Story = {
  args: {
    height: 300,
    scrollbarWidth: 6,
    trackColor: '#E8E8E8',
    thumbColor: '#C4C4C4',
  },
  render: (args) => (
    <div style={{ width: 300, border: '1px solid #ddd', borderRadius: 8 }}>
      <ScrollableContainer {...args}>
        {Array.from({ length: 3 }, (_, i) => (
          <ListItem key={i} text={`Item ${i + 1}`} index={i} />
        ))}
      </ScrollableContainer>
    </div>
  ),
};

// Custom scrollbar styling
export const CustomScrollbar: Story = {
  args: {
    height: 200,
    scrollbarWidth: 8,
    trackColor: '#F0E6FF',
    thumbColor: '#8B5CF6',
    thumbBorderRadius: 4,
    trackBorderRadius: 4,
  },
  render: (args) => (
    <div style={{ width: 300, border: '1px solid #ddd', borderRadius: 8 }}>
      <ScrollableContainer {...args}>
        {Array.from({ length: 10 }, (_, i) => (
          <ListItem key={i} text={`Item ${i + 1}`} index={i} />
        ))}
      </ScrollableContainer>
    </div>
  ),
};

// Thin scrollbar like in the design
export const ThinScrollbar: Story = {
  args: {
    height: 250,
    scrollbarWidth: 4,
    trackColor: '#F5F5F5',
    thumbColor: '#D4A574',
    thumbBorderRadius: 10,
    trackBorderRadius: 10,
  },
  render: (args) => (
    <div style={{ width: 300, border: '1px solid #ddd', borderRadius: 8 }}>
      <ScrollableContainer {...args}>
        {Array.from({ length: 12 }, (_, i) => (
          <ListItem key={i} text={`Item ${i + 1}`} index={i} />
        ))}
      </ScrollableContainer>
    </div>
  ),
};

// Table-like usage (like scenario 1 in the image)
const TableRow = ({
  offreur,
  prix,
  volOffert,
  volAchete,
  hasStatus,
}: {
  offreur: string;
  prix: number;
  volOffert: number;
  volAchete: number;
  hasStatus?: 'success' | 'error' | null;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 60px 60px 60px 40px',
      padding: '10px 12px',
      borderBottom: '1px solid #eee',
      fontSize: 14,
      alignItems: 'center',
    }}
  >
    <span>{offreur}</span>
    <span style={{ textAlign: 'right' }}>{prix}</span>
    <span style={{ textAlign: 'right' }}>{volOffert}</span>
    <span style={{ textAlign: 'right' }}>{volAchete}</span>
    <span style={{ textAlign: 'center' }}>
      {hasStatus === 'success' && <span style={{ color: 'green' }}>✓</span>}
      {hasStatus === 'error' && <span style={{ color: 'red' }}>✗</span>}
    </span>
  </div>
);

export const TableScenario: Story = {
  args: {
    height: 220,
    scrollbarWidth: 6,
    trackColor: '#F5F5F5',
    thumbColor: '#D4A574',
  },
  render: (args) => (
    <div
      style={{
        width: 400,
        backgroundColor: '#fff',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: '16px',
      }}
    >
      <h3 style={{ margin: '0 0 12px 0', fontSize: 14, fontWeight: 600 }}>OFFRES FAITES</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 60px 60px 60px 40px',
          padding: '8px 12px',
          fontSize: 12,
          color: '#666',
          borderBottom: '2px solid #eee',
        }}
      >
        <span>Offreur</span>
        <span style={{ textAlign: 'right' }}>Prix</span>
        <span style={{ textAlign: 'right' }}>Vol. offert</span>
        <span style={{ textAlign: 'right' }}>Vol. acheté</span>
        <span style={{ textAlign: 'center' }}>Statut</span>
      </div>
      <ScrollableContainer {...args}>
        <TableRow offreur="De-Elec" prix={38} volOffert={70} volAchete={0} />
        <TableRow offreur="EDF" prix={44} volOffert={29} volAchete={0} hasStatus="error" />
        <TableRow offreur="Lacq Elec" prix={200} volOffert={1000} volAchete={0} />
        <TableRow
          offreur="Loire Elec"
          prix={19}
          volOffert={178}
          volAchete={100}
          hasStatus="success"
        />
        <TableRow
          offreur="Rhin Elec"
          prix={36}
          volOffert={525}
          volAchete={525}
          hasStatus="success"
        />
        <TableRow offreur="Rhone Elec" prix={30} volOffert={0} volAchete={0} />
        <TableRow offreur="De-Elec" prix={35} volOffert={79} volAchete={0} />
        <TableRow offreur="Loire Elec" prix={38} volOffert={70} volAchete={0} />
      </ScrollableContainer>
    </div>
  ),
};

// Bilan table (like scenario 2 in the image)
const BilanRow = ({
  offreur,
  volOffert,
  proportion,
}: {
  offreur: string;
  volOffert: number;
  proportion: number;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 60px 50px 80px',
      padding: '8px 12px',
      fontSize: 14,
      alignItems: 'center',
    }}
  >
    <span>{offreur}</span>
    <span style={{ textAlign: 'right' }}>{volOffert}</span>
    <span style={{ textAlign: 'right', color: '#8B5CF6' }}>{proportion} %</span>
    <div
      style={{
        marginLeft: 8,
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${proportion}%`,
          height: '100%',
          backgroundColor: '#8B5CF6',
          borderRadius: 4,
        }}
      />
    </div>
  </div>
);

export const BilanScenario: Story = {
  args: {
    height: 280,
    scrollbarWidth: 6,
    trackColor: '#F5F5F5',
    thumbColor: '#C4C4C4',
  },
  render: (args) => (
    <div
      style={{
        width: 350,
        backgroundColor: '#fff',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: '16px',
      }}
    >
      <h3 style={{ margin: '0 0 12px 0', fontSize: 14, fontWeight: 600 }}>
        BILAN OFFRES PAR ACTEUR
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 60px 50px 80px',
          padding: '8px 12px',
          fontSize: 12,
          color: '#666',
        }}
      >
        <span>Offreur</span>
        <span style={{ textAlign: 'right' }}>Vol. offert</span>
        <span style={{ textAlign: 'right' }}>Proportion</span>
        <span></span>
      </div>
      <ScrollableContainer {...args}>
        <BilanRow offreur="EDF" volOffert={4440} proportion={45} />
        <BilanRow offreur="Rhone Elec" volOffert={4440} proportion={45} />
        <BilanRow offreur="CNR" volOffert={4440} proportion={45} />
        <BilanRow offreur="Rhone Elec" volOffert={4440} proportion={45} />
        <BilanRow offreur="Rhin Elec" volOffert={2990} proportion={33} />
        <BilanRow offreur="Aude Elec" volOffert={2990} proportion={33} />
        <BilanRow offreur="Lacq Elec" volOffert={2720} proportion={31} />
        <BilanRow offreur="Loire Elec" volOffert={1850} proportion={24} />
        <BilanRow offreur="De-Elec" volOffert={1850} proportion={24} />
        <BilanRow offreur="Saone Elec" volOffert={1850} proportion={24} />
      </ScrollableContainer>
    </div>
  ),
};
