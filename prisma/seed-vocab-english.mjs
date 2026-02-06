import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categories = [
  { name: 'Nouns', nameZh: '名词', color: '#3B82F6' },
  { name: 'Verbs', nameZh: '动词', color: '#EF4444' },
  { name: 'Adjectives', nameZh: '形容词', color: '#EC4899' },
  { name: 'Adverbs', nameZh: '副词', color: '#F59E0B' },
  { name: 'Expressions', nameZh: '表达', color: '#10B981' },
]

const wordsByCategory = {
  'Nouns': [
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
    { word: 'water', meaning: '水', phonetic: '/ˈwɔːtər/', exampleSentence: 'Drink plenty of water every day.' },
    { word: 'coffee', meaning: '咖啡', phonetic: '/ˈkɔːfi/', exampleSentence: 'I need a cup of coffee in the morning.' },
    { word: 'apple', meaning: '苹果', phonetic: '/ˈæpəl/', exampleSentence: 'An apple a day keeps the doctor away.' },
    { word: 'rice', meaning: '米饭', phonetic: '/raɪs/', exampleSentence: 'Rice is a staple food in Asia.' },
    { word: 'airport', meaning: '机场', phonetic: '/ˈɛrpɔːrt/', exampleSentence: 'We arrived at the airport two hours early.' },
    { word: 'hotel', meaning: '酒店', phonetic: '/hoʊˈtɛl/', exampleSentence: 'We booked a hotel near the beach.' },
    { word: 'ticket', meaning: '票', phonetic: '/ˈtɪkɪt/', exampleSentence: 'I bought a round-trip ticket.' },
    { word: 'store', meaning: '商店', phonetic: '/stɔːr/', exampleSentence: 'The store closes at nine.' },
    { word: 'price', meaning: '价格', phonetic: '/praɪs/', exampleSentence: 'What is the price of this shirt?' },
    { word: 'head', meaning: '头', phonetic: '/hɛd/', exampleSentence: 'I have a headache.' },
    { word: 'hand', meaning: '手', phonetic: '/hænd/', exampleSentence: 'Wash your hands before eating.' },
    { word: 'mountain', meaning: '山', phonetic: '/ˈmaʊntən/', exampleSentence: 'The mountain is covered in snow.' },
    { word: 'river', meaning: '河', phonetic: '/ˈrɪvər/', exampleSentence: 'We swam in the river.' },
    { word: 'flower', meaning: '花', phonetic: '/ˈflaʊər/', exampleSentence: 'The flowers bloom in spring.' },
    { word: 'morning', meaning: '早晨', phonetic: '/ˈmɔːrnɪŋ/', exampleSentence: 'I jog every morning.' },
    { word: 'week', meaning: '周', phonetic: '/wiːk/', exampleSentence: 'I study five days a week.' },
    { word: 'year', meaning: '年', phonetic: '/jɪr/', exampleSentence: 'A year has twelve months.' },
    { word: 'mother', meaning: '母亲', phonetic: '/ˈmʌðər/', exampleSentence: 'My mother is a teacher.' },
    { word: 'father', meaning: '父亲', phonetic: '/ˈfɑːðər/', exampleSentence: 'My father works at a hospital.' },
    { word: 'child', meaning: '孩子', phonetic: '/tʃaɪld/', exampleSentence: 'The child is playing in the park.' },
    { word: 'teacher', meaning: '老师', phonetic: '/ˈtiːtʃər/', exampleSentence: 'Our teacher is very patient.' },
    { word: 'doctor', meaning: '医生', phonetic: '/ˈdɑːktər/', exampleSentence: 'The doctor said I am fine.' },
    { word: 'medicine', meaning: '药', phonetic: '/ˈmɛdɪsɪn/', exampleSentence: 'Take this medicine after meals.' },
    { word: 'rain', meaning: '雨', phonetic: '/reɪn/', exampleSentence: 'It will rain tomorrow.' },
    { word: 'sky', meaning: '天空', phonetic: '/skaɪ/', exampleSentence: 'The sky is full of stars tonight.' },
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
    { word: 'run', meaning: '跑', phonetic: '/rʌn/', exampleSentence: 'I run every morning.' },
    { word: 'walk', meaning: '走', phonetic: '/wɔːk/', exampleSentence: 'I walk to school.' },
    { word: 'think', meaning: '想/思考', phonetic: '/θɪŋk/', exampleSentence: 'I think this is a good idea.' },
    { word: 'know', meaning: '知道', phonetic: '/noʊ/', exampleSentence: 'I know the answer.' },
    { word: 'want', meaning: '想要', phonetic: '/wɑːnt/', exampleSentence: 'I want to travel abroad.' },
    { word: 'give', meaning: '给', phonetic: '/ɡɪv/', exampleSentence: 'Please give me a moment.' },
    { word: 'take', meaning: '拿/带', phonetic: '/teɪk/', exampleSentence: 'Take an umbrella with you.' },
  ],
  'Adjectives': [
    { word: 'big', meaning: '大的', phonetic: '/bɪɡ/', exampleSentence: 'That is a very big house.' },
    { word: 'small', meaning: '小的', phonetic: '/smɔːl/', exampleSentence: 'The small cat is cute.' },
    { word: 'expensive', meaning: '贵的', phonetic: '/ɪkˈspɛnsɪv/', exampleSentence: 'This bag is too expensive.' },
    { word: 'cheap', meaning: '便宜的', phonetic: '/tʃiːp/', exampleSentence: 'The food here is cheap and good.' },
    { word: 'new', meaning: '新的', phonetic: '/nuː/', exampleSentence: 'I bought a new phone.' },
    { word: 'old', meaning: '旧的/老的', phonetic: '/oʊld/', exampleSentence: 'This is an old building.' },
    { word: 'hot', meaning: '热的', phonetic: '/hɑːt/', exampleSentence: 'Be careful, the soup is hot.' },
    { word: 'cold', meaning: '冷的', phonetic: '/koʊld/', exampleSentence: "It's very cold outside." },
    { word: 'happy', meaning: '开心的', phonetic: '/ˈhæpi/', exampleSentence: "I'm so happy today!" },
    { word: 'sad', meaning: '悲伤的', phonetic: '/sæd/', exampleSentence: 'The movie made me sad.' },
    { word: 'difficult', meaning: '难的', phonetic: '/ˈdɪfɪkəlt/', exampleSentence: 'The exam was very difficult.' },
    { word: 'easy', meaning: '容易的', phonetic: '/ˈiːzi/', exampleSentence: 'This question is easy.' },
    { word: 'beautiful', meaning: '美丽的', phonetic: '/ˈbjuːtɪfəl/', exampleSentence: 'The sunset is beautiful.' },
    { word: 'fast', meaning: '快的', phonetic: '/fæst/', exampleSentence: 'He is a fast runner.' },
    { word: 'slow', meaning: '慢的', phonetic: '/sloʊ/', exampleSentence: 'The turtle is very slow.' },
    { word: 'strong', meaning: '强壮的', phonetic: '/strɔːŋ/', exampleSentence: 'He is very strong.' },
    { word: 'kind', meaning: '善良的', phonetic: '/kaɪnd/', exampleSentence: 'She is a very kind person.' },
    { word: 'busy', meaning: '忙的', phonetic: '/ˈbɪzi/', exampleSentence: 'I am very busy this week.' },
    { word: 'quiet', meaning: '安静的', phonetic: '/ˈkwaɪət/', exampleSentence: 'The library is very quiet.' },
    { word: 'dangerous', meaning: '危险的', phonetic: '/ˈdeɪndʒərəs/', exampleSentence: 'Swimming here is dangerous.' },
    { word: 'safe', meaning: '安全的', phonetic: '/seɪf/', exampleSentence: 'This neighborhood is very safe.' },
    { word: 'famous', meaning: '有名的', phonetic: '/ˈfeɪməs/', exampleSentence: 'This restaurant is very famous.' },
    { word: 'important', meaning: '重要的', phonetic: '/ɪmˈpɔːrtənt/', exampleSentence: 'Health is very important.' },
    { word: 'interesting', meaning: '有趣的', phonetic: '/ˈɪntrəstɪŋ/', exampleSentence: 'This book is very interesting.' },
  ],
  'Adverbs': [
    { word: 'always', meaning: '总是', phonetic: '/ˈɔːlweɪz/', exampleSentence: 'I always wake up early.' },
    { word: 'sometimes', meaning: '有时', phonetic: '/ˈsʌmtaɪmz/', exampleSentence: 'Sometimes I eat out.' },
    { word: 'never', meaning: '从不', phonetic: '/ˈnɛvər/', exampleSentence: 'I never drink alcohol.' },
    { word: 'often', meaning: '经常', phonetic: '/ˈɔːfən/', exampleSentence: 'I often go to the gym.' },
    { word: 'very', meaning: '非常', phonetic: '/ˈvɛri/', exampleSentence: 'This is very delicious.' },
    { word: 'already', meaning: '已经', phonetic: '/ɔːlˈrɛdi/', exampleSentence: 'I have already finished.' },
    { word: 'still', meaning: '仍然', phonetic: '/stɪl/', exampleSentence: 'I still remember that day.' },
    { word: 'together', meaning: '一起', phonetic: '/təˈɡɛðər/', exampleSentence: "Let's go together." },
    { word: 'quickly', meaning: '快速地', phonetic: '/ˈkwɪkli/', exampleSentence: 'Please come quickly.' },
    { word: 'slowly', meaning: '慢慢地', phonetic: '/ˈsloʊli/', exampleSentence: 'Please speak slowly.' },
    { word: 'really', meaning: '真的', phonetic: '/ˈriːəli/', exampleSentence: 'I really like this song.' },
    { word: 'maybe', meaning: '也许', phonetic: '/ˈmeɪbi/', exampleSentence: 'Maybe it will rain tomorrow.' },
  ],
  'Expressions': [
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
}

async function main() {
  console.log('Seeding English vocabulary...')

  // 只清理英语词汇数据，不影响其他表
  await prisma.vocabStudyProgress.deleteMany({ where: { word: { language: 'en' } } })
  await prisma.vocabWord.deleteMany({ where: { language: 'en' } })
  await prisma.vocabCategory.deleteMany({ where: { language: 'en' } })
  console.log('  Cleared existing English vocab data.')

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
