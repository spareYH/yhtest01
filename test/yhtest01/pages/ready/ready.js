// ready.js
Page({
  data: {
    countdown: 3
  },
  
  onLoad: function() {
    this.startCountdown()
  },
  
  startCountdown: function() {
    const countdownInterval = setInterval(() => {
      if (this.data.countdown <= 1) {
        clearInterval(countdownInterval)
        // 倒计时结束后跳转到游戏页面
        wx.redirectTo({
          url: '/pages/game/game'
        })
      } else {
        this.setData({
          countdown: this.data.countdown - 1
        })
      }
    }, 1000)
  }
}) 