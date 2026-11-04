<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="isDisabled"
    :title="title"
    :aria-label="finalAriaLabel || undefined"
    :aria-pressed="pressed || undefined"
    @click="handleClick"
  >
    <span v-if="loading" class="ico-button__spinner" aria-hidden="true" />
    <template v-if="!loading">
      <IconSet v-if="showIcon" :name="finalIcon" class="ico-button__icon" aria-hidden="true" />
      <span v-if="showText" class="ico-button__label">
        <slot>{{ label }}</slot>
      </span>
    </template>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import IconSet from '@/components/IconSet.vue'

const props = defineProps({
  // --- Appearance ---
  variant: {
    type: String,
    default: 'secondary',
    validator: (v) => ['primary', 'secondary', 'ghost', 'danger', 'link'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg', 'icon'].includes(v),
  },
  icon:         { type: String,  default: '' },
  label:        { type: String,  default: '' },
  labelMode:    {
    type: String,
    default: 'auto',
    validator: (v) => ['auto', 'icon-only', 'icon-label', 'text-only'].includes(v),
  },
  iconPosition: {
    type: String,
    default: 'before',
    validator: (v) => ['before', 'after'].includes(v),
  },

  // --- State ---
  disabled: { type: Boolean, default: false },
  loading:  { type: Boolean, default: false },
  active:   { type: Boolean, default: false },
  pressed:  { type: Boolean, default: false },

  // --- HTML ---
  type:      { type: String, default: 'button' },
  title:     { type: String, default: '' },
  ariaLabel: { type: String, default: '' },
})

const emit = defineEmits(['click'])

const isDisabled = computed(() => props.disabled || props.loading)

/* ── Size → default labelMode mapping ── */
const SIZE_TO_MODE = {
  icon: 'icon-only',
  sm:   'icon-only',
  md:   'icon-label',
  lg:   'text-only',
}

const resolvedMode = computed(() => {
  if (props.labelMode !== 'auto') return props.labelMode
  return SIZE_TO_MODE[props.size] || 'icon-label'
})

const showIcon = computed(() => {
  if (!props.icon) return false
  const mode = resolvedMode.value
  return mode === 'icon-only' || mode === 'icon-label'
})

const showText = computed(() => {
  const mode = resolvedMode.value
  return mode === 'text-only' || mode === 'icon-label'
})

const finalIcon = computed(() => props.icon || '')

const finalAriaLabel = computed(() => {
  if (props.ariaLabel) return props.ariaLabel
  if (resolvedMode.value === 'icon-only') return props.title || props.label || ''
  return ''
})

/* ── Class generation ── */
const buttonClasses = computed(() => {
  const c = ['ico-button']
  c.push(`ico-button--${props.variant}`)
  c.push(`ico-button--${props.size}`)
  c.push(`ico-button--${resolvedMode.value}`)
  if (props.iconPosition === 'after') c.push('ico-button--icon-after')
  if (props.active)  c.push('ico-button--active')
  if (props.pressed) c.push('ico-button--pressed')
  if (props.loading) c.push('ico-button--loading')
  if (isDisabled.value) c.push('ico-button--disabled')
  return c
})

function handleClick(event) {
  if (isDisabled.value) return
  emit('click', event)
}
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════════
   ICOCO BUTTON — single source of truth for button styling
   ═══════════════════════════════════════════════════════════ */

.ico-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--ico-button-gap, 6px);
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  font-family: var(--ico-font-sans, inherit);
  font-weight: var(--ico-button-font-weight, var(--ico-font-medium, 500));
  letter-spacing: var(--ico-button-tracking, var(--ico-tracking-tight, 0.01em));
  line-height: 1;
  white-space: nowrap;
  box-shadow: none;
  transition:
    background 0.16s ease,
    border-color 0.16s ease,
    color 0.16s ease;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  /* ── Overridable surface tokens (default: dark backdrop) ── */
  --ib-bg-primary: var(--ico-button-bg-primary, rgba(0, 0, 0, 0.50));
  --ib-border-primary: var(--ico-button-border-primary, rgba(184, 182, 176, 0.55));
  --ib-bg-primary-hover: var(--ico-button-bg-primary-hover, rgba(0, 0, 0, 0.65));
  --ib-border-primary-hover: var(--ico-button-border-primary-hover, rgba(184, 182, 176, 0.70));

  --ib-bg-secondary: var(--ico-button-bg-secondary, rgba(0, 0, 0, 0.35));
  --ib-border-secondary: var(--ico-button-border-secondary, rgba(255, 255, 255, 0.28));
  --ib-bg-secondary-hover: var(--ico-button-bg-secondary-hover, rgba(0, 0, 0, 0.50));
  --ib-border-secondary-hover: var(--ico-button-border-secondary-hover, rgba(255, 255, 255, 0.42));

  --ib-bg-ghost: var(--ico-button-bg-ghost, rgba(0, 0, 0, 0.30));
  --ib-border-ghost: var(--ico-button-border-ghost, rgba(255, 255, 255, 0.22));
  --ib-bg-ghost-hover: var(--ico-button-bg-ghost-hover, rgba(0, 0, 0, 0.45));
  --ib-border-ghost-hover: var(--ico-button-border-ghost-hover, rgba(255, 255, 255, 0.36));

  --ib-bg-danger: var(--ico-button-bg-danger, rgba(0, 0, 0, 0.35));
  --ib-border-danger: var(--ico-button-border-danger, rgba(200, 110, 110, 0.50));
  --ib-bg-danger-hover: var(--ico-button-bg-danger-hover, rgba(0, 0, 0, 0.50));
  --ib-border-danger-hover: var(--ico-button-border-danger-hover, rgba(200, 110, 110, 0.68));

  --ib-bg-active: var(--ico-button-bg-active, rgba(0, 0, 0, 0.55));
  --ib-border-active: var(--ico-button-border-active, rgba(184, 182, 176, 0.55));
  --ib-bg-pressed: var(--ico-button-bg-pressed, rgba(0, 0, 0, 0.60));
  --ib-border-pressed: var(--ico-button-border-pressed, rgba(255, 255, 255, 0.36));
}

.ico-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 1px var(--ico-border, rgba(216, 214, 208, 0.16)),
              0 0 0 4px var(--ico-accent-champagne-8, rgba(184, 182, 176, 0.08));
}

/* ── Sizes ─────────────────────────────────────────────── */
.ico-button--sm {
  padding: var(--ico-button-padding-sm, 4px 8px);
  font-size: var(--ico-button-text-sm, var(--ico-text-xs, 11px));
}
.ico-button--md {
  padding: var(--ico-button-padding-md, 5px 10px);
  font-size: var(--ico-button-text-md, var(--ico-text-xs, 11px));
  height: var(--ico-button-height-md, 28px);
  min-height: var(--ico-button-height-md, 28px);
}
.ico-button--lg {
  padding: var(--ico-button-padding-lg, 8px 16px);
  font-size: var(--ico-button-text-lg, var(--ico-text-sm, 12px));
  height: var(--ico-button-height-lg, 36px);
  min-height: var(--ico-button-height-lg, 36px);
}
.ico-button--icon {
  padding: var(--ico-button-padding-icon, 5px);
  font-size: var(--ico-button-text-icon, var(--ico-text-base, 14px));
}

/* ── Label modes ───────────────────────────────────────── */
.ico-button--icon-only  { gap: 0; }
.ico-button--icon-only.ico-button--sm   { padding: 4px; }
.ico-button--icon-only.ico-button--md   { padding: 5px; }
.ico-button--icon-only.ico-button--lg   { padding: 8px; }

.ico-button--text-only  { gap: 0; }

.ico-button--icon-after { flex-direction: row-reverse; }

.ico-button__icon {
  width: var(--ico-button-icon-size, 14px);
  height: var(--ico-button-icon-size, 14px);
  flex-shrink: 0;
}

.ico-button__label {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Variant: primary ──────────────────────────────────── */
.ico-button--primary {
  background: var(--ib-bg-primary);
  border: 1px solid var(--ib-border-primary);
  color: var(--ico-text-main, #f6f4ee);
  font-weight: var(--ico-font-semibold, 600);
}
.ico-button--primary:hover:not(:disabled) {
  background: var(--ib-bg-primary-hover);
  border-color: var(--ib-border-primary-hover);
  color: var(--ico-text-main, #f6f4ee);
}

/* ── Variant: secondary ────────────────────────────────── */
.ico-button--secondary {
  background: var(--ib-bg-secondary);
  border: 1px solid var(--ib-border-secondary);
  color: var(--ico-text-secondary, rgba(216, 214, 208, 0.68));
}
.ico-button--secondary:hover:not(:disabled) {
  background: var(--ib-bg-secondary-hover);
  border-color: var(--ib-border-secondary-hover);
  color: var(--ico-text-main, #f6f4ee);
}

/* ── Variant: ghost ────────────────────────────────────── */
.ico-button--ghost {
  background: var(--ib-bg-ghost);
  border: 1px solid var(--ib-border-ghost);
  color: var(--ico-text-secondary, rgba(216, 214, 208, 0.68));
}
.ico-button--ghost:hover:not(:disabled) {
  background: var(--ib-bg-ghost-hover);
  border-color: var(--ib-border-ghost-hover);
  color: var(--ico-text-main, #f6f4ee);
}

/* ── Variant: danger ───────────────────────────────────── */
.ico-button--danger {
  background: var(--ib-bg-danger);
  border: 1px solid var(--ib-border-danger);
  color: var(--ico-red, #c86e6e);
}
.ico-button--danger:hover:not(:disabled) {
  background: var(--ib-bg-danger-hover);
  border-color: var(--ib-border-danger-hover);
  color: var(--ico-red, #c86e6e);
}

/* ── Variant: link ─────────────────────────────────────── */
.ico-button--link {
  background: transparent;
  border: none;
  color: var(--ico-accent-champagne, #d8d0bd);
  padding: 0;
  text-decoration: underline;
  border-radius: 0;
}
.ico-button--link:hover:not(:disabled) {
  color: var(--ico-text-main, #f6f4ee);
}

/* ── Active / pressed ──────────────────────────────────── */
.ico-button--active {
  background: var(--ib-bg-active);
  border-color: var(--ib-border-active);
  color: var(--ico-text-main, #f6f4ee);
}
.ico-button--pressed {
  background: var(--ib-bg-pressed);
  border-color: var(--ib-border-pressed);
  color: var(--ico-text-main, #f6f4ee);
}

/* ── Disabled ──────────────────────────────────────────── */
.ico-button--disabled {
  opacity: 0.36;
  cursor: not-allowed;
  pointer-events: none;
}

/* ── Loading ───────────────────────────────────────────── */
.ico-button--loading {
  cursor: wait;
  opacity: 0.50;
}

.ico-button__spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: ico-spin 0.6s linear infinite;
}

@keyframes ico-spin {
  to { transform: rotate(360deg); }
}
</style>
