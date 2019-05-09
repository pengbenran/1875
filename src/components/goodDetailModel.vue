<template>	
		<div class="buy-wp" catchtouchmove :class="showModel?'buy-wp-on':''"  @click="hideModel">
			<div class="buy-pop" :class="showModel?'buy-pop-on':''" catchtap='inbtn'>
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
						<span>{{userInfo.discount*10}}折</span>
					</div>
					<!--积分折扣-->
					<div class="discount-jf">
						<div class="top">
							<span>积分抵扣 :</span>
							<span>(可用积分{{userInfo.point}})</span>
							<span v-if="hint">{{jftip}}</span>
						</div>
						<div class="bottom">
							<span><input  @input='inputjf' type="number" v-model="jf" placeholder-style='color:#dedede;font-size: 13px;' placeholder="请输入抵扣积分"/></span>
							<span>抵扣</span>
							<span v-if="isjf">{{usePoint}}元</span>
						</div>
					</div>
					<!--奖金折扣-->
					<div class="discount-bonus" v-if="userInfo.distributorStatus==1">
						<div class="top">
							<span>奖金抵扣 :</span>
							<span>(可用奖金{{distribInfo.balance}})</span>
							<span v-if="hint1">{{bonusTip}}</span>
						</div>
						<div class="bottom">
							<span><input @input='inputBonus' type="number" placeholder-style='color:#dedede;font-size: 13px;' placeholder="请输入抵扣金额" v-model="bonus"/></span>
							<span>抵扣</span>
							<span v-if="isbonus">{{bonus}}元</span>
						</div>
					</div>
				</div>
				<!--提交订单-->
				<div class="btn" @click="submit">
					<span>¥{{totalPrice}}</span>
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
	import utils from '@/utils/index'
	export default {
		data() {
			return {
				isbonus: false,
				isjf: false,
				jf:'',
				bonus:'',
				hint: false,
				hint1: false,
				showModel:false,
				goodDetail:{},
				userInfo:{},
				isSubmit:false,
				distribInfo:{},
				config:{},
				jftip:'',
				bonusTip:'',
				order:{}
			}
		},
		mounted(){
			
		},
		computed: {
			totalPrice(){
				let that=this
				let jf=that.jf==''?0:that.jf
				let bonus=that.bonus==''?0:that.bonus
				// 会员折扣之后的价格减去分享师优惠金额
				let accSubRes=utils.accSub((that.goodDetail.price*that.userInfo.discount).toFixed(2),that.goodDetail.commission)
				// 减去积分抵扣之后的金额
				let accSubRes1=utils.accSub(accSubRes,(jf*that.config.pointDeduction).toFixed(2))>0?utils.accSub(accSubRes,(jf*that.config.pointDeduction).toFixed(2)):0.01
				if(accSubRes1-bonus<0){
					bonus=accSubRes1-0.01
					that.bonus=accSubRes1-0.01
					that.hint1 = true
					that.bonusTip="已抵扣最大金额"
				}
				return utils.accSub(accSubRes1,bonus)>0?utils.accSub(accSubRes1,bonus):0.01
			},
			usePoint(){
				let that=this
				return (that.jf*that.config.pointDeduction).toFixed(2)
			}
		},
		methods: {
			openModel() {
				let that=this
				that.showModel=true
				that.isSubmit=false
				that.goodDetail=store.state.goodDetail
				that.userInfo=store.state.userInfo
				that.config=store.state.config
				if(that.userInfo.distributorStatus==1){
					that.distribInfo=store.state.distribInfo
				}
			},
			hideModel(){
				let that=this
				that.showModel=false
				
			},
			inputjf() {
				let that=this
				if(that.jf*that.config.pointDeduction> that.goodDetail.pointAmount) {
					that.jf =that.goodDetail.pointAmount/that.config.pointDeduction
					that.hint = true
					that.jftip='最多可抵扣'+that.goodDetail.pointAmount+'元'
				}
				else if(that.jf>that.userInfo.point){
					that.jf =that.userInfo.point
					that.hint = true
					that.jftip='积分不足'
				}
				 else {
					that.hint = false
				}
				if(that.jf == '') {
					that.isjf = false
				} else {
					that.isjf = true
				}
			},
			inputBonus() {
				//
				let that=this
				if(that.bonus >that.distribInfo.balance) {
					that.hint1 = true
					that.bonusTip="余额不足"
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
				if(that.bonus>that.distribInfo.balance){
					wx.showToast({
						title: '余额不足',
						icon: 'none',
						duration: 2000
					})
				}
				else if(that.jf>that.userInfo.point){
					wx.showToast({
						title: '积分不足',
						icon: 'none',
						duration: 2000
					})
				}
				else{
					that.orderSave()	
				}
				
			},
			orderSave(){
				let that=this
				wx.showLoading({
					title: '请稍等',
				})
				let params={}
				if(!that.isSubmit){
					that.isSubmit=true
					console.log(store.state.goodsId,store.state.codeUnionid);
					if(store.state.codeUnionid!=''&&store.state.goodsId==that.goodDetail.goodId){
						params.orderType=2
						params.shareIntegration=that.goodDetail.shareIntegral
						params.codeunionid=store.state.codeUnionid
					}
					else{
						params.orderType=1
						params.shareIntegration=0
					}		
					params.unionId=that.userInfo.unionid
					if(that.bonus==''){
						// 未使用余额抵扣
						params.paymentType=1
					}
					else{
						// 使用余额抵扣
						params.paymentType=2
					}
					params.consumepoint=that.jf==''?0:that.jf
					params.pointDiscount=that.config.pointDeduction*that.jf
					params.shopId=that.goodDetail.shopId
					params.goodsAmount=that.goodDetail.price
					params.orderAmount=that.totalPrice
					params.gainedpoint=that.goodDetail.buyIntegral
					params.discount=that.userInfo.discount
					params.needPayMoney=that.totalPrice
					params.balance=that.bonus==''?0:that.bonus
                    // 如果是推荐师返佣金额为商品设定价格否则为0
					params.recommend=that.goodDetail.commission
					params.goodsId=that.goodDetail.goodId
					params.buyName=that.userInfo.name
					params.price=that.goodDetail.price
					params.lineCommission=that.goodDetail.lineCommission
					Api.orderSave(params).then(function(saveRes){
						if(saveRes.code==0){
							wx.hideLoading()
							that.order=saveRes.OrderEntity
							that.weixinPay()
						}
					})
						
				}
				
			},
			weixinPay(){
				let params={}
				let that=this
				params.orderId = that.order.orderId
				params.openId=that.userInfo.xopenid
	            // params.total_fee = that.order.needPayMoney*100
	            params.payAmount=1
	            Api.prepay(params).then(function(parRes){
	            	wx.requestPayment({
	            		timeStamp: parRes.Map.timeStamp,
	            		nonceStr: parRes.Map.nonceStr,
	            		package: parRes.Map.package,
	            		signType: parRes.Map.signType, 
	            		paySign: parRes.Map.paySign,
	            		success: function (res) {
	            			wx.showToast({
	            				title: '支付成功',
	            				icon: 'success',
	            				duration: 2000
	            			})
	            			that.payOrder()
	            		},
	            		fail: function (res) {
		                        // fail
		                        console.log('res',res);
		                        wx.showToast({
		                        	title: '支付失败',
		                        	icon: 'success',
		                        	duration: 2000
		                        })
		                    },
		                    complete: function (complete) {
		                        // complete   
		                        that.isSubmit=false
		                    }
		                })
	            })
	        },
	        async payOrder(){
	        	// 订单支付成功之后修改订单状态
	        	let that=this
	        	let statuParam={}
	        	statuParam.orderId=that.order.orderId
	        	let payOrder=await Api.payOrder(statuParam)
	        	if(payOrder.code==0){
	        		utils.updateUserInfo()
	        		wx.redirectTo({
	        			url: '../myself-order-detail/main?orderId='+that.order.orderId
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