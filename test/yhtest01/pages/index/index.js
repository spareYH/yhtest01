// index.js
Page({
  data: {},
  
  startGame: function() {
    wx.redirectTo({
      url: '/pages/ready/ready'
    })
  }, 
  
  goToRules: function() {
    wx.redirectTo({
      url: '/pages/rules/rules'
    })
  },
  
  goToSettings: function() {
    wx.redirectTo({
      url: '/pages/settings/settings'
    })
  }
})
