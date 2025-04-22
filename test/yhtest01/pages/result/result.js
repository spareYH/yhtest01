// result.js
Page({
  data: {
    score: 0,
    wordHistory: [],
    correctCount: 0,
    skipCount: 0
  },
  
  onLoad: function() {
    const gameResult = wx.getStorageSync('gameResult') || { score: 0, wordHistory: [] }
    
    // 计算猜对和跳过的数量
    let correctCount = 0
    let skipCount = 0
    
    gameResult.wordHistory.forEach(item => {
      if (item.correct) {
        correctCount++
      } else {
        skipCount++
      }
    })
    
    this.setData({
      score: gameResult.score,
      wordHistory: gameResult.wordHistory,
      correctCount: correctCount,
      skipCount: skipCount
    })
  },
  
  playAgain: function() {
    wx.redirectTo({
      url: '/pages/ready/ready'
    })
  },
  
  goToHome: function() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  
  shareScore: function() {
    wx.redirectTo({
      url: '/pages/share/share'
    })
  }
}) 