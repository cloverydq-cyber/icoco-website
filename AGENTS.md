# 官网协作范围
只修改本独立官网项目。Vue 3 + Vite，允许添加官网页面、路由、导航及素材。
不得接入或修改原工作台、鉴权、业务 API、后端和数据库。不得部署或修改服务器。
先只读检查，再局部修改；修改前在仓库外备份。不要 !important、重复容器或堆叠覆盖。
复用 --ico-* token；普通操作按钮使用 IcocoButton，保留 4px 默认圆角。页面导航使用链接。
Preserve the existing dark UI, typography, colors, globe hero, layout and interactions. Add only requested content and links. Do not redesign the theme or homepage structure without explicit approval. New pages must follow the existing dark visual language.
正常命令按钮迁移规范见 docs/UI_TOKEN_SKILL.md；该文档中的原仓库路径仅作来源参考。
改动后 npm run build，并检查桌面和移动端、子页面直接打开及导航。
提交仅包含源码、锁文件和有授权的素材，不包含 node_modules、dist、密钥、日志。

新闻内容维护在 src/data/site.js，来源记录在 docs/NEWS_SOURCES.json。无来源的动态只留占位，不虚构日期、获奖、客户背书或绩效数字。产品截图与团队照片等待真实素材，不以概念图冒充。

2026-11-08 同步约定：官网默认英文，中英意语言状态使用 localStorage.language，语言切换和备案信息复用全局展示组件。此仓库的 useLanguage 是公开官网轻量适配层，不复制主仓库的 useAuthUser、完整业务翻译或任何 API。样式编辑 src/styles/source/ 后执行 node scripts/scope-marketing-css.mjs，再构建；不要修改生成文件。产品、关于、联系等已从长页拆为子页面，保持各原区块的视觉设计。账号和法律页面链接指向主应用，不在独立官网实现鉴权。
