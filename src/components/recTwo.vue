<template>
	<div class="rec-product">
		<div class="rec-product-li" v-for="(item,index) in recTwo">
			<div class="top">
				<img :src="item.img" />
			</div>
			<div class="bottom">
				<div class="tit">{{item.tit}}</div>
				<div class="address">
					<span>{{item.address}}</span>
					<span>丨</span>
					<span>{{item.addre}}</span>
				</div>

				<div class="piced">¥99</div>
				<div class="pic">
					<div class="pic-left">
						<p>
							<span class="rmb">¥</span>
							<span>29</span>
						</p>
					</div>
					<div class="pic-right">{{item.distance}}人购买</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['recTwo'],
		data() {
			return {}
		},

		methods: {},
	}
</script>

<style scoped lang="less">
	.rec-product {
		padding: 0 12px 50px 12px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.rec-product-li {
			width: 170px;
			background: #FFFFFF;
			box-sizing: border-box;
			box-shadow: 0 2px 4px 2px #f4f4f4;
			border-radius: 4px;
			margin-bottom: 12px;
			.top {
				width: 100%;
				height: 170px;
				overflow: hidden;
			}
			.bottom {
				width: 100%;
				padding: 0 6px;
				box-sizing: border-box;
				.tit {
					font-size: 13px;
					color: #333333;
					line-height: 19px;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					padding-top: 8px;
				}
				.address {
					color: #999999;
					font-size: 11px;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					margin: 10px 0;
				}
				.piced {
					font-size: 13px;
					color: #999999;
					text-decoration: line-through;
				} 
				.pic {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-bottom: 5px;
					.pic-left {
						p {
							display: inline-block;
							font-size: 19px;
							color: #ff4b27;
							.rmb {
								font-size: 12px;
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
</style>