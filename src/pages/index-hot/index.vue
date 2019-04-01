<template>
	<div class="container">
		<div class="hot-list">
			<div class="recommend-list-li" v-for="(item,index) in hotList" @click="listTab(index)" :class="listcurr==index?'list-on':''">
				<span class="name">{{item.name}}</span>
			</div>
		</div>
		<swiper style="height:100vh" duration='350' :current="listcurr" @change="changeTab">
			<!--热卖-->
			<swiper-item style="overflow: scroll;">
				<div class="cates">
					<div class="cate" v-for="(item,index) in cate">
						<div class="img"><img :src="item.img" /></div>
						<div class="cate-name">{{item.cateName}}</div>
						<recNearby :recNearby="item.list"></recNearby>
						<div @tap="jumpgoodslist(index)" class="more">{{item.more}} > </div>
					</div>
				</div>
			</swiper-item>
			<!--人气-->
			<swiper-item style="overflow: scroll;">
				<!--catchtouchmove="stopSwiper"-->
				<div class="popularity-wp">
					<div class="bg-img"><img :src="bgImg.img" /></div>
					<div class="tit">帮您挑选人气爆品</div>
					<div class="banner">
						<swiper autoplay="true" circular="true" display-multiple-items='1' previous-margin='10px' next-margin='10px'>
							<div v-for="(item, index) in imagesUrl">
								<swiper-item class='item'>
									<img mode="aspectFill" :src="item.img" class="slide-image" />
								</swiper-item>
							</div>
						</swiper>
					</div>
				</div>
				<div class="popularity-li">
					<recNearby :recNearby="popularity"></recNearby>
				</div>
			</swiper-item>
		</swiper>
	</div>
</template>

<script>
	import recNearby from '@/components/recNearby'
	export default {
		data() {
			return {
				bg: "red",
				listcurr: 0,
				bgImg: {
					img: "/static/images/hotbg.gif"
				},
				hotList: [{
						name: "热卖"
					},
					{
						name: "人气"
					},
				],
				imagesUrl: [{
						img: "/static/images/list.jpg"
					},
					{
						img: "/static/images/list.jpg"
					},
					{
						img: "/static/images/list.jpg"
					}
				],
				cate: [{
						cateName: '美食大咖',
						listbg: "#f91c1f",
						img: "/static/images/hot1bg.jpg",
						more: "查看更多美食",
						titbg: '#ff5703',
						detailImg: "/static/images/detailImg1.png",
						list: [{
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
							}
						]
					},
					{
						cateName: '高端玩家',
						listbg: "#623af9",
						titbg: '#af03ff',
						img: "/static/images/hot1bg.jpg",
						more: "查看更多玩乐  ",
						detailImg: "/static/images/detailImg2.png",
						list: [{
							img: "/static/images/banner.jpg",
							tit: '这是28px大小平方字体并且做了加粗处理行间距是字体大小的1.5倍#33...',
							address: "东湖区",
							addre: "洪城数码广场",
							distance: "690m",
							pic: 29,
							pice: 99,
						}, ],
					},
					{
						cateName: '女神范儿',
						listbg: "#fe7358",
						titbg: '#ffa05a',
						img: "/static/images/hot1bg.jpg",
						more: "查看更多丽人  ",
						detailImg: "/static/images/detailImg3.png",
						list: [{
							img: "/static/images/banner.jpg",
							tit: '这是28px大小平方字体并且做了加粗处理行间距是字体大小的1.5倍#33...',
							address: "东湖区",
							addre: "洪城数码广场",
							distance: "690m",
							pic: 29,
							pice: 99,
						}, ],
					},
					{
						cateName: '亲亲宝贝',
						listbg: "#a3bdff",
						detailImg: "/static/images/detailImg4.png",
						titbg: '#5985ff',
						img: "/static/images/hot1bg.jpg",
						more: "查看更多亲子  ",
						list: [{
							img: "/static/images/banner.jpg",
							tit: '这是28px大小平方字体并且做了加粗处理行间距是字体大小的1.5倍#33...',
							address: "东湖区",
							addre: "洪城数码广场",
							distance: "690m",
							pic: 29,
							pice: 99,
						}, ],
					}
				],
				popularity: [{
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
				],
			}
		},

		components: {
			recNearby,
		},
		methods: {
			jumpgoodslist(index) {
				let that = this;
				let cateName = that.cate[index].cateName
				let titbg = that.cate[index].titbg
				let listbg = that.cate[index].listbg
				let detailImg = that.cate[index].detailImg
				wx.navigateTo({
					url: "../index-hot-more/main?cateName=" + cateName + '&titbg=' + titbg + '&detailImg=' + detailImg + '&listbg=' + listbg
				})
			},
			//禁止滑动
			stopTouchMove: function() {
				return false;
			},
			listTab(e) {
				this.listcurr = e;
			},
			changeTab(e) {
				this.listcurr = e.mp.detail.current;
			},
		},
		onLoad() {
			let that = this;
			that.listcurr = 0;

		}
	}
</script>

<style scoped lang="less">
	/*导航*/
	
	.hot-list {
		width: 100%;
		background-color: #ff0137;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 36px;
		position: fixed;
		top: 0;
		z-index: 99;
		.recommend-list-li {
			width: 50%;
			height: 100%;
			text-align: center;
			span {
				display: block;
				padding-bottom: 2px;
				width: 40px;
				margin: 2px auto 2px auto;
				font-size: 15px;
				color: #ffffff;
			}
		}
		.list-on {
			span {
				border-bottom: 4px solid #FFFFFF;
				font-weight: bold;
				border-radius: 2px;
			}
		}
	}
	/*热卖*/
	
	.cates {
		width: 100%;
		padding-top: 35px;
		.cate {
			padding-top: 26px;
			position: relative;
			.img {
				width: 100%;
				height: 175px;
				overflow: hidden;
				position: absolute;
				top: 0;
				z-index: -1;
			}
			.cate-name {
				padding: 0 0 12px 20px;
				color: #FFFFFF;
				font-size: 17px;
				font-weight: bold;
			}
			.more {
				color: #ff4b27;
				font-size: 15px;
				text-align: right;
				padding: 20px 12px 30px 0;
			}
		}
	}
	/*人气*/
	
	.popularity-wp {
		padding-top: 35px;
		position: relative;
		height: 275px;
		.bg-img {
			width: 100%;
			height: 275px;
			z-index: 999;
			position: absolute;
			top: 35px;
			z-index: -1;
		}
		.tit {
			color: #FFFFFF;
			font-weight: bold;
			padding: 20px 0 20px 20px;
		}
		.banner {
			swiper {
				width: 100%;
				height: 150px;
				.item {
					margin: 0 auto;
					text-align: center;
					border-radius: 5px;
					overflow: hidden;
					.slide-image {
						width: 98%;
						height: 100%;
						border-radius: 12px;
					}
				}
			}
		}
	}
	
	.popularity-li {
		padding-bottom: 50px;
	}
</style>