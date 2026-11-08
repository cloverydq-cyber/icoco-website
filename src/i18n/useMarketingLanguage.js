import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import messages from './messages.json'
import { news as sourceNews, guides as sourceGuides, faqs as sourceFaqs } from '../data/site'

// Public pages use the application's global locale and persistence.
export function useMarketingLanguage() {
  const { locale } = useLanguage()
  const copy = text => messages[text]?.[locale.value] || text
  const unchanged = new Set(['slug', 'source', 'originalTitle', 'image', 'date', 'category'])
  function localize(value, key = '') {
    if (unchanged.has(key)) return value
    if (typeof value === 'string') return copy(value)
    if (Array.isArray(value)) return value.map(item => localize(item))
    if (value && typeof value === 'object') {
      return Object.fromEntries(Object.entries(value).map(([field, item]) => [field, localize(item, field)]))
    }
    return value
  }
  return {
    locale,
    copy,
    news: computed(() => sourceNews.map(item => ({ ...localize(item), categoryLabel: copy(item.category) }))),
    guides: computed(() => localize(sourceGuides)),
    faqs: computed(() => localize(sourceFaqs)),
  }
}
