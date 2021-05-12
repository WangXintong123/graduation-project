// miniprogram/pages/shouye/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  //最热最新功能没写，需要接口
  data: {
    openid:"",//用户唯一标识
    teacher_id:'',
    teacher:[],
    xingclass:'dactive',
    tag:false,
    aclass:"type-a",
    dclass:'type-da',
    firesLength:5,
    list:[],
    conut:0,
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
    teacher_score:0,
    hide:true,
    text_detail:'',
    score:0
  },
  //路由跳转
  back:function(e){
    wx.navigateBack({
      delta:1
    })
  },
  //改变收藏星星样式
  likeChange:function(e){
    // console.log(e)
    const db = wx.cloud.database();
    const _=db.command;
    if(!this.data.tag){
      //点击收藏添加到数据库（先判断tag值，若为false，则执行此代码）
    db.collection('favor').add({
      data: {
        name:this.data.teacher_id,
        userid:this.data.openid,
        type:'teacher',
        teachername:e.currentTarget.dataset.teachername,
        image:e.currentTarget.dataset.img,
        score:e.currentTarget.dataset.score,
        fires:[{class:"grayfire",id:"0"},{class:"grayfire",id:"1"},{class:"grayfire",id:"2"},{class:"grayfire",id:"3"},{class:"grayfire",id:"4"}]
      },
      success: res => {
        //在返回结果中会包含新创建的记录的 _id
        this.setData({
          "xingclass":"active",
          tag:true//将收藏标识设为true
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
        name:_.eq(this.data.teacher_id)
      }).remove({
        success: res => {
          wx.showToast({
            title: '取消收藏',
          })
          this.setData({
            "xingclass":"dactive",
            tag:false//将收藏标识设为false
          })
        },
        fail: err => {
          console.error('取消收藏失败：', err)
        }
      })
    }
    /************************************* ************/
    
   
    /************************************************************** */
  },
  //改变最新或最热样式
  clickChoose:function(e){
    if(e.target.dataset.num==1){
      this.setData({
        'aclass':"type-a",
        'dclass':'type-da'
      })
      wx.cloud.callFunction({
        name:'lookup',
        data:{
          collection:'teacher-comments',
          from:'users',
          localField:'userid',
          foreignField:'_openid',
          as:'userList',//userList里存储着发表评论的用户的头像、昵称
          match:{teacherid:this.data.teacher_id},
          sort:{support:-1}//默认打开按照支持数从高到低显示，若点击最新，则将'support'改成'time'，即要设成变量，点击事件绑定setdata，来改变变量值
        },
        success:res=>{
          this.setData({
            list:res.result.list //res.result.list里存储着所有的评论，userList也在里面
          },function(){
            for(var n=0;n<this.data.list.length;n++){
              this.showFire(n)
              if(this.data.list[n].zantag){
                this.setData({
                  [`list[${n}].zanclass`]:'bot-likeyes'
                })
              }
              else{
                this.setData({
                  [`list[${n}].zanclass`]:'bot-like'
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
          collection:'teacher-comments',
          from:'users',
          localField:'userid',
          foreignField:'_openid',
          as:'userList',//userList里存储着发表评论的用户的头像、昵称
          match:{teacherid:this.data.teacher_id},
          sort:{time:-1}//默认打开按照支持数从高到低显示，若点击最新，则将'support'改成'time'，即要设成变量，点击事件绑定setdata，来改变变量值
        },
        success:res=>{
          this.setData({
            list:res.result.list //res.result.list里存储着所有的评论，userList也在里面
          },function(){
            for(var n=0;n<this.data.list.length;n++){
              this.showFire(n)
              if(this.data.list[n].zantag){
                this.setData({
                  [`list[${n}].zanclass`]:'bot-likeyes'
                })
              }
              else{
                this.setData({
                  [`list[${n}].zanclass`]:'bot-like'
                })
              }
            }
          })
          // console.log(res.result.list)
        }
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
  //显示火苗热度
  showFire:function(arg){
    for(var j=0;j<this.data.firesLength;j++){
      this.setData({
        [`list[${arg}].fires[${j}].class`]:'grayfire'
      })
    }
      for(var j=0;j<this.data.firesLength;j++){
        if (this.data.list[arg].fires[j].id<=Math.floor(this.data.list[arg].score)){
          this.setData({
            [`list[${arg}].fires[${j}].class`]:'redfire'
          })
        }
    }
    
  },
  //改变点赞大拇指样式
  zanChange:function(e){
    const db = wx.cloud.database();
    const _=db.command;
    var i=e.currentTarget.dataset.num
    for(var j=0;j<this.data.list.length;j++){
      if(this.data.list[j]._id==i){
        
        if(!this.data.list[j].zantag){
          this.setData({
            [`list[${j}].zantag`]:true,
            [`list[${j}].support`]:this.data.list[j].support+1
          })
        }
        else{
          this.setData({
            [`list[${j}].zantag`]:false,
            [`list[${j}].support`]:this.data.list[j].support-1
          })
        }
        db.collection('teacher-comments').doc(i).update({
          data: {
            support:this.data.list[j].support,
            zantag:this.data.list[j].zantag
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
    //点赞或取消更新数据库
    
    /**************************************************** */
  },
  //打开评论遮罩层
  show:function(){
    this.setData({
      "hide":false,
      "text_detail":"",
    })
  },
  //关闭评论
  writeOff:function(){
    this.setData({
      "hide":true,
      'text_detail':''
    })
  },
  //提交评论
  writeSub:function(){
    this.setData({
      "hide":true
    })
    // console.log(this.data.openid)
    /***************************************************** */
    //将评论添加到数据库
    const db = wx.cloud.database();
    const _=db.command;
    let now = new Date();
    db.collection('teacher-comments').add({
      data: {
        userid: this.data.openid,
        teacherid:this.data.teacher_id,
        score:this.data.teacher_score,
        content:this.data.text_detail,
        support:0,//一开始点赞数为0
        image:this.data.teacher[0].teacherimg,
		    date:now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日',
        time: now.getTime(),
        zantag:false,
        zanclass:'bot-like',
        subject:'teacher',
        fires:[{class:"grayfire",id:"0"},{class:"grayfire",id:"1"},{class:"grayfire",id:"2"},{class:"grayfire",id:"3"},{class:"grayfire",id:"4"}]
      },
      success: res => {
        //更改教师数据库分数
        db.collection('teachers').doc(this.data.teacher_id)
        .update({
          data:{
            // score: this.data.teacher_score,
            score:Number(((this.data.teacher[0].score*this.data.count+(this.data.teacher_score+1)*2)/(this.data.count+1)).toFixed(1))
          }
        })
        // 创建成功后重新渲染评论列表
        wx.cloud.callFunction({
          name:'lookup',
          data:{
            collection:'teacher-comments',
            from:'users',
            localField:'userid',
            foreignField:'_openid',
            as:'userList',//userList里存储着发表评论的用户的头像、昵称
            match:{teacherid:this.data.teacher_id},
            sort:{support:-1}//若此时按最新展示，则将'support'改成'time'，即要设成变量
          },
          success:res=>{
            this.setData({
              list:res.result.list ,//res.result.list里存储着所有的评论，userList也在里面，
              [`teacher[${0}].score`]:Number(((this.data.teacher[0].score*this.data.count+(this.data.teacher_score+1)*2)/(this.data.count+1)).toFixed(1))
            },function(){
              this.setData({
                count:this.data.count+1
              })
              for(var n=0;n<this.data.list.length;n++){
                this.showFire(n)
                if(this.data.list[n].zantag){
                  this.setData({
                    [`list[${n}].zanclass`]:'bot-likeyes'
                  })
                }
                else{
                  this.setData({
                    [`list[${n}].zanclass`]:'bot-like'
                  })
                }
              }
              for(var i=0;i<this.data.fires.length;i++){
                this.setData({
                  [`fires[${i}].firestyle`]:'grayfireset',
                  'text_detail':'',
                  'chose':''
                })
              }
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
  },
  //设置火苗
  setFires:function(e){
    var num=e.currentTarget.dataset.num;
    var mean=this.data.text[num];
    for(var i=0;i<this.data.fires.length;i++){
      if(this.data.fires[i].name<=num){
        this.setData({
          [`fires[${i}].firestyle`]:'activefireset',
          'teacher_score':num
        })
      }
      else{
        this.setData({
          [`fires[${i}].firestyle`]:'grayfireset',
          'teacher_score':num
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
    var name=options.name
    this.setData({
      'teacher_id':name
    })
    // console.log(name)
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
      _id: _.eq(name)//根据前面的路由提供参数，获得对应的教师的_id
    })
    .get({
      success: res => {
        this.setData({
          teacher:res.data 
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
        collection:'teacher-comments',
        from:'users',
        localField:'userid',
        foreignField:'_openid',
        as:'userList',//userList里存储着发表评论的用户的头像、昵称
        match:{teacherid:this.data.teacher_id},
        sort:{support:-1}//默认打开按照支持数从高到低显示
      },
      success:res=>{
        this.setData({
          list:res.result.list, //res.result.list里存储着所有的评论，userList也在里面
          count:res.result.list.length
        },function(){
          for(var n=0;n<this.data.list.length;n++){
            this.showFire(n)
            if(this.data.list[n].zantag){
              this.setData({
                [`list[${n}].zanclass`]:'bot-likeyes'
              })
            }
            else{
              this.setData({
                [`list[${n}].zanclass`]:'bot-like'
              })
            }
          }
        })
        // console.log(res.result.list)
      }
    })
    
    //判断是否收藏
    db.collection('favor').where({
      name:_.eq(this.data.teacher_id),//点击进入详情页时，获得教师id
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
  for(var j=0;j<this.data.list.length;j++){
    for(var i=0;i<this.data.firesLength;i++){
      this.setData({
        [`list[${j}].fires[${i}].class`]:'grayfire'
      })
    }
  }
  for(var n=0;n<this.data.list.length;n++){
    // console.log(n)
    this.showFire(n)
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