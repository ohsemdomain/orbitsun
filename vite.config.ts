import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "node:path";
import { cloudflare } from "@cloudflare/vite-plugin"

export default defineConfig({
  plugins: [
    react(),
    cloudflare()
  ],
  server: {
    port: 5151,
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@worker': path.resolve(__dirname, './worker')
    },
  },
})
