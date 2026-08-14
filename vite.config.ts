import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/yichang-museum/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
  },
})
