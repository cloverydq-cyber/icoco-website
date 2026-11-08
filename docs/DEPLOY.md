# ICOCO META 官网 — 结构与托管边界

官网首页保留地球首屏和能力卡片，产品、新闻、关于、联系、资源拆为独立 URL。完整路由与安装方法见根目录 README。

## 本地验证

在本项目根目录运行 `npm ci`、`node scripts/scope-marketing-css.mjs`、`npm run build`，再通过 `npm run preview` 查看构建结果。检查所有子路径直接打开、手机菜单、中英意切换、新闻筛选与外部账户入口。

`src/styles/source/` 是样式源文件；同名生成 CSS 由隔离脚本生成。`src/site/` 的首页效果在挂载后启动，并在离开首页时清理。新闻公开素材及来源记录在 `docs/NEWS_SOURCES.json`。

## 托管要求

Vite 使用 `base: '/'`，默认用于域名根路径；子目录托管需明确设置对应 base，并核对站内根路径链接。托管端必须支持 SPA history fallback，确保直接刷新 `/product`、`/news/:slug` 等路径可以返回 index.html。

静态产物为 `dist/`，本仓库不提交该目录。Git push、构建成功和本地预览均不代表已经正式上线。

主应用的真实登录入口由 `https://www.icoco.art/login` 提供；本独立官网不实现登录 API，也不提供可用于登录的本地账号。主域名的路由迁移完成前，由维护者另行确认线上入口状态。

## 维护边界

本项目仅维护公开官网。不得复制主应用的用户逻辑、鉴权、工作台、业务 API、数据库、客户资料或运行配置；不得修改服务器、nginx、systemd 或部署生产环境。正式上线沿用主项目的独立预览、确认与备份流程。
