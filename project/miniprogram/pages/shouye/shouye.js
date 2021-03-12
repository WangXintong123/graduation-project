//index.js
const app = getApp()

Page({
  data: {
    openid:"",//用户唯一标识

    message:'',
    kemu:["数学","英语","政治"],
    teacher:[
      {img:'./image/wuzhongxiang.png',name:'张宇',hot:90,num:0,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
      {img:'./image/wuzhongxiang.png',name:'汤家凤',hot:79,num:1,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
      {img:'./image/wuzhongxiang.png',name:'武忠祥',hot:59,num:2,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]}
    ],
    firesLength:5,
    clicknum:1,
    
  },
  //跳转搜索
    turnSearch: function(e){
    wx.navigateTo({
      url: '/pages/shouye/search/search',
    })
  },
  //打开更多老师，这里可以获取点击的什么科目的更多老师e.target.dataset.kemu
  moreTeacher:function(e){
    wx.navigateTo({   
      url:"/pages/shouye/more/more"
 }) 
  },
  //显示每个老师的热度火苗
  showFire:function(arg){
    for(var j=0;j<this.data.firesLength;j++){
      this.setData({
        [`teacher[${arg}].fires[${j}].class`]:'grayfire'
      })
    }
      for(var j=0;j<this.data.firesLength;j++){
        if (this.data.teacher[arg].fires[j].id<=Math.floor(this.data.teacher[arg].hot/20)){
          this.setData({
            [`teacher[${arg}].fires[${j}].class`]:'redfire'
          })
        }
    }
    
  },
  onLoad:function(options){
    /********************************************* */
    //获取用户的openid
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        console.log('调用login云函数返回的res',res)
        app.globalData.openid = res.result.openid;
        
      }
    })
    //将用户的唯一标识赋给this.data.openid
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
    const db = wx.cloud.database()
    const _ = db.command
    // 查询数学教师信息，只显示前三个，并按热度从高到低输出
    db.collection('teachers').where({
      subject: _.eq("math")
    }).orderBy('score', 'desc')
    .limit(3)
    .get({
      success: res => {
        // this.setData({
        //   math:res.data
        // })
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
    // 查询英语教师信息，只显示前三个，并按热度从高到低输出
    db.collection('teachers').where({
      subject: _.eq("English")
    }).orderBy('score', 'desc')
    .limit(3)
    .get({
      success: res => {
        // this.setData({
        //   English:res.data
        // })
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
    // 查询政治教师信息，只显示前三个，并按热度从高到低输出
    db.collection('teachers').where({
      subject: _.eq("politics")
    }).orderBy('score', 'desc')
    .limit(3)
    .get({
      success: res => {
        // this.setData({
        //   politics:res.data
        // })
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
/********************************************************************** */
    //更多火苗（也是显示火苗）
    for(var j=0;j<this.data.teacher.length;j++){
      for(var i=0;i<this.data.firesLength;i++){
        this.setData({
          [`teacher[${j}].fires[${i}].class`]:'grayfire'
        })
      }
    }
    //调用火苗函数
    for(var n=0;n<this.data.teacher.length;n++){
      this.showFire(n)
    }
  }
})


