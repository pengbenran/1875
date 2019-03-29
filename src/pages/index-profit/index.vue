<template>
	<div class="container">
		<!--轮播-->
		<div class="popularity-wp">
			<div class="bg-img"><img :src="bgImg.img" /></div>
			<div class="tit">消费降价生活不降价</div>
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
		<!--类目-->
		<div class="hot-list">
			<div class="recommend-list-li" v-for="(item,index) in hotList" @click="listTab(index)" :class="listcurr==index?'list-on':''">
				<span class="name">{{item.name}}</span>
			</div>
		</div>
		<swiper style="height:100vh" duration='350' :current="listcurr" @change="changeTab">
			<!--1-->
			<swiper-item id="toplist">
				<recTwo :recTwo='recTwo'></recTwo>
			</swiper-item>
			<!--2-->
			<swiper-item>
			<recTwo :recTwo='recTwo'></recTwo>
			</swiper-item>
		</swiper>
	</div>
</template>

<script>
	import recTwo from '@/components/recTwo'
	export default {
		data() {
			return {
				listcurr: 0,
				hotList: [{
						name: "热卖"
				},
					{
						name: "人气"
					},
				],
				bgImg: {
					img: "/static/images/hotbg.gif"
				},
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
				recTwo: [{
						img: "/static/images/banner.jpg",
						tit: '这是28px大小平方字体并且做了加粗处理行间距是字体大小的1.5倍#33...',
						address: "秦山湖区",
						addre: "一二三四五六七八九一二三四五六七八九",
						distance: 690,
						pic: 29,
						pice: 99,

					},
					{
						img: "/static/images/banner.jpg",
						tit: '这是28px大小平方字体并且做了加粗处理行间距是字体大小的1.5倍#33...',
						address: "东湖区",
						addre: "洪城数码广场",
						distance: 690,
						pic: 29,
						pice: 99,
					},
					{
						img: "/static/images/banner.jpg",
						tit: '这是28px大小平方字体并且做了加粗处理行间距是字体大小的1.5倍#33...',
						address: "东湖区",
						addre: "洪城数码广场",
						distance: 690,
						pic: 29,
						pice: 99,
					},
					{
						img: "/static/images/banner.jpg",
						tit: '这是28px大小平方字体并且做了加粗处理行间距是字体大小的1.5倍#33...',
						address: "东湖区",
						addre: "洪城数码广场",
						distance: 690,
						pic: 29,
						pice: 99,
					},
		
				
				],
			}
		},
		components: {
			recTwo,
		},
		methods: {
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
	  				//获取数据的高给swiper
			listtop() {
				let that = this
				const query = wx.createSelectorQuery()
				query.select('#toplist').boundingClientRect()
				query.selectViewport().scrollOffset()
				query.exec(function(res) {
					that.idtop = res[0].top
					console.log(res)
					
				})
			},
		}, 
		onLoad() {
			let that = this;
			that.listcurr = 0;
			that.listtop()

		}
	}
</script>

<style scoped lang="less">
swiper {
display:block;
height:100%;

}

.container{
	padding-bottom: 50px;
}
	/*轮播*/
	.popularity-wp {
		position: relative;
		height: 275px;
		.bg-img {
			width: 100%;
			height: 275px;
			z-index: 999;
			position: absolute;
			top: 0;
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
	/*类目*/
	.hot-list {
		width: 100%;
		background-color: #ff4b27;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 35px;
		.recommend-list-li {
			width: 50%;
			height: 100%;
			text-align: center;
			span {
				display: block;
				padding-bottom: 2px;
				width: 33px;
				height: 18px;
				margin: 8px auto 8px auto;
				font-size: 13px;
				color: #ffffff;
			}
		}
		.list-on {
			span {
				border-bottom: 2px solid #FFFFFF;
				font-weight: bold;
			}
		}
	}
</style>