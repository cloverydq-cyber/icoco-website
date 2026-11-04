import { createApp } from 'vue'
import './styles/icoco-titanium.css'
import './styles/icoco-token-presets.css'
import './styles/website.css'
import preset from './config/uiTokenPreset.json'
import App from './App.vue'
import router from './router/index.js'
document.documentElement.dataset.icoTokenPreset = preset.preset
createApp(App).use(router).mount('#app')
