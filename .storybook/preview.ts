import type { Preview } from '@storybook/react-vite';

// Import component styles
import '../src/components/Avatar.css';
import '../src/components/Chip.css';
import '../src/components/Histogram.css';
import '../src/components/InputNumber.css';
import '../src/components/ProductionUnit.css';
import '../src/components/Switch.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      description: {
        component: 'Component documentation',
      },
    },
    a11y: {
      test: 'todo',
    },
    // Disable hot reloading in production builds
    ...(process.env.NODE_ENV === 'production' && {
      server: {
        hmr: false,
        ws: false,
      },
    }),
  },
};

export default preview;
