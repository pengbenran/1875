<template>
	<div class="container">

		<div class="top_Tap">
			<ul>
				<li v-for="(item,index) in TopList" :key="item"><span :class="listcurr == index ? 'List_on':''" @click="onClick(index)">{{item}}</span></li>
			</ul>
		</div>
		<swiper style="height:100vh" duration='350' :current="listcurr" @change="changeTab">
			<swiper-item style="overflow: scroll;">
					<recNearby :recNearby="GoodList" />
			</swiper-item>
			
		</swiper>

		<!-- <blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>
			<blockquote>
				<recNearby :recNearby="GoodList" />
			</blockquote>
			<div v-if="GoodList.length==0" class="kong">
				<div class="img"><img src="/static/images/kong.png" /></div>
				<div class="text">还没有喜欢的商品哦~</div>
			</div>
		</blockquote> -->

	</div>
</template>
<script>
	import API from '@/api/good'
	import store from '@/store/store'
	import recNearby from '@/components/collection'
	import loading from '@/components/loading'
	export default {
		data() {
			return {
				listQuery: {
					page: 1,
					limit: 10,
				},
				hasMore:true,
				GoodList: [],
				isLoading:false,

			}
		},
		components: {
			recNearby,loading
		},
		methods: {
			GetGoodList() {
				let that = this;
				let data = {
					memberId: store.state.userInfo.memberId
				}
				if(that.hasMore){
					API.GetCollectionShop(Object.assign({}, that.listQuery, data)).then(res => {
						if(res.code == 0) {
							that.isLoading=true
							if(res.favorite.rows.length < that.listQuery.limit){
								that.hasMore = false
							}
							that.GoodList = that.GoodList.concat(res.favorite.rows)
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
				}
				else{
					wx.showToast({
						title: '没有更多数据',
						icon: "none",
						duration: 1500
					})
				}
			},
		},

		//小程序触底加载
		onReachBottom: function() {
			console.log('触底了');
			let that=this
			that.listQuery.page+=1
			that.GetGoodList()
		},
		mounted() {
			let that=this
			that.isLoading=false,
			that.hasMore=true
			that.GoodList=[]
			that.GetGoodList();
		}
	}
</script>

<style scoped lang="less">
.kong {
		padding-top: 120px;
		box-sizing: border-box;
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
		background: #f8f8f8;
		min-height: 100vh;
	}
	swiper-item {
		width: 100%;
		box-sizing: border-box;
		// padding: 49px 0 50px 0;
	}
	.top_Tap {
		background: #fff;
		position: fixed;
		top: 0;
		margin-bottom: 8px;
		width: 100%;
		background: #FFFFFF;
		z-index: 98;
		ul {
			display: flex;
			align-items: center;
		}
		li {
			text-align: center;
			width: 50%;
			line-height: 49px;
			font-size:28rpx;
            color:#333333;

		}
	}
	
	.List_on {
		transition: all 0.2s;
		border-bottom: 12rpx solid #ff6e6e;
		font-weight: bold;
		color: #333333;
		display: inline-block;
		height: 60rpx;
		border-radius: 6rpx;
		padding: 0 4rpx;
	}
</style>