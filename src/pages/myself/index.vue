<template>
	<div class="container">
		<!--提示弹窗-->
		<div class="popup" v-if="ispopup" @click="popup">
			<div class="img"><img src="/static/images/popup.png"/></div>			
		</div>
		<!--用户信息-->
		<div class="userinfo">
			<div class="img"><img :src="userInfo.face" /></div>
			<div class="name">{{userInfo.name}}</div>
			<div class="id">圈号: {{userInfo.memberId}}</div>
			<div class="vip" @click="toVip">
				<div class="vip-img" v-if="userInfo.lvId==24&&userInfo.distributorStatus==2"><img src="/static/images/VIP1.gif"/></div>
				<div class="vip-img" v-if="userInfo.lvId==25&&userInfo.distributorStatus==2"><img src="/static/images/VIP2.gif"/></div>
				<div class="vip-img" v-if="userInfo.lvId==26&&userInfo.distributorStatus==2"><img src="/static/images/VIP3.gif"/></div>	 			
				<div class="vip-img" v-if="distribInfo.lvId==18&&userInfo.distributorStatus==1"><img src="/static/images/share1.gif"/></div>
				<div class="vip-img" v-if="distribInfo.lvId==19&&userInfo.distributorStatus==1"><img src="/static/images/share2.gif"/></div>
				<div class="vip-img" v-if="distribInfo.lvId==20&&userInfo.distributorStatus==1"><img src="/static/images/share3.gif"/></div>	 			
				<div class="iconfont icon">&#xe625;</div> 
			</div> 
		</div>
		<div class="container-bottom">
			<!--list-->
			<div class="list">
				<div class="list-li1" @click="jump('../poster/main')">
					<div class="iconfont icon"> &#xe62d;</div>
					<div class="name">邀请</div>
				</div>
				<!-- <div class="list-li2" @click="listLi2">
					<div class="iconfont icon">&#xe629;</div>
					<div class="name">红包</div>
				</div> -->
				<div class="list-li4" @click="listLi4">
					<div class="iconfont icon">&#xe626;</div> 
					<div class="name">喜欢</div>
				</div>
				<div class="list-li5" @click="listLi5">
					<div class="iconfont icon">&#xe62b;</div>
					<div class="name">团队</div>
				</div>
			</div>
			<!--收支总览-->
			<div class="income"  @click="income">
				<div class="tit">
					<div class="tit-left">
						<span>收支总览</span>
						<span class="iconfont">&#xe623;</span>
					</div>
					<div class="tit-right">
						<span class="iconfont">&#xe625;</span>
					</div>
				</div>
				<!--积分-->
				<div class="integral">
					<div class="integral-left">
						<div class="num">
							<span>{{totalPoint}}</span>
							<span>累计积分</span>
						</div>
						<div class="num">
							<span>{{point}}</span>
							<span>可用积分</span>
						</div>
					</div>
					<!--xian-->
					<div class="xian"></div>
					<div class="integral-right">
						<div class="num">
							<span>{{total}}</span>
							<span>累计奖金</span>
						</div>
						<div class="num">
							<span>{{balance}}</span>
							<span>可提现奖金</span>
						</div>
					</div>
				</div>
			</div>
			<!--客服-->
			<div class="phone"  @click='makePhone'>
				<span>客服热线</span>
				<span class="iconfont">&#xe625; </span>
			</div>
			<!-- 底部技术支持 -->
			<div class="footer">
				<img src="https://shop.guqinet.com/html/images/shuiguo/index/footerImg.png"/>
			</div>
		</div>
	</div>
</template>

<script>
	import store from '@/store/store'
	import utils from '@/utils/index'
	export default {
		data() {
			return {
				ispopup:true,
				vip:1,
				userInfo:{},
				distribInfo:{}
			}
		},
		computed:{
			totalPoint(){
				let that=this
				return utils.accAdd(store.state.userInfo.point,store.state.userInfo.consumePoint)
			},
			consumePoint(){
				let that=this
				return store.state.userInfo.consumePoint
			},
			point(){
				let that=this
				return store.state.userInfo.point
			},
			total(){
				let that=this
				if(store.state.userInfo.distributorStatus==1){
					return store.state.distribInfo.total
				}
				else{
					return 0
				}				
			},
			balance(){
				let that=this
				if(store.state.userInfo.distributorStatus==1){
					return store.state.distribInfo.balance
				}
				else{
					return 0
				}				
			}
		},
		onShow(){
			let that=this
			console.log('执行了onShow')
			that.userInfo=store.state.userInfo
			if(that.userInfo.distributorStatus==1){
				that.distribInfo=store.state.distribInfo
			}
		},
		methods: {
			popup(){
				this.ispopup=false
			},
			makePhone(){
				let that=this
				wx.makePhoneCall({
					phoneNumber: '19179131875',
				})
			},
			listLi2() {
				wx.navigateTo({
					url: "../myself-red/main"
				})
			},
			listLi3() {
				wx.navigateTo({
					url: "../myself-order/main"
				})
			},
			listLi4() {
				wx.navigateTo({
					url: "../myself-like/main"
				})
			},
			listLi5() {
				wx.navigateTo({
					url: "../myself-team/main"
				})
			},
			income() {
				wx.navigateTo({
					url: "../myself-income/main"
				})
			},
			jump(url){
				let that=this
				if(url=='../poster/main'){
					if(that.userInfo.distributorStatus==2){
						wx.showModal({
							title: '提示',
							content: '您还不是分享师',
							confirmText:'立即成为',
							cancelText:'我再想想',
							success(res) {
								if (res.confirm) {
									wx.navigateTo({
										url:'../distribeApply/main'
									})
								} else if (res.cancel) {
									
								}
							}
						})
					}
					else{
						wx.navigateTo({
							url:url
						})
					}
				}
				
			},
			listLi4(){
				wx.navigateTo({
				   url:"../collection/main"
				})			
			},

			toVip(){
				wx.navigateTo({
				   url:"../myself-kt/main"
				})				
			}
		},
		onPullDownRefresh: function(){
   			let that=this
   			utils.updateUserInfo()
   			wx.stopPullDownRefresh()
   		},
	}
</script>

<style scoped lang="less">
/*提示弹窗*/
.popup{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.4);
	z-index: 99;
	.img{
		width: 180px;
		height: 153px;
		position: absolute;
		right: 25px;
	}
}
	.container {
		background: #f4f4f4;
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
	}
	
	.userinfo {
		width: 100%;
		height: 190px;
		background: linear-gradient(#ff8080, #ff6f6f);
		text-align: center;
		padding-top: 9px;
		.img {
			width: 60px;
			height: 60px;
			overflow: hidden;
			border-radius: 50%;
			margin: 0 auto;
			border: 1px solid #FFFFFF;
			overflow: hidden;
		}
		.name {
			font-size: 15px;
			color: #ffffff;
			padding: 10px 0 10px 0;
			font-weight: bold;
		}
		.id {
			font-size: 13px;
			color: #ffffff;
			padding-bottom: 12px;
		}
		.vip {
			width: 120px;
			height: 33px;
			background: rgba(255, 255, 255, .2);
			border: 1px solid #FFFFFF;
			text-align: center;
			margin: 0 auto;
			border-radius: 16.5px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.vip-img {
               	width: 61px;height: 23px; 
               	margin-left: 16px;
			}
			.icon{
				font-size: 12px;
				color: #ffe5e5;
				margin-right: 16px;
			}
		}
	}
	
	.container-bottom {
		width: 100%;
		box-sizing: border-box;
		padding: 0 12px;
		/*list*/
		.list {
			width: 100%;
			height: 88px;
			background: #FFFFFF;
			border-radius: 12px;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			position: relative;
			top: -12px;
			.list-li1,
			.list-li2,
			.list-li3,
			.list-li4,
			.list-li5 {
				width: 20%;
				text-align: center;
				padding: 17px 0;
				.icon {
					font-size: 20px;
				}
				.name {
					font-size: 14px;
					color: #333333;
					margin-top: 12PX;
				}
			}
			.list-li1,
			.list-li5 {
				color: #26acff;
			}
			.list-li2 {
				color: #ff2626;
			}
			.list-li3 {
				color: #ff6f26;
			}
			.list-li4 {
				color: #ff2655;
			}
		}
		.income {
			width: 100%;
			height: 140px;
			background: #FFFFFF;
			border-radius: 12px;
			.tit {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				align-items: center;
				padding: 20px 20px 0 20px;
				box-sizing: border-box;
				margin-bottom: 33px;
				.tit-left {
					span {
						&:nth-child(1) {
							font-size: 17px;
							color: #333333;
							font-weight: bold;
						}
						&:nth-child(2) {
							font-size: 12px;
							color: #999999;
							margin-left: 6px;
						}
					}
				}
				.tit-right {
					span {
						font-size: 12px;
						color: #dedede;
					}
				}
			}
			.integral {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				width: 100%;
				padding: 0 12px;
				box-sizing: border-box;
				position: relative;
				.integral-left,
				.integral-right {
					width: 50%;
					display: flex;
					align-items: center;
					.num {
						width: 46%;
						span {
							display: block;
							text-align: center;
							&:nth-child(1) {
								font-size: 18px;
								color: #333333;
								font-weight: bold;
							}
							&:nth-child(2) {
								font-size: 12px;
								color: #666666;
								margin-top: 4px;
							}
						}
					}
				}
				.integral-right {
					justify-content: flex-end;
				}
				.xian {
					width: 1px;
					height: 20px;
					background: #dedede;
					position: absolute;
					z-index: 9;
					left: 50%;
					top: 50%;
					margin-left: -0.5px;
					margin-top: -10px;
				}
			}
		}
		.phone {
			margin-top: 12px;
			width: 100%;
			height: 49px;
			display: flex;
			justify-content: space-between;
			padding: 0 20px;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 12px;
			span {
				display: block;
				line-height: 49px;
				&:nth-child(1) {
					font-size: 17px;
					color: #333333;
				}
				&:nth-child(2) {
					font-size: 24rpx;
					color: #dedede;
				}
			}
		}
	}
	.footer{height: 80rpx;padding: 20rpx 30rpx 10rpx 0; 
		img{
			width: 100%;
			height: 100%;
			display: block;
		}
	}
</style>