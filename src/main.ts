import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')

declare global {
  interface Window {
    webxdc: {
      setUpdateListener: (updateHandler: (update: any) => any, sequence?: number) => any,
      sendUpdate: (update: {payload: any}) => any
    };
  }
}