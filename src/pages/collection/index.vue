<template>
	<div class="container">
		<blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>
			<recNearby :recNearby="GoodList" />
		</blockquote>
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
				// TopList: ['可使用', '已下架'],
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