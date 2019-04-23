<template>
	<div class="rec-product">
		<div class="rec-product-li" v-for="(item,index) in onePennyData" @click="jumpdetail">
			<div class="left">
				<img :src="item.thumbnail" />
			</div>
			<div class="right">
				<div class="tit">{{item.goodName}}</div>
				<div class="joinCount">
					<span>222人正在参与</span>
					<span>20m</span>
				</div>
				<div class="pic">
					<div class="pic-left">
						<p>
							<span class="rmb">¥</span>
							<span>{{item.price}}</span>
						</p>
						<p>¥{{item.showPrice}}</p>
					</div>
					<div class="pic-right">去抢</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['onePennyData'],
		watch: {
           recNearby(val){
             
		   }
		},
		data() {
			return {}
		},

		methods: {
			jumpdetail(){
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
		box-sizing: border-box;
		.rec-product-li {
			background: #FFFFFF;
			display: flex;
			box-sizing: border-box;
			padding: 8px 0 8px 8px;
			box-shadow: 0 2px 4px 2px #f4f4f4;
			border-radius: 4px;
			margin-top: 4px;
			
			.left {
				width: 134px;
				height: 134px;
				border-radius: 4px;
				overflow: hidden;
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
					height: 42px;
				}
				.joinCount {
					display: flex;
					justify-content: space-between;
					font-size: 14px;
					height: 50px;
					line-height:50px;
					span{
						color:#999999;
						&:nth-child(1) {
							color: #ff4b27;	
						}
					}
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
					.pic-right{
						font-size: 14px;
						color: #fff;
						width: 70px;
						height: 33px;
						line-height:33px;
						border-radius: 16.5px;
						text-align: center;
						background: #ff6666;
					}
				}
			}
		}
	}
</style>