// miniprogram/pages/out/out.js
Page({


  data: {
    begName: "选择起点",
    endName : "选择终点",
    beg :null,
    end :null,
    isNavigate: false,
    tempIn:0,
    tempOut:0,
    warm : false
  },

  setBeg:function(){
    var that = this;
    wx.chooseLocation({
      success:function(e){
        that.setData({
          beg : e,
          begName:e.name
        })
      }
    })
  },
  setEnd:function(){
    var that = this;
    wx.chooseLocation({
      success:function(e){
        that.setData({
          end : e,
          endName:e.name
        })
      }
    })
  },
  onWatchDemo () {
		if (!this.data.end) {
			wx.showToast({
				title: '请选择终点位置',
				icon: 'none',
				duration: 1500,
				mask: false
			});
			return;
		}
		const key = "LAIBZ-YTIH2-3CKU2-CEBSQ-OVU26-WOBIY";
		const referer = "xiangmu";
    const end = JSON.stringify(this.data.end);
		const startPoint = this.data.beg ? JSON.stringify(this.data.beg) : '';
		const mode = 'transit';
		const navigation = this.data.isNavigate ;
		let url = 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + end +
    '&mode=' + mode + '&navigation=' + navigation;
    console.log(startPoint);
		if (startPoint) {
			url += '&startPoint=' + startPoint;
		}
		wx.navigateTo({
			url
		});
	},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var bmap = require('../../libs/bmap-wx.min.js');
    var that = this;
    var BMap = new bmap.BMapWX({
        ak: '您的ak'
    });
    var fail = function(data) {
        console.log('fail!!!!')
    };
    var success = function(data) {
        console.log('success!!!');
        var weatherData = data.currentWeather[0];
        weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' +'日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' +'天气：' + weatherData.weatherDesc + '\n' +'风力：' + weatherData.wind + '\n';
        that.setData({
            tempOut : weatherData.temperature
        });
    }
    BMap.weather({
        fail: fail,
        success: success
    });

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
            tempIn : dat[0].datapoints[dat[0].datapoints.length - 1].value,
          });

        
        },
      });
    var temIn = this.data.tempIn;
    var temOut = this.data.tempOut;
    if (temOut < tempIn - 7){
      this.setData({
        warm : true
      })
    }

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
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '外出',
    })
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