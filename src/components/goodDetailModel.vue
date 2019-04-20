<template>	
		<div class="buy-wp" catchtouchmove :class="showModel?'buy-wp-on':''">
			<div class="buy-pop" :class="showModel?'buy-pop-on':''">
				<!--关闭弹窗-->
				<div class="cha" @click="hideModel">×</div>
				<!--商品-->
				<div class="prolist">
					<div class="left"><img :src="goodDetail.thumbnail" /></div>
					<div class="right">
						<div class="pic"><span>¥</span><span>{{goodDetail.price}}</span></div>
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
							<span>(可用积分{{userInfo.point}})</span>
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
				<div class="btn" @click="submit">
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
</template>
<script>   
	import store from '@/store/store'
	import Api from '@/api/order'
	export default {
		data() {
			return {
				isbonus: false,
				isjf: false,
				jf: '',
				bonus: '',
				hint: false,
				hint1: false,
				showModel:false,
				goodDetail:{},
				userInfo:{},
				isSubmit:false,
			}
		},
		mounted(){
			
		},
		methods: {
			openModel() {
				let that=this
				that.showModel=true
				that.goodDetail=store.state.goodDetail
				that.userInfo=store.state.userInfo
				console.log(that.userInfo);
			},
			hideModel(){
				let that=this
				that.showModel=false
			},
			inputjf() {
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
			submit(){
				let that=this
				that.orderSave()
			},
			orderSave(){
				let that=this
				wx.showLoading({
					title: '请稍等',
				})
				let params={}
				if(!that.isSubmit){
					that.isSubmit=true
					if(store.state.codeUnionid!=''&&store.state.goodsId==that.goodDetail.id){
						params.orderType=2
						params.shareIntegration=that.goodDetail.shareIntegral
						params.codeUnionid=''
					}
					else{
						params.orderType=1
						params.shareIntegration=0
					}		
					params.unionId=that.userInfo.unionid
					params.paymentType=1
					params.consumepoint=0
					params.shopsId=that.goodDetail.shopId
					params.goodsAmount=that.goodDetail.price
					params.orderAmount=1
					params.gainedpoint=that.goodDetail.buyIntegral
					params.discount=''
					params.needPayMoney=1
					params.balance=2
					params.recommend=0
					params.goodsId=that.goodDetail.goodId
					params.thumbnail=that.goodDetail.thumbnail
					params.goodName=that.goodDetail.goodName
					params.price=that.goodDetail.price
					params.lineCommission=that.goodDetail.lineCommission
					Api.orderSave(params).then(function(saveRes){
						if(saveRes.code==0){
							wx.hideLoading()
							console.log(saveRes);
							// that.order=saveRes.orderDO
							// that.getQRCode()
						}
					})
						
				}
				
			}

		}
	}
</script>

<style scoped lang="less">
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