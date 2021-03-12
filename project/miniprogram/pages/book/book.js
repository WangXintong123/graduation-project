// miniprogram/pages/book/book.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",//用户唯一标识

    kemu:[{name:'数学',src:'./image/shuxue.png',book:[{bname:'《张宇高等数学18讲》',point:9.6},{bname:'《张宇线性代数18讲》',point:9.5},{bname:'《张宇概率18讲》',point:9.2}]},
    {name:'英语',src:'./image/shuxue.png',book:[{bname:'《考研真相》',point:9.7},{bname:'《语法的逻辑》',point:9.1},{bname:'《阅读的逻辑》',point:8.9}]},
    {name:'政治',src:'./image/shuxue.png',book:[{bname:'《肖秀荣4套卷》',point:9.9},{bname:'《肖秀荣8套卷》',point:9.6},{bname:'《肖秀荣1000题》',point:9.4}]},
    {name:'计算机',src:'./image/shuxue.png', book:[{bname:'《王道数据结构》',point:9.1},{bname:'《王道计算机组成原理》',point:8.5},{bname:'《王道操作系统》',point:8.2}]}
  ]
  },
  //进入书榜单详情页
  intoDetail:function(){
    wx.navigateTo({
      url: '/pages/book/list/list',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
/**王丽娜******************************************* */
    //将用户的唯一标识赋给this.data.openid
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
    const db = wx.cloud.database()
    const _ = db.command
    // 查询数学书信息，只显示前三个，并按热度从高到低输出
    db.collection('books').where({
      subject: _.eq("math")
    }).orderBy('bookrating.score', 'desc')
    .limit(3)
    .get({
      success: res => {
        // this.setData({
        //   math:res.data
        // })
        console.log('[数据库] [查询记录] 成功: ', res.data)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '加载失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
    // 查询英语书信息，只显示前三个，并按热度从高到低输出
    db.collection('books').where({
      subject: _.eq("English")
    }).orderBy('bookrating.score', 'desc')
    .limit(3)
    .get({
      success: res => {
        // this.setData({
        //   English:res.data
        // })
        console.log('[数据库] [查询记录] 成功: ', res.data)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '加载失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
    // 查询政治书信息，只显示前三个，并按热度从高到低输出
    db.collection('books').where({
      subject: _.eq("politics")
    }).orderBy('bookrating.score', 'desc')
    .limit(3)
    .get({
      success: res => {
        // this.setData({
        //   politics:res.data
        // })
        console.log('[数据库] [查询记录] 成功: ', res.data)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '加载失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
/********************************************************************** */
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