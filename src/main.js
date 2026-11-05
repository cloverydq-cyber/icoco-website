import { createApp } from 'vue'
import router from './router/index.js'
import App from './App.vue'

// The approved ICOCO META design ships its own visual system, so the site
// stylesheet is imported directly. The handover token files
// (icoco-titanium.css / icoco-token-presets.css) stay in the repo for future
// pages, but are intentionally not imported here: loading them would override
// the approved landing page.
import './styles/website.css'

createApp(App).use(router).mount('#app')
