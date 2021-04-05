//index.js
const app = getApp()

Page({
  data: {
    openid:"",//用户唯一标识
    message:'',
    kemu:[{subject:'数学',text:""},{subject:'英语',text:""},{subject:'政治',text:""}],
    firesLength:5,
    clicknum:1,
    
  },
  //跳转搜索
    turnSearch: function(e){
    wx.navigateTo({
      url: '/pages/shouye/search/search',
    })
  },
  //进入老师详情
  gotoDetail:function(e){
    var name=e.target.dataset.name
    console.log(name)
    wx.navigateTo({
      url: `/pages/shouye/detail/detail?name=${name}`,
    })
  },
  //打开更多老师，这里可以获取点击的什么科目的更多老师e.target.dataset.kemu
  moreTeacher:function(e){
    var kemu=e.target.dataset.kemu
    // console.log(e.target.dataset.kemu)
    wx.navigateTo({   
      url:`/pages/shouye/more/more?kemu=${kemu}`
 }) 
  },
  //显示每个老师的热度火苗
  showFire:function(arg){
    // console.log(arg)
    // console.log(this.data.kemu[arg].text.length)
    for(var k=0;k<this.data.kemu[arg].text.length;k++){
      for(var j=0;j<this.data.firesLength;j++){
        this.setData({
        [`kemu[${arg}].text[${k}].fires[${j}].class`]:'grayfire'
      })
      }
    }
    for(var k=0;k<this.data.kemu[arg].text.length;k++){
      // console.log(this.data.kemu[arg].text[k].score)
      for(var j=0;j<this.data.firesLength;j++){
        if (this.data.kemu[arg].text[k].fires[j].id<=Math.floor(this.data.kemu[arg].text[k].score/2)){
          this.setData({
            [`kemu[${arg}].text[${k}].fires[${j}].class`]:'redfire'
          })
        }
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
        this.setData({
          'kemu[0].text':res.data
        },function(){
          //更多火苗（也是显示火苗）
          for(var k=0;k<this.data.kemu[0].text.length;k++){
            for(var i=0;i<this.data.firesLength;i++){
              this.setData({
                [`kemu[0].text[${k}].fires[${i}].class`]:'grayfire'
              })
            }
          }
          //调用火苗函数
          this.showFire(0)
        })
        // console.log('[数据库] [查询记录] 成功: ', res.data)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '加载失败'
        })
        // console.error('[数据库] [查询记录] 失败：', err)
      }
    })
    // 查询英语教师信息，只显示前三个，并按热度从高到低输出
    db.collection('teachers').where({
      subject: _.eq("English")
    }).orderBy('score', 'desc')
    .limit(3)
    .get({
      success: res => {
        this.setData({
          'kemu[1].text':res.data
        },function(){
          //更多火苗（也是显示火苗）
          for(var k=0;k<this.data.kemu[1].text.length;k++){
            for(var i=0;i<this.data.firesLength;i++){
              this.setData({
                [`kemu[1].text[${k}].fires[${i}].class`]:'grayfire'
              })
            }
          }
          //调用火苗函数
          this.showFire(1)
        })
        console.log('[数据库] [查询记录] 成功: ', res.data)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '加载失败'
        })
        // console.error('[数据库] [查询记录] 失败：', err)
      }
    })
    // 查询政治教师信息，只显示前三个，并按热度从高到低输出
    db.collection('teachers').where({
      subject: _.eq("politics")
    }).orderBy('score', 'desc')
    .limit(3)
    .get({
      success: res => {
        this.setData({
          'kemu[2].text':res.data
        },function(){
          //更多火苗（也是显示火苗）
          for(var k=0;k<this.data.kemu[2].text.length;k++){
            for(var i=0;i<this.data.firesLength;i++){
              this.setData({
                [`kemu[2].text[${k}].fires[${i}].class`]:'grayfire'
              })
            }
          }
          //调用火苗函数
          this.showFire(2)
        })
        // console.log('[数据库] [查询记录] 成功: ', res.data)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '加载失败'
        })
        // console.error('[数据库] [查询记录] 失败：', err)
      }
    })
/********************************************************************** */
  }
})


