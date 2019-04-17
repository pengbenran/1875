<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
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
  src: url('//at.alicdn.com/t/font_1088956_u5igujzqv4.eot');
  src: url('//at.alicdn.com/t/font_1088956_u5igujzqv4.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1088956_u5igujzqv4.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1088956_u5igujzqv4.woff') format('woff'),
  url('//at.alicdn.com/t/font_1088956_u5igujzqv4.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1088956_u5igujzqv4.svg#iconfont') format('svg');
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
