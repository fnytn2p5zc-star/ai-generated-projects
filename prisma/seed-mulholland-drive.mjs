import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ─── Category Group ──────────────────────────────────────────
const FILM_GROUP = { name: '电影深度解析', position: 11 }

// ─── Category ────────────────────────────────────────────────
const MULHOLLAND_CATEGORY = { name: '穆赫兰道', color: '#1E3A5F', position: 0 }

// ─── Quests ──────────────────────────────────────────────────
const QUESTS = [
  // ===== Quest 1: 叙事结构与梦境迷宫 =====
  {
    title: '穆赫兰道：叙事结构与梦境迷宫',
    description: '从宏观结构层面解剖大卫·林奇《穆赫兰道》的双重叙事体系——前 2/3 的梦境叙事与后 1/3 的现实叙事如何构成互文关系，蓝色盒子作为结构枢纽的意义，以及林奇如何用非线性叙事将观众置于"解谜"的位置。',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    objectives: [
      '建立梦境叙事与现实叙事的完整对应关系',
      '理解"蓝色钥匙/蓝色盒子"作为结构转折装置的功能',
      '梳理影片中至少三条并行叙事线的运作逻辑',
      '分析林奇如何利用观众的叙事期待制造颠覆',
    ],
    resources: [
      { title: 'David Lynch - Mulholland Drive: 10 Clues', url: 'https://www.mulholland-drive.net/studies/10clues.htm', type: 'article' },
      { title: 'Film Comment - Mulholland Dr. Analysis', url: 'https://www.filmcomment.com/article/mulholland-dr-david-lynch/', type: 'article' },
      { title: 'Criterion Collection - Mulholland Dr.', url: 'https://www.criterion.com/films/29205-mulholland-dr', type: 'other' },
    ],
    milestones: [
      { title: '梦境段落完整梳理', completed: true },
      { title: '现实段落重构', completed: true },
      { title: '梦境-现实对应表', completed: false },
      { title: '叙事结构论文级总结', completed: false },
    ],
    notes: [
      {
        title: '双重叙事结构全解',
        content: `## 穆赫兰道的叙事拓扑

### 总体结构

《穆赫兰道》并非"前半段是梦，后半段是现实"这种简单的二元划分。更精确地说，影片的叙事结构是一个**莫比乌斯环**——梦境与现实在蓝色盒子处发生拓扑翻转，但两侧并不是简单的映射，而是充满了位移、凝缩与变形。

\`\`\`
影片结构示意:

[开场] 吉特巴舞蹈 → 枕头 → 进入梦境
  │
  ├─ [梦境段落] (约 0:00 - 1:55)
  │   ├── A线: Betty 与 Rita 的侦探故事
  │   ├── B线: Adam Kesher 导演困境
  │   ├── C线: 杀手 Joe 的黑色幽默
  │   ├── D线: Winkie's 餐厅的恐惧预兆
  │   └── E线: 神秘的 Cowboy
  │
  ├─ [枢纽] Club Silencio → 蓝色盒子打开
  │
  ├─ [现实段落] (约 1:55 - 2:27)
  │   ├── Diane Selwyn 的真实生活
  │   ├── 与 Camilla 的关系
  │   ├── 雇凶杀人
  │   └── 崩溃与自杀
  │
  [闭合] Club Silencio 的蓝发女人: "Silencio"
\`\`\`

### 梦境的运作逻辑

林奇对梦境的呈现不是幻想文学式的"另一个世界"，而是严格遵循弗洛伊德《梦的解析》中的**梦工作(Dream-Work)**机制：

| 梦工作机制 | 定义 | 影片中的体现 |
|-----------|------|------------|
| **凝缩** (Condensation) | 多个元素压缩为一个形象 | Rita 同时是 Camilla、受害者、欲望对象 |
| **位移** (Displacement) | 情感从真实对象转移到替代物 | 对 Camilla 的恨 → 转移为对"好莱坞阴谋"的愤怒 |
| **象征化** (Symbolization) | 抽象概念转化为具体意象 | 蓝色钥匙 = 死亡/真相的开启 |
| **二次修正** (Secondary Revision) | 梦尝试让自己"合理化" | Betty 的侦探叙事 = 梦给混乱赋予"好莱坞类型片"的外壳 |

### 三条主线的梦境功能

**A线 (Betty/Rita)** — 愿望满足
- Betty = Diane 理想化的自我（天真、有才华、被所有人喜爱）
- Rita = 失忆的 Camilla（失去权力，变得依赖 Diane/Betty）
- 核心愿望：**权力关系倒转** —— 现实中 Diane 依赖 Camilla，梦中 Rita 依赖 Betty

**B线 (Adam Kesher)** — 报复幻想
- 现实中 Adam 是夺走 Camilla 的人 → 梦中他被各种力量羞辱
- 妻子出轨、被黑手党胁迫、失去一切
- 核心愿望：**看到情敌遭受惩罚**

**C线 (杀手 Joe)** — 焦虑处理
- 现实中 Diane 雇了杀手 → 梦中杀手是个笨手笨脚的废物
- 枪声引发连锁混乱 → 喜剧化处理消解了谋杀的道德重量
- 核心功能：**将谋杀的罪恶感转化为黑色喜剧**`,
      },
      {
        title: '蓝色盒子：结构枢纽的多重解读',
        content: `## 蓝色盒子 (Blue Box) 深度解析

### 作为叙事装置

蓝色盒子是影片最重要的结构性道具。它不是一个需要被"解释"的符号，而是一个**叙事拓扑学上的奇点** —— 梦境在此处坍缩，现实从坍缩中浮现。

\`\`\`
叙事拓扑:

梦境表面 ──────────────────────── 现实表面
    ↑                                  ↑
    │    [蓝色盒子 = 拓扑翻转点]       │
    │         ╔═══════╗                │
    └─────────║ 打开  ║────────────────┘
              ╚═══════╝

打开盒子 = 梦的莫比乌斯环被剪开 = 暴露了"另一面"
\`\`\`

### 蓝色钥匙在两个世界中的含义

| 属性 | 梦境中 | 现实中 |
|------|--------|--------|
| 物理形态 | 神秘的三角形蓝色钥匙 | 普通钥匙 |
| 获取方式 | Rita 手提包中发现 | 杀手完成任务后放在约定地点 |
| 对应动作 | 打开蓝色盒子 → 梦境坍缩 | 确认 Camilla 已死 |
| 象征层 | 通往真相的钥匙 | 通往罪恶的钥匙 |

### 打开盒子的那一刻

这是影片最关键的 30 秒：

1. Betty 消失了（梦中的理想自我无法面对即将到来的真相）
2. Rita 独自打开盒子（被害者"自己"揭开死亡的面纱）
3. 摄影机坠入盒子的黑暗中（观众被迫从梦中跌落）
4. Aunt Ruth 的空房间（梦的舞台已空）

> 蓝色盒子不是一个谜题的答案，它是"答案"这个概念本身的瓦解。林奇从不给你钥匙——他给你一扇门，门后面是另一扇门。

### 与Club Silencio的关系

蓝色盒子出现在 Club Silencio 之后。这个顺序至关重要：
- Club Silencio 宣告了"一切都是幻觉"的主题
- 蓝色盒子是这个宣告的**物质化执行**
- 从"知道这是幻觉"到"幻觉真的被打破"之间，有一段令人战栗的延迟

这段延迟就是影片最核心的情感体验：**你已经知道梦要碎了，但你无力阻止**。`,
      },
      {
        title: '梦境-现实完整对应关系表',
        content: `## 梦境与现实的对应关系

### 角色映射

| 梦境身份 | 现实身份 | 变形逻辑 |
|---------|---------|---------|
| Betty Elms | Diane Selwyn | 理想化自我：天真、才华横溢、人见人爱 |
| Rita（失忆） | Camilla Rhodes | 权力倒转：从高高在上变为无助依赖 |
| Adam Kesher（被迫害的导演） | Adam Kesher（成功导演） | 报复幻想：把情敌变成受害者 |
| Coco（公寓女房东） | Coco（Adam 的母亲） | 位移：慈爱的保护者 → 审视者 |
| Camilla Rhodes（金发女演员） | Melissa George 角色 | 凝缩：威胁者的面孔被替换 |
| 杀手 Joe（笨拙废物） | 杀手（高效专业） | 防御机制：消解谋杀的严重性 |
| Cowboy | 派对上的模糊面孔 | 梦的审查员/超我的化身 |
| Winkie's 后面的流浪汉 | Diane 内心恐惧的具象化 | 梦中最原始的恐惧投射 |

### 空间映射

| 梦境空间 | 现实空间 | 变形逻辑 |
|---------|---------|---------|
| Aunt Ruth 的豪华公寓 | Diane 的破旧公寓 | 环境理想化 |
| Mulholland Drive（危险与冒险） | Mulholland Drive（通往派对的路） | 相同地标，不同叙事功能 |
| Club Silencio | 不直接对应 | 纯粹的梦之空间，主题枢纽 |
| Adam 的豪宅 | Adam 的豪宅（派对场景） | 几乎未变形 |
| Winkie's 餐厅 | Winkie's 餐厅（雇凶地点） | 空间相同，情感截然不同 |

### 事件映射

| 梦境事件 | 现实事件 | 梦工作机制 |
|---------|---------|-----------|
| Rita 车祸失忆 | Diane 希望 Camilla "消失" | 愿望的象征化满足 |
| Betty 试镜惊艳全场 | Diane 试镜失败/平庸 | 补偿性幻想 |
| "This is the girl" 被强制选角 | Camilla 凭实力/关系获得角色 | 将失败归因于阴谋 |
| Rita 在 Betty 帮助下寻找身份 | Diane 在 Camilla 帮助下进入圈子 | 依赖关系的翻转 |
| Betty 与 Rita 的性爱场景 | Diane 与 Camilla 的真实关系 | 理想化的亲密 vs 痛苦的现实 |
| 杀手搞砸任务 | 杀手成功完成任务 | 罪恶感的防御性处理 |

### 情感映射

| 梦境情感 | 现实情感 | 转化方式 |
|---------|---------|---------|
| 对 Rita 的保护欲 | 对 Camilla 的占有欲 | 美化：占有 → 保护 |
| 对好莱坞阴谋的愤怒 | 对自己失败的自恨 | 外化：内在缺陷 → 外部阴谋 |
| 侦探般的好奇与兴奋 | 绝望与嫉妒 | 升华：痛苦 → 冒险 |
| Club Silencio 的悲伤 | 失去 Camilla 的哀痛 | 梦开始裂缝——真实情感渗入 |`,
      },
    ],
  },

  // ===== Quest 2: Betty/Diane 身份断裂 =====
  {
    title: '穆赫兰道：Betty/Diane 的身份断裂与欲望辩证法',
    description: '以精神分析（弗洛伊德、拉康）与女性主义视角，深度剖析 Diane Selwyn 如何在梦境中将自己分裂为 Betty Elms，这一分裂如何映射了欲望、嫉妒、自恨与好莱坞体制对女性身份的异化。',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    objectives: [
      '用拉康的镜像阶段理论分析 Betty 与 Diane 的关系',
      '理解 Diane 的自恋性客体选择如何导致自我毁灭',
      '分析"好莱坞梦想"作为意识形态装置对 Diane 身份的塑形',
      '解读影片中"看与被看"的视觉政治',
    ],
    resources: [
      { title: 'Lacan - The Mirror Stage', url: 'https://www.lacan.com/zizek-films.htm', type: 'article' },
      { title: 'Laura Mulvey - Visual Pleasure and Narrative Cinema', url: 'https://www.amherst.edu/system/files/media/1021/Laura%20Mulvey%2C%20Visual%20Pleasure.pdf', type: 'article' },
      { title: 'Todd McGowan - The Impossible David Lynch', url: 'https://www.amazon.com/Impossible-David-Lynch/dp/0231139896', type: 'book' },
    ],
    milestones: [
      { title: 'Betty 作为理想自我的分析', completed: true },
      { title: 'Diane 的自恋结构', completed: false },
      { title: '好莱坞意识形态批判', completed: false },
      { title: '女性主义视角解读', completed: false },
    ],
    notes: [
      {
        title: 'Betty/Diane：拉康式的自我分裂',
        content: `## 镜像阶段与理想自我

### 拉康的镜像阶段 (Mirror Stage) 快速回顾

拉康理论的核心洞见：**"我"是一个建构物**。婴儿在镜子中看到自己的完整形象，将这个"完整的他者"认同为自己。但这个认同是一种**误认(méconnaissance)**——真实的自我是破碎的、不协调的，而镜像中的自我是完美的、统一的。

> **Ideal-I (理想自我)** = 镜中完美的形象
> **Actual I (真实自我)** = 破碎的、匮乏的主体

### Betty 就是 Diane 的镜像

\`\`\`
现实 Diane                     梦境 Betty
━━━━━━━━━━━━                   ━━━━━━━━━━━━
失败的演员                      天赋异禀、一鸣惊人
被 Camilla 抛弃                 Rita 完全依赖她
嫉妒、自恨、愤怒                 乐观、善良、充满爱
住在破旧公寓                    住在 Aunt Ruth 的豪宅
被好莱坞抛弃                    刚到好莱坞、充满可能
谋杀了爱人                      正在"拯救"爱人
            ↑                            ↑
         真实自我                      理想自我
         (破碎)                       (完美镜像)
\`\`\`

### 关键：Betty 不是"另一个人"

Betty 不是 Diane 的"另一个版本"——**Betty 是 Diane 对自己的凝视所产生的幻象**。这不是科幻片式的平行宇宙，而是精神分析意义上的自我建构：

1. **Betty 的"天真"** = Diane 否认自己的阴暗面
2. **Betty 的才华** = Diane 压抑的全能感幻想
3. **Betty 的善良** = Diane 对自身罪恶的反向形成（reaction formation）

### 试镜场景：镜像的裂缝

Betty 的试镜是梦境中最值得分析的段落之一：

- 在公寓排练时：Betty 的表演平庸、业余
- 在正式试镜时：Betty 突然展现出令人窒息的性感与力量

**为什么会有这种断裂？**

因为试镜场景是**梦中之梦**——Diane 的补偿幻想在这里达到了二次方。第一层梦已经把她变成了 Betty，但 Betty 在家中排练仍然"不够好"（现实焦虑的残余）。第二层强化让她在镜头前彻底绽放——这是愿望满足的极致形态。

> 试镜场景中 Betty 的表演之所以令人不安，是因为它**太好了**——它超越了现实主义的范畴，进入了幻想的领域。观众在这里同时感受到角色的魅力和梦境的虚假。`,
      },
      {
        title: 'Diane 的自恋与自我毁灭',
        content: `## Diane Selwyn 的心理解剖

### 自恋性客体选择

弗洛伊德区分了两种爱的模式：
- **依附型** (Anaclitic): 爱那些照顾/保护自己的人
- **自恋型** (Narcissistic): 爱那些代表"自己想成为的样子"的人

Diane 对 Camilla 的爱是**纯粹的自恋性客体选择**：

\`\`\`
Diane 爱 Camilla，因为:
  ├── Camilla 是 Diane 想成为的人（美丽、成功、被欲望）
  ├── Camilla 的存在确认了 Diane 的品味/价值
  ├── 拥有 Camilla = 间接拥有 Camilla 的属性
  └── 失去 Camilla = 失去理想化的自我部分
\`\`\`

这解释了为什么失去 Camilla 对 Diane 来说不仅是"失恋"，而是**存在性的毁灭**——她不是失去了一个爱人，而是失去了唯一能让自己感觉"有价值"的镜像。

### 从嫉妒到谋杀的心理路径

\`\`\`
阶段 1: 理想化
  "Camilla 太完美了，我爱她"
  ↓
阶段 2: 融合
  "Camilla 和我是一体的，她的成功就是我的成功"
  ↓
阶段 3: 裂痕
  "Camilla 有了别人（Adam），她不再只属于我"
  ↓
阶段 4: 自恋性暴怒
  "如果她不属于我，她就不应该存在"
  ↓
阶段 5: 谋杀
  "杀死 Camilla = 消除背叛的证据 = 否认自己不够好的事实"
  ↓
阶段 6: 崩溃
  "但杀了她之后，我连镜像都没有了"
  ↓
阶段 7: 梦境
  "在梦中重建一切：一个更好的我、一个需要我的她"
  ↓
阶段 8: 梦醒
  "什么都挽回不了了"
  ↓
阶段 9: 自杀
  "消灭那个杀了 Camilla 的 Diane"
\`\`\`

### Diane 的派对场景：所有的防线同时崩塌

Mulholland Drive 上那场派对是理解 Diane 心理状态的关键：

1. **空间**: Adam 的豪宅 —— Diane 进入了"敌人"的领地
2. **Camilla 的宣告**: 暗示与 Adam 订婚 —— Diane 的最后幻想破灭
3. **另一个金发女人的吻**: Camilla 当着 Diane 的面与另一个女人亲密
4. **Diane 的表情**: 不是愤怒，是彻底的坍缩

> 这场派对是 Diane 决定雇凶的直接导火索，但更深层地说，这是她意识到自己**永远无法成为 Camilla 的世界中的一部分**的时刻。不是被抛弃——是被证明从未真正属于过。`,
      },
    ],
  },

  // ===== Quest 3: 关键场景深度解读 =====
  {
    title: '穆赫兰道：关键场景逐帧解读',
    description: '对影片中最重要的四个场景进行逐镜头级别的深度分析：Winkie\'s 餐厅的梦中梦、Betty 的试镜、Club Silencio 以及最终的崩溃蒙太奇。理解林奇如何通过视听语言构建存在性恐惧。',
    status: 'TODO',
    priority: 'HIGH',
    objectives: [
      '分析 Winkie\'s 场景的恐惧建构机制',
      '解读 Club Silencio 的哲学意涵与情感功能',
      '理解试镜场景中"表演"的多重含义',
      '分析结尾蒙太奇中幻觉、记忆与现实的交叠',
    ],
    resources: [
      { title: 'Slavoj Žižek on Lynch', url: 'https://www.lacan.com/zizek-lynch.htm', type: 'article' },
      { title: 'David Lynch: The Art Life (Documentary)', url: 'https://www.imdb.com/title/tt4009370/', type: 'video' },
      { title: 'Mulholland Drive Scene Analysis - Nerdwriter', url: 'https://www.youtube.com/watch?v=CXZK0Binfk4', type: 'video' },
    ],
    milestones: [
      { title: 'Winkie\'s 餐厅场景分析', completed: false },
      { title: 'Club Silencio 全面解读', completed: false },
      { title: '试镜场景与"表演性"', completed: false },
      { title: '结尾蒙太奇逐镜头', completed: false },
    ],
    notes: [
      {
        title: 'Winkie\'s 餐厅：纯粹恐惧的建筑学',
        content: `## Winkie's 场景 —— 影史最伟大的恐惧场景之一

### 场景概要

Dan 向 Herb 讲述自己的一个噩梦：在这家 Winkie's 餐厅里，有一个可怕的面孔在墙后面。然后他们走出去，那个面孔真的出现了。Dan 昏倒（可能死亡）。

### 为什么这个场景令人恐惧

这个场景没有血腥、没有追逐、没有 jump scare。它的恐惧完全是**结构性的**：

**第一层：叙事预告**
- Dan 先讲述了自己的梦
- 观众知道"他们会去看"
- 恐惧来自于**不可避免性** —— 你知道可怕的事情会发生，但无法阻止叙事前进

**第二层：梦的递归**
- Dan 在一部关于梦的电影里讲述自己做的梦
- 梦中他在这家餐厅→现在他真的在这家餐厅
- 梦-现实的边界在这里被有意模糊
- 观众不确定这一幕本身是不是"梦中的梦中的梦"

**第三层：视听控制**

林奇在这个场景中的镜头语言是一堂大师课：

| 技法 | 运用 | 效果 |
|------|------|------|
| 缓慢推进 | 走向墙角的过程极度缓慢 | 拉伸恐惧的时间体验 |
| Angelo Badalamenti 配乐 | 极低频嗡鸣 + 心跳节奏 | 生理层面的不安 |
| 浅景深 | 墙角始终模糊 | 不确定性 = 恐惧的温床 |
| 反向镜头缺失 | 不给 Dan 的反应镜头 | 观众失去"代理人" |
| 面孔的出现 | 比预期更快、更突然 | 打破缓慢节奏建立的预期 |

### 在影片中的叙事功能

Winkie's 场景在影片的第 10 分钟左右出现，此时观众还不知道"这是梦"。但这个场景**已经告诉了观众一切**：

1. **"有一个人在墙后面"** = 现实（Diane）隐藏在梦境背后
2. **Dan 的恐惧** = 梦者（Diane）对自己真实面目的恐惧
3. **面孔出现导致昏厥/死亡** = 面对真相 = 自我的崩溃
4. **流浪汉形象** = Diane 的自我厌恶的具象化（蓬头垢面、躲在阴影中）

> 整个场景是一个**微缩版的穆赫兰道**：有人讲述一个关于恐惧的故事，然后走向恐惧的源头，发现恐惧是真实的，然后崩溃。这就是 Diane 的故事。`,
      },
      {
        title: 'Club Silencio：一切都是幻觉',
        content: `## Club Silencio —— 影片的哲学核心

### "No hay banda!"

> "No hay banda! There is no band! Il n'est pas de orquestre! This is all a tape recording. And yet... we hear a band."

这段台词是理解整部影片的钥匙。翻译成影片的语境：

> "没有乐队"= 没有真实的故事
> "这全是录音"= 你看到的一切都是构造的
> "但我们仍然听到了乐队"= 即使知道是假的，情感仍然是真的

### Rebekah Del Rio 的表演

当 Rebekah Del Rio 演唱《Llorando》(Crying 的西班牙语版) 时：

1. Betty 和 Rita 开始流泪——她们被打动了
2. Del Rio 突然倒在舞台上——但歌声继续
3. **歌声是预录的**——表演者只是在对口型

**这个揭示意味着什么？**

\`\`\`
层级 1 (影片内): 表演是假的，但情感是真的
层级 2 (角色层): Betty/Rita 即将发现她们的"故事"也是假的
层级 3 (观众层): 我们正在看的电影也是"录制"的，但我们的感动是真的
层级 4 (存在论): 所有的叙事、身份、关系都可能是"录音"
        但这不意味着它们不重要
\`\`\`

### 为什么 Betty 和 Rita 在哭

表面上她们在为音乐的美感动。但这是**梦在自我拆解**：

- 梦者（Diane）的潜意识已经知道这一切是假的
- Club Silencio 是梦的**内在良心**在发出警告
- Betty 和 Rita 的泪水是**预感性的哀悼**——哀悼即将失去的幻象
- 蓝色盒子随后在 Rita 的手提包中出现——梦的自我毁灭已经开始

### Club Silencio 的空间设计

剧院的设计是一个**内心空间的外化**：
- 红色帷幕 → 林奇标志性元素（参考《双峰》红房间）
- 空旷的舞台 → 幻象被剥除后的虚空
- 深蓝色灯光 → 梦的颜色，也是死亡的颜色
- 主持人的魔术师造型 → 梦的导演/操控者

### Club Silencio 与柏拉图洞穴

Club Silencio 本质上是柏拉图洞穴寓言的变体：

| 洞穴寓言 | Club Silencio |
|---------|--------------|
| 洞穴墙壁上的影子 | 舞台上的"演出" |
| 囚徒以为影子是真实 | Betty/Rita 以为演唱是真实的 |
| 转身看到火把 | Del Rio 倒下但歌声继续 |
| 走出洞穴 = 面对真实 | 打开蓝色盒子 = 面对现实 |
| 重返洞穴的痛苦 | Diane 醒来后的崩溃 |

> 但林奇比柏拉图走得更远：柏拉图说洞穴外有"真实"，林奇说——**也许洞穴外面还是洞穴**。也许"现实段落"的 Diane 也只是另一层叙事。这就是为什么影片的最后一个镜头回到了 Club Silencio。`,
      },
    ],
  },

  // ===== Quest 4: 大卫·林奇的梦境语法 =====
  {
    title: '穆赫兰道：大卫·林奇的梦境语法与影像诗学',
    description: '从导演作者论的角度，分析大卫·林奇独特的电影语言如何在《穆赫兰道》中达到巅峰——包括他对声音设计的极致运用、对经典好莱坞美学的颠覆性引用、对"不可表达之物"的影像化策略，以及他与超现实主义传统的关系。',
    status: 'TODO',
    priority: 'MEDIUM',
    objectives: [
      '分析林奇的声音设计如何塑造"不安"的感官体验',
      '理解林奇对 1950s 好莱坞美学的双重态度（迷恋与解构）',
      '将《穆赫兰道》置于林奇整体创作谱系中的位置',
      '探讨林奇与超现实主义（布努埃尔、达利）的关系',
    ],
    resources: [
      { title: 'Michel Chion - David Lynch (法语电影理论)', url: 'https://www.amazon.com/David-Lynch-Michel-Chion/dp/0851706460', type: 'book' },
      { title: 'Lynch on Lynch - Interviews', url: 'https://www.amazon.com/Lynch-Revised-David/dp/0571220186', type: 'book' },
      { title: 'Angelo Badalamenti explains Mulholland Dr. Theme', url: 'https://www.youtube.com/watch?v=RegHMfhrk4Q', type: 'video' },
    ],
    milestones: [
      { title: '声音设计与 Angelo Badalamenti', completed: false },
      { title: '1950s 好莱坞美学的引用与颠覆', completed: false },
      { title: '林奇创作谱系中的定位', completed: false },
      { title: '超现实主义传统的继承与超越', completed: false },
    ],
    notes: [
      {
        title: '声音的暴力：Angelo Badalamenti 与林奇的声景',
        content: `## 声音设计：穆赫兰道的第二个叙事层

### 林奇的声音哲学

大卫·林奇曾说：

> "电影中 50% 是声音。声音与画面结合的时候，产生的效果远大于两者之和。"

在《穆赫兰道》中，声音不是画面的伴奏，而是**独立的叙事力量**。

### Angelo Badalamenti 的配乐策略

| 场景 | 音乐特征 | 情感功能 |
|------|---------|---------|
| Betty 到达洛杉矶 | 明亮的弦乐、大调 | 模拟 1950s 好莱坞"梦想到达"叙事 |
| Betty 与 Rita 的侦探段落 | 爵士noir风格 | 模拟经典黑色电影 |
| Winkie's 场景 | 极低频嗡鸣 | 纯粹的生理恐惧 |
| Betty 与 Rita 的爱情场景 | 缓慢的弦乐哀歌 | 美丽但注定消逝的悲剧感 |
| Club Silencio | 寂静→Llorando | 从虚空到情感爆发 |
| 现实段落 | 几乎没有配乐 | 失去音乐=失去幻想的保护 |

### Badalamenti 的创作过程

Badalamenti 描述过他们创作主题曲的过程：

> "David 坐在我旁边说：'你在一条黑暗的街道上。你不知道会发生什么。你感到恐惧。但你不知道为什么。开始弹。' 然后他会一点点给我场景的画面。主题曲就是这样一个音符一个音符地长出来的。"

这个方法揭示了林奇的核心美学：**情感先于叙事**。他不是先有故事再配音乐，而是先建立一种氛围（恐惧、渴望、迷失），然后让故事在氛围中生长。

### 声音设计的三个层次

**1. 环境音层 (Ambience)**
- 持续的低频嗡鸣（类似空调或电流声）
- 贯穿全片，几乎不中断
- 功能：制造"不对劲"的底层感受，让观众无法完全放松

**2. 音效层 (Sound Effects)**
- 刻意"错位"的声音：金属摩擦声出现在不该有金属的场景
- 声音的延迟或提前：你听到门关的声音，但门还没关
- 功能：打破时空连贯性，暗示梦的本质

**3. 音乐层 (Score)**
- 从不"解释"画面，而是**对抗**画面
- 例：美丽的场景配以不安的和声
- 功能：让观众的情感处于"不确定"状态——这是美好的还是可怕的？

### 寂静的运用

影片中最有力量的声音设计是**寂静**。两个关键时刻：

1. **蓝色盒子打开前**: 所有声音消失，几秒钟的绝对寂静→然后是坠落
2. **Diane 自杀前**: 枪声之前的寂静比枪声本身更令人窒息

> 林奇理解一个声学真理：恐惧不在于大声，而在于寂静之后你不知道会听到什么。`,
      },
      {
        title: '好莱坞美学的引用与解构',
        content: `## 林奇的好莱坞：迷恋与毁灭

### 双重态度

林奇对好莱坞的态度是深刻矛盾的：

- **迷恋**: 他真诚地热爱经典好莱坞的视觉语言——霓虹灯、棕榈树、落日大道
- **恐惧**: 他看到了这些美丽表象之下的暴力、剥削与幻灭

《穆赫兰道》就是这种矛盾的完美表达：**前半段是对好莱坞梦的深情致敬，后半段是对同一个梦的残忍拆解**。

### 被引用的好莱坞类型

| 类型 | 引用方式 | 颠覆方式 |
|------|---------|---------|
| **黑色电影** (Film Noir) | Betty/Rita 的侦探情节、夜景、谜案 | 侦探叙事没有解答——因为它是梦 |
| **好莱坞追梦故事** | Betty 初到好莱坞、试镜成功 | "追梦"叙事被揭示为补偿性幻想 |
| **浪漫爱情片** | Betty 与 Rita 的爱情 | 爱情的基础是权力倒错和自恋投射 |
| **黑帮/阴谋片** | 神秘的"选角黑幕" | 所谓的阴谋只是失败者为自己找的借口 |
| **恐怖片** | Winkie's 场景、墙后的面孔 | 恐惧的来源不是外部，而是自我 |

### "日落大道"的回响

《穆赫兰道》与比利·怀尔德的《日落大道》(Sunset Boulevard, 1950) 有深刻的互文关系：

\`\`\`
《日落大道》                   《穆赫兰道》
━━━━━━━━━━                   ━━━━━━━━━━
Norma Desmond:                Diane Selwyn:
过气女星，活在幻想中           失败女演员，活在梦境中

Joe Gillis:                   Betty/Camilla:
被利用的男性工具               被梦/欲望塑造的客体

豪宅 = 幻想的封闭空间          Aunt Ruth 公寓 = 梦的封闭空间

"我一直很大，                  "这不是我的梦，
是电影变小了"                  是好莱坞的梦在操控我"

结局: 在摄影机前               结局: 在幻觉中
彻底疯狂                       彻底崩溃
\`\`\`

### Mulholland Drive 这条路

"Mulholland Drive" 不仅是片名，也是一条真实的道路：

- 它蜿蜒在好莱坞山上，连接着**电影工业的心脏**和**荒凉的山谷**
- 一侧是灯火辉煌的好莱坞，另一侧是荒芜的山地
- 这条路本身就是一个隐喻：**在光明与黑暗、幻想与现实之间**

影片开场的车祸发生在这条路上——在通往好莱坞梦想的路上，有人"失忆"了。或者说：**进入好莱坞的代价，就是失去你自己**。`,
      },
    ],
  },

  // ===== Quest 5: 精神分析与哲学维度 =====
  {
    title: '穆赫兰道：精神分析、存在主义与欲望的不可能性',
    description: '以弗洛伊德、拉康、齐泽克的理论框架，从精神分析维度解读穆赫兰道的核心命题：欲望的不可能满足、幻象的必要性与危险性、主体在象征秩序中的位置，以及"梦醒"为何等于"死亡"。',
    status: 'TODO',
    priority: 'MEDIUM',
    objectives: [
      '用拉康的欲望图(Graph of Desire)分析 Diane 的欲望结构',
      '理解"幻象"(Fantasy)在拉康理论中的功能，以及影片中的对应',
      '分析齐泽克式的"穿越幻象"(Traversing the Fantasy)在影片中的表现',
      '探讨"实在界"(The Real)如何以恐惧的形式入侵梦境',
    ],
    resources: [
      { title: 'Žižek - Looking Awry: An Introduction to Jacques Lacan through Popular Culture', url: 'https://mitpress.mit.edu/books/looking-awry', type: 'book' },
      { title: 'Todd McGowan - Mulholland Drive and the Fantasy of Hollywood', url: 'https://www.jstor.org/stable/25115370', type: 'article' },
      { title: 'Freud - The Interpretation of Dreams (Chapter 6)', url: 'https://www.gutenberg.org/files/38219/38219-h/38219-h.htm', type: 'book' },
    ],
    milestones: [
      { title: '弗洛伊德梦理论在影片中的应用', completed: false },
      { title: '拉康式欲望结构分析', completed: false },
      { title: '齐泽克与"穿越幻象"', completed: false },
      { title: '"实在界"的入侵', completed: false },
    ],
    notes: [
      {
        title: '拉康三界与穆赫兰道',
        content: `## 拉康的三界 (Three Orders) 与穆赫兰道

### 三界概述

拉康将人类经验划分为三个相互交织的维度：

\`\`\`
        想象界 (Imaginary)
          /              \\
     认同 / 镜像          \\  形象 / 幻觉
        /                  \\
象征界                    实在界
(Symbolic)────────────(The Real)
  语言/法则/结构        不可能/创伤/空洞
\`\`\`

### 穆赫兰道中的三界

**想象界 = 梦境段落**
- Betty 的完美形象 = 镜像认同
- Betty 与 Rita 的二元关系 = 想象性的自恋融合
- 一切都是"形象"：美丽的、连贯的、可理解的
- 想象界的核心操作 = **误认**：把幻象当作现实

**象征界 = 好莱坞体系 / 叙事结构本身**
- 好莱坞 = 大他者 (Big Other) = 赋予主体位置的象征网络
- "This is the girl" = 象征秩序的任意性裁决
- 选角 = 你在象征秩序中被分配的位置
- Diane 的失败 = 她无法在象征秩序中找到稳固的位置

**实在界 = 蓝色盒子里面 / 墙后面的面孔**
- 实在界是**不可被象征化的创伤性内核**
- Winkie's 后面的流浪汉 = 实在界的入侵
- 蓝色盒子内部的黑暗 = 实在界的空洞
- Diane 的罪恶 = 无法被梦消化的"实在"

### 欲望的结构

拉康的核心命题：**欲望永远是他者的欲望**。

\`\`\`
Diane 的欲望链:

"我想要 Camilla"
    ↑ 但为什么？
"因为 Camilla 拥有我想要的东西（成功、美丽、被欲望）"
    ↑ 但为什么想要这些？
"因为好莱坞告诉我这些东西有价值"
    ↑ 好莱坞 = 大他者
"Diane 的欲望不是她自己的——它是大他者植入的"
    ↑ 所以
"Diane 不是在追求 Camilla，她是在追求大他者的认可"
    ↑ 但大他者的认可永远不够
"所以 Diane 的欲望结构性地不可能被满足"
\`\`\`

### 幻象公式: $ ◇ a

拉康的幻象公式: **$ ◇ a** (划杠的主体面对小客体 a)

在穆赫兰道中:
- **$** (划杠的主体) = Diane，一个被匮乏所定义的主体
- **a** (小客体 a / 欲望的原因-对象) = 不是 Camilla 本人，而是 Camilla"身上"那个让 Diane 着迷的不可名状的东西
- **◇** (菱形) = 欲望的关系：既想接近又无法完全获得

> 关键洞见：Diane 爱的不是 Camilla，而是 Camilla 身上的 **objet a**——那个永远无法被拥有的"X"。这就是为什么即使 Diane "拥有"了 Camilla（在她们的关系中），她仍然不满足——因为 objet a 定义性地是"不可获得的"。

### 穿越幻象 vs 沉浸于幻象

齐泽克的概念：**穿越幻象 (Traversing the Fantasy)** = 不是放弃幻象，而是认识到幻象的功能——它是用来**遮蔽匮乏**的屏幕。

\`\`\`
Diane 的悲剧路径:
  沉浸于幻象 (在梦中) → 幻象崩溃 (醒来) → 无法承受 → 死亡

可能的解放路径 (影片未展现):
  认识到幻象是幻象 → 但仍然能够生活 → 接受匮乏是存在的基本条件
\`\`\`

> Club Silencio 的信息本可以是解放性的：**知道一切都是录音（幻象），但仍然为之感动（继续生活）**。但 Diane 做不到——她在幻象崩溃后只能选择毁灭。`,
      },
      {
        title: '梦的审查员：Cowboy 与超我',
        content: `## Cowboy：梦的审查员 / 超我的化身

### 弗洛伊德的梦审查 (Dream Censorship)

在弗洛伊德的模型中，梦有一个"审查机构"——它决定哪些潜意识内容可以进入梦境，哪些必须被变形。审查员的功能不是阻止信息，而是**将不可接受的内容改头换面**。

### Cowboy 作为审查员

Cowboy 在影片中出现三次:
1. 与 Adam Kesher 的夜间对话
2. 派对场景（现实中）
3. 呼唤 Diane 醒来

**第一次出现（梦中）:**

> "你做一次对的选择就能看到我一次。你做两次错的选择就能看到我两次。"

这是**超我的语言**——不是明确的禁令，而是神秘的、威胁性的"道德"训诫。Cowboy 不告诉 Adam（也不告诉 Diane/观众）"正确的选择"是什么——他只是发出**模糊的惩罚威胁**。

这正是超我的运作方式：
- 超我不说"不要做 X"
- 超我说"你知道你应该做什么"
- 主体永远不确定自己是否"做对了"
- **不确定性本身就是惩罚**

**第三次出现（梦-现实边界）:**

Cowboy 出现在 Diane 的卧室门口说"醒来的时候到了"(Hey, pretty girl, time to wake up)。

这是审查机构的**最终失败**：审查员不再能维持梦境，只能通知梦者——梦必须结束了。

### Cowboy 的视觉设计

- 穿着不合时宜的牛仔装扮（在当代洛杉矶）
- 面部几乎没有表情
- 说话方式像谜语
- 出现在孤立、空旷的环境中

这个造型来自**美国神话的深层**——牛仔是美国文化中"法则"的象征（西部片中的执法者）。但在林奇的世界里，法则不是正义的，而是**任意的、不可理解的、恐怖的**。

> Cowboy 是《穆赫兰道》中最"林奇式"的角色：他同时是荒诞的（一个牛仔在好莱坞山上开会）和恐怖的（他代表着某种不可违抗的力量）。这种"荒诞-恐怖"的双重性正是林奇的签名。`,
      },
    ],
  },

  // ===== Quest 6: 好莱坞批判与元叙事 =====
  {
    title: '穆赫兰道：好莱坞梦工厂的自我解剖',
    description: '将《穆赫兰道》视为对好莱坞电影工业体制的系统性批判——从选角政治到性别剥削，从梦想叙事的意识形态功能到"明星制造"的暴力本质。同时分析影片作为"反好莱坞叙事"的元电影维度。',
    status: 'TODO',
    priority: 'MEDIUM',
    objectives: [
      '分析影片中"选角"场景作为好莱坞权力结构的隐喻',
      '理解"好莱坞梦想"作为意识形态装置的运作机制',
      '解读影片的"元电影"维度——关于"观看"与"被观看"',
      '探讨穆赫兰道从电视试播集到院线电影的转变如何影响了作品本身',
    ],
    resources: [
      { title: 'Mulholland Drive: From TV Pilot to Masterpiece', url: 'https://www.bbc.com/culture/article/20161028-mulholland-drive-the-film-that-seduced-us-all', type: 'article' },
      { title: 'Guy Debord - The Society of the Spectacle', url: 'https://en.wikipedia.org/wiki/The_Society_of_the_Spectacle', type: 'article' },
      { title: 'David Lynch - Room to Dream (Autobiography)', url: 'https://www.amazon.com/Room-Dream-David-Lynch/dp/0399592539', type: 'book' },
    ],
    milestones: [
      { title: '选角政治与权力结构', completed: false },
      { title: '梦想意识形态批判', completed: false },
      { title: '元电影维度分析', completed: false },
      { title: '制作历史与文本的关系', completed: false },
    ],
    notes: [
      {
        title: '好莱坞作为意识形态装置',
        content: `## "这就是那个女孩" —— 好莱坞的选角政治

### "This is the girl"

影片中最令人不安的台词之一来自一个神秘的场景：一群西装男在一个阴暗的房间里，面前摆着一张照片。一个人指着照片说：**"This is the girl."**

表面上，这是一个关于"选角被黑幕操控"的阴谋情节。但在更深的层面上，这是一个关于**主体性被剥夺**的寓言：

\`\`\`
"This is the girl" 的多重含义:

1. 字面层: 这个女演员必须被选中（阴谋选角）
2. Diane 的焦虑: 别人靠关系/权力获得角色，不是靠才华
3. 意识形态层: 好莱坞决定"谁是那个女孩"= 谁有资格存在
4. 存在论层: "成为那个女孩"= 在大他者的凝视中获得位置
\`\`\`

### 好莱坞梦想的意识形态功能

阿尔都塞（Althusser）的意识形态理论认为：**意识形态不是虚假意识，而是个体与其真实存在条件之间的"想象性关系"的再现**。

好莱坞梦想正是这样一种意识形态装置：

| 意识形态话语 | 真实条件 |
|------------|---------|
| "任何人都可以成为明星" | 极少数人成功，绝大多数人被消耗 |
| "才华终将被发现" | 权力、关系、外貌决定一切 |
| "追梦是勇敢的" | 追梦让你自愿接受剥削 |
| "好莱坞是梦工厂" | 好莱坞是造梦**也是碎梦**的工厂 |

### Diane 作为意识形态的牺牲品

Diane 的悲剧不仅是个人的——它是结构性的：

1. **她从加拿大来到好莱坞** → 意识形态的"召唤"(interpellation)
2. **她相信才华会被看见** → 接受意识形态的承诺
3. **她失败了** → 但她不能怪意识形态（因为"别人成功了"）
4. **她只能怪自己** → 意识形态的完美陷阱：失败者内化失败
5. **她在梦中重建成功叙事** → 即使在梦中，她仍然在好莱坞的框架内做梦

> Diane 最悲剧的一点不是她失败了，而是**她甚至无法想象好莱坞之外的人生**。她的梦不是关于"快乐"的梦——她的梦是关于"在好莱坞成功"的梦。意识形态已经如此深入，连潜意识都在为它打工。

### 吉特巴舞蹈的含义

影片开场的吉特巴舞蹈比赛：
- 这是 Diane 来好莱坞的"起源故事"——她在加拿大赢了一个舞蹈比赛
- 画面是过曝的、模糊的、像旧照片一样泛黄
- 一对老年夫妇在Diane身边微笑

这个画面是"好莱坞梦"的**最原始形态**：
- 过曝 = 记忆的理想化
- 老年夫妇 = "看着你成功"的观众/父母/社会认可
- 吉特巴 = 1950s 美国文化的标志 = 好莱坞黄金时代

但影片结尾，这对老年夫妇变成了**恐怖的追逐者**，从门缝下钻进来，追着Diane直到她举枪自杀。

> **"认可你的人"最终变成了"审判你的人"** —— 好莱坞的梦想在你失败后会反噬。那对微笑的夫妇 = 社会期待 = 你无法逃脱的"他们对你的凝视"。`,
      },
      {
        title: '从电视试播集到电影：断裂的创造力',
        content: `## 穆赫兰道的制作史：意外的杰作

### 时间线

\`\`\`
1999 年: 林奇为 ABC 电视网拍摄了一集 88 分钟的试播集(Pilot)
   ↓
1999 年: ABC 拒绝了这个试播集——觉得太怪了
   ↓
2000 年: 法国 StudioCanal 出资让林奇将其扩展为电影
   ↓
2001 年: 林奇补拍了约 50 分钟的新素材（主要是"现实段落"）
   ↓
2001 年: 《穆赫兰道》在戛纳首映，林奇获最佳导演奖
\`\`\`

### 电视试播集 vs 最终电影

| 方面 | 试播集版本 | 电影版本 |
|------|----------|---------|
| 叙事结构 | 开放式——为多季连续剧设计 | 封闭式——梦境/现实双重结构 |
| Betty 的命运 | 继续侦探故事（未揭晓） | 被揭示为 Diane 的梦中投射 |
| Rita 的身份 | 悬念——永远不会立刻揭晓 | 通过蓝色盒子揭示真相 |
| Winkie's 场景 | 独立恐怖插曲 | 全片恐惧主题的预告 |
| Club Silencio | 试播集中不存在 | 影片的哲学核心 |
| "现实段落" | 不存在 | 补拍的全部新内容 |

### 断裂如何成就了艺术

ABC 的拒绝**意外地成就了这部杰作**。原因：

1. **试播集的"未完成"状态** = 天然的梦境质感
   - 很多线索没有解答 → 梦本来就不给答案
   - 叙事线之间缺乏连接 → 梦的碎片化本质

2. **补拍的"现实段落"** = 对梦境的倒推建构
   - 林奇在知道了梦境段落的全部内容之后，才设计"现实"
   - 这意味着"现实"是为"梦"服务的——而不是反过来
   - 这恰好符合精神分析的逻辑：**先有梦（症状），后有解释（分析）**

3. **两种素材的质感差异** = 意外的美学收获
   - 试播集素材（1999 年拍摄）和补拍素材（2001 年拍摄）在色调、质感上有微妙差异
   - 这种差异加强了"梦境 vs 现实"的视觉区分
   - 梦境段落更"电视化"（明亮、饱和）→ 与 Diane 梦中好莱坞式的光鲜一致
   - 现实段落更"电影化"（暗沉、颗粒感）→ 与残酷的现实一致

### 元叙事的维度

这段制作历史本身就是一个关于"好莱坞"的故事：

\`\`\`
林奇 ←→ Diane
━━━━━━━━━━━━━
林奇的美好愿景（电视剧版本）被好莱坞体制（ABC）拒绝
Diane 的美好幻想（Betty 的故事）被现实拒绝

但林奇找到了方法把"被拒绝"本身变成了艺术
Diane 没能做到——她崩溃了

林奇的胜利恰恰是 Diane 的失败的镜像。
\`\`\`

> 《穆赫兰道》是一部关于"梦想被好莱坞摧毁"的电影，而这部电影本身差点被好莱坞摧毁。林奇从废墟中拯救出了杰作——但 Diane 没有。这也许是这部电影最深层的讽刺。`,
      },
    ],
  },
]

// ─── Main ────────────────────────────────────────────────────
async function main() {
  console.log('Adding Mulholland Drive film analysis data...\n')

  // Get current max position for tasks to avoid position conflicts
  const maxTaskPosition = await prisma.task.aggregate({ _max: { position: true } })
  const startPosition = (maxTaskPosition._max.position ?? -1) + 1

  // Check if group exists or create
  let group = await prisma.categoryGroup.findFirst({
    where: { name: FILM_GROUP.name },
  })
  if (!group) {
    console.log('Creating category group...')
    group = await prisma.categoryGroup.create({
      data: {
        name: FILM_GROUP.name,
        position: FILM_GROUP.position,
      },
    })
    console.log(`  + Group: ${group.name}`)
  } else {
    console.log(`  = Group exists: ${group.name}`)
  }

  // Check if category exists or create
  let category = await prisma.category.findFirst({
    where: { name: MULHOLLAND_CATEGORY.name },
  })
  if (!category) {
    console.log('Creating category...')
    category = await prisma.category.create({
      data: {
        name: MULHOLLAND_CATEGORY.name,
        color: MULHOLLAND_CATEGORY.color,
        position: MULHOLLAND_CATEGORY.position,
        groupId: group.id,
      },
    })
    console.log(`  + Category: ${category.name}`)
  } else {
    console.log(`  = Category exists: ${category.name}`)
  }

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
