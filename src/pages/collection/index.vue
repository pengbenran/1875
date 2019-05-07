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
					<recNearby :recNearby="GoodList" />
			</swiper-item>
			
		</swiper>
	</div>
</template>
<script>
	import API from '@/api/good'
	import store from '@/store/store'
	import recNearby from '@/components/collection'
	export default {
		data() {
			return {
				TopList: ['可使用', '已下架'],
				listQuery: {
					page: 1,
					limit: 10,
				},
				GoodList: [],
				listcurr: 0
			}
		},
		components: {
			recNearby,
		},
		//监听滚动条
		onPageScroll(e) {

		},
		methods: {
			GetGoodList() {
				let that = this;
				let data = {
					memberId: store.state.userInfo.memberId
				}
				API.GetCollectionShop(Object.assign({}, that.listQuery, data)).then(res => {
					if(res.code == 0) {
						that.GoodList = res.favorite.rows
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
			},

			//swiper选择事件
			changeTab(e) {
				let that = this;
				console.log("触发的时间", e)
				that.listcurr = e.mp.detail.current;
			},

			//top触发事件
			onClick(e) {
				let that = this;
				that.listcurr = e;
				console.log("top触发事件", e)
			}
		},

		//小程序触底加载
		onReachBottom: function() {

		},
		onLoad() {
			this.GetGoodList();
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
		padding: 49px 0 50px 0;
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