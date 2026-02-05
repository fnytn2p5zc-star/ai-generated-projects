# Claude Instructions — Personal Learning Quest Board


## Response Marker Rule (Test Only)

- Claude 在 **每一次响应的末尾**，必须额外输出一行固定文本：
  
  congroo

## Project Purpose
这是一个用于**展示个人学习内容**的 Quest Board 项目。

主要目标：
- 以 Markdown 形式记录学习任务（Quest）
- 按「类别」组织内容，用于侧边栏导航
- 明确展示每个任务的进度状态
- 内容偏客观记录，而非情绪化日志

Claude 的职责是：**按照既定结构生成和维护 Markdown 学习内容，确保可展示、可分类、可追踪**。

---

## Information Architecture (Very Important)

### Category（用于侧边栏）
- Category 代表一个学习方向或主题
- 例如：Frontend / Backend / Computer Science / English / Tools
- Category 本身不记录过程，只用于组织内容

### Quest
- Quest = 一个独立的学习任务或学习主题
- 每个 Quest 使用一个 `.md` 文件
- Quest 必须归属于一个 Category

Claude 生成内容时，必须显式标明 Category，以便侧边栏使用。

---

## Quest Markdown Structure (Must Follow)

每个 Quest 文件 **必须严格遵循以下结构**，不得随意增删标题。

```md
# <Quest Title>

## Meta
- Category:
- Status: Todo | In Progress | Done
- Progress: 0%–100%
- Start Date:
- Last Updated:
- Tags:

## Description
简要说明这个 Quest 学习的是什么，不超过 5 行。

## Objectives
- 明确的学习目标 1
- 明确的学习目标 2

## Task List
- [ ] 任务 1
- [ ] 任务 2
- [ ] 任务 3

## Notes
记录关键学习要点、代码片段说明、概念总结。
偏“知识卡片”，而不是流水账。

## References
- 相关文档 / 文章 / 课程链接

