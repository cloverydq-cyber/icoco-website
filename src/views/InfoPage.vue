<script setup>
import { useMarketingLanguage } from '@/i18n/useMarketingLanguage'

import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { accountUrl, contactEmail } from '@/data/site'

const { copy } = useMarketingLanguage()
const route = useRoute()
const page = computed(() => String(route.name).replace(/^site-/, ''))
</script>
<template>
<div v-if="page === 'signup'" class="container account-page"><p class="eyebrow">{{ copy("Your ICOCO account") }}</p><h1>{{ copy("Start with") }}<br>{{ copy("a new account.") }}</h1><p>{{ copy("Registration takes place in the ICOCO application. Open the account screen, then select its registration option to create your account.") }}</p><ol class="account-steps"><li>{{ copy("Open the ICOCO account screen.") }}</li><li>{{ copy("Select the registration option below the sign-in form.") }}</li><li>{{ copy("Follow the application’s account verification steps.") }}</li></ol><a :href="accountUrl" target="_blank" rel="noopener noreferrer" class="button">{{ copy("Continue to ICOCO ↗") }}</a><p class="section-note">{{ copy("Already have an account?") }} <a :href="accountUrl" target="_blank" rel="noopener noreferrer" class="text-link">{{ copy("Log in") }}</a></p></div>
<div v-else-if="page === 'careers'" class="container page-intro"><p class="eyebrow">{{ copy("Careers") }}</p><h1>{{ copy("Bring your perspective") }}<br>{{ copy("to the work.") }}</h1><p>{{ copy("Interested in design, geometry or engineering AI? Introduce yourself and the kind of contribution you would like to make.") }}</p><a class="button" :href="'mailto:' + contactEmail + '?subject=ICOCO%20career%20enquiry'">{{ copy("Introduce yourself ↗") }}</a><p class="section-note">{{ copy("There are no specific job openings published on this website at present.") }}</p></div>
<div v-else class="container page-intro"><h1>{{ copy("Page not found.") }}</h1><RouterLink to="/" class="button">{{ copy("Back to home") }}</RouterLink></div>
</template>
