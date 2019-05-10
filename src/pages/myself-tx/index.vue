<template>
	<div class="container">
		<blockquote v-if="!applySuccess">
			<div class="tit">
				<span>到账银行卡</span>
				<span>{{cardInfo.depositBank}}({{caudadNumber}})</span>
				<span class="iconfont">&#xe625;</span>
			</div>
			<div class="txt">提现金额</div>
			<div class="inp">
				<span>¥</span>
				<span><input type="number" v-model="withdrawal" placeholder="请输入提现金额" /></span>
			</div>
			<div class="name">当前可提奖金{{distribInfo.balance}}元</div>
			<div class="tip">{{tip}}</div>
			<div :class="withdrawal==''?'':'btn-on'" class="btn" @click="withdrawalSubmit">提现</div>
		</blockquote>
		<!--提现成功弹窗-->		
		<div class="pop" v-else>
			<div class="iconfont img">&#xe630;</div>
			<div class="cg">提现申请成功</div>
			<div class="wc" @click='closeModel'>完成</div>
		</div>	
	</div>
</template>
<script>
	import store from '@/store/store'
	import Api from '@/api/distribe'
	import utils from '@/utils/index'

	export default {
		data() {
			return {
				withdrawal:'',
				cardInfo:{},
				userInfo:{},
				distribInfo:{},
				tip:'',
				canSubmit:true,
				applySuccess:false
			}
		},
 		computed:{
 			caudadNumber(){
 				let that=this
 				let str=that.cardInfo.cardno.replace(/\s*/g,"")
 				return str.substring(str.length-4)
 			}
 		},
 		watch:{
 			withdrawal(val){
 				let that=this
 				that.tip=val>that.distribInfo.balance?'奖金不足':''
 			}
 		},
		methods: {
			withdrawalSubmit(){
				let that=this
				that.tip=that.withdrawal==''?'提现金额不能为空':that.withdrawal<1?'提现金额不能低于1元':that.withdrawal>that.distribInfo.balance?'奖金不足':''
				if(that.canSubmit&&that.tip==''){
					wx.showModal({
						title: '到账银行卡号',
						content: that.cardInfo.cardno,
						confirmText:'无误',
						cancelText:'有误',
						success(res) {
							if (res.confirm) {				
								that.canSubmit=false
								let params={}
								params.distributorId=that.distribInfo.distributorId
								params.money=that.withdrawal
								Api.withdrawApply(params).then(function(res){
									that.canSubmit=true
									if(res.code==0){
										utils.updateUserInfo()
										that.applySuccess=true
									}

								})
							} else if (res.cancel) {
								let url=`../bindCard/main?type=1`
								wx.navigateTo({
									url:url
								})
							}
						}
					})
				}
			},
			closeModel(){
				let that=this
				that.userInfo=store.state.userInfo
				if(that.userInfo.distributorStatus==1){
					that.distribInfo=store.state.distribInfo
				}
				that.withdrawal=''
				that.applySuccess=false
			}
		},
		onLoad(options) {
			let that = this
			that.userInfo=store.state.userInfo
			if(that.userInfo.distributorStatus==1){
				that.distribInfo=store.state.distribInfo
			}
			that.cardInfo=store.state.cardInfo
		}
	}
</script>

<style scoped lang="less">
	.container {
		line-height: 1;
		width: 100%;
		padding: 0 30px;
		box-sizing: border-box;
		.tit {
			font-size: 15px;
			color: #333333;
			padding: 40px 0 60px 0;
			span{
				&:nth-child(2){
					font-size: 15px;
					color: #26ACFF;
					margin-left: 28px;
				}
				&:nth-child(3){ 
                      color:#b2e2ff;
                      margin-left: 4px;
				}
			}
		}
		.txt {
			font-size: 15px;
			color: #333333;
			padding-bottom: 25px;
		}
		.inp {
			width: 100%;
			border-bottom: 1px solid #999999;
			display: flex;
			padding-bottom: 10px;
			box-sizing: border-box;
			span {
				&:nth-child(1) {
					font-size: 33px;
					color: #333333;
					font-weight: bold;
				}
				&:nth-child(2) {
					flex-grow: 1;
					box-sizing: border-box;
					input {
						height: 100%;
						width: 100%;
						font-size: 27px;
						color: #333333;
						font-weight: bold;
						padding-left:5px; 
					}
				}
			}
		}
		.name{
			font-size: 13px;
			color: #999999;
			margin-top: 12px;
		}
		.tip{
			text-align: center;
			height: 40px;
			line-height:40px;
			color: #ff0000;
			font-size: 13px;
		}
		.btn{
			width: 160px;
			height: 33px;
			background: #26acff;
			text-align: center;
			line-height: 33px;
			margin: 36px auto;
			border-radius: 16.5px;
			color: #FFFFFF;
			font-size: 14px;
		}
		.btn-on{
			background: #99d8ff;
			color: #f9f9f9;
		}
	}
	/*提现成功弹窗*/
.pop{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background: #FFFFFF;
	z-index: 99;
	.img{
		width: 80px;
		height: 80px;
		background: #26acff;
		border-radius: 50%;
		font-size: 40px;
		color: #FFFFFF;
		text-align: center;
		line-height: 80px;
		margin: 80px auto 16px auto;
	}
	.cg{
		font-size: 17px;
		color: #333333;
		font-weight: bold;
		text-align: center;
	}
	.wc{
		width: 160px;
		height: 33px;
		border-radius: 17px;
		border: 1px solid #26ACFF;
		margin: 0 auto;
		text-align: center;
		line-height: 33px;
		color: #26acff;
		font-size: 14px;
		font-weight: bold;
		margin-top: 244px;
	}
}
</style>