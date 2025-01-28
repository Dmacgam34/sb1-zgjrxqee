import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
- name: Set up Node.js
  uses: actions/setup-node@v3
  with:
    node-version: '18' # Use the latest LTS version
import pkg from "./package.json" assert { type: "json" };
const pkg = require("./package.json");
"type": "module"
npm cache clean --force
npm install
npm install glob@latest
npm install --save lru-cache
npm install --save-dev gulp
- name: Install dependencies
  run: npm install

- name: Install gulp globally (if needed)
  run: npm install --global gulp-cli

- name: Run gulp
  run: npx gulp
npm install patch-package --save-dev
import pkg from "./package.json" assert { type: "json" };
const pkg = require("./package.json");
"scripts": {
  "postinstall": "patch-package"
}

