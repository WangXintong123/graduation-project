//index.js
const app = getApp()

Page({
  data: {
    message:'',
    kemu:'数学'
  },
  //获取搜索内容
    getInput: function(e){
    this.setData({
        message: e.detail.value
     });
  },
  //更多老师
  moreTeacher:function(){
    console.log("跳转")  }      
})
