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
			<swiper-item style="overflow: scroll;">

			</swiper-item>
			<!--待付款-->
			<swiper-item style="overflow: scroll;">
				<div class="cates0" @click="jumpdetail">
					<div class="cate-list" v-for="(child,cindex) in childList0">
						<div class="top">
							<div class="img"><img :src="child.img" /></div>
							<div class="cant">
								<div class="name">{{child.name}}</div>
								<div class="add">
									<span>{{child.adds}}</span>
									<span>丨</span>
									<span>{{child.add}}</span>
								</div>
								<div class="pic">应付 : ¥{{child.pic}}</div>
								<div class="xdday">下单时间 : {{child.xdday}}</div>
							</div>
						</div>
						<div class="condition">
							<div class="condition-left">
								<span>{{child.condition}}</span>
								<span>{{child.conditionday}}</span>
							</div>
							<div class="condition-right">
								<span>取消</span>
								<span>立即付款</span>
							</div>
						</div>
					</div>
				</div>
			</swiper-item>
			<!--待使用-->
			<swiper-item style="overflow: scroll;">
				<div class="cates1">
					<div class="cate-list" v-for="(child,cindex) in childList1">
						<div class="top">
							<div class="img"><img :src="child.img" /></div>
							<div class="cant">
								<div class="name">{{child.name}}</div>
								<div class="add">
									<span>{{child.adds}}</span>
									<span>丨</span>
									<span>{{child.add}}</span>
								</div>
								<div class="pic">实付 : ¥{{child.pic}}</div>
								<div class="xdday">下单时间 : {{child.xdday}}</div>
							</div>
						</div>
						<div class="condition">
							<div class="condition-left">
								<span>{{child.condition}}</span>
								<span>{{child.conditionday}}</span>
							</div>
							<div class="condition-right">
								<!--<span>取消</span>-->
								<span>订单详情</span>
							</div>
						</div>
					</div>
				</div>
			</swiper-item>
			<!--已使用-->
			<swiper-item style="overflow: scroll;">
				<div class="cates2">
					<div class="cate-list" v-for="(child,cindex) in childList2">
						<div class="top">
							<div class="img"><img :src="child.img" /></div>
							<div class="cant">
								<div class="name">{{child.name}}</div>
								<div class="add">
									<span>{{child.adds}}</span>
									<span>丨</span>
									<span>{{child.add}}</span>
								</div>
								<div class="pic">实付 : ¥{{child.pic}}</div>
								<div class="xdday">下单时间 : {{child.xdday}}</div>
							</div>
						</div>
						<div class="condition">
							<div class="condition-left">
								<span>{{child.condition}}</span>
								<span>{{child.conditionday}}</span>
							</div>
							<div class="condition-right">
								<span>删除</span>
								<span>订单详情</span>
							</div>
						</div>
					</div>
				</div>
			</swiper-item>
			<!--已过期-->
			<swiper-item style="overflow: scroll;">
				<div class="cates3">
					<div class="cate-list" v-for="(child,cindex) in childList3">
						<div class="top">
							<div class="img"><img :src="child.img" /></div>
							<div class="cant">
								<div class="name">{{child.name}}</div>
								<div class="add">
									<span>{{child.adds}}</span>
									<span>丨</span>
									<span>{{child.add}}</span>
								</div>
								<div class="pic">实付 : ¥{{child.pic}}</div>
								<div class="xdday">下单时间 : {{child.xdday}}</div>
							</div>
						</div>
						<div class="condition">
							<div class="condition-left">
								<span>{{child.condition}}</span>
								<span>{{child.conditionday}}</span>
							</div>
							<div class="condition-right">
								<span>删除</span>
								<span>订单详情</span>
							</div>
						</div>
					</div>
				</div>
			</swiper-item>

		</swiper>

	</div>
</template>
<script>
import API from '@/api/order'
import store from '@/store/store'
	export default {
		data() {
			return {
				listcurr: 0,
				UserInfo:{},
				ListOrderData:[],
				recommendList: [{
						name: "全部",
						options:[],
						page: 1,
						limit: 10,
						flag:true,
					},
					{
						name: "待付款",
						options:[],
						page: 1,
						limit: 10,
						flag:true,
						status:0,
						expiredStatus:2
					},
					{
						name: "待使用",
						options:[],
						page: 1,
						limit: 10,
						flag:true,
						status:1,
						expiredStatus:2
					},
					{
						name: "已使用",
						options:[],
						page: 1,
						limit: 10,
						flag:true,
						status:2,
						expiredStatus:2
					},
					{
						name: "已过期",
						options:[],
						page: 1,
						limit: 10,
						flag:true,
						status:3,
						expiredStatus:1
					},
				],
				//待付款

				childList0: [{
					img: "/static/images/ku5p0efhhxr5.jpg",
					name: "这是28px大小平方字体并且做了加粗处理行间距是42px哦了加粗处理行间距是42px哦",
					adds: "青山湖区 ",
					add: "一二三四五六七八九十",
					pic: "39.9",
					xdday: "2019-03-22 12:55",
					condition: '待付款',
					conditionday: '00:29:59'

				}, ],
				// 待使用 

				childList1: [{
					img: "/static/images/ku5p0efhhxr5.jpg",
					name: "这是28px大小平方字体并且做了加粗处理行间距是42px哦了加粗处理行间距是42px哦",
					adds: "青山湖区 ",
					add: "一二三四五六七八九十",
					pic: "39.9",
					xdday: "2019-03-22 12:55",
					condition: '待使用',
					conditionday: '00:29:59'

				}, ],
				//					已使用

				childList2: [{
					img: "/static/images/ku5p0efhhxr5.jpg",
					name: "这是28px大小平方字体并且做了加粗处理行间距是42px哦了加粗处理行间距是42px哦",
					adds: "青山湖区 ",
					add: "一二三四五六七八九十",
					pic: "39.9",
					xdday: "2019-03-22 12:55",
					condition: '已使用',
					conditionday: '00:29:59'

				}, ],
				//					已过期

				childList3: [{
					img: "/static/images/ku5p0efhhxr5.jpg",
					name: "这是28px大小平方字体并且做了加粗处理行间距是42px哦了加粗处理行间距是42px哦",
					adds: "青山湖区 ",
					add: "一二三四五六七八九十",
					pic: "39.9",
					xdday: "2019-03-22 12:55",
					condition: '已过期',
					conditionday: '00:29:59'

				}, ],
			}
		},
		onLoad() {
			let that = this
			//重置
			that.listcurr = 0;
			that.UserInfo = store.state.userInfo;
			console.log("查看一下用户新潮",store.state.userInfo)
			that.GetOrderListData(Object.assign({},{unionId:that.UserInfo.unionid},{page: 1,limit: 10}),0)
		},
		methods: {
			listTab(e) {
				let that= this;
				this.listcurr = e
				let data = {
					unionId:that.UserInfo.unionId,
					page:that.recommendList[e].page,
					limit:that.recommendList[e].limit,
					status:that.recommendList[e].status,
					expiredStatus:that.recommendList[e].expiredStatus
				}
				if(that.recommendList[e].options.length < 1){
				    that.GetOrderListData(data,e)
				}
			},
			changeTab(e) {
				let that = this
				that.listcurr = e.mp.detail.current
			},
			jumpdetail() {
				wx.navigateTo({
					url: "../myself-order-detail/main"
				})
			},

			//请求数据
			GetOrderListData(data,index){
				let that = this;
					API.GetOrderList(data).then(res => {
						if(res.code == 0){
						   that.recommendList[index].options =that.recommendList[index].options.concat(res.orderList);
						}else{
						wx.showToast({title: '网络错误',icon: 'none',duration: 2000})							
						}
					}).catch(err => {
						wx.showToast({title: '网络错误',icon: 'none',duration: 2000})
					})
			},
		},
	}
</script>

<style scoped lang="less">
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
						border-radius: 16.5px;
						text-align: center;
						line-height: 33px;
						width: 64px;
						height: 32px;
						font-size: 14px;
						&:nth-child(1) {
							border: 1px solid #dedede;
							background: #FFFFFF;
							color: #333333;
							margin-right: 8px;
						}
						&:nth-child(2) {
							width: 90px;
							border: 1px solid #ff6e6e;
							background: #ff6e6e;
							color: #ffffff;
						}
					}
				}
			}
		}
	}
	
	.cates0 {
		.cate-list {
				.top{
					.cant{
						.pic{
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
						width: 90px;
						border: 1px solid #ff6e6e;
						background: #ff6e6e;
						color: #ffffff;
					}
				}
			}
		}
	}
	/*已使用  已完成*/
	.cates2,.cates3, {
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