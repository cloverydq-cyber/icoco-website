<script setup>
import { useMarketingLanguage } from '@/i18n/useMarketingLanguage'

import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { contactEmail } from '@/data/site'
import NewsCard from '@/components/site/NewsCard.vue'

const { copy, news } = useMarketingLanguage()
const route = useRoute()
const categories = ['All', 'Events', 'Company', 'Product']
const selected = computed(() => categories.includes(route.query.category) ? route.query.category : 'All')
const visible = computed(() => selected.value === 'All' ? news.value : news.value.filter(n => n.category === selected.value))
</script>
<template><div class="container page-intro"><p class="eyebrow">{{ copy("Newsroom") }}</p><h1>{{ copy("From the team.") }}<br>{{ copy("From the field.") }}</h1><p>{{ copy("Company updates, events and product stories from ICOCO’s official channel.") }}</p></div><section class="container section"><nav class="category-nav" :aria-label="copy(&quot;News categories&quot;)"><RouterLink v-for="category in categories" :key="category" :to="{path:'/news',query:category === 'All' ? {} : {category}}" :aria-current="selected === category ? 'page' : undefined">{{ copy(category) }}</RouterLink></nav><div class="news-grid"><NewsCard v-for="item in visible" :key="item.slug" :item="item" /></div><div class="press-panel" id="press"><h2>{{ copy("For the press.") }}</h2><p>{{ copy("For company information, interviews or approved imagery, contact the team.") }}</p><a class="text-link" :href="'mailto:' + contactEmail + '?subject=ICOCO%20press%20enquiry'">{{ copy("Press enquiry ↗") }}</a></div></section></template>
