// miniprogram/pages/book/book.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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