<template>
  <component :is="embedded ? 'div' : 'footer'" class="global-footer" :class="{ 'global-footer--embedded': embedded }">
    <div class="footer-content">
      <span class="footer-copyright">© 2026 {{ t.companyName }} {{ t.allRightsReserved }}</span>
      <span class="separator" aria-hidden="true"></span>
      <span class="footer-filings">
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">沪ICP备2022035103号-3</a>
        <span class="footer-dot" aria-hidden="true">·</span>
        <a href="https://beian.cac.gov.cn/" target="_blank" rel="noopener noreferrer">网信算备310115462912901260017号</a>
      </span>
    </div>
  </component>
</template>

<script setup>
import { useLanguage } from '@/composables/useLanguage'
defineProps({ embedded: { type: Boolean, default: false } })
const { t } = useLanguage()
</script>

<style scoped>
.global-footer {
  width: 100%;
  min-height: 40px;
  padding: 8px 24px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.018), transparent),
    var(--ico-footer-surface, rgba(20, 23, 48, 0.66));
  backdrop-filter: blur(var(--ico-glass-blur, 10px)) saturate(var(--ico-glass-saturation, 100%));
  -webkit-backdrop-filter: blur(var(--ico-glass-blur, 10px)) saturate(var(--ico-glass-saturation, 100%));
  border-top: 1px solid var(--ico-border-faint, rgba(216, 214, 208, 0.055));
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: var(--ico-text-xs, 11px);
  line-height: 1.35;
  color: var(--ico-text-muted, rgba(216, 214, 208, 0.42));
  font-family: var(--ico-font-sans);
  white-space: nowrap;
}

.footer-content a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-content a:hover {
  color: var(--ico-text-secondary, rgba(216, 214, 208, 0.68));
}

.footer-filings {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.separator {
  width: 1px;
  height: 12px;
  background: var(--ico-border-soft, rgba(216, 214, 208, 0.10));
}

.footer-dot {
  color: var(--ico-text-muted, rgba(216, 214, 208, 0.32));
}

.global-footer--embedded {
  position: static;
  min-height: 0;
  padding: 0;
  background: transparent;
  border-top: 0;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.global-footer--embedded .footer-content,
.global-footer--embedded .footer-filings {
  flex-wrap: wrap;
  white-space: normal;
}

@media screen and (max-width: 768px) {
  .global-footer {
    padding: 7px 14px;
  }

  .footer-content {
    gap: 6px 8px;
    white-space: normal;
    flex-wrap: wrap;
  }

  .footer-filings {
    gap: 6px;
  }
}
</style>
