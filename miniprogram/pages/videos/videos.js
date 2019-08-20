function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
};

var app =getApp();

Page({
  data:{
    videos_id: "",
  },

  onLoad(options){
    var _obj = options.id;
    this.setData({
      videos_id : _obj,
    })
  },

  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',
  data: {
    src: '',
    danmuList:
      [{
        text: '琪琪喜欢看的猫和老鼠',
        color: '#ff0000',
        time: 1
      },
      {
        text: '这是个彩蛋！',
        color: '#ff00ff',
        time: 3
        },{
          text: '琪琪看到彩蛋了吗?',
          color: '#ff00ff',
          time: 5
        }, {
          text: '想不到吧，这里还有弹幕！',
          color: '#ff00ff',
          time: 300
        }, {
          text: '测试：这是第400秒！',
          color: '#ff00ff',
          time: 400
        }]
  },
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },
  bindPlay: function () {
    this.videoContext.play()
  },
  bindPause: function () {
    this.videoContext.pause()
  },
  videoErrorCallback: function (e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  }
})