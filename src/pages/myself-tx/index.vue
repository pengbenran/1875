<template>
	<div class="container">
		<div class="tit">
			<p>提现到银行卡</p>
			<p style="height: 30px;line-height:30px;">{{cardInfo.cardno}}({{cardInfo.depositBank}})</p>
		</div>
		<div class="txt">提现金额</div>
		<div class="inp">
			<span>¥</span>
			<span><input type="number" v-model="txet" @input="bindReplaceInput"/></span>
		</div>
		<div class="name">当前可提奖金{{distribInfo.balance}}元</div>
		<div :class="txet==''?'btn-on':''" class="btn">提现</div>
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
			padding: 40px 0 50px 0;
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
</style>