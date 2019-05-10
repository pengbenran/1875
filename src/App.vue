<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.setStorageSync('latitude', latitude)
        wx.setStorageSync('longitude', longitude)
      }
    })
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function () {
      updateManager.applyUpdate()
    })
  }
}
</script>

<style>

* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;

}
.fontHidden{
  white-space:normal;overflow: hidden;display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;
}

.fontHidden1{
  white-space:normal;overflow: hidden;display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;
}
@font-face {
  font-family: 'iconfont';  /* project id 1088956 */
  src: url('//at.alicdn.com/t/font_1088956_kdo287n206.eot');
  src: url('//at.alicdn.com/t/font_1088956_kdo287n206.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1088956_kdo287n206.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1088956_kdo287n206.woff') format('woff'),
  url('//at.alicdn.com/t/font_1088956_kdo287n206.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1088956_kdo287n206.svg#iconfont') format('svg');
}
.iconfont{
  font-family: 'iconfont';
  vertical-align: middle; 
}
 /*隐藏滚动条*/
   ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
img{width: 100%;height: 100%;}
</style>
