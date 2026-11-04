---
name: icoco-ui-tokens
description: ICOCO/icoco.art frontend UI token audit and alignment workflow. Use for new frontend pages/features, UI cleanup, IcocoButton migration, typography/color/spacing token alignment, or any request to check or fix UI token consistency.
---

# ICOCO UI Tokens

Use this skill for `/Users/cloveryuan/icoco_migration/icoco.art` frontend work.

## Operating Rules

- Inspect first with read-only commands; do not guess file locations.
- Keep changes frontend-only unless the user explicitly asks otherwise.
- Prefer small batches by module/file. Do not mechanically rewrite the whole site in one pass.
- Back up target files outside the repo before editing.
- Do not use `!important`.
- Do not change emit names, handler functions, disabled/loading conditions, or business logic.
- Do not commit, push, deploy, or touch 124/47/43 unless explicitly requested.

## Token Rules

- Use `IcocoButton` from `frontend/src/components/base/IcocoButton.vue` for normal command buttons.
- Keep native `<button>` for image cards, thumbnail cards, upload/drop cards, and complex absolute-positioned card layouts.
- Use typography tokens with fallbacks:
  - `font-size: var(--ico-text-xs, 11px)`
  - `font-weight: var(--ico-font-semibold, 600)`
  - `letter-spacing: var(--ico-tracking-wide, 0.08em)`
- Use `--ib-*` overrides only on ancestors when context-specific button surfaces are needed.
- Never override `IcocoButton` border-radius; its default is `4px`.
- For scoped classes on `IcocoButton`, keep only layout constraints: width, height, min-width, min-height, flex, gap, margin, padding, position, z-index, and rare font-size sizing.

## Audit

Run the bundled script from the repo root:

```bash
.codex/skills/icoco-ui-tokens/scripts/audit-ui-tokens.sh
```

For a focused path:

```bash
.codex/skills/icoco-ui-tokens/scripts/audit-ui-tokens.sh frontend/src/views/EngineeringReview.vue frontend/src/admin
```

The script reports:

- native `<button>`
- hardcoded `font-size`, `font-weight`, `letter-spacing`
- `!important`
- `IcocoButton` usage
- `--ib-*` overrides

## Fix Order

1. Replace hardcoded typography with `--ico-*` tokens.
2. Migrate normal command buttons to `IcocoButton`.
3. Remove visual CSS from migrated button classes.
4. Keep layout CSS only for migrated button classes.
5. Keep card-like native buttons native.
6. Run `cd frontend && npm run build`.

## Command Response Format

When giving commands to the user, group them by:

- `【在哪台机器执行】`
- `【复制哪一段完整命令】`
- `【预期看到什么结果】`
