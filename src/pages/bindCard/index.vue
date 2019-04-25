<template>
	<div class="container">
		<div class="title">请绑定本人银行卡</div>
		<div class="inpList">
			<label>持卡人</label>
			<input type="text" placeholder="请输入持卡人姓名" placeholder-style="color:#999" v-model="applyFrom.name">	
		</div>
		<div class="inpList">
			<label>开户银行</label>
			<input type="text" placeholder="请输入开户银行" placeholder-style="color:#999" v-model="applyFrom.depositBank">	
		</div>
		<div class="inpList">
			<label>卡号</label>
			<input type="text" placeholder="请输入银行卡卡号" placeholder-style="color:#999" v-model='applyFrom.cardno'>	
		</div>
		<div class="inpList">
			<label>确认卡号</label>
			<input type="text" placeholder="请再次输入银行卡卡号" placeholder-style="color:#999" v-model="cardnoTwo">	
		</div>
		<div class="tip">{{tip}}</div>
		<div class="btn" :style="{background:bcg}" @click="submitBankCard">
			添加
		</div>
	</div>
</template>

<script>
	import Api from '@/api/distribe'
	import store from '@/store/store' 
	export default {
		data() {
			return {
			tip:'',
			applyFrom:{
				memberId:'',
				name:'',
				cardno:'',
				depositBank:''
			},
			canSubmit:true,
			cardnoTwo:''
			}
		},
		components: {
		
		},
		watch:{
			cardno(val){
				let that=this
				that.applyFrom.cardno = val.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
				if (that.applyFrom.cardno.charAt(that.applyFrom.cardno.length - 1) == ' ') {
					that.applyFrom.cardno = that.applyFrom.cardno.substring(0, that.applyFrom.cardno.length - 1);
				}
			},
			cardnoTwo(val){
				let that=this
				that.cardnoTwo = val.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
				if (that.cardnoTwo.charAt(that.cardnoTwo.length - 1) == ' ') {
					that.cardnoTwo = that.cardnoTwo.substring(0, that.cardnoTwo.length - 1);
				}
				that.tip=that.applyFrom.cardno.indexOf(that.cardnoTwo)==-1?'两次卡号不一致':''
			}
		},
		computed:{
			cardno(){
				return this.applyFrom.cardno
			},
			bcg(){
				let that=this
				if(that.applyFrom.name==''||that.applyFrom.cardno==''||that.applyFrom.depositBank==''||that.cardnoTwo==''){
					return '#99d8ff'
				}
				else{
					return '#26acff'
				}
			}
		},
		methods: {
			submitBankCard(){
				let that=this
				that.tip=that.applyFrom.name==''?'持卡人姓名不能为空':that.applyFrom.depositBank==''?'开户银行不能为空':that.applyFrom.cardno==''?'银行卡卡号不能为空':that.applyFrom.cardno!=that.cardnoTwo?'两次卡号不一致':''	
				if(that.tip==''&&that.canSubmit){
					that.canSubmit=false
					Api.bindCard(that.applyFrom).then(function(res){
						console.log(res)
						if(res.code==0){
						wx.showToast({title: '提交申请成功',icon: 'success',duration: 2000})
						}
						else{
							wx.showToast({title: '提交申请失败,请重新提交',icon: 'none',duration: 2000})
							that.canSubmit=true
						}
					})
				}
			}
		},
		mounted() {
			let that=this
			that.applyFrom.memberId=store.state.userInfo.memberId
		},
	}
</script>

<style scoped lang="less">
	/*导航*/
	.title{
		width: 100%;
		height: 68px;
		line-height:68px;
		font-size: 13px;
		color: #999;
	}
	.container{
		padding: 0 20px;
		box-sizing: border-box;
	}
	.inpList{
		width: 250px;
		height: 50px;
		border-radius: 12px;
		display: flex;
		label{
			font-size: 15px;
			width: 100px;
			line-height:50px;
		}
		input{
			width: 100%;
			height: 100%;
			font-size: 15px;
			color: #333; 
		}
	}
	.tip{
		text-align: center;
		height: 40px;
		line-height:40px;
		color: #ff0000;
		font-size: 13px;
	}
	.btn{
		width: 158px;
		height: 33px;
		border-radius: 16.5px;
		font-size: 14px;
		color: #fff;
		line-height: 33px;
		text-align: center;
		margin:0 auto;
	}
	
</style>