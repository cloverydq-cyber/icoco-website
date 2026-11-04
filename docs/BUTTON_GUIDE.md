# ICOCO Button Component Guide

## Two Components, One System

| Component | Purpose | Knows about actions? |
|-----------|---------|---------------------|
| `IcocoButton` | Pure visual button — variant, size, icon, label, states | No |
| `IcocoActionButton` | Business action button — wraps IcocoButton + Action Registry | Yes |

Use `IcocoButton` for non-action buttons (close, cancel, navigation).  
Use `IcocoActionButton` for any button that triggers a registered business action.

---

## Size → Visual Form

The core design rule: **the same action can appear in three visual forms, all sharing one `actionId`.**

| size | Default form | Shows | Typical use |
|------|-------------|-------|-------------|
| `sm` / `icon` | `icon-only` | SVG icon only, no text | Toolbar, table row, Timeline action |
| `md` | `icon-label` | SVG icon + text label | Standard buttons, pager |
| `lg` | `text-only` | Text label only, no icon | Empty-state CTA, form submit |

Override with `label-mode` prop when needed:

```html
<!-- Force icon+label on a small button -->
<IcocoButton size="sm" icon="edit" label="Edit" label-mode="icon-label" />
```

---

## Icon

Icons always come from `IconSet.vue`. Never use emoji, character symbols, or inline SVG.

```html
<!-- IcocoButton with icon -->
<IcocoButton icon="download" label="Download" />

<!-- IcocoActionButton auto-renders action.icon from registry -->
<IcocoActionButton action-id="generate_three_view" size="md" />
```

Icon position defaults to `before` (left of text). Use `icon-position="after"` to flip.

---

## Variant

| variant | Use case |
|---------|----------|
| `primary` | Main CTA — generate, submit, save |
| `secondary` | Default — pager, refresh, filter |
| `ghost` | Subtle — close, cancel, secondary actions |
| `danger` | Destructive — delete, remove |
| `link` | Inline text action |

---

## States

All states are handled internally via CSS classes. Do not add external state styling.

| State | Prop | Visual |
|-------|------|--------|
| Hover | (CSS `:hover`) | Background lift, border enhance, text → ivory |
| Active / Pressed | `active` / `pressed` | `translateY(1px)`, subtle background |
| Disabled | `disabled` | `opacity: 0.38`, `pointer-events: none` |
| Loading | `loading` | Spinner replaces content, `cursor: wait` |
| Focus | (CSS `:focus-visible`) | Champagne outline, no glow |

---

## Action ID Rules

Every business button **must** have a registered `actionId` in `actionRegistry.js`.

1. Register the action contract first (id, category, status, requiredContext, handlerKey, etc.)
2. Use `<IcocoActionButton action-id="your_action_id" />` in templates
3. The action registry provides: icon, label, variant, disabledReason, canRun
4. Never write a separate `@click` handler that bypasses `runAction`

### Example: upload_reference_image in three forms

```html
<!-- Toolbar: icon-only -->
<IcocoActionButton action-id="upload_reference_image" size="icon" />

<!-- Input area: icon + label -->
<IcocoActionButton action-id="upload_reference_image" size="md" />

<!-- Empty state: text-only -->
<IcocoActionButton action-id="upload_reference_image" size="lg" />
```

All three render differently but share the same `actionId`, `handler`, `canRun`, and `disabledReason`.

---

## Do NOT

- Do not create new `.btn` / `.submit-btn` / `.close-btn` scoped CSS
- Do not use emoji or character symbols as button icons
- Do not write button hover/border/radius CSS outside IcocoButton.vue
- Do not bypass `runAction` for registered business actions
- Do not use `!important` to override button styles

---

## Adding a New Button

1. **Is it a business action?** → Register in `actionRegistry.js`, use `IcocoActionButton`
2. **Is it a UI-only button?** → Use `IcocoButton` directly with `variant` + `size` + `icon`
3. **Need a new icon?** → Add to `IconSet.vue` with consistent stroke style (1.7, round caps)
4. **Need a new variant?** → Discuss with design system owner before adding

---

## Primary Action Naming Map

These five action contracts were added in Batch 3A-1 to unify the "send / generate / submit" semantic surface. All are `status: PLANNED` — no page buttons have been migrated yet.

| actionId | Semantic | Description |
|----------|----------|-------------|
| `send_message` | Chat send | Chat 输入框发送当前 prompt / 开始当前设计生成请求 |
| `generate_rendering` | Generate | 根据当前 brief / prompt 生成效果图 |
| `submit_inline_edit` | Inline submit | Timeline 内联编辑后提交修改的 prompt 文本 |
| `submit_feedback` | Feedback submit | 反馈弹窗提交用户反馈 |
| `send_verification_code` | Auth code | 登录 / 绑定手机号验证码发送，属于 auth 域，不属于设计工作流 |

### Important notes

- These actions are **registry contracts only**. No page buttons have been migrated in this batch.
- All five are `PLANNED`. Do not set any to `ACTIVE` until the corresponding page component is wired to `IcocoActionButton`.
- `send_verification_code` is temporarily under `ADMIN` category. When an `AUTH` category is added, move it there.
- `generate_rendering` icon is `sendUp` (same as `send_message`). If a dedicated `spark` icon is added later, consider switching `generate_rendering` to `spark` for visual differentiation.

### Recommended migration order

1. `WorkspaceInputPanel.vue` — send key → `send_message`
2. `ProjectInitPanel.vue` — Generate button → `generate_rendering`
3. `WorkspaceTimeline.vue` — inline send → `submit_inline_edit`
4. Chat3D modal submit buttons → `submit_feedback`
5. `Login.vue` / `PhoneBindModal.vue` — auth buttons → `send_verification_code`
