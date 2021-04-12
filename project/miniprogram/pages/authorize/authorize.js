// miniprogram/pages/authorize/authorize.js

const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    isHide: false,
    userId: '',
    isLogin:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取openid

    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        console.log('调用login云函数返回的res',res)
        app.globalData.openid = res.result.openid;
        // 查看是否授权
        const db = wx.cloud.database();
          db.collection('users').get({
            success: res => {
              console.log(res.data);
              console.log(app.globalData.openid)
              for (var i = 0; i < res.data.length; i++) {
                if (res.data[i]._openid == app.globalData.openid) {
                  this.setData({
                    isLogin:true,
                    isHide:false
                  },()=>{
                    wx.switchTab({
                      url: '../shouye/shouye',
                    })
                  })
                }
              }
              if(!this.data.isLogin){
                this.setData({
                  isHide:true
                })
              }
            }
          })
      }
    })
    },
    getUserProfile: function(e) {
      wx.getUserProfile({
        desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          //用户按了允许授权按钮
          
          // 获取到用户的信息了，打印到控制台上看下
          console.log("用户的信息如下：");
          console.log(res.userInfo);
          //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
          this.setData({
              isHide: false,
          });
          const db = wx.cloud.database()
            db.collection('users').add({
            data: {
                nickName:res.userInfo.nickName,
                avatarUrl:res.userInfo.avatarUrl
            },
            success: res => {
                // 在返回结果中会包含新创建的记录的 _id
                this.setData({
                  userId: res._id,
                });
                app.globalData.openid=res._openid
            }
          });
          wx.switchTab({
            url: '../shouye/shouye',
          })
        },
        fail:err=>{
          //用户按了拒绝按钮
          wx.showModal({
            title: '警告',
            content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
            showCancel: false,
            confirmText: '返回授权',
            success: function(res) {
                // 用户没有授权成功，不需要改变 isHide 的值
                if (res.confirm) {
                    console.log('用户点击了“返回授权”');
                }
            }
          });
        }
      })
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