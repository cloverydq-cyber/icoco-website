import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 100 }
    if (to.path !== from.path) return { top: 0 }
    return false
  },
  routes: [
    { path: '/', name: 'site-home', component: () => import('../views/HomePage.vue') },
    { path: '/product', name: 'site-product', component: () => import('../views/ProductPage.vue') },
    { path: '/news', name: 'site-news', component: () => import('../views/NewsPage.vue') },
    { path: '/news/:slug', name: 'site-news-article', component: () => import('../views/ArticlePage.vue') },
    { path: '/resources', name: 'site-resources', component: () => import('../views/ResourcesPage.vue') },
    { path: '/resources/:slug', name: 'site-guide', component: () => import('../views/ArticlePage.vue') },
    { path: '/about', name: 'site-company', component: () => import('../views/AboutPage.vue') },
    { path: '/company', redirect: '/about' },
    { path: '/contact', name: 'site-contact', component: () => import('../views/ContactPage.vue') },
    ...['signup', 'careers'].map(page => ({ path: '/' + page, name: 'site-' + page, component: () => import('../views/InfoPage.vue') })),
    { path: '/:pathMatch(.*)*', name: 'site-not-found', component: () => import('../views/InfoPage.vue') },
  ],
})
router.afterEach(to => {
  document.title = (to.name === 'site-home' ? 'ICOCO META' : String(to.name).replace(/^site-/, '').replaceAll('-', ' ')) + ' | Automotive Design & Engineering'
})
export default router
