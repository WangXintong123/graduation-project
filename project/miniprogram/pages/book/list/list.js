// miniprogram/pages/book/list/list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",//用户唯一标识

    book_rank:"数学考研用书",
    list_book:[
    {img:"../image/shuxue.png",name:'《张宇高等数学18讲》',point:9.6,author:'张宇'},
    {img:"../image/shuxue.png",name:'《张宇高等数学19讲》',point:9.4,author:'张宇'},
    {img:"../image/shuxue.png",name:'《张宇高等数学17讲》',point:9.0,author:'张宇'},
    {img:"../image/shuxue.png",name:'《张宇高等数学15讲》',point:8.6,author:'张宇'},
    {img:"../image/shuxue.png",name:'《张宇高等数学13讲》',point:8.2,author:'张宇'},    
  ]
  },
  //进入书籍页
  intoBook:function(e){
    wx.navigateTo({
      url: '/pages/book/bookdetail/bookdetail',
    })
  },
  //路由会到上一页
  back:function(){
    wx.navigateBack({
      delta:1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
/****************************************************** */
    //将用户的唯一标识赋给this.data.openid
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }

    // 查询对应科目书籍信息，并按评分从高到低输出
    wx.cloud.callFunction({
      name:'limit',
      data:{
        collection:'books',
        where:{subject:'math'},
        type:'bookrating.score', 
        order:'desc'
      },
      success:res=>{
        // this.setData({
        //   book:res.result.data 
        // })
        console.log(res.result.data)
      }
    })
    
/********************************************************** */
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