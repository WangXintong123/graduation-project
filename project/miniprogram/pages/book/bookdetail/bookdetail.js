// miniprogram/pages/book/bookdetail/bookdetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",//用户唯一标识


  //   book:{img:"../image/shuxue.png",name:'《张宇高等数学18讲》',kemu:'数学',author:'张宇',
  //   point:[
  //     {name:'知识点覆盖程度',number:8,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
  //     {name:'例题及练习题使用价值',number:2,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
  //   ]
  // },
    point:[
      {num:0,name:'知识点覆盖程度',fires:[{name:0,starstyle:'graystar'},{name:1,starstyle:'graystar'},{name:2,starstyle:'graystar'},{name:3,starstyle:'graystar'},{name:4,starstyle:'graystar'}]},
      {num:1,name:'例题及练习题使用价值',fires:[{name:0,starstyle:'graystar'},{name:1,starstyle:'graystar'},{name:2,starstyle:'graystar'},{name:3,starstyle:'graystar'},{name:4,starstyle:'graystar'}]}
    ],
    starstyle:'graystar',
    chose:'',
    hide:true,
    text_detail:'',
    xingclass:'dactive',
    // tag:false,
    // firesLength:5,
    tag:false,
    aclass:"type-a",
    dclass:'type-da',
    firesLength:5,
    review:[
      {no:0,img:'../image/mine.jpg',name:'最好的用户1',point:10,word:'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊哈哈哈哈哈哈哈哈哈啦啦啦啦啦',date:'2021-1-1',like:1985,zantag:true,zanclass:'bot-like',
      point:[
        {name:'知识点覆盖程度',number:1,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
        {name:'例题及练习题使用价值',number:2,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
      ]},
      {no:1,img:'../image/mine.jpg',name:'用户用户用户2',point:9,word:'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊哈哈哈哈哈哈哈哈哈啦啦啦啦啦哈哈哈哈哈哈真好啊',date:'2021-2-6',like:1235,zantag:true,zanclass:'bot-like',
      point:[
        {name:'知识点覆盖程度',number:8,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
        {name:'例题及练习题使用价值',number:2,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
      ]},
      {no:2,img:'../image/mine.jpg',name:'用户用户3',point:6,word:'长评啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊哈哈哈哈哈哈哈哈哈啦啦啦啦啦啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊哈哈哈哈哈哈哈哈哈啦啦啦啦啦啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊哈哈哈哈哈哈哈哈哈啦啦啦啦啦',date:'2021-2-9',like:1024,zantag:false,zanclass:'bot-like',
      point:[
        {name:'知识点覆盖程度',number:8,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
        {name:'例题及练习题使用价值',number:2,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
      ]},
      {no:3,img:'../image/mine.jpg',name:'啦啦用户4',point:6,word:'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊哈哈哈哈哈哈哈哈哈啦啦啦啦啦啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊哈哈哈哈哈哈哈哈哈啦啦啦啦啦啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊哈哈哈哈哈哈哈哈哈啦啦啦啦啦',date:'2021-3-5',like:982,zantag:false,zanclass:'bot-like',
      point:[
        {name:'知识点覆盖程度',number:8,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
        {name:'例题及练习题使用价值',number:2,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
      ]},
      {no:4,img:'../image/mine.jpg',name:'哈哈用户5',point:4,word:'啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊哈哈哈哈哈哈哈哈哈啦啦啦啦啦啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊哈哈哈哈哈哈哈哈哈啦啦啦啦啦',date:'2021-3-6',like:852,zantag:false,zanclass:'bot-like',
      point:[
        {name:'知识点覆盖程度',number:1,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
        {name:'例题及练习题使用价值',number:6,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
      ]},
    ],
    zanclass:''
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
    //     name:"书籍的_id",
    //     userid:this.data.openid,
    //     type:'book'
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
    //   name:_.eq('书籍的_id')
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
  //展示火苗
  showFire:function(){
    for(var j=0;j<this.data.firesLength;j++){
      this.setData({
        [`book[0].bookrating.cover.fires[${j}].class`]:'graystars',
        [`book[0].bookrating.exercise.fires[${j}].class`]:'graystars'
      })
    }
      for(var j=0;j<this.data.firesLength;j++){
        if (this.data.book[0].bookrating.cover.fires[j].id<=Math.floor(this.data.book[0].bookrating.cover.num/2)){
          this.setData({
            [`book[0].bookrating.cover.fires[${j}].class`]:'redstars'
          })
        }
        if (this.data.book[0].bookrating.exercise.fires[j].id<=Math.floor(this.data.book[0].bookrating.exercise.num/2)){
          this.setData({
            [`book[0].bookrating.exercise.fires[${j}].class`]:'redstars'
          })
        }
      }
  },
  //展示评论里的火苗
  reviewshowFire:function(arg){
    
    for(var i=0; i<this.data.review[arg].point.length;i++){
      for(var j=0;j<this.data.firesLength;j++){
        this.setData({
          [`review[${i}].point[${arg}].fires[${j}].class`]:'graystars'
        })
      }
    }
    for(var i=0; i<this.data.review.length;i++){
      for(var j=0;j<this.data.firesLength;j++){
        if (this.data.review[i].point[arg].fires[j].id<=Math.floor(this.data.review[i].point[arg].number/2)){
          this.setData({
            [`review[${i}].point[${arg}].fires[${j}].class`]:'redstars'
          })
        }
    }
  }
      
  },
  //最热最新样式转换
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
    //     collection:'book-comments',
    //     from:'users',
    //     localField:'userid',
    //     foreignField:'_openid',
    //     as:'userList',//userList里存储着发表评论的用户的头像、昵称
    //     match:{bookid:"书籍_id"},
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
  //点赞大拇指样式变化
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
    //点赞评论或取消更新数据库
    // db.collection('book-comments').doc('此处值为点击的评论的独有_id').update({
    //   data: {
    //     support: '将新的点赞数赋到这里,存到数据库里'
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
  //评论遮罩层展示
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
    const db = wx.cloud.database();
    const _=db.command;
    let now = new Date();
    db.collection('book-comments').add({
      data: {
        userid: this.data.openid,
        bookid:'书籍的id',
        bookrating:{
            cover:{
              fires:[{class:"grayfire",id:"0"},{class:"grayfire",id:"1"},{class:"grayfire",id:"2"},{class:"grayfire",id:"3"},{class:"grayfire",id:"4"}],
              name:"知识点覆盖程度",
              num:'此处为知识点覆盖程度评分，类型为number'
            },
            exercise:{
              fires:[{class:"grayfire",id:"0"},{class:"grayfire",id:"1"},{class:"grayfire",id:"2"},{class:"grayfire",id:"3"},{class:"grayfire",id:"4"}],
              name:"例题及练习题使用价值",
              num:'此处为例题及练习题使用价值评分，类型为number'
            },
            score:'此处为以上两个评分的平均值，类型应为number'
        },
        content:'评论内容',
        support:0,//一开始点赞数为0
        image:'书籍的图片',
		    date:now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日',
        time: now.getTime(),

      },
      success: res => {
        // 创建成功后重新渲染评论列表
        wx.cloud.callFunction({
          name:'lookup',
          data:{
            collection:'book-comments',
            from:'users',
            localField:'userid',
            foreignField:'_openid',
            as:'userList',//userList里存储着发表评论的用户的头像、昵称
            match:{bookid:"书籍id"},
            sort:{support:-1}//若此时按最新展示，则将'support'改成'time'，即要设成变量
          },
          success:res=>{
            // this.setData({
            //   list:res.result.list //res.result.list里存储着所有的评论，userList也在里面
            // })
            console.log(res.result.list)
          }
        })
        wx.showToast({
          title: '发表成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '发表失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
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
  //返回上一页
  back:function(){
    wx.navigateBack({
      delta:1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {//显示星星，火苗，大拇指的默认样式
/****************************************************** */
    //将用户的唯一标识赋给this.data.openid
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }

    const db = wx.cloud.database()
    const _ = db.command
    // 获得书籍的信息
    db.collection('books').where({
      _id: _.eq(options.id)//根据前面的路由提供参数，获得对应的书籍的_id
    })
    .get({
      success: res => {
        this.setData({
          book:res.data 
        },function(){
          for(var i=0;i<this.data.firesLength;i++){
            this.setData({
              [`book[0].boookrating.cover.fires[${i}].class`]:'graystars',
              [`book[0].boookrating.exercise.fires[${i}].class`]:'graystars'
            })
          }
          this.showFire()
        })
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
    //     collection:'book-comments',
    //     from:'users',
    //     localField:'userid',
    //     foreignField:'_openid',
    //     as:'userList',//userList里存储着发表评论的用户的头像、昵称
    //     match:{bookid:"书籍_id"},
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
    //   name:_.eq('书籍id'),//点击进入详情页时，获得书籍_id
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
  // for(var j=0;j<this.data.book.point.length;j++){
  //   for(var i=0;i<this.data.firesLength;i++){
  //     this.setData({
  //       [`book.point[${j}].fires[${i}].class`]:'graystars'
  //     })
  //   }
  // }
  // for(var n=0;n<this.data.book.point.length;n++){
  //   this.showFire(n)
  // }
  for(var p=0;p<this.data.review[0].point.length;p++){
    this.reviewshowFire(p)
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