// miniprogram/pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",//用户唯一标识
    nickName:'',//用户昵称
    avatarUrl:''//用户头像
  },
  //跳转到我的评论页面
  intoPing:function(e){
    wx.navigateTo({
      url: '/pages/mine/remark/remark',
    })
  },
  //跳转到我的收藏页面
  intoLike:function(e){
    wx.navigateTo({
      url: '/pages/mine/like/like',
    })
  },
  //跳转到我的信息页面
  intoMine:function(e){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
/**王丽娜******************************************* */
    //将用户的唯一标识赋给this.data.openid
    const db = wx.cloud.database()
    const _ = db.command
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      },()=>{
        db.collection('users').where({
          _openid: _.eq(this.data.openid)
        })
        .get({
          success: res => {
            this.setData({
              nickName:res.data[0].nickName,//用户昵称
              avatarUrl:res.data[0].avatarUrl//用户头像
            })
            console.log(res.data)
            console.log('[数据库] [查询记录] 成功: ', this.data.nickName)
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '加载失败'
            })
            console.error('[数据库] [查询记录] 失败：', err)
          }
        })
      })
    }
    /************************************************************** */
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})