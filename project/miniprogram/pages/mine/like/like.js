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
   like_teacher:[],
   like_book:[],
   firesLength:5,
  flagt:false,
  flagb:true
  },
  //收藏里选择展示教师还是书籍
  getActive:function(e){
    const db = wx.cloud.database()
    const _ = db.command
    if(e.target.dataset.num==1){
      wx.cloud.callFunction({
        name:'limit',
        data:{
          collection:'favor',
          where:{userid:this.data.openid,type:'teacher'},//若是查教材，type值为'book'
          type:'time', 
          order:'desc'
        },
        success:res=>{
          this.setData({
            like_teacher:res.result.data ,
            "oneclass":'active',
            "twoclass":'',
            "flagt":false,
            "flagb":true,
          },function(){
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
          })
          // console.log(res.result.data)
        }
      })
    }
    else{
      wx.cloud.callFunction({
        name:'limit',
        data:{
          collection:'favor',
          where:{userid:this.data.openid,type:'book'},//若是查教材，type值为'book'
          type:'time', 
          order:'desc'
        },
        success:res=>{
          this.setData({
            like_book:res.result.data ,
            "oneclass":'',
            "twoclass":'active',
            "flagt":true,
            "flagb":false,
          })
          // console.log(res.result.data)
        }
      })
    }
  },
  intoteacher:function(e){
    var name=e.currentTarget.dataset.name
    wx.navigateTo({
      url: `/pages/shouye/detail/detail?name=${name}`,
    })
  },
  intobook:function(e){
    var id=e.currentTarget.dataset.name
    wx.navigateTo({
      url: `/pages/book/bookdetail/bookdetail?id=${id}`,
    })
  },
  //展示火苗
  showFire:function(arg){
    // console.log(this.data.like_teacher)
    for(var j=0;j<this.data.firesLength;j++){
      this.setData({
        [`like_teacher[${arg}].fires[${j}].class`]:'grayfire'
      })
    }
      for(var j=0;j<this.data.firesLength;j++){
        if (this.data.like_teacher[arg].fires[j].id<=Math.floor(this.data.like_teacher[arg].score/2)){
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
  deleteteacher:function(e){
    var id=e.currentTarget.dataset.id
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('favor').doc(id).remove({
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
            this.setData({
              like_teacher:res.result.data ,
              "oneclass":'active',
              "twoclass":'',
              "flagt":false,
              "flagb":true,
            },function(){

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
            })
            // console.log(res.result.data)
          }
        })
      },
      fail: err => {
        console.error('取消收藏失败：', err)
      }
    })
  },
  deletebook:function(e){
    var id=e.currentTarget.dataset.id
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('favor').doc(id).remove({
      success: res => {
        wx.cloud.callFunction({
          name:'limit',
          data:{
            collection:'favor',
            where:{userid:this.data.openid,type:'book'},//若是查教材，type值为'book'
            type:'time', 
            order:'desc'
          },
          success:res=>{
            this.setData({
              like_book:res.result.data ,
              "oneclass":'',
              "twoclass":'active',
              "flagt":true,
              "flagb":false,
            })
            // console.log(res.result.data)
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
        this.setData({
          like_teacher:res.result.data 
        },function(){
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
        })
        // console.log(res.result.data)
      }
    })
    /******************************************************** */


    
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