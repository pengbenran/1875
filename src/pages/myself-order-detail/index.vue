<template>
	<div class="container">
		<div class="condition">待付款 00:29:59 后取消订单</div>
		<div class="total">
						<!--订单详情-->
			<div class="orderinfo">
                   <div class="tit">订单信息</div>
                   <div class="ma">
                   	 <div class="ma-left">
                   	 	<span>订单编码 : </span>
                   	 	<span>1234567891234</span>
                   	 </div>
                   	 <div class="ma-right">复制</div>
                   </div>
                    <div class="img"><img src="/static/images/ku5p0efhhxr5.jpg"/></div>
                    
                    <!--下单人-->
                    <div class="prnston">
                    	<div class="prnston-li">
                    	    <span class="title">下单人 :</span>
                    	    <span class="tex">熊世豪</span>
                    	</div>
                    	<div class="prnston-li">
                    	    <span class="title">获得积分 :</span>
                    	    <span class="tex">20</span>
                    	</div>
                    	<div class="prnston-li">
                    	    <span class="title">获得佣金 :</span>
                    	    <span class="tex">12.59元</span>
                    	</div>
                    	<div class="prnston-li">
                    		 <span class="title">创建时间 :</span>
                    	     <span class="tex"> 2019-04-02  11:34:38</span>
                    	</div>
                    </div>
			</div>
			<!--商品信息-->
			<div class="shopinfo">
				<div class="top">
					<div class="img"><img :src="option.img" /></div>
					<div class="cant">
						<div class="des">{{option.des}}</div>
						<div class="add">
							<span>{{option.adds}}</span>
							<span>丨</span>
							<span>{{option.add}}</span>
						</div>
						<div class="pic">
							<span>¥{{option.pic}}</span>
							<span>¥{{option.oldpic}}</span>
						</div>
					</div>
				</div>
				<div class="bottom">
					<!--商品数量-->
					<div class="name0">
						<span>商品数量</span>
						<span>¥ 29.99</span>
					</div>
					<!--商品总价：-->
					<div class="name1">
						<span>商品总价</span>
						<span>¥ 29.99</span>
					</div>
					<!--签到红包：-->
					<div class="name2">
						<span>签到红包</span>
						<span>¥ 29.99</span>
					</div>
					<!--会员折扣：-->
					<div class="name3">
						<span>会员折扣</span>
						<span>¥ 29.99</span>
					</div>
					<!--积分抵扣：-->
					<div class="name4">
                        <span>积分抵扣</span>
						<span>¥ 29.99</span> 	
					</div>
					<!--佣金抵扣：-->
					<div class="name5">
						<span>佣金抵扣</span>
						<span>¥ 29.99</span>
					</div>
					<!--订单总价：-->
					<div class="name6">
						<span>订单总价</span>
						<span>¥ 29.99</span>
					</div>
					<!--应付金额：-->
					<div class="name7">
						<span>应付金额</span>
						<span>¥ 29.99</span>
					</div>

				</div>
			</div>
		</div>
		<!--按钮-->
		<div class="btns">
			<div class="btn1">
				{{txt.btn1}}
			</div>
			<div class="btn2">
				{{txt.btn2}}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				txt: {
					btn1: "取消订单",
					btn2: "立即付款",
				},
				option: {
					img: "/static/images/ku5p0efhhxr5.jpg",
					des: "这是28px大小平方字体并且做了加粗处理行间距是42px哦了加粗处理行间距是42px哦",
					adds: "青山湖区 ",
					add: "一二三四五六七八九十",
					pic: "39.9",
					oldpic: "89.9",
				}
			}
		},

		methods: {

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
					.cant {
						width: 217px;
						.des {
							color: #1c1c1c;
							font-size: 14px;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
							line-height: 21px;
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