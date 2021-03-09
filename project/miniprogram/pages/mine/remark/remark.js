// miniprogram/pages/mine/remark/remark.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firesLength:5,
    oneclass:'active',
    twoclass:'',
    flagt:false,
    flagb:true,
    t_review:[
      {img:'../image/wuzhongxiang.png',point:9.6,review:'老师太好了哈哈哈哈哈真好啊最棒最棒啊啊啊啊啊啊啊啊啊啊啦啦啦啊啊啊啊啊啊啊啊啊啊啊啊hahahahaah啊啊啊啊啊啊',like:1347,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
      {img:'../image/wuzhongxiang.png',point:8.6,review:'老师太好了哈哈哈哈哈真好啊最棒最棒啊啊啊啊啊啊啊啊啊啊啦啦啦',like:155,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
      {img:'../image/wuzhongxiang.png',point:7.6,review:'老师太好了哈哈哈哈哈真好啊最棒最棒啊啊啊啊啊啊啊啊啊啊啦啦啦',like:555,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
      {img:'../image/wuzhongxiang.png',point:7.1,review:'老师太好了哈哈哈哈哈真好啊最棒最棒啊啊啊啊啊啊啊啊啊啊啦啦啦',like:85,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
      {img:'../image/wuzhongxiang.png',point:5.6,review:'老师太好了哈哈哈哈哈真好啊最棒最棒啊啊啊啊啊啊啊啊啊啊啦啦啦',like:9785,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]}
    ],
    b_review:[
      {img:'../image/shuxue.png',point:7.6,review:'教材太好了哈哈哈哈哈真好啊最棒最棒啊啊啊啊啊啊啊啊啊啊啦啦啦',like:55,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
      {img:'../image/shuxue.png',point:6.6,review:'教材太好了哈哈哈哈哈真好啊最棒最棒啊啊啊啊啊啊啊啊啊啊啦啦啦',like:155,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
      {img:'../image/shuxue.png',point:5.6,review:'教材太好了哈哈哈哈哈真好啊最棒最棒啊啊啊啊啊啊啊啊啊啊啦啦啦',like:555,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
      {img:'../image/shuxue.png',point:4.1,review:'教材太好了哈哈哈哈哈真好啊最棒最棒啊啊啊啊啊啊啊啊啊啊啦啦啦',like:85,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
      {img:'../image/shuxue.png',point:3.6,review:'教材太好了哈哈哈哈哈真好啊最棒最棒啊啊啊啊啊啊啊啊啊啊啦啦啦',like:9785,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]}
    ],
    arr:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //选择展示对老师还是对教材的评论
  getActive:function(e){
    if(e.target.dataset.num==1){
      this.setData({
        "arr":[],
        "oneclass":'active',
        "twoclass":'',
        "flagt":false,
        "flagb":true,
      })
      for(var k=0;k<this.data.t_review.length;k++){
        this.setData({
          [`arr[${k}]`]:this.data.t_review[k]
        })
      }
    }
    else{
      this.setData({
        "arr":[],
        "oneclass":'',
        "twoclass":'active',
        "flagt":true,
        "flagb":false,
      })
      for(var m=0;m<this.data.b_review.length;m++){
        this.setData({
          [`arr[${m}]`]:this.data.b_review[m]
        })
      }
      for(var n=0;n<this.data.arr.length;n++){
        this.showFire(n)
      }
    }
  },
  //显示评分星星火苗
  showFire:function(arg){
    for(var j=0;j<this.data.firesLength;j++){
      this.setData({
        [`arr[${arg}].fires[${j}].class`]:'grayfire'
      })
    }
    for(var j=0;j<this.data.firesLength;j++){
      if (this.data.arr[arg].fires[j].id<=Math.floor(this.data.arr[arg].point/2)){
        this.setData({
          [`arr[${arg}].fires[${j}].class`]:'redfire'
        })
      }
    }
  },
  //返回上一级
  back:function(){
    wx.navigateBack({
      delta:1
    })
  },
  onLoad: function (e) {//展示默认样式
    for(var k=0;k<this.data.t_review.length;k++){
      this.setData({
        [`arr[${k}]`]:this.data.t_review[k]
      })
    }
    //更多火苗
    for(var j=0;j<this.data.arr.length;j++){
      for(var i=0;i<this.data.firesLength;i++){
        this.setData({
          [`arr[${j}].fires[${i}].class`]:'grayfire'
        })
      }
    }
    for(var n=0;n<this.data.arr.length;n++){
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