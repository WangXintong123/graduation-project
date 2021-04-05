// pages/shouye/more.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",//用户唯一标识
    subject:'',
    arg_kemu:'',
    more_teacher:[],
    firesLength:5,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //返回上一页路由
  back:function(e){
    wx.navigateBack({
      delta:1
    })
  },
  //进入老师详情页
  intoDetail:function(e){
    var name=e.currentTarget.dataset.name
    wx.navigateTo({
      url: `/pages/shouye/detail/detail?name=${name}`,
    })
  },
  //显示详情页的火苗
  showFire:function(arg){
    for(var j=0;j<this.data.firesLength;j++){
      this.setData({
        [`more_teacher[${arg}].fires[${j}].class`]:'grayfire'
      })
    }
      for(var j=0;j<this.data.firesLength;j++){
        if (this.data.more_teacher[arg].fires[j].id<=Math.floor(this.data.more_teacher[arg].score/2)){
          this.setData({
            [`more_teacher[${arg}].fires[${j}].class`]:'redfire'
          })
        }
    }
    
  },
  onLoad:function(option){
    this.setData({
      'arg_kemu':option.kemu
    })
    if(this.data.arg_kemu=="数学"){
      this.setData({
        'subject':"math"
      })
    }else if(this.data.arg_kemu=="英语"){
      this.setData({
        'subject':"English"
      })
    }if(this.data.arg_kemu=="政治"){
      this.setData({
        'subject':"politics"
      })
    }
    /****************************************************** */
    //将用户的唯一标识赋给this.data.openid
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }

    const db = wx.cloud.database()
    const _ = db.command
    // 查询对应科目教师信息，并按热度从高到低输出
    db.collection('teachers').where({
      subject: _.eq(this.data.subject)//math可更改，还可以是English、politics，根据前面的路由提供参数，获得对应的科目类型
    }).orderBy('score', 'desc')
    .get({
      success: res => {
        this.setData({
          more_teacher:res.data 
        },function(){
          console.log(this.data.more_teacher)
           //更多火苗
            for(var j=0;j<this.data.more_teacher.length;j++){
              for(var i=0;i<this.data.firesLength;i++){
                this.setData({
                  [`more_teacher[${j}].fires[${i}].class`]:'grayfire'
                })
              }
            }
            //调用火苗函数
            for(var n=0;n<this.data.more_teacher.length;n++){
              this.showFire(n)
            }
        })
        console.log('[数据库] [查询记录] 成功: ', res.data)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '加载失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
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