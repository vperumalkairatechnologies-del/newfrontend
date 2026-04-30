import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react', 'react-colorful'],
          'form-vendor': ['react-hook-form'],
          'dnd-vendor': ['@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
    minify: 'esbuild',
    target: 'es2020',
  },
  server: {
    port: 5173,
    proxy: {
      '/backend/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend/, ''),
      },
    },
  },
})
