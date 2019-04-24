<template>
	<div class="container">
		<div class="tit">提现到微信零钱</div>
		<div class="txt">提现金额</div>
		<div class="inp">
			<span>¥</span>
			<span><input type="number" v-model="txet" @input="bindReplaceInput"/></span>
		</div>
		<div class="name">当前可提奖金100元</div>
		<div :class="txet==''?'btn-on':''" class="btn">提现</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				txet: '',
			}
		},

		methods: {
           bindReplaceInput(e){
//         	console.log(e)
           }
		},
		onLoad() {
			let that = this
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