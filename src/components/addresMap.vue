<template>
    <div>{{City}} </div>
</template>
<script>
import globalLoca from  '@/utils/qqmap-wx-jssdk'
import { mapState,mapActions } from 'vuex'
// import store from '@/store/store'
export default {
   data () {
       return {
          // city:''
       }
   },
   computed:{
     ...mapState('city',['City'])
   },
   mounted(){
    //  if(wx.getStorageSync('City')){
    //    this.city = wx.getStorageSync('City')
    //  }else{
       this.getUserLocation();
    //  }
    //  this.GetVal();
   },
   methods:{
   ...mapActions('city',['SetCity']),

  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        }
        else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },

    // 微信获得经纬度
    getLocation: function () {
        let vm = this;
        wx.getLocation({
        type: 'wgs84',
        success: function (res) {
            console.log(JSON.stringify(res))
            var latitude = res.latitude
            var longitude = res.longitude
            var speed = res.speed
            var accuracy = res.accuracy;
            vm.getLocal(latitude, longitude)
        },
        fail: function (res) {
            console.log('fail' + JSON.stringify(res))
        }
        })
    },

    // 获取当前地理位置
    getLocal: function (latitude, longitude) {
        let vm = this;
        var qqmapsdk = new globalLoca.QQMapWX({
            key: "5AGBZ-6ZLCX-G734A-ZZDIF-VNDFQ-GHFY2", 
        })
        qqmapsdk.reverseGeocoder({
        location: {
            latitude: latitude,
            longitude: longitude
        },
        success: function (res) {
            // console.log(JSON.stringify(res));
            let province = res.result.ad_info.province
            let city = res.result.ad_info.city
            // vm.city = res.result.address_component.city
            vm.SetCity(res.result.address_component.city)
            wx.setStorageSync('City',vm.city)
            wx.setStorageSync('adcode',res.result.ad_info.adcode)
            // vm.$emit('GetLoctionData',res.result.address_component.city)
        },
        fail: function (res) {
            console.log(res);
        },
        complete: function (res) {
            // console.log(res);
        }
        });
    },

    //赋值
    SetValue(name){
      this.city = name;
    }
   }   
}
</script>
<style scoped>

</style>
