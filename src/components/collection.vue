<template>
	<div class="rec-product">
		<div class="rec-product-warp" v-for="(item,index) in recNearby">
			<div class="rec-product-li" @click="jumpdetail(item.goodId)">
				<div class="left">
					<img :src="item.thumbnail" />
				</div>
				<div class="right">
					<div class="tit">{{item.goodName}}</div>

					<div class="address">
						<span>{{item.address}}</span>
						<span>丨</span>
						<span>{{item.subway}}</span>
					</div>
					<div class="pic">
						<div class="pic-left">
							<p>
								<span class="rmb">¥</span>
								<span>{{item.price}}</span>
							</p>
							<p>¥{{item.showPrice}}</p>
						</div>
						<!-- <div class="pic-right">200m</div> -->
					</div>
				</div>
			</div>
			<div class="bar">
				<div class="bar_left">
					<div class="bar_Img"><img src="/static/images/love1.png" /></div> <span>{{item.favorites}}人喜欢</span> </div>
				<div class="bar_right"><span @click="jumpdetail(item.goodId)">立即购买</span></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['recNearby'],
		watch: {
			recNearby(val) {
				console.log("监听了一波数据", val)
			}
		},
		data() {
			return {}
		},

		methods: {
			jumpdetail(goodsId) {
				wx.navigateTo({
					url: '../product-detail/main?goodsId=' + goodsId
				})
			}
		},
	}
</script>

<style scoped lang="less">
	.rec-product-warp {
		background: #FFFFFF;
		box-sizing: border-box;
		padding: 8px 0 0px 8px;
		box-shadow: 0 2px 4px 2px #f4f4f4;
		border-radius: 4px;
		margin-top: 12px;
	}
	
	.rec-product {
		padding: 0 12px 0px 12px;
		margin-bottom: 12px;
		box-sizing: border-box;
		.rec-product-li {
			display: flex;
			margin-bottom: 4px;
			.left {
				width: 134px;
				height: 134px;
				border-radius: 4px;
				overflow: hidden;
			}
			.right {
				margin-left: 8px;
				width: 186px;
				border-bottom: 1px solid #f5f5f5;
				.tit {
					font-size: 14px;
					color: #333333;
					font-weight: bold;
					line-height: 21px;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				.address {
					color: #999999;
					font-size: 12px;
					padding: 17px 0;
				}
				.pic {
					display: flex;
					align-items: flex-end;
					justify-content: space-between;
					.pic-left {
						p {
							display: inline-block;
							&:nth-child(1) {
								font-size: 19px;
								color: #ff4b27;
								.rmb {
									font-size: 12px;
								}
							}
							&:nth-child(2) {
								font-size: 13px;
								color: #999999;
								margin-left: 8px;
								text-decoration: line-through;
							}
						}
					}
					.pic-right {
						color: #999999;
						font-size: 12px;
					}
				}
			}
		}
	}
	
	.bar {
		padding: 0 12px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 49px;
		box-sizing: border-box;
		.bar_right span {
			display: inline-block;
            width: 95px;
            height: 33px;
            border-radius: 17px;
            background: #ff6e6e;
            text-align: center;
            line-height: 33px;
            font-size: 14px;
            color: #FFFFFF;
		}
	}
	
	.bar_left {
		display: flex;
		align-items: center;
		.bar_Img {
			width: 25px;
			height: 25px;
		}
		.bar_Img {
			vertical-align: middle;
		}
		span{
			font-size: 15px;
			color: #333333;
			margin-left: 2px;
		}
	}
</style>