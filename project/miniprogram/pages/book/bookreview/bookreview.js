// miniprogram/pages/book/bookreview/bookreview.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",//用户唯一标识


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

    /***************************************************** */
    //将评论添加到数据库
    // const db = wx.cloud.database();
    // const _=db.command;
    // let now = new Date();
    // db.collection('book-comments').add({
    //   data: {
    //     userid: this.data.openid,
    //     bookid:'书籍的id',
    //     bookrating:{
    //       cover:'知识面覆盖评分，类型为number',
    //       exercise:'练习题利用价值评分，类型为number',
    //       score:'上面两项评分的平均值'
    //     },
    //     content:'评论内容',
    //     support:0,//一开始点赞数为0
    //     image:'书籍的图片',
		//     date:now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日',
    //     time: now.getTime(),

    //   },
    //   success: res => {
    //     // 创建成功后重新渲染评论列表
    //     wx.cloud.callFunction({
    //       name:'lookup',
    //       data:{
    //         collection:'book-comments',
    //         from:'users',
    //         localField:'userid',
    //         foreignField:'_openid',
    //         as:'userList',//userList里存储着发表评论的用户的头像、昵称
    //         match:{bookid:"书籍id"},
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
/********************************************** */
 //将用户的唯一标识赋给this.data.openid
 if (app.globalData.openid) {
  this.setData({
    openid: app.globalData.openid
  })
}
console.log(this.data.openid)
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