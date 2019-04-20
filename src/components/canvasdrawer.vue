<template>
<canvas canvas-id="canvasdrawer" class="board" v-if="showCanvas" :style="{width:width+'px',height:height+'px'}"></canvas>
</template>
<script> 
  export default {
    props: ['painting'],
    data () {
      return {
      	showCanvas: true,
      	width: 0,
      	height: 0,
      	index: 0,
      	imageList: [],
      	tempFileList: [],
      	isPainting: false,
      	cache:{},
      	ctx:null,
      	painting:{}
      }
    },
    components: {

    },
    watch: {  
      painting: function(newVal,oldVal){ 
      wx.removeStorageSync('canvasdrawer_pic_cache')
      this.cache = wx.getStorageSync('canvasdrawer_pic_cache') || {}
      this.ctx = wx.createCanvasContext('canvasdrawer', this) 
      this.painting=this.painting   
      this.width= this.painting.width  
      this.height= this.painting.height      
     }       
   },
    methods: {
    readyPigment () {
      let that=this 
      that.showCanvas=true
      const inter = setInterval(() => {
        if (this.ctx) {
          clearInterval(inter)
          that.ctx.clearRect(0, 0, that.width,that.height)
          that.ctx.clearActions()
          that.ctx.save()
          that.getImageList(that.painting.views)
          that.downLoadImages(0)
        }
      }, 100)
    },
     getImageList (views) {
      const imageList = []
      for (let i = 0; i < views.length; i++) {
        if (views[i].type === 'image') {
          imageList.push(views[i].url)
        }
      }
      
      this.imageList=imageList
     
    },
    downLoadImages (index) {
      let that=this
      if (index < that.imageList.length) {
        that.getImageInfo(that.imageList[index]).then(file => {
          console.log(file)
          that.tempFileList.push(file)
          this.downLoadImages(index + 1)
        })
      } else {
        that.startPainting()
      }
    },
     startPainting () {
     let that=this
      // const { tempFileList, painting: { views } } = this.data
      let views=that.painting.views
     
      for (let i = 0, imageIndex = 0; i < views.length; i++) {
        if (views[i].type === 'image') {
          this.drawImage({
            ...views[i],
            url: that.tempFileList[imageIndex]
          })
          imageIndex++
        } else if (views[i].type === 'text') {
          if (!this.ctx.measureText) {
            wx.showModal({
              title: '提示',
              content: '当前微信版本过低，无法使用 measureText 功能，请升级到最新微信版本后重试。'
            })
            this.triggerEvent('getImage', {errMsg: 'canvasdrawer:version too low'})
            return
          } else {
            this.drawText(views[i])
          }
        } else if (views[i].type === 'rect') {
          this.drawRect(views[i])
        }
      }
      this.ctx.draw(false, () => {
        wx.setStorageSync('canvasdrawer_pic_cache', this.cache)
        this.saveImageToLocal()
      })
    },
     drawImage (params) {
      this.ctx.save()
      const { url, top = 0, left = 0, width = 0, height = 0, borderRadius = 0 } = params
      if (borderRadius) {
        this.ctx.beginPath()
        this.ctx.arc(left + borderRadius, top + borderRadius, borderRadius, 0, 2 * Math.PI)
        this.ctx.clip()
        this.ctx.drawImage(url, left, top, width, height)
      } else {
      this.ctx.drawImage(url, left, top, width, height)
      }
      this.ctx.restore()
    },
      drawText (params) { 
      let that=this
      that.ctx.save()
      const {
        MaxLineNumber = 2,
        breakWord = false,
        color = 'black',
        content = '',
        fontSize = 16,
        top = 0,
        left = 0,
        lineHeight = 20,
        textAlign = 'left',
        width,
        bolder = false,
        textDecoration = 'none',
        isCenter=false
      } = params
      that.ctx.beginPath()
      that.ctx.setTextBaseline('top')
      that.ctx.setTextAlign(textAlign)
      that.ctx.setFillStyle(color)
      that.ctx.setFontSize(fontSize)
      if (!breakWord) {
        if(isCenter){
          this.ctx.fillText(content, (that.painting.width - this.ctx.measureText(content).width) / 2, top)
        }
        else{
          this.ctx.fillText(content,left, top)
        }
        this.drawTextLine(left, top, textDecoration, color, fontSize, content)
      } else {
        let fillText = ''
        let fillTop = top
        let lineNum = 1
        for (let i = 0; i < content.length; i++) {
          fillText += [content[i]]
          if (this.ctx.measureText(fillText).width > width) {
            if (lineNum === MaxLineNumber) {
              if (i !== content.length) {
                fillText = fillText.substring(0, fillText.length - 1) + '...'
                if(isCenter){
                  this.ctx.fillText(fillText, (that.painting.width- this.ctx.measureText(content).width) / 2, fillTop)
                }
                else{
                   this.ctx.fillText(fillText,left, fillTop)
                }  
                this.drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText)
                fillText = ''
                break
              }
            }
             if(isCenter){
                  this.ctx.fillText(fillText, (that.painting.width - this.ctx.measureText(content).width) / 2, fillTop)
                }
                else{
                   this.ctx.fillText(fillText,left, fillTop)
                } 
           
            this.drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText)
            fillText = ''
            fillTop += lineHeight
            lineNum ++
          }
        }
        if(isCenter){
         this.ctx.fillText(fillText, (this.width - this.ctx.measureText(content).width) / 2, fillTop)
       }
       else{
        this.ctx.fillText(fillText,left, fillTop)
      } 
        
        this.drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText)
      }
      
      this.ctx.restore()
      if (bolder) {
        this.drawText({
          ...params,
          left: left + 0.3,
          top: top + 0.3,
          bolder: false,
          textDecoration: 'none' 
        })
      }
    },
    drawTextLine (left, top, textDecoration, color, fontSize, content) {  
      if (textDecoration === 'underline') {
        this.drawRect({
          background: color,
          top: top + fontSize * 1.2,
          left: left - 1,
          width: this.ctx.measureText(content).width + 3,
          height: 1
        })
      } else if (textDecoration === 'line-through') {
        this.drawRect({
          background: color,
          top: top + fontSize * 0.6,
          left: left - 1,
          width: this.ctx.measureText(content).width + 3,
          height: 1
        })
      }
    },
    drawRect (params) {
      
      this.ctx.save()
      const { background, top = 0, left = 0, width = 0, height = 0 } = params
      this.ctx.setFillStyle(background)
      this.ctx.fillRect(left, top, width, height)
      this.ctx.restore()
    },
      getImageInfo (url) {
      	let that=this
      return new Promise((resolve, reject) => {
        if (that.cache[url]) {
          resolve(that.cache[url])
        } else {
          const objExp = new RegExp(/^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/)
          if (objExp.test(url)) {
            wx.getImageInfo({
              src: url,
              complete: res => {
                if (res.errMsg === 'getImageInfo:ok') {
                  that.cache[url] = res.path
                  resolve(res.path)
                } else {
                  this.$emit('getImage', {errMsg: 'canvasdrawer:download fail'})
                  reject(new Error('getImageInfo fail'))
                }
              }
            })
          } else {
            that.cache[url] = url
            resolve(url)
          }
        }
      })
    },
     saveImageToLocal () {
      let that=this
      const { width, height } = this.painting
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width,
        height,
        canvasId: 'canvasdrawer',
        complete: res => {
          if (res.errMsg === 'canvasToTempFilePath:ok') {
           that.showCanvas=false
           that.isPainting=false
           that.imageList=[]
           that.tempFileList=[]
            this.$emit('getImage', {tempFilePath: res.tempFilePath, errMsg: 'canvasdrawer:ok'})
          } else {
            this.$emit('getImage', {errMsg: 'canvasdrawer:fail'})
          }
        }
      }, this)
    }
    },
    created () {
    
  }
}
</script>

<style scoped lang="less">
.board{
  position: absolute;
  top:40px;
  left: 50px;
}
</style>
