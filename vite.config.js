import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/capocantcode.io/',
  optimizeDeps: {
    include: [
      '@react-spring/three',
      '@react-spring/core',
      '@react-spring/web',
      'three'
    ],
  },
  resolve: {
    dedupe: ['react', 'react-dom', 'three'],
  },
  //base: '/'
})
