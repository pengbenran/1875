<template>
	<div class="container">
		<!--轮播-->
		<div class="popularity-wp">
			<div class="bg-img"><img :src="bgImg.img" /></div>
			<div class="tit">消费降价生活不降价</div>
			<div class="banner">
				<swiper autoplay="true" circular="true" display-multiple-items='1' previous-margin='10px' next-margin='10px'>
					<div v-for="(item, index) in costBanner">
						<swiper-item class='item' @click="jumpGoodsDetail(item.goodId,item.status)">
							<img mode="aspectFill" :src="item.url" class="slide-image" />
						</swiper-item>
					</div>
				</swiper>
			</div>
		</div>	
		<recTwo :recTwo='showGoodDTOS'></recTwo>
		<div class="noMoreTip">数据到底了</div>
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
				hasMore:true,
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
			// banner图跳转商品
			jumpGoodsDetail(goodId,status){
				if(status!=0){
					wx.navigateTo({
						url:`../product-detail/main?goodsId=${goodId}&codeUnionid=`, 
					})
				}
				
			},
			changeTab(e) {
				this.listcurr = e.mp.detail.current;
			},
 
			getCost(){
				let params={}
				let that=this
				if(that.hasMore){	
					params.page=that.page
					params.limit=that.limit
					params.longitude=wx.getStorageSync('longitude')
					params.latitude=wx.getStorageSync('latitude')
					Api.getCost(params).then(function(res){
						if(res.showGoodDTOS.length<that.limit){
							that.hasMore=false
						}
						that.showGoodDTOS=that.showGoodDTOS.concat(res.showGoodDTOS)
						that.costBanner=res.costBanner
					})
				}
				else{
					wx.showToast({
						title:'没有更多数据了',
						icon:"none",
						duration:1500
					})
				}
			}
		}, 
		mounted() {
			let that = this;
			that.listcurr = 0;
			that.page=1
			that.hasMore=true
			that.showGoodDTOS=[]
			that.getCost()
		},
		onReachBottom:function(){
			let that = this;
			that.page+=1
			that.getCost()
		}
	}
</script>

<style scoped lang="less">
	swiper {
		display:block;
		height:100%;

	}
	.noMoreTip{
		font-size:14px; 
		color:#999;
		text-align: center;
		height: 50px;
		line-height: 50px;
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