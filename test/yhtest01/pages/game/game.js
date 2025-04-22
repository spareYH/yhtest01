// game.js
Page({
  data: {
    timeLeft: 60, // 默认60秒
    word: '',
    score: 0,
    wordHistory: [],
    correctActive: false,
    skipActive: false
  },
  
  onLoad: function() {
    // 从存储获取游戏时间设置
    const gameTime = wx.getStorageSync('gameTime') || 60
    this.setData({
      timeLeft: gameTime
    })
    
    // 获取词库设置
    const wordSet = wx.getStorageSync('wordSet') || 'normal'
    
    // 初始化词库（实际应用中应有更多词语）
    this.wordList = this.getWordList(wordSet)
    
    // 开始游戏
    this.startGame()
  },
  
  getWordList: function(wordSet) {
    // 简易词库，实际应用中应有更多词语和分类
    const normalWords = ['苹果', '篮球', '电脑', '钢琴', '跑步', '游泳', '电影', 
                        '太阳', '月亮', '手机', '风筝', '眼镜', '雨伞', '手表', 
                        '足球', '雪人', '牙刷', '钢笔', '电视', '热狗']
    
    const hardWords = ['拖延症', '夜猫子', '双簧', '变色龙', '千里马', '孔雀开屏', 
                      '理发师', '考古学', '滑雪', '虎头蛇尾', '纸上谈兵', 
                      '口是心非', '大惊小怪', '七上八下', '狐假虎威']
    
    switch(wordSet) {
      case 'hard':
        return hardWords
      case 'custom':
        // 自定义词库暂未实现，使用普通词库
        return normalWords
      default:
        return normalWords
    }
  },
  
  startGame: function() {
    // 获取第一个词
    this.getNextWord()
    
    // 启动计时器
    this.timer = setInterval(() => {
      if (this.data.timeLeft <= 1) {
        this.endGame()
      } else {
        this.setData({
          timeLeft: this.data.timeLeft - 1
        })
      }
    }, 1000)
  },
  
  getNextWord: function() {
    if (this.wordList.length === 0) {
      // 所有词语都用完了
      this.endGame()
      return
    }
    
    // 随机选择一个词
    const randomIndex = Math.floor(Math.random() * this.wordList.length)
    const nextWord = this.wordList[randomIndex]
    
    // 从词库中移除此词
    this.wordList.splice(randomIndex, 1)
    
    this.setData({
      word: nextWord
    })
  },
  
  onCorrect: function() {
    // 点击反馈
    this.setData({ correctActive: true })
    
    setTimeout(() => {
      this.setData({ correctActive: false })
      
      // 猜对了
      const { word, score, wordHistory } = this.data
      
      // 更新分数和历史记录
      this.setData({
        score: score + 1,
        wordHistory: [...wordHistory, { word, correct: true }]
      })
      
      // 播放声音反馈（如果启用了音效）
      if (wx.getStorageSync('soundEnabled') !== false) {
        // 实际应用中需添加声音资源
        // wx.createInnerAudioContext().src = '/assets/correct.mp3'
      }
      
      // 下一个词
      this.getNextWord()
    }, 200)
  },
  
  onSkip: function() {
    // 点击反馈
    this.setData({ skipActive: true })
    
    setTimeout(() => {
      this.setData({ skipActive: false })
      
      // 跳过当前词
      const { word, wordHistory } = this.data
      
      // 更新历史记录
      this.setData({
        wordHistory: [...wordHistory, { word, correct: false }]
      })
      
      // 播放声音反馈（如果启用了音效）
      if (wx.getStorageSync('soundEnabled') !== false) {
        // 实际应用中需添加声音资源
        // wx.createInnerAudioContext().src = '/assets/skip.mp3'
      }
      
      // 下一个词
      this.getNextWord()
    }, 200)
  },
  
  endGame: function() {
    // 清除计时器
    clearInterval(this.timer)
    
    // 保存结果
    wx.setStorageSync('gameResult', {
      score: this.data.score,
      wordHistory: this.data.wordHistory
    })
    
    // 跳转到结果页
    wx.redirectTo({
      url: '/pages/result/result'
    })
  },
  
  onUnload: function() {
    // 当页面卸载时清除计时器
    clearInterval(this.timer)
  }
}) 