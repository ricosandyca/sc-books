import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import environmentPlugin from 'vite-plugin-environment';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin(), environmentPlugin('all')],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
});
