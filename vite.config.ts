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
      '@client': path.resolve(__dirname, './app/client'),
      '@server': path.resolve(__dirname, './app/server')
    },
  },
})
