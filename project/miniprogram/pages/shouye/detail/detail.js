// miniprogram/pages/shouye/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  //最热最新功能没写，需要接口
  data: {
    openid:"",//用户唯一标识

    teacher:{name:'武忠祥',point:9.6,mess:'武忠祥从事高等数学教学和考研辅导24年，国家高等数学试题库骨干专家，多次参加考研数学大纲修订及全国性数学考试命题工作。高教版工科教材编写者。考研历年真题研究骨干专家。武忠祥从事高等数学教学和考研辅导24年，国家高等数学试题库骨干专家',books:["《数学考研历年真题分类解析》","《大学数学教程》","《高等数学典型题》","《高等数学辅导讲义》"]},
    xingclass:'dactive',
    tag:false,
    aclass:"type-a",
    dclass:'type-da',
    firesLength:5,
    review:[
      {no:0,img:'../image/mine.jpg',name:'最好的用户1',point:10,word:'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊哈哈哈哈哈哈哈哈哈啦啦啦啦啦',date:'2021-1-1',like:1985,zantag:false,zanclass:'bot-like',fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
      {no:1,img:'../image/mine.jpg',name:'用户用户用户2',point:9,word:'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊哈哈哈哈哈哈哈哈哈啦啦啦啦啦哈哈哈哈哈哈真好啊',date:'2021-2-6',like:1235,zantag:true,zanclass:'bot-like',fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
      {no:2,img:'../image/mine.jpg',name:'用户用户3',point:6,word:'长评啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊哈哈哈哈哈哈哈哈哈啦啦啦啦啦啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊哈哈哈哈哈哈哈哈哈啦啦啦啦啦啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊哈哈哈哈哈哈哈哈哈啦啦啦啦啦',date:'2021-2-9',like:1024,zantag:false,zanclass:'bot-like',fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
      {no:3,img:'../image/mine.jpg',name:'啦啦用户4',point:6,word:'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊哈哈哈哈哈哈哈哈哈啦啦啦啦啦啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊哈哈哈哈哈哈哈哈哈啦啦啦啦啦啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊哈哈哈哈哈哈哈哈哈啦啦啦啦啦',date:'2021-3-5',like:982,zantag:false,zanclass:'bot-like',fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
      {no:4,img:'../image/mine.jpg',name:'哈哈用户5',point:4,word:'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊哈哈哈哈哈哈哈哈哈啦啦啦啦啦啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊哈哈哈哈哈哈哈哈哈啦啦啦啦啦',date:'2021-3-6',like:852,zantag:false,zanclass:'bot-like',fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
    ],
    zanclass:'',
    fires:[
      {name:0,firestyle:'grayfireset'},
      {name:1,firestyle:'grayfireset'},
      {name:2,firestyle:'grayfireset'},
      {name:3,firestyle:'grayfireset'},
      {name:4,firestyle:'grayfireset'}
  ],
    firestyle:'grayfire',
    text:["不推荐","一般","比较推荐","推荐","强烈推荐"],
    chose:'',
    hide:true,
    text_detail:''
  },
  //路由跳转
  back:function(e){
    wx.navigateBack({
      delta:1
    })
  },
  //改变收藏星星样式
  likeChange:function(e){
    if(!this.data.tag){
      this.setData({
        "xingclass":"dactive",
        "tag":true,
      })
    }else{
      this.setData({
        "xingclass":"active",
        "tag":false,
      })
    }
    /************************************* ************/
    //点击收藏添加到数据库（先判断tag值，若为false，则执行此代码）
    // const db = wx.cloud.database();
    // const _=db.command;
    // db.collection('favor').add({
    //   data: {
    //     name:"教师的id",
    //     userid:this.data.openid,
    //     type:'teacher'
    //   },
    //   success: res => {
    //     // 在返回结果中会包含新创建的记录的 _id
    //     // this.setData({
    //     //   tag:true//将收藏标识设为true
    //     // })
    //     wx.showToast({
    //       title: '收藏成功',
    //     })
    //     console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '收藏失败'
    //     })
    //     console.error('[数据库] [新增记录] 失败：', err)
    //   }
    // })
   //再次点击收藏，删除收藏记录（先判断tag值，若为true，则执行此代码）
    // db.collection('favor').where({
    //   userid:_.eq(this.data.openid),
    //   name:_.eq('教师的id')
    // }).remove({
    //   success: res => {
    //     wx.showToast({
    //       title: '取消收藏',
    //     })
    //     // this.setData({
    //     //   tag:false//将收藏标识设为false
    //     // })
    //   },
    //   fail: err => {
    //     console.error('取消收藏失败：', err)
    //   }
    // })
    /************************************************************** */
  },
  //改变最新或最热样式
  clickChoose:function(e){
    if(e.target.dataset.num==1){
      this.setData({
        'aclass':"type-a",
        'dclass':'type-da'
      })
    }
    else{
      this.setData({
        'aclass':"type-da",
        'dclass':'type-a'
      })
    }
    /********************************************* */
    //点击最热或最新，更改评论内容
    
    // wx.cloud.callFunction({
    //   name:'lookup',
    //   data:{
    //     collection:'teacher-comments',
    //     from:'users',
    //     localField:'userid',
    //     foreignField:'_openid',
    //     as:'userList',//userList里存储着发表评论的用户的头像、昵称
    //     match:{teacherid:"教师id"},
    //     sort:{support:-1}//默认打开按照支持数从高到低显示，若点击最新，则将'support'改成'time'，即要设成变量，点击事件绑定setdata，来改变变量值
    //   },
    //   success:res=>{
    //     // this.setData({
    //     //   list:res.result.list //res.result.list里存储着所有的评论，userList也在里面
    //     // })
    //     console.log(res.result.list)
    //   }
    // })

    /*********************************************************** */

  },
  //显示火苗热度
  showFire:function(arg){
    for(var j=0;j<this.data.firesLength;j++){
      this.setData({
        [`review[${arg}].fires[${j}].class`]:'grayfire'
      })
    }
      for(var j=0;j<this.data.firesLength;j++){
        if (this.data.review[arg].fires[j].id<=Math.floor(this.data.review[arg].point/2)){
          this.setData({
            [`review[${arg}].fires[${j}].class`]:'redfire'
          })
        }
    }
    
  },
  //改变点赞大拇指样式
  zanChange:function(e){
    var i=e.currentTarget.dataset.num
    if(this.data.review[i].zantag){
      this.setData({
        [`review[${i}].zantag`]:false,
        [`review[${i}].like`]:this.data.review[i].like-1
      })
    }
    else{
      this.setData({
        [`review[${i}].zantag`]:true,
        [`review[${i}].like`]:this.data.review[i].like+1
      })
    }
    for(var z=0;z<this.data.review.length;z++){
      if(this.data.review[z].zantag){
        this.setData({
          [`review[${z}].zanclass`]:'bot-likeyes'
        })
      }
      else{
        this.setData({
          [`review[${z}].zanclass`]:'bot-like'
        })
      }
    }
  /*********************************************** */
    //点赞或取消更新数据库
    // db.collection('teacher-comments').doc('此处值为点击的评论的独有_id').update({
    //   data: {
    //     support: '将新的点赞数赋到这里'
    //   },
    //   success: res => {
    //     // this.setData({
    //     //   //在这里重新渲染
    //     // })
    //   },
    //   fail: err => {
    //     icon: 'none',
    //     console.error('[数据库] [更新记录] 失败：', err)
    //   }
    // })
    /**************************************************** */
  },
  //打开评论遮罩层
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
    var mean=this.data.text[num];
    for(var i=0;i<this.data.fires.length;i++){
      if(this.data.fires[i].name<=num){
        this.setData({
          [`fires[${i}].firestyle`]:'activefireset'
        })
      }
      else{
        this.setData({
          [`fires[${i}].firestyle`]:'grayfireset'
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
  onLoad: function (options) {//显示一些样式包括火苗，星星，大拇指
    /****************************************************** */
    //将用户的唯一标识赋给this.data.openid
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }

    const db = wx.cloud.database()
    const _ = db.command
    // 获得教师的信息
    db.collection('teachers').where({
      _id: _.eq("zhangyu")//根据前面的路由提供参数，获得对应的教师的_id
    })
    .get({
      success: res => {
        // this.setData({
        //   teacher:res.data 
        // })
        console.log('[数据库] [查询记录] 成功: ', res.data)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '信息加载失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })


    //评论加载
    // wx.cloud.callFunction({
    //   name:'lookup',
    //   data:{
    //     collection:'teacher-comments',
    //     from:'users',
    //     localField:'userid',
    //     foreignField:'_openid',
    //     as:'userList',//userList里存储着发表评论的用户的头像、昵称
    //     match:{teacherid:"教师id"},
    //     sort:{support:-1}//默认打开按照支持数从高到低显示
    //   },
    //   success:res=>{
    //     // this.setData({
    //     //   list:res.result.list //res.result.list里存储着所有的评论，userList也在里面
    //     // })
    //     console.log(res.result.list)
    //   }
    // })
    
    //判断是否收藏
    // db.collection('favor').where({
    //   name:_.eq('教师id'),//点击进入详情页时，获得教师id
    //   userid:_.eq(this.data.openid)
    // }).get({
    //   success: res => {
    //     this.setData({
    //       tag:res.data.length===0?false:true
    //     })
    //     console.log('[数据库] [查询记录] 成功: ', res.data)
    //   },
    //   fail: err => {
    //     console.error('[数据库] [查询记录] 失败：', err)
    //   }
    // })
    
    
/********************************************************** */




    if(!this.data.tag){
      this.setData({
        "xingclass":"dactive",
        "tag":true,
      })
  }
  for(var j=0;j<this.data.review.length;j++){
    for(var i=0;i<this.data.firesLength;i++){
      this.setData({
        [`review[${j}].fires[${i}].class`]:'grayfire'
      })
    }
  }
  for(var n=0;n<this.data.review.length;n++){
    this.showFire(n)
  }
  for(var z=0;z<this.data.review.length;z++){
    if(this.data.review[z].zantag){
      this.setData({
        [`review[${z}].zanclass`]:'bot-likeyes'
      })
    }
    else{
      this.setData({
        [`review[${z}].zanclass`]:'bot-like'
      })
    }
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