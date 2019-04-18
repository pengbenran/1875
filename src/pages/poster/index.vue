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
	import {ShowToast } from '@/utils/Lib'
	export default{
		data(){
			return{
				painting:{},
				shareImage:'',
				userInfo:{},
				Width:'',
				Height:'',
				bcgHeight:''
			}
		},
		components:{
			canvasdrawer
		},
		methods:{
			async getErCode(){
				let that=this
				that.eventDraw('https://image.aiychbaby.cn/81e974c3-53a0-4f5a-a3e1-cb9be8dd765c.png','/static/images/174a31e3460026b13ff87f87ede8db9.png')
				// let params={}
				// params.params=that.userInfo.unionid
				// let QrcodeRes=await Api.get_Qrcode(params).catch(err => {
    //                  ShowToast('失败','none')
				// })
				// if(QrcodeRes.code==0){
					
				// }else{
    //                  ShowToast('失败','none')
				// }
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
			   			background:'#fd4032',
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
			   			url: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKmCBv37GHG8z7ichticReYicHbxzNJqOhxrD50DHx1icmZ1icbmtPuAgqpakPxQ63hBFCHlUuzGSsCnjQ/132',
			   			top: that.bcgHeight+25,
			   			left: (that.Width-that.bcgHeight)/2,
			   			width:60,
			   			height:60,
			   			borderRadius:30
			   		},
			   		{
			   			type: 'image',
			   			url: codeUrl,
			   			top: that.bcgHeight+5,
			   			left: that.Width-that.Height+that.bcgHeight+10,
			   			width: that.Height-that.bcgHeight-20,
			   			height: that.Height-that.bcgHeight-20
			   		},
			   		{
			   			type: 'text',
			   			content:that.userInfo.name,
			   			fontSize: 13,
			   			color: '#fff',
			   			textAlign: 'left',
			   			breakWord: true,
			   			top: that.bcgHeight+70,
			   			left:30,
			   			width:150,
			   			MaxLineNumber:2,
			   			isCenter:false
			   		}
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
	.businessCard{
		width: 100%;
		height:100vh;
		background-color: #fd4032;
	}
	.paintImg{
		width: 290px;
		height: 413px;
		background-color: #fff;
		margin: 0 auto;
	}
	img{
		width: 100%;
		height: 100%;
		display: block;
	}
	.btn{
			margin-top: 30px;
			width: 290px;
			height: 49px;
			line-height: 49px;
			text-align: center;
			margin:  30px auto 0 auto;
			color: #fff;
			font-size: 16px;
			background-color: #FF3D3A;
			border-radius: 3px;
		}
</style>