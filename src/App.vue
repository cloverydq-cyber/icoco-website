<script setup>
import { useRoute } from 'vue-router'
import './styles/website.css'
import './styles/site-additions.css'
import SiteHeader from '@/components/site/SiteHeader.vue'
import SiteFooter from '@/components/site/SiteFooter.vue'
const route = useRoute()
</script>
<template>
<div id="marketing-root" class="icoco-marketing">
<RouterView v-if="route.name === 'site-home'" />
<div v-else :class="['site-product', 'site-company', 'site-contact'].includes(route.name) ? 'site-original-page' : 'site-subpage'"><SiteHeader /><main id="main"><RouterView /></main><SiteFooter /></div>
</div>
</template>
