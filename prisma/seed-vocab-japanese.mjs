import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categories = [
  { name: '挨拶', nameZh: '问候', color: '#3B82F6' },
  { name: '数字', nameZh: '数字', color: '#10B981' },
  { name: '食べ物', nameZh: '食物', color: '#F59E0B' },
  { name: '日常生活', nameZh: '日常生活', color: '#8B5CF6' },
  { name: '形容詞', nameZh: '形容词', color: '#EC4899' },
  { name: '動詞', nameZh: '动词', color: '#EF4444' },
  { name: '旅行', nameZh: '旅行', color: '#0EA5E9' },
  { name: '買い物', nameZh: '购物', color: '#D946EF' },
  { name: '体と健康', nameZh: '身体与健康', color: '#14B8A6' },
  { name: '色と自然', nameZh: '颜色与自然', color: '#F97316' },
  { name: '時間', nameZh: '时间日历', color: '#6366F1' },
  { name: '感情と人', nameZh: '情感与人物', color: '#F43F5E' },
]

const wordsByCategory = {
  '挨拶': [
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
  ],
  '数字': [
    { word: '一', reading: 'いち', meaning: '一', phonetic: 'ichi', exampleSentence: '一つください。' },
    { word: '二', reading: 'に', meaning: '二', phonetic: 'ni', exampleSentence: '二人で行きましょう。' },
    { word: '三', reading: 'さん', meaning: '三', phonetic: 'san', exampleSentence: '三時に会いましょう。' },
    { word: '四', reading: 'よん', meaning: '四', phonetic: 'yon', exampleSentence: '四月は桜の季節です。' },
    { word: '五', reading: 'ご', meaning: '五', phonetic: 'go', exampleSentence: '五分待ってください。' },
    { word: '六', reading: 'ろく', meaning: '六', phonetic: 'roku', exampleSentence: '六時に起きます。' },
    { word: '七', reading: 'なな', meaning: '七', phonetic: 'nana', exampleSentence: '七月は暑いです。' },
    { word: '八', reading: 'はち', meaning: '八', phonetic: 'hachi', exampleSentence: '八百屋で野菜を買う。' },
    { word: '九', reading: 'きゅう', meaning: '九', phonetic: 'kyuu', exampleSentence: '九月から学校が始まる。' },
    { word: '十', reading: 'じゅう', meaning: '十', phonetic: 'juu', exampleSentence: '十個のりんごがある。' },
    { word: '百', reading: 'ひゃく', meaning: '一百', phonetic: 'hyaku', exampleSentence: '百円のお菓子を買った。' },
    { word: '千', reading: 'せん', meaning: '一千', phonetic: 'sen', exampleSentence: '千円札を持っている。' },
    { word: '万', reading: 'まん', meaning: '一万', phonetic: 'man', exampleSentence: '一万円は大金だ。' },
  ],
  '食べ物': [
    { word: 'ご飯', reading: 'ごはん', meaning: '米饭/饭', phonetic: 'gohan', exampleSentence: '朝ご飯を食べましたか。' },
    { word: '水', reading: 'みず', meaning: '水', phonetic: 'mizu', exampleSentence: '水を一杯ください。' },
    { word: '肉', reading: 'にく', meaning: '肉', phonetic: 'niku', exampleSentence: '今日は肉を焼きましょう。' },
    { word: '魚', reading: 'さかな', meaning: '鱼', phonetic: 'sakana', exampleSentence: '新鮮な魚がおいしい。' },
    { word: '寿司', reading: 'すし', meaning: '寿司', phonetic: 'sushi', exampleSentence: '寿司は日本の代表的な料理です。' },
    { word: '野菜', reading: 'やさい', meaning: '蔬菜', phonetic: 'yasai', exampleSentence: '毎日野菜を食べましょう。' },
    { word: '果物', reading: 'くだもの', meaning: '水果', phonetic: 'kudamono', exampleSentence: '季節の果物が好きです。' },
    { word: 'パン', reading: 'パン', meaning: '面包', phonetic: 'pan', exampleSentence: '朝はパンを食べます。' },
    { word: '卵', reading: 'たまご', meaning: '鸡蛋', phonetic: 'tamago', exampleSentence: '卵焼きを作りました。' },
    { word: '牛乳', reading: 'ぎゅうにゅう', meaning: '牛奶', phonetic: 'gyuunyuu', exampleSentence: '牛乳を飲むと背が伸びる。' },
    { word: 'お茶', reading: 'おちゃ', meaning: '茶', phonetic: 'ocha', exampleSentence: 'お茶を一杯いかがですか。' },
    { word: 'ラーメン', reading: 'ラーメン', meaning: '拉面', phonetic: 'raamen', exampleSentence: '寒い日はラーメンが食べたい。' },
  ],
  '日常生活': [
    { word: '家', reading: 'いえ', meaning: '家', phonetic: 'ie', exampleSentence: '新しい家に引っ越しました。' },
    { word: '学校', reading: 'がっこう', meaning: '学校', phonetic: 'gakkou', exampleSentence: '学校は八時に始まる。' },
    { word: '仕事', reading: 'しごと', meaning: '工作', phonetic: 'shigoto', exampleSentence: '今日は仕事が忙しかった。' },
    { word: '電車', reading: 'でんしゃ', meaning: '电车', phonetic: 'densha', exampleSentence: '電車で通勤しています。' },
    { word: '時間', reading: 'じかん', meaning: '时间', phonetic: 'jikan', exampleSentence: '時間がありません。' },
    { word: '友達', reading: 'ともだち', meaning: '朋友', phonetic: 'tomodachi', exampleSentence: '友達と映画を見に行く。' },
    { word: '天気', reading: 'てんき', meaning: '天气', phonetic: 'tenki', exampleSentence: '今日はいい天気ですね。' },
    { word: '買い物', reading: 'かいもの', meaning: '购物', phonetic: 'kaimono', exampleSentence: '週末に買い物に行きます。' },
    { word: '病院', reading: 'びょういん', meaning: '医院', phonetic: 'byouin', exampleSentence: '病院に行かなければなりません。' },
    { word: '電話', reading: 'でんわ', meaning: '电话', phonetic: 'denwa', exampleSentence: '電話をかけてください。' },
    { word: '名前', reading: 'なまえ', meaning: '名字', phonetic: 'namae', exampleSentence: 'お名前は何ですか。' },
    { word: '今日', reading: 'きょう', meaning: '今天', phonetic: 'kyou', exampleSentence: '今日は何曜日ですか。' },
    { word: '明日', reading: 'あした', meaning: '明天', phonetic: 'ashita', exampleSentence: '明日は休みです。' },
  ],
  '形容詞': [
    { word: '大きい', reading: 'おおきい', meaning: '大的', phonetic: 'ookii', exampleSentence: 'この箱は大きいです。' },
    { word: '小さい', reading: 'ちいさい', meaning: '小的', phonetic: 'chiisai', exampleSentence: '小さい猫がかわいい。' },
    { word: '高い', reading: 'たかい', meaning: '高的/贵的', phonetic: 'takai', exampleSentence: 'このビルは高いです。' },
    { word: '安い', reading: 'やすい', meaning: '便宜的', phonetic: 'yasui', exampleSentence: 'この店は安いです。' },
    { word: '新しい', reading: 'あたらしい', meaning: '新的', phonetic: 'atarashii', exampleSentence: '新しい靴を買いました。' },
    { word: '古い', reading: 'ふるい', meaning: '旧的', phonetic: 'furui', exampleSentence: 'このお寺は古いです。' },
    { word: '美味しい', reading: 'おいしい', meaning: '好吃的', phonetic: 'oishii', exampleSentence: 'この料理は美味しいです。' },
    { word: '暑い', reading: 'あつい', meaning: '热的（天气）', phonetic: 'atsui', exampleSentence: '今日はとても暑いです。' },
    { word: '寒い', reading: 'さむい', meaning: '冷的（天气）', phonetic: 'samui', exampleSentence: '冬は寒いです。' },
    { word: '楽しい', reading: 'たのしい', meaning: '快乐的', phonetic: 'tanoshii', exampleSentence: '旅行は楽しいです。' },
    { word: '難しい', reading: 'むずかしい', meaning: '难的', phonetic: 'muzukashii', exampleSentence: '日本語は難しいですか。' },
    { word: '優しい', reading: 'やさしい', meaning: '温柔的/简单的', phonetic: 'yasashii', exampleSentence: '先生はとても優しいです。' },
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
  ],
  '旅行': [
    { word: '空港', reading: 'くうこう', meaning: '机场', phonetic: 'kuukou', exampleSentence: '空港まで一時間かかる。' },
    { word: 'パスポート', reading: 'パスポート', meaning: '护照', phonetic: 'pasupooto', exampleSentence: 'パスポートを忘れないで。' },
    { word: 'ホテル', reading: 'ホテル', meaning: '酒店', phonetic: 'hoteru', exampleSentence: 'ホテルを予約しました。' },
    { word: '切符', reading: 'きっぷ', meaning: '票', phonetic: 'kippu', exampleSentence: '切符を二枚買いました。' },
    { word: '荷物', reading: 'にもつ', meaning: '行李', phonetic: 'nimotsu', exampleSentence: '荷物が多すぎる。' },
    { word: '地図', reading: 'ちず', meaning: '地图', phonetic: 'chizu', exampleSentence: '地図を見てください。' },
    { word: '観光', reading: 'かんこう', meaning: '观光', phonetic: 'kankou', exampleSentence: '京都で観光しました。' },
    { word: '飛行機', reading: 'ひこうき', meaning: '飞机', phonetic: 'hikouki', exampleSentence: '飛行機で東京に行く。' },
    { word: '予約', reading: 'よやく', meaning: '预约', phonetic: 'yoyaku', exampleSentence: 'レストランを予約した。' },
    { word: '出発', reading: 'しゅっぱつ', meaning: '出发', phonetic: 'shuppatsu', exampleSentence: '八時に出発します。' },
    { word: 'お土産', reading: 'おみやげ', meaning: '纪念品/伴手礼', phonetic: 'omiyage', exampleSentence: 'お土産を買いたい。' },
    { word: '外国', reading: 'がいこく', meaning: '外国', phonetic: 'gaikoku', exampleSentence: '外国に行ったことがある。' },
    { word: '旅館', reading: 'りょかん', meaning: '日式旅馆', phonetic: 'ryokan', exampleSentence: '旅館に泊まりたい。' },
  ],
  '買い物': [
    { word: '値段', reading: 'ねだん', meaning: '价格', phonetic: 'nedan', exampleSentence: 'この値段は高いです。' },
    { word: '割引', reading: 'わりびき', meaning: '折扣', phonetic: 'waribiki', exampleSentence: '割引があるとうれしい。' },
    { word: 'レシート', reading: 'レシート', meaning: '收据', phonetic: 'reshiito', exampleSentence: 'レシートをください。' },
    { word: '現金', reading: 'げんきん', meaning: '现金', phonetic: 'genkin', exampleSentence: '現金で払います。' },
    { word: 'クレジットカード', reading: 'クレジットカード', meaning: '信用卡', phonetic: 'kurejitto kaado', exampleSentence: 'クレジットカードは使えますか。' },
    { word: 'サイズ', reading: 'サイズ', meaning: '尺寸', phonetic: 'saizu', exampleSentence: 'サイズはMです。' },
    { word: 'お店', reading: 'おみせ', meaning: '商店', phonetic: 'omise', exampleSentence: 'このお店は安い。' },
    { word: 'お客様', reading: 'おきゃくさま', meaning: '顾客', phonetic: 'okyakusama', exampleSentence: 'お客様、こちらへどうぞ。' },
    { word: 'セール', reading: 'セール', meaning: '促销', phonetic: 'seeru', exampleSentence: 'セール中だからお得です。' },
    { word: 'おつり', reading: 'おつり', meaning: '找零', phonetic: 'otsuri', exampleSentence: 'おつりは要りません。' },
    { word: '袋', reading: 'ふくろ', meaning: '袋子', phonetic: 'fukuro', exampleSentence: '袋は要りますか。' },
    { word: '会計', reading: 'かいけい', meaning: '结账', phonetic: 'kaikei', exampleSentence: '会計をお願いします。' },
    { word: '試着', reading: 'しちゃく', meaning: '试穿', phonetic: 'shichaku', exampleSentence: '試着してもいいですか。' },
  ],
  '体と健康': [
    { word: '頭', reading: 'あたま', meaning: '头', phonetic: 'atama', exampleSentence: '頭が痛い。' },
    { word: '手', reading: 'て', meaning: '手', phonetic: 'te', exampleSentence: '手を洗いましょう。' },
    { word: '目', reading: 'め', meaning: '眼睛', phonetic: 'me', exampleSentence: '目が疲れた。' },
    { word: '心臓', reading: 'しんぞう', meaning: '心脏', phonetic: 'shinzou', exampleSentence: '心臓が速く動いている。' },
    { word: 'お腹', reading: 'おなか', meaning: '肚子', phonetic: 'onaka', exampleSentence: 'お腹が空いた。' },
    { word: '薬', reading: 'くすり', meaning: '药', phonetic: 'kusuri', exampleSentence: '薬を飲んでください。' },
    { word: '熱', reading: 'ねつ', meaning: '发烧', phonetic: 'netsu', exampleSentence: '熱があるので休みます。' },
    { word: '運動', reading: 'うんどう', meaning: '运动', phonetic: 'undou', exampleSentence: '毎日運動しています。' },
    { word: '歯', reading: 'は', meaning: '牙齿', phonetic: 'ha', exampleSentence: '歯を磨きましょう。' },
    { word: '足', reading: 'あし', meaning: '脚/腿', phonetic: 'ashi', exampleSentence: '足が痛い。' },
    { word: '肩', reading: 'かた', meaning: '肩膀', phonetic: 'kata', exampleSentence: '肩が凝っている。' },
    { word: '風邪', reading: 'かぜ', meaning: '感冒', phonetic: 'kaze', exampleSentence: '風邪を引いた。' },
    { word: '元気', reading: 'げんき', meaning: '健康/精神好', phonetic: 'genki', exampleSentence: 'お元気ですか。' },
  ],
  '色と自然': [
    { word: '赤', reading: 'あか', meaning: '红色', phonetic: 'aka', exampleSentence: '赤い花がきれいです。' },
    { word: '青', reading: 'あお', meaning: '蓝色', phonetic: 'ao', exampleSentence: '空が青い。' },
    { word: '緑', reading: 'みどり', meaning: '绿色', phonetic: 'midori', exampleSentence: '緑が多い公園です。' },
    { word: '黄色', reading: 'きいろ', meaning: '黄色', phonetic: 'kiiro', exampleSentence: '黄色い花が咲いている。' },
    { word: '白', reading: 'しろ', meaning: '白色', phonetic: 'shiro', exampleSentence: '白い雪が降っている。' },
    { word: '黒', reading: 'くろ', meaning: '黑色', phonetic: 'kuro', exampleSentence: '黒い猫が好きです。' },
    { word: '山', reading: 'やま', meaning: '山', phonetic: 'yama', exampleSentence: '富士山は日本一の山です。' },
    { word: '川', reading: 'かわ', meaning: '河', phonetic: 'kawa', exampleSentence: '川で泳ぎたい。' },
    { word: '花', reading: 'はな', meaning: '花', phonetic: 'hana', exampleSentence: '花が咲いている。' },
    { word: '木', reading: 'き', meaning: '树', phonetic: 'ki', exampleSentence: '大きい木がある。' },
    { word: '空', reading: 'そら', meaning: '天空', phonetic: 'sora', exampleSentence: '空がきれいです。' },
    { word: '海', reading: 'うみ', meaning: '海', phonetic: 'umi', exampleSentence: '夏は海に行きたい。' },
    { word: '雨', reading: 'あめ', meaning: '雨', phonetic: 'ame', exampleSentence: '明日は雨でしょう。' },
  ],
  '時間': [
    { word: '朝', reading: 'あさ', meaning: '早晨', phonetic: 'asa', exampleSentence: '朝早く起きる。' },
    { word: '午後', reading: 'ごご', meaning: '下午', phonetic: 'gogo', exampleSentence: '午後から授業がある。' },
    { word: '夕方', reading: 'ゆうがた', meaning: '傍晚', phonetic: 'yuugata', exampleSentence: '夕方に散歩する。' },
    { word: '夜', reading: 'よる', meaning: '夜晚', phonetic: 'yoru', exampleSentence: '夜は静かです。' },
    { word: '週', reading: 'しゅう', meaning: '周', phonetic: 'shuu', exampleSentence: '来週テストがある。' },
    { word: '月', reading: 'つき', meaning: '月/月亮', phonetic: 'tsuki', exampleSentence: '今月は忙しい。' },
    { word: '年', reading: 'とし', meaning: '年', phonetic: 'toshi', exampleSentence: '今年は良い年でした。' },
    { word: '昨日', reading: 'きのう', meaning: '昨天', phonetic: 'kinou', exampleSentence: '昨日は楽しかった。' },
    { word: '分', reading: 'ふん', meaning: '分钟', phonetic: 'fun', exampleSentence: '五分待ってください。' },
    { word: '半', reading: 'はん', meaning: '半', phonetic: 'han', exampleSentence: '三時半に来てください。' },
    { word: '春', reading: 'はる', meaning: '春天', phonetic: 'haru', exampleSentence: '春は桜がきれいです。' },
    { word: '夏', reading: 'なつ', meaning: '夏天', phonetic: 'natsu', exampleSentence: '夏休みが楽しみです。' },
    { word: '冬', reading: 'ふゆ', meaning: '冬天', phonetic: 'fuyu', exampleSentence: '冬は雪が降る。' },
  ],
  '感情と人': [
    { word: '愛', reading: 'あい', meaning: '爱', phonetic: 'ai', exampleSentence: '愛は大切です。' },
    { word: '怒る', reading: 'おこる', meaning: '生气', phonetic: 'okoru', exampleSentence: '先生が怒った。' },
    { word: '悲しい', reading: 'かなしい', meaning: '悲伤的', phonetic: 'kanashii', exampleSentence: '別れは悲しい。' },
    { word: '疲れる', reading: 'つかれる', meaning: '累', phonetic: 'tsukareru', exampleSentence: '今日は疲れた。' },
    { word: 'うれしい', reading: 'うれしい', meaning: '高兴的', phonetic: 'ureshii', exampleSentence: 'プレゼントをもらってうれしい。' },
    { word: '心配', reading: 'しんぱい', meaning: '担心', phonetic: 'shinpai', exampleSentence: '心配しないでください。' },
    { word: '母', reading: 'はは', meaning: '母亲', phonetic: 'haha', exampleSentence: '母は料理が上手です。' },
    { word: '父', reading: 'ちち', meaning: '父亲', phonetic: 'chichi', exampleSentence: '父は会社員です。' },
    { word: '子供', reading: 'こども', meaning: '孩子', phonetic: 'kodomo', exampleSentence: '子供が遊んでいる。' },
    { word: '先生', reading: 'せんせい', meaning: '老师', phonetic: 'sensei', exampleSentence: '先生に質問がある。' },
    { word: '医者', reading: 'いしゃ', meaning: '医生', phonetic: 'isha', exampleSentence: '医者に診てもらった。' },
    { word: '隣の人', reading: 'となりのひと', meaning: '邻居', phonetic: 'tonari no hito', exampleSentence: '隣の人は親切です。' },
    { word: '驚く', reading: 'おどろく', meaning: '惊讶', phonetic: 'odoroku', exampleSentence: 'そのニュースに驚いた。' },
  ],
}

async function main() {
  console.log('Seeding Japanese vocabulary...')

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
