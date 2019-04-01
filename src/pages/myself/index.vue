<template>
	<div class="container">
		<!--用户信息-->
		<div class="userinfo">
			<div class="img"><img :src="userinfo.img" /></div>
			<div class="name">{{userinfo.name}}</div>
			<div class="id">圈号: {{userinfo.id}}</div>
			<div class="vip">
				<span class="iconfont">&#xe600;</span>
				<span class="iconfont">&#xe625;</span>
			</div>
		</div>
		<div class="container-bottom">
			<!--list-->
			<div class="list">
				<div class="list-li1">
					<div class="iconfont icon"> &#xe62d;</div>
					<div class="name">邀请</div>
				</div>
				<div class="list-li2" @click="listLi2">
					<div class="iconfont icon">&#xe629;</div>
					<div class="name">红包 ({{num}})</div>
				</div>
				<div class="list-li3">
					<div class="iconfont icon">&#xe627;</div>
					<div class="name">订单 ({{num}})</div>
				</div>
				<div class="list-li4">
					<div class="iconfont icon">&#xe626;</div>
					<div class="name">喜欢 ({{num}})</div>
				</div>
				<div class="list-li5">
					<div class="iconfont icon">&#xe62b;</div>
					<div class="name">团队({{num}})</div>
				</div>
			</div>
			<!--收支总览-->
			<div class="income">
				<div class="tit">
					<div class="tit-left">
						<span>收支总览</span>
						<span class="iconfont">&#xe623;</span>
					</div>
					<div class="tit-right">
						<span class="iconfont">&#xe625;</span>
					</div>
				</div>
				<!--积分-->
				<div class="integral">
					<div class="integral-left">
						<div class="num">
							<span>300</span>
							<span>累计积分</span>
						</div>
						<div class="num">
							<span>100</span>
							<span>可用积分</span>
						</div>
					</div>
					<!--xian-->
					<div class="xian"></div>
					<div class="integral-right">
						<div class="num">
							<span>300</span>
							<span>累计奖金</span>
						</div>
						<div class="num">
							<span>100</span>
							<span>可提积分</span>
						</div>
					</div>
				</div>
			</div>
			<!--客服-->
			<div class="phone">
				<span>客服热线</span>
				<span class="iconfont">&#xe625; </span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				num: 99,
				userinfo: {
					img: '/static/images/list.jpg',
					name: '小可爱',
					id: 1234,
				},
			}
		},
		onLoad() {},
		methods: {
			listLi2() {
				wx.navigateTo({
             url:"../myself-red/main"
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.container {
		background: #f4f4f4;
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
	}
	
	.userinfo {
		width: 100%;
		height: 190px;
		background: linear-gradient(#ff8080, #ff6f6f);
		text-align: center;
		padding-top: 9px;
		.img {
			width: 60px;
			height: 60px;
			overflow: hidden;
			border-radius: 50%;
			margin: 0 auto;
			border: 1px solid #FFFFFF;
			overflow: hidden;
		}
		.name {
			font-size: 15px;
			color: #ffffff;
			padding: 10px 0 10px 0;
			font-weight: bold;
		}
		.id {
			font-size: 13px;
			color: #ffffff;
			padding-bottom: 12px;
		}
		.vip {
			width: 120px;
			height: 33px;
			background: rgba(255, 255, 255, .2);
			border: 1px solid #FFFFFF;
			text-align: center;
			margin: 0 auto;
			border-radius: 16.5px;
			display: flex;
			justify-content: center;
			align-items: center;
			span {
				display: block;
				color: #fdedd4;
				font-size: 24px;
				&:nth-child(2) {
					font-size: 12px;
				}
			}
		}
	}
	
	.container-bottom {
		width: 100%;
		box-sizing: border-box;
		padding: 0 12px;
		/*list*/
		.list {
			width: 100%;
			height: 88px;
			background: #FFFFFF;
			border-radius: 12px;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			position: relative;
			top: -12px;
			.list-li1,
			.list-li2,
			.list-li3,
			.list-li4,
			.list-li5 {
				width: 20%;
				text-align: center;
				padding: 17px 0;
				.icon {
					font-size: 20px;
				}
				.name {
					font-size: 12px;
					color: #333333;
					margin-top: 12PX;
				}
			}
			.list-li1,
			.list-li5 {
				color: #26acff;
			}
			.list-li2 {
				color: #ff2626;
			}
			.list-li3 {
				color: #ff6f26;
			}
			.list-li4 {
				color: #ff2655;
			}
		}
		.income {
			width: 100%;
			height: 140px;
			background: #FFFFFF;
			border-radius: 12px;
			.tit {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				align-items: center;
				padding: 20px 20px 0 20px;
				box-sizing: border-box;
				margin-bottom: 33px;
				.tit-left {
					span {
						&:nth-child(1) {
							font-size: 17px;
							color: #333333;
							font-weight: bold;
						}
						&:nth-child(2) {
							font-size: 12px;
							color: #999999;
							margin-left: 6px;
						}
					}
				}
				.tit-right {
					span {
						font-size: 12px;
						color: #dedede;
					}
				}
			}
			.integral {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				width: 100%;
				padding: 0 12px;
				box-sizing: border-box;
				position: relative;
				.integral-left,
				.integral-right {
					width: 50%;
					display: flex;
					align-items: center;
					.num {
						width: 46%;
						span {
							display: block;
							text-align: center;
							&:nth-child(1) {
								font-size: 18px;
								color: #333333;
								font-weight: bold;
							}
							&:nth-child(2) {
								font-size: 12px;
								color: #666666;
								margin-top: 4px;
							}
						}
					}
				}
				.integral-right {
					justify-content: flex-end;
				}
				.xian {
					width: 1px;
					height: 20px;
					background: #dedede;
					position: absolute;
					z-index: 9;
					left: 50%;
					top: 50%;
					margin-left: -0.5px;
					margin-top: -10px;
				}
			}
		}
		.phone {
			margin-top: 12px;
			width: 100%;
			height: 49px;
			display: flex;
			justify-content: space-between;
			padding: 0 20px;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 12px;
			span {
				display: block;
				line-height: 49px;
				&:nth-child(1) {
					font-size: 17px;
					color: #333333;
				}
				&:nth-child(2) {
					font-size: 24rpx;
					color: #dedede;
				}
			}
		}
	}
</style>