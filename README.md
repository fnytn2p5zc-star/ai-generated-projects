# Personal Learning Quest Board

一个用于展示和管理个人学习内容的 Quest Board 应用。以看板形式追踪学习任务，支持 Markdown 笔记和多语言。

## 技术栈

- **框架**: Next.js 15
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **数据库**: Prisma + SQLite
- **UI 组件**: Radix UI
- **拖拽**: dnd-kit
- **国际化**: next-intl
- **Markdown**: react-markdown + @uiw/react-md-editor

## 安装

```bash
# 安装依赖
npm install

# 初始化数据库
npm run db:generate
npm run db:push
```

## 启动

```bash
# 开发模式
npm run dev

# 生产构建
npm run build
npm run start
```

## 项目结构

```
src/
├── actions/      # Server Actions
├── app/          # Next.js App Router
├── components/   # React 组件
│   ├── features/ # 功能组件（kanban, notes）
│   └── ui/       # 通用 UI 组件
├── i18n/         # 国际化配置
└── lib/          # 工具函数
```

## 功能

- **看板视图**: 以 Todo / In Progress / Done 状态管理学习任务
- **拖拽排序**: 支持任务在列之间拖拽
- **Markdown 笔记**: 每个任务支持 Markdown 格式的学习笔记
- **多语言**: 支持中英文切换
- **分类管理**: 按学习方向组织任务
