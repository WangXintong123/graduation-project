// miniprogram/pages/book/bookdetail/bookdetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",//用户唯一标识
    point:[
      {num:0,name:'知识点覆盖程度',fires:[{name:0,starstyle:'graystar'},{name:1,starstyle:'graystar'},{name:2,starstyle:'graystar'},{name:3,starstyle:'graystar'},{name:4,starstyle:'graystar'}],score:0},
      {num:1,name:'例题及练习题使用价值',fires:[{name:0,starstyle:'graystar'},{name:1,starstyle:'graystar'},{name:2,starstyle:'graystar'},{name:3,starstyle:'graystar'},{name:4,starstyle:'graystar'}],score:0}
    ],
    starstyle:'graystar',
    chose:'',
    hide:true,
    text_detail:'',
    xingclass:'dactive',
    tag:false,
    aclass:"type-a",
    dclass:'type-da',
    firesLength:5,
    list:[],
    book:[],
    zanclass:'',
    book_id:'',
    onescore:0,
    twoscore:0,
    zscore:0,
    lscore:0,
    score:0,
    count:0
  },
  //改变收藏星星样式
  likeChange:function(e){
    // console.log(e)
    //点击收藏添加到数据库（先判断tag值，若为false，则执行此代码）
    const db = wx.cloud.database();
    const _=db.command;
    if(!this.data.tag){
      db.collection('favor').add({
        data: {
          name:this.data.book_id,
          userid:this.data.openid,
          type:'book',
          bookname:e.currentTarget.dataset.bookname,
          author:e.currentTarget.dataset.author,
          image:e.currentTarget.dataset.img,
          score:e.currentTarget.dataset.score

        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          this.setData({
            tag:true,//将收藏标识设为true
            'xingclass':"active",
          })
          wx.showToast({
            title: '收藏成功',
          })
          // console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '收藏失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    }else{
      //再次点击收藏，删除收藏记录（先判断tag值，若为true，则执行此代码）
      db.collection('favor').where({
        userid:_.eq(this.data.openid),
        name:_.eq(this.data.book_id)
      }).remove({
        success: res => {
          wx.showToast({
            title: '取消收藏',
          })
          this.setData({
            tag:false,//将收藏标识设为false
            'xingclass':"dactive",
          })
        },
        fail: err => {
          console.error('取消收藏失败：', err)
        }
      })
    }
    
   
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
    for(var j=0;j<this.data.firesLength;j++){
      this.setData({
        [`list${arg}.bookrating.cover.fires[${j}].class`]:'graystars',
        [`list${arg}.bookrating.exercise.fires[${j}].class`]:'graystars'
      })
    }
    for(var j=0;j<this.data.firesLength;j++){
      if (this.data.list[arg].bookrating.cover.fires[j].id<=Math.floor(this.data.list[arg].bookrating.cover.num)){
        this.setData({
          [`list[${arg}].bookrating.cover.fires[${j}].class`]:'redstars'
        })
      }
      if (this.data.list[arg].bookrating.exercise.fires[j].id<=Math.floor(this.data.list[arg].bookrating.exercise.num)){
        this.setData({
          [`list[${arg}].bookrating.exercise.fires[${j}].class`]:'redstars'
        })
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
      wx.cloud.callFunction({
        name:'lookup',
        data:{
          collection:'book-comments',
          from:'users',
          localField:'userid',
          foreignField:'_openid',
          as:'userList',//userList里存储着发表评论的用户的头像、昵称
          match:{bookid:this.data.book_id},
          sort:{support:-1}//默认打开按照支持数从高到低显示，若点击最新，则将'support'改成'time'，即要设成变量，点击事件绑定setdata，来改变变量值
        },
        success:res=>{
          this.setData({
            list:res.result.list //res.result.list里存储着所有的评论，userList也在里面
          },function(){
            for(var p=0;p<this.data.list.length;p++){
              this.reviewshowFire(p)
              if(this.data.list[p].zantag){
                this.setData({
                  [`list[${p}].zanclass`]:'bot-likeyes'
                })
              }
              else{
                this.setData({
                  [`list[${p}].zanclass`]:'bot-like'
                })
              }
            }
          })
          // console.log(res.result.list)
        }
      })
    }
    else{
      this.setData({
        'aclass':"type-da",
        'dclass':'type-a'
      })
      wx.cloud.callFunction({
        name:'lookup',
        data:{
          collection:'book-comments',
          from:'users',
          localField:'userid',
          foreignField:'_openid',
          as:'userList',//userList里存储着发表评论的用户的头像、昵称
          match:{bookid:this.data.book_id},
          sort:{time:-1}//默认打开按照支持数从高到低显示，若点击最新，则将'support'改成'time'，即要设成变量，点击事件绑定setdata，来改变变量值
        },
        success:res=>{
          this.setData({
            list:res.result.list //res.result.list里存储着所有的评论，userList也在里面
          },function(){
            for(var p=0;p<this.data.list.length;p++){
              this.reviewshowFire(p)
              if(this.data.list[p].zantag){
                this.setData({
                  [`list[${p}].zanclass`]:'bot-likeyes'
                })
              }
              else{
                this.setData({
                  [`list[${p}].zanclass`]:'bot-like'
                })
              }
            }
          })
          // console.log(res.result.list)
        }
      })
    }
    /********************************************* */
    
    /*********************************************************** */
  },
  //点赞大拇指样式变化
  zanChange:function(e){
    // console.log(1)
    const db = wx.cloud.database();
    const _=db.command;
    var i=e.currentTarget.dataset.num
    // console.log(i)
    for(var x=0;x<this.data.list.length;x++){
      if(this.data.list[x]._id==i){
        if(this.data.list[x].zantag){
          this.setData({
            [`list[${x}].zantag`]:false,
            [`list[${x}].support`]:this.data.list[x].support-1,
          })
        }
        else{
          this.setData({
            [`list[${x}].zantag`]:true,
            [`list[${x}].support`]:this.data.list[x].support+1,
          })
        }
        db.collection('book-comments').doc(i).update({
          data: {
            support:this.data.list[x].support,
            zantag:this.data.list[x].zantag
          },
          success: res => {
            // this.setData({
            //   //在这里重新渲染
            // })
          },
          fail: err => {
            icon: 'none',
            console.error('[数据库] [更新记录] 失败：', err)
          }
        })
      }
    }
    
    for(var z=0;z<this.data.list.length;z++){
      if(this.data.list[z].zantag){
        this.setData({
          [`list[${z}].zanclass`]:'bot-likeyes'
        })
      }
      else{
        this.setData({
          [`list[${z}].zanclass`]:'bot-like'
        })
      }
    }
    
    /*********************************************** */
    //点赞评论或取消更新数据库
    
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
        bookid:this.data.book_id,
        bookrating:{
            cover:{
              fires:[{class:"grayfire",id:"0"},{class:"grayfire",id:"1"},{class:"grayfire",id:"2"},{class:"grayfire",id:"3"},{class:"grayfire",id:"4"}],
              name:"知识点覆盖程度",
              num:Number(this.data.onescore)
            },
            exercise:{
              fires:[{class:"grayfire",id:"0"},{class:"grayfire",id:"1"},{class:"grayfire",id:"2"},{class:"grayfire",id:"3"},{class:"grayfire",id:"4"}],
              name:"例题及练习题使用价值",
              num:Number(this.data.twoscore)
            },
            score:Number(((this.data.onescore+this.data.twoscore)/2).toFixed(1))
        },
        content:this.data.text_detail,
        support:0,//一开始点赞数为0
        image:this.data.book[0].bookimg,
		    date:now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日',
        time: now.getTime(),
        zantag:false,
        zanclass:'bot-like',
        subject:'book'
      },
      success: res => {
        
        //更新书籍数据库的分数
        db.collection('books').doc(this.data.book_id)
        .update({
          data:{
            bookrating:{
              cover:{
                fires:[{class:"grayfire",id:"0"},{class:"grayfire",id:"1"},{class:"grayfire",id:"2"},{class:"grayfire",id:"3"},{class:"grayfire",id:"4"}],
                name:"知识点覆盖程度",
                num:Number(((this.data.zscore*this.data.count+(this.data.onescore+1)*2)/(this.data.count+1)).toFixed(1))
              },
              exercise:{
                fires:[{class:"grayfire",id:"0"},{class:"grayfire",id:"1"},{class:"grayfire",id:"2"},{class:"grayfire",id:"3"},{class:"grayfire",id:"4"}],
                name:"例题及练习题使用价值",
                num:Number(((this.data.lscore*this.data.count+(this.data.twoscore+1)*2)/(this.data.count+1)).toFixed(1))
              },
              score:Number(((((this.data.zscore*this.data.count+(this.data.onescore+1)*2)/(this.data.count+1))+((this.data.lscore*this.data.count+(this.data.twoscore+1)*2)/(this.data.count+1)))/2).toFixed(1))
            }
            
          }
        })
        // 创建成功后重新渲染评论列表
        wx.cloud.callFunction({
          name:'lookup',
          data:{
            collection:'book-comments',
            from:'users',
            localField:'userid',
            foreignField:'_openid',
            as:'userList',//userList里存储着发表评论的用户的头像、昵称
            match:{bookid:this.data.book_id},
            sort:{support:-1}//若此时按最新展示，则将'support'改成'time'，即要设成变量
          },
          success:res=>{
            this.setData({
              list:res.result.list ,//res.result.list里存储着所有的评论，userList也在里面
              [`book[${0}].bookrating.cover.num`]:Number(((this.data.zscore*this.data.count+(this.data.onescore+1)*2)/(this.data.count+1)).toFixed(1)),
              [`book[${0}].bookrating.exercise.num`]:Number(((this.data.lscore*this.data.count+(this.data.twoscore+1)*2)/(this.data.count+1)).toFixed(1))
            },function(){
              this.setData({
                count:this.data.count+1
              })
              for(var p=0;p<this.data.list.length;p++){
                this.reviewshowFire(p)
                if(this.data.list[p].zantag){
                  this.setData({
                    [`list[${p}].zanclass`]:'bot-likeyes'
                  })
                }
                else{
                  this.setData({
                    [`list[${p}].zanclass`]:'bot-like'
                  })
                }
              }
              for(var i=0;i<this.data.firesLength;i++){
                this.setData({
                  [`point[0].fires[${i}].starstyle`]:'graystar',
                  [`point[1].fires[${i}].starstyle`]:'graystar',
                  'text_detail':'',
                })
              }
              this.showFire();
            })
            // console.log(res.result.list)
          }
        })
        wx.showToast({
          title: '发表成功',
        })
        // console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
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
    // console.log(this.data.text_detail)
  },
  //设置火苗
  setFires:function(e){
    var num=e.currentTarget.dataset.num;
    var arg=Math.floor(num/10)
    var after=Math.floor(num%10)
    for(var i=0;i<this.data.firesLength;i++){
      if(this.data.point[arg].fires[i].name<=after){
        this.setData({
          [`point[${arg}].fires[${i}].starstyle`]:'activestar',
          [`point[${arg}].score`]:after
        })
      }
      else{
        this.setData({
          [`point[${arg}].fires[${i}].starstyle`]:'graystar',
          [`point[${arg}].score`]:after
        })
      }
    }
    this.setData({
      onescore:this.data.point[0].score,
      twoscore:this.data.point[1].score
    })
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
    var id=options.id
    this.setData({
      'book_id':id
    })
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid,
  
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
          book:res.data ,
          score:res.data[0].bookrating.score,
          zscore:res.data[0].bookrating.cover.num,
          lscore:res.data[0].bookrating.exercise.num,
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
    wx.cloud.callFunction({
      name:'lookup',
      data:{
        collection:'book-comments',
        from:'users',
        localField:'userid',
        foreignField:'_openid',
        as:'userList',//userList里存储着发表评论的用户的头像、昵称
        match:{bookid:this.data.book_id},
        sort:{support:-1}//默认打开按照支持数从高到低显示
      },
      success:res=>{
        this.setData({
          list:res.result.list ,//res.result.list里存储着所有的评论，userList也在里面
          count:res.result.list.length
        },function(){
          for(var p=0;p<this.data.list.length;p++){
            this.reviewshowFire(p)
            if(this.data.list[p].zantag){
              this.setData({
                [`list[${p}].zanclass`]:'bot-likeyes'
              })
            }
            else{
              this.setData({
                [`list[${p}].zanclass`]:'bot-like'
              })
            }
          }
        })
        // console.log(res.result.list)
      }
    })
    
    //判断是否收藏
    db.collection('favor').where({
      name:_.eq(this.data.book_id),//点击进入详情页时，获得书籍_id
      userid:_.eq(this.data.openid)
    }).get({
      success: res => {
        this.setData({
          tag:res.data.length===0?false:true
        })
        if(!this.data.tag){
          this.setData({
            "xingclass":"dactive",
          })
        }else{
          this.setData({
            "xingclass":"active",
          })
        }
        // console.log('[数据库] [查询记录] 成功: ', res.data)
      },
      fail: err => {
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
/********************************************************** */
    if(!this.data.tag){
      this.setData({
        "xingclass":"dactive",
        "tag":true,
      })
  }
  
  for(var z=0;z<this.data.list.length;z++){
    if(this.data.list[z].zantag){
      this.setData({
        [`list[${z}].zanclass`]:'bot-likeyes'
      })
    }
    else{
      this.setData({
        [`list[${z}].zanclass`]:'bot-like'
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