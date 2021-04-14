// miniprogram/pages/mine/remark/remark.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",//用户唯一标识
    firesLength:5,
    oneclass:'active',
    twoclass:'',
    flagt:false,
    flagb:true,
    arr:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //选择展示对老师还是对教材的评论
  getActive:function(e){
    const db = wx.cloud.database()
    const _ = db.command
    if(e.target.dataset.num==1){
      wx.cloud.callFunction({
        name:'limit',
        data:{
          collection:'teacher-comments',//若是查教材，值为'book-comments'
          where:{userid:this.data.openid},
          type:'time', 
          order:'desc'
        },
        success:res=>{
          this.setData({
            review:res.result.data,
            "arr":[],
            "oneclass":'active',
            "twoclass":'',
            "flagt":false,
            "flagb":true, 
          },function(){
            for(var k=0;k<this.data.review.length;k++){
              this.setData({
                [`arr[${k}]`]:this.data.review[k]
              })
            }
            for(var n=0;n<this.data.arr.length;n++){
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
          collection:'book-comments',//若是查教材，值为'book-comments'
          where:{userid:this.data.openid},
          type:'time', 
          order:'desc'
        },
        success:res=>{
          this.setData({
            review:res.result.data,
            "arr":[],
            "oneclass":'',
            "twoclass":'active',
            "flagt":true,
            "flagb":false, 
          },function(){
            for(var m=0;m<this.data.review.length;m++){
              this.setData({
                [`arr[${m}]`]:this.data.review[m]
              })
            }
            for(var n=0;n<this.data.arr.length;n++){
              // this.showFirebook(n)
              for(var j=0;j<this.data.firesLength;j++){
                this.setData({
                  [`arr[${n}].fires[${j}].class`]:'grayfire'
                })
              }
              for(var j=0;j<this.data.firesLength;j++){
                if (j<=Math.floor(this.data.arr[n].bookrating.score)){
                  this.setData({
                    [`arr[${n}].fires[${j}].class`]:'redfire'
                  })
                }
              }
            }
          })
          // console.log(res.result.data)
        }
      })
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
      if (this.data.arr[arg].fires[j].id<=Math.floor(this.data.arr[arg].score)){
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
  /************************************************ */
  //删除评论，更新数据库，同时重新渲染页面，此函数应绑定在每条评论的删除按钮上
  delete:function(e){
    var vid=e.currentTarget.dataset.vid;
    var subject=e.currentTarget.dataset.subject;
    const db = wx.cloud.database()
    const _ = db.command
    if(subject=="book"){
      db.collection('book-comments').doc(vid).remove({
        success: res => {
          wx.cloud.callFunction({
            name:'limit',
            data:{
              collection:'book-comments',//若是查教材，值为'book-comments'
              where:{userid:this.data.openid},
              type:'time', 
              order:'desc'
            },
            success:res=>{
              this.setData({
                review:res.result.data,
                "arr":[],
                "oneclass":'',
                "twoclass":'active',
                "flagt":true,
                "flagb":false, 
              },function(){
                for(var m=0;m<this.data.review.length;m++){
                  this.setData({
                    [`arr[${m}]`]:this.data.review[m]
                  })
                }
                for(var n=0;n<this.data.arr.length;n++){
                  // this.showFirebook(n)
                  for(var j=0;j<this.data.firesLength;j++){
                    this.setData({
                      [`arr[${n}].fires[${j}].class`]:'grayfire'
                    })
                  }
                  for(var j=0;j<this.data.firesLength;j++){
                    if (j<=Math.floor(this.data.arr[n].bookrating.score)){
                      this.setData({
                        [`arr[${n}].fires[${j}].class`]:'redfire'
                      })
                    }
                  }
                }
              })
              // console.log(res.result.data)
            }
          })
        },
        fail: err => {
          console.error('删除评论失败：', err)
        }
      })
    }else{
      db.collection('teacher-comments').doc(vid).remove({
        success: res => {
          wx.cloud.callFunction({
            name:'limit',
            data:{
              collection:'teacher-comments',//若是查教材，值为'book-comments'
              where:{userid:this.data.openid},
              type:'time', 
              order:'desc'
            },
            success:res=>{
              this.setData({
                review:res.result.data,
                "arr":[],
                "oneclass":'active',
                "twoclass":'',
                "flagt":false,
                "flagb":true, 
              },function(){
                for(var k=0;k<this.data.review.length;k++){
                  this.setData({
                    [`arr[${k}]`]:this.data.review[k]
                  })
                }
                for(var n=0;n<this.data.arr.length;n++){
                  this.showFire(n)
                }
              })
              // console.log(res.result.data)
            }
          })
        },
        fail: err => {
          console.error('删除评论失败：', err)
        }
      })
    }
  },
    /************************************************** */
  onLoad: function (e) {//展示默认样式
/******************************************************** */
//将用户的唯一标识赋给this.data.openid
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
    const db = wx.cloud.database()
    const _ = db.command
    // 查询用户发表的评论，默认先展示对教师的评论
    wx.cloud.callFunction({
      name:'limit',
      data:{
        collection:'teacher-comments',
        where:{userid:this.data.openid},
        type:'time', 
        order:'desc'
      },
      success:res=>{
        this.setData({
          review:res.result.data,
          "arr":[],
          "oneclass":'active',
          "twoclass":'',
          "flagt":false,
          "flagb":true, 
        },function(){
          for(var k=0;k<this.data.review.length;k++){
            this.setData({
              [`arr[${k}]`]:this.data.review[k]
            })
          }
          for(var n=0;n<this.data.arr.length;n++){
            this.showFire(n)
          }
        })
        // console.log(res.result.data)
      }
    })
    
/************************************************* */
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