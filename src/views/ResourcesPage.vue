<script setup>
import { useMarketingLanguage } from '@/i18n/useMarketingLanguage'

const { copy, guides, faqs } = useMarketingLanguage()

</script>
<template><div class="container page-intro"><p class="eyebrow">{{ copy("Resources") }}</p><h1>{{ copy("Get to know") }}<br>{{ copy("the workflow.") }}</h1><p>{{ copy("Practical starting points for your next conversation with ICOCO.") }}</p></div><section class="container section"><div class="resource-list"><RouterLink v-for="guide in guides" :key="guide.slug" :to="'/resources/' + guide.slug"><span>{{ guide.type }}</span><div><h2>{{ guide.title }}</h2><p>{{ guide.summary }}</p></div><span aria-hidden="true">↗</span></RouterLink></div></section><section class="container section faq-section"><h2>{{ copy("Frequently asked.") }}</h2><div><details v-for="[q,a] in faqs" :key="q"><summary>{{ q }}</summary><p>{{ a }}</p></details></div></section></template>
