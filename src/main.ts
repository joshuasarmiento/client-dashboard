import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/index.css'
import router from './router/route'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')