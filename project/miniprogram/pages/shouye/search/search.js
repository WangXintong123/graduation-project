// miniprogram/pages/shouye/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    flag:true,
    name:'教材',
    word:'',
    list:''
  },
  //自制下拉列表
  choseType:function(e){
    this.setData({
      "flag":(this.data.flag?false:true)
    })
  },
  //选择要搜索的类型
  getName:function(e){
    var str="";
    if(e.target.dataset.name=="j"){
      str="教材"
    }
    else{
      str="老师"
    }
    this.setData({
      "name":str
    })
  },
  //获取搜索内容
  getInput:function(e){
    this.setData({
      "word":e.detail.value
    })
  },

  /***************************************************** */
  //显示搜索内容(当用户点击确定搜索时调用此函数，所以可以再写一个确定搜索的按钮，或者能够获取到用户键盘的确定键，当按下手机键盘的确定调用此函数)
  search:function(){
    const db = wx.cloud.database()
    const _ = db.command
    if(this.data.name==="老师"){
      db.collection('teachers').where({
        teachername: db.RegExp({
          regexp: this.data.word,//搜索的关键字
          options: 'i',
        })
      })
      .get({
        success: res => {
          // this.setData({
          //   list:res.data 
          // })
          console.log('[数据库] [查询记录] 成功: ', res.data)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '暂无信息'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
    }else{
      db.collection('books').where({
        bookname: db.RegExp({
          regexp: this.data.word,//搜索的关键字
          options: 'i',
        })
      })
      .get({
        success: res => {
          // this.setData({
          //   list:res.data 
          // })
          console.log('[数据库] [查询记录] 成功: ', res.data)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '暂无信息'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
    }
    
  },
/****************************************************************** */
  /**
   * 生命周期函数--监听页面加载
   */
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