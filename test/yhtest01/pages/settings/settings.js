// settings.js
Page({
  data: {
    soundEnabled: true,
    timeOptions: [
      {name: '30秒', value: 30},
      {name: '60秒', value: 60},
      {name: '90秒', value: 90}
    ],
    selectedTime: 60,
    wordOptions: [
      {name: '普通', value: 'normal'},
      {name: '困难', value: 'hard'},
      {name: '自定义', value: 'custom'}
    ],
    selectedWordSet: 'normal'
  },
  
  goBack: function() {
    wx.redirectTo({
      url: '/pages/index/index'
    })
  },
  
  toggleSound: function() {
    this.setData({
      soundEnabled: !this.data.soundEnabled
    })
    // 保存设置
    wx.setStorageSync('soundEnabled', this.data.soundEnabled)
  },
  
  selectTime: function(e) {
    const selectedTime = parseInt(e.currentTarget.dataset.time)
    this.setData({
      selectedTime: selectedTime
    })
    // 保存设置
    wx.setStorageSync('gameTime', selectedTime)
  },
  
  selectWordSet: function(e) {
    const selectedWordSet = e.currentTarget.dataset.wordset
    this.setData({
      selectedWordSet: selectedWordSet
    })
    // 保存设置
    wx.setStorageSync('wordSet', selectedWordSet)
  },
  
  onLoad: function() {
    // 从本地存储获取设置
    const soundEnabled = wx.getStorageSync('soundEnabled')
    const gameTime = wx.getStorageSync('gameTime')
    const wordSet = wx.getStorageSync('wordSet')
    
    // 如果设置存在，则应用它们
    if (soundEnabled !== '') {
      this.setData({ soundEnabled: soundEnabled })
    }
    
    if (gameTime) {
      this.setData({ selectedTime: gameTime })
    }
    
    if (wordSet) {
      this.setData({ selectedWordSet: wordSet })
    }
  }
}) 