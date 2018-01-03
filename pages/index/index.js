//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    circleList : [],//圆点数组
    awardList : [],//奖品数组
    colorCircleFirst : "#ffdf2f",//圆点颜色1
    colorcircleSecond : "#fe4d32",//圆点颜色2
    colorAwardDefault : "#F5f0fc",//奖品默认颜色
    colorAwardSelect : "#ffe400",//奖品选中颜色
    indexSelect : 0,//被选中奖品的index
    isRunning : false,//是否正在抽奖
    imageAward : [
      "../../images/1.jpg",
      "../../images/2.jpg",
      "../../images/3.jpg",
      "../../images/4.jpg",
      "../../images/5.jpg",
      "../../images/6.jpg",
      "../../images/7.jpg",
      "../../images/8.jpg"
    ]//奖品图片数组

  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function () {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
    var _this = this;
    //圆点设置
    var leftCircle = 7.5,
        topCircle = 7.5,
        circleList = [];
    for(var i=0;i<24;i++){
      if(i == 0){
        topCircle = 15;
        leftCircle = 15;
      }else if(i < 6){
        topCircle = 7.5;
        leftCircle = leftCircle + 102.5;
      }else if(i == 6){
        topCircle = 15;
        leftCircle = 620;
      }else if(i < 12){
        topCircle = topCircle + 94;
        leftCircle = 620;
      }else if(i == 12){
        topCircle = 565;
        leftCircle = 620;
      }else if(i < 18){
        topCircle = 570;
        leftCircle = leftCircle - 102.5;
      }else if(i == 18){
        topCircle = 565;
        leftCircle = 15;
      }else if(i<24){
        topCircle = topCircle - 94;
        leftCircle = 7.5;
      }else{
        return;
      }
      circleList.push({topCircle : topCircle,leftCircle : leftCircle});
    }
    this.setData({circleList : circleList});
    //圆点闪烁
    setInterval(function(){
      if(_this.data.colorCircleFirst =="#FFDF2F"){
        _this.setData({
          colorCircleFirst : "#FE4d32",
          colorCircleSecond : "#FFDF2F"
        });
      }else{
        _this.setData({
          colorCircleFirst: "#FFDF2F",
          colorCircleSecond: "#FE4d32"
        });
      }
    },500);//设置圆点的闪烁效果
    //奖品item设置
    var awardList = [];
    //间距
    var topAward = 25;
    var leftAward = 25;
    for(var j=0;j<8;j++){
      if(j == 0){
        topAward = 25;
        leftAward = 25;
      }else if(j < 3){
        topAward = topAward;
        //166.6666 是宽   15 是间距
        leftAward = leftAward + 166.6666 + 15;
      }else if(j < 5){
        leftAward = leftAward;
        //150 是高   15 是间距
        topAward = topAward + 150 + 15;
      }else if(j < 7){
        leftAward = leftAward - 166.6666 - 15;
        topAward = topAward;
      }else if(j < 8){
        leftAward = leftAward;
        topAward = topAward - 150 - 15;
      }
      var imageAward = this.data.imageAward[j];
     
      awardList.push({ topAward: topAward, leftAward: leftAward, imageAward: imageAward});
    }
    this.setData({
      awardList: awardList
    })
  },
  startGame : function(){
    //首先判断当前是否处于抽奖的状态
    if(this.data.isRunning)return;
    //否则设置抽奖状态为true
    this.setData({
      isRunning : true
    });
    var _this = this;
    var indexSelect = 0;
    var i = 0;
    var timer = setInterval(function(){
      indexSelect ++;
      i += 30;
      if(i > 1000){
        //去除循环
       if(timer) clearInterval(timer);
       //获奖提示
       wx.showModal({
         title: '中奖啦！',
         content: '恭喜获得第' + (_this.data.indexSelect + 1) + "的优惠券",
         showCancel : false,//去掉取消按钮
         success : function(res){
          if(res.confirm){
            _this.setData({
              isRunning : false
            });
          }
         }
       })
      }
      indexSelect = indexSelect % 8;
      _this.setData({
        indexSelect : indexSelect
      })
    },(100 + i));
  }
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
