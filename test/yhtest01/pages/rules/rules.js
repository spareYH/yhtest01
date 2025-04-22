// rules.js
Page({
  data: {},
  
  goBack: function() {
    wx.redirectTo({
      url: '/pages/index/index'
    })
  }
}) 