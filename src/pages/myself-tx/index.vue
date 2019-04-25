<template>
	<div class="container">
		<div class="tit">
			<span>到账银行卡</span>
			<span> 添加银行卡</span>
			<span class="iconfont">&#xe625;</span>
		</div>
		<div class="txt">提现金额</div>
		<div class="inp">
			<span>¥</span>
			<span><input type="number" v-model="txet" @input="bindReplaceInput"/></span>
		</div>
		<div class="name">当前可提奖金{{distribInfo.balance}}元</div>
		<div :class="txet==''?'btn-on':''" class="btn">提现</div>
		
		<!--提现成功弹窗-->		
		<div class="pop" v-if="false">
			<div class="iconfont img">&#xe630;</div>
			<div class="cg">已成功提现到银行卡</div>
			<div class="wc">完成</div>
		</div>	
	</div>
</template>
<script>
	import store from '@/store/store'
	export default {
		data() {
			return {
				txet: '',
				cardInfo:{},
				userInfo:{},
				distribInfo:{}
			}
		},

		methods: {
           bindReplaceInput(e){
//         	console.log(e)
           }
		},
		onLoad(options) {
			let that = this
			that.userInfo=store.state.userInfo
			if(that.userInfo.distributorStatus==1){
				that.distribInfo=store.state.distribInfo
			}
			that.cardInfo=options
			that.txet = ''
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
			position: relative;
			span {
				display: block;
				&:nth-child(1) {
					font-size: 33px;
					color: #333333;
					font-weight: bold;
					position: absolute;
					bottom: 15px;
				}
				&:nth-child(2) {
					width: 100%;
					border-bottom: 1px solid #999999;
					padding-left: 28px;
					padding-bottom: 15px;
					box-sizing: border-box;
					input {
						font-size: 33px;
						color: #333333;
						font-weight: bold;
						
					}
				}
			}
		}
		.name{
			font-size: 13px;
			color: #999999;
			margin-top: 12px;
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