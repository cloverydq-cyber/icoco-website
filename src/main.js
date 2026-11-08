import { createApp } from 'vue'
import router from './router/index.js'
import App from './App.vue'
import './styles/standalone.css'
import './styles/page-boundary.css'

document.documentElement.classList.add('icoco-public-page')
document.body.classList.add('icoco-public-page')
createApp(App).use(router).mount('#app')
