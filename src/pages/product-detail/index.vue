<template>
	<div class="container">
		<!--baner-->

		<div class="box">
			<swiper class="swiper" @change="changeImg" :autoplay="true" :circular="true" :current="activeIndex">
				<div v-for="(item, index) in imagesUrl">
					<swiper-item class="item">
						<img mode="aspectFill" :src="item.img" class="slide-image" />
					</swiper-item>
				</div>
			</swiper>
			<!--圆点-->
			<div class="dot">
				<div class="dot-li" :class="index==activeIndex?'dot-li-on':''" v-for="(item, index) in imagesUrl" @click="dot(index)"> </div>
			</div>
			<div class="total">
			<!--喜欢 -->
			<div class="like" @click="tootle">
				<div class="img" v-if="love"><img src="/static/images/love.png" /></div>
				<div class="img" v-else><img src="/static/images/love1.png" /></div>
				<div class="num">1111</div>
			</div>
             <!--转发-->
             <div class="tra">
             	<div class="img iconfont">&#xe624;</div>
             	<div class="num">1111</div>
             </div>
			<!--电话-->
			<div class="phone"><div class="img iconfont">&#xe7e0;</div></div>
			<!--地址-->
			<div class="site"><div class="img iconfont">&#xe62c;</div></div>
			</div>
			
		</div>

		<!--详情-->
		<div class="list">
			<div class="name">{{options.name}}</div>
			<div class="add">
				<p>{{options.adds}}</p>
				<p> 丨 </p>
				<p>{{options.add}}</p>
			</div>
			<div class="pic">
				<p><span class="rmb">¥</span><span>{{options.pic}}</span></p>
				<p>可得积分:{{options.jf}}</p>
				<p>可得奖金:{{options.jjin}}元</p>
			</div>
			<div class="oldpic">
				<p>¥{{options.oldpic}}</p>
				<p>{{options.pro}}人购买</p>
			</div>
		</div>

		<!--商品详情-->
		<div class="list-detail">
			<div class="tit">
				<span>商品详情</span>
				<span></span>
			</div>
			<div class="list-detail-li">
				<div class="img"><img mode="widthFix" src="/static/images/list.jpg" /></div>
			</div>
		</div>

		<!--底部-->
		<div class="footer">
			<div @click="jumphome" class="home"><span><img src="/static/images/homeselect.png"/></span><span>首页</span></div>
			<div class="rec">推荐分享</div>
			<span class="buy" @click="shopshow">立即购买</span>
		</div>
		<!--购买弹窗-->
		<div class="buy-wp" catchtouchmove :class="show==0?'buy-wp-on':''">
			<div class="buy-pop" :class="show==0?'buy-pop-on':''">
				<!--关闭弹窗-->
				<div class="cha" @click="shophide">×</div>
				<!--商品-->
				<div class="prolist">
					<div class="left"><img :src="options.img" /></div>
					<div class="right">
						<div class="pic"><span>¥</span><span>{{options.pic}}</span></div>
						<div class="num">数量 X1</div>
					</div>
				</div>
				<!--折扣-->
				<div class="discount">
					<!--会员折扣-->
					<div class="discount-member">
						<span>会员折扣 :</span>
						<span>29.00元</span>
					</div>
					<!--积分折扣-->
					<div class="discount-jf">
						<div class="top">
							<span>积分抵扣 :</span>
							<span>(可用积分400)</span>
							<span v-if="hint">不能大于200</span>
						</div>
						<div class="bottom">
							<span><input  @input='inputjf' type="number" placeholder-style='color:#dedede;font-size: 13px;' placeholder="最高可用200积分" v-model="jf"/></span>
							<span>抵扣</span>
							<span v-if="isjf">{{jf}}元</span>
						</div>
					</div>
					<!--奖金折扣-->
					<div class="discount-bonus">
						<div class="top">
							<span>奖金抵扣 :</span>
							<span>(可用积分1000)</span>
							<span v-if="hint1">不能大于200</span>
						</div>
						<div class="bottom">
							<span><input @input='inputBonus' type="number" placeholder-style='color:#dedede;font-size: 13px;' placeholder="最高可用200奖金" v-model="bonus"/></span>
							<span>抵扣</span>
							<span v-if="isbonus">{{bonus}}元</span>
						</div>
					</div>
				</div>
				<!--提交订单-->
				<div class="btn">
					<span>¥23.68</span>
					<span>提交订单</span>
				</div>
				<!--红包折扣-->
				<!--<div class="discount-red">
				<div class="tit">红包抵扣 :</div>
				<div class="discount-red-li" v-for="(item,index) in red">
					<p>签到红包</p>
					<p><span>¥</span><span>{{item.num}}</span></p>
				</div>
			</div>-->
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				showo: false,
				show: 1,
				isbonus: false,
				isjf: false,
				jf: '',
				bonus: '',
				love: true,
				curr: 0,
				imgurl: '',
				activeIndex: 0,
				hint: false,
				hint1: false,
				red: [{
						num: 2.22
					},
					{
						num: 2.22
					},
					{
						num: 2.22
					},
					{
						num: 2.22
					},
					{
						num: 2.22
					},

				],
				imagesUrl: [{
						img: "/static/images/list.jpg"
					},
					{
						img: "/static/images/list.jpg"
					},
					{
						img: "/static/images/list.jpg"
					}
				],
				options: {
					name: '这是28px大小平方字体并且做了加粗处理行间距是42px哦',
					adds: '青山湖区',
					add: ' 一二三四五六七八九十',
					pic: 299,
					jf: 20,
					jjin: 12.34,
					oldpic: 99,
					pro: 266,
					img: '/static/images/list.jpg'
				}
			}
		},

		methods: {
			changeImg(e) {
				let that = this
				that.activeIndex = e.target.current

			},
			//			小点
			dot(e) {
				let that = this
				that.activeIndex = e
			},
			tootle() {
				let that = this
				that.love = !that.love
			},
			jumphome() {
				mpvue.reLaunch({
					url: '../index/main'
				})
			},
			inputjf() {
				//
				if(this.jf > 200) {
					this.jf = ''
					this.hint = true
				} else {
					this.hint = false
				}

				//
				if(this.jf == '') {
					this.isjf = false
				} else {
					this.isjf = true
				}

			},
			inputBonus() {
				//
				if(this.bonus > 200) {
					this.bonus = ''
					this.hint1 = true
				} else {
					this.hint1 = false
				}
				//
				if(this.bonus == '') {
					this.isbonus = false
				} else {
					this.isbonus = true
				}
			},
			shopshow() {
				this.show = 0
			},
			shophide() {
				this.show = 1
			}
		},
		   onShow() {
		   	//重置
		        this.show=1
		        this.jf=''
				this.bonus= ''
				this.isbonus = false
				this.isjf = false
			},
	}
</script>

<style scoped lang="less">
	.box {
		position: relative;
		.swiper {
			width: 100%;
			height: 375px;
		}
		.dot {
			display: flex;
			width: 46px;
			height: 10px;
			justify-content: space-between;
			position: absolute;
			right: 12px;
			bottom: 12px;
			z-index: 9;
			.dot-li {
				width: 10px;
				height: 10px;
				border-radius: 50%;
				background: rgba(255, 255, 255, .4);
			}
			.dot-li-on {
				background: #FFFFFF;
			}
		}
		.total{
			position: absolute;
			left:0;
			bottom: 11px;
			display: flex;
			align-items: center;
			padding-left:12px;
			box-sizing: border-box;
			text-align: center;
			color: #FFFFFF;
			.like,.tra,.phone,.site {			
				width: 37px;
				height: 37px;
				background: rgba(0, 0, 0, .3);
				border-radius: 50%;
				.img {
					width: 23px;
					height: 20px;
					margin: 9px auto;
				}
			}
			.tra{margin-left: 26px;font-size: 16px;}
			.phone{margin-left: 60px;font-size: 21px;.img{margin: 7px auto;}} 
			.site{margin-left: 26px;font-size: 20px;}
			.like,.tra{
				position: relative;
				.num{
					position: absolute;
					top: -8px;
					left: 17px;
					width: 44px;
					height: 16px;
					background: #ff6666;
					text-align: center;
					line-height: 16px;
					color: #FFFFFF;
					font-size: 10px;
					border-radius: 8px;
				}
			}
		}
		
	}
	
	.list {
		padding: 0 12px;
		box-sizing: border-box;
		width: 100%;
		.name {
			font-size: 20px;
			color: #333333;
			line-height: 30px;
			font-weight: bold;
			margin-top: 8px;
		}
		.add {
			line-height: 1;
			p {
				font-size: 14px;
				color: #666666;
				padding: 12px 0;
				display: inline-block;
			}
		}
		.pic {
			display: flex;
			align-items: center;
			p {
				&:nth-child(1) {
					font-size: 22px;
					color: #ff4b27;
					font-weight: bold;
					.rmb {
						font-size: 13px;
					}
				}
				&:nth-child(2) {
					width: 72px;
					height: 16px;
					background: #21a9fd;
					text-align: center;
					line-height: 16px;
					color: #FFFFFF;
					border-radius: 2px;
					font-size: 12px;
					margin-left: 12px;
				}
				&:nth-child(3) {
					margin-left: 12px;
					font-size: 12px;
					width: 102px;
					height: 16px;
					background: #ff6666;
					text-align: center;
					line-height: 16px;
					color: #FFFFFF;
					border-radius: 2px;
				}
			}
		}
		.oldpic {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 6px;
			p {
				&:nth-child(1) {
					color: #999999;
					font-size: 14px;
					text-decoration: line-through;
				}
				&:nth-child(2) {
					font-size: 14px;
					color: #666666;
				}
			}
		}
	}
	
	.list-detail {
		padding: 0 12px 80px 12px;
		box-sizing: border-box;
		width: 100%;
		.tit {
			margin-top: 34px;
			margin-bottom: 16px;
			position: relative;
			span {
				&:nth-child(1) {
					color: #333333;
					font-size: 17px;
					font-weight: bold;
				}
				&:nth-child(2) {
					width: 60px;
					height: 8px;
					background: #ff6666;
					position: absolute;
					left: 0;
					bottom: -1px;
					z-index: -1;
					border-radius: 3px;
				}
			}
		}
		.img {
			border-radius: 4px;
			overflow: hidden;
			width: 100%;
		}
	}
	/*底部*/
	
	.footer {
		display: flex;
		align-items: center;
		width: 100%;
		height: 57px;
		position: fixed;
		bottom: 0;
		z-index: 88;
		.home {
			width: 58px;
			height: 100%;
			line-height: 1;
			background: #fff2f2;
			span {
				display: block;
				margin: 0 auto;
				text-align: center;
				&:nth-child(1) {
					width: 20px;
					height: 20px;
					margin-top: 11px;
				}
				&:nth-child(2) {
					font-size: 10px;
					color: #FF6666;
					margin-top: 6px;
				}
			}
		}
		.rec {
			width: 130px;
			background: #ff9999;
			line-height: 57px;
			text-align: center;
			color: #ffffff;
			font-size: 17px;
			font-weight: bold;
		}
		.buy {
			flex-grow: 1;
			background: #ff6666;
			line-height: 57px;
			text-align: center;
			color: #ffffff;
			font-size: 17px;
			font-weight: bold;
		}
	}
	/*购买弹窗*/
	
	.buy-wp {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .5);
		z-index: 98;
		top: 0;
		left: 0;
		/*transition: all .3s;*/
		visibility: hidden;
	}
	
	.buy-wp-on {
		visibility: visible;
	}
	
	.buy-pop {
		position: absolute;
		z-index: 99;
		bottom: -100%;
		background: #FFFFFF;
		width: 100%;
		visibility: hidden;
		opacity: 0;
		transition: all .3s;
		.cha {
			position: absolute;
			top: 0;
			right: 0;
			width: 45px;
			height: 45px;
			color: #999999;
			font-size: 30px;
			text-align: center;
		}
		.prolist {
			padding: 0 12px;
			box-sizing: border-box;
			display: flex;
			align-items: flex-start;
			width: 100%;
			.left {
				width: 80px;
				height: 80px;
				border-radius: 4px;
				border: 1px solid #FFFFFF;
				overflow: hidden;
				position: relative;
				top: -18px;
			}
			.right {
				line-height: 1;
				margin-left: 12px;
				.pic {
					padding: 12px 0;
					span {
						font-weight: bold;
						color: #FF4B27;
						&:nth-child(1) {
							font-size: 13px;
						}
						&:nth-child(2) {
							font-size: 22px;
						}
					}
				}
				.num {
					color: #666666;
					font-size: 14px;
				}
			}
		}
		.discount {
			padding: 0 12px;
			width: 100%;
			box-sizing: border-box;
			.discount-member {
				padding: 0 0 24px 0;
				span {
					font-size: 15px;
					color: #333333;
					font-weight: bold;
					&:nth-child(2) {
						margin-left: 24px;
					}
				}
			}
			.discount-jf,
			.discount-bonus {
				.top {
					span {
						font-size: 15px;
						color: #333333;
						font-weight: bold;
						&:nth-child(2) {
							margin-left: 24px;
						}
						&:nth-child(3) {
							margin-left: 20px;
							font-size: 13px;
							color: red;
						}
					}
				}
				.bottom {
					display: flex;
					align-items: center;
					margin-top: 12px;
					span {
						display: block;
						margin-left: 30px;
						&:nth-child(1) {
							border-bottom: 1px solid #000000;
							font-size: 15px;
							text-align: center;
							margin-left: 0;
							color: #ff6666;
							input {
								width: 120px;
								height: 37px;
								font-weight: bold;
							}
						}
						&:nth-child(2) {
							font-size: 15px;
							color: #666666;
						}
						&:nth-child(3) {
							font-size: 15px;
							color: #ff6666;
							font-weight: bold;
						}
					}
				}
			}
			.discount-bonus {
				margin-top: 40px;
			}
		}
		.discount-red {
			width: 100%;
			overflow-x: scroll;
			overflow-y: hidden;
			padding-left: 12px;
			box-sizing: border-box;
			white-space: nowrap;
			margin-top: 40px;
			.tit {
				font-size: 15px;
				color: #333333;
				font-weight: bold;
				padding-bottom: 10px;
			}
			.discount-red-li {
				text-align: center;
				display: inline-block;
				width: 120px;
				height: 49px;
				background: #F4F4F4;
				line-height: 1;
				border-radius: 4px;
				margin-left: 8px;
				&:nth-child(1) {
					margin-left: 0;
				}
				p {
					&:nth-child(1) {
						font-size: 12px;
						color: #666666;
						font-weight: bold;
						padding: 7px 0 6px 0;
					}
					&:nth-child(2) {
						span {
							color: #333333;
							font-size: 17px;
							&:nth-child(1) {
								font-size: 12px;
							}
						}
					}
				}
			}
		}
		.btn {
			text-align: center;
			width: 100%;
			height: 57px;
			background: #ff6666;
			margin-top: 38px;
			line-height: 57px;
			span {
				color: #FFFFFF;
				font-size: 17px;
				&:nth-child(2) {
					margin-left: 9px;
				}
			}
		}
	}
	
	.buy-pop-on {
		bottom: 0;
		visibility: visible;
		opacity: 1;
		transition: all .3s;
	}
</style>