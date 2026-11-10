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
    // Hosts that expose the entry file directly (GitHub Pages, some CDNs) let
    // people land on /index.html -- that is the home page, not a 404.
    { path: '/index.html', redirect: '/' },
    { path: '/:pathMatch(.*)*', name: 'site-not-found', component: () => import('../views/InfoPage.vue') },
  ],
})

// When the app is hosted under a sub-path (the Pages preview lives at
// /icoco-website/), a hand-written or bookmarked link can repeat the base
// (/icoco-website/icoco-website/product). Strip the extra prefix instead of
// showing the not-found page.
const BASE_SEGMENT = import.meta.env.BASE_URL.replace(/^\/+|\/+$/g, '')
router.beforeEach(to => {
  if (!BASE_SEGMENT) return true
  const doubled = `/${BASE_SEGMENT}`
  if (to.path === doubled) return '/'
  if (to.path.startsWith(doubled + '/')) return to.fullPath.slice(doubled.length)
  return true
})
router.afterEach(to => {
  document.title = (to.name === 'site-home' ? 'ICOCO META' : String(to.name).replace(/^site-/, '').replaceAll('-', ' ')) + ' | Automotive Design & Engineering'
})
export default router
