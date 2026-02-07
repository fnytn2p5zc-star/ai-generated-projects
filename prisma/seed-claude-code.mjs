import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ─── Category Groups ─────────────────────────────────────────
const CATEGORY_GROUPS = [
  { name: 'Claude Code 工具链', position: 20, categoryNames: ['基础入门', '配置体系', '自动化与扩展', '高级模式'] },
]

// ─── Categories ───────────────────────────────────────────────
const CATEGORIES = [
  { name: '基础入门', color: '#D97706', position: 0 },
  { name: '配置体系', color: '#7C3AED', position: 1 },
  { name: '自动化与扩展', color: '#059669', position: 2 },
  { name: '高级模式', color: '#DC2626', position: 3 },
]

// ─── Quests ───────────────────────────────────────────────────
const QUESTS = [
  // ══════════════════════════════════════════════════════════════
  // ── 基础入门 ──
  // ══════════════════════════════════════════════════════════════
  {
    categoryName: '基础入门',
    title: 'Claude Code 快速上手',
    description: '掌握 Claude Code CLI 的安装、启动、基本交互模式和核心命令，建立日常使用的肌肉记忆。',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    objectives: [
      '安装 Claude Code 并完成初始配置',
      '掌握交互模式、单次查询、管道模式三种使用方式',
      '熟练使用 /help、/clear、/compact、/resume 等内置命令',
      '理解权限模式 (permission mode) 的区别和选择',
    ],
    resources: [
      { title: 'Claude Code 官方文档 - Quickstart', url: 'https://code.claude.com/docs/en/quickstart', type: 'article' },
      { title: 'Claude Code CLI Reference', url: 'https://code.claude.com/docs/en/cli-reference', type: 'article' },
      { title: 'Claude Code GitHub', url: 'https://github.com/anthropics/claude-code', type: 'article' },
    ],
    milestones: [
      { title: '安装 Claude Code 并验证运行', completed: true },
      { title: '掌握三种启动模式', completed: true },
      { title: '熟练使用所有内置命令', completed: false },
      { title: '理解并切换权限模式', completed: false },
    ],
    notes: [
      {
        title: '安装与启动方式',
        content: `## 安装

\`\`\`bash
# macOS / Linux / WSL (推荐，自动更新)
curl -fsSL https://claude.ai/install.sh | bash

# Homebrew
brew install --cask claude-code

# Windows PowerShell
irm https://claude.ai/install.ps1 | iex
\`\`\`

## 三种启动模式

| 模式 | 命令 | 特点 |
|------|------|------|
| **交互模式** | \`claude\` | 持续对话，可以编辑文件、运行命令 |
| **单次查询** | \`claude -p "问题"\` | 只回答问题，不修改文件，适合管道 |
| **继续会话** | \`claude -c\` | 恢复上一次对话的上下文 |

## 常用启动参数

\`\`\`bash
claude                          # 交互模式
claude "修复构建错误"             # 带初始提示的交互模式
claude -p "解释这个函数"          # 查询模式 (只读)
claude -c                        # 继续最近的对话
claude -r                        # 选择历史对话恢复
claude commit                    # 快速创建 git commit
claude --init                    # 初始化项目 CLAUDE.md
\`\`\`

## 管道模式

\`\`\`bash
# 将输出传给 Claude 分析
cat error.log | claude -p "解释这些错误"

# 结合 git diff
git diff | claude -p "帮我写 commit message"

# 生成结构化输出
claude -p "列出所有 API 端点" --output-format json
\`\`\``,
      },
      {
        title: '内置命令速查表',
        content: `## 会话管理

| 命令 | 功能 |
|------|------|
| \`/help\` | 显示帮助信息 |
| \`/clear\` | 清空当前对话 |
| \`/resume\` | 切换到其他历史会话 |
| \`/compact\` | 手动压缩上下文（释放 token 空间）|
| \`/cost\` | 查看 token 使用量和费用 |

## 配置与调试

| 命令 | 功能 |
|------|------|
| \`/config\` | 打开设置 |
| \`/model\` | 切换模型和推理等级 |
| \`/doctor\` | 系统诊断 |
| \`/debug\` | 查看会话调试日志 |
| \`/permissions\` | 查看权限规则 |

## 扩展系统

| 命令 | 功能 |
|------|------|
| \`/agents\` | 管理子代理 (Subagents) |
| \`/hooks\` | 管理钩子 (Hooks) |
| \`/mcp\` | 管理 MCP 服务 |
| \`/plugins\` | 管理插件 |
| \`/memory\` | 编辑记忆文件 |

## 快捷键

| 快捷键 | 功能 |
|--------|------|
| \`Ctrl+C\` | 中断当前操作 |
| \`Ctrl+D\` | 退出 Claude Code |
| \`Shift+Tab\` | 切换权限模式 |
| \`Ctrl+R\` | 搜索命令历史 |
| \`Ctrl+T\` | 切换任务列表 |
| \`Option+T\` | 切换扩展思考模式 |
| \`Tab\` | 文件名/命令补全 |`,
      },
      {
        title: '权限模式详解',
        content: `## 五种权限模式

用 \`Shift+Tab\` 在会话中切换，或在启动时指定 \`--permission-mode\`。

### 1. Default（默认）
- 每次工具调用都会询问
- **适合**：不熟悉时、探索性操作

### 2. Accept Edits（接受编辑）
- 自动批准文件编辑，其他仍询问
- **适合**：日常开发，信任 Claude 编辑代码

### 3. Accept All（全部接受）
- 自动批准所有操作
- **适合**：有明确计划、信任操作范围时

### 4. Plan Mode（计划模式）
- 只读，不能修改任何文件
- 只能搜索、阅读、分析
- **适合**：代码审查、架构分析、复杂重构前的探索

### 5. Bypass Permissions（跳过权限）
- 完全跳过所有检查
- **不推荐**：除非在沙箱/CI 环境中

## 最佳实践

\`\`\`
探索阶段 → Plan Mode（只看不动）
     ↓
规划确认 → Default（逐步确认）
     ↓
实施阶段 → Accept Edits（信任编辑）
     ↓
批量操作 → Accept All（明确目标后）
\`\`\`

## 精细权限控制

在 \`settings.json\` 中可以针对具体工具设置 allow/deny：

\`\`\`json
{
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Read(./src/**)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Read(.env*)"
    ]
  }
}
\`\`\``,
      },
    ],
  },

  {
    categoryName: '基础入门',
    title: '工具系统 (Tool System) 深度理解',
    description: '理解 Claude Code 的工具调用机制——Claude 如何读写文件、执行命令、搜索代码，以及如何通过权限规则控制工具行为。',
    status: 'TODO',
    priority: 'HIGH',
    objectives: [
      '理解 Claude Code 内置的所有工具及其用途',
      '掌握工具调用的权限控制机制',
      '学会配置精细化的 allow/deny 规则',
      '理解沙箱 (Sandbox) 的隔离机制',
    ],
    resources: [
      { title: 'Claude Code - How It Works', url: 'https://code.claude.com/docs/en/how-claude-code-works', type: 'article' },
      { title: 'Claude Code - Settings', url: 'https://code.claude.com/docs/en/settings', type: 'article' },
    ],
    milestones: [
      { title: '理解内置工具类型', completed: false },
      { title: '掌握权限规则语法', completed: false },
      { title: '配置项目级权限', completed: false },
      { title: '理解沙箱机制', completed: false },
    ],
    notes: [
      {
        title: '内置工具总览',
        content: `## Claude Code 内置工具

Claude 通过「工具」与你的电脑交互。每个操作都是一次工具调用。

### 文件操作
| 工具 | 功能 | 示例 |
|------|------|------|
| **Read** | 读取文件内容 | 查看源码、配置文件 |
| **Write** | 创建新文件 | 生成新组件、配置 |
| **Edit** | 编辑已有文件 | 精确替换代码片段 |
| **Glob** | 按模式搜索文件名 | \`**/*.tsx\` 找所有 React 组件 |
| **Grep** | 搜索文件内容 | 找函数定义、查引用 |

### 系统操作
| 工具 | 功能 | 示例 |
|------|------|------|
| **Bash** | 执行 Shell 命令 | git、npm、docker 等 |
| **Task** | 启动子代理 | 并行研究、代码审查 |

### 网络操作
| 工具 | 功能 | 示例 |
|------|------|------|
| **WebFetch** | 抓取网页内容 | 查文档、分析错误 |
| **WebSearch** | 搜索互联网 | 查找最新信息 |

### 交互操作
| 工具 | 功能 | 示例 |
|------|------|------|
| **AskUserQuestion** | 向用户提问 | 澄清需求、确认方案 |
| **TodoWrite** | 管理任务列表 | 跟踪进度 |

## 核心理解

> Claude 的每一步操作（读文件、改代码、运行命令）都是一次工具调用。
> 你可以通过权限系统精确控制哪些操作自动执行、哪些需要确认、哪些完全禁止。`,
      },
      {
        title: '权限规则语法',
        content: `## 权限规则格式

\`\`\`
ToolName(pattern)
\`\`\`

### 常用规则示例

\`\`\`json
{
  "permissions": {
    "allow": [
      "Bash(npm run *)",           // 允许所有 npm run 命令
      "Bash(pnpm *)",              // 允许所有 pnpm 命令
      "Bash(git status)",          // 允许 git status
      "Read(./src/**)",            // 允许读取 src 目录
      "Edit(./src/**/*.ts)",       // 允许编辑 TypeScript
      "WebFetch(domain:github.com)" // 允许访问 GitHub
    ],
    "deny": [
      "Bash(rm -rf *)",           // 禁止危险删除
      "Bash(curl *)",             // 禁止网络请求
      "Read(.env*)",              // 禁止读取环境变量
      "Read(./secrets/**)",       // 禁止读取机密
      "WebFetch"                  // 禁止所有网页抓取
    ]
  }
}
\`\`\`

### 权限优先级（高→低）

1. **Managed** (系统管理员部署)
2. **CLI 参数** (启动时指定)
3. **Local Project** (\`.claude/settings.local.json\`)
4. **Project** (\`.claude/settings.json\`)
5. **User** (\`~/.claude/settings.json\`)

### 沙箱模式

\`\`\`json
{
  "sandbox": {
    "enabled": true,
    "autoAllowBashIfSandboxed": true,
    "network": {
      "allowedDomains": ["github.com", "*.npmjs.org"],
      "allowLocalBinding": true
    }
  }
}
\`\`\`

> 沙箱模式在 macOS 上使用系统沙箱，限制文件系统访问和网络，
> 即使 Claude 执行了意外命令也不会影响系统。`,
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // ── 配置体系 ──
  // ══════════════════════════════════════════════════════════════
  {
    categoryName: '配置体系',
    title: 'CLAUDE.md 记忆系统',
    description: '掌握 CLAUDE.md 的分层记忆机制——如何用项目指令、个人规则、模块化 rules 让 Claude 记住你的偏好和项目规范。',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    objectives: [
      '理解 CLAUDE.md 的加载层次和优先级',
      '学会编写高质量的项目 CLAUDE.md',
      '掌握 .claude/rules/ 的模块化规则',
      '区分 CLAUDE.md 与 CLAUDE.local.md 的使用场景',
    ],
    resources: [
      { title: 'Claude Code - Memory', url: 'https://code.claude.com/docs/en/memory', type: 'article' },
      { title: 'Claude Code - Settings', url: 'https://code.claude.com/docs/en/settings', type: 'article' },
    ],
    milestones: [
      { title: '理解记忆文件层次', completed: true },
      { title: '编写项目 CLAUDE.md', completed: true },
      { title: '创建模块化 rules', completed: false },
      { title: '配置自动记忆', completed: false },
    ],
    notes: [
      {
        title: '记忆文件层次结构',
        content: `## CLAUDE.md 加载顺序

Claude Code 启动时自动加载以下文件（全部注入系统提示词）：

\`\`\`
优先级从高到低：

1. /Library/Application Support/ClaudeCode/CLAUDE.md  ← 系统管理员
2. ~/.claude/CLAUDE.md                                 ← 个人全局
3. ~/.claude/rules/*.md                                ← 个人规则
4. <project>/CLAUDE.md                                 ← 项目共享
5. <project>/.claude/rules/*.md                        ← 项目规则
6. <project>/CLAUDE.local.md                           ← 项目个人（gitignore）
7. <project>/.claude/settings.local.json               ← 项目个人设置
\`\`\`

## 各层适合放什么

| 层级 | 位置 | 共享 | 放什么 |
|------|------|------|--------|
| **个人全局** | \`~/.claude/CLAUDE.md\` | 否 | 编码风格、通用偏好 |
| **个人规则** | \`~/.claude/rules/\` | 否 | 测试要求、安全标准 |
| **项目共享** | \`./CLAUDE.md\` | Git | 技术栈、架构约定、命令 |
| **项目规则** | \`.claude/rules/\` | Git | 路径特定规则 |
| **项目个人** | \`./CLAUDE.local.md\` | 否 | 个人项目偏好 |

## 关键理解

> CLAUDE.md 不是"文档"——它是注入 Claude 系统提示词的指令。
> 写在里面的内容，Claude **每次对话都会看到并遵守**。`,
      },
      {
        title: 'CLAUDE.md 编写最佳实践',
        content: `## 好的 CLAUDE.md 应该包含

### 1. 项目背景（让 Claude 理解上下文）
\`\`\`markdown
# Project: Learning Management System
- 技术栈: Next.js 15, Prisma, SQLite, Tailwind CSS
- 目的: 个人学习追踪看板
- 语言: 中文为主
\`\`\`

### 2. 关键约束（最重要！）
\`\`\`markdown
## 数据库安全（CRITICAL）
- 绝对禁止 prisma db push --force-reset
- 只删词汇表，不动任务表
\`\`\`

### 3. 常用命令
\`\`\`markdown
## 命令
- pnpm dev — 启动开发服务器
- pnpm build — 生产构建
- npx prisma db push — 同步 Schema
\`\`\`

### 4. 编码规范
\`\`\`markdown
## 规范
- 使用不可变模式 (immutable)
- 函数 < 50 行，文件 < 800 行
- 用 Zod 验证输入
\`\`\`

## 反模式（不要这样写）

- 不要写太长（200行以内最佳）
- 不要写模糊指令（"写好代码" → 无效）
- 不要写过期信息
- 不要重复通用知识（Claude 已经懂了）

## 初始化命令

\`\`\`bash
claude --init
# 自动生成模板 CLAUDE.md
\`\`\``,
      },
      {
        title: '模块化 Rules 系统',
        content: `## .claude/rules/ 目录

将 CLAUDE.md 拆分成多个聚焦的规则文件，避免单文件过长。

### 目录结构示例

\`\`\`
.claude/rules/
├── coding-style.md        # 编码风格
├── testing.md             # 测试要求
├── security.md            # 安全规范
├── git-workflow.md        # Git 工作流
├── performance.md         # 性能优化
├── agents.md              # Agent 使用
└── hooks.md               # Hooks 配置
\`\`\`

### 路径特定规则

规则文件可以通过 frontmatter 指定只在编辑特定路径时激活：

\`\`\`markdown
---
paths:
  - "src/**/*.test.ts"
  - "tests/**/*.ts"
---

# 测试文件规范
- 必须使用 describe/it 结构
- 每个测试独立，不依赖执行顺序
- 覆盖率 > 80%
\`\`\`

### 个人全局 rules

\`\`\`
~/.claude/rules/
├── coding-style.md     ← 你的编码偏好（所有项目生效）
├── testing.md           ← 你的测试标准
└── security.md          ← 你的安全要求
\`\`\`

> 全局 rules 适合放**个人偏好**：不可变模式、commit 格式等。
> 项目 rules 适合放**项目约定**：API 格式、数据库规范等。`,
      },
    ],
  },

  {
    categoryName: '配置体系',
    title: 'Settings 配置全解析',
    description: '深入理解 Claude Code 的多层配置系统——settings.json、环境变量、模型选择、上下文管理等核心配置。',
    status: 'TODO',
    priority: 'MEDIUM',
    objectives: [
      '掌握 settings.json 的多层优先级',
      '学会配置模型、权限、环境变量',
      '理解上下文窗口管理和自动压缩',
      '掌握快捷键自定义',
    ],
    resources: [
      { title: 'Claude Code - Settings', url: 'https://code.claude.com/docs/en/settings', type: 'article' },
      { title: 'Claude Code - Keybindings', url: 'https://code.claude.com/docs/en/keybindings', type: 'article' },
    ],
    milestones: [
      { title: '理解配置文件层次', completed: false },
      { title: '配置模型和推理参数', completed: false },
      { title: '自定义快捷键', completed: false },
      { title: '配置上下文管理策略', completed: false },
    ],
    notes: [
      {
        title: 'Settings 文件总览',
        content: `## 配置文件位置与优先级

| 优先级 | 位置 | 共享 | 用途 |
|--------|------|------|------|
| 1 (最高) | 系统管理路径 | 是 | IT 管控 |
| 2 | CLI 参数 | 否 | 临时覆盖 |
| 3 | \`.claude/settings.local.json\` | 否 | 项目个人 |
| 4 | \`.claude/settings.json\` | Git | 项目共享 |
| 5 (最低) | \`~/.claude/settings.json\` | 否 | 个人全局 |

## 核心配置项

\`\`\`json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",

  "permissions": {
    "defaultMode": "acceptEdits",
    "allow": ["Bash(npm run *)"],
    "deny": ["Read(.env*)"]
  },

  "model": "claude-sonnet-4-5-20250929",

  "env": {
    "MAX_THINKING_TOKENS": "20000",
    "CLAUDE_CODE_AUTOCOMPACT_PCT_OVERRIDE": "80"
  },

  "hooks": { ... },

  "sandbox": {
    "enabled": true
  }
}
\`\`\`

## 环境变量速查

| 变量 | 作用 | 默认值 |
|------|------|--------|
| \`ANTHROPIC_MODEL\` | 指定模型 | claude-sonnet |
| \`MAX_THINKING_TOKENS\` | 思考 token 上限 | 10000 |
| \`CLAUDE_CODE_AUTOCOMPACT_PCT_OVERRIDE\` | 自动压缩阈值 | 95% |
| \`MCP_TIMEOUT\` | MCP 连接超时 (ms) | 10000 |
| \`ENABLE_TOOL_SEARCH\` | 工具搜索策略 | auto:5 |

## 模型选择策略

| 模型 | 适合场景 | 特点 |
|------|---------|------|
| **Haiku 4.5** | 轻量任务、频繁调用的 agent | 最快最便宜 |
| **Sonnet 4.5** | 日常编码、主力开发 | 性价比最高 |
| **Opus 4.6** | 架构决策、深度推理 | 最强但最贵 |`,
      },
      {
        title: '快捷键自定义',
        content: `## 配置文件

\`~/.claude/keybindings.json\`

## 结构

\`\`\`json
{
  "bindings": [
    {
      "context": "Chat",
      "bindings": {
        "enter": "chat:submit",
        "ctrl+e": "chat:externalEditor",
        "ctrl+s": "chat:stash"
      }
    },
    {
      "context": "Global",
      "bindings": {
        "ctrl+t": "app:toggleTodos",
        "ctrl+o": "app:toggleTranscript"
      }
    }
  ]
}
\`\`\`

## 常用上下文

| Context | 作用范围 |
|---------|---------|
| **Global** | 全局 |
| **Chat** | 输入框 |
| **Autocomplete** | 自动补全菜单 |
| **Confirmation** | 确认对话框 |
| **HistorySearch** | Ctrl+R 搜索 |

## 键名语法

\`\`\`
ctrl+k            // 单修饰键
ctrl+shift+c      // 多修饰键
ctrl+k ctrl+s     // 和弦键 (chord)
meta+p            // Command/Meta 键
escape / enter / tab / space  // 特殊键
\`\`\`

## 管理命令

\`\`\`
/keybindings      # 交互式管理界面
\`\`\``,
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // ── 自动化与扩展 ──
  // ══════════════════════════════════════════════════════════════
  {
    categoryName: '自动化与扩展',
    title: 'Hooks 自动化钩子',
    description: '掌握 Hooks 系统——在 Claude 的工具调用生命周期中插入自动化逻辑，实现代码格式化、安全检查、通知等自动化工作流。',
    status: 'TODO',
    priority: 'HIGH',
    objectives: [
      '理解 Hook 的完整生命周期（12 种事件）',
      '编写 PreToolUse Hook 实现安全拦截',
      '编写 PostToolUse Hook 实现自动格式化',
      '掌握 Hook 的 matcher 语法和输出协议',
    ],
    resources: [
      { title: 'Claude Code - Hooks Guide', url: 'https://code.claude.com/docs/en/hooks-guide', type: 'article' },
      { title: 'Claude Code - Settings (hooks section)', url: 'https://code.claude.com/docs/en/settings', type: 'article' },
    ],
    milestones: [
      { title: '理解 Hook 生命周期', completed: false },
      { title: '实现 PreToolUse 安全拦截', completed: false },
      { title: '实现 PostToolUse 自动格式化', completed: false },
      { title: '实现 Stop Hook 最终检查', completed: false },
    ],
    notes: [
      {
        title: 'Hook 事件类型全览',
        content: `## Hook 是什么？

Hook 是在 Claude 执行操作的**前后**自动运行的 Shell 脚本。
可以用来：验证、拦截、自动化、通知。

## 12 种 Hook 事件

### 会话级别
| 事件 | 触发时机 | 用途 |
|------|---------|------|
| **SessionStart** | 会话开始/恢复 | 注入上下文、环境准备 |
| **SessionEnd** | 会话结束 | 清理资源 |

### 用户交互
| 事件 | 触发时机 | 用途 |
|------|---------|------|
| **UserPromptSubmit** | 用户发送消息前 | 验证输入 |
| **Notification** | Claude 需要注意力 | 桌面通知 |

### 工具调用（最常用）
| 事件 | 触发时机 | 用途 |
|------|---------|------|
| **PreToolUse** | 工具执行前 | **拦截危险操作** |
| **PostToolUse** | 工具执行后 | **自动格式化** |
| **PostToolUseFailure** | 工具执行失败 | 错误恢复 |
| **PermissionRequest** | 权限弹窗前 | 自动审批 |

### 子代理
| 事件 | 触发时机 | 用途 |
|------|---------|------|
| **SubagentStart** | 子代理启动 | 注入上下文 |
| **SubagentStop** | 子代理结束 | 收集结果 |

### 上下文管理
| 事件 | 触发时机 | 用途 |
|------|---------|------|
| **PreCompact** | 上下文压缩前 | 保存重要状态 |
| **Stop** | Claude 完成回复 | **最终验证** |`,
      },
      {
        title: 'Hook 配置语法与示例',
        content: `## 配置位置

\`\`\`json
// ~/.claude/settings.json (全局)
// .claude/settings.json (项目)
{
  "hooks": {
    "事件名": [
      {
        "matcher": "匹配模式",
        "hooks": [
          {
            "type": "command",
            "command": "shell 命令"
          }
        ]
      }
    ]
  }
}
\`\`\`

## matcher 语法

\`\`\`
"Bash"                   // 精确匹配
"Edit|Write"             // 多工具（正则 OR）
"mcp__github__.*"        // MCP 工具（通配符）
""                       // 空 = 匹配所有
\`\`\`

## 退出码协议

| 退出码 | 含义 |
|--------|------|
| **0** | 允许操作 |
| **2** | **阻止操作**（stderr 内容显示给 Claude）|
| 其他 | Hook 本身出错（忽略）|

## 实战示例

### 示例 1: 自动 Prettier 格式化

\`\`\`json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{
          "type": "command",
          "command": "file=$(jq -r '.tool_input.file_path') && [[ \\"$file\\" =~ \\\\.(js|ts|jsx|tsx)$ ]] && npx prettier --write \\"$file\\" || true"
        }]
      }
    ]
  }
}
\`\`\`

### 示例 2: 阻止删除命令

\`\`\`json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "command": "cmd=$(jq -r '.tool_input.command') && echo \\"$cmd\\" | grep -qE 'rm -rf|DROP TABLE|--force-reset' && { echo 'BLOCKED: Dangerous command' >&2; exit 2; } || exit 0"
        }]
      }
    ]
  }
}
\`\`\`

### 示例 3: macOS 桌面通知

\`\`\`json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [{
          "type": "command",
          "command": "osascript -e 'display notification \\"Claude Code 需要你的注意\\" with title \\"Claude Code\\"'"
        }]
      }
    ]
  }
}
\`\`\`

### 示例 4: console.log 警告

\`\`\`json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{
          "type": "command",
          "command": "file=$(jq -r '.tool_input.file_path') && grep -n 'console.log' \\"$file\\" && echo 'WARNING: console.log detected' >&2 || true"
        }]
      }
    ]
  }
}
\`\`\`

## Hook 的输入格式

Hook 通过 stdin 接收 JSON：

\`\`\`json
{
  "tool_name": "Bash",
  "tool_input": {
    "command": "npm test"
  }
}
\`\`\`

用 \`jq\` 解析：\`jq -r '.tool_input.command'\``,
      },
    ],
  },

  {
    categoryName: '自动化与扩展',
    title: 'MCP 协议 (Model Context Protocol)',
    description: '掌握 MCP——Claude Code 连接外部工具和服务的标准协议。学会添加 GitHub、数据库、Slack 等 MCP 服务器，扩展 Claude 的能力边界。',
    status: 'TODO',
    priority: 'HIGH',
    objectives: [
      '理解 MCP 的架构原理（客户端-服务器模式）',
      '掌握三种传输方式：HTTP、SSE、Stdio',
      '安装配置常用 MCP 服务器',
      '在团队中共享 MCP 配置',
    ],
    resources: [
      { title: 'Claude Code - MCP', url: 'https://code.claude.com/docs/en/mcp', type: 'article' },
      { title: 'Model Context Protocol 官方', url: 'https://modelcontextprotocol.io/', type: 'article' },
      { title: 'MCP Server Registry', url: 'https://github.com/modelcontextprotocol/servers', type: 'article' },
    ],
    milestones: [
      { title: '理解 MCP 架构', completed: false },
      { title: '安装第一个 MCP 服务器', completed: false },
      { title: '配置项目级 .mcp.json', completed: false },
      { title: '使用 MCP 工具完成实际任务', completed: false },
    ],
    notes: [
      {
        title: 'MCP 核心概念',
        content: `## MCP 是什么

**Model Context Protocol** (模型上下文协议) 是一个开放标准，让 AI 模型能够连接外部工具和数据源。

\`\`\`
┌─────────────┐     MCP     ┌──────────────────┐
│ Claude Code │ ←─────────→ │  MCP Server      │
│ (客户端)     │             │  (GitHub/DB/...)  │
└─────────────┘             └──────────────────┘
\`\`\`

类比：MCP 之于 AI，就像 USB 之于电脑——标准化的接口协议。

## 三种传输方式

| 方式 | 命令 | 特点 | 适合场景 |
|------|------|------|---------|
| **HTTP** | \`--transport http\` | 远程 HTTP 端点 | 云服务（推荐）|
| **SSE** | \`--transport sse\` | Server-Sent Events | 实时流式 |
| **Stdio** | \`--transport stdio\` | 本地进程通信 | 本地工具 |

## MCP 提供什么

每个 MCP Server 可以暴露：
- **Tools** — Claude 可以调用的函数（如 \`create_issue\`）
- **Resources** — Claude 可以读取的数据（如数据库表）
- **Prompts** — 预定义的提示词模板`,
      },
      {
        title: 'MCP 安装配置指南',
        content: `## 添加 MCP 服务器

### 方法 1: CLI 命令（推荐）

\`\`\`bash
# HTTP 远程服务
claude mcp add --transport http github https://api.githubcopilot.com/mcp/

# 带认证的 HTTP
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp \\
  --header "Authorization: Bearer YOUR_TOKEN"

# 本地 stdio 进程
claude mcp add --transport stdio filesystem \\
  -- npx -y @modelcontextprotocol/server-filesystem /path/to/dir

# 带环境变量
claude mcp add --transport stdio github \\
  --env GITHUB_TOKEN=ghp_xxxx \\
  -- npx -y @modelcontextprotocol/server-github
\`\`\`

### 方法 2: 项目配置文件

在项目根目录创建 \`.mcp.json\`（提交到 Git，团队共享）：

\`\`\`json
{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://localhost:5432/mydb"
      }
    }
  }
}
\`\`\`

### 方法 3: 从 Claude Desktop 导入

\`\`\`bash
claude mcp add-from-claude-desktop
\`\`\`

## 管理命令

\`\`\`bash
claude mcp list                    # 列出所有 MCP
claude mcp get github              # 查看详情
claude mcp remove github           # 删除
claude mcp reset-project-choices   # 重置审批缓存
\`\`\`

## 配置作用域

| 作用域 | 文件 | 共享 | 用途 |
|--------|------|------|------|
| **个人** | \`~/.claude.json\` | 否 | 个人通用 |
| **项目** | \`.mcp.json\` | Git | 团队共享 |
| **本地** | \`~/.claude.json\` + scope | 否 | 特定项目 |`,
      },
      {
        title: '热门 MCP 服务器清单',
        content: `## 开发工具

| 服务器 | 功能 | 安装方式 |
|--------|------|---------|
| **GitHub** | PR、Issue、仓库管理 | HTTP |
| **GitLab** | GitLab 操作 | HTTP |
| **Sentry** | 错误监控 | HTTP |
| **Linear** | 项目管理 | HTTP |

## 数据库

| 服务器 | 功能 | 安装方式 |
|--------|------|---------|
| **PostgreSQL** | SQL 查询 | Stdio |
| **MySQL** | SQL 查询 | Stdio |
| **SQLite** | 本地数据库 | Stdio |
| **Redis** | 缓存操作 | Stdio |

## 通信

| 服务器 | 功能 | 安装方式 |
|--------|------|---------|
| **Slack** | 消息发送/读取 | HTTP |
| **Discord** | Bot 操作 | Stdio |

## 文件与知识

| 服务器 | 功能 | 安装方式 |
|--------|------|---------|
| **Filesystem** | 文件系统访问 | Stdio |
| **Memory** | 知识图谱记忆 | Stdio |
| **Notion** | 文档操作 | HTTP |

## 云服务

| 服务器 | 功能 | 安装方式 |
|--------|------|---------|
| **Cloudflare** | Workers/R2/D1 | HTTP |
| **AWS** | S3/Lambda 操作 | Stdio |
| **Vercel** | 部署管理 | HTTP |

## 在 Claude Code 中使用

\`\`\`
# 安装后直接用自然语言
> 帮我查看 Sentry 上最近的报错
> 在 GitHub 上创建一个 issue
> 查询数据库中的活跃用户
> 发 Slack 消息通知团队
\`\`\`

MCP 工具在 Claude 中的名字格式：\`mcp__<server>__<tool>\`
例如：\`mcp__github__create_issue\``,
      },
    ],
  },

  {
    categoryName: '自动化与扩展',
    title: 'Skills 自定义技能',
    description: '掌握 Skills 系统——创建可复用的指令包，扩展 Claude 的能力。用斜杠命令触发，或让 Claude 自动根据场景调用。',
    status: 'TODO',
    priority: 'MEDIUM',
    objectives: [
      '理解 Skill 的概念和组成结构',
      '创建第一个自定义 Skill',
      '掌握 Skill frontmatter 的高级配置',
      '区分用户触发与 Claude 自动触发 Skill',
    ],
    resources: [
      { title: 'Claude Code - Skills', url: 'https://code.claude.com/docs/en/skills', type: 'article' },
    ],
    milestones: [
      { title: '理解 Skill 概念', completed: false },
      { title: '创建第一个 Skill', completed: false },
      { title: '使用 frontmatter 高级配置', completed: false },
      { title: '创建带动态上下文的 Skill', completed: false },
    ],
    notes: [
      {
        title: 'Skill 概念与创建',
        content: `## Skill 是什么

Skill 是**可复用的指令包**，可以理解为 Claude Code 的"宏"或"插件"。

- 用 \`/skill-name\` 手动触发
- 或让 Claude 根据 description 自动调用
- 可以包含指令、动态命令输出、文件引用

## 创建 Skill

### 步骤 1: 创建目录

\`\`\`bash
# 个人全局 Skill
mkdir -p ~/.claude/skills/my-skill

# 项目 Skill
mkdir -p .claude/skills/my-skill
\`\`\`

### 步骤 2: 编写 SKILL.md

\`\`\`markdown
---
name: code-review
description: 代码审查，检查质量和安全问题。编辑代码后自动触发。
---

对代码进行全面审查：

1. **安全性** — 检查注入、XSS、硬编码密钥
2. **可读性** — 命名、函数长度、嵌套深度
3. **性能** — N+1 查询、内存泄漏
4. **测试** — 是否有对应测试
5. **风格** — 是否符合项目规范

输出格式：
- CRITICAL: 必须修复
- WARNING: 建议修复
- INFO: 可改进
\`\`\`

### 步骤 3: 使用

\`\`\`
> /code-review          # 手动触发
> 帮我审查最近的更改      # Claude 自动匹配 description
\`\`\`

## Skill 存储位置

| 位置 | 路径 | 范围 |
|------|------|------|
| **个人** | \`~/.claude/skills/\` | 所有项目 |
| **项目** | \`.claude/skills/\` | 当前项目 |`,
      },
      {
        title: 'Skill Frontmatter 配置',
        content: `## 完整 Frontmatter 选项

\`\`\`yaml
---
name: my-skill                      # 唯一标识符
description: 做什么，什么时候用       # Claude 根据此自动判断
user-invocable: true                # 用户可用 /name 调用
disable-model-invocation: false     # true = 只能手动调用
allowed-tools: Read, Grep, Glob     # 限制可用工具
model: sonnet                       # 指定模型
context: fork                       # fork = 在子代理中运行
agent: Explore                      # 子代理类型
argument-hint: [文件路径]            # 参数提示
---
\`\`\`

## 动态上下文（命令输出）

在 SKILL.md 中使用 !+反引号+command+反引号 嵌入命令输出：

\`\`\`markdown
---
name: pr-summary
description: 总结当前 PR 的变更
---

## PR 变更分析

变更文件：
!\${'\`'}git diff --name-only HEAD~1\${'\`'}

详细差异：
!\${'\`'}git diff HEAD~1\${'\`'}

请总结这些变更的目的和影响。
\`\`\`

## 参数替换

\`\`\`markdown
---
name: explain
argument-hint: [文件路径]
---

详细解释 $ARGUMENTS 的实现逻辑。

# 多参数：$0, $1, $2
# 用法: /explain src/auth.ts
\`\`\`

## 带附属文件的 Skill

\`\`\`
my-skill/
├── SKILL.md              # 主文件
├── patterns.md           # 参考模式
├── examples.md           # 使用示例
└── scripts/
    └── check.sh          # 辅助脚本
\`\`\`

在 SKILL.md 中引用：
\`\`\`markdown
参照 [patterns.md](patterns.md) 中的模式
\`\`\``,
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // ── 高级模式 ──
  // ══════════════════════════════════════════════════════════════
  {
    categoryName: '高级模式',
    title: 'Subagent 子代理系统',
    description: '掌握 Claude Code 的子代理（Subagent）架构——创建专门的 AI 助手来并行执行研究、代码审查、测试等任务，实现多 Agent 协作。',
    status: 'TODO',
    priority: 'HIGH',
    objectives: [
      '理解子代理的运作机制和隔离特性',
      '创建自定义子代理（code-reviewer、tdd-guide 等）',
      '掌握子代理的 frontmatter 配置',
      '设计并行子代理工作流',
    ],
    resources: [
      { title: 'Claude Code - Sub-agents', url: 'https://code.claude.com/docs/en/sub-agents', type: 'article' },
      { title: 'Claude Code - Agent Teams', url: 'https://code.claude.com/docs/en/agent-teams', type: 'article' },
    ],
    milestones: [
      { title: '理解内置子代理', completed: false },
      { title: '创建第一个自定义子代理', completed: false },
      { title: '设计多代理并行流程', completed: false },
      { title: '掌握 Agent Teams 模式', completed: false },
    ],
    notes: [
      {
        title: '子代理核心概念',
        content: `## 什么是子代理

子代理是在**独立上下文窗口**中运行的专门 AI 助手。

\`\`\`
┌─────────────────────────────┐
│      主 Claude 会话          │
│                              │
│  "帮我审查并测试 auth 模块"   │
│         │                    │
│    ┌────┴────┐               │
│    ▼         ▼               │
│ ┌──────┐ ┌──────┐           │
│ │审查   │ │测试   │  ← 并行   │
│ │子代理 │ │子代理 │           │
│ └──┬───┘ └──┬───┘           │
│    │        │                │
│    ▼        ▼                │
│  汇总结果返回主会话           │
└─────────────────────────────┘
\`\`\`

## 子代理的特点

- **隔离上下文** — 不占用主会话的 token
- **专门指令** — 有自己的系统提示词
- **受限工具** — 可以限制可用工具
- **并行执行** — 多个子代理同时工作
- **返回结果** — 完成后向主会话报告

## 内置子代理

| 名称 | 模型 | 工具 | 用途 |
|------|------|------|------|
| **Explore** | Haiku | 只读 | 快速搜索代码 |
| **Plan** | 继承 | 只读 | 规划模式的研究 |
| **general-purpose** | 继承 | 全部 | 通用多步骤任务 |`,
      },
      {
        title: '创建自定义子代理',
        content: `## 方法 1: /agents 命令

\`\`\`
> /agents
# 选择: Create new agent
# 选择: User-level (全局) 或 Project-level (项目)
\`\`\`

## 方法 2: 手动创建文件

### 个人全局子代理

\`\`\`bash
mkdir -p ~/.claude/agents
\`\`\`

创建 \`~/.claude/agents/code-reviewer.md\`：

\`\`\`yaml
---
name: code-reviewer
description: 代码审查专家。编写或修改代码后自动使用。
tools: Read, Glob, Grep, Bash
model: sonnet
maxTurns: 20
---

你是高级代码审查专家。审查时关注：

1. **安全漏洞** — 注入、XSS、硬编码密钥
2. **代码质量** — 可读性、复杂度、命名
3. **性能问题** — N+1 查询、内存泄漏
4. **测试覆盖** — 是否有对应测试

输出格式：
- CRITICAL: [描述] — 必须修复
- HIGH: [描述] — 强烈建议修复
- MEDIUM: [描述] — 建议改进
- LOW: [描述] — 可选优化
\`\`\`

### 项目子代理

创建 \`.claude/agents/tdd-guide.md\`：

\`\`\`yaml
---
name: tdd-guide
description: TDD 工作流引导。新功能和 Bug 修复时自动使用。
tools: Read, Write, Edit, Bash, Grep, Glob
model: sonnet
---

你是 TDD 专家。严格遵循以下流程：

1. **RED** — 先写失败的测试
2. **GREEN** — 写最少的代码让测试通过
3. **REFACTOR** — 在测试保护下重构

覆盖率要求: 80%+
测试类型: 单元测试 + 集成测试
\`\`\`

## Frontmatter 配置项

| 字段 | 说明 | 示例 |
|------|------|------|
| **name** | 唯一标识 | \`code-reviewer\` |
| **description** | 何时使用（关键！）| 自动匹配依据 |
| **tools** | 允许的工具 | \`Read, Grep, Glob\` |
| **disallowedTools** | 禁止的工具 | \`Bash, Write\` |
| **model** | 使用的模型 | \`haiku/sonnet/opus\` |
| **maxTurns** | 最大轮次 | \`20\` |
| **permissionMode** | 权限模式 | \`default\` |

## 并行执行模式

Claude 会自动判断何时并行启动子代理：

\`\`\`
> 帮我从三个角度审查 PR：安全、性能、测试覆盖
# Claude 自动启动 3 个子代理并行执行
\`\`\``,
      },
      {
        title: 'Agent Teams (实验性)',
        content: `## Agent Teams 是什么

多个子代理组成"团队"，每人从不同角度分析同一个问题。

## 启用

\`\`\`json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
\`\`\`

## 使用场景

\`\`\`
> 组建团队从 3 个角度审查这个 PR:
> 1. 安全影响
> 2. 性能影响
> 3. 测试覆盖
\`\`\`

## 工作流程

\`\`\`
Team Lead (主 Claude)
    │
    ├─→ Teammate 1: 安全审查 ──→ 报告
    ├─→ Teammate 2: 性能审查 ──→ 报告
    └─→ Teammate 3: 测试审查 ──→ 报告
         │
         ▼
    Team Lead 汇总结论
\`\`\`

## 显示模式

- \`in-process\` — 所有在主终端（默认）
- \`split-panes\` — 每人独立面板（需 tmux/iTerm2）

## Git Worktrees 并行模式

当需要真正的文件级隔离时：

\`\`\`bash
# 创建独立工作树
git worktree add ../feature-a -b feature-a
git worktree add ../bugfix-123 bugfix-123

# 在每个工作树中独立运行 Claude
cd ../feature-a && claude
cd ../bugfix-123 && claude

# 清理
git worktree remove ../feature-a
\`\`\``,
      },
    ],
  },

  {
    categoryName: '高级模式',
    title: 'Plan Mode 与上下文管理',
    description: '掌握 Plan Mode（规划模式）和上下文窗口管理策略——用只读分析确保安全，用合理的上下文管理保证 Claude 的长对话质量。',
    status: 'TODO',
    priority: 'MEDIUM',
    objectives: [
      '理解 Plan Mode 的工作原理和使用场景',
      '掌握上下文窗口的容量管理',
      '学会使用 /compact 和自动压缩策略',
      '设计复杂任务的分阶段工作流',
    ],
    resources: [
      { title: 'Claude Code - Common Workflows', url: 'https://code.claude.com/docs/en/common-workflows', type: 'article' },
      { title: 'Claude Code - How It Works', url: 'https://code.claude.com/docs/en/how-claude-code-works', type: 'article' },
    ],
    milestones: [
      { title: '实践 Plan Mode 分析工作流', completed: false },
      { title: '理解上下文窗口限制', completed: false },
      { title: '掌握手动和自动压缩', completed: false },
      { title: '设计分阶段任务流程', completed: false },
    ],
    notes: [
      {
        title: 'Plan Mode 详解',
        content: `## Plan Mode 是什么

Plan Mode 是一种**只读分析模式**，Claude 只能搜索和阅读代码，不能修改任何文件。

## 为什么需要 Plan Mode

> "先理解，再动手" — 这是高级工程师的习惯。

- 避免在不理解全局的情况下做修改
- 让 Claude 充分探索后再提出方案
- 适合复杂重构、架构决策

## 使用方式

\`\`\`bash
# 启动时指定
claude --permission-mode plan

# 会话中切换
# Shift+Tab → 选择 Plan Mode
\`\`\`

## Plan Mode 工作流

\`\`\`
Step 1: Plan Mode（只读）
  → Claude 搜索、阅读、分析代码
  → 提出实施方案
  → 列出受影响文件
  → 识别风险

Step 2: 确认方案
  → 用户审查方案
  → 调整或批准

Step 3: 切换到实施模式
  → Shift+Tab → Accept Edits
  → Claude 按方案执行
\`\`\`

## 适合 Plan Mode 的场景

- 大规模重构（影响 > 5 个文件）
- 不熟悉的代码库
- 架构级变更
- 调试复杂 Bug（先定位再修复）
- 代码审查

## 不需要 Plan Mode 的场景

- 修改已知的单个文件
- 简单的 Bug 修复
- 添加独立的新文件`,
      },
      {
        title: '上下文窗口管理',
        content: `## 上下文窗口是什么

Claude 的"工作记忆"——所有对话内容、文件内容、工具结果都存在这里。

\`\`\`
┌─────────────────────────────────┐
│         上下文窗口               │
│  ┌───────────────────────────┐  │
│  │ 系统提示 (CLAUDE.md 等)    │  │
│  ├───────────────────────────┤  │
│  │ 对话历史                   │  │
│  │ 工具调用结果                │  │
│  │ 文件内容                   │  │
│  │ ...                        │  │
│  ├───────────────────────────┤  │
│  │ ⚠️ 最后 20% 质量下降区     │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
\`\`\`

## 为什么上下文管理很重要

- 上下文满了 → Claude 的回答质量下降
- 尤其是**最后 20%** 区域，推理能力明显变差
- 大文件、大搜索结果会快速消耗上下文

## 管理策略

### 1. 手动压缩

\`\`\`
/compact
# Claude 会总结之前的对话，释放空间
# 关键信息保留，细节被压缩
\`\`\`

### 2. 自动压缩

\`\`\`json
{
  "env": {
    "CLAUDE_CODE_AUTOCOMPACT_PCT_OVERRIDE": "80"
  }
}
\`\`\`

### 3. 子代理分担

把大量搜索/研究工作交给子代理（Explore），它们有独立上下文。

### 4. 分阶段任务

\`\`\`
阶段 1: 分析 → /compact
阶段 2: 实现核心 → /compact
阶段 3: 测试与完善 → /compact
阶段 4: 收尾
\`\`\`

### 5. 监控上下文

\`\`\`
/cost     # 查看 token 使用
/context  # 查看上下文占用
\`\`\`

## 什么操作消耗上下文多

| 操作 | 消耗 | 建议 |
|------|------|------|
| 读取大文件 | 高 | 指定行范围 |
| 广泛搜索 | 高 | 用子代理 |
| 长对话 | 中 | 定期 /compact |
| 扩展思考 | 高 | 必要时才开 |`,
      },
    ],
  },

  {
    categoryName: '高级模式',
    title: '实战工作流与最佳实践',
    description: '将 Claude Code 的所有功能串联成高效的日常开发工作流——从需求分析到代码审查、从 Bug 修复到功能实现的完整实战模式。',
    status: 'TODO',
    priority: 'MEDIUM',
    objectives: [
      '掌握「分析 → 计划 → 实施 → 审查」的标准工作流',
      '学会组合使用 Agent + Hook + Skill 构建自动化流水线',
      '理解 CI/CD 中的 Claude Code 集成',
      '建立个人效率工具箱',
    ],
    resources: [
      { title: 'Claude Code - Common Workflows', url: 'https://code.claude.com/docs/en/common-workflows', type: 'article' },
      { title: 'Claude Code Best Practices', url: 'https://www.anthropic.com/engineering/claude-code-best-practices', type: 'article' },
    ],
    milestones: [
      { title: '实践完整 Bug 修复工作流', completed: false },
      { title: '实践完整功能开发工作流', completed: false },
      { title: '搭建个人自动化工具箱', completed: false },
      { title: '在 CI/CD 中集成 Claude', completed: false },
    ],
    notes: [
      {
        title: '标准开发工作流',
        content: `## Bug 修复工作流

\`\`\`
1. 描述 Bug + 复现步骤
   > "登录页面点击提交后白屏，控制台报 TypeError"

2. Claude 自动进入分析（可用 Plan Mode）
   → 读取相关文件
   → 搜索错误关键词
   → 定位根因

3. 提出修复方案
   → Claude 展示修改计划

4. 确认后实施
   → 修改代码
   → 运行测试验证

5. 自动触发 code-reviewer Agent（如果已配置）
   → 审查修复质量

6. 提交
   > claude commit
   # 或 /commit
\`\`\`

## 功能开发工作流

\`\`\`
1. 需求描述
   > "添加用户头像上传功能，支持裁剪"

2. Plan Mode 分析（Claude 自动判断或手动切换）
   → 分析现有架构
   → 确定影响范围
   → 提出实施方案

3. 确认方案后，切换到 Accept Edits

4. TDD 流程（tdd-guide Agent）
   → 先写测试
   → 再实现功能
   → 重构

5. 代码审查（code-reviewer Agent）
   → 自动触发审查

6. 提交 + PR
   > "创建 PR"
\`\`\`

## 代码审查工作流

\`\`\`
> /code-review     # 或 Claude 自动触发
> 审查 PR #123     # 用 GitHub MCP

# Claude 从多角度分析：
# - 代码质量
# - 安全漏洞
# - 性能问题
# - 测试覆盖
\`\`\``,
      },
      {
        title: '个人效率工具箱搭建',
        content: `## 推荐配置组合

### 1. 必备 Agents

\`\`\`
~/.claude/agents/
├── code-reviewer.md     # 代码审查
├── tdd-guide.md         # TDD 流程
├── security-reviewer.md # 安全审查
└── planner.md           # 任务规划
\`\`\`

### 2. 必备 Hooks

\`\`\`json
{
  "hooks": {
    "PostToolUse": [
      { "matcher": "Edit|Write", "hooks": [
        { "type": "command", "command": "prettier" }
      ]},
      { "matcher": "Edit|Write", "hooks": [
        { "type": "command", "command": "console.log 检查" }
      ]}
    ],
    "PreToolUse": [
      { "matcher": "Bash", "hooks": [
        { "type": "command", "command": "危险命令拦截" }
      ]}
    ],
    "Notification": [
      { "matcher": "", "hooks": [
        { "type": "command", "command": "桌面通知" }
      ]}
    ]
  }
}
\`\`\`

### 3. 必备 MCP

\`\`\`bash
# GitHub — PR/Issue 管理
claude mcp add --transport http github https://api.githubcopilot.com/mcp/

# Memory — 知识图谱记忆
claude mcp add --transport stdio memory \\
  -- npx -y @modelcontextprotocol/server-memory

# 项目数据库
claude mcp add --transport stdio db \\
  -- npx -y @modelcontextprotocol/server-sqlite
\`\`\`

### 4. 必备 Skills

\`\`\`
~/.claude/skills/
├── commit/SKILL.md         # 智能 commit
├── code-review/SKILL.md    # 代码审查
├── explain/SKILL.md        # 代码解释
└── tdd/SKILL.md            # TDD 流程
\`\`\`

### 5. 个人 rules

\`\`\`
~/.claude/rules/
├── coding-style.md    # 不可变、小函数
├── testing.md         # 80% 覆盖率
├── security.md        # 安全检查清单
└── git-workflow.md    # commit 格式
\`\`\`

## 全景图

\`\`\`
                你
                │
                ▼
        ┌── Claude Code ──┐
        │                  │
  ┌─────┤  CLAUDE.md       │
  │     │  settings.json   │
  │     │  keybindings     │
  │     └──────────────────┘
  │              │
  ├─── Agents ──┤── MCP Servers ──┤── Hooks
  │  (审查/TDD)  │  (GitHub/DB)    │  (格式化/拦截)
  │              │                  │
  └─── Skills ──┤── Rules ────────┤── Sandbox
     (命令扩展)   (编码规范)         (安全隔离)
\`\`\``,
      },
      {
        title: 'CI/CD 集成与 Headless 模式',
        content: `## Headless 模式 (无交互)

在 CI/CD 中使用 Claude Code：

\`\`\`bash
# 单次查询
claude -p "分析代码安全问题" --output-format json > report.json

# 流式输出
claude -p "列出所有 TODO" --output-format stream-json

# 自动审批（仅在 CI 沙箱中）
claude --dangerously-skip-permissions -p "修复 lint 错误"
\`\`\`

## GitHub Actions 集成

\`\`\`yaml
name: Claude Code Review
on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install Claude Code
        run: curl -fsSL https://claude.ai/install.sh | bash
      - name: Run Review
        run: |
          claude -p "审查这个 PR 的代码变更，输出 JSON 报告" \\
            --output-format json > review.json
        env:
          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
\`\`\`

## 管道集成

\`\`\`bash
# 用 Claude 分析构建错误
npm run build 2>&1 | claude -p "分析并修复这些错误"

# 用 Claude 写 commit message
git diff --staged | claude -p "为这些变更写 commit message"

# 用 Claude 分析测试失败
npm test 2>&1 | claude -p "分析失败原因并建议修复"
\`\`\`

## 提示工程技巧

### 有效提示
\`\`\`
"修复 src/auth/login.ts 中的空指针错误，
控制台报错: TypeError: Cannot read property 'email' of null，
当用户未登录时点击'profile'按钮触发"
\`\`\`

### 无效提示
\`\`\`
"修复 bug"
"代码有问题"
\`\`\`

### 提示优化原则
1. **具体** — 文件路径、错误信息、复现步骤
2. **上下文** — 技术栈、约束条件
3. **目标** — 明确期望的结果
4. **步骤** — 复杂任务拆分成步骤
5. **@ 引用** — 用 @文件名 引入文件`,
      },
    ],
  },
]

// ─── Seed Logic ──────────────────────────────────────────────
async function main() {
  console.log('Seeding Claude Code learning quests...\n')

  // Create category groups
  console.log('Creating category groups...')
  const groupMap = new Map()
  for (const group of CATEGORY_GROUPS) {
    const created = await prisma.categoryGroup.create({
      data: { name: group.name, position: group.position },
    })
    groupMap.set(group.name, { id: created.id, categoryNames: group.categoryNames })
    console.log(`  + Group: ${group.name}`)
  }

  // Build category→group lookup
  const categoryGroupLookup = new Map()
  for (const [, value] of groupMap) {
    for (const catName of value.categoryNames) {
      categoryGroupLookup.set(catName, value.id)
    }
  }

  // Create categories
  console.log('Creating categories...')
  const categoryMap = new Map()
  for (const cat of CATEGORIES) {
    const groupId = categoryGroupLookup.get(cat.name) ?? null
    const created = await prisma.category.create({
      data: { ...cat, groupId },
    })
    categoryMap.set(cat.name, created.id)
    console.log(`  + Category: ${cat.name}${groupId ? ' (grouped)' : ''}`)
  }

  // Create quests
  console.log('Creating quests...')
  for (let i = 0; i < QUESTS.length; i++) {
    const quest = QUESTS[i]
    const categoryId = categoryMap.get(quest.categoryName)

    const task = await prisma.task.create({
      data: {
        title: quest.title,
        description: quest.description,
        status: quest.status,
        priority: quest.priority,
        position: i,
        categories: { connect: [{ id: categoryId }] },
      },
    })
    console.log(`  + Quest: ${quest.title} [${quest.status}]`)

    // Create learning plan
    await prisma.learningPlan.create({
      data: {
        taskId: task.id,
        objectives: JSON.stringify(quest.objectives),
        resources: JSON.stringify(quest.resources),
        milestones: JSON.stringify(quest.milestones),
      },
    })

    // Create notes
    for (const note of quest.notes) {
      await prisma.note.create({
        data: {
          taskId: task.id,
          title: note.title,
          content: note.content,
        },
      })
      console.log(`    - Note: ${note.title}`)
    }
  }

  const taskCount = await prisma.task.count()
  const noteCount = await prisma.note.count()
  const catCount = await prisma.category.count()
  const groupCount = await prisma.categoryGroup.count()
  console.log(`\nDone! Total: ${groupCount} groups, ${catCount} categories, ${taskCount} quests, ${noteCount} notes.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
