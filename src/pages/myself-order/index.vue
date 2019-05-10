<template>
	<div class="container">
		<!--类目-->
		<div class="recommend-list">
			<div class="recommend-list-li" v-for="(item,index) in recommendList" @click="listTab(index)" :class="listcurr==index?'list-on':''">
				<div class="name">
					{{item.name}}
				</div>
			</div>
		</div>
		<swiper style="height:100vh" duration='350' :current="listcurr" @change="changeTab">
			<!--全部-->
			<blockquote v-for="(item,index) in recommendList" :key="item" :index='index'>
				<swiper-item style="overflow: scroll;">
					<div v-if="item.options.length!==0" class="cates0">
						<div class="cate-list" v-for="(child,cindex) in item.options">
							<div class="top"  @click="jumpdetail(child.orderId)">
								<div class="img"><img :src="child.goodThumbnail" /></div>
								<div class="cant">
									<div class="name">{{child.goodName}}</div>
									<div class="add">
										<span>{{child.address}}</span>
										<span>丨</span>
										<span>{{child.shopId}}</span>
									</div>
									<div class="pic" v-if="child.status == 0">应付 : ¥{{child.needPayMoney}}</div>
									<div class="pic" v-else style="color:#666666;">实付 : ¥{{child.paymoney}}</div>
									<div class="xdday">下单时间 : {{child.createTime}}</div>
								</div>
							</div>
							<div class="Warp">
								<div class="condition" v-if="child.status == 0">
									<div class="condition-left"><span>待付款</span></div>
									<div class="condition-right">
										<span @click="CloseOrder(child.orderId,index,cindex)">取消订单</span>
										<span class="BtnR" @click="Pay(child.orderId,child.needPayMoney)">立即付款</span>
									</div>
								</div>

								<div class="condition" v-if="child.status == 1">
									<div class="condition-left"><span>待使用</span></div>
									<div class="condition-right">
											<span @click="jumpdetail(child.orderId)">订单详情</span>
											<span @click="toIndex">回到首页</span>
										</div>
								</div>

								<div class="condition" v-if="child.status == 2">
									<div class="condition-left"><span>已使用</span></div>
									<div class="condition-right"><span @click="CloseOrder(child.orderId,index,cindex)">取消</span><span @click="jumpdetail(child.orderId)">订单详情</span></div>
								</div>

								<div class="condition" v-if="child.status == 3">
									<div class="condition-left"><span>已过期</span></div>
									<div class="condition-right"><span  @click="CloseOrder(child.orderId,index,cindex)">取消</span><span @click="toIndex">回到首页</span></div>

								</div>
							</div>
						</div>
					</div>

					<!--空-->
					<div v-if="item.options.length==0" class="kong">
						<div class="img"><img src="/static/images/kong.png" /></div>
						<div class="text">暂无订单，快去逛逛吧~</div>
					</div>

				</swiper-item>
			</blockquote>
		</swiper>
	</div>
</template>
<script>
	import API from '@/api/order'
	import store from '@/store/store'
	import utils from '@/utils/index'
	export default {
		data() {
			return {
				listcurr: 0,
				UserInfo: {},
				isSubmit: false,
				recommendList: [{
						name: "全部",
						options: [],
						page: 1,
						limit: 10,
						flag: true,
					},
					{
						name: "待付款",
						options: [],
						page: 1,
						limit: 10,
						flag: true,
						status: 0,
						expiredStatus: 2
					},
					{
						name: "待使用",
						options: [],
						page: 1,
						limit: 10,
						flag: true,
						status: 1,
						expiredStatus: 2
					},
					{
						name: "已使用",
						options: [],
						page: 1,
						limit: 10,
						flag: true,
						status: 2,
						expiredStatus: 2
					},
					{
						name: "已过期",
						options: [],
						page: 1,
						limit: 10,
						flag: true,
						status: 3,
						expiredStatus: 1
					},
				],
			}
		},
		mounted() {
			let that = this
			that.recommendList.map(Mres => {
				Mres.options = [];
				return Mres
			})
			//重置
			that.listcurr = 0;
			that.UserInfo = store.state.userInfo;
			that.GetOrderListData(Object.assign({}, {
				unionId: that.UserInfo.unionid
			}, {
				page: 1,
				limit: 10
			}), 0)
		},
		methods: {
			listTab(index){
				let that = this
				that.listcurr = index
			},
			changeTab(e) {
				let that = this
				that.listcurr = e.mp.detail.current
				let data = {
					unionId: that.UserInfo.unionid,
					page: that.recommendList[that.listcurr].page,
					limit: that.recommendList[that.listcurr].limit,
					status: that.recommendList[that.listcurr].status,
					expiredStatus: that.recommendList[that.listcurr].expiredStatus
				}
				that.GetOrderListData(data, that.listcurr)
				
			},
			jumpdetail(orderId) {
				wx.navigateTo({
					url: "../myself-order-detail/main?orderId=" + orderId
				})
			},

			//取消订单
			CloseOrder(orderId, Pindex, Cindex) {
				let that = this;
				API.DeleteOrder({
					orderId: orderId
				}).then(res => {
					if(res.code == 0) {
						console.log(orderId, Pindex, Cindex)
						that.recommendList[Pindex].options.splice(Cindex, 1)
						wx.showToast({
							title: '取消成功',
							icon: 'none',
							duration: 2000
						})
					} else {
						wx.showToast({
							title: '网络错误',
							icon: 'none',
							duration: 2000
						})
					}
				}).catch(err => {
					wx.showToast({
						title: '网络错误',
						icon: 'none',
						duration: 2000
					})
				})
			},

			//请求数据
			GetOrderListData(data, index) {
				let that = this;
				API.GetOrderList(data).then(res => {
					if(res.code == 0) {
						that.recommendList[index].options = that.recommendList[index].options.concat(res.orderList);
					} else {
						wx.showToast({
							title: '网络错误',
							icon: 'none',
							duration: 2000
						})
					}
				}).catch(err => {
					wx.showToast({
						title: '网络错误',
						icon: 'none',
						duration: 2000
					})
				})
			},

			//支付事件
			Pay(orderId,needPayMoney) {
				let that = this;
				if(!that.isSubmit) {
					that.isSubmit = true
					that.weixinPay(orderId,needPayMoney)
				}
			},

			weixinPay(orderId, needPayMoney) {
				let params = {}
				let that = this
				params.orderId = orderId
				params.openId = that.UserInfo.xopenid
				// params.total_fee = needPayMoney*100
				params.payAmount = 1
				API.prepay(params).then(function(parRes) {
					wx.requestPayment({
						timeStamp: parRes.Map.timeStamp,
						nonceStr: parRes.Map.nonceStr,
						package: parRes.Map.package,
						signType: parRes.Map.signType,
						paySign: parRes.Map.paySign,
						success: function(res) {
							wx.showToast({
								title: '支付成功',
								icon: 'success',
								duration: 2000
							})
							that.payOrder(orderId)
						},
						fail: function(res) {
							// fail
							wx.showToast({
								title: '支付失败',
								icon: 'success',
								duration: 2000
							})
						},
						complete: function(complete) {
							// complete   
							that.isSubmit = false
						}
					})
				})
			},

			async payOrder(orderId) {
				// 订单支付成功之后修改订单状态
				let that = this
				let statuParam = {}
				statuParam.orderId = orderId
				let payOrder = await API.payOrder(statuParam)
				if(payOrder.code == 0) {
					utils.updateUserInfo()
					wx.redirectTo({
						url: '../myself-order-detail/main?orderId=' + orderId
					})
				}
			},
			
			toIndex(){
				wx.switchTab({
					url: '../index/main', 
				})
			},
		},
	}
</script>

<style scoped lang="less">
	/*空*/	
	.kong {
		margin-top: 120px;
		line-height: 1;
		.img {
			width: 191px;
			height: 78px;
			margin: 0 auto;
		}
		.text {
			font-size: 17px;
			color: #333333;
			text-align: center;
			padding: 35px 0 30px;
		}
		.btn {
			width: 80px;
			height: 33px;
			border: 1px solid;
			border-radius: 17px;
			text-align: center;
			margin: 0 auto;
			color: #ff6e6e;
			font-size: 14px;
			font-weight: bold;
			line-height: 33px;
		}
	}
	
	.container {
		background: #F4F4F4;
	}
	/*类目*/
	
	.recommend-list {
		background: #FFFFFF;
		height: 49px;
		width: 100%;
		display: flex;
		justify-content: space-around;
		position: fixed;
		top: 0;
		z-index: 99;
		.recommend-list-li {
			height: 49px;
			line-height: 49px;
			position: relative;
			display: block;
			text-align: center;
			span {
				display: inline-block;
			}
			.name {
				transition: all 0.5s;
				font-size: 14px;
				color: #333333;
				display: inline-block;
				height: 30px;
				border-radius: 3px;
				padding: 0 2px;
				border-bottom: 6px solid transparent;
			}
		}
		.list-on {
			.name {
				transition: all 0.5s;
				border-bottom: 6px solid #ff6e6e;
				font-weight: bold;
			}
		}
	}
	/**/
	
	.cates0,
	.cates1,
	.cates2,
	.cates3 {
		padding: 49px 12px;
		box-sizing: border-box;
		width: 100%;
		.cate-list {
			background: #FFFFFF;
			border-radius: 12px;
			width: 100%;
			padding: 12px 12px 16px 12px;
			box-sizing: border-box;
			margin-top: 12px;
			.top {
				display: flex;
				width: 100%;
				.img {
					width: 60px;
					height: 60px;
					border-radius: 4px;
					overflow: hidden;
				}
				.cant {
					width: 216px;
					margin-left: 12px;
					overflow: hidden;
					.name {
						font-size: 15px;
						color: #333333;
						font-weight: bold;
						line-height: 21px;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					.add {
						font-size: 14px;
						color: #666666;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
						margin: 10px 0;
					}
					.pic {
						font-size: 14px;
						color: #666666;
						/*font-weight: bold;*/
					}
					.xdday {
						font-size: 14px;
						color: #666666;
						margin-top: 10px;
					}
				}
			}
			.condition {
				margin-top: 22px;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.condition-left {
					font-size: 15px;
					color: #ff6e6e;
					font-weight: bold;
					span {
						&:nth-child(2) {
							margin-left: 11px;
						}
					}
				}
				.condition-right {
					display: flex;
					span {
						display: block;
						border-radius: 20px;
						text-align: center;
						padding: 8px 15px;
						font-size: 14px;
							border: 1px solid #dedede;
							background: #FFFFFF;
							color: #333333;
							margin-right: 8px;
					}
					.BtnR {
							border: 1px solid #ff6e6e;
							background: #ff6e6e;
							color: #ffffff;
					}
				}
			}
		}
	}
	
	.cates0 {
		.cate-list {
			.top {
				.cant {
					.pic {
						color: #333333;
						font-weight: bold;
					}
				}
			}
		}
	}
	/*待付款*/
	
	.cates1 {
		.cate-list {
			.condition {
				.condition-right {
					span {
						border: 1px solid #ff6e6e;
						background: #ff6e6e;
						color: #ffffff;
					}
				}
			}
		}
	}
	/*已使用  已完成*/
	
	.cates2,
	.cates3,
	{
		.cate-list {
			.condition {
				.condition-right {
					span {
						&:nth-child(2) {
							background: #FFFFFF;
							border: 1px solid #dedede;
							color: #333333;
						}
					}
				}
			}
		}
	}
</style>