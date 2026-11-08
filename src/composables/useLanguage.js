import { ref, computed, watch } from 'vue'
import legal from '@/i18n/legal'

// Public-only adapter matching the application's global language contract.
// No authentication, user data or business API is included in this repository.
export const SUPPORTED_LOCALES = ['zh', 'en', 'it']
const normalizeLanguage = language => SUPPORTED_LOCALES.includes(language) ? language : 'en'
const currentLanguage = ref(normalizeLanguage(localStorage.getItem('language')))
watch(currentLanguage, language => {
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : language
}, { immediate: true })
window.addEventListener('storage', event => {
  if (event.storageArea === localStorage && event.key === 'language') {
    currentLanguage.value = normalizeLanguage(event.newValue)
  }
})
export function useLanguage() {
  const locale = computed(() => currentLanguage.value)
  const setLanguage = language => {
    currentLanguage.value = normalizeLanguage(language)
    localStorage.setItem('language', currentLanguage.value)
  }
  return {
    locale,
    t: computed(() => ({ ...legal.en, ...legal[locale.value], locale: locale.value })),
    setLanguage,
    toggleLanguage: () => setLanguage(SUPPORTED_LOCALES[(SUPPORTED_LOCALES.indexOf(locale.value) + 1) % SUPPORTED_LOCALES.length]),
  }
}
