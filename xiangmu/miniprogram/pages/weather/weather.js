let bmap = require('../libs/bmap-wx/bmap-wx.min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ak: "mx77FYTgU5Gwn6G3HGxOh9CLc0sN36z9",
    weatherData: '',
    futureWeather: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // 新建bmap对象
    let BMap = new bmap.BMapWX({
      ak: that.data.ak
    });
    let fail = function (data) {
      console.log(data);
    };
    let success = function (data) {
      console.log(data);

      let weatherData = data.currentWeather[0];
      let futureWeather = data.originalData.results[0].weather_data;
      weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5:' + weatherData.pm25 + '\n' + '日期:' + weatherData.date + '\n' + '温度:' + weatherData.temperature + '\n' + weatherData.weatherDesc + '\n' + '风力:' + weatherData.wind + '\n';
      that.setData({
        weatherData: weatherData,
        futureWeather: weatherData
      });
    };

    // 发起weather请求
    BMap.weather({
      fail,
      success
    });
  },
})