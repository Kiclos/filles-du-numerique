import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './registerServiceWorker';
import './assets/scss/main.scss';

const i = 0;
createApp(App)
  .use(createPinia())
  .mount('#app');
