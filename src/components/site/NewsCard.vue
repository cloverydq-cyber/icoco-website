<script setup>
import { useMarketingLanguage } from '@/i18n/useMarketingLanguage'

const { copy } = useMarketingLanguage()

defineProps({ item: { type: Object, required: true } })
</script>
<template><article class="news-card"><RouterLink :to="'/news/' + item.slug" class="news-image"><img :src="item.image" :alt="item.alt" loading="lazy" width="900" height="900"></RouterLink><div class="article-meta"><span>{{ item.categoryLabel }}</span><time :datetime="item.date">{{ item.date }}</time></div><h3><RouterLink :to="'/news/' + item.slug">{{ item.title }}</RouterLink></h3><p>{{ item.summary }}</p><RouterLink :to="'/news/' + item.slug" class="text-link">{{ copy("Read story ↗") }}</RouterLink></article></template>
