const app = getApp();
const db =wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    page_bgc:"linear-gradient(45deg, #b95cff, #3b3333)",
    word_bgc:"rgba(144, 238, 202, 0.4)",
    tip_bgc:"rgba(235, 189, 189, 0.6)",
    band_opa:"0.2",
    in_color: "white",
    screenHeight: "",
    proList: [],
    tip_words1: "今天阳光灿烂，暖洋洋的很舒服!",
    pro_color: "white",
    modal_word: "",
    videos_id: "",

    isPopping: true,//是否已经弹出  
    animPlus: {},//旋转动画  
    animCollect: {},//item位移,透明度  
    animTranspond: {},//item位移,透明度  
    animInput: {},//item位移,透明度  
     
    audioAction: {
      method: 'pause'
    }
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this;
    // that.app = getApp();

   
    //获取设备屏幕高度，赋值给wxml中最大的view，以达到背景色覆盖全屏
    
    this.setData({
      screenHeight: wx.getSystemInfoSync().windowHeight,
    })

  

    db.collection('music_pro').get({
      success: res => {
        this.setData({
          proList: res.data,
        })
        console.log(res.data);
      },
      fail: err => {
        console.error(error);
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
    // this.getOpenid();

    

  },

  // onShow: function () {
  //   //淡入淡出动画效果设置
  //   // this.app.slideupshow(this,'slide_up_1',200,1);
  //   var that = this;
  //   setTimeout(function () {
  //     that.app.slideupshow(that, 'slide_up_1', 200, 1)
  //   }.bind(that), 20);
  // },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        // wx.navigateTo({
        //   url: '../userConsole/userConsole',
        // })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        // wx.navigateTo({
        //   url: '../deployFunctions/deployFunctions',
        // })
      }
    })


  },

  /*
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  
  

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // setTimeout(function () {
    //   this.app.slideupshow(this, 'slide_up_1', -200, 0)
    // }.bind(this), 20);
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
    
  },
  changeBGC(e){
    this.startTime = e.timeStamp;
    console.log(e.timeStamp);
      
    this.setData({
      page_bgc: "linear-gradient(45deg, #b95cff, #3b3333)",
      word_bgc: "rgba(144, 238, 202, 0.4)",
      tip_bgc: "rgba(235, 189, 189, 0.6)",
      band_opa: "0.2",
      in_color: "white",
      pro_color: "white"
    })
  },
  backBGC(e){
    this.endTime = e.timeStamp;
    console.log(e.timeStamp);
    // this.setData({
    //   page_bgc: "linear-gradient(45deg, #42FFFF, #F9CCFF)",
    //   word_bgc: "#2a90ab",
    //   tip_bgc: "#31655a",
    //   band_opa: "0.6",
    // })
  },
  longpress(event){
    if (this.endTime - this.startTime > 350);
    wx.playBackgroundAudio({
      dataUrl: 'https://kurtery-00904xu.tcb.qcloud.la/Qi/huranzhijian.mp3?sign=65477ceaa17c69b915e7205e83afd310&t=1565969801',
    })
    wx.vibrateLong({
      success : res =>{
        this.setData({
          page_bgc: "linear-gradient(-45deg, #42FFFF, #F9CCFF)",
          word_bgc: "#2a90ab",
          tip_bgc: "#31655a",
          band_opa: "0.7",
          in_color: "black",
          pro_color: "#f8f8ef"
        })
      }
    })
    console.log("长按");
    
  },
  // getSysInfo:function(){
  //   wx.getSystemInfo({
  //     success: function (res) {
  //       // return res.windowHeight;
  //       console.log(res.windowHeight);
  //     },
  //   })
  // },

//这是底部popup
showModal(e) {
  



  let id = e.currentTarget.dataset.id;

  // console.log(id);

  db.collection("music_pro").doc(id).get({
    success: res => {
      var that = this;
      that.setData({
        modal_word :res.data.tip_words,
        videos_id :res.data.videos_id,
      })
      var nowid = this.data.videos_id;
      console.log(nowid);
      wx.navigateTo({
        url: '../videos/videos?id=' + nowid,
      })
    },
    fail: err => {
      var that = this;
      that.setData({
        modal_word : "获取失败。。。"
      })
    }
  })
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },


  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },


  //点击弹出
  plus: function () {
    if (this.data.isPopping) {
      //缩回动画
      this.popp();
      this.setData({
        isPopping: false
      })
    } else if (!this.data.isPopping) {
      //弹出动画
      this.takeback();
      this.setData({
        isPopping: true
      })
    }
  },
  collect: function () {
    // wx.playBackgroundAudio({
    //   dataUrl: 'https://kurtery-00904xu.tcb.qcloud.la/Qi/kgezhiwang.mp3?sign=11b9bf4ab9cf3d9f212da5aa8860834d&t=1565883265',
    // })


    // 跳转至play页面
    // wx.navigateTo({
    //   url: '../play/play',
    // })
    

  },
  input: function () {
    console.log("input")
  },
  transpond: function () {
    console.log("transpond")
  },
  

  //弹出动画
  popp: function () {
    //plus顺时针旋转
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(360).opacity(0.2).step();
    animationcollect.translate(30, -70).rotateZ(360).opacity(1).step();
    animationTranspond.translate(60, -30).rotateZ(360).opacity(1).step();
    animationInput.translate(30, 10).rotateZ(360).opacity(1).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
    })
  },
  //收回动画
  takeback: function () {
    //plus逆时针旋转
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(0).opacity(1).step();
    animationcollect.translate(0, -30).rotateZ(0).opacity(0).step();
    animationTranspond.translate(0, -30).rotateZ(0).opacity(0).step();
    animationInput.translate(0, -30).rotateZ(0).opacity(0).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
    })
  },
    
  // audioPlayed: function (e) {
  //   console.log('audio is played')
  // },
  // audioTimeUpdated: function (e) {
  //   this.duration = e.detail.duration;
  // },
})