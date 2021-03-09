// miniprogram/pages/book/bookdetail/bookdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book:{img:"../image/shuxue.png",name:'《张宇高等数学18讲》',kemu:'数学',author:'张宇',
    point:[
      {name:'知识点覆盖程度',number:8,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
      {name:'例题及练习题使用价值',number:2,fires:[{id:0,class:"grayfire"},{id:1,class:"grayfire"},{id:2,class:"grayfire"},{id:3,class:"grayfire"},{id:4,class:"grayfire"}]},
    ]
  },
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
  },
  //展示火苗
  showFire:function(arg){
    for(var j=0;j<this.data.firesLength;j++){
      this.setData({
        [`book.point[${arg}].fires[${j}].class`]:'graystars'
      })
    }
      for(var j=0;j<this.data.firesLength;j++){
        if (this.data.book.point[arg].fires[j].id<=Math.floor(this.data.book.point[arg].number/2)){
          this.setData({
            [`book.point[${arg}].fires[${j}].class`]:'redstars'
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
    if(!this.data.tag){
      this.setData({
        "xingclass":"dactive",
        "tag":true,
      })
  }
  for(var j=0;j<this.data.book.point.length;j++){
    for(var i=0;i<this.data.firesLength;i++){
      this.setData({
        [`book.point[${j}].fires[${i}].class`]:'graystars'
      })
    }
  }
  for(var n=0;n<this.data.book.point.length;n++){
    this.showFire(n)
  }
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