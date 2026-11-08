<template>
  <div
    class="icoco-lang-toggle"
    :class="{ 'icoco-lang-toggle--open': isMenuOpen }"
  >
    <button
      class="icoco-lang-toggle__trigger"
      type="button"
      :title="triggerTitle"
      :aria-label="triggerTitle"
      :aria-expanded="isMenuOpen"
      @click="toggleMenu"
    >
      <IconSet name="globe" class="icoco-lang-toggle__icon" aria-hidden="true" />
      <span v-if="showBadge" class="icoco-lang-toggle__badge">{{ currentLabel }}</span>
    </button>

    <transition name="lang-menu-fade">
      <div
        v-if="isMenuOpen"
        class="icoco-lang-menu"
        role="menu"
        aria-label="Language menu"
      >
        <button
          v-for="item in languageItems"
          :key="item.code"
          class="icoco-lang-menu__item"
          :class="{ 'icoco-lang-menu__item--active': locale === item.code }"
          role="menuitemradio"
          :aria-checked="locale === item.code"
          @click="selectLang(item.code)"
        >
          <span class="icoco-lang-menu__label">{{ item.label }}</span>
          <span v-if="locale === item.code" class="icoco-lang-menu__check" aria-hidden="true">✓</span>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import IconSet from '@/components/IconSet.vue'

const props = defineProps({
  showBadge: { type: Boolean, default: true }
})

const emit = defineEmits(['toggled'])

const { locale, setLanguage } = useLanguage()

const isMenuOpen = ref(false)

const languageItems = [
  { code: 'zh', label: '中文（简体）' },
  { code: 'en', label: 'English (United States)' },
  { code: 'it', label: 'Italiano (Italia)' },
]

const currentLabel = computed(() => {
  const map = { zh: '中文', en: 'EN', it: 'IT' }
  return map[locale.value] || 'EN'
})

const triggerTitle = computed(() => {
  const map = {
    zh: '切换语言',
    en: 'Switch language',
    it: 'Cambia lingua'
  }
  return map[locale.value] || 'Switch language'
})

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

function selectLang(code) {
  setLanguage(code)
  emit('toggled', code)
  closeMenu()
}

function onClickOutside(e) {
  if (!isMenuOpen.value) return
  const el = document.querySelector('.icoco-lang-toggle')
  if (el && !el.contains(e.target)) {
    closeMenu()
  }
}

function onKeydown(e) {
  if (e.key === 'Escape' && isMenuOpen.value) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside, true)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside, true)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
/* ── Wrapper (positioning context) ─────────────────────────────── */
.icoco-lang-toggle {
  position: var(--ico-lang-toggle-position, fixed);
  top: var(--ico-lang-toggle-top, calc(env(safe-area-inset-top, 0px) + 28px));
  right: var(--ico-lang-toggle-right, calc(env(safe-area-inset-right, 0px) + 28px));
  bottom: var(--ico-lang-toggle-bottom, auto);
  left: var(--ico-lang-toggle-left, auto);
  z-index: var(--ico-lang-toggle-z);
}

/* ── Trigger button ────────────────────────────────────────────── */
.icoco-lang-toggle__trigger {
  min-width: var(--ico-lang-toggle-size, 36px);
  height: var(--ico-lang-toggle-size, 36px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease;
  background: transparent;
  border: none;
  padding: 0;
  color: var(--ico-text-secondary, rgba(216, 228, 245, 0.8));
  opacity: 0.85;
  -webkit-tap-highlight-color: transparent;
}

.icoco-lang-toggle__trigger:hover {
  transform: scale(1.05);
  opacity: 1;
}

.icoco-lang-toggle__trigger:active {
  transform: scale(0.98);
}

.icoco-lang-toggle__trigger:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.55);
  outline-offset: 4px;
  border-radius: 999px;
}

.icoco-lang-toggle__icon {
  width: var(--ico-lang-toggle-icon, 20px);
  height: var(--ico-lang-toggle-icon, 20px);
  flex: 0 0 auto;
  display: block;
}

.icoco-lang-toggle__badge {
  flex: 0 0 auto;
  font-size: var(--ico-text-xs, 11px);
  font-weight: var(--ico-font-medium, 500);
  line-height: 1.2;
  white-space: nowrap;
}

/* ── Dropdown menu ─────────────────────────────────────────────── */
.icoco-lang-menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 210px;
  padding: 4px;
  border-radius: 10px;
  background: var(--ico-panel, #262628);
  border: 1px solid var(--ico-border-soft, rgba(200, 200, 208, 0.08));
  box-shadow:
    0 10px 24px rgba(0, 0, 0, 0.22),
    0 1px 4px rgba(0, 0, 0, 0.14);
  z-index: 1000;
}

.icoco-lang-menu__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--ico-text-secondary, rgba(216, 214, 208, 0.68));
  font-size: 13px;
  font-weight: 400;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: color 120ms ease, background 120ms ease;
  line-height: 1.4;
}

.icoco-lang-menu__item:hover {
  color: var(--ico-text-main, rgba(245, 242, 235, 0.94));
  background: rgba(216, 214, 208, 0.045);
}

.icoco-lang-menu__item--active {
  color: var(--ico-text-main, rgba(245, 242, 235, 0.94));
  background: rgba(216, 214, 208, 0.06);
}

.icoco-lang-menu__item--active:hover {
  background: rgba(216, 214, 208, 0.08);
}

.icoco-lang-menu__label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icoco-lang-menu__check {
  flex-shrink: 0;
  margin-left: 10px;
  font-size: 12px;
  color: var(--ico-champagne, #B8B6B0);
  opacity: 0.7;
}

/* ── Menu transition ───────────────────────────────────────────── */
.lang-menu-fade-enter-active,
.lang-menu-fade-leave-active {
  transition: opacity 140ms ease, transform 140ms ease;
}
.lang-menu-fade-enter-from,
.lang-menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
