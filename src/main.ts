import { setupLayouts } from 'virtual:generated-layouts'
import { ViteSSG } from 'vite-ssg'
import VueGtag from 'vue-gtag'

import App from './App.vue'
import generatedRoutes from '~pages'
import './assets/scss/main.scss'
import 'virtual:fonts.css'
import type { UserModule } from '@/types'
const routes = setupLayouts(generatedRoutes)

export const createApp = ViteSSG(
  App,
  { routes, base: '/' },
  (ctx) => {
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    ctx.app.use(VueGtag, {
      config: { id: "G-S9QDXCEJ2M", debug: true }
    })
  },
)
