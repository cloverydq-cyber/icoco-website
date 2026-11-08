# ICOCO META 独立官网

Vue 3 + Vite 的公开官网项目，保持已确认的深色 UI、Montserrat 字体、地球首屏和能力卡片。默认英文，支持中文、英文、意大利语；页面、新闻、指南及页脚随语言切换，选择会保存在浏览器中。

旧版未标记的语言记录在首次加载本版时重置为英文；通过切换按钮主动选择后，写入 `icoco.languagePreference.v1=explicit`，此后刷新及新标签页继续使用该选择。

此仓库只包含官网前端、公开图片、字体、UI token 与通用展示组件，不包含原工作台、鉴权实现、业务 API、后端、数据库或账号凭据。登录按钮跳转到主应用的 `https://www.icoco.art/login`；本地启动本项目不会启动登录服务。

## 安装与启动

安装 Git 和 Node.js 20.19+（20.x）或 22.12+。私有仓库需先接受协作邀请，并使用自己的 GitHub 账号认证。

【在哪台机器执行】
开发者自己的 Mac、Windows 或 Linux 电脑，打开准备存放项目的目录。

【复制哪一段完整命令】
```bash
git clone https://github.com/cloverydq-cyber/icoco-website.git
cd icoco-website
node --version
npm ci
npm run dev
```

【预期看到什么结果】
终端显示本地预览地址，默认 http://127.0.0.1:5173/；端口被占用时以终端输出为准。无需 .env、后端、数据库或线上账号，按 Ctrl+C 停止。

## 页面结构

| 路径 | 内容 |
| --- | --- |
| `/` | 地球首屏、能力卡片、快捷链接及全局备案页脚 |
| `/product` | 原长页中的产品、工作流、工程问题及证据区块 |
| `/news`、`/news/:slug` | 支持分类的新闻列表与来源可追溯的详情 |
| `/about` | 原 About 区块；`/company` 重定向到这里 |
| `/contact` | 原 Contact 区块与项目联系入口 |
| `/resources`、`/resources/:slug` | 指南与 FAQ |
| `/signup` | 注册说明，继续前往主应用创建账号 |
| `/careers` | 人才联系；未虚构招聘岗位 |

登录、隐私政策、用户协议链接均指向主应用。更改账户入口时，统一检查 `src/data/site.js` 和页头、页脚，避免链接回本官网形成循环。

## 代码与维护

- `src/views/`：官网首页及子页面。
- `src/components/site/SiteHeader.vue`、`SiteFooter.vue`：所有官网页面共用的页头、页脚。
- `src/components/LanguageToggleButton.vue`、`GlobalFooter.vue`、`IconSet.vue`：与主应用同步的全局展示组件。版权、ICP备案、网信算法备案只在 GlobalFooter 维护。
- `src/composables/useLanguage.js`：独立官网使用的轻量语言适配层，不含用户或鉴权逻辑；语言键和三个语言代码与主应用一致。
- `src/i18n/messages.json`：官网中文和意大利语文案，英文源文案作为默认值；品牌、原始新闻标题与海报保留原文。
- `src/data/site.js`：新闻、指南和 FAQ；`docs/NEWS_SOURCES.json`：新闻原始来源、发布日期和素材记录。
- `src/site/`：地球 WebGL 与首页交互，组件卸载时清理动画和事件。
- `src/styles/source/`：原官网样式及新增页面样式的可编辑版本。生成 CSS 将选择器限定在 `.icoco-marketing` 内；字体和动画名称也会隔离。
- `src/styles/standalone.css`：独立官网的基础文档边界，不使用原工作台的全屏/禁止滚动样式。
- `src/assets/`：公开官网图片与自托管 Montserrat 字体，字体许可信息见字体目录中的 OFL.txt。

交接用的 `src/styles/icoco-titanium.css`、`icoco-token-presets.css`、`src/components/base/IcocoButton.vue` 和 UI token 文档继续保留。保持现有官网设计，不将工作台的全局样式直接叠加到官网。

## 构建与本地预览

【在哪台机器执行】
自己的电脑终端，进入本项目根目录。

【复制哪一段完整命令】
```bash
node scripts/scope-marketing-css.mjs
npm run build
npm run preview
```

【预期看到什么结果】
构建生成 `dist/` 并显示预览地址。编辑 `src/styles/source/` 后应先生成 CSS，不要直接编辑生成文件。构建和预览不会发布网站，dist/ 不提交 Git。

检查桌面、手机、三种语言、子页面直接打开、新闻筛选、语言切换及外部账户链接。构建成功不代表主应用登录、模型生成等业务已验证。

## Git 协作

官网使用独立历史，默认分支为 main。开始新修改前先确认工作区没有未提交内容。

【在哪台机器执行】
开发者自己的 icoco-website 克隆目录。

【复制哪一段完整命令】
```bash
git status --short
git switch main
git pull --ff-only origin main
git switch -c feature/website-update
```

【预期看到什么结果】
获取最新 main 并进入自己的新分支。分支名已存在时使用新的名称；有未提交修改或冲突时先保留和处理，不使用 reset --hard、clean -fd 或强制推送。

完成后先构建、检查页面，再查看 `git status --short` 和 `git diff`；按明确路径提交源码和授权素材，推送自己的分支并创建 PR。不要提交 node_modules、dist、密钥、日志或客户资料。

## 与 icoco.art 的关系

主仓库 `icoco.art` 包含官网整合版及原业务应用；这里仅提供可独立运行的公开官网。两边同步官网页面、文案、素材和展示组件，保留各自的入口与语言适配层，不向本仓库复制主应用源码或历史。

Git 提交、推送均不等于上线。SPA history 子路径刷新需要托管端支持 fallback；部署由维护者另行执行，本项目不修改服务器、nginx 或业务服务。更多信息见 `docs/DEPLOY.md` 和 `AGENTS.md`。
