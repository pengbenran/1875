<template>
	<div class="rec-product">
		<div class="rec-product-li" v-for="(item,index) in recNearby" @click="jumpdetail(item.goodId)">
			<div class="left">
				<img :src="item.thumbnail" />
			</div>
			<div class="right">
				<div class="tit">{{item.goodName}}</div>

				<div class="address">
					<span>{{item.shopName}}</span>
					<span>丨</span>
					<span>{{item.region}}</span>
				</div>
					<!-- <div class="jfjj">
						<span class="jf">可得积分:20</span>
						<span class="jj">可得奖金:12.34元</span>
					</div> -->
				<div class="pic">
					<div class="pic-left">
						<p>
							<span class="rmb">¥</span>
							<span>{{item.price}}</span>
						</p>
						<p>¥{{item.showPrice}}</p>
					</div>
					<div class="pic-right">{{item.distance}}m</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['recNearby'],
		watch: {
           recNearby(val){
             
		   }
		},
		data() {
			return {}
		},

		methods: {
			jumpdetail(goodsId){
			  wx.navigateTo({
                 url:`../product-detail/main?goodsId=${goodsId}&codeUnionid=`			  	
			  })
			}
		},
	}
</script>

<style scoped lang="less">
	.rec-product {
		padding: 0 12px 25px 12px;
		box-sizing: border-box;
		.rec-product-li {
			background: #FFFFFF;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			box-shadow: 0 2px 8px #DEDEDE;
			border-radius: 4px;
			margin-top: 10px;
			overflow: hidden;
			
			.left {
				width: 150px;
				height: 150px;
			}
			.right {
				margin-left: 8px;
				width: 186px;
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
					 height: 40px;
				}
				.address {
					color: #999999;
					font-size: 12px;
					padding: 8px 0;
				}
			   .jfjj{
			   	display: flex;
			   	align-items: center;
			   	span{display:block;}
			   	.jf{
			   		width: 56px;
			   		height: 14px;
			   		border-radius: 6px;
			   		text-align: center;
			   		border: 1px solid #ffaa7f;
			   		line-height: 14px;
			   		font-size: 9px;
			   		color: #ff5703;
			   	}
			   	.jj{
			   		width: 79px;
			   		height: 14px;
			   		border-radius: 6px;
			   		text-align: center;
			   		border: 1px solid #7eccfc;
			   		line-height: 14px;
			   		font-size: 9px;
			   		color: #21a9fd ;
			   		margin-left: 8px;
			   	}
			   }
				.pic {
					display: flex;
					align-items: flex-end;
					justify-content: space-between;
					margin-top: 8px;
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
					.pic-right{
						color: #999999;
					    font-size: 12px;
					}
				}
			}
		}
	}
</style>