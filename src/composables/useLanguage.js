import { ref, computed, watch } from 'vue'
import legal from '@/i18n/legal'

// Public-only adapter matching the application's global language contract.
// No authentication, user data or business API is included in this repository.
export const SUPPORTED_LOCALES = ['zh', 'en', 'it']
const normalizeLanguage = language => SUPPORTED_LOCALES.includes(language) ? language : 'en'
const LANGUAGE_PREFERENCE_KEY = 'icoco.languagePreference.v1'
const readLanguagePreference = () => localStorage.getItem(LANGUAGE_PREFERENCE_KEY) === 'explicit'
  ? normalizeLanguage(localStorage.getItem('language')) : 'en'
const currentLanguage = ref(readLanguagePreference())
localStorage.setItem('language', currentLanguage.value)
watch(currentLanguage, language => {
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : language
}, { immediate: true })
window.addEventListener('storage', event => {
  if (event.storageArea === localStorage && (event.key === 'language' || event.key === LANGUAGE_PREFERENCE_KEY)) {
    currentLanguage.value = readLanguagePreference()
  }
})
export function useLanguage() {
  const locale = computed(() => currentLanguage.value)
  const setLanguage = language => {
    currentLanguage.value = normalizeLanguage(language)
    localStorage.setItem(LANGUAGE_PREFERENCE_KEY, 'explicit')
    localStorage.setItem('language', currentLanguage.value)
  }
  return {
    locale,
    t: computed(() => ({ ...legal.en, ...legal[locale.value], locale: locale.value })),
    setLanguage,
    toggleLanguage: () => setLanguage(SUPPORTED_LOCALES[(SUPPORTED_LOCALES.indexOf(locale.value) + 1) % SUPPORTED_LOCALES.length]),
  }
}
