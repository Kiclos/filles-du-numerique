import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { VitePluginFonts } from 'vite-plugin-fonts'

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

  resolve: { alias: { '@': `${path.resolve(__dirname, 'src')}/` } },
  optimizeDeps: {
    include: [
      'vue',
    ],
  },
  plugins: [
    Icons({
      autoInstall: true,
    }),
    Pages({
      pagesDir: [
        { dir: 'src/views', baseRoute: '' },
      ],
      extensions: ['vue'],
      syncIndex: true,
    }),
    Layouts(),
    Components({
      resolvers: [
        IconsResolver(),
      ],
      dirs: ['src/components', 'src/views'],
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
    }),
    vue(),
    VitePluginFonts({
      google: {
        families: [{
          name: 'Open Sans',
          styles: 'wght@100;200;300;400;500;600;700;800',
        }],
      },
    }),
  ],
})
