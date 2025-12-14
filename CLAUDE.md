# XGNewTab 项目记录

## 项目概述

XGNewTab 是一个用于自定义浏览器新建标签页的浏览器扩展程序。该项目提供了一个完整的浏览器扩展开发框架，支持多种浏览器扩展功能，包括新标签页定制、弹出窗口、选项页面和侧边栏等。

**主要功能：**
- 自定义新建标签页界面
- 浏览器扩展弹出窗口
- 选项配置页面
- 侧边栏功能（可选）
- 内容脚本注入功能

**版本信息：** v0.0.1

## 技术栈

### 前端框架与库
- **Vue 3** (v3.4.38) - 响应式前端框架
- **TypeScript** (v5.5.4) - 类型安全的JavaScript超集
- **Vite** (v5.4.2) - 现代化构建工具和开发服务器

### 样式与UI
- **UnoCSS** (v0.62.2) - 原子化CSS框架
- **@unocss/reset** (v0.62.2) - CSS重置样式

### Vue生态工具
- **@vueuse/core** (v11.0.1) - Vue组合式API工具库
- **@vitejs/plugin-vue** (v5.1.2) - Vue单文件组件支持
- **@vue/compiler-sfc** (v3.4.38) - Vue单文件组件编译器

### 构建与开发工具
- **unplugin-auto-import** (v0.18.2) - 自动导入API
- **unplugin-vue-components** (v0.27.4) - 自动导入Vue组件
- **unplugin-icons** (v0.19.2) - 图标自动导入
- **@iconify/json** (v2.2.239) - 图标数据库

### 浏览器扩展相关
- **webextension-polyfill** (v0.12.0) - WebExtension API兼容层
- **webext-bridge** (v6.0.1) - 浏览器扩展消息桥接
- **web-ext** (v8.2.0) - Mozilla官方扩展开发工具

### 代码质量
- **ESLint** (v9.9.0) + **@antfu/eslint-config** (v2.27.0) - 代码规范检查
- **TypeScript ESLint** (v8.2.0) - TypeScript代码检查
- **Prettier** 集成 - 代码格式化

### 测试框架
- **Vitest** (v2.0.5) - 单元测试框架
- **@vue/test-utils** (v2.4.6) - Vue组件测试工具
- **Playwright** (v1.46.1) - 端到端测试
- **jsdom** (v24.1.1) - DOM模拟环境

### 包管理与工具
- **pnpm** (v10.9.0) - 高效的包管理器
- **cross-env** (v7.0.3) - 跨平台环境变量设置
- **npm-run-all** (v4.1.5) - 并行/串行运行脚本
- **rimraf** (v6.0.1) - 跨平台文件删除工具

## 项目结构

```
XGNewTab/
├── e2e/                          # 端到端测试
│   ├── basic.spec.ts            # 基础功能测试
│   └── fixtures.ts              # 测试夹具
├── extension/                    # 扩展输出目录
│   ├── assets/                  # 静态资源
│   │   ├── icon-512.png        # 扩展图标
│   │   └── icon.svg            # 矢量图标
│   ├── dist/                   # 构建输出
│   └── manifest.json           # 扩展清单文件
├── scripts/                     # 构建脚本
│   ├── manifest.ts             # 清单文件生成
│   ├── prepare.ts              # 构建准备脚本
│   └── utils.ts                # 工具函数
├── src/                        # 源代码目录
│   ├── assets/                 # 静态资源
│   │   └── logo.svg           # 项目Logo
│   ├── background/             # 后台脚本
│   │   ├── contentScriptHMR.ts # 内容脚本热更新
│   │   └── main.ts            # 后台主脚本
│   ├── components/             # Vue组件
│   │   ├── Logo.vue           # Logo组件
│   │   ├── SharedSubtitle.vue # 共享副标题组件
│   │   └── __tests__/         # 组件测试
│   ├── composables/            # Vue组合式函数
│   │   └── useWebExtensionStorage.ts # 扩展存储hook
│   ├── contentScripts/         # 内容脚本
│   │   ├── index.ts           # 内容脚本入口
│   │   └── views/             # 内容脚本视图
│   ├── logic/                  # 业务逻辑
│   │   ├── common-setup.ts    # 通用设置
│   │   ├── index.ts           # 逻辑入口
│   │   └── storage.ts         # 存储管理
│   ├── newtab/                 # 新标签页
│   │   ├── index.html         # HTML模板
│   │   └── main.ts            # 入口脚本
│   ├── options/                # 选项页面
│   │   ├── Options.vue        # 选项组件
│   │   ├── index.html         # HTML模板
│   │   └── main.ts            # 入口脚本
│   ├── popup/                  # 弹出窗口
│   │   ├── Popup.vue          # 弹出窗口组件
│   │   ├── index.html         # HTML模板
│   │   └── main.ts            # 入口脚本
│   ├── sidepanel/              # 侧边栏
│   │   ├── Sidepanel.vue      # 侧边栏组件
│   │   ├── index.html         # HTML模板
│   │   └── main.ts            # 入口脚本
│   ├── styles/                 # 样式文件
│   │   ├── index.ts           # 样式入口
│   │   └── main.css           # 主样式文件
│   └── tests/                  # 测试文件
├── eslint.config.mjs           # ESLint配置
├── package.json                # 项目依赖配置
├── playwright.config.ts        # Playwright配置
├── pnpm-lock.yaml             # pnpm锁定文件
├── tsconfig.json              # TypeScript配置
├── unocss.config.ts           # UnoCSS配置
├── vite.config.background.mts  # 后台脚本构建配置
├── vite.config.content.mts     # 内容脚本构建配置
└── vite.config.mts            # 主构建配置
```

### 核心目录说明

- **`src/newtab/`** - 新标签页功能的核心实现，这是项目的主要功能模块
- **`src/background/`** - 浏览器扩展后台服务，处理扩展的生命周期和消息传递
- **`src/popup/`** - 扩展图标点击时显示的弹出窗口
- **`src/options/`** - 扩展的设置和配置界面
- **`src/components/`** - 可复用的Vue组件
- **`src/logic/`** - 业务逻辑和状态管理
- **`scripts/`** - 构建和开发相关的脚本工具

### 配置文件说明

- **`manifest.ts`** - 动态生成浏览器扩展的manifest.json文件
- **多个vite配置文件** - 针对不同模块（主应用、后台脚本、内容脚本）的独立构建配置
- **`unocss.config.ts`** - 原子化CSS框架配置
- **`playwright.config.ts`** - 端到端测试配置

该项目采用现代化的前端开发技术栈，具有完整的开发、测试、构建流程，适合作为浏览器扩展开发的起始模板。
