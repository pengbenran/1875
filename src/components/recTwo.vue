<template>
	<div class="rec-product">
		<div class="rec-product-li" v-for="(item,index) in recTwo" @click="toGoodsDetail(item.goodId)">
			<div class="top">
				<img :src="item.thumbnail" />
			</div>
			<div class="bottom">
				<div class="tit fontHidden">{{item.goodName}}</div>
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
					</div>
					<div class="pic-right">{{item.showSales}}人购买</div>
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

		methods: {
			//跳转详情页
			toGoodsDetail(goodsId){
				wx.navigateTo({  
                 url:`../product-detail/main?goodsId=${goodsId}&codeUnionid=`		  	
			  })
			}
		},
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
				border-top-left-radius: 4px;
				border-top-right-radius: 4px;
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
					height: 38px;
				}
				.address {
					padding: 0 4px;
					color: #999999;
					font-size: 12px;
					overflow: hidden;
					text-overflow: ellipsis;
					display: inline-block;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					 margin: 6px 0;
				}
			  .jfjj{
			   	display: flex;
			   	margin-bottom: 6px;
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
				.piced {
					font-size: 13px;
					color: #999999;
					display: flex;
					justify-content: space-between;
					span{
						&:nth-child(1) {
							text-decoration: line-through;
						}
					}	
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