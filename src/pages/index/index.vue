<template>
	<div class="container">
		<!--搜索弹窗-->
		<search :istoggle='istoggle' :hide='hide'></search>
		<!--头部-->
		<div class="head">
			<div class="head-left">
				<span>南昌</span>
				<span class="iconfont">&#xe640;</span>
			</div>
			<div class="head-right">
				<div class="search"  @click="isshow">
					<span class="iconfont">&#xe6aa;</span>
					<span>搜索商品</span>
				</div>
				<div class="jia">
					<span class="iconfont">&#xe608;</span>
				</div>
			</div>
		</div>
		<!--baner-->
		<div class="box">
			<swiper class="swiper" @change="changeImg" :autoplay="true" :circular="true" current=0>
				<div v-for="(item, index) in imagesUrl">
					<swiper-item class="item">
						<img mode="aspectFill" :src="item.img" class="slide-image" />
					</swiper-item>
				</div>
			</swiper>
			<span class="item-num" v-if="showLength>1">{{activeIndex+1}}/{{imagesUrl.length}}</span>
			<span class="item-num" v-else>1/{{imagesUrl.length}}</span>
		</div>
		<!---->
		<div class="packet">
			<div class="packet-li" v-for="(item,index) in packet" @click="jumppacket(item.urls)">
				<img :src="item.img" />
				<span>{{item.name}}</span>
			</div>
		</div>
		<!--推荐-->
		<div class="recommend">
			<!--1级类目-->
			<div class="recommend-wp" id="toplist" :style="{display:isflex}">
				<div class="recommend-wp-li" v-for="(item,index) in recommendWp" @click="recTab(index)" :class="listcurrs==index?'recommend-on':''">
					<span class="img"><img :src="recommendIcon"/></span>
					<span class="name">{{item.name}}</span>
				</div>
			</div>
			<swiper style="height:100vh" duration='350' :current="listcurrs" @change="changeTabs">
				<!--精品-->
				<swiper-item>
					<div class="goods">
						<div class="goods-li" v-for="(item,index) in goods" @click="jumpgoods(item.urls)">
							<span class="img"><img :src="item.img"/></span>
							<span class="name">{{item.name}}</span>
						</div>

					</div>
				</swiper-item>
				<!--附近-->
				<swiper-item>
					<!--附近2级类目-->
					<div class="recommend-list">
						<div class="recommend-list-li" v-for="(item,index) in recommendList" @click="listTab(index)" :class="listcurr==index?'list-on':''">
							<span class="name">{{item.name}}</span>
							<span class="img"></span>
						</div>
					</div>
					<!--2级类目附近数据-->
					<swiper style="height:100vh;padding-bottom: 100px;" duration='350' :current="listcurr" @change="changeTab">
						<swiper-item style="overflow: scroll;">
							<!--不能删，空swiper判断index为0转到大swiper第一个页面-->
						</swiper-item>
						<!--1-->
						<swiper-item>
							<scroll-view :scroll-y='scrolls' style="height: 100vh;">
								<recNearby :recNearby="recNearby"></recNearby>
							</scroll-view>
						</swiper-item>
						<!--2-->
						<swiper-item>
							<scroll-view :scroll-y='scrolls' style="height: 100vh;">
								<recNearby :recNearby="recNearby"></recNearby>
							</scroll-view>
						</swiper-item>
						<swiper-item>
							<scroll-view :scroll-y='scrolls' style="height: 100vh;">
								<recNearby :recNearby="recNearby"></recNearby>
							</scroll-view>
						</swiper-item>
						<swiper-item>
							<scroll-view :scroll-y='scrolls' style="height: 100vh;">
								<recNearby :recNearby="recNearby"></recNearby>
							</scroll-view>
						</swiper-item>
						<swiper-item>
							<scroll-view :scroll-y='scrolls' style="height: 100vh;">
								<recNearby :recNearby="recNearby"></recNearby>
							</scroll-view>
						</swiper-item>
					</swiper>
				</swiper-item>
			</swiper>
		</div>
	</div>
</template>

<script>
	import recNearby from '@/components/recNearby'
	import search from '@/components/search'
	export default {
		data() {
			return {
				istoggle: false,
				scrolls: false,
				scrollTop: '',
				idtop: '',
				listcurr: 0,
				listcurrs: 0,
				activeIndex: 0,
				recommendIcon: "/static/images/recommendIcon.gif",
				goods: [{
						name: "今日爆品",
						img: "/static/images/list.jpg",
						urls: "../index-hot/main"
					},
					{
						name: "最新好物",
						img: "/static/images/list.jpg",
						urls: "../index-news/main"
					},
					{
						name: "特别划算",
						img: "/static/images/list.jpg",
						urls: "../index-profit/main"
					},
				],
				recommendWp: [{
						name: "精品推荐"
					},
					{
						name: "附近"
					},

				],
				recommendList: [{
						name: "" //不能删，空name判断index为0转到大name第一个页面
					},
					{
						name: "吃喝"
					},
					{
						name: "玩乐"
					},
					{
						name: "丽人"
					},
					{
						name: "亲子"
					},
					{
						name: "其他"
					}
				],
				imagesUrl: [{
						img: "/static/images/banner.jpg"
					},
					{
						img: "/static/images/banner.jpg"
					},
					{
						img: "/static/images/banner.jpg"
					}
				],
				packet: [{
						img: "/static/images/index-btn-a.gif",
						name: '签到红包',
						urls: '../index-redpacket/main'
					},
					{
						img: "/static/images/index-btn-b.gif",
						name: '一分钱抢',
						urls: '../index-redpacket/main'
					},
					{
						img: "/static/images/index-btn-c.gif",
						name: '商家合作',
						urls: '../index-redpacket/main'
					}
				],
				recNearby: [{
						img: "/static/images/banner.jpg",
						tit: '这是28px大小平方字体并且做了加粗处理行间距是字体大小的1.5倍#33...',
						address: "秦山湖区",
						addre: "一二三四五六七八九十",
						distance: "690m",
						pic: 29,
						pice: 99,

					},
					{
						img: "/static/images/banner.jpg",
						tit: '这是28px大小平方字体并且做了加粗处理行间距是字体大小的1.5倍#33...',
						address: "东湖区",
						addre: "洪城数码广场",
						distance: "690m",
						pic: 29,
						pice: 99,
					},
					{
						img: "/static/images/banner.jpg",
						tit: '这是28px大小平方字体并且做了加粗处理行间距是字体大小的1.5倍#33...',
						address: "东湖区",
						addre: "洪城数码广场",
						distance: "690m",
						pic: 29,
						pice: 99,
					},
					{
						img: "/static/images/banner.jpg",
						tit: '这是28px大小平方字体并且做了加粗处理行间距是字体大小的1.5倍#33...',
						address: "东湖区",
						addre: "洪城数码广场",
						distance: "690m",
						pic: 29,
						pice: 99,
					},
					{
						img: "/static/images/banner.jpg",
						tit: '这是28px大小平方字体并且做了加粗处理行间距是字体大小的1.5倍#33...',
						address: "东湖区",
						addre: "洪城数码广场",
						distance: "690m",
						pic: 29,
						pice: 99,
					},
					{
						img: "/static/images/banner.jpg",
						tit: '这是28px大小平方字体并且做了加粗处理行间距是字体大小的1.5倍#33...',
						address: "东湖区",
						addre: "洪城数码广场",
						distance: "690m",
						pic: 29,
						pice: 99,
					},
					{
						img: "/static/images/banner.jpg",
						tit: '这是28px大小平方字体并且做了加粗处理行间距是字体大小的1.5倍#33...',
						address: "东湖区",
						addre: "洪城数码广场",
						distance: "690m",
						pic: 29,
						pice: 99,
					}
				],
			}
		},
		//监听滚动条
		onPageScroll(e) {
			let that = this;
			that.scrollTop = e.scrollTop;
			if(that.scrollTop > that.idtop) {
				that.scrolls = true
			} else {
				that.scrolls = false
			}
		},
		components: {
			recNearby,
			search,
		},
		computed: {
			showLength() {
				return this.imagesUrl.length
			},

		},
		onLoad() {
			let that = this;
			that.listtop();
		},
		methods: {
			hide() {
				this.istoggle = false
				console.log(this.istoggle)
			},
			isshow() {
				this.istoggle = true
				console.log(this.istoggle)
			},
			changeImg(e) {
				let that = this
				that.activeIndex = e.target.current
			},

			listTab(e) {
				this.listcurr = e
			},
			changeTab(e) {
				this.listcurr = e.mp.detail.current
				if(this.listcurr == 0) {
					this.listcurrs = 0
				}

			},
			//
			recTab(e) {
				let that = this;
				that.listcurrs = e;
			},
			changeTabs(e) {
				this.listcurrs = e.mp.detail.current
				this.listcurr = 1
			},
			//获取节点距离顶部
			listtop() {
				let that = this
				const query = wx.createSelectorQuery()
				query.select('#toplist').boundingClientRect()
				query.selectViewport().scrollOffset()
				query.exec(function(res) {
					that.idtop = res[0].top + 72
				})
			},
			jumpgoods(urls) {
				wx.navigateTo({
					url: urls
				})
			},
			jumppacket(urls) {
				wx.navigateTo({
					url: urls
				})
			}
		},
	}
</script>

<style scoped lang="less">
	/*banner*/
	
	.detail {
		padding-top: 88px;
	}
	
	.swiper {
		height: 150px;
		width: 351px;
		margin: 12px auto 0 auto;
		border-radius: 12px;
		overflow: hidden;
	}
	
	.item {
		width: 100%;
		height: 100%;
	}
	
	img {
		width: 100%;
		height: 100%;
		display: block;
	}
	
	.box {
		position: relative;
	}
	
	.item-num {
		z-index: 9;
		position: absolute;
		bottom: 16rpx;
		right: 40rpx;
		background: rgba(0, 0, 0, 0.7);
		height: 50rpx;
		line-height: 50rpx;
		width: 50rpx;
		border-radius: 50%;
		font-size: 20rpx;
		color: #FFFFFF;
		text-align: center;
	}
	/*banner结束*/
	
	.container {
		width: 100%;
		/*头部
		 */
		.head {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-flow: nowrap;
			width: 100%;
			background-color: #FFFFFF;
			padding: 0 20px;
			height: 49px;
			box-sizing: border-box;
			.head-left {
				span {
					color: #333333;
					font-size: 15px;
				}
			}
			.head-right {
				display: flex;
				align-items: center;
				.search {
					width: 241px;
					/*background: #ff9999;*/
					box-shadow: 0 0 10px #F4F4F4;
					line-height: 33px;
					height: 33px;
					border-radius: 16.5px;
					margin-right: 19px;
					display: flex;
					span {
						display: block;
						color: #999999;
						font-size: 14px;
						&:nth-child(1) {
							padding: 0 10px;
							font-size: 20px;
							color: #333333;
						}
					}
				}
				.jia {
					span {
						color: #333333;
						font-size: 20px;
					}
				}
			}
		}
		/**/
		.packet {
			width: 100%;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 4px;
			margin-top: 12px;
			margin-bottom: 17px;
			.packet-li {
				position: relative;
				width: 105px;
				height: 75px;
				img {
					display: block;
					width: 100%;
					height: 100%;
				}
				span {
					display: block;
					position: absolute;
					top: 15px;
					left: 15px;
					font-size: 15px;
					color: #ffffff;
					font-weight: bold;
				}
			}
		}
		/*推荐*/
		.recommend {
			.recommend-wp {
				transition: all 1s;
				background: #FFFFFF;
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 54px;
				border-top: 1px solid #f4f4f4;
				.recommend-wp-li {
					position: relative;
					text-align: center;
					&:nth-child(1) {
						margin-left: 80px;
					}
					&:nth-last-child(1) {
						margin-right: 80px;
					}
					span {
						display: inline-block;
					}
					.img {
						width: 20px;
						height: 20px;
						vertical-align: middle;
						position: absolute;
						left: -24px;
						top: 5px;
						opacity: 0;
						transition: all .5s;
					}
					.name {
						font-size: 15px;
						color: #999999;
						font-weight: bold;
					}
				}
				.recommend-on {
					.name {
						color: #333333;
					}
					.img {
						transition: all .5s;
						opacity: 1;
					}
				}
			}
			.ontop {
				position: fixed;
				top: 0;
				z-index: 99;
			}
		}
		.recommend-list {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 35px;
			flex-wrap: wrap;
			width: 100%;
			.recommend-list-li {
				position: relative;
				text-align: center;
				&:nth-child(1) {
					visibility: hidden;
				}
				&:nth-child(2) {
					margin-left: 10px;
				}
				&:nth-last-child(1) {
					margin-right: 45px;
				}
				span {
					display: inline-block;
				}
				.img {
					width: 37px;
					height: 8px;
					background: #ff6e6e;
					border-radius: 4px;
					opacity: 0;
					transition: all .5s;
					position: absolute;
					bottom: -1px;
					left: -3px;
					z-index: -99;
				}
				.name {
					font-size: 14px;
					color: #333333;
				}
			}
			.list-on {
				.name {
					font-size: 16px;
					font-weight: bold;
				}
				.img {
					transition: all .5s;
					opacity: 1;
				}
			}
		}
		.onlisttop {
			position: fixed;
			top: 54px;
			z-index: 99;
			background: #FFFFFF;
		}
		/*精品*/
		.goods {
			width: 100%;
			padding: 12px;
			box-sizing: border-box;
			overflow: hidden;
			.goods-li {
				position: relative;
				width: 213px;
				height: 110px;
				border-radius: 4px;
				overflow: hidden;
				&:nth-child(1) {
					float: left;
					width: 133px;
					height: 225px;
				}
				&:nth-child(2) {
					float: right;
				}
				&:nth-child(3) {
					margin-top: 5px;
					float: right;
				}
				.name {
					display: block;
					position: absolute;
					left: 12px;
					top: 12px;
					z-index: 9;
					color: #333333;
					font-size: 15px;
					font-weight: bold;
				}
			}
		}
	}
</style>