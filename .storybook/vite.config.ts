import { defineConfig } from 'vite';
import { mergeConfig } from 'vite';

export default defineConfig({
  define: {
    global: 'globalThis',
  },
  server: {
    fs: {
      strict: false,
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          storybook: ['@storybook/react-vite'],
        },
      },
    },
  },
});