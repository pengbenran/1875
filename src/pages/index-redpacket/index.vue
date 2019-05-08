<template>
	<div class="container">
		<div class="container-top">
			<!--规则弹窗-->
			<div class="rule-pop" v-if="isToggle" catchtouchmove>
				<div class="rule-pop-li">
					<p class="tit">
						<span>红包规则</span>
						<span></span>
						<!--线-->
					</p>
					<p class="cant">
						{{redpacket.content}}
					</p>
				</div>
				<div class="cha">
					<span></span>
					<span @click="hide" class="iconfont">&#xe809;</span>
				</div>
			</div>
			<div class="rule">
				<span @click="show">规则</span>
			</div>
			<!--红包金额-->
			<div class="red">
				<div class="red-tit">今日红包金额</div>
				<div class="red-num">{{red.num}} 元</div>
				<div class="des">
					<p>红包仅限部分商品使用</p>
					<p>有效期：2019.03.19-2019.03.21</p>
				</div>
				<div class="xian"></div>
				<div class="btn" :class="red.id==1?'onbtn':''" @click="btn">{{red.txt}}</div>
			</div>
		</div>
		<!---->
		<div class="list-tit">
			<span>红包购买以下商品</span>
			<span></span>
		</div>
		<!---->
		<div class="container-bottom">
			<recTwo :recTwo='recTwo'></recTwo>
		</div>
	</div>
</template>

<script>
	import recTwo from '@/components/recTwo'
	export default {
		data() {
			return {
				isToggle: false,
				redpacket: {
					content: "1.点击签到可以查看每日的红包金额点击邀请好友一起领取红包，好友成功进入小程序两人即可获得红包红包仅限1875圈小程序指定该界面"
				},
				red: {
					num: "? ? ?",
					txt: "签到查看红包金额",
					id:"",
				},
				recTwo: [{
						img: "/static/images/banner.jpg",
						tit: '这是28px大小平方字体并且做了加粗处理行间距是字体大小的1.5倍#33...',
						address: "秦山湖区",
						addre: "一二三四五六七八九一二三四五六七八九",
						distance: 690,
						pic: 29,
						pice: 99,

					},
					{
						img: "/static/images/banner.jpg",
						tit: '这是28px大小平方字体并且做了加粗处理行间距是字体大小的1.5倍#33...',
						address: "东湖区",
						addre: "洪城数码广场",
						distance: 690,
						pic: 29,
						pice: 99,
					},
					{
						img: "/static/images/banner.jpg",
						tit: '这是28px大小平方字体并且做了加粗处理行间距是字体大小的1.5倍#33...',
						address: "东湖区",
						addre: "洪城数码广场",
						distance: 690,
						pic: 29,
						pice: 99,
					},
					{
						img: "/static/images/banner.jpg",
						tit: '这是28px大小平方字体并且做了加粗处理行间距是字体大小的1.5倍#33...',
						address: "东湖区",
						addre: "洪城数码广场",
						distance: 690,
						pic: 29,
						pice: 99,
					},

				],
			}
		},
		components: {
			recTwo,
		},
		methods: {
			show() {
				this.isToggle = true
			},
			hide() {
				this.isToggle = false
			},
			btn() {
				let that = this;
				that.red.num = 2.22;
				that.red.txt = "邀请好友一起领取";
				that.red.id = 1;
			}
		}
	}
</script>

<style scoped lang="less">
	/*充值弹窗*/
	.rule-pop {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .3);
		z-index: 99;
		.rule-pop-li {
			width: 335px;
			height: 410px;
			background: #FFFFFF;
			margin: 66px auto 0 auto;
			border-radius: 12px;
			padding: 0 28px;
			box-sizing: border-box;
			.tit {
				text-align: center;
				padding: 30px 0;
				box-sizing: border-box;
				span {
					display: block;
					&:nth-child(1) {
						color: #333333;
						font-size: 17px;
						font-weight: bold;
					}
					&:nth-child(2) {
						width: 33px;
						height: 2px;
						background: #ff4b27;
						margin-top: 6px;
						border-radius: 1px;
						margin: 3px auto 0 auto;
					}
				}
			}
			.cant {
				font-size: 14px;
				color: #333333;
				line-height: 24px;
			}
		}
		.cha {
			span {
				display: block;
				text-align: center;
				&:nth-child(1) {
					width: 2px;
					height: 30px;
					background: #FFFFFF;
					margin: 0 auto;
				}
				&:nth-child(2) {
					line-height: 35px;
					font-size: 40px;
					color: #FFFFFF;
				}
			}
		}
	}
	
	.container-top {
		width: 100%;
		height: 100vh;
		background: #ff6e6e;
		.rule {
			width: 100%;
			display: flex;
			justify-content: flex-end;
			span {
				display: block;
				margin-top: 46px;
				width: 70px;
				height: 33px;
				background: #FFFFFF;
				text-align: center;
				line-height: 33px;
				color: #333333;
				font-size: 13px;
				border-bottom-left-radius: 16.5px;
				border-top-left-radius: 16.5px;
			}
		}
		.red {
			width: 335px;
			height: 350px;
			background: #FFFFFF;
			margin: 46px auto 0 auto;
			border-radius: 12px;
			text-align: center;
			padding: 0 12px;
			box-sizing: border-box;
			.red-tit {
				font-size: 17px;
				color: #333333;
				padding: 24px 0 19px 0;
				box-sizing: border-box;
				font-weight: bold;
			}
			.red-num {
				color: #ff4b27;
				font-size: 33px;
			}
			.des {
				font-size: 10px;
				color: #999999;
				line-height: 17px;
				margin-top: 22px;
				margin-bottom: 16px;
			}
			.xian {
				width: 100%;
				height: 1px;
				background: #ff0000;
			}
			.btn {
				width: 200px;
				height: 54px;
				margin: 33px auto 0 auto;
				border-radius: 27px;
				text-align: center;
				line-height: 54px;
				color: #ffffff;
				font-size: 17px;
				background: #ff6e6e;
			}
			.onbtn{
				background: #ff4b27;
			}
		}
	}
	
	.list-tit {
		position: absolute;
		bottom: -67px;
		width: 100%;
		height: 133px;
		background: #FFFFFF;
		border-radius: 50%;
		text-align: center;
		color: #111111;
		font-size: 15px;
		z-index: 1;
		font-weight: bold;
		span {
			display: block;
			&:nth-child(1) {
				padding-top: 20px;
			}
			&:nth-child(2) {
				width: 33px;
				height: 2px;
				background: #ff4b27;
				border-radius: 1px;
				margin: 8px auto 0 auto;
			}
		}
	}
	
	.container-bottom {
		width: 100%;
		background: #FFFFFF;
		position: relative;
		z-index: 9;
		padding-top: 12px;
	}
</style>