<script setup>
import { useMarketingLanguage } from '@/i18n/useMarketingLanguage'

import { ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import LanguageToggleButton from '@/components/LanguageToggleButton.vue'

const { copy, locale } = useMarketingLanguage()
const workspaceUrl = 'https://www.icoco.art/login'
const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => { open.value = false })
watch(open, value => {
  document.getElementById('marketing-root')?.classList.toggle('is-locked', value)
})
watch(locale, async () => {
  await nextTick()
  window.__moveInk?.(document.querySelector('.nav__link.is-active'))
})
</script>
<template>
<!-- ============ NAV ============ -->
<header class="nav" id="nav">
  <div class="nav__inner">
    <a class="nav__logo" href="/" :aria-label="copy(&quot;ICOCO META home&quot;)">
      <img src="../../assets/img/logo.png" alt="ICOCO META" />
    </a>

    <nav class="nav__links" id="navLinks" :aria-label="copy(&quot;Main&quot;)">
      <a href="/" class="nav__link" :class="{'is-active': route.path === '/'}" data-nav="home">{{ copy("Home") }}</a>
      <a href="/product" class="nav__link" :class="{'is-active': route.path === '/product'}" data-nav="products">{{ copy("Platform") }}</a>
      <a href="/news" class="nav__link" :class="{'is-active': route.path === '/news' || route.path.startsWith('/news/')}" data-nav="news">{{ copy("News") }}</a>
      <a href="/about" class="nav__link" :class="{'is-active': route.path === '/about'}" data-nav="about">{{ copy("About") }}</a>
      <a href="/contact" class="nav__link">{{ copy("Request a demo") }}</a>
      <span class="nav__ink" id="navInk" aria-hidden="true"></span>
    </nav>

    <div class="nav__account">
      <a :href="workspaceUrl" class="nav__cta" target="_blank" rel="noopener noreferrer" :aria-label="copy(&quot;Log in or sign up in a new tab&quot;)">
        <span>{{ copy("Log in / Sign up") }}</span>
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12L12 4M12 4H6M12 4V10" /></svg>
      </a>
    </div>

    <div class="nav__language"><LanguageToggleButton /></div>

    <button class="nav__burger" :class="{'is-open':open}" @click="open = !open" :aria-label="copy(&quot;Menu&quot;)" :aria-expanded="open">
      <span></span><span></span>
    </button>
  </div>
</header>

<div class="mobile-menu" :class="{'is-open':open}" @click="open = false">
  <a href="/">{{ copy("Home") }}</a>
  <a href="/product">{{ copy("Platform") }}</a>
  <a href="/news">{{ copy("News") }}</a>
  <a href="/about">{{ copy("About") }}</a>
  <a href="/contact">{{ copy("Request a demo") }}</a>
  <a :href="workspaceUrl" target="_blank" rel="noopener noreferrer" :aria-label="copy(&quot;Log in or sign up in a new tab&quot;)">{{ copy("Log in / Sign up ↗") }}</a>
</div>

</template>
