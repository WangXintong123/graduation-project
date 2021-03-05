//index.js
const app = getApp()

Page({
  data: {
    message:'',
    kemu:["数学","英语","政治"],
    teacher:[
      {img:'./image/wuzhongxiang.png',name:'张宇',hot:90,num:0,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
      {img:'./image/wuzhongxiang.png',name:'汤家凤',hot:79,num:1,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
      {img:'./image/wuzhongxiang.png',name:'武忠祥',hot:59,num:2,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]}
    ],
    firesLength:5,
    clicknum:1
  },
  //获取搜索内容
    getInput: function(e){
    this.setData({
        message: e.detail.value
     });
  },
  //更多老师
  moreTeacher:function(){
    console.log("跳转")  
  },
  //点击变色
  // clickTab:function(e){
  //     //与target有区别
  //   this.setData({
  //     clicknum:e.currentTarget.dataset.cnum
  //   })
  // },
  //点击跳转
  // toShouye:function(e){
  //   wx.navigateTo({
  //     url: 'pages/shouye/shouye',
  //   })
  //   this.setData({
  //     clicknum:e.currentTarget.dataset.cnum
  //   })
  // },
  // toBook:function(e){
  //   wx.navigateTo({
  //     url: 'pages/index/index',
  //   })
  //   this.setData({
  //     clicknum:e.currentTarget.dataset.cnum
  //   })
  // },
  // toMine:function(e){
  //   wx.navigateTo({
  //     url: 'pages/index/index',
  //   })
  //   this.setData({
  //     clicknum:e.currentTarget.dataset.cnum
  //   })
  // },
  //热度火苗
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
  onLoad:function(){
    //更多火苗
    for(var j=0;j<this.data.teacher.length;j++){
      for(var i=0;i<this.data.firesLength;i++){
        this.setData({
          [`teacher[${j}].fires[${i}].class`]:'grayfire'
        })
      }
    }
    for(var n=0;n<this.data.teacher.length;n++){
      this.showFire(n)
    }
  }
})


