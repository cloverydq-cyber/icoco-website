<script setup>
import { reactive, ref } from 'vue'
import { useMarketingLanguage } from '@/i18n/useMarketingLanguage'

const { copy } = useMarketingLanguage()

// Every submission goes into our own collection service (server/server.mjs):
// on icoco.art nginx proxies /survey-api/ to the Node process on loopback, the
// GitHub Pages preview posts to the production host instead. The rows show up
// in the password-protected table at /survey-api/admin.
const API_BASE = (() => {
  const host = window.location.hostname
  if (/(^|\.)icoco\.art$/.test(host)) return '/survey-api'
  if (host === '127.0.0.1' || host === 'localhost') return 'http://127.0.0.1:8787/survey-api'
  return 'https://www.icoco.art/survey-api'
})()

const PROJECT_TYPES = ['Styling', 'Surface & Class-A', 'Engineering validation', 'Manufacturing', 'Other']

const form = reactive({ name: '', company: '', email: '', phone: '', projectType: [], notes: '' })
const state = ref('idle') // idle | sending | done | invalid | error

function valid() {
  return form.name.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
}

async function submit() {
  if (!valid()) {
    state.value = 'invalid'
    return
  }
  state.value = 'sending'
  try {
    const res = await fetch(API_BASE + '/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: form.name.trim(),
        company: form.company.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        projectType: form.projectType,
        needs: form.notes.trim(),
        source: window.location.href,
        locale: document.documentElement.lang || 'en',
      }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok || !data.ok) throw new Error(data.error || 'failed')
    state.value = 'done'
  } catch (e) {
    state.value = 'error'
  }
}

function reset() {
  form.name = ''
  form.company = ''
  form.email = ''
  form.phone = ''
  form.projectType = []
  form.notes = ''
  state.value = 'idle'
}
</script>

<template>
<!-- ============ CONTACT ============ -->
<section class="contact" id="contact">
  <div class="wrap contact__grid">
    <div class="contact__panel">
      <div class="contact__lead">
        <h1 class="contact__title reveal is-in">{{ copy("Discuss your project") }}</h1>
        <p class="contact__claim reveal is-in" style="--d:.06s">{{ copy("Bring a design challenge. Define the next step.") }}</p>
        <p class="contact__sub reveal is-in" style="--d:.1s">{{ copy("Share your workflow, constraints and expected outputs so we can scope a relevant demonstration.") }}</p>
      </div>

      <form v-if="state !== 'done'" class="contact__form reveal is-in" style="--d:.16s" novalidate @submit.prevent="submit">
        <div class="cf-row">
          <label class="cf-field">
            <span class="cf-label">{{ copy("Name") }}</span>
            <input v-model="form.name" type="text" name="name" autocomplete="name" :placeholder="copy('Your full name')" />
          </label>
          <label class="cf-field">
            <span class="cf-label">{{ copy("Company") }}</span>
            <input v-model="form.company" type="text" name="company" autocomplete="organization" :placeholder="copy('Company or studio')" />
          </label>
        </div>

        <div class="cf-row">
          <label class="cf-field">
            <span class="cf-label">{{ copy("Email") }}</span>
            <input v-model="form.email" type="email" name="email" autocomplete="email" placeholder="name@company.com" />
          </label>
          <label class="cf-field">
            <span class="cf-label">{{ copy("Phone") }}</span>
            <input v-model="form.phone" type="tel" name="phone" autocomplete="tel" :placeholder="copy('Country code + number')" />
          </label>
        </div>

        <div class="cf-field cf-types" role="group" :aria-label="copy('Project type')">
          <span class="cf-label">{{ copy("Project type") }}</span>
          <div class="cf-chipset">
            <label
              v-for="t in PROJECT_TYPES"
              :key="t"
              class="cf-chip"
              :class="{ 'is-on': form.projectType.includes(t) }"
            >
              <input v-model="form.projectType" type="checkbox" :value="t" />
              <span>{{ copy(t) }}</span>
            </label>
          </div>
        </div>

        <label class="cf-field">
          <span class="cf-label">{{ copy("Notes") }}</span>
          <textarea v-model="form.notes" name="notes" rows="2" :placeholder="copy('Workflow, constraints, expected outputs')"></textarea>
        </label>

        <div class="cf-foot">
          <button class="cf-submit" type="submit" :disabled="state === 'sending'">
            <span class="cf-submit__label">{{ state === 'sending' ? copy("Sending…") : copy("Send request") }}</span>
            <span class="cf-submit__arrow" aria-hidden="true">
              <svg viewBox="0 0 16 16"><path d="M2.5 8h10M8.8 3.4L13.4 8l-4.6 4.6" /></svg>
            </span>
          </button>
          <p class="cf-msg" :class="{ 'is-error': state === 'invalid' || state === 'error' }" aria-live="polite">
            <template v-if="state === 'invalid'">{{ copy("Add your name and a valid email, then send again.") }}</template>
            <template v-else-if="state === 'error'">{{ copy("Could not send right now — please try again, or write to") }} <a href="mailto:enea.colombo@icona-designgroup.com">enea.colombo@icona-designgroup.com</a></template>
            <template v-else>{{ copy("Or write directly to") }} <a href="mailto:enea.colombo@icona-designgroup.com">enea.colombo@icona-designgroup.com</a></template>
          </p>
        </div>
      </form>

      <div v-else class="cf-done reveal is-in" aria-live="polite">
        <p class="cf-done__title">{{ copy("Thank you — your request is in.") }}</p>
        <p class="cf-done__sub">{{ copy("Enea or the ICOCO META team will reply within two working days.") }}</p>
        <button class="cf-done__again" type="button" @click="reset">{{ copy("Send another request") }}</button>
      </div>

      <p class="contact__note">{{ copy("ICOCO META / Design and engineering intelligence, in context.") }}</p>
    </div>

    <div class="contact__media reveal is-in" style="--d:.08s">
      <img src="../assets/img/contact-studio.jpg" :alt="copy('ICOCO META engineering studio')" />
    </div>
  </div>
</section>
</template>
