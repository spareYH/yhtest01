// share.js
Page({
  data: {
    score: 0,
    correctCount: 0,
    skipCount: 0,
    shareImagePath: ''
  },
  
  onLoad: function() {
    const gameResult = wx.getStorageSync('gameResult') || { score: 0, wordHistory: [] }
    
    // 计算猜对和跳过的数量
    let correctCount = 0
    let skipCount = 0
    
    if (gameResult.wordHistory) {
      gameResult.wordHistory.forEach(item => {
        if (item.correct) {
          correctCount++
        } else {
          skipCount++
        }
      })
    }
    
    this.setData({
      score: gameResult.score,
      correctCount,
      skipCount
    })
    
    // 添加控制台日志，便于调试
    console.log('分享页面加载成功', this.data)
  },
  
  generateShareImage: function() {
    // 实际应用中需要使用canvas绘制分享图片
    // 这里简化处理
    /* 
    this.setData({
      shareImagePath: '/assets/share-bg.png'
    })
    */
  },
  
  saveToAlbum: function() {
    // 实际应用中需要将生成的图片保存到相册
    wx.showToast({
      title: '图片已保存到相册',
      icon: 'success'
    })
  },
  
  goBack: function() {
    // 修复返回功能，使用reLaunch返回结果页
    wx.redirectTo({
      url: '/pages/result/result'
    })
  },
  
  goToHome: function() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  }
}) 