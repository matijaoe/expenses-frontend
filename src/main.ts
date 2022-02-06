// register vue composition api globally
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import ElementPlus from 'element-plus'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
// Element Plus
import 'element-plus/dist/index.css'
import './styles/element/index.scss'
import './styles/main.scss'
import 'uno.css'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
