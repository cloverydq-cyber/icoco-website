<script setup>
import { useMarketingLanguage } from '@/i18n/useMarketingLanguage'

const { copy } = useMarketingLanguage()
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

      <div class="contact__people reveal is-in" style="--d:.16s">
        <div class="contact__qr"><img src="../assets/img/contact-qr.png" :alt="copy(&quot;ICOCO META contact QR code&quot;)" /></div>
        <div class="contact__who">
          <a class="contact__name" href="mailto:enea.colombo@icona-designgroup.com">Enea Colombo</a>
          <span class="contact__role">{{ copy("Founder & CEO") }}</span>
          <a class="contact__line contact__line--mail" href="mailto:enea.colombo@icona-designgroup.com">enea.colombo@icona-designgroup.com</a>
          <span class="contact__line contact__line--loc">{{ copy("Turin · Shanghai · Los Angeles") }}</span>
          <a class="contact__line" href="https://www.icona-designgroup.com/" target="_blank" rel="noopener">www.icona-designgroup.com</a>
          <a class="contact__line" href="https://www.icoco.art/" target="_blank" rel="noopener">www.icoco.art</a>
        </div>
      </div>

      <p class="contact__note">{{ copy("ICOCO META / Design and engineering intelligence, in context.") }}</p>
    </div>

    <div class="contact__media reveal is-in" style="--d:.08s">
      <img src="../assets/img/contact-studio.jpg" :alt="copy(&quot;ICOCO META engineering studio&quot;)" />
    </div>
  </div>
</section>
</template>
