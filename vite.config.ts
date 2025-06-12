import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "node:path";
import { cloudflare } from "@cloudflare/vite-plugin"
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss(), cloudflare()],
  server: {
    port: 5009,
    watch: {
      ignored: ['**/.wrangler/**', '**/node_modules/**']
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chart-vendor': ['recharts'],
          'ui-vendor': ['lucide-react', 'react-custom-scrollbars-2'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, 'shared')
    },
  }
})
