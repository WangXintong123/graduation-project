// pages/shouye/more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arg_kemu:'数学',
    more_teacher:[{img:'../image/wuzhongxiang.png',name:'张宇',hot:90,num:0,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
    {img:'../image/wuzhongxiang.png',name:'汤家凤',hot:79,num:1,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
    {img:'../image/wuzhongxiang.png',name:'武忠祥',hot:59,num:2,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
    {img:'../image/wuzhongxiang.png',name:'李永乐',hot:29,num:2,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]}],
    firesLength:5,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  showFire:function(arg){
    for(var j=0;j<this.data.firesLength;j++){
      this.setData({
        [`more_teacher[${arg}].fires[${j}].class`]:'grayfire'
      })
    }
      for(var j=0;j<this.data.firesLength;j++){
        if (this.data.more_teacher[arg].fires[j].id<=Math.floor(this.data.more_teacher[arg].hot/20)){
          this.setData({
            [`more_teacher[${arg}].fires[${j}].class`]:'redfire'
          })
        }
    }
    
  },
  onLoad:function(){
    //更多火苗
    for(var j=0;j<this.data.more_teacher.length;j++){
      for(var i=0;i<this.data.firesLength;i++){
        this.setData({
          [`more_teacher[${j}].fires[${i}].class`]:'grayfire'
        })
      }
    }
    for(var n=0;n<this.data.more_teacher.length;n++){
      this.showFire(n)
    }
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