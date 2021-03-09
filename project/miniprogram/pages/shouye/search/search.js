// miniprogram/pages/shouye/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    flag:true,
    name:'教材',
    word:''
  },
  //自制下拉列表
  choseType:function(e){
    this.setData({
      "flag":(this.data.flag?false:true)
    })
  },
  //选择要搜索的类型
  getName:function(e){
    var str="";
    if(e.target.dataset.name=="j"){
      str="教材"
    }
    else{
      str="老师"
    }
    this.setData({
      "name":str
    })
  },
  //获取搜索内容
  getInput:function(e){
    this.setData({
      "word":e.detail.value
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