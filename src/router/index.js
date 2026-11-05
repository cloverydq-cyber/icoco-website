import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

// Single approved landing page. The trailing catch-all keeps the page rendering
// when the site is opened via /index.html or under a preview sub-path, where the
// history base and the document path can disagree.
export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/:pathMatch(.*)*', name: 'landing-fallback', component: HomePage }
  ]
})
