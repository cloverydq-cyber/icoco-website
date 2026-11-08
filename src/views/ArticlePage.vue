<script setup>
import { useMarketingLanguage } from '@/i18n/useMarketingLanguage'

import { computed } from 'vue'
import { useRoute } from 'vue-router'

const { copy, news, guides } = useMarketingLanguage()
const route = useRoute()
const isNews = computed(() => route.name === 'site-news-article')
const item = computed(() => (isNews.value ? news.value : guides.value).find(n => n.slug === route.params.slug))
</script>
<template><article v-if="item" class="container article-page"><RouterLink :to="isNews ? '/news' : '/resources'" class="text-link">← {{ copy(isNews ? 'Newsroom' : 'Resources') }}</RouterLink><div class="article-meta"><span>{{ item.categoryLabel || item.type }}</span><time v-if="item.date" :datetime="item.date">{{ item.date }}</time></div><h1>{{ item.title }}</h1><p class="article-deck">{{ item.summary }}</p><figure v-if="item.image" class="article-photo"><img :src="item.image" :alt="item.alt"><figcaption>{{ item.alt }}</figcaption></figure><div class="article-body"><template v-if="isNews"><p v-for="paragraph in item.body" :key="paragraph">{{ paragraph }}</p><aside class="source-note"><strong>{{ copy("Source") }}</strong><p>{{ item.originalTitle }}</p><a :href="item.source" target="_blank" rel="noopener noreferrer" class="text-link">{{ copy("Read the original ICOCO post ↗") }}</a></aside></template><template v-else><section v-for="[title,body] in item.sections" :key="title"><h2>{{ title }}</h2><p>{{ body }}</p></section></template><RouterLink to="/contact" class="button">{{ copy("Discuss your project ↗") }}</RouterLink></div></article><div v-else class="container page-intro"><h1>{{ copy("Story not found.") }}</h1><RouterLink to="/news" class="text-link">{{ copy("Return to the newsroom") }}</RouterLink></div></template>
