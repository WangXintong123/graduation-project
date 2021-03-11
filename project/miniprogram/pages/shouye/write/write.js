// miniprogram/pages/shouye/write/write.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",//用户唯一标识

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

    /***************************************************** */
    //将评论添加到数据库
    // const db = wx.cloud.database();
    // const _=db.command;
    // let now = new Date();
    // db.collection('teacher-comments').add({
    //   data: {
    //     userid: this.data.openid,
    //     teacherid:'教师的id',
    //     score:'推荐指数，类型为number',
    //     content:'评论内容',
    //     support:0,//一开始点赞数为0
    //     image:'教师的图片',
		//     date:now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日',
    //     time: now.getTime(),

    //   },
    //   success: res => {
    //     // 创建成功后重新渲染评论列表
    //     wx.cloud.callFunction({
    //       name:'lookup',
    //       data:{
    //         collection:'teacher-comments',
    //         from:'users',
    //         localField:'userid',
    //         foreignField:'_openid',
    //         as:'userList',//userList里存储着发表评论的用户的头像、昵称
    //         match:{teacherid:"教师id"},
    //         sort:{support:-1}//若此时按最新展示，则将'support'改成'time'，即要设成变量
    //       },
    //       success:res=>{
    //         // this.setData({
    //         //   list:res.result.list //res.result.list里存储着所有的评论，userList也在里面
    //         // })
    //         console.log(res.result.list)
    //       }
    //     })
    //     wx.showToast({
    //       title: '发表成功',
    //     })
    //     console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '发表失败'
    //     })
    //     console.error('[数据库] [新增记录] 失败：', err)
    //   }
    // })
    /************************************************************** */
  },
  //获取textarea里的内容
  textBlur:function(e){
    this.setData({
      'text_detail':e.detail.value
    })
    console.log(this.data.text_detail)
  },
  //点击火苗评分，这里的num可是星星的id可以转化为分数
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
 /********************************************** */
 //将用户的唯一标识赋给this.data.openid
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
 
/********************** */

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