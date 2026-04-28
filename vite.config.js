import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), tailwindcss()],
    base: '/',
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name]-[hash]-v2.js`,
          chunkFileNames: `assets/[name]-[hash]-v2.js`,
          assetFileNames: `assets/[name]-[hash]-v2.[ext]`,
        },
      },
    },
    server: {
      port: 5173,
      headers: {
        'Cross-Origin-Opener-Policy': 'unsafe-none',
        'Cross-Origin-Embedder-Policy': 'unsafe-none',
      },
      proxy: {
        '/backend/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/backend/, ''),
        },
      },
    },
  }
})
