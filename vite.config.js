import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base './' keeps every emitted asset relative, so the same dist/ works at a
// domain root or under a sub-path (sandbox previews, temporary review links).
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  },
  server: { port: 5173 },
  preview: { port: 5173 },
  build: { outDir: 'dist', assetsInlineLimit: 0 }
})
