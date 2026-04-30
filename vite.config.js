import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) return 'react-vendor'
            if (id.includes('lucide-react') || id.includes('react-colorful')) return 'ui-vendor'
            if (id.includes('react-hook-form')) return 'form-vendor'
            if (id.includes('@dnd-kit')) return 'dnd-vendor'
          }
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
