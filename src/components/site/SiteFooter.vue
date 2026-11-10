<script setup>
import { useMarketingLanguage } from '@/i18n/useMarketingLanguage'
import { siteLink as link } from '@/lib/siteLink'

import GlobalFooter from '@/components/GlobalFooter.vue'

const { copy } = useMarketingLanguage()
const workspaceUrl = 'https://www.icoco.art/login'
</script>
<template>
<footer class="footer">
  <div class="wrap footer__inner">
    <div class="footer__brand">
      <img src="../../assets/img/logo.png" alt="ICOCO META" />
      <p>{{ copy("Engineering-guided AI for automotive design.") }}<br>{{ copy("Connect styling intent, geometry and engineering review in one workflow.") }}</p>
    </div>
    <div class="footer__cols">
      <div>
        <h4>{{ copy("Platform") }}</h4>
        <a :href="workspaceUrl" target="_blank" rel="noopener noreferrer" :aria-label="copy(&quot;Log in in a new tab&quot;)">{{ copy("Log in") }}</a>
        <a :href="link('/signup')">{{ copy("Sign up") }}</a>
        <a :href="link('/product')">{{ copy("Generative Styling") }}</a>
        <a :href="link('/product')">{{ copy("Geometric & Surface") }}</a>
        <a :href="link('/product')">{{ copy("Physics & Validation") }}</a>
      </div>
      <div>
        <h4>{{ copy("Company") }}</h4>
        <a :href="link('/about')">{{ copy("About") }}</a>
        <a :href="link('/news')">{{ copy("News") }}</a>
        <a :href="link('/contact')">{{ copy("Contact") }}</a>
        <a :href="link('/company')">{{ copy("Company profile") }}</a>
        <a :href="link('/careers')">{{ copy("Careers") }}</a>
      </div>
      <div>
        <h4>{{ copy("Resources & quick links") }}</h4>
        <a :href="link('/resources')">{{ copy("Guides & FAQ") }}</a>
        <a :href="link('/news#press')">{{ copy("Press enquiries") }}</a>
        <a href="https://www.icoco.art/privacy-policy" target="_blank" rel="noopener noreferrer">{{ copy("Privacy policy ↗") }}</a>
        <a href="https://www.icoco.art/user-agreement" target="_blank" rel="noopener noreferrer">{{ copy("User agreement ↗") }}</a>
        <a :href="link('/product#evidence')">{{ copy("Evidence & acceptance") }}</a>
        <a :href="link('/contact')">{{ copy("Discuss requirements") }}</a>
      </div>
    </div>
  </div>
  <div class="wrap footer__bottom">
    <GlobalFooter embedded />
  </div>
</footer>
</template>
