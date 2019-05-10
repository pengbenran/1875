<template>
	<div class="container">
		<div class="logo">
			<img src="/static/images/logo.png">
		</div>
		<div class="inpList">
			<input type="text" placeholder="填写微信号" placeholder-style="color:#999" v-model="applyFrom.wechat">	
		</div>
		<div class="inpList">
			<input type="number" placeholder="填写手机号" placeholder-style="color:#999" v-model='applyFrom.mobile'>	
		</div>
		<div class="inpList">
			<input type="text" placeholder="填写真实姓名" placeholder-style="color:#999" v-model="applyFrom.name">	
		</div>
		<div class="tip">{{tip}}</div>
		<div class="btn" :style="{background:bcg}" @click="distribeApply">
			确认提交
		</div>
	</div>
</template>

<script>
	import Api from '@/api/distribe'
	import store from '@/store/store' 
	import utils from '@/utils/index'
	export default {
		data() {
			return {
			tip:'',
			applyFrom:{
				memberId:'',
				name:'',
				mobile:'',
				wechat:''
			},
			canSubmit:true
			}
		},
		components: {
		 
		},
		computed:{
			bcg(){
				let that=this
				if(that.applyFrom.name==''||that.applyFrom.mobile==''||that.applyFrom.wechat==''){
					return '#99d8ff'
				}
				else{
					return '#26acff'
				}
			}
		},
		methods: {
			distribeApply(){
				let that=this
				that.tip=that.applyFrom.wechat==''?'微信号不能为空':that.applyFrom.mobile==''?'电话号码不能为空':that.applyFrom.name==''?'真实姓名不能为空':''	
				if(that.tip==''&&that.canSubmit){
					that.canSubmit=false
					Api.distribeApply(that.applyFrom).then(function(res){
						if(res.code==0){
						wx.showToast({title: '提交申请成功',icon: 'success',duration: 2000})
						utils.updateUserInfo()
						wx.switchTab({
					      	url:`../index/main`			  	
						})
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
	.logo{
		width: 350px;
		height: 139px;
		overflow: hidden;
		margin: 0 auto;
	}
	img{
		width: 100%;
		height: 100%;
		display: block;
	}
	.inpList{
		width: 250px;
		height: 59px;
		border-radius: 12px;
		background: #f4f4f4;
		margin: 20px auto;
		input{
			width: 100%;
			height: 100%;
			font-size: 15px;
			font-weight: bold;
			color: #333;
			text-align: center;
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
		width: 160px;
		height: 33px;
		border-radius: 16.5px;
		font-size: 14px;
		color: #fff;
		line-height: 33px;
		text-align: center;
		margin:0 auto;
	}
	
</style>