<template>
	<div class="container">
		<!--轮播-->
		<div class="popularity-wp">
			<div class="bg-img"><img :src="bgImg.img" /></div>
			<div class="tit">消费降价生活不降价</div>
			<div class="banner">
				<swiper autoplay="true" circular="true" display-multiple-items='1' previous-margin='10px' next-margin='10px'>
					<div v-for="(item, index) in costBanner">
						<swiper-item class='item'>
							<img mode="aspectFill" :src="item.url" class="slide-image" />
						</swiper-item>
					</div>
				</swiper>
			</div>
		</div>	
		<recTwo :recTwo='showGoodDTOS'></recTwo>
	</div>
</template>

<script>
	import recTwo from '@/components/recTwo'
	import Api from '@/api/kind'
	export default {
		data() {
			return {
				page:1,
				limit:6,
				listcurr: 0,
				bgImg: {
					img: "/static/images/hotbg.gif"
				},
				showGoodDTOS:[],
				costBanner:[]
			}
		},
		components: {
			recTwo,
		},
		methods: {
			listTab(e) {
				this.listcurr = e;				
			},
			changeTab(e) {
				this.listcurr = e.mp.detail.current;
			},
 
			getCost(){
				let params={}
				let that=this
				params.page=that.page
				params.limit=that.limit
				params.longitude=wx.getStorageSync('longitude')
				params.latitude=wx.getStorageSync('latitude')
				Api.getCost(params).then(function(res){
					that.costBanner=res.costBanner
					that.showGoodDTOS=res.showGoodDTOS
				})
			}
		}, 
		mounted() {
			let that = this;
			that.listcurr = 0;
			that.getCost()
		}
	}
</script>

<style scoped lang="less">
swiper {
display:block;
height:100%;

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
</style>