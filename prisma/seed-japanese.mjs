import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ─── Japanese Learning Quests ────────────────────────────────
const QUESTS = [
  // ── 假名与发音 ──
  {
    title: '五十音图：平假名与片假名',
    description: '掌握日语书写系统的基础——平假名（ひらがな）与片假名（カタカナ），建立正确的发音习惯，为日常会话打下根基。',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    objectives: [
      '准确认读和书写全部 46 个平假名',
      '准确认读和书写全部 46 个片假名',
      '掌握浊音、半浊音、拗音的读写规则',
      '能以自然语速朗读假名组合',
    ],
    resources: [
      { title: 'Tofugu: Learn Hiragana', url: 'https://www.tofugu.com/japanese/learn-hiragana/', type: 'article' },
      { title: 'Tofugu: Learn Katakana', url: 'https://www.tofugu.com/japanese/learn-katakana/', type: 'article' },
      { title: 'JapanesePod101 假名课程', url: 'https://www.japanesepod101.com/', type: 'course' },
      { title: 'Real Kana 在线练习', url: 'https://realkana.com/', type: 'other' },
    ],
    milestones: [
      { title: '平假名 あ行〜な行', completed: true },
      { title: '平假名 は行〜わ行', completed: true },
      { title: '片假名 ア行〜ナ行', completed: false },
      { title: '片假名 ハ行〜ワ行', completed: false },
      { title: '浊音・拗音综合测试', completed: false },
    ],
    notes: [
      {
        title: '五十音图速查',
        content: `## 平假名 五十音图

| | a | i | u | e | o |
|---|---|---|---|---|---|
| ∅ | あ | い | う | え | お |
| k | か | き | く | け | こ |
| s | さ | し | す | せ | そ |
| t | た | ち | つ | て | と |
| n | な | に | ぬ | ね | の |
| h | は | ひ | ふ | へ | ほ |
| m | ま | み | む | め | も |
| y | や | — | ゆ | — | よ |
| r | ら | り | る | れ | ろ |
| w | わ | — | — | — | を |
| N | ん | | | | |

## 浊音・半浊音

| | a | i | u | e | o |
|---|---|---|---|---|---|
| g | が | ぎ | ぐ | げ | ご |
| z | ざ | じ | ず | ぜ | ぞ |
| d | だ | ぢ | づ | で | ど |
| b | ば | び | ぶ | べ | ぼ |
| p | ぱ | ぴ | ぷ | ぺ | ぽ |

## 记忆技巧

- **あ (a)**: 像一个人张着大嘴说"啊"
- **き (ki)**: 像一把钥匙 (key)
- **す (su)**: 像数字 す → 好像在说 "su"per
- **は (ha)**: 注意！作助词时读 "wa"
- **ふ (fu)**: 日语的 fu 介于 fu 和 hu 之间`,
      },
    ],
  },

  // ── 基础语法 ──
  {
    title: '日常会话基础语法',
    description: '学习日语会话中最常用的语法结构：です/ます体、基本助词、疑问句、形容词活用，能够组织简单完整的句子。',
    status: 'TODO',
    priority: 'HIGH',
    objectives: [
      '掌握 です/ます 敬体句型',
      '理解并正确使用基本助词 は/が/を/に/で/と/も/の',
      '掌握动词三类分类与ます形变化',
      '能用 て形 连接动作、表达请求',
      '掌握 い形容词 / な形容词 的基本用法',
    ],
    resources: [
      { title: 'Genki I 教科书', url: 'https://genki3.japantimes.co.jp/', type: 'book' },
      { title: 'Tae Kim\'s Japanese Grammar Guide', url: 'https://guidetojapanese.org/learn/grammar', type: 'article' },
      { title: 'Cure Dolly: Organic Japanese', url: 'https://www.youtube.com/playlist?list=PLg9uYxuZf8x_A-vcqqyOFZQe82IzDHjD-', type: 'video' },
      { title: 'Bunpro 语法 SRS', url: 'https://bunpro.jp/', type: 'other' },
    ],
    milestones: [
      { title: '名词句：A は B です', completed: false },
      { title: '动词ます形与基本句型', completed: false },
      { title: '助词 は/が/を/に/で 用法区分', completed: false },
      { title: 'て形：连接、请求、进行', completed: false },
      { title: '形容词修饰与描述', completed: false },
    ],
    notes: [
      {
        title: '基本助词用法速查',
        content: `## 日语核心助词

### は (wa) — 主题标记
- **私は**学生です。（我是学生。）
- 表示"关于~"的话题

### が (ga) — 主语标记
- 誰**が**来ましたか。（谁来了？）
- 强调主语、新信息

### を (wo) — 宾语标记
- コーヒー**を**飲みます。（喝咖啡。）

### に (ni) — 方向/时间/存在
- 学校**に**行きます。（去学校。）
- 7時**に**起きます。（7点起床。）

### で (de) — 场所/方式
- 図書館**で**勉強します。（在图书馆学习。）
- バス**で**行きます。（坐公交去。）

### と (to) — 和/引用
- 友達**と**映画を見ます。（和朋友看电影。）

### の (no) — 所属/连接
- 私**の**本。（我的书。）

### も (mo) — 也
- 私**も**日本語を勉強しています。（我也在学日语。）

## は vs が 关键区别

| は | が |
|---|---|
| 旧信息 / 话题 | 新信息 / 焦点 |
| "说到 X…" | "正是 X…" |
| 对比：私**は**学生です | 排他：私**が**学生です |`,
      },
      {
        title: '动词分类与ます形',
        content: `## 动词三类

### 一类动词（五段）
词尾在 う段，ます形变 い段 + ます
- 書**く** → 書**き**ます (写)
- 飲**む** → 飲**み**ます (喝)
- 話**す** → 話**し**ます (说)

### 二类动词（一段）
去掉 る + ます
- 食べ**る** → 食べ**ます** (吃)
- 見**る** → 見**ます** (看)

### 三类动词（不规则）
只有两个：
- する → **します** (做)
- 来る (くる) → **来ます** (きます) (来)

## て形变化规则

| 词尾 | て形 | 例 |
|---|---|---|
| う/つ/る | って | 買う → 買って |
| む/ぶ/ぬ | んで | 飲む → 飲んで |
| く | いて | 書く → 書いて |
| ぐ | いで | 泳ぐ → 泳いで |
| す | して | 話す → 話して |
| 例外 | 行く → 行って | |

## 常用て形句型

- **〜てください**: 请〜 (コーヒーをください)
- **〜ています**: 正在〜 (勉強しています)
- **〜てもいいですか**: 可以〜吗？(写真を撮ってもいいですか)`,
      },
    ],
  },

  // ── 自我介绍与寒暄 ──
  {
    title: '挨拶と自己紹介（寒暄与自我介绍）',
    description: '掌握日常见面、告别、感谢、道歉等基本寒暄用语，以及完整的自我介绍模板，建立基本社交会话能力。',
    status: 'TODO',
    priority: 'HIGH',
    objectives: [
      '熟练使用各时段问候语',
      '能进行完整的自我介绍（姓名、国籍、职业、爱好）',
      '掌握感谢、道歉、请求的常用表达',
      '理解日语敬语的基本层级（丁寧語/尊敬語/謙譲語）',
    ],
    resources: [
      { title: 'NHK World: Easy Japanese', url: 'https://www.nhk.or.jp/lesson/en/', type: 'course' },
      { title: 'JapanesePod101: 挨拶特辑', url: 'https://www.japanesepod101.com/', type: 'video' },
    ],
    milestones: [
      { title: '基本问候与告别', completed: false },
      { title: '自我介绍模板背诵', completed: false },
      { title: '感谢与道歉表达', completed: false },
      { title: '初次见面场景角色扮演', completed: false },
    ],
    notes: [
      {
        title: '日常挨拶（寒暄用语）',
        content: `## 基本问候

| 日语 | 读音 | 场景 |
|---|---|---|
| おはようございます | ohayō gozaimasu | 早上好（敬语） |
| こんにちは | konnichiwa | 你好（白天） |
| こんばんは | konbanwa | 晚上好 |
| おやすみなさい | oyasumi nasai | 晚安 |
| さようなら | sayōnara | 再见（较正式） |
| じゃあね / またね | jā ne / mata ne | 再见（朋友间） |
| お元気ですか | o-genki desu ka | 你好吗？ |
| おかげさまで | okage-sama de | 托您的福（回答） |

## 感谢与道歉

| 日语 | 场景 |
|---|---|
| ありがとうございます | 谢谢（敬语） |
| どうも | 谢谢（随意） |
| すみません | 对不起 / 打扰了 |
| ごめんなさい | 对不起（较亲密） |
| いいえ / いえいえ | 不客气 |
| どういたしまして | 不用谢（正式） |

## 自我介绍模板

\`\`\`
はじめまして。（初次见面。）
[名前]と申します。（我叫 [名字]。）
中国から来ました。（我从中国来。）
[職業]です。（我是 [职业]。）
趣味は[趣味]です。（我的爱好是 [爱好]。）
日本語を勉強しています。（我在学日语。）
どうぞよろしくお願いします。（请多关照。）
\`\`\`

### 常用职业词汇
- 学生（がくせい）、会社員（かいしゃいん）
- エンジニア、プログラマー、デザイナー`,
      },
    ],
  },

  // ── 购物与餐厅 ──
  {
    title: '買い物とレストラン（购物与餐厅）',
    description: '掌握在日本购物、点餐、付款时的实用会话，学习数字、量词、价格表达，能够独立完成基本消费场景的日语交流。',
    status: 'TODO',
    priority: 'MEDIUM',
    objectives: [
      '熟练使用日语数字 1-10000 及价格表达',
      '掌握购物常用句型（询价、试穿、付款）',
      '掌握餐厅点餐全流程会话',
      '学会常见量词的正确使用',
    ],
    resources: [
      { title: 'Genki I: Chapter 4 & 5', url: 'https://genki3.japantimes.co.jp/', type: 'book' },
      { title: 'Japanese Ammo with Misa: Shopping', url: 'https://www.youtube.com/@JapaneseAmmowithMisa', type: 'video' },
    ],
    milestones: [
      { title: '数字 1-10000 与价格', completed: false },
      { title: '购物对话练习', completed: false },
      { title: '餐厅点餐全流程', completed: false },
      { title: '量词：つ/個/枚/本/杯', completed: false },
    ],
    notes: [
      {
        title: '购物与餐厅常用会话',
        content: `## 购物常用句

| 日语 | 中文 |
|---|---|
| これはいくらですか。 | 这个多少钱？ |
| ちょっと高いですね。 | 有点贵呢。 |
| 安くしてもらえますか。 | 能便宜点吗？ |
| これをください。 | 请给我这个。 |
| カードで払えますか。 | 可以刷卡吗？ |
| 袋をお願いします。 | 请给我一个袋子。 |
| 試着してもいいですか。 | 可以试穿吗？ |
| Sサイズはありますか。 | 有S码吗？ |

## 餐厅全流程

### 入店
- すみません、二人です。（打扰了，两位。）
- 予約していません。（没有预约。）

### 点餐
- メニューをお願いします。（请给我菜单。）
- おすすめは何ですか。（有什么推荐？）
- これとこれをお願いします。（请给我这个和这个。）
- ビールを一つください。（请给我一杯啤酒。）

### 用餐中
- いただきます。（我开动了。）
- おいしいです！（好吃！）
- お水をもらえますか。（能给我水吗？）

### 结账
- お会計をお願いします。（请结账。）
- 別々でお願いします。（请分开算。）
- ごちそうさまでした。（多谢款待。）

## 数字速查

| 数字 | 日语 | 数字 | 日语 |
|---|---|---|---|
| 1 | いち | 100 | ひゃく |
| 2 | に | 200 | にひゃく |
| 3 | さん | 300 | **さんびゃく** |
| 4 | よん/し | 500 | ごひゃく |
| 5 | ご | 600 | **ろっぴゃく** |
| 6 | ろく | 800 | **はっぴゃく** |
| 7 | なな/しち | 1000 | せん |
| 8 | はち | 3000 | **さんぜん** |
| 9 | きゅう/く | 8000 | **はっせん** |
| 10 | じゅう | 10000 | いちまん |`,
      },
    ],
  },

  // ── 交通与出行 ──
  {
    title: '交通と道案内（交通与问路）',
    description: '学习乘坐电车、公交、出租车的实用日语，以及问路和指路的基本表达，能够在日本独立出行。',
    status: 'TODO',
    priority: 'MEDIUM',
    objectives: [
      '掌握乘坐电车/地铁的全流程用语',
      '能够用日语问路和理解简单指示',
      '学会出租车和公交的基本对话',
      '掌握方位词和时间表达',
    ],
    resources: [
      { title: 'NHK Easy Japanese: Travel', url: 'https://www.nhk.or.jp/lesson/en/', type: 'course' },
      { title: 'Genki I: Chapter 6', url: 'https://genki3.japantimes.co.jp/', type: 'book' },
    ],
    milestones: [
      { title: '电车/地铁乘车用语', completed: false },
      { title: '问路与方位表达', completed: false },
      { title: '出租车会话', completed: false },
      { title: '时刻表达与乘换', completed: false },
    ],
    notes: [
      {
        title: '交通出行常用表达',
        content: `## 电车/地铁

| 日语 | 中文 |
|---|---|
| 〜駅はどこですか。 | 〜站在哪里？ |
| 〜までいくらですか。 | 到〜多少钱？ |
| 〜行きの電車はどれですか。 | 去〜的电车是哪辆？ |
| 乗り換えはありますか。 | 需要换乘吗？ |
| 次の駅は何ですか。 | 下一站是什么？ |
| 片道/往復 | 单程/往返 |
| この電車は〜に止まりますか。 | 这趟车在〜停吗？ |

## 问路

### 问
- すみません、〜はどこですか。（请问〜在哪里？）
- 〜まではどう行けばいいですか。（去〜怎么走？）
- ここから〜まで歩いてどのくらいですか。（从这里走到〜要多久？）

### 方位词
| 日语 | 中文 | 日语 | 中文 |
|---|---|---|---|
| 右 (みぎ) | 右 | 左 (ひだり) | 左 |
| まっすぐ | 直走 | 角 (かど) | 拐角 |
| 交差点 (こうさてん) | 十字路口 | 信号 (しんごう) | 红绿灯 |
| 隣 (となり) | 旁边 | 向かい (むかい) | 对面 |

### 常用指路句型
- この道をまっすぐ行ってください。（请沿这条路直走。）
- 二つ目の角を右に曲がってください。（请在第二个路口右转。）
- 信号を渡って、左にあります。（过红绿灯后在左边。）

## 出租车

- 〜までお願いします。（请到〜。）
- ここで降ろしてください。（请在这里停车。）
- だいたいどのくらいかかりますか。（大概需要多长时间？）
- 領収書をお願いします。（请给我收据。）`,
      },
    ],
  },

  // ── 日常闲聊 ──
  {
    title: '日常会話（日常闲聊）',
    description: '练习天气、兴趣、周末计划、工作等日常话题的自然对话，掌握表达感受和意见的常用句型，提升实际交流能力。',
    status: 'TODO',
    priority: 'MEDIUM',
    objectives: [
      '掌握天气、季节相关的日常对话',
      '能描述自己的爱好和日常生活',
      '能就周末计划、假期进行简单对话',
      '学会表达喜好、感受和简单意见',
    ],
    resources: [
      { title: 'Nihongo con Teppei (Podcast)', url: 'https://nihongoconteppei.com/', type: 'other' },
      { title: 'Comprehensible Japanese (YouTube)', url: 'https://www.youtube.com/@ComprehensibleJapanese', type: 'video' },
      { title: 'Genki I & II 会话练习', url: 'https://genki3.japantimes.co.jp/', type: 'book' },
    ],
    milestones: [
      { title: '天气与季节话题', completed: false },
      { title: '爱好与日常描述', completed: false },
      { title: '计划与邀约表达', completed: false },
      { title: '感受与意见句型', completed: false },
    ],
    notes: [
      {
        title: '日常闲聊话题与句型',
        content: `## 天气

| 日语 | 中文 |
|---|---|
| 今日はいい天気ですね。 | 今天天气真好呢。 |
| 暑いですね / 寒いですね。 | 好热 / 好冷呢。 |
| 雨が降りそうですね。 | 好像要下雨呢。 |
| 明日は晴れるといいですね。 | 明天放晴就好了。 |

### 天气词汇
晴れ (はれ)、曇り (くもり)、雨 (あめ)、雪 (ゆき)、風 (かぜ)

## 兴趣爱好

- 趣味は何ですか。（你的爱好是什么？）
- 〜が好きです。（我喜欢〜。）
- 最近〜にはまっています。（最近迷上了〜。）
- 休みの日は〜をしています。（休息日我在做〜。）

### 常见爱好表达
| 日语 | 中文 |
|---|---|
| 映画を見ること | 看电影 |
| 音楽を聴くこと | 听音乐 |
| 料理をすること | 做饭 |
| ゲームをすること | 打游戏 |
| 散歩すること | 散步 |
| 本を読むこと | 看书 |
| プログラミング | 编程 |

## 邀约与计划

- 今度一緒に〜ませんか。（下次一起〜好吗？）
- 週末は何をしますか。（周末打算干什么？）
- いいですね、行きましょう！（好呀，走吧！）
- ちょっと都合が悪いです。（有点不太方便。）
- また今度お願いします。（下次再说吧。）

## 表达感受

| 日语 | 中文 |
|---|---|
| 楽しいです | 开心 |
| 面白いです | 有趣 |
| 大変ですね | 辛苦了 / 真不容易 |
| すごいですね | 好厉害 |
| うらやましい | 好羡慕 |
| なるほど | 原来如此 |
| そうですね | 是啊 / 对呢 |`,
      },
    ],
  },
]

// ─── Main ────────────────────────────────────────────────────
async function main() {
  console.log('Adding Japanese learning content...')

  // Create or find group
  let group = await prisma.categoryGroup.findFirst({
    where: { name: '语言学习' },
  })
  if (!group) {
    const maxPos = await prisma.categoryGroup.aggregate({ _max: { position: true } })
    group = await prisma.categoryGroup.create({
      data: {
        name: '语言学习',
        position: (maxPos._max.position ?? -1) + 1,
      },
    })
    console.log('  + Group: 语言学习')
  }

  // Create or find category
  let category = await prisma.category.findFirst({
    where: { name: '日语' },
  })
  if (!category) {
    const maxPos = await prisma.category.aggregate({ _max: { position: true } })
    category = await prisma.category.create({
      data: {
        name: '日语',
        color: '#DC2626',
        position: (maxPos._max.position ?? -1) + 1,
        groupId: group.id,
      },
    })
    console.log('  + Category: 日语')
  }

  // Get current max task position
  const maxTaskPos = await prisma.task.aggregate({ _max: { position: true } })
  let taskPosition = (maxTaskPos._max.position ?? -1) + 1

  console.log('Creating quests...')
  for (const quest of QUESTS) {
    const task = await prisma.task.create({
      data: {
        title: quest.title,
        description: quest.description,
        status: quest.status,
        priority: quest.priority,
        position: taskPosition++,
        categories: { connect: [{ id: category.id }] },
      },
    })
    console.log(`  + Quest: ${quest.title} [${quest.status}]`)

    await prisma.learningPlan.create({
      data: {
        taskId: task.id,
        objectives: JSON.stringify(quest.objectives),
        resources: JSON.stringify(quest.resources),
        milestones: JSON.stringify(quest.milestones),
      },
    })

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

  const questCount = QUESTS.length
  const noteCount = QUESTS.reduce((sum, q) => sum + q.notes.length, 0)
  console.log(`\nDone! Added 1 group, 1 category, ${questCount} quests, ${noteCount} notes.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
