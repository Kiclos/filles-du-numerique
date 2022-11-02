import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/colors.scss";',
      },
    },
  },
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
