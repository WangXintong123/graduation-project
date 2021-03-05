// miniprogram/pages/shouye/write/write.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fires:[
      {name:0,firestyle:'grayfire'},
      {name:1,firestyle:'grayfire'},
      {name:2,firestyle:'grayfire'},
      {name:3,firestyle:'grayfire'},
      {name:4,firestyle:'grayfire'}
  ],
    firestyle:'grayfire',
    text:["不推荐","一般","比较推荐","推荐","强烈推荐"],
    chose:'',
    hide:true,
    text_detail:''
  },
  show:function(){
    this.setData({
      "hide":false
    })
  },
  //关闭评论
  writeOff:function(){
    this.setData({
      "hide":true
    })
  },
  //提交评论
  writeSub:function(){
    this.setData({
      "hide":true
    })
  },
  textBlur:function(e){
    this.setData({
      'text_detail':e.detail.value
    })
    console.log(this.data.text_detail)
  },
  //火苗
  setFires:function(e){
    var num=e.currentTarget.dataset.num;
    var mean=this.data.text[num];
    for(var i=0;i<this.data.fires.length;i++){
      if(this.data.fires[i].name<=num){
        this.setData({
          [`fires[${i}].firestyle`]:'activefire'
        })
      }
      else{
        this.setData({
          [`fires[${i}].firestyle`]:'grayfire'
        })
      }
    }
    this.setData({
      "chose":mean
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