import Vue3Tour from 'vue3-tour'
import type { UserModule } from '@/types'

import 'vue3-tour/dist/vue3-tour.css'

export const install: UserModule = ({ app }: any) => {
  app.use(Vue3Tour).provide('tours', app.config.globalProperties.$tours)
}
