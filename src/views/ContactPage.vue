<script setup>
import { reactive, ref } from 'vue'
import { useMarketingLanguage } from '@/i18n/useMarketingLanguage'

const { copy } = useMarketingLanguage()

// 表单提交到 FormSubmit（无需后端）：首次提交后收件箱会收到一封激活邮件，点一次即可生效
const ENDPOINT = 'https://formsubmit.co/ajax/enea.colombo@icona-designgroup.com'

const form = reactive({ name: '', phone: '', email: '', notes: '' })
const state = ref('idle') // idle | sending | done | error

function valid() {
  return form.name.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
}

async function submit() {
  if (!valid()) {
    state.value = 'error'
    return
  }
  state.value = 'sending'
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: 'ICOCO META — demo request',
        _template: 'table',
        Name: form.name.trim(),
        Phone: form.phone.trim(),
        Email: form.email.trim(),
        Notes: form.notes.trim(),
        Source: window.location.href,
      }),
    })
    if (!res.ok) throw new Error('failed')
    state.value = 'done'
  } catch (e) {
    state.value = 'error'
  }
}

function reset() {
  form.name = ''
  form.phone = ''
  form.email = ''
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
            <span class="cf-label">{{ copy("Phone") }}</span>
            <input v-model="form.phone" type="tel" name="phone" autocomplete="tel" :placeholder="copy('Country code + number')" />
          </label>
        </div>

        <label class="cf-field">
          <span class="cf-label">{{ copy("Email") }}</span>
          <input v-model="form.email" type="email" name="email" autocomplete="email" placeholder="name@company.com" />
        </label>

        <label class="cf-field">
          <span class="cf-label">{{ copy("Notes") }}</span>
          <textarea v-model="form.notes" name="notes" rows="2" :placeholder="copy('Workflow, constraints, expected outputs')"></textarea>
        </label>

        <div class="cf-foot">
          <div class="cf-action">
            <button class="btn btn--primary cf-submit" type="submit" :disabled="state === 'sending'">
              <span>{{ state === 'sending' ? copy("Sending…") : copy("Send request") }}</span>
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8.5 3.5L13 8l-4.5 4.5" /></svg>
            </button>
            <p class="cf-msg" :class="{'is-error': state === 'error'}" aria-live="polite">
              <template v-if="state === 'error'">{{ copy("Add your name and a valid email, then send again.") }}</template>
              <template v-else>{{ copy("Or write directly to") }} <a href="mailto:enea.colombo@icona-designgroup.com">enea.colombo@icona-designgroup.com</a></template>
            </p>
          </div>
          <div class="contact__qr contact__qr--mini" :title="copy('Scan to chat on WhatsApp')">
            <img src="../assets/img/contact-qr.png" :alt="copy('ICOCO META contact QR code')" />
          </div>
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
