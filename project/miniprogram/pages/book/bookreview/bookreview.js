// miniprogram/pages/book/bookreview/bookreview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    point:[
      {num:0,name:'知识点覆盖程度',fires:[{name:0,starstyle:'graystar'},{name:1,starstyle:'graystar'},{name:2,starstyle:'graystar'},{name:3,starstyle:'graystar'},{name:4,starstyle:'graystar'}]},
      {num:1,name:'例题及练习题使用价值',fires:[{name:0,starstyle:'graystar'},{name:1,starstyle:'graystar'},{name:2,starstyle:'graystar'},{name:3,starstyle:'graystar'},{name:4,starstyle:'graystar'}]}
  ],
    starstyle:'graystar',
    chose:'',
    hide:false,
    text_detail:'',
    firesLength:5,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //显示评论遮罩层
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
  //获取评论内容
  textBlur:function(e){
    this.setData({
      'text_detail':e.detail.value
    })
    console.log(this.data.text_detail)
  },
  //设置火苗
  setFires:function(e){
    var num=e.currentTarget.dataset.num;
    var arg=Math.floor(num/10)
    var after=Math.floor(num%10)
    for(var i=0;i<this.data.firesLength;i++){
      if(this.data.point[arg].fires[i].name<=after){
        this.setData({
          [`point[${arg}].fires[${i}].starstyle`]:'activestar'
        })
      }
      else{
        this.setData({
          [`point[${arg}].fires[${i}].starstyle`]:'graystar'
        })
      }
    }
  },
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