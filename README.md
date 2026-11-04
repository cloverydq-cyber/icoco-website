# ICOCO 独立官网交接项目

此目录可以单独作为 Git 仓库根目录，不依赖原 icoco.art 仓库。
这是可运行的开发起点，不是已完成的官网设计。只包含官网所需框架、UI token、按钮及图标组件和现有 Logo；不包含工作台、后端、客户素材或任何登录凭据。

## 安装与启动（Mac / Windows / Linux）

先安装 Git 和 Node.js。支持 Node.js 20.19+（20.x）或 22.12+；建议使用 Node.js 22 LTS。npm 随 Node.js 安装。
本仓库为私有仓库：仓库所有者需要先在 GitHub Settings → Collaborators 邀请开发者，开发者接受邀请后才能克隆。请使用你自己的 GitHub 账号认证，不要共享账号或密钥。

【在哪台机器执行】
开发者自己的电脑终端（Windows 可使用 PowerShell）。选择准备存放项目的目录，然后执行。

【复制哪一段完整命令】
```bash
git clone https://github.com/cloverydq-cyber/icoco-website.git
cd icoco-website
node --version
npm --version
npm ci
npm run dev
```

【预期看到什么结果】
终端显示 Vite 启动地址。打开 http://localhost:5173/ 可看到 ICOCO 官网开发起点，Logo 和按钮样式正常。端口被占用时以终端输出为准。按 Ctrl+C 停止服务。
不需要 .env、业务后端、数据库或线上工作台账号；安装依赖时需要能访问 npm registry。
如果 GitHub 报 Repository not found，请检查是否已接受仓库邀请，以及当前 Git 使用的账号是否正确。HTTPS 认证使用 GitHub 支持的凭据管理方式，不能直接用账户密码；已配置 SSH 的开发者也可使用 `git@github.com:cloverydq-cyber/icoco-website.git`。

## 构建与本地预览

【在哪台机器执行】
自己的电脑终端，进入克隆得到的 icoco-website 项目根目录。

【复制哪一段完整命令】
```bash
npm run build
npm run preview
```

【预期看到什么结果】
构建成功，产物生成到 dist/，终端显示本地预览地址。dist/ 不提交 Git，构建和预览都不会发布到线上。

## 开发目录

- `src/views/`：官网首页和新增子页面。
- `src/router/index.js`：官网路由；新增子页面时在此注册。
- `src/components/`：复用组件。
- `src/styles/website.css`：官网基础样式。
- `src/assets/brand/`：已有品牌 Logo；新素材须确认使用授权。
- `AGENTS.md`：修改边界及验证要求。

## UI token
基础文件 src/styles/icoco-titanium.css，覆盖文件 src/styles/icoco-token-presets.css，当前选择 src/config/uiTokenPreset.json（daccord-glass）。导入顺序见 src/main.js。
组件 src/components/base/IcocoButton.vue 及依赖 src/components/IconSet.vue。
Logo 在 src/assets/brand/。来源及 SHA-256 见 docs/SOURCE_MANIFEST.json。
未复制原 main.css：其工作台全屏/禁止滚动规则不适合官网。现有 token 未批量清理，以保留当前基线。
字体名称来自 token；此包未附带字体文件，默认使用系统回退，需要品牌字体时另行确认授权。

## Git 协作与同步

官网采用独立历史，不包含原 icoco.art 业务仓库历史。默认分支为 main。

【在哪台机器执行】
开发者本地克隆目录（icoco-website 根目录）。开始工作前先确认 `git status --short` 没有未提交修改。

【复制哪一段完整命令】
```bash
git switch main
git pull --ff-only origin main
git switch -c feature/website-ui
```

【预期看到什么结果】
main 更新到最新代码，并进入自己的开发分支。后续工作使用新的分支名；不要重复创建已有分支。

完成改动后先 `npm run build`、检查桌面和手机布局，再执行：

【在哪台机器执行】
同一台开发电脑、同一个 icoco-website 根目录。

【复制哪一段完整命令】
```bash
git status --short
git diff
```

【预期看到什么结果】
确认只有本次官网源码与授权素材变动，不含 .env、node_modules、dist、日志或客户资料。确认后用明确的文件路径执行 `git add`，再 `git commit` 和 `git push -u origin feature/website-ui`。在 GitHub 创建 Pull Request，由维护者审核后合并到 main。

另一个人同步已合并代码：在干净的本地 main 分支执行 `git pull --ff-only origin main`；依赖发生变化后运行 `npm ci`。如果有未提交修改或冲突，先保留并处理，不要使用 reset --hard、clean -fd 或强制推送覆盖。
首次提交如提示作者身份未配置，请在本仓库配置自己的 `git config user.name` 和 `git config user.email`，不要使用他人身份。

只同步这个独立官网仓库，不向原 icoco.art 仓库推送，也不要操作服务器。Git 同步源码不等于网站上线。

## 接入边界
当前演示按钮指向 https://www.icoco.art/（现有登录入口）。官网日后占用该地址时，维护者必须同步确定工作台入口并更新此按钮，避免自循环；此包不修改原系统路由或登录重定向。
正式托管需要支持 SPA 子路径刷新；由主项目维护者统一规划，协作者不改 nginx。
交付：修改文件清单、路由清单、桌面/手机截图、构建结果。官网栏目和正式文案待产品方确认。
