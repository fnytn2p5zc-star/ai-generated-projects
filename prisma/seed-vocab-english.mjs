import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categories = [
  { name: 'Greetings', nameZh: '问候', color: '#3B82F6' },
  { name: 'Numbers', nameZh: '数字', color: '#10B981' },
  { name: 'Food', nameZh: '食物', color: '#F59E0B' },
  { name: 'Daily Life', nameZh: '日常生活', color: '#8B5CF6' },
  { name: 'Adjectives', nameZh: '形容词', color: '#EC4899' },
  { name: 'Verbs', nameZh: '动词', color: '#EF4444' },
  { name: 'Travel', nameZh: '旅行', color: '#0EA5E9' },
  { name: 'Shopping', nameZh: '购物', color: '#D946EF' },
  { name: 'Body & Health', nameZh: '身体与健康', color: '#14B8A6' },
  { name: 'Colors & Nature', nameZh: '颜色与自然', color: '#F97316' },
  { name: 'Time & Calendar', nameZh: '时间日历', color: '#6366F1' },
  { name: 'Feelings & People', nameZh: '情感与人物', color: '#F43F5E' },
]

const wordsByCategory = {
  'Greetings': [
    { word: 'hello', meaning: '你好', phonetic: '/həˈloʊ/', exampleSentence: 'Hello, how are you today?' },
    { word: 'goodbye', meaning: '再见', phonetic: '/ɡʊdˈbaɪ/', exampleSentence: 'Goodbye, see you tomorrow!' },
    { word: 'thank you', meaning: '谢谢', phonetic: '/θæŋk juː/', exampleSentence: 'Thank you for your help.' },
    { word: 'please', meaning: '请', phonetic: '/pliːz/', exampleSentence: 'Please sit down.' },
    { word: 'sorry', meaning: '对不起', phonetic: '/ˈsɑːri/', exampleSentence: "I'm sorry for being late." },
    { word: 'excuse me', meaning: '打扰一下', phonetic: '/ɪkˈskjuːz miː/', exampleSentence: 'Excuse me, where is the station?' },
    { word: 'good morning', meaning: '早上好', phonetic: '/ɡʊd ˈmɔːrnɪŋ/', exampleSentence: 'Good morning, everyone!' },
    { word: 'good night', meaning: '晚安', phonetic: '/ɡʊd naɪt/', exampleSentence: 'Good night, sleep well.' },
    { word: "you're welcome", meaning: '不客气', phonetic: '/jʊr ˈwɛlkəm/', exampleSentence: "You're welcome, anytime!" },
    { word: 'nice to meet you', meaning: '很高兴认识你', phonetic: '/naɪs tuː miːt juː/', exampleSentence: "Nice to meet you, I'm Tom." },
    { word: 'how are you', meaning: '你好吗', phonetic: '/haʊ ɑːr juː/', exampleSentence: 'How are you doing today?' },
    { word: 'see you later', meaning: '回头见', phonetic: '/siː juː ˈleɪtər/', exampleSentence: 'See you later at the party!' },
  ],
  'Numbers': [
    { word: 'one', meaning: '一', phonetic: '/wʌn/', exampleSentence: 'I have one cat.' },
    { word: 'two', meaning: '二', phonetic: '/tuː/', exampleSentence: 'Two cups of coffee, please.' },
    { word: 'three', meaning: '三', phonetic: '/θriː/', exampleSentence: 'There are three books on the table.' },
    { word: 'four', meaning: '四', phonetic: '/fɔːr/', exampleSentence: 'The meeting is at four o\'clock.' },
    { word: 'five', meaning: '五', phonetic: '/faɪv/', exampleSentence: 'Give me five minutes.' },
    { word: 'six', meaning: '六', phonetic: '/sɪks/', exampleSentence: 'Six people are coming to dinner.' },
    { word: 'seven', meaning: '七', phonetic: '/ˈsɛvən/', exampleSentence: 'There are seven days in a week.' },
    { word: 'eight', meaning: '八', phonetic: '/eɪt/', exampleSentence: 'School starts at eight.' },
    { word: 'nine', meaning: '九', phonetic: '/naɪn/', exampleSentence: 'September is the ninth month.' },
    { word: 'ten', meaning: '十', phonetic: '/tɛn/', exampleSentence: 'I scored ten out of ten.' },
    { word: 'hundred', meaning: '一百', phonetic: '/ˈhʌndrəd/', exampleSentence: 'There are a hundred students in the hall.' },
    { word: 'thousand', meaning: '一千', phonetic: '/ˈθaʊzənd/', exampleSentence: 'A thousand miles begins with a single step.' },
    { word: 'million', meaning: '一百万', phonetic: '/ˈmɪljən/', exampleSentence: 'The city has over a million people.' },
  ],
  'Food': [
    { word: 'apple', meaning: '苹果', phonetic: '/ˈæpəl/', exampleSentence: 'An apple a day keeps the doctor away.' },
    { word: 'banana', meaning: '香蕉', phonetic: '/bəˈnænə/', exampleSentence: 'I had a banana for breakfast.' },
    { word: 'bread', meaning: '面包', phonetic: '/brɛd/', exampleSentence: 'Fresh bread smells wonderful.' },
    { word: 'rice', meaning: '米饭', phonetic: '/raɪs/', exampleSentence: 'Rice is a staple food in Asia.' },
    { word: 'chicken', meaning: '鸡肉', phonetic: '/ˈtʃɪkɪn/', exampleSentence: 'I ordered grilled chicken.' },
    { word: 'fish', meaning: '鱼', phonetic: '/fɪʃ/', exampleSentence: 'Fresh fish is very healthy.' },
    { word: 'water', meaning: '水', phonetic: '/ˈwɔːtər/', exampleSentence: 'Drink plenty of water every day.' },
    { word: 'coffee', meaning: '咖啡', phonetic: '/ˈkɔːfi/', exampleSentence: 'I need a cup of coffee in the morning.' },
    { word: 'tea', meaning: '茶', phonetic: '/tiː/', exampleSentence: 'Would you like some tea?' },
    { word: 'egg', meaning: '鸡蛋', phonetic: '/ɛɡ/', exampleSentence: 'I like my eggs scrambled.' },
    { word: 'milk', meaning: '牛奶', phonetic: '/mɪlk/', exampleSentence: 'Children should drink milk every day.' },
    { word: 'vegetable', meaning: '蔬菜', phonetic: '/ˈvɛdʒtəbəl/', exampleSentence: 'Eat more vegetables for better health.' },
  ],
  'Daily Life': [
    { word: 'home', meaning: '家', phonetic: '/hoʊm/', exampleSentence: "I'm going home now." },
    { word: 'school', meaning: '学校', phonetic: '/skuːl/', exampleSentence: 'School starts at 8 AM.' },
    { word: 'work', meaning: '工作', phonetic: '/wɜːrk/', exampleSentence: 'I go to work by train.' },
    { word: 'car', meaning: '汽车', phonetic: '/kɑːr/', exampleSentence: 'My car is parked outside.' },
    { word: 'time', meaning: '时间', phonetic: '/taɪm/', exampleSentence: 'What time is it now?' },
    { word: 'friend', meaning: '朋友', phonetic: '/frɛnd/', exampleSentence: 'She is my best friend.' },
    { word: 'weather', meaning: '天气', phonetic: '/ˈwɛðər/', exampleSentence: 'The weather is nice today.' },
    { word: 'phone', meaning: '电话/手机', phonetic: '/foʊn/', exampleSentence: 'I left my phone at home.' },
    { word: 'book', meaning: '书', phonetic: '/bʊk/', exampleSentence: 'I read a book every night.' },
    { word: 'money', meaning: '钱', phonetic: '/ˈmʌni/', exampleSentence: "I don't have enough money." },
    { word: 'family', meaning: '家人', phonetic: '/ˈfæməli/', exampleSentence: 'Family is very important to me.' },
    { word: 'today', meaning: '今天', phonetic: '/təˈdeɪ/', exampleSentence: 'What are you doing today?' },
    { word: 'tomorrow', meaning: '明天', phonetic: '/təˈmɑːroʊ/', exampleSentence: 'Tomorrow is a holiday.' },
  ],
  'Adjectives': [
    { word: 'big', meaning: '大的', phonetic: '/bɪɡ/', exampleSentence: 'That is a very big house.' },
    { word: 'small', meaning: '小的', phonetic: '/smɔːl/', exampleSentence: 'The small cat is cute.' },
    { word: 'expensive', meaning: '贵的', phonetic: '/ɪkˈspɛnsɪv/', exampleSentence: 'This bag is too expensive.' },
    { word: 'cheap', meaning: '便宜的', phonetic: '/tʃiːp/', exampleSentence: 'The food here is cheap and good.' },
    { word: 'new', meaning: '新的', phonetic: '/nuː/', exampleSentence: 'I bought a new phone.' },
    { word: 'old', meaning: '旧的/老的', phonetic: '/oʊld/', exampleSentence: 'This is an old building.' },
    { word: 'delicious', meaning: '美味的', phonetic: '/dɪˈlɪʃəs/', exampleSentence: 'The cake is delicious.' },
    { word: 'hot', meaning: '热的', phonetic: '/hɑːt/', exampleSentence: 'Be careful, the soup is hot.' },
    { word: 'cold', meaning: '冷的', phonetic: '/koʊld/', exampleSentence: "It's very cold outside." },
    { word: 'happy', meaning: '开心的', phonetic: '/ˈhæpi/', exampleSentence: "I'm so happy today!" },
    { word: 'difficult', meaning: '难的', phonetic: '/ˈdɪfɪkəlt/', exampleSentence: 'The exam was very difficult.' },
    { word: 'easy', meaning: '容易的', phonetic: '/ˈiːzi/', exampleSentence: 'This question is easy.' },
  ],
  'Verbs': [
    { word: 'eat', meaning: '吃', phonetic: '/iːt/', exampleSentence: "Let's eat lunch together." },
    { word: 'drink', meaning: '喝', phonetic: '/drɪŋk/', exampleSentence: 'I drink water every morning.' },
    { word: 'go', meaning: '去', phonetic: '/ɡoʊ/', exampleSentence: "Let's go to the park." },
    { word: 'come', meaning: '来', phonetic: '/kʌm/', exampleSentence: 'Please come to my party.' },
    { word: 'see', meaning: '看', phonetic: '/siː/', exampleSentence: 'I can see the mountain from here.' },
    { word: 'hear', meaning: '听到', phonetic: '/hɪr/', exampleSentence: 'Can you hear the music?' },
    { word: 'speak', meaning: '说', phonetic: '/spiːk/', exampleSentence: 'Do you speak English?' },
    { word: 'read', meaning: '读', phonetic: '/riːd/', exampleSentence: 'I read the newspaper every morning.' },
    { word: 'write', meaning: '写', phonetic: '/raɪt/', exampleSentence: 'Please write your name here.' },
    { word: 'buy', meaning: '买', phonetic: '/baɪ/', exampleSentence: 'I want to buy a new laptop.' },
    { word: 'sleep', meaning: '睡觉', phonetic: '/sliːp/', exampleSentence: 'I usually sleep at 11 PM.' },
    { word: 'wake up', meaning: '起床', phonetic: '/weɪk ʌp/', exampleSentence: 'I wake up at 6 AM.' },
    { word: 'make', meaning: '做/制作', phonetic: '/meɪk/', exampleSentence: "I'll make dinner tonight." },
  ],
  'Travel': [
    { word: 'airport', meaning: '机场', phonetic: '/ˈɛrpɔːrt/', exampleSentence: 'We arrived at the airport two hours early.' },
    { word: 'passport', meaning: '护照', phonetic: '/ˈpæspɔːrt/', exampleSentence: 'Don\'t forget your passport.' },
    { word: 'hotel', meaning: '酒店', phonetic: '/hoʊˈtɛl/', exampleSentence: 'We booked a hotel near the beach.' },
    { word: 'ticket', meaning: '票', phonetic: '/ˈtɪkɪt/', exampleSentence: 'I bought a round-trip ticket.' },
    { word: 'luggage', meaning: '行李', phonetic: '/ˈlʌɡɪdʒ/', exampleSentence: 'My luggage is very heavy.' },
    { word: 'map', meaning: '地图', phonetic: '/mæp/', exampleSentence: 'Can you read this map?' },
    { word: 'tourist', meaning: '游客', phonetic: '/ˈtʊrɪst/', exampleSentence: 'Many tourists visit this temple.' },
    { word: 'flight', meaning: '航班', phonetic: '/flaɪt/', exampleSentence: 'Our flight departs at noon.' },
    { word: 'reservation', meaning: '预约', phonetic: '/ˌrɛzərˈveɪʃən/', exampleSentence: 'I have a reservation for tonight.' },
    { word: 'destination', meaning: '目的地', phonetic: '/ˌdɛstɪˈneɪʃən/', exampleSentence: 'What is your final destination?' },
    { word: 'souvenir', meaning: '纪念品', phonetic: '/ˌsuːvəˈnɪr/', exampleSentence: 'I bought souvenirs for my family.' },
    { word: 'suitcase', meaning: '手提箱', phonetic: '/ˈsuːtkeɪs/', exampleSentence: 'Pack your suitcase the night before.' },
    { word: 'journey', meaning: '旅程', phonetic: '/ˈdʒɜːrni/', exampleSentence: 'The journey took about three hours.' },
  ],
  'Shopping': [
    { word: 'price', meaning: '价格', phonetic: '/praɪs/', exampleSentence: 'What is the price of this shirt?' },
    { word: 'discount', meaning: '折扣', phonetic: '/ˈdɪskaʊnt/', exampleSentence: 'There is a 20% discount today.' },
    { word: 'receipt', meaning: '收据', phonetic: '/rɪˈsiːt/', exampleSentence: 'Please keep the receipt.' },
    { word: 'cash', meaning: '现金', phonetic: '/kæʃ/', exampleSentence: 'Do you accept cash?' },
    { word: 'credit card', meaning: '信用卡', phonetic: '/ˈkrɛdɪt kɑːrd/', exampleSentence: 'Can I pay by credit card?' },
    { word: 'size', meaning: '尺寸', phonetic: '/saɪz/', exampleSentence: 'What size do you wear?' },
    { word: 'store', meaning: '商店', phonetic: '/stɔːr/', exampleSentence: 'The store closes at nine.' },
    { word: 'customer', meaning: '顾客', phonetic: '/ˈkʌstəmər/', exampleSentence: 'The customer is always right.' },
    { word: 'sale', meaning: '促销', phonetic: '/seɪl/', exampleSentence: 'The big sale starts tomorrow.' },
    { word: 'change', meaning: '找零', phonetic: '/tʃeɪndʒ/', exampleSentence: 'Here is your change.' },
    { word: 'brand', meaning: '品牌', phonetic: '/brænd/', exampleSentence: 'Which brand do you prefer?' },
    { word: 'refund', meaning: '退款', phonetic: '/ˈriːfʌnd/', exampleSentence: 'I would like a refund, please.' },
    { word: 'bargain', meaning: '便宜货', phonetic: '/ˈbɑːrɡən/', exampleSentence: 'That dress was a real bargain.' },
  ],
  'Body & Health': [
    { word: 'head', meaning: '头', phonetic: '/hɛd/', exampleSentence: 'I have a headache.' },
    { word: 'hand', meaning: '手', phonetic: '/hænd/', exampleSentence: 'Wash your hands before eating.' },
    { word: 'eye', meaning: '眼睛', phonetic: '/aɪ/', exampleSentence: 'She has beautiful blue eyes.' },
    { word: 'heart', meaning: '心脏', phonetic: '/hɑːrt/', exampleSentence: 'Exercise is good for your heart.' },
    { word: 'stomach', meaning: '胃/肚子', phonetic: '/ˈstʌmək/', exampleSentence: 'My stomach hurts after lunch.' },
    { word: 'medicine', meaning: '药', phonetic: '/ˈmɛdɪsɪn/', exampleSentence: 'Take this medicine after meals.' },
    { word: 'fever', meaning: '发烧', phonetic: '/ˈfiːvər/', exampleSentence: 'She has a high fever.' },
    { word: 'exercise', meaning: '锻炼', phonetic: '/ˈɛksərsaɪz/', exampleSentence: 'I exercise every morning.' },
    { word: 'tooth', meaning: '牙齿', phonetic: '/tuːθ/', exampleSentence: 'Brush your teeth twice a day.' },
    { word: 'leg', meaning: '腿', phonetic: '/lɛɡ/', exampleSentence: 'My leg is sore from running.' },
    { word: 'shoulder', meaning: '肩膀', phonetic: '/ˈʃoʊldər/', exampleSentence: 'He put his hand on my shoulder.' },
    { word: 'cough', meaning: '咳嗽', phonetic: '/kɔːf/', exampleSentence: 'I have a bad cough.' },
    { word: 'healthy', meaning: '健康的', phonetic: '/ˈhɛlθi/', exampleSentence: 'Eating fruit is healthy.' },
  ],
  'Colors & Nature': [
    { word: 'red', meaning: '红色', phonetic: '/rɛd/', exampleSentence: 'She wore a red dress.' },
    { word: 'blue', meaning: '蓝色', phonetic: '/bluː/', exampleSentence: 'The sky is clear blue today.' },
    { word: 'green', meaning: '绿色', phonetic: '/ɡriːn/', exampleSentence: 'The leaves turn green in spring.' },
    { word: 'yellow', meaning: '黄色', phonetic: '/ˈjɛloʊ/', exampleSentence: 'Sunflowers are bright yellow.' },
    { word: 'white', meaning: '白色', phonetic: '/waɪt/', exampleSentence: 'Snow is white and soft.' },
    { word: 'black', meaning: '黑色', phonetic: '/blæk/', exampleSentence: 'He drives a black car.' },
    { word: 'mountain', meaning: '山', phonetic: '/ˈmaʊntən/', exampleSentence: 'The mountain is covered in snow.' },
    { word: 'river', meaning: '河', phonetic: '/ˈrɪvər/', exampleSentence: 'We swam in the river.' },
    { word: 'flower', meaning: '花', phonetic: '/ˈflaʊər/', exampleSentence: 'The flowers bloom in spring.' },
    { word: 'tree', meaning: '树', phonetic: '/triː/', exampleSentence: 'There is a tall tree in the garden.' },
    { word: 'sky', meaning: '天空', phonetic: '/skaɪ/', exampleSentence: 'The sky is full of stars tonight.' },
    { word: 'ocean', meaning: '海洋', phonetic: '/ˈoʊʃən/', exampleSentence: 'The ocean looks beautiful at sunset.' },
    { word: 'rain', meaning: '雨', phonetic: '/reɪn/', exampleSentence: 'It will rain tomorrow.' },
  ],
  'Time & Calendar': [
    { word: 'morning', meaning: '早晨', phonetic: '/ˈmɔːrnɪŋ/', exampleSentence: 'I jog every morning.' },
    { word: 'afternoon', meaning: '下午', phonetic: '/ˌæftərˈnuːn/', exampleSentence: 'The meeting is this afternoon.' },
    { word: 'evening', meaning: '傍晚', phonetic: '/ˈiːvnɪŋ/', exampleSentence: 'We had dinner in the evening.' },
    { word: 'night', meaning: '夜晚', phonetic: '/naɪt/', exampleSentence: 'The city is beautiful at night.' },
    { word: 'week', meaning: '周', phonetic: '/wiːk/', exampleSentence: 'I study five days a week.' },
    { word: 'month', meaning: '月', phonetic: '/mʌnθ/', exampleSentence: 'January is the first month.' },
    { word: 'year', meaning: '年', phonetic: '/jɪr/', exampleSentence: 'A year has twelve months.' },
    { word: 'yesterday', meaning: '昨天', phonetic: '/ˈjɛstərdeɪ/', exampleSentence: 'I was busy yesterday.' },
    { word: 'minute', meaning: '分钟', phonetic: '/ˈmɪnɪt/', exampleSentence: 'Wait just one minute.' },
    { word: 'hour', meaning: '小时', phonetic: '/aʊr/', exampleSentence: 'The movie is two hours long.' },
    { word: 'spring', meaning: '春天', phonetic: '/sprɪŋ/', exampleSentence: 'Flowers bloom in spring.' },
    { word: 'summer', meaning: '夏天', phonetic: '/ˈsʌmər/', exampleSentence: 'Summer is my favorite season.' },
    { word: 'winter', meaning: '冬天', phonetic: '/ˈwɪntər/', exampleSentence: 'It snows a lot in winter.' },
  ],
  'Feelings & People': [
    { word: 'love', meaning: '爱', phonetic: '/lʌv/', exampleSentence: 'I love my family.' },
    { word: 'angry', meaning: '生气的', phonetic: '/ˈæŋɡri/', exampleSentence: 'She was angry at the mistake.' },
    { word: 'sad', meaning: '悲伤的', phonetic: '/sæd/', exampleSentence: 'The movie made me sad.' },
    { word: 'tired', meaning: '累的', phonetic: '/taɪrd/', exampleSentence: 'I am very tired after work.' },
    { word: 'excited', meaning: '兴奋的', phonetic: '/ɪkˈsaɪtɪd/', exampleSentence: 'The kids are excited about the trip.' },
    { word: 'nervous', meaning: '紧张的', phonetic: '/ˈnɜːrvəs/', exampleSentence: 'I feel nervous before exams.' },
    { word: 'mother', meaning: '母亲', phonetic: '/ˈmʌðər/', exampleSentence: 'My mother is a teacher.' },
    { word: 'father', meaning: '父亲', phonetic: '/ˈfɑːðər/', exampleSentence: 'My father works at a hospital.' },
    { word: 'child', meaning: '孩子', phonetic: '/tʃaɪld/', exampleSentence: 'The child is playing in the park.' },
    { word: 'teacher', meaning: '老师', phonetic: '/ˈtiːtʃər/', exampleSentence: 'Our teacher is very patient.' },
    { word: 'doctor', meaning: '医生', phonetic: '/ˈdɑːktər/', exampleSentence: 'The doctor said I am fine.' },
    { word: 'neighbor', meaning: '邻居', phonetic: '/ˈneɪbər/', exampleSentence: 'My neighbor is very friendly.' },
    { word: 'surprised', meaning: '惊讶的', phonetic: '/sərˈpraɪzd/', exampleSentence: 'I was surprised by the gift.' },
  ],
}

async function main() {
  console.log('Seeding English vocabulary...')

  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i]
    const created = await prisma.vocabCategory.upsert({
      where: { language_name: { language: 'en', name: cat.name } },
      update: { nameZh: cat.nameZh, color: cat.color, position: i },
      create: {
        name: cat.name,
        nameZh: cat.nameZh,
        language: 'en',
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
          reading: null,
          meaning: w.meaning,
          phonetic: w.phonetic,
          exampleSentence: w.exampleSentence,
          language: 'en',
          categoryId: created.id,
          position: j,
        },
      })
    }

    console.log(`  Created category "${cat.name}" with ${words.length} words`)
  }

  console.log('English vocabulary seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
