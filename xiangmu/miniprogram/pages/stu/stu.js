var bmap = require('../../libs/bmap-wx.js'); 
Page({ 
    data: { 
        weatherData: '' 
    }, 
    onLoad: function() { 
        var that = this; 
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
    } 
})