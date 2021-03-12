// miniprogram/pages/mine/like/like.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",//用户唯一标识



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
  //收藏里选择展示教师还是书籍
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
    /*************************************************** */
    //切换教师教材按钮展示不同的数据库数据
    const db = wx.cloud.database()
    const _ = db.command
    // 查询用户的收藏列表
    wx.cloud.callFunction({
      name:'limit',
      data:{
        collection:'favor',
        where:{userid:this.data.openid,type:'teacher'},//若是查教材，type值为'book'
        type:'time', 
        order:'desc'
      },
      success:res=>{
        // this.setData({
        //   like:res.result.data 
        // })
        console.log(res.result.data)
      }
    })
    /******************************************************** */
  },
  //展示火苗
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
  //回到上一页
  back:function(){
    wx.navigateBack({
      delta:1
    })
  },
  //取消收藏，更新数据库，同时重新渲染页面，此函数应绑定在每个取消收藏按钮上
  delete:function(e){
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('favor').doc('值为此条收藏信息的_id,每一条收藏信息都有唯一的_id,是添加评论时，数据库自动加上的').remove({
      success: res => {
        wx.cloud.callFunction({
          name:'limit',
          data:{
            collection:'favor',
            where:{userid:this.data.openid,type:'teacher'},//若是查教材，type值为'book'
            type:'time', 
            order:'desc'
          },
          success:res=>{
            // this.setData({
            //   like:res.result.data 
            // })
            console.log(res.result.data)
          }
        })
      },
      fail: err => {
        console.error('取消收藏失败：', err)
      }
    })
  },
    /************************************************** */
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {//展示默认样式
/******************************************************** */
//将用户的唯一标识赋给this.data.openid
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
    const db = wx.cloud.database()
    const _ = db.command
// 查询用户的收藏列表，默认先展示收藏的老师列表
    wx.cloud.callFunction({
      name:'limit',
      data:{
        collection:'favor',
        where:{userid:this.data.openid,type:'teacher'},
        type:'time', 
        order:'desc'
      },
      success:res=>{
        // this.setData({
        //   like:res.result.data 
        // })
        console.log(res.result.data)
      }
    })
    /******************************************************** */


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