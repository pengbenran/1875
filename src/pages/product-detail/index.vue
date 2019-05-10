<template>
	<div class="container">
		<blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>
		<!--baner-->
		<div class="box">
			<swiper class="swiper" @change="changeImg" :autoplay="true" :circular="true" :current="activeIndex">
				<div v-for="(item, index) in good.banner">
					<swiper-item class="item">
						<img mode="aspectFill" :src="item" class="slide-image" />
					</swiper-item>
				</div>
			</swiper>
			<!--圆点-->
			<div class="dot">
				<div class="dot-li" :class="index==activeIndex?'dot-li-on':''" v-for="(item, index) in imagesUrl" @click="dot(index)"> </div>
			</div>
			<div class="total">
				<!--喜欢 -->
				<div class="like" @click="tootle">
					<div class="img" v-if="good.isFavorite == 1"><img src="/static/images/love1.png" /></div>
					<div class="img" v-else><img src="/static/images/love.png" /></div>
					<div class="num">{{good.favorites}}</div>
				</div>
				<!--转发-->
				<div class="tra" @click="drawPoster">
					<div class="img iconfont">&#xe624;</div>
				</div>
				<!--电话-->
				<div class="phone" @click="makePhone">
					<div class="img iconfont">&#xe7e0;</div>
				</div>
				<!--地址-->
				<div class="site" @click="openMap">
					<div class="img iconfont">&#xe62c;</div>
				</div>
				<div class="site siteNum">
					<div class="img iconfont">{{activeIndex+1}}/{{good.banner.length}}</div>
				</div>
			</div>

		</div>
		<!--详情-->
		<div class="list">
			<div class="name">{{good.goodName}}</div>
			<div class="add" @click="openMap">
				<p>{{good.shopName}}</p>
				<p> 丨 </p>
				<p>{{good.address}}</p>
			</div>
			<div class="pic">
				<p><span class="rmb">¥</span><span>{{good.price}}</span></p>
				<p>分享可得{{good.shareIntegral}}积分</p>
				<p v-if="userInfo.distributorStatus==1">分享可得奖金:{{good.commission}}元</p>
			</div>
			<div class="oldpic">
				<p>¥{{good.showPrice}}</p>
				<p>{{good.showSales}}人购买</p>
			</div>
		</div>

		<!--商品详情-->
		<div class="list-detail">
			<div class="tit">
				<span>商品详情</span>
				<span></span>
			</div>
			<div class="list-detail-li">
				<wxParse :content="good.content" @preview="preview" @navigate="navigate" />
			</div>
		</div>
		<!-- 保存图片分享好友 -->
		<div class="footer" v-if="isPoster">
			<div class="saveImg" @click="eventSave">保存图片</div>
			<div class="shareFriend">分享好友</div>
		</div>
		<!--底部-->
		<div class="footer" v-else>
			<div @click="jumphome" class="home"><span><img src="/static/images/homeselect.png"/></span><span>首页</span></div>
			<div class="rec" @click="drawPoster">推荐分享</div>
			<span class="buy" @click="openModel">立即购买</span>
		</div>
		</blockquote>
		<!-- 分享海报 -->
		<goodPoster ref="goodPoster" @closePoster='closePoster' @paintOk='paintOk' :goodDetail='good'></goodPoster>

		<!--购买弹窗-->
		<goodDetailModel ref="goodModel"></goodDetailModel>
		<loginModel ref="loginModel" @GetGoodsInfo='GetGoodsInfo'></loginModel>
	</div>
</template>

<script>
    import store from '@/store/store'
    import API from '@/api/good'
    import goodDetailModel from '@/components/goodDetailModel'
    import wxParse from 'mpvue-wxparse'
    import goodPoster from '@/components/goodPoster'
    import loginModel from "@/components/loginModel"
    import Api from "@/api/home"
    import loading from '@/components/loading'
	export default {
		data() {
			return {
				isLoading:false,
				love: true,
				curr: 0,
				activeIndex: 0,
				userInfo: {},
				good: {},
				isPoster: false,
				goodId: '',
				shareImg: ''
			}
		},
		mounted(){
			let that=this
			that.$refs.goodModel.hideModel()
			that.goodId = that.$root.$mp.query.goodsId;
			that.$refs.goodPoster.closeClick()
			if(that.$root.$mp.query.codeUnionid != '') {
				that.getUserInfo()
				that.getConfig()
			}
			else{
				that.userInfo = store.state.userInfo
				that.GetGoodsInfo()
			}

		},
		components: {
			goodDetailModel,
			wxParse,
			goodPoster,
			loginModel,
			loading
		},
		methods: {
			// 获取会员信息
			async getUserInfo() {
				let that = this
				store.commit("storecodeUnionid", that.$root.$mp.query.codeUnionid)
				store.commit("storegoodsid", that.$root.$mp.query.goodsId)
				await that.$refs.loginModel.userLogin()
			},
			drawPoster() {
				let that = this
				that.$refs.goodPoster.getErCode(that.good.goodId)
			},
			// 保存图片
			eventSave() {
				let that = this
				wx.saveImageToPhotosAlbum({
					filePath: that.shareImg,
					success(res) {
						wx.showToast({
							title: '保存图片成功',
							icon: 'success',
							duration: 2000
						})
					}
				})
			},
			// 绘制好了触发事件
			paintOk(shareImg) {
				let that = this
				that.isPoster = true
				that.shareImg = shareImg
			},
			closePoster() {
				let that = this
				that.isPoster = false
			},
			changeImg(e) {
				let that = this
				that.activeIndex = e.target.current
			},
			//小点
			dot(e) {
				let that = this
				that.activeIndex = e
			},
			//点击收藏指定商品
			tootle() {
				let that = this
				if(that.good.isFavorite == 1) {
					that.DeletePostCollectionShop();
				} else {
					that.PostCollectionShop();
				}

			},
			jumphome() {
				mpvue.reLaunch({
					url: '../index/main'
				})
			},
			// 打开立即购买模态框
			openModel() {
				let that = this
				that.$refs.goodModel.openModel()
			},
			// 打开地图导航
			openMap() {
				let that = this
				let latitude = that.good.latitude * 1
				let longitude = that.good.longitude * 1
				wx.openLocation({
					latitude,
					longitude,
					scale: 18
				})
			},
			// 拨打电话
			makePhone() {
				let that = this
				wx.makePhoneCall({
					phoneNumber: that.good.phone,
				})
			},
			// 获取全局配置
			getConfig(){
				Api.getConfig().then(function(res){
					if(res.code==0){
						store.commit("storeConfig",res.globalConfigEntity)
					}
				})
			},
			//获取商品详情
			GetGoodsInfo() {
				let that = this;
				let data = {
					goodId: that.goodId,
					memberId: store.state.userInfo.memberId,
				};
				API.GetGoodDetail(data).then(res => {
					if(res.code==0){
						res.good.banner=res.good.images.split(',')
						that.good=res.good
						store.commit("storeGoodDetail",that.good)
						that.isLoading=true
					}
					else{
					wx.showToast({
						title:'网络错误',
						icon:"none",
						duration:1500
					})
					}
				}).catch(err => {
					wx.showToast({
						title: '网络错误',
						icon: "none",
						duration: 1500
					})
				})
			},

			//点击收藏指定商品
			PostCollectionShop() {
				let that = this
				let data = {
					memberId: store.state.userInfo.memberId,
					goodId: this.goodId
				}
				API.CollectionShop(data).then(res => {
					if(res.code == 0) {
						that.good.favorites += 1
						that.good.isFavorite = 1
						wx.showToast({
							title: '成功',
							icon: "success",
							duration: 1500
						})
					} else {
						wx.showToast({
							title: '网络错误',
							icon: "none",
							duration: 1500
						})
					}
				}).catch(err => {
					wx.showToast({
						title: '网络错误',
						icon: "none",
						duration: 1500
					})
				})
			},

			//点击取消收藏
			DeletePostCollectionShop() {
				let that = this
				let data = {
					memberId: store.state.userInfo.memberId,
					goodId: this.goodId
				}
				API.DeleteCollectionShop(data).then(res => {
					if(res.code == 0) {
						console.log("获取商品的信息：", that.good)
						that.good.favorites -= 1
						that.good.isFavorite = 2
						// that.good
						wx.showToast({
							title: '成功',
							icon: "success",
							duration: 1500
						})
					} else {
						wx.showToast({
							title: '网络错误',
							icon: "none",
							duration: 1500
						})
					}
				}).catch(err => {
					wx.showToast({
						title: '网络错误',
						icon: "none",
						duration: 1500
					})
				})
			},
		},
		onUnload(){
			let that=this
			that.isLoading=false
			that.love= true
			that.curr= 0
			that.activeIndex= 0
			that.good={}
			that.isPoster=false
			that.goodId=''
			that.shareImg=''
		},
	}
</script>

<style scoped lang="less">
	@import url("~mpvue-wxparse/src/wxParse.css");
	.box {
		position: relative;
		.swiper {
			width: 100%;
			height: 375px;
		}
		.dot {
			display: flex;
			width: 46px;
			height: 10px;
			justify-content: space-between;
			position: absolute;
			right: 12px;
			bottom: 12px;
			z-index: 9;
			.dot-li {
				width: 10px;
				height: 10px;
				border-radius: 50%;
				background: rgba(255, 255, 255, .4);
			}
			.dot-li-on {
				background: #FFFFFF;
			}
		}
		.total {
			position: absolute;
			left: 0;
			bottom: 11px;
			display: flex;
			align-items: center;
			padding-left: 12px;
			box-sizing: border-box;
			text-align: center;
			color: #FFFFFF;
			.like,
			.tra,
			.phone,
			.site {
				width: 38px;
				height: 38px;
				background: rgba(0, 0, 0, .3);
				border-radius: 50%;
			}
			
			.tra {
				margin-left: 26px;
				.img {
					width: 100%;
					height: 100%;
					font-size: 16px;
					text-align: center;
					line-height: 38px;
					color: #FFFFFF;
				}
			}
			.phone {
				margin-left: 60px;
				.img {
					width: 100%;
					height: 100%;
					font-size: 22px;
					text-align: center;
					line-height: 38px;
					color: #FFFFFF;
				}
			}
			.site {
				margin-left: 26px;
				.img {
					width: 100%;
					height: 100%;
					font-size: 18px;
					text-align: center;
					line-height: 38px;
					color: #FFFFFF;
				}
			}
			.like,
			.tra {
				position: relative;
				.num {
					position: absolute;
					top: -8px;
					left: 17px;
					width: 44px;
					height: 16px;
					background: #ff6666;
					text-align: center;
					line-height: 16px;
					color: #FFFFFF;
					font-size: 10px;
					border-radius: 8px;
				}
			}
			.like { 
					vertical-align: middle;
				.img {
					width: 20px;
					height: 17px;
					margin: 12px auto; 
				}
			}
			.siteNum .iconfont{font-size: 14px;}
		}
	}
	
	.list {
		padding: 0 12px;
		box-sizing: border-box;
		width: 100%;
		.name {
			font-size: 20px;
			color: #333333;
			line-height: 30px;
			font-weight: bold;
			margin-top: 8px;
		}
		.add {
			line-height: 1;
			p {
				font-size: 14px;
				color: #666666;
				padding: 12px 0;
				display: inline-block;
			}
		}
		.pic {
			display: flex;
			align-items: center;
			p {
				&:nth-child(1) {
					font-size: 22px;
					color: #ff4b27;
					font-weight: bold;
					.rmb {
						font-size: 13px;
					}
				}
				&:nth-child(2) {
					padding: 0 5px;
					height: 16px;
					background: #ff6666;
					text-align: center;
					line-height: 16px;
					color: #FFFFFF;
					border-radius: 2px;
					font-size: 12px;
					margin-left: 12px;
					box-sizing: border-box;
				}
				&:nth-child(3) {
					margin-left: 12px;
					font-size: 12px;
					padding: 0 5px;
					height: 16px;
					background: #21a9fd;
					text-align: center;
					line-height: 16px;
					color: #FFFFFF;
					border-radius: 2px;
					box-sizing: border-box;
				}
			}
		}
		.oldpic {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 6px;
			p {
				&:nth-child(1) {
					color: #999999;
					font-size: 14px;
					text-decoration: line-through;
				}
				&:nth-child(2) {
					font-size: 14px;
					color: #666666;
				}
			}
		}
	}
	
	.list-detail {
		padding: 0 12px 80px 12px;
		box-sizing: border-box;
		width: 100%;
		.tit {
			margin-top: 34px;
			margin-bottom: 16px;
			position: relative;
			span {
				&:nth-child(1) {
					color: #333333;
					font-size: 17px;
					font-weight: bold;
				}
				&:nth-child(2) {
					width: 60px;
					height: 8px;
					background: #ff6666;
					position: absolute;
					left: 0;
					bottom: -1px;
					z-index: -1;
					border-radius: 3px;
				}
			}
		}
		.img {
			border-radius: 4px;
			overflow: hidden;
			width: 100%;
		}
	}
	/*底部*/
	
	.footer{
		display: flex;
		align-items: center;
		width: 100%;
		height: 57px;
		position: fixed;
		bottom: 0;
		z-index: 88;
		.saveImg {
			width: 50%;
			background: #ff9999;
			line-height: 57px;
			text-align: center;
			color: #ffffff;
			font-size: 17px;
			font-weight: bold;
		}
		.shareFriend {
			width: 50%;
			background: #ff6666;
			line-height: 57px;
			text-align: center;
			color: #ffffff;
			font-size: 17px;
			font-weight: bold;
		}
		.home {
			width: 58px;
			height: 100%;
			line-height: 1;
			background: #fff2f2;
			span {
				display: block;
				margin: 0 auto;
				text-align: center;
				&:nth-child(1) {
					width: 20px;
					height: 20px;
					margin-top: 11px;
				}
				&:nth-child(2) {
					font-size: 10px;
					color: #FF6666;
					margin-top: 6px;
				}
			}
		}
		.rec {
			width: 130px;
			background: #ff9999;
			line-height: 57px;
			text-align: center;
			color: #ffffff;
			font-size: 17px;
			font-weight: bold;
		}
		.buy {
			flex-grow: 1;
			background: #ff6666;
			line-height: 57px;
			text-align: center;
			color: #ffffff;
			font-size: 17px;
			font-weight: bold;
		}
	}
</style>