import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    port: 5173,
  },
  plugins: [react()],
})
