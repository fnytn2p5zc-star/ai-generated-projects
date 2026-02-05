import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ─── Category Group ──────────────────────────────────────────
const EVANGELION_GROUP = { name: '动漫与文化分析', position: 10 }

// ─── Category ────────────────────────────────────────────────
const EVANGELION_CATEGORY = { name: 'EVA 内容解析', color: '#9333EA', position: 0 }

// ─── Quests ──────────────────────────────────────────────────
const QUESTS = [
  {
    title: 'EVA 世界观与基础设定',
    description: '系统梳理新世纪福音战士的核心世界观：第二次冲击、SEELE 与人类补完计划、NERV 的组织架构、EVA 与使徒的本质，建立完整的设定知识体系。',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    objectives: [
      '理解 FAR / 第一始祖民族留下的种子设定',
      '梳理第一次冲击与第二次冲击的因果链',
      '理解 SEELE 死海文书与人类补完计划的关系',
      '掌握 NERV 组织架构、MAGI 系统与碇源堂的双重计划',
      '理解 EVA 的本质（由 Adam/Lilith 复制的人造神）',
    ],
    resources: [
      { title: 'Evangelion Wiki - Timeline', url: 'https://wiki.evageeks.org/Timeline', type: 'wiki' },
      { title: 'EvaGeeks - Theory and Analysis', url: 'https://wiki.evageeks.org/Theory_and_Analysis', type: 'wiki' },
      { title: '庵野秀明访谈合集', url: 'https://www.gwern.net/docs/anime/eva/', type: 'article' },
    ],
    milestones: [
      { title: '第一始祖民族与种子设定', completed: true },
      { title: '冲击事件体系', completed: true },
      { title: 'SEELE 与人类补完计划', completed: false },
      { title: 'NERV / MAGI / EVA 技术设定', completed: false },
    ],
    notes: [
      {
        title: '冲击事件体系总览',
        content: `## 冲击事件 (Impact) 体系

### 第一次冲击 (First Impact)
- **时间**: 约 40 亿年前
- **本质**: Black Moon（载有 Lilith 的种子）坠落地球
- **结果**: 月球形成；Lilith 在地球上播种生命（Lilith 系生命 = 人类）

### 第二次冲击 (Second Impact)
- **时间**: 2000 年 9 月 13 日
- **地点**: 南极
- **本质**: SEELE / 葛城调查队接触 Adam 并尝试缩小化
- **结果**: 南极冰盖融化，海平面上升，全球人口减半

### 第三次冲击 (Third Impact)
- TV 版与旧剧场版有不同演绎
- **EOE 版**: 初号机作为生命之树升空，Lilith/绫波丽触发补完
- **核心**: Anti-AT Field 全面展开 → 全人类 LCL 化

### 关键概念
| 概念 | 说明 |
|------|------|
| 生命之果 | Adam 系生命持有，赋予无限能量（S2 机关）|
| 智慧之果 | Lilith 系生命持有，赋予智慧与文明 |
| AT Field | Absolute Terror Field，心之壁 / 自我的边界 |
| LCL | Link Connect Liquid，Lilith 之血，同时是生命汤 |`,
      },
      {
        title: 'SEELE 与碇源堂的计划对比',
        content: `## 两种补完计划

### SEELE 的计划
- **目标**: 全人类灵魂融合为一个完美存在
- **依据**: 死海文书中的预言
- **手段**: 量产型 EVA + Longinus 之枪 + Lilith
- **本质**: 宗教性质的"回归神"

### 碇源堂的计划
- **目标**: 与碇唯重逢（极度私人的动机）
- **手段**: Adam 胎儿植入右手 + 绫波丽(Lilith 器皿) + 初号机
- **本质**: 利用补完的混沌实现个人目的

### 绫波丽的选择
- 最终丽选择了真嗣而非源堂
- 将 Adam (源堂右手) 带回 Lilith 本体
- 由真嗣来决定补完的走向

> "碇司令的补完不是我的心愿。"`,
      },
    ],
  },
  {
    title: 'EVA 角色心理深度分析',
    description: '以精神分析与存在主义视角，深入剖析碇真嗣、明日香、绫波丽、葛城美里、碇源堂等核心角色的心理创伤、防御机制与人格成长。',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    objectives: [
      '分析碇真嗣的回避型依附与"刺猬困境"',
      '解读明日香的自恋防御与核心脆弱性',
      '理解绫波丽的自我觉醒过程',
      '分析葛城美里的创伤重复与对父亲形象的依赖',
      '理解碇源堂的情感封闭与极端行为逻辑',
    ],
    resources: [
      { title: 'EvaGeeks - Character Analysis', url: 'https://wiki.evageeks.org/Guides', type: 'wiki' },
      { title: '精神分析入门 (弗洛伊德 / 拉康)', url: 'https://plato.stanford.edu/entries/freud/', type: 'article' },
      { title: 'Hedgehog\'s Dilemma - Wikipedia', url: 'https://en.wikipedia.org/wiki/Hedgehog%27s_dilemma', type: 'article' },
    ],
    milestones: [
      { title: '碇真嗣心理画像', completed: true },
      { title: '明日香心理画像', completed: false },
      { title: '绫波丽的自我意识', completed: false },
      { title: '成人角色群像分析', completed: false },
    ],
    notes: [
      {
        title: '碇真嗣：回避型人格与补完',
        content: `## 碇真嗣的核心心理结构

### 创伤根源
- **被遗弃体验**: 3 岁时被父亲碇源堂抛弃
- **核心信念**: "我不被需要" → "我没有存在的价值"
- **防御机制**: 回避（逃跑）、顺从（"别人让我做的"）

### 刺猬困境 (Hedgehog's Dilemma)
> 想要靠近他人，又害怕被伤害

表现：
1. 驾驶 EVA 的动机 = 被认可 ≠ 保护他人
2. "不能逃避" 是外在压力内化，不是真正的勇气
3. 反复在"接近—退缩"之间摆荡

### 补完中的选择
- 补完 = 消除 AT Field = 消除自我边界
- 真嗣最终选择"回到有痛苦的现实"
- **这是全作品的核心主题**: 接受不完美的自己与他人

### 心理学映射
| EVA 概念 | 心理学概念 |
|----------|-----------|
| AT Field | 自我边界 / 心理防线 |
| 补完 | 退行到共生状态 / 消除个体化 |
| LCL 之海 | 原初合一状态 (子宫意象) |
| 选择回归 | 个体化 / 分离-个体化完成 |`,
      },
      {
        title: '明日香：自恋防御与崩溃',
        content: `## 惣流·明日香·兰格雷

### 创伤根源
- 母亲精神崩溃后将玩偶当作明日香
- 幼年承受"被替代"的创伤 → 极度需要被认可
- 发现母亲上吊自杀 → 永久性心理创伤

### 防御结构
- **自恋防御**: "我是最优秀的" = 补偿内在的无价值感
- **攻击性**: 主动推开他人 = 避免再次被抛弃
- **与 EVA 的关系**: 驾驶能力 = 自我价值的唯一支撑

### 崩溃过程 (TV 19-24 话)
1. 同步率下降 → 自我价值崩塌
2. 被 SEELE 精神攻击 → 防线全部击溃
3. 精神污染中被迫面对童年创伤
4. 陷入完全的退行状态（浴缸场景）

### EOE 中的重生
- 在量产机战中听到母亲的声音
- 理解 EVA 02 中有母亲的灵魂
- "我终于明白了 AT Field 的意思"
- 战斗力爆发 → 但被量产机压倒

> 明日香的悲剧在于：她用来保护自己的铠甲，同时也阻止了真正的联结。`,
      },
    ],
  },
  {
    title: '使徒与 AT Field 的象征解读',
    description: '分析 17 位使徒的设计来源、象征意义及其与人类关系的隐喻，深入理解 AT Field 作为核心概念在心理学与神学层面的双重含义。',
    status: 'TODO',
    priority: 'MEDIUM',
    objectives: [
      '梳理全部使徒的名称来源（天使学）',
      '分析各使徒战斗的叙事功能与主题对应',
      '理解 AT Field 的多层含义（物理屏障 / 心之壁 / 个体边界）',
      '探讨使徒与人类的本质同源性',
    ],
    resources: [
      { title: 'Angels - EvaGeeks Wiki', url: 'https://wiki.evageeks.org/Angels', type: 'wiki' },
      { title: 'AT Field - Theological Analysis', url: 'https://wiki.evageeks.org/A.T._Field', type: 'wiki' },
      { title: '天使名称的宗教来源', url: 'https://en.wikipedia.org/wiki/Angels_in_Judaism', type: 'article' },
    ],
    milestones: [
      { title: '使徒名称与天使学对应', completed: false },
      { title: '使徒设计的视觉象征分析', completed: false },
      { title: 'AT Field 的多层解读', completed: false },
      { title: '使徒 vs 人类：同源与对立', completed: false },
    ],
    notes: [
      {
        title: '使徒名称与天使学速查',
        content: `## 使徒 (Angel) 名称来源

| # | 使徒名 | 天使学来源 | 含义 |
|---|--------|-----------|------|
| 1 | Adam | 第一人类 | 生命之源 |
| 2 | Lilith | 亚当的第一个妻子 | 人类真正的始祖 |
| 3 | Sachiel | 水之天使 | 第一个来袭 |
| 4 | Shamshel | 白昼天使 | 光鞭攻击 |
| 5 | Ramiel | 雷之天使 | 完美正八面体 |
| 6 | Gaghiel | 鱼之天使 | 水中战 |
| 7 | Israfel | 音乐天使 | 分裂 / 双子体 |
| 8 | Sandalphon | 胎儿天使 | 岩浆中的胚胎 |
| 9 | Matarael | 雨之天使 | 酸液攻击 |
| 10 | Sahaquiel | 天空之天使 | 轨道轰炸 |
| 11 | Ireul | 恐惧天使 | 微观侵蚀 MAGI |
| 12 | Leliel | 夜之天使 | 迪拉克之海 |
| 13 | Bardiel | 雾之天使 | 寄生 EVA-03 |
| 14 | Zeruel | 力之天使 | 最强战力 |
| 15 | Arael | 光之天使 | 精神攻击明日香 |
| 16 | Armisael | 子宫天使 | 融合攻击绫波 |
| 17 | Tabris (渚薫) | 自由意志天使 | 最终使徒 = 人形 |

## AT Field 的三层含义

1. **物理层**: 绝对恐怖领域，几乎无法穿透的力场
2. **心理层**: 自我边界，将"我"与"他者"分隔的心之壁
3. **存在论层**: 个体存在的条件——有边界才有"我"

> 所有生命都有 AT Field，使徒只是更强。人类的 AT Field 弱到肉眼不可见，但它维持着每个人作为独立个体的存在。`,
      },
    ],
  },
  {
    title: 'EVA 中的宗教符号与神话原型',
    description: '解析 EVA 中大量援引的犹太-基督教符号（生命之树、朗基努斯之枪、死海文书）、诺斯替主义元素与荣格原型，理解庵野秀明如何将宗教美学转化为叙事工具。',
    status: 'TODO',
    priority: 'MEDIUM',
    objectives: [
      '识别并解读主要宗教符号的原始含义与 EVA 中的变用',
      '理解卡巴拉生命之树在 EVA 设定中的结构性作用',
      '分析诺斯替主义（灵知主义）的影响',
      '探讨庵野对宗教符号"去神圣化"的使用策略',
    ],
    resources: [
      { title: 'Kabbalah in Evangelion', url: 'https://wiki.evageeks.org/Theory_and_Analysis:Kabbalah', type: 'wiki' },
      { title: 'Christian Symbolism in Evangelion', url: 'https://wiki.evageeks.org/Christian_Themes_and_Symbolism', type: 'wiki' },
      { title: 'Gnosticism - Stanford Encyclopedia', url: 'https://plato.stanford.edu/entries/gnosticism/', type: 'article' },
    ],
    milestones: [
      { title: '十字架与基督教符号', completed: false },
      { title: '卡巴拉生命之树', completed: false },
      { title: '诺斯替主义元素', completed: false },
      { title: '庵野的符号策略分析', completed: false },
    ],
    notes: [
      {
        title: '卡巴拉生命之树与 EVA',
        content: `## 卡巴拉生命之树 (Sephirotic Tree)

### 生命之树的 10 个质点 (Sefirot)
\`\`\`
        Keter (王冠)
       /        \\
  Binah          Chokmah
  (理解)         (智慧)
     |    \\  /    |
     |   Tiferet  |
     |    (美)    |
  Gevurah        Chesed
  (严厉)         (慈悲)
     |    \\  /    |
     |    Yesod   |
     |   (基础)   |
  Hod            Netzach
  (荣光)         (永恒)
         |
      Malkuth
      (王国)
\`\`\`

### 在 EVA 中的对应
- **SEELE 的会议室**: 12 块黑色石碑排列暗合生命之树
- **补完发动时**: 量产机排列成生命之树形态
- **Adam / Lilith**: 分别对应生命之树的不同面向
- **初号机上升**: 成为新的生命之树

### 庵野的态度
> "很多宗教符号只是因为看起来很酷。" —— 庵野秀明

但这并不意味着符号没有叙事功能：
- 十字架形爆炸 → 视觉冲击 + "神圣暴力"的反讽
- Longinus 之枪 → 命运 / 不可逆的选择
- 死海文书 → 预言 / 被操控的宿命感`,
      },
    ],
  },
  {
    title: 'EVA 叙事结构与演出手法分析',
    description: '分析 EVA 在动画演出层面的革新手法：从传统机器人动画的解构，到 TV 25-26 话的实验性叙事，再到 EOE 的影像实验，理解庵野秀明如何用形式本身传达主题。',
    status: 'TODO',
    priority: 'HIGH',
    objectives: [
      '分析 EVA 对超级机器人类型的解构',
      '理解 TV 版后期（25-26 话）的实验性叙事手法',
      '解读 EOE 的影像语言与蒙太奇技法',
      '分析"静止画"演出与预算限制如何成为美学风格',
      '对比 TV 版与 EOE 作为两种不同的叙事结论',
    ],
    resources: [
      { title: 'EvaGeeks - Episode Analysis', url: 'https://wiki.evageeks.org/Episode_Guides', type: 'wiki' },
      { title: '庵野秀明的影像哲学', url: 'https://fullfrontal.moe/anno-directing/', type: 'article' },
      { title: 'Every Frame a Painting - Editing Techniques', url: 'https://www.youtube.com/c/everyframeapainting', type: 'video' },
    ],
    milestones: [
      { title: '超级机器人类型解构', completed: false },
      { title: 'TV 25-26 话的实验叙事', completed: false },
      { title: 'EOE 影像语言分析', completed: false },
      { title: '静止画美学与预算限制', completed: false },
    ],
    notes: [
      {
        title: 'TV 25-26 话 vs EOE：两种结局',
        content: `## 两个结局的对比

### TV 版 25-26 话
- **形式**: 极度实验性，大量静止画、文字、线稿
- **视角**: 内心独白，角色的自我审视
- **结论**: 真嗣在补完中理解了"自己也可以存在"
- **最终台词**: "恭喜你！" (おめでとう)
- **本质**: 心理治疗式的内在解决

### The End of Evangelion (EOE)
- **形式**: 极致的影像暴力与美学
- **视角**: 外部世界的物理过程
- **结论**: 真嗣拒绝补完，选择回到有痛苦的世界
- **最终场景**: 海边的真嗣与明日香，"真是令人作呕"
- **本质**: 存在主义式的选择

### 演出手法对比
| 手法 | TV 25-26 | EOE |
|------|----------|-----|
| 镜头语言 | 极简 / 抽象 | 极繁 / 具象 |
| 叙事 | 非线性、碎片化 | 线性但多线交叉 |
| 角色呈现 | 文字 + 独白 | 动作 + 表情 |
| 观众体验 | 内省 / 催眠式 | 震撼 / 压倒性 |
| 预算 | 极低（无奈之举？）| 充足 |

### 庵野的立场
两者并非互斥，而是同一事件的两面：
- TV 版 = 补完的**内在体验**
- EOE = 补完的**外在过程**

> "TV 版和剧场版本质上在讲同一件事，只是角度不同。"`,
      },
    ],
  },
  {
    title: '新剧场版 Rebuild 系列解析',
    description: '对比分析新剧场版四部曲（序/破/Q/终）与原版 TV 的差异，理解 Rebuild 作为"重复与差异"的元叙事，以及《终》作为庵野秀明与 EVA 的最终和解。',
    status: 'TODO',
    priority: 'MEDIUM',
    objectives: [
      '梳理新剧场版的剧情偏离点与新设定',
      '理解"循环论"与元叙事解读',
      '分析《破》中真嗣的主动性觉醒',
      '解读《Q》的 14 年空白与叙事断裂',
      '理解《终》的"再见，所有的 EVA"的元层面含义',
    ],
    resources: [
      { title: 'Rebuild of Evangelion - EvaGeeks', url: 'https://wiki.evageeks.org/Rebuild_of_Evangelion', type: 'wiki' },
      { title: 'Thrice Upon a Time Analysis', url: 'https://wiki.evageeks.org/Evangelion:_3.0%2B1.0_Thrice_Upon_a_Time', type: 'wiki' },
      { title: '庵野秀明 2021 访谈', url: 'https://www.nhk.or.jp/professional/2021/0322/', type: 'article' },
    ],
    milestones: [
      { title: '序 - 忠实重制的意义', completed: false },
      { title: '破 - 偏离与希望', completed: false },
      { title: 'Q - 断裂与绝望', completed: false },
      { title: '终 - 告别与和解', completed: false },
    ],
    notes: [
      {
        title: 'Rebuild 循环论与元叙事',
        content: `## 循环论 (Loop Theory)

### 核心假说
Rebuild 并非"重制"，而是 TV 版 / EOE 之后的**又一次循环**。

### 证据线索
1. **海洋颜色**: Rebuild 开场海洋是红色的（第三次冲击后的特征）
2. **月球血迹**: 月球上有类似 EOE 中 Lilith 面具的血痕
3. **真嗣的既视感**: 序中多次出现似曾相识的暗示
4. **渚薰的台词**: "这次一定会让你幸福"（暗示有前次经验）
5. **Dead Sea 对比**: 死海文书内容与 TV 版不同

### 各部的叙事功能
| 部 | 与 TV 版关系 | 叙事功能 |
|----|-------------|----------|
| 序 | 几乎相同 | 建立"重复"的基调 |
| 破 | 开始偏离 | 注入希望与可能性 |
| Q  | 完全断裂 | 打破舒适区，制造绝望 |
| 终 | 全新结局 | 和解、告别、走出循环 |

### 《终》的元叙事
- 最终决战发生在"摄影棚"——打破第四面墙
- 碇源堂获得了完整的心理解析（TV 版未有）
- 真嗣选择了"没有 EVA 的世界"
- 最终画面从动画过渡到实拍 → 回到现实

> "再见了，所有的 Evangelion" 既是角色的告别，也是创作者的告别。`,
      },
    ],
  },
]

// ─── Main ────────────────────────────────────────────────────
async function main() {
  console.log('Adding Evangelion content analysis data...\n')

  // Get current max position for tasks to avoid position conflicts
  const maxTaskPosition = await prisma.task.aggregate({ _max: { position: true } })
  const startPosition = (maxTaskPosition._max.position ?? -1) + 1

  // Create category group
  console.log('Creating category group...')
  const group = await prisma.categoryGroup.create({
    data: {
      name: EVANGELION_GROUP.name,
      position: EVANGELION_GROUP.position,
    },
  })
  console.log(`  + Group: ${group.name}`)

  // Create category
  console.log('Creating category...')
  const category = await prisma.category.create({
    data: {
      name: EVANGELION_CATEGORY.name,
      color: EVANGELION_CATEGORY.color,
      position: EVANGELION_CATEGORY.position,
      groupId: group.id,
    },
  })
  console.log(`  + Category: ${category.name}`)

  // Create quests
  console.log('Creating quests...')
  for (let i = 0; i < QUESTS.length; i++) {
    const quest = QUESTS[i]

    const task = await prisma.task.create({
      data: {
        title: quest.title,
        description: quest.description,
        status: quest.status,
        priority: quest.priority,
        position: startPosition + i,
        categories: { connect: [{ id: category.id }] },
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

  // Summary
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
