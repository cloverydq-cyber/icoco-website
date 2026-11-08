import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Absolute root assets keep direct SPA page refreshes working.
// Sub-path hosting needs an explicit --base=/repository/ build and SPA fallback.
export default defineConfig({
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  },
  server: { port: 5173 },
  preview: { port: 5173 },
  build: { outDir: 'dist', assetsInlineLimit: 0 }
})
