// miniprogram/pages/index/index.js
const devicesId = "642695129" 
const api_key = "ifxs1eAAdIdxLmVZ5KG52Ri8hxM=" 
Page({


  data: {
    temp : 0,
    hum : 0
  },


  


  onLoad:  function () {
    //从onenet读取室内温湿度
    var that = this;
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://api.heclouds.com/devices/${devicesId}/datapoints?datastream_id=Temperature,Humidity&limit=20`,

        header: {
          'content-type': 'application/json',
          'api-key': api_key
        },
        success: (res) => {
          var dat = res.data.data.datastreams;
          console.log(dat[0].datapoints[dat[0].datapoints.length - 1]);
          that.setData({
            temp : dat[0].datapoints[dat[0].datapoints.length - 1].value,
            hum : dat[1].datapoints[dat[1].datapoints.length - 1].value
          });

          if (that.data.hum <= 30) {
            wx.showModal({
              title: '室内湿度低，请注意补水',
            })
          }
        },
      });

    });


    var that = this; 
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({ 
        ak: 'mx77FYTgU5Gwn6G3HGxOh9CLc0sN36z9k' 
    }); 
    var fail = function(data) { 
        console.log(data) 
    }; 
    var success = function(data) { 
        var weatherData = data.currentWeather[0]; 
        weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' +'日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' +'天气：' + weatherData.weatherDesc + '\n' +'风力：' + weatherData.wind + '\n'; 
        that.setData({ 
            weatherData: weatherData 
        }); 
    } 
    // 发起weather请求 
    BMap.weather({ 
        fail: fail, 
        success: success 
    }); 



  },

  /**
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