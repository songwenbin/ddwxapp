
const Battle = require('../../upyun/battle')
const battle = new Battle()
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    token: null,
    battle: null,
    duileftid: 0,
    duirightid: 0,
    duiid: 0,
    src : null,
    side : null,
    targetid : null,
    userid: null,
    videoid: null,
    title: null,
  },

  DuiFunction: function(test) {
    var that = this 
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        const wxsrc = res.tempFilePath
        console.log(wx)
        battle.user_id = that.data.userid
        battle.user_token = that.data.token
        battle.duiid = test.target.id
        battle.title = that.data.title
        battle.CreateBattle(wxsrc)
      },
      fail: function ({errMsg}) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  },

  GetBattle: function (id) {
    var that = this
    console.log(that.data.token);
    app.request()
      .get('https://dd.doudouapp.com/api/v1/battles/' + id + '.json')
      .query({
        appid: 'app123',
        appsecret: '333',
        user_email: 'songwenbin@outlook.com',
        user_token: that.data.token
      })
      .end()
      .then(function (res) {
        console.log(res.data)
        that.setData({
          battle: res.data,
          duileftid: res.data.left_video_id,
          duirightid: res.data.right_video_id,
          title: res.data.title,
        })
      })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    this.setData({
      side: that.options.side,
      targetid: that.options.id,
      duileftid: that.options.duileftid,
      duirightid: that.options.duirightid,
      userid : that.options.userid,
      token: that.options.token,
    })
    that.GetBattle(that.data.targetid)
  }
})
