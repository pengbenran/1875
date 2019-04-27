<template>
	<div class="businessCard">
		<div class="paintImg" :style="{width:Width+'px',height:Height+'px'}">
			<img :src="shareImage" mode='widthFix'>
		</div>
		<canvasdrawer :painting="painting"  @getImage="eventGetImage" ref="canvas"/>
		<div class="btn" @click="eventSave" v-if="shareImage">保存图片到本地</div> 
	</div>
</template>
<script>
	import canvasdrawer from '@/components/canvasdrawer'
	import store from '@/store/store'
	// import {ShowToast } from '@/utils/Lib'
	import  Api from '@/api/member'
	export default{
		data(){
			return{
				painting:{},
				shareImage:'',
				userInfo:{},
				Width:'',
				Height:'',
				bcgHeight:'',
				config:{},
				distribInfo:{}
			}
		},
		components:{
			canvasdrawer
		},
		methods:{
			getErCode(){
				let that=this	
				let params={}
				params.params=`${that.userInfo.unionid},0,2`
				Api.publicQRCode(params).then(function(QrcodeRes){
					if(QrcodeRes.code==0){
						that.eventDraw(QrcodeRes.quick,that.config.distributorPoster)
					}else{
						ShowToast('失败','none')
					}
				})
				
			},
			//点击生成海报
			async eventDraw(codeUrl,bcgImg){
			   	let that = this;
			   	wx.showLoading({
			   		title:'推广码绘制中'
				   })	
			   	that.painting={
			   		width: that.Width,
			   		height: that.Height,
			   		clear: true,
			   		views: [
			   		{
			   			type:'rect',
			   			background:that.config.postBackgroud,
			   			top:0,
			   			left:0,
			   			width:that.Width,
			   			height:that.Height
			   		},
			   		{
			   			type: 'image',
			   			url: bcgImg,
			   			top: 7.5,
			   			left: (that.Width-that.bcgHeight)/2,
			   			width:that.bcgHeight,
			   			height: that.bcgHeight
			   		},
			   		{
			   			type: 'image',
			   			url: that.userInfo.face,
			   			top: that.bcgHeight+20,
			   			left: (that.Width-that.bcgHeight)/2,
			   			width:60,
			   			height:60,
			   			borderRadius:30
			   		},
			   		{
			   			type: 'image',
			   			url: codeUrl,
			   			top: that.bcgHeight+25,
			   			left: (that.Width-that.bcgHeight)/2+220,
			   			width:110,
			   			height: 110
			   		},
			   		{
			   			type: 'text',
			   			content:that.distribInfo.lvName,
			   			fontSize: 18,
			   			color: that.config.postFont,
			   			textAlign: 'left',
			   			breakWord: true,
			   			top: that.bcgHeight+45,
			   			left:(that.Width-that.bcgHeight)/2+80,
			   			width:110,
			   			MaxLineNumber:1,
			   			isCenter:false
			   		},
			   		{
			   			type: 'text',
			   			content:that.userInfo.name,
			   			fontSize: 16,
			   			color: that.config.postFont,
			   			textAlign: 'left',
			   			breakWord: true,
			   			top: that.bcgHeight+90,
			   			left:(that.Width-that.bcgHeight)/2,
			   			width:200,
			   			MaxLineNumber:1,
			   			isCenter:false
			   		},
			   		{
			   			type:'rect',
			   			background:'#fff',
			   			top:that.bcgHeight+125,
			   			left:(that.Width-that.bcgHeight)/2,
			   			width:200,
			   			height:40,
			   			borderRadius:10
			   		},
			   		{
			   			type: 'text',
			   			content:that.config.postTage,
			   			fontSize: 16,
			   			color: that.config.tageFont,
			   			textAlign: 'left',
			   			breakWord: true,
			   			top: that.bcgHeight+135,
			   			left:(that.Width-that.bcgHeight)/2+30,
			   			width:200,
			   			MaxLineNumber:1,
			   			isCenter:false
			   		},
			   		{
			   			type: 'text',
			   			content:'微信扫一扫',
			   			fontSize: 16,
			   			color: that.config.postFont,
			   			textAlign: 'left',
			   			breakWord: true,
			   			top:  that.bcgHeight+145,
			   			left:(that.Width-that.bcgHeight)/2+240,
			   			width:200,
			   			MaxLineNumber:1,
			   			isCenter:false
			   		},
			   		]
			   	}
			   	this.$refs.canvas.readyPigment()
			   },
			   eventGetImage(event) {
			   	wx.hideLoading()
			   	console.log(event);
			   	const { tempFilePath, errMsg } = event

			   	if (errMsg === 'canvasdrawer:ok') {
			   		this.shareImage=tempFilePath
			   		wx.setStorageSync('shareImage',this.shareImage)
			   		// wx.previewImage({
			     //        current: this.shareImage, // 当前显示图片的http链接
			     //        urls: [this.shareImage] // 需要预览的图片http链接列表
			     //    })
			 }
			},
			eventSave() {
				wx.saveImageToPhotosAlbum({
					filePath: this.shareImage,
					success(res) {
						wx.showToast({
							title: '保存图片成功',
							icon: 'success',
							duration: 2000
						})
					}
				})
			},
		},
		mounted(){
			let that=this
			that.Width=wx.getSystemInfoSync().windowWidth
			that.Height=that.Width*1.45
			that.bcgHeight=that.Width-20
			that.userInfo = store.state.userInfo
			if(that.userInfo.distributorStatus==1){
				that.distribInfo=store.state.distribInfo
			}
			that.config=store.state.config
			that.getErCode()
			// if(wx.getStorageSync('shareImage')){
			// 	that.shareImage=wx.getStorageSync('shareImage')
			// }
			// else{
			// 	that.getErCode()
			// }
			
		}
	}
</script>
<style scoped lang="less">
	img{
		width: 100%;
		height: 100%;
		display: block;
	}
	.btn{
			width: 290px;
			height: 49px;
			line-height: 49px;
			text-align: center;
			margin:  10px auto 0 auto;
			color: #fff;
			font-size: 16px;
			background-color: #fd4032;
			border-radius: 3px;
		}
</style>