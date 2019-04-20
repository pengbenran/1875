<template>
	<div class="goodPoster">
		<div class="paintImg" v-if="paintOk">
			<div class="bcg" @click="closeClick"></div>
			<div class="img" :style="{width:Width+'px',height:Height+'px',left:Left+'px'}">
				<img :src="shareImage">
			</div>
		</div>
		<canvasdrawer :painting="painting"   @getImage="eventGetImage" ref="canvas"/>	
	</div>
</template>

<script>
	import canvasdrawer from './canvasdrawer'
	import Api from '@/api/member'
	import store from '@/store/store'
	export default {
		props: [''],
		data() {
			return {
				userInfo:{},
				Width:310,
				Height:500,
				painting:'',
				paintOk:false,
				shareImage:'',
				Left:''
			}
		},
		components: {
		  canvasdrawer,	
		},
		methods: {
			// 关闭模态框
			closeClick(){
				let that=this
				that.paintOk=false
				that.$emit('closePoster')
			},
			// 保存图片到本地
			saveImg(){
				let that=this
				wx.saveImageToPhotosAlbum({
					filePath: that.shareImage,
					success(res) {
						wx.showToast({
							title: '保存图片成功',
							icon: 'success',
							duration: 2000
						})
					}
				})
			},
			// 获取二维码
			getErCode(goodsId){
				let that=this
				that.Left=(wx.getSystemInfoSync().windowWidth-300)/2
				that.userInfo = store.state.userInfo	
				let params={}
				params.params=`${that.userInfo.unionid},${goodsId},1`
				Api.publicQRCode(params).then(function(QrcodeRes){
					if(QrcodeRes.code==0){
						that.eventDraw(QrcodeRes.quick,'/static/images/174a31e3460026b13ff87f87ede8db9.png')
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
		   	let ImgArr = []
		   	ImgArr[0]=bcgImg
		   	ImgArr[1]=codeUrl
		   	that.painting={
		   		width: that.Width,
		   		height: that.Height,
		   		clear: true,
		   		views: [
		   		{
		   			type:'rect',
		   			background:'#fff',
		   			top:0,
		   			left:0,
		   			width:that.Width,
		   			height:that.Height
		   		},
		   		{
		   			type: 'image',
		   			url: '/static/images/08769889a6a4e86f83c7f7079ad9d1c.png',
		   			top: 5,
		   			left: 105,
		   			width:100,
		   			height: 12.7
		   		},
		   		{
		   			type: 'image',
		   			url: bcgImg,
		   			top: 23,
		   			left: 10,
		   			width: 280,
		   			height: 280
		   		},
		   		{
		   			type: 'image',
		   			url: codeUrl,
		   			top: 390,
		   			left: 200,
		   			width: 90,
		   			height:90
		   		},
		   		{
		   			type: 'text',
		   			content:'这是28px大小的平方字体并且做了加粗处理行间距是42px',
		   			fontSize: 16,
		   			color: '#000',
		   			textAlign: 'left',
		   			breakWord: true,
		   			top: 315,
		   			left:10,
		   			width:280,
		   			MaxLineNumber:2,
		   			isCenter:false
			   	},
			   	{
		   			type: 'text',
		   			content:'青山湖区|八一广场店',
		   			fontSize: 14,
		   			color: '#A0A0A0',
		   			textAlign: 'left',
		   			breakWord: true,
		   			top: 365,
		   			left:10,
		   			width:245,
		   			MaxLineNumber:1,
		   			isCenter:false
			   	},
			   	{
			   		type: 'image',
			   		url: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKmCBv37GHG8z7ichticReYicHbxzNJqOhxrD50DHx1icmZ1icbmtPuAgqpakPxQ63hBFCHlUuzGSsCnjQ/132',
			   		top: 390,
			   		left: 10,
			   		width:60,
			   		height:60,
			   		borderRadius:30
			   	},
		   	    {
		   			type: 'text',
		   			content:'我的名字可以超级长的哦',
		   			fontSize: 13,
		   			color: '#000',
		   			textAlign: 'left',
		   			breakWord: true,
		   			top: 395,
		   			left:80,
		   			width:100,
		   			MaxLineNumber:2,
		   			isCenter:false
			   	},
			   	{
		   			type: 'text',
		   			content:'￥',
		   			fontSize: 12,
		   			color: '#FD370E',
		   			textAlign: 'left',
		   			breakWord: true,
		   			top: 470,
		   			left:10,
		   			MaxLineNumber:1,
		   			isCenter:false
			   	},
			   	{
		   			type: 'text',
		   			content:'299.99',
		   			fontSize:22,
		   			color: '#FD370E',
		   			textAlign: 'left',
		   			breakWord: true,
		   			top: 460,
		   			left:20,
		   			MaxLineNumber:1,
		   			isCenter:false
			   	},
			   	{
			   		type: 'image',
			   		url: '/static/images/7eaea8fa8a28ee2e1d70332195b7d6a.png',
			   		top: 460,
			   		left: 95,
			   		width:100,
			   		height:25,
			   	},
			   	 {
		   			type: 'text',
		   			content:'微信扫码购买',
		   			fontSize:14,
		   			color: '#fff',
		   			textAlign: 'left',
		   			breakWord: true,
		   			top: 463,
		   			left:100,
		   			MaxLineNumber:1,
		   			isCenter:false
			   	},
		   		]
		   	}
		   	this.$refs.canvas.readyPigment()
		   },
		    eventGetImage(event) {
		   	wx.hideLoading()
		   	let that=this
		   	const { tempFilePath, errMsg } = event
		   	if (errMsg === 'canvasdrawer:ok') {
		   		that.paintOk=true
		   		that.shareImage=tempFilePath
		   		that.$emit('paintOk',that.shareImage)
		    }
			},
		},
	}
</script>

<style scoped lang="less">
	.paintImg{
		position: fixed;
		top:0;
		left: 0;
		bottom:0;
		right: 0;
		z-index: 5;
		.bcg{
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.5);
		}		
		.img{
			overflow: hidden;
			z-index: 10;
			position: absolute;
			top: 50px;
		}
	}
</style>