import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categories = [
  { name: '名詞', nameZh: '名词', color: '#3B82F6' },
  { name: '動詞', nameZh: '动词', color: '#EF4444' },
  { name: 'い形容詞', nameZh: 'い形容词', color: '#EC4899' },
  { name: 'な形容詞', nameZh: 'な形容词', color: '#D946EF' },
  { name: '副詞', nameZh: '副词', color: '#F59E0B' },
  { name: '表現', nameZh: '表达', color: '#10B981' },
]

const wordsByCategory = {
  '名詞': [
    { word: '家', reading: 'いえ', meaning: '家', phonetic: 'ie', exampleSentence: '新しい家に引っ越しました。' },
    { word: '学校', reading: 'がっこう', meaning: '学校', phonetic: 'gakkou', exampleSentence: '学校は八時に始まる。' },
    { word: '仕事', reading: 'しごと', meaning: '工作', phonetic: 'shigoto', exampleSentence: '今日は仕事が忙しかった。' },
    { word: '電車', reading: 'でんしゃ', meaning: '电车', phonetic: 'densha', exampleSentence: '電車で通勤しています。' },
    { word: '時間', reading: 'じかん', meaning: '时间', phonetic: 'jikan', exampleSentence: '時間がありません。' },
    { word: '友達', reading: 'ともだち', meaning: '朋友', phonetic: 'tomodachi', exampleSentence: '友達と映画を見に行く。' },
    { word: '天気', reading: 'てんき', meaning: '天气', phonetic: 'tenki', exampleSentence: '今日はいい天気ですね。' },
    { word: '電話', reading: 'でんわ', meaning: '电话', phonetic: 'denwa', exampleSentence: '電話をかけてください。' },
    { word: '名前', reading: 'なまえ', meaning: '名字', phonetic: 'namae', exampleSentence: 'お名前は何ですか。' },
    { word: '水', reading: 'みず', meaning: '水', phonetic: 'mizu', exampleSentence: '水を一杯ください。' },
    { word: 'ご飯', reading: 'ごはん', meaning: '米饭/饭', phonetic: 'gohan', exampleSentence: '朝ご飯を食べましたか。' },
    { word: '肉', reading: 'にく', meaning: '肉', phonetic: 'niku', exampleSentence: '今日は肉を焼きましょう。' },
    { word: '魚', reading: 'さかな', meaning: '鱼', phonetic: 'sakana', exampleSentence: '新鮮な魚がおいしい。' },
    { word: '野菜', reading: 'やさい', meaning: '蔬菜', phonetic: 'yasai', exampleSentence: '毎日野菜を食べましょう。' },
    { word: '駅', reading: 'えき', meaning: '车站', phonetic: 'eki', exampleSentence: '駅まで歩いて十分です。' },
    { word: '病院', reading: 'びょういん', meaning: '医院', phonetic: 'byouin', exampleSentence: '病院に行かなければなりません。' },
    { word: '空港', reading: 'くうこう', meaning: '机场', phonetic: 'kuukou', exampleSentence: '空港まで一時間かかる。' },
    { word: '図書館', reading: 'としょかん', meaning: '图书馆', phonetic: 'toshokan', exampleSentence: '図書館で本を借りた。' },
    { word: '公園', reading: 'こうえん', meaning: '公园', phonetic: 'kouen', exampleSentence: '公園で遊びましょう。' },
    { word: '銀行', reading: 'ぎんこう', meaning: '银行', phonetic: 'ginkou', exampleSentence: '銀行でお金をおろす。' },
    { word: '山', reading: 'やま', meaning: '山', phonetic: 'yama', exampleSentence: '富士山は日本一の山です。' },
    { word: '海', reading: 'うみ', meaning: '海', phonetic: 'umi', exampleSentence: '夏は海に行きたい。' },
    { word: '川', reading: 'かわ', meaning: '河', phonetic: 'kawa', exampleSentence: '川で泳ぎたい。' },
    { word: '花', reading: 'はな', meaning: '花', phonetic: 'hana', exampleSentence: '花が咲いている。' },
    { word: '空', reading: 'そら', meaning: '天空', phonetic: 'sora', exampleSentence: '空がきれいです。' },
    { word: '雨', reading: 'あめ', meaning: '雨', phonetic: 'ame', exampleSentence: '明日は雨でしょう。' },
    { word: '犬', reading: 'いぬ', meaning: '狗', phonetic: 'inu', exampleSentence: '犬と散歩するのが好きです。' },
    { word: '猫', reading: 'ねこ', meaning: '猫', phonetic: 'neko', exampleSentence: '猫はとても可愛い。' },
    { word: '母', reading: 'はは', meaning: '母亲', phonetic: 'haha', exampleSentence: '母は料理が上手です。' },
    { word: '父', reading: 'ちち', meaning: '父亲', phonetic: 'chichi', exampleSentence: '父は会社員です。' },
    { word: '子供', reading: 'こども', meaning: '孩子', phonetic: 'kodomo', exampleSentence: '子供が遊んでいる。' },
    { word: '先生', reading: 'せんせい', meaning: '老师', phonetic: 'sensei', exampleSentence: '先生に質問がある。' },
    { word: '医者', reading: 'いしゃ', meaning: '医生', phonetic: 'isha', exampleSentence: '医者に診てもらった。' },
    { word: '薬', reading: 'くすり', meaning: '药', phonetic: 'kusuri', exampleSentence: '薬を飲んでください。' },
    { word: '音楽', reading: 'おんがく', meaning: '音乐', phonetic: 'ongaku', exampleSentence: '音楽を聴くのが好きです。' },
    { word: '映画', reading: 'えいが', meaning: '电影', phonetic: 'eiga', exampleSentence: '週末に映画を見た。' },
    { word: '写真', reading: 'しゃしん', meaning: '照片', phonetic: 'shashin', exampleSentence: '写真を撮ってもいいですか。' },
    { word: '教室', reading: 'きょうしつ', meaning: '教室', phonetic: 'kyoushitsu', exampleSentence: '教室に入ってください。' },
    { word: '宿題', reading: 'しゅくだい', meaning: '作业', phonetic: 'shukudai', exampleSentence: '宿題を忘れてしまった。' },
    { word: '試験', reading: 'しけん', meaning: '考试', phonetic: 'shiken', exampleSentence: '来週試験がある。' },
    { word: '靴', reading: 'くつ', meaning: '鞋', phonetic: 'kutsu', exampleSentence: '靴を脱いでください。' },
    { word: '傘', reading: 'かさ', meaning: '伞', phonetic: 'kasa', exampleSentence: '傘を持っていきましょう。' },
    { word: '財布', reading: 'さいふ', meaning: '钱包', phonetic: 'saifu', exampleSentence: '財布を落としてしまった。' },
    { word: '鍵', reading: 'かぎ', meaning: '钥匙', phonetic: 'kagi', exampleSentence: '鍵をどこに置いたか忘れた。' },
    { word: '漫画', reading: 'まんが', meaning: '漫画', phonetic: 'manga', exampleSentence: '日本の漫画が面白い。' },
    { word: '道', reading: 'みち', meaning: '路/道路', phonetic: 'michi', exampleSentence: '道が分からない。' },
    { word: '新幹線', reading: 'しんかんせん', meaning: '新干线', phonetic: 'shinkansen', exampleSentence: '新幹線で大阪に行く。' },
    { word: '自転車', reading: 'じてんしゃ', meaning: '自行车', phonetic: 'jitensha', exampleSentence: '自転車で通勤している。' },
  ],
  '動詞': [
    { word: '食べる', reading: 'たべる', meaning: '吃', phonetic: 'taberu', exampleSentence: '朝ご飯を食べる。' },
    { word: '飲む', reading: 'のむ', meaning: '喝', phonetic: 'nomu', exampleSentence: '水を飲む。' },
    { word: '行く', reading: 'いく', meaning: '去', phonetic: 'iku', exampleSentence: '学校に行く。' },
    { word: '来る', reading: 'くる', meaning: '来', phonetic: 'kuru', exampleSentence: '友達が来る。' },
    { word: '見る', reading: 'みる', meaning: '看', phonetic: 'miru', exampleSentence: '映画を見る。' },
    { word: '聞く', reading: 'きく', meaning: '听/问', phonetic: 'kiku', exampleSentence: '音楽を聞く。' },
    { word: '話す', reading: 'はなす', meaning: '说', phonetic: 'hanasu', exampleSentence: '日本語を話す。' },
    { word: '読む', reading: 'よむ', meaning: '读', phonetic: 'yomu', exampleSentence: '本を読む。' },
    { word: '書く', reading: 'かく', meaning: '写', phonetic: 'kaku', exampleSentence: '手紙を書く。' },
    { word: '買う', reading: 'かう', meaning: '买', phonetic: 'kau', exampleSentence: '本を買う。' },
    { word: '寝る', reading: 'ねる', meaning: '睡觉', phonetic: 'neru', exampleSentence: '十時に寝る。' },
    { word: '起きる', reading: 'おきる', meaning: '起床', phonetic: 'okiru', exampleSentence: '六時に起きる。' },
    { word: '作る', reading: 'つくる', meaning: '做/制作', phonetic: 'tsukuru', exampleSentence: '料理を作る。' },
    { word: '走る', reading: 'はしる', meaning: '跑', phonetic: 'hashiru', exampleSentence: '毎朝走っている。' },
    { word: '歩く', reading: 'あるく', meaning: '走路', phonetic: 'aruku', exampleSentence: '駅まで歩く。' },
    { word: '泳ぐ', reading: 'およぐ', meaning: '游泳', phonetic: 'oyogu', exampleSentence: 'プールで泳ぐ。' },
    { word: '待つ', reading: 'まつ', meaning: '等待', phonetic: 'matsu', exampleSentence: 'ここで待ってください。' },
    { word: '思う', reading: 'おもう', meaning: '想/认为', phonetic: 'omou', exampleSentence: 'いい考えだと思う。' },
    { word: '知る', reading: 'しる', meaning: '知道', phonetic: 'shiru', exampleSentence: 'その店を知っていますか。' },
    { word: '使う', reading: 'つかう', meaning: '使用', phonetic: 'tsukau', exampleSentence: 'パソコンを使う。' },
    { word: '教える', reading: 'おしえる', meaning: '教', phonetic: 'oshieru', exampleSentence: '日本語を教えてください。' },
    { word: '勉強する', reading: 'べんきょうする', meaning: '学习', phonetic: 'benkyou suru', exampleSentence: '毎日日本語を勉強する。' },
    { word: '働く', reading: 'はたらく', meaning: '工作', phonetic: 'hataraku', exampleSentence: '会社で働いている。' },
    { word: '遊ぶ', reading: 'あそぶ', meaning: '玩', phonetic: 'asobu', exampleSentence: '公園で遊ぶ。' },
    { word: '帰る', reading: 'かえる', meaning: '回去', phonetic: 'kaeru', exampleSentence: '家に帰る。' },
    { word: '入る', reading: 'はいる', meaning: '进入', phonetic: 'hairu', exampleSentence: '部屋に入る。' },
    { word: '出る', reading: 'でる', meaning: '出去/出来', phonetic: 'deru', exampleSentence: '家を出る。' },
    { word: '始まる', reading: 'はじまる', meaning: '开始', phonetic: 'hajimaru', exampleSentence: '授業が始まる。' },
    { word: '終わる', reading: 'おわる', meaning: '结束', phonetic: 'owaru', exampleSentence: '仕事が終わった。' },
    { word: '乗る', reading: 'のる', meaning: '乘坐', phonetic: 'noru', exampleSentence: '電車に乗る。' },
    { word: '降りる', reading: 'おりる', meaning: '下车', phonetic: 'oriru', exampleSentence: '次の駅で降りる。' },
    { word: '開ける', reading: 'あける', meaning: '打开', phonetic: 'akeru', exampleSentence: '窓を開けてください。' },
    { word: '閉める', reading: 'しめる', meaning: '关闭', phonetic: 'shimeru', exampleSentence: 'ドアを閉めてください。' },
    { word: '忘れる', reading: 'わすれる', meaning: '忘记', phonetic: 'wasureru', exampleSentence: '約束を忘れないで。' },
    { word: '覚える', reading: 'おぼえる', meaning: '记住', phonetic: 'oboeru', exampleSentence: '漢字を覚える。' },
  ],
  'い形容詞': [
    // 基本
    { word: '大きい', reading: 'おおきい', meaning: '大的', phonetic: 'ookii', exampleSentence: 'この箱は大きいです。' },
    { word: '小さい', reading: 'ちいさい', meaning: '小的', phonetic: 'chiisai', exampleSentence: '小さい猫がかわいい。' },
    { word: '高い', reading: 'たかい', meaning: '高的/贵的', phonetic: 'takai', exampleSentence: 'このビルは高いです。' },
    { word: '安い', reading: 'やすい', meaning: '便宜的', phonetic: 'yasui', exampleSentence: 'この店は安いです。' },
    { word: '新しい', reading: 'あたらしい', meaning: '新的', phonetic: 'atarashii', exampleSentence: '新しい靴を買いました。' },
    { word: '古い', reading: 'ふるい', meaning: '旧的', phonetic: 'furui', exampleSentence: 'このお寺は古いです。' },
    // 温度・天候
    { word: '暑い', reading: 'あつい', meaning: '热的（天气）', phonetic: 'atsui', exampleSentence: '今日はとても暑いです。' },
    { word: '寒い', reading: 'さむい', meaning: '冷的（天气）', phonetic: 'samui', exampleSentence: '冬は寒いです。' },
    { word: '暖かい', reading: 'あたたかい', meaning: '暖和的', phonetic: 'atatakai', exampleSentence: '春は暖かいです。' },
    { word: '涼しい', reading: 'すずしい', meaning: '凉爽的', phonetic: 'suzushii', exampleSentence: '秋は涼しくて気持ちいい。' },
    { word: '冷たい', reading: 'つめたい', meaning: '冰凉的（触感）', phonetic: 'tsumetai', exampleSentence: '冷たい水をください。' },
    // 感情
    { word: '楽しい', reading: 'たのしい', meaning: '快乐的/有趣的', phonetic: 'tanoshii', exampleSentence: '旅行は楽しいです。' },
    { word: '嬉しい', reading: 'うれしい', meaning: '高兴的', phonetic: 'ureshii', exampleSentence: 'プレゼントをもらって嬉しい。' },
    { word: '悲しい', reading: 'かなしい', meaning: '悲伤的', phonetic: 'kanashii', exampleSentence: '別れは悲しい。' },
    { word: '寂しい', reading: 'さびしい', meaning: '寂寞的', phonetic: 'sabishii', exampleSentence: '一人は寂しいです。' },
    { word: '恥ずかしい', reading: 'はずかしい', meaning: '害羞的/丢脸的', phonetic: 'hazukashii', exampleSentence: '間違えて恥ずかしかった。' },
    { word: '怖い', reading: 'こわい', meaning: '可怕的', phonetic: 'kowai', exampleSentence: 'ホラー映画は怖い。' },
    { word: '眠い', reading: 'ねむい', meaning: '困的', phonetic: 'nemui', exampleSentence: '昨日寝なかったので眠い。' },
    { word: '痛い', reading: 'いたい', meaning: '痛的', phonetic: 'itai', exampleSentence: '頭が痛い。' },
    { word: '羨ましい', reading: 'うらやましい', meaning: '令人羡慕的', phonetic: 'urayamashii', exampleSentence: '彼の才能が羨ましい。' },
    { word: '懐かしい', reading: 'なつかしい', meaning: '令人怀念的', phonetic: 'natsukashii', exampleSentence: 'この歌は懐かしい。' },
    // 味覚
    { word: '美味しい', reading: 'おいしい', meaning: '好吃的', phonetic: 'oishii', exampleSentence: 'この料理は美味しいです。' },
    { word: 'まずい', reading: 'まずい', meaning: '难吃的/糟糕的', phonetic: 'mazui', exampleSentence: 'この料理はまずい。' },
    { word: '甘い', reading: 'あまい', meaning: '甜的', phonetic: 'amai', exampleSentence: 'このケーキは甘い。' },
    { word: '辛い', reading: 'からい', meaning: '辣的', phonetic: 'karai', exampleSentence: 'カレーが辛すぎる。' },
    { word: '苦い', reading: 'にがい', meaning: '苦的', phonetic: 'nigai', exampleSentence: 'この薬は苦い。' },
    { word: '酸っぱい', reading: 'すっぱい', meaning: '酸的', phonetic: 'suppai', exampleSentence: 'レモンは酸っぱい。' },
    { word: 'しょっぱい', reading: 'しょっぱい', meaning: '咸的', phonetic: 'shoppai', exampleSentence: 'この味噌汁はしょっぱい。' },
    // 大小・長短・形状
    { word: '長い', reading: 'ながい', meaning: '长的', phonetic: 'nagai', exampleSentence: 'この道は長い。' },
    { word: '短い', reading: 'みじかい', meaning: '短的', phonetic: 'mijikai', exampleSentence: '夏休みは短い。' },
    { word: '広い', reading: 'ひろい', meaning: '宽广的', phonetic: 'hiroi', exampleSentence: 'この部屋は広いです。' },
    { word: '狭い', reading: 'せまい', meaning: '窄的/狭小的', phonetic: 'semai', exampleSentence: 'この部屋は狭い。' },
    { word: '太い', reading: 'ふとい', meaning: '粗的', phonetic: 'futoi', exampleSentence: 'この木は太い。' },
    { word: '細い', reading: 'ほそい', meaning: '细的', phonetic: 'hosoi', exampleSentence: '細い道を歩く。' },
    { word: '丸い', reading: 'まるい', meaning: '圆的', phonetic: 'marui', exampleSentence: '月は丸い。' },
    { word: '深い', reading: 'ふかい', meaning: '深的', phonetic: 'fukai', exampleSentence: 'この川は深い。' },
    { word: '浅い', reading: 'あさい', meaning: '浅的', phonetic: 'asai', exampleSentence: 'プールの浅い所で遊ぶ。' },
    // 重さ・速さ
    { word: '重い', reading: 'おもい', meaning: '重的', phonetic: 'omoi', exampleSentence: 'このかばんは重い。' },
    { word: '軽い', reading: 'かるい', meaning: '轻的', phonetic: 'karui', exampleSentence: 'この荷物は軽い。' },
    { word: '速い', reading: 'はやい', meaning: '快的', phonetic: 'hayai', exampleSentence: '新幹線は速い。' },
    { word: '遅い', reading: 'おそい', meaning: '慢的/晚的', phonetic: 'osoi', exampleSentence: '電車が遅い。' },
    // 明暗・色
    { word: '明るい', reading: 'あかるい', meaning: '明亮的', phonetic: 'akarui', exampleSentence: 'この部屋は明るいです。' },
    { word: '暗い', reading: 'くらい', meaning: '暗的', phonetic: 'kurai', exampleSentence: '夜道は暗くて怖い。' },
    { word: '白い', reading: 'しろい', meaning: '白色的', phonetic: 'shiroi', exampleSentence: '白い雪が降っている。' },
    { word: '黒い', reading: 'くろい', meaning: '黑色的', phonetic: 'kuroi', exampleSentence: '黒い猫が好きです。' },
    { word: '赤い', reading: 'あかい', meaning: '红色的', phonetic: 'akai', exampleSentence: '赤い花がきれいです。' },
    { word: '青い', reading: 'あおい', meaning: '蓝色的', phonetic: 'aoi', exampleSentence: '空が青い。' },
    { word: '黄色い', reading: 'きいろい', meaning: '黄色的', phonetic: 'kiiroi', exampleSentence: '黄色い花が咲いている。' },
    // 距離・位置
    { word: '近い', reading: 'ちかい', meaning: '近的', phonetic: 'chikai', exampleSentence: '駅は近いです。' },
    { word: '遠い', reading: 'とおい', meaning: '远的', phonetic: 'tooi', exampleSentence: '空港は遠い。' },
    // 強弱・難易
    { word: '強い', reading: 'つよい', meaning: '强的', phonetic: 'tsuyoi', exampleSentence: '彼はとても強い。' },
    { word: '弱い', reading: 'よわい', meaning: '弱的', phonetic: 'yowai', exampleSentence: '体が弱い。' },
    { word: '難しい', reading: 'むずかしい', meaning: '难的', phonetic: 'muzukashii', exampleSentence: '日本語は難しいですか。' },
    { word: '易しい', reading: 'やさしい', meaning: '简单的', phonetic: 'yasashii', exampleSentence: 'この問題は易しい。' },
    // 人物評価
    { word: '優しい', reading: 'やさしい', meaning: '温柔的/亲切的', phonetic: 'yasashii', exampleSentence: '先生はとても優しいです。' },
    { word: '厳しい', reading: 'きびしい', meaning: '严厉的', phonetic: 'kibishii', exampleSentence: '父は厳しい人です。' },
    { word: '若い', reading: 'わかい', meaning: '年轻的', phonetic: 'wakai', exampleSentence: '彼女はまだ若い。' },
    { word: '可愛い', reading: 'かわいい', meaning: '可爱的', phonetic: 'kawaii', exampleSentence: 'この犬は可愛い。' },
    { word: '美しい', reading: 'うつくしい', meaning: '美丽的', phonetic: 'utsukushii', exampleSentence: '景色が美しい。' },
    // 状態
    { word: '忙しい', reading: 'いそがしい', meaning: '忙的', phonetic: 'isogashii', exampleSentence: '今週はとても忙しい。' },
    { word: '正しい', reading: 'ただしい', meaning: '正确的', phonetic: 'tadashii', exampleSentence: '正しい答えはどれですか。' },
    { word: '珍しい', reading: 'めずらしい', meaning: '珍稀的/少见的', phonetic: 'mezurashii', exampleSentence: 'こんな天気は珍しい。' },
    { word: 'うるさい', reading: 'うるさい', meaning: '吵的', phonetic: 'urusai', exampleSentence: '隣の部屋がうるさい。' },
    { word: '危ない', reading: 'あぶない', meaning: '危险的', phonetic: 'abunai', exampleSentence: 'ここは危ないです。' },
    { word: '汚い', reading: 'きたない', meaning: '脏的', phonetic: 'kitanai', exampleSentence: '部屋が汚い。' },
    // 评价
    { word: '素晴らしい', reading: 'すばらしい', meaning: '精彩的/了不起的', phonetic: 'subarashii', exampleSentence: '素晴らしい演奏でした。' },
    { word: '面白い', reading: 'おもしろい', meaning: '有趣的', phonetic: 'omoshiroi', exampleSentence: 'この本は面白い。' },
    { word: 'つまらない', reading: 'つまらない', meaning: '无聊的', phonetic: 'tsumaranai', exampleSentence: 'この映画はつまらない。' },
    { word: 'すごい', reading: 'すごい', meaning: '厉害的/了不起的', phonetic: 'sugoi', exampleSentence: 'すごい景色ですね！' },
    { word: 'かっこいい', reading: 'かっこいい', meaning: '帅的/酷的', phonetic: 'kakkoii', exampleSentence: 'あの人はかっこいい。' },
    // 数量
    { word: '多い', reading: 'おおい', meaning: '多的', phonetic: 'ooi', exampleSentence: '今日は人が多い。' },
    { word: '少ない', reading: 'すくない', meaning: '少的', phonetic: 'sukunai', exampleSentence: '時間が少ない。' },
    // 硬軟
    { word: '固い', reading: 'かたい', meaning: '硬的', phonetic: 'katai', exampleSentence: 'このパンは固い。' },
    { word: '柔らかい', reading: 'やわらかい', meaning: '柔软的', phonetic: 'yawarakai', exampleSentence: 'このソファは柔らかい。' },
    // 补充
    { word: '恐ろしい', reading: 'おそろしい', meaning: '可怕的/恐怖的', phonetic: 'osoroshii', exampleSentence: '恐ろしい事故があった。' },
    { word: '激しい', reading: 'はげしい', meaning: '激烈的', phonetic: 'hageshii', exampleSentence: '雨が激しい。' },
    { word: '悔しい', reading: 'くやしい', meaning: '不甘心的', phonetic: 'kuyashii', exampleSentence: '負けて悔しい。' },
    { word: 'だるい', reading: 'だるい', meaning: '无力的/倦怠的', phonetic: 'darui', exampleSentence: '体がだるい。' },
    { word: 'ずるい', reading: 'ずるい', meaning: '狡猾的', phonetic: 'zurui', exampleSentence: 'ずるいことをするな。' },
  ],
  'な形容詞': [
    // 基本
    { word: '元気', reading: 'げんき', meaning: '健康的/精神好的', phonetic: 'genki', exampleSentence: 'お元気ですか。' },
    { word: '好き', reading: 'すき', meaning: '喜欢的', phonetic: 'suki', exampleSentence: '日本料理が好きです。' },
    { word: '嫌い', reading: 'きらい', meaning: '讨厌的', phonetic: 'kirai', exampleSentence: '野菜が嫌いです。' },
    { word: '上手', reading: 'じょうず', meaning: '擅长的', phonetic: 'jouzu', exampleSentence: '彼女は料理が上手です。' },
    { word: '下手', reading: 'へた', meaning: '不擅长的', phonetic: 'heta', exampleSentence: '歌が下手です。' },
    { word: '綺麗', reading: 'きれい', meaning: '美丽的/干净的', phonetic: 'kirei', exampleSentence: 'この花は綺麗です。' },
    // 状态评价
    { word: '静か', reading: 'しずか', meaning: '安静的', phonetic: 'shizuka', exampleSentence: '図書館は静かです。' },
    { word: '賑やか', reading: 'にぎやか', meaning: '热闹的', phonetic: 'nigiyaka', exampleSentence: '祭りは賑やかです。' },
    { word: '有名', reading: 'ゆうめい', meaning: '有名的', phonetic: 'yuumei', exampleSentence: 'この店は有名です。' },
    { word: '便利', reading: 'べんり', meaning: '方便的', phonetic: 'benri', exampleSentence: 'この駅は便利です。' },
    { word: '不便', reading: 'ふべん', meaning: '不方便的', phonetic: 'fuben', exampleSentence: '車がないと不便です。' },
    { word: '大切', reading: 'たいせつ', meaning: '重要的/珍贵的', phonetic: 'taisetsu', exampleSentence: '家族は大切です。' },
    { word: '大丈夫', reading: 'だいじょうぶ', meaning: '没关系/没问题', phonetic: 'daijoubu', exampleSentence: '大丈夫ですか。' },
    // 性格・态度
    { word: '親切', reading: 'しんせつ', meaning: '亲切的', phonetic: 'shinsetsu', exampleSentence: '彼はとても親切です。' },
    { word: '丁寧', reading: 'ていねい', meaning: '礼貌的/仔细的', phonetic: 'teinei', exampleSentence: '丁寧に説明してください。' },
    { word: '真面目', reading: 'まじめ', meaning: '认真的', phonetic: 'majime', exampleSentence: '彼は真面目な学生です。' },
    { word: '素敵', reading: 'すてき', meaning: '美好的/帅气的', phonetic: 'suteki', exampleSentence: '素敵なドレスですね。' },
    { word: '立派', reading: 'りっぱ', meaning: '出色的/气派的', phonetic: 'rippa', exampleSentence: '立派な建物ですね。' },
    { word: '失礼', reading: 'しつれい', meaning: '失礼的', phonetic: 'shitsurei', exampleSentence: '失礼ですが、お名前は？' },
    // 难易・安危
    { word: '簡単', reading: 'かんたん', meaning: '简单的', phonetic: 'kantan', exampleSentence: 'この問題は簡単です。' },
    { word: '複雑', reading: 'ふくざつ', meaning: '复杂的', phonetic: 'fukuzatsu', exampleSentence: 'この問題は複雑です。' },
    { word: '安全', reading: 'あんぜん', meaning: '安全的', phonetic: 'anzen', exampleSentence: 'この町は安全です。' },
    { word: '危険', reading: 'きけん', meaning: '危险的', phonetic: 'kiken', exampleSentence: 'ここは危険です。' },
    // 一般描述
    { word: '特別', reading: 'とくべつ', meaning: '特别的', phonetic: 'tokubetsu', exampleSentence: '今日は特別な日です。' },
    { word: '普通', reading: 'ふつう', meaning: '普通的', phonetic: 'futsuu', exampleSentence: '普通の生活がいい。' },
    { word: '自由', reading: 'じゆう', meaning: '自由的', phonetic: 'jiyuu', exampleSentence: '自由な時間が欲しい。' },
    { word: '暇', reading: 'ひま', meaning: '空闲的', phonetic: 'hima', exampleSentence: '明日は暇ですか。' },
    { word: '必要', reading: 'ひつよう', meaning: '必要的', phonetic: 'hitsuyou', exampleSentence: 'パスポートが必要です。' },
    { word: '大変', reading: 'たいへん', meaning: '辛苦的/严重的', phonetic: 'taihen', exampleSentence: '仕事が大変です。' },
    { word: '無理', reading: 'むり', meaning: '不可能的/勉强的', phonetic: 'muri', exampleSentence: '無理をしないでください。' },
    // 感情
    { word: '心配', reading: 'しんぱい', meaning: '担心的', phonetic: 'shinpai', exampleSentence: '心配しないでください。' },
    { word: '残念', reading: 'ざんねん', meaning: '遗憾的', phonetic: 'zannen', exampleSentence: '行けなくて残念です。' },
    { word: '変', reading: 'へん', meaning: '奇怪的', phonetic: 'hen', exampleSentence: '変な音がする。' },
    { word: '十分', reading: 'じゅうぶん', meaning: '充分的', phonetic: 'juubun', exampleSentence: '時間は十分にある。' },
    // 补充
    { word: '適当', reading: 'てきとう', meaning: '合适的/随便的', phonetic: 'tekitou', exampleSentence: '適当に選んでください。' },
    { word: '苦手', reading: 'にがて', meaning: '不擅长的', phonetic: 'nigate', exampleSentence: '数学が苦手です。' },
    { word: '得意', reading: 'とくい', meaning: '擅长的/得意的', phonetic: 'tokui', exampleSentence: '英語が得意です。' },
    { word: '幸せ', reading: 'しあわせ', meaning: '幸福的', phonetic: 'shiawase', exampleSentence: 'とても幸せです。' },
    { word: '不思議', reading: 'ふしぎ', meaning: '不可思议的', phonetic: 'fushigi', exampleSentence: '不思議な話ですね。' },
    { word: '邪魔', reading: 'じゃま', meaning: '碍事的/打扰', phonetic: 'jama', exampleSentence: 'お邪魔します。' },
    { word: '駄目', reading: 'だめ', meaning: '不行的/没用的', phonetic: 'dame', exampleSentence: 'ここで写真を撮るのは駄目です。' },
  ],
  '副詞': [
    { word: 'いつも', reading: 'いつも', meaning: '总是', phonetic: 'itsumo', exampleSentence: 'いつも朝早く起きる。' },
    { word: '時々', reading: 'ときどき', meaning: '有时', phonetic: 'tokidoki', exampleSentence: '時々外食する。' },
    { word: '全然', reading: 'ぜんぜん', meaning: '完全（不）', phonetic: 'zenzen', exampleSentence: '全然分からない。' },
    { word: 'もう', reading: 'もう', meaning: '已经', phonetic: 'mou', exampleSentence: 'もう食べました。' },
    { word: 'まだ', reading: 'まだ', meaning: '还/尚未', phonetic: 'mada', exampleSentence: 'まだ終わっていない。' },
    { word: 'とても', reading: 'とても', meaning: '非常', phonetic: 'totemo', exampleSentence: 'とてもおいしいです。' },
    { word: 'たくさん', reading: 'たくさん', meaning: '很多', phonetic: 'takusan', exampleSentence: '本をたくさん読んだ。' },
    { word: '少し', reading: 'すこし', meaning: '一点', phonetic: 'sukoshi', exampleSentence: '少し休みましょう。' },
    { word: 'ゆっくり', reading: 'ゆっくり', meaning: '慢慢地', phonetic: 'yukkuri', exampleSentence: 'ゆっくり話してください。' },
    { word: 'すぐ', reading: 'すぐ', meaning: '马上', phonetic: 'sugu', exampleSentence: 'すぐ行きます。' },
    { word: '一緒に', reading: 'いっしょに', meaning: '一起', phonetic: 'issho ni', exampleSentence: '一緒に行きましょう。' },
    { word: '多分', reading: 'たぶん', meaning: '大概/也许', phonetic: 'tabun', exampleSentence: '多分明日は雨です。' },
    { word: 'やっぱり', reading: 'やっぱり', meaning: '果然/还是', phonetic: 'yappari', exampleSentence: 'やっぱり日本が好きだ。' },
    { word: '本当に', reading: 'ほんとうに', meaning: '真的', phonetic: 'hontou ni', exampleSentence: '本当においしい。' },
    { word: '絶対', reading: 'ぜったい', meaning: '绝对', phonetic: 'zettai', exampleSentence: '絶対に忘れない。' },
  ],
  '表現': [
    { word: 'おはよう', reading: 'おはよう', meaning: '早上好', phonetic: 'ohayou', exampleSentence: 'おはよう、今日もいい天気ですね。' },
    { word: 'こんにちは', reading: 'こんにちは', meaning: '你好', phonetic: 'konnichiwa', exampleSentence: 'こんにちは、お元気ですか。' },
    { word: 'こんばんは', reading: 'こんばんは', meaning: '晚上好', phonetic: 'konbanwa', exampleSentence: 'こんばんは、今日は楽しかったです。' },
    { word: 'ありがとう', reading: 'ありがとう', meaning: '谢谢', phonetic: 'arigatou', exampleSentence: 'プレゼントをありがとう。' },
    { word: 'すみません', reading: 'すみません', meaning: '对不起/打扰了', phonetic: 'sumimasen', exampleSentence: 'すみません、道を教えてください。' },
    { word: 'さようなら', reading: 'さようなら', meaning: '再见', phonetic: 'sayounara', exampleSentence: 'さようなら、また明日。' },
    { word: 'おやすみなさい', reading: 'おやすみなさい', meaning: '晚安', phonetic: 'oyasuminasai', exampleSentence: 'おやすみなさい、いい夢を見てね。' },
    { word: 'はじめまして', reading: 'はじめまして', meaning: '初次见面', phonetic: 'hajimemashite', exampleSentence: 'はじめまして、田中です。' },
    { word: 'お願いします', reading: 'おねがいします', meaning: '拜托了/请', phonetic: 'onegaishimasu', exampleSentence: 'これをお願いします。' },
    { word: 'いただきます', reading: 'いただきます', meaning: '我开动了', phonetic: 'itadakimasu', exampleSentence: 'いただきます！おいしそう。' },
    { word: 'ごちそうさま', reading: 'ごちそうさま', meaning: '我吃饱了/谢谢款待', phonetic: 'gochisousama', exampleSentence: 'ごちそうさまでした、とてもおいしかった。' },
    { word: 'ただいま', reading: 'ただいま', meaning: '我回来了', phonetic: 'tadaima', exampleSentence: 'ただいま！今日は疲れた。' },
    { word: 'お邪魔します', reading: 'おじゃまします', meaning: '打扰了（进别人家时）', phonetic: 'ojama shimasu', exampleSentence: 'お邪魔します、失礼します。' },
    { word: 'お疲れ様', reading: 'おつかれさま', meaning: '辛苦了', phonetic: 'otsukaresama', exampleSentence: 'お疲れ様でした。' },
    { word: 'いらっしゃいませ', reading: 'いらっしゃいませ', meaning: '欢迎光临', phonetic: 'irasshaimase', exampleSentence: 'いらっしゃいませ、何名様ですか。' },
  ],
}

async function main() {
  console.log('Seeding Japanese vocabulary...')

  // 只清理日语词汇数据，不影响其他表
  await prisma.vocabStudyProgress.deleteMany({ where: { word: { language: 'ja' } } })
  await prisma.vocabWord.deleteMany({ where: { language: 'ja' } })
  await prisma.vocabCategory.deleteMany({ where: { language: 'ja' } })
  console.log('  Cleared existing Japanese vocab data.')

  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i]
    const created = await prisma.vocabCategory.upsert({
      where: { language_name: { language: 'ja', name: cat.name } },
      update: { nameZh: cat.nameZh, color: cat.color, position: i },
      create: {
        name: cat.name,
        nameZh: cat.nameZh,
        language: 'ja',
        color: cat.color,
        position: i,
      },
    })

    const words = wordsByCategory[cat.name] ?? []
    for (let j = 0; j < words.length; j++) {
      const w = words[j]
      await prisma.vocabWord.create({
        data: {
          word: w.word,
          reading: w.reading,
          meaning: w.meaning,
          phonetic: w.phonetic,
          exampleSentence: w.exampleSentence,
          language: 'ja',
          categoryId: created.id,
          position: j,
        },
      })
    }

    console.log(`  Created category "${cat.name}" with ${words.length} words`)
  }

  console.log('Japanese vocabulary seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
