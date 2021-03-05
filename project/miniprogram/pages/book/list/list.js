// miniprogram/pages/book/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_rank:"数学考研用书",
    list_book:[
    {img:"../image/shuxue.png",name:'《张宇高等数学18讲》',point:9.6,author:'张宇'},
    {img:"../image/shuxue.png",name:'《张宇高等数学19讲》',point:9.4,author:'张宇'},
    {img:"../image/shuxue.png",name:'《张宇高等数学17讲》',point:9.0,author:'张宇'},
    {img:"../image/shuxue.png",name:'《张宇高等数学15讲》',point:8.6,author:'张宇'},
    {img:"../image/shuxue.png",name:'《张宇高等数学13讲》',point:8.2,author:'张宇'},    
  ]
  },
  intoDetail:function(e){
    console.log(e)
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