<template>
	<div class="container">
		<blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>
		<div class="condition"  v-if="orderDetail.status==0">待付款</div>
		<div class="condition" v-if="orderDetail.status==1">待核销</div>
		<div class="condition"  v-if="orderDetail.status==2">已核销</div>
		<div class="condition"  v-if="orderDetail.status==3">已取消</div>
		<div class="total">
			<!--订单详情-->
			<div class="orderinfo">
                   <div class="tit">订单信息</div>
                   <div class="ma">
                   	 <div class="ma-left">
                   	 	<span>订单编码 : </span>
                   	 	<span>{{orderDetail.sn}}</span>
                   	 </div>
                   	 <div class="ma-right" @click='copy'>复制</div>
                   </div>
                   <div class="ma">
                   	 <div class="ma-left">
                   	 	<span>店铺地址 : </span>
                   	 	<span>{{orderDetail.address}}</span>
                   	 </div>
                   	 <div class="ma-right" @click="openMap">导航</div>
                   </div>
                    <div class="img"><img :src="orderDetail.orderCode"/></div>
                    
                    <!--下单人-->
                    <div class="prnston">
                    	<div class="prnston-li">
                    	    <span class="title">店铺名称:</span>
                    	    <span class="tex">{{orderDetail.shopName}}</span>
                    	</div>
                    	<div class="prnston-li">
                    	    <span class="title">下单人:</span>
                    	    <span class="tex">{{orderDetail.buyName}}</span>
                    	</div>
                    	<div class="prnston-li">
                    	    <span class="title">获得积分 :</span>
                    	    <span class="tex">{{orderDetail.gainedpoint}}</span>
                    	</div>
                    	<div class="prnston-li" v-if="">
                    	    <span class="title">推荐师优惠 :</span>
                    	    <span class="tex">{{orderDetail.recommend}}</span>
                    	</div>
                    	<div class="prnston-li">
                    	    <span class="title">消费积分 :</span>
                    	    <span class="tex">{{orderDetail.consumepoint}}</span>
                    	</div>
                    	<div class="prnston-li">
                    	    <span class="title">获得佣金 :</span>
                    	    <span class="tex">{{orderDetail.recommend}}元</span>
                    	</div>
                    	<div class="prnston-li">
                    		 <span class="title">下单时间 :</span>
                    	     <span class="tex"> {{orderDetail.createTime}}</span>
                    	</div>
                    	<div class="prnston-li">
                    		 <span class="title">过期时间 :</span>
                    	     <span class="tex"> {{orderDetail.orderInvalidTime}} </span>
                    	</div>
                    </div>
			</div>
			<!--商品信息-->
			<div class="shopinfo">
				<div class="top" @click="toShopDetail(orderDetail.goodsId)">
					<div class="img"><img :src="orderDetail.goodThumbnail" /></div>
					<div class="cant">
						<div class="des">{{orderDetail.goodName}}</div>
						<div class="add">
							<span>{{orderDetail.address}}</span>
						</div>
						<div class="pic">
							<span>¥{{orderDetail.goodsAmount}}</span>
							<span>¥{{orderDetail.showPrice}}</span>
						</div>
					</div>
				</div>
				<div class="bottom">
					<!--商品数量-->
					<div class="name0">
						<span>商品数量</span>
						<span>X {{orderDetail.goodsNum}}</span>
					</div>
					<!--商品总价：-->
					<div class="name1">
						<span>商品总价</span>
						<span>¥ {{orderDetail.goodsAmount}}</span>
					</div>
					<!--会员折扣：-->
					<div class="name3">
						<span>会员折扣</span>
						<span>{{orderDetail.discount*10}}折</span>
					</div>
					<!--积分抵扣：-->
					<div class="name4">
                        <span>积分抵扣</span>
						<span>¥ {{orderDetail.pointDiscount==null?0:orderDetail.pointDiscount}}</span> 	
					</div>
					<!--佣金抵扣：-->
					<div class="name5">
						<span>佣金抵扣</span>
						<span>¥ {{orderDetail.balance}}</span>
					</div>
					<!--订单总价：-->
					<div class="name6">
						<span>订单总价</span>
						<span>¥ {{orderDetail.orderAmount}}</span>
					</div>
					<!--应付金额：-->
					<div class="name7">
						<span>实付金额</span>
						<span>¥ {{orderDetail.orderAmount}}</span>
					</div>

				</div>
			</div>
		</div>
		<!--按钮-->
		<div class="btns">
			<div class="btn2" @click='jumpHome'>
				返回首页
			</div>
		</div>
	</blockquote>
	</div>
</template>

<script>
	import Api from "@/api/order"
	import loading from '@/components/loading'
	export default {
		components: {
		    loading
		},
		data() {
			return {
				orderDetail:{},
				isLoading:false,
			}
		},
		mounted(){
			let that=this
			that.isLoading=false
			let orderId = that.$root.$mp.query.orderId;
			that.getOrderDetail(orderId)
		},
		methods: {
			// 获取订单详情
			getOrderDetail(orderId){
				let that=this
				let params={}
				params.orderId=orderId
				Api.getOrderDetail(params).then(function(res){
					if(res.code==0){
						that.orderDetail=res.orderEntity
						that.isLoading=true
					}
					
				})		
			},
			jumpHome(){
				mpvue.reLaunch({
					url: '../index/main'
				})
			},
			toShopDetail(goodsId){
				wx.navigateTo({  
                   url:`../product-detail/main?goodsId=${goodsId}&codeUnionid=`		  	
			    })
			},
			copy(){
				let that=this
				wx.setClipboardData({
					data:that.orderDetail.sn,
					success: function(res) {

					}
				})
			},
			openMap(){
				let that=this
				let latitude=that.orderDetail.latitude*1
				let longitude=that.orderDetail.longitude*1
				wx.openLocation({
					latitude,
					longitude,
					scale: 18
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.container {
		background: #f9f9f9;
		padding-bottom: 80px;
		.condition {
			width: 100%;
			height: 49px;
			text-align: center;
			line-height: 49px;
			background: #FFFFFF;
			color: #ff6e6e;
			font-size: 22px;
			font-weight: bold;
		}
		.total {
			padding: 0 12px;
			width: 100%;
			box-sizing: border-box;
			.shopinfo {
				padding: 12px 12px 20px 12px;
				width: 100%;
				box-sizing: border-box;
				background: #FFFFFF;
				margin-top: 12px;
				border-radius: 12px;
				.top {
					width: 100%;
					display: flex;
					align-items: center;
					border-bottom: 1px solid #DEDEDE;
					padding-bottom: 12px;
					padding-top: 8px;
					.img {
						width: 101px;
						height: 101px;
						border-radius: 4px;
						margin-right: 8px;
					}
				   .cant{
						width: 217px;
						height: 101px;
						.des {
							color: #1c1c1c;
							font-size: 14px;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
							line-height: 21px;
							height: 42px;
						}
						.add {
							font-size: 12px;
							color: #999999;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
							padding: 7px 0;
						}
						.pic {
							display: flex;
							align-items: center;
							span {
								display: block;
								color: #999999;
								&:nth-child(1) {
									font-size: 14px;
								}
								&:nth-child(2) {
									font-size: 13px;
									margin-left: 6px;
									text-decoration: line-through;
									
								}
							}
						}
					}
				}
				.bottom{
					.name0,.name1,.name2,.name3,.name4,.name5,.name6,.name7{
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 13px;
						color: #999999;
						margin-top: 15px;
						span{
							display: block;
						}
					}
					.name0{color: #333333;}
					.name6{color: #333333;}
					.name7{color: #ff4b27;font-size: 14px;border-top: 1px solid #DEDEDE;margin-top: 12px;padding-top: 12px;}
				}
			}
			.orderinfo {
				padding: 12px 12px 20px 12px;
				width: 100%;
				box-sizing: border-box;
				background: #FFFFFF;
				margin-top: 12px;
				border-radius: 12px;
				.tit{font-size: 17px;color: #1c1c1c;font-weight: bold;}
				.ma{
					display: flex;
					justify-content: space-between;
					align-items: center;
						margin-top: 15px;
					.ma-left{
						display: flex;
						align-items: center;
						span{
							display:block; 
							&:nth-child(1){
								color: #333333;
								font-size: 14px;
							}
							&:nth-child(2){
								color: #333333;
								font-size: 22px;
								margin-left: 15px;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 1;
								overflow: hidden;
								width: 200px;
							}
						}
					}
					.ma-right{
						width: 44px;
						height: 22px;
						border-radius: 11px;
						border: 1px solid #999999;
						text-align: center;
						line-height: 22px;
						font-size: 13px;
						color: #666666;
					}
				}
				.img{
					width: 150px;
					height: 150px;
					padding: 12px;
					border: 1px solid #DEDEDE;
					margin: 20px auto;
				}
				.prnston{
				
					border-top: 1px dashed #DEDEDE;
					.prnston-li{
						font-size: 14px;
						margin-top: 20px;
						color: #666666;
						span{display: inline-block;}
						.title{
							width: 80px;
						}
					}
				}
			}
		}
		.btns {
			width: 100%;
			height: 49px;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			background: #FFFFFF;
			position: fixed;
			bottom: 0;
			padding-right: 12px;
			box-sizing: border-box;
			.btn1 {
				width: 95px;
				height: 33px;
				text-align: center;
				line-height: 33px;
				background: #FFFFFF;
				border-radius: 16.5px;
				border: 1px solid #999999;
				font-size: 14px;
				color: #666666;
				font-weight: bold;
				margin-right: 8px;
			}
			.btn2 {
				width: 95px;
				height: 33px;
				text-align: center;
				line-height: 33px;
				border-radius: 16.5px;
				font-size: 14px;
				font-weight: bold;
				color: #FFFFFF;
				border: 1px solid #ff6e6e;
				background: #ff6e6e;
			}
		}
	}
</style>