import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  build: {
    cssCodeSplit: false,
  },
  server: {
    port: 3000,
  },
  resolve: { alias: { '@': '/src' } },
  optimizeDeps: {
    include: [
      'vue',
    ],
  },
  plugins: [
    vue(),
  ],
})
