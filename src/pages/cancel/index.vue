<template>
	<div class="container">
		<blockquote v-if='canCancel'>
			<div class="condition" v-if='orderDetail.status==1'>待核销</div>
		<div class="condition" v-if='orderDetail.status==2'>已核销</div>
		<div class="condition" v-if='orderDetail.status==3'>已过期</div>
		<div class="total">
			<div class="orderinfo">
                   <div class="tit">订单信息</div>
                    <!--下单人-->
                    <div class="prnston">
                    	<div class="prnston-li">
                    	    <span class="title">下单人:</span>
                    	    <span class="tex">{{orderDetail.buyName}}</span>
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
				<div class="top">
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
					<!--订单总价：-->
					<div class="name6">
						<span>订单总价</span>
						<span>¥ {{orderDetail.orderAmount}}</span>
					</div>
				</div>
			</div>
		</div>
		<!--按钮-->
		<div class="btn" v-if='orderDetail.status==1' @click="orderCancel">立即核销</div>
		</blockquote>
		<blockquote v-else>
			<div class="kong">
				<div class="img"><img src="/static/images/kong.png"></div>
				<div class="text">您不是指定商户，无法核销噢~</div>
				<div class="jumpbtn" @click="jumpHome">返回首页</div>
			</div>
		</blockquote>
		<loginModel ref="loginModel" @memberCancel='memberCancel'></loginModel>

	</div>
</template>

<script>
	import Api from "@/api/order"
	import store from "@/store/store"
	import loginModel from "@/components/loginModel"
	export default {
		data() {
			return {
				orderDetail:{},
				userInfo:{},
				canCancel:true,
				orderId:''
			}
		},
		mounted(){
			let that=this
			that.$refs.loginModel.userLogin()
			
		},
		onLoad(options){
			let that=this
			that.orderId=decodeURIComponent(options.scene)
		},
		components: {
			loginModel
		},
		methods: {
			// 判断能否核销订单
			memberCancel(){
				let params={}
				let that=this
				params.unionId=store.state.userInfo.unionid
				params.orderId=that.orderId
				Api.memberCancel(params).then(function(res){
					if(res.code==0){
						that.orderDetail=res.orderEntity
					}
					else{
						that.canCancel=false
					}
				})
			},
			// 返回首页
			jumpHome(){
				wx.switchTab({
					url:'../index/main'
				})
			},
			orderCancel(){
				let params={}
				let that=this
				params.unionId=store.state.userInfo.unionid
				params.orderId=that.orderId
				Api.orderCancel(params).then(function(res){
					if(res.code==0){
					   that.orderDetail.status=2
					}
					else{

					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.container {
		background: #f9f9f9;
		/*空*/
		.kong {
			margin-top: 60px;
			line-height: 1;
			background: #fff;
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
			.jumpbtn {
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
		.btn {
			width: 100%;
			height: 57px;
			background: #FFFFFF;
			position: fixed;
			bottom: 0;
			color: #333333;
			font-size: 16px;
			font-weight: bold;
			line-height: 57px;
			text-align: center;
			
		}
	}
</style>