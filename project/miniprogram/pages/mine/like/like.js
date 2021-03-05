// miniprogram/pages/mine/like/like.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   oneclass:'active',
   twoclass:'',
   like_teacher:[{img:'../image/wuzhongxiang.png',name:'张宇',hot:90,num:0,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
      {img:'../image/wuzhongxiang.png',name:'汤家凤',hot:79,num:1,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
      {img:'../image/wuzhongxiang.png',name:'武忠祥',hot:59,num:2,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
      {img:'../image/wuzhongxiang.png',name:'李永乐',hot:29,num:2,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]}],
   firesLength:5,
   like_book:[{img:"../image/shuxue.png",name:'《张宇高等数学18讲》',point:9.6,author:'张宇'},
      {img:"../image/shuxue.png",name:'《张宇高等数学19讲》',point:9.4,author:'张宇'},
      {img:"../image/shuxue.png",name:'《张宇高等数学17讲》',point:9.0,author:'张宇'},
      {img:"../image/shuxue.png",name:'《张宇高等数学15讲》',point:8.6,author:'张宇'},
      {img:"../image/shuxue.png",name:'《张宇高等数学13讲》',point:8.2,author:'张宇'},    
 ],
  flagt:false,
  flagb:true
  },
  getActive:function(e){
    if(e.target.dataset.num==1){
      this.setData({
        "oneclass":'active',
        "twoclass":'',
        "flagt":false,
        "flagb":true,
      })
    }
    else{
      this.setData({
        "oneclass":'',
        "twoclass":'active',
        "flagt":true,
        "flagb":false,
      })
    }
  },
  showFire:function(arg){
    for(var j=0;j<this.data.firesLength;j++){
      this.setData({
        [`like_teacher[${arg}].fires[${j}].class`]:'grayfire'
      })
    }
      for(var j=0;j<this.data.firesLength;j++){
        if (this.data.like_teacher[arg].fires[j].id<=Math.floor(this.data.like_teacher[arg].hot/20)){
          this.setData({
            [`like_teacher[${arg}].fires[${j}].class`]:'redfire'
          })
        }
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for(var j=0;j<this.data.like_teacher.length;j++){
      for(var i=0;i<this.data.firesLength;i++){
        this.setData({
          [`like_teacher[${j}].fires[${i}].class`]:'grayfire'
        })
      }
    }
    for(var n=0;n<this.data.like_teacher.length;n++){
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