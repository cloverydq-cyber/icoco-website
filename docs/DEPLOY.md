# ICOCO META 官网 — 结构与发布

## 当前状态

`src/views/HomePage.vue` 承载已确认的 ICOCO META 落地页设计（首屏 WebGL 地球 + 三段式标题 + 能力卡片 + 产品 / 数据 / 新闻 / 关于 / 联系）。视觉与 `icoco-meta-site` 那份静态原型完全一致：标题 `132.916px / 400`、四个机构 logo 统一占位盒、Montserrat 自托管字体。

## 目录对照

| 内容 | 位置 | 说明 |
| --- | --- | --- |
| 首页 | `src/views/HomePage.vue` | 页面结构（原 `index.html` 的 body） |
| 路由 | `src/router/index.js` | 单页；`pathMatch` 兜底，`/index.html` 与子路径预览也能渲染 |
| 视觉系统 | `src/styles/website.css` | 原 `assets/css/style.css`，字体路径改为 `../assets/fonts/` |
| 地球 / 星空 WebGL | `src/site/space.js` | 原 `space.js`，导出 `initSpace()` |
| 滚动 / 交互 | `src/site/interactions.js` | 原 `main.js`，导出 `initInteractions()` |
| 地球贴图 | `src/site/textures.js` | 原 `earthtex.js`，内联 base64，导出并挂 `window.EARTH_TEX` |
| 图片 / 字体 | `src/assets/img`、`src/assets/fonts` | 由 Vite 打包并加 hash |

脚本在 `onMounted` 里启动，保证 DOM 已存在；这也是迁移时唯一需要改动的接线。

交接包里的 `src/styles/icoco-titanium.css`、`icoco-token-presets.css`、`IcocoButton.vue` 仍保留，但**没有**在 `main.js` 里导入：它们会给 `body` 等元素套用工作台的排版基线，导入后会改变已确认的落地页效果。新增子页面若要用 token，再按需引入。

## 本地开发与构建

```bash
npm ci
npm run dev      # http://127.0.0.1:5173/
npm run build    # 产物在 dist/
npm run preview  # 预览构建结果
```

Node 20.19+ / 22.12+。

## 发布

`dist/` 是纯静态产物，任何静态托管都能直接放：

- 根域名或子目录均可 —— `vite.config.js` 用 `base: './'`，所有资源都是相对路径；
- 单页站点，无需额外重写规则也能正常打开；若托管方支持 SPA fallback，仍建议把 404 指向 `index.html`。

改稿后重新发布的顺序：改 `HomePage.vue` / `website.css` / `src/site` → `npm run build` → 用新的 `dist/` 重新发布。

### 已发布实例

- 沙盒站点：https://104fd1c10db6448498fcbee61b390310.app.workbuddy.host
- 这个地址是「应用详情页」里的短链，对外分享必须使用详情页复制的完整链接（带访问参数）；短链直接打开会提示「链接不完整」。
- 入口：设置 - 数据管理 - 我发布的应用，可复制完整链接、重新发布或删除。

### 放到自有服务器（icoco.art 等）

```nginx
server {
  listen 443 ssl http2;
  server_name www.icoco.art;

  root /var/www/icoco-website;
  index index.html;

  # 单页站点：任何未知路径都回到 index.html
  location / {
    try_files $uri $uri/ /index.html;
  }

  # 带 hash 的静态资源可长缓存
  location /assets/ {
    expires 30d;
    add_header Cache-Control "public, immutable";
  }
}
```

把 `dist/` 的内容整体放到 `root` 指向的目录即可。若挂在子路径（如 `/new/`），把 `base` 保持 `./` 不用改，`try_files` 改成 `$uri $uri/ /new/index.html`。

## 体积说明

`dist/assets/index-*.js` 约 960KB（gzip 约 670KB），主要是内联的地球贴图（昼 / 夜 / 云 / 星系四张 base64）。这部分在首屏就要用，拆包收益有限；若后续要压首屏，可把四张贴图改为 `public/` 下的独立 webp，由 `space.js` 用 `fetch` 加载。
