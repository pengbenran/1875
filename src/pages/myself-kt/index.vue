<template>
	<div class="container">
		<swiper vertical style='height: 100vh;'>
			<swiper-item style='height: 100vh; background: #262d7b;'>
				<!--vip-->
				<div class="equities">
					<div class="tit">VIP等级及权益</div>
					<div class="text">通过购买商品、邀请好友、分享商品可以获取更多积分进行等级升级。</div>
					<div class="tatil">
						<div class="vip1"><img :src="vip.vip1"/></div>
						<div class="progress">
							<progress :percent="vip1Length"  color="#b275e8" backgroundColor="#634ba5"/>
						</div>
						<div class="vip2"><img :src="vipon.vip2"/></div>
						<div class="progress">
							<progress :percent="vip2Length" color="#b275e8" backgroundColor="#634ba5"/>
						</div>
						<div class="vip3"><img :src="vipon.vip3"/></div>
					</div>
				</div>			
				<!--分享师-->
				<div class="equities1">
					<div class="tit">分享师等级及权益</div>
					<div class="text">开通分享师身份后，购买商品可以优惠，邀请好友、分享商品可获得奖金并升级。</div>
					<div class="tatil">
						<div class="vip1"><img :src="shareon.vip1"/></div>
						<div class="progress">
							<progress :percent="vip1Length"  color="#ced1e5" backgroundColor="#71749b"/>
						</div>
						<div class="vip2"><img :src="shareon.vip2"/></div>
						<div class="progress">
							<progress :percent="vip2Length" color="#ced1e5" backgroundColor="#71749b"/>
						</div>
						<div class="vip3"><img :src="shareon.vip3"/></div>
					</div>
				</div>
				<div v-if="userInfo.distributorStatus == 2">
                    <div class="btn" v-if="bool">你已提交申请</div><div class="btn" v-else @click="to">{{kttit}}</div>
				</div>
				<div v-else>
                    <!-- <div class="btn" v-if="bool">提交申请成为推荐师</div> -->
				</div>
				
			</swiper-item>
		</swiper>
	</div>
</template>

<script>
import API from '@/api/distribe'
import store from '@/store/store'
import API_D from '@/api/distribe'
import API_M from '@/api/member'
	export default {
		data() {
			return {
				kttit:"开通分享师",
				VipData:[],
				DisData:[],
				userInfo:{},
				bool:false,
                //vip
				vip1Length:20,  //进度条长度
				vip2Length:20,  //进度条长度
				//点亮前
				vipon:{
					vip1:"/static/images/VIP1-on.png",
					vip2:"/static/images/VIP2-on.png",
					vip3:"/static/images/VIP3-on.png"
				},
				//点亮后
				vip:{
					vip1:"/static/images/VIP1.gif",
					vip2:"/static/images/VIP2.gif",
					vip3:"/static/images/VIP3.gif"
				},
				vip1Length:20,  //进度条长度
				vip2Length:20,  //进度条长度
				
				//分享师
				//点亮前
				shareon:{
					vip1:"/static/images/share1-on.png",
					vip2:"/static/images/share2-on.png",
					vip3:"/static/images/share3-on.png"
				},
				//点亮后
				share:{
					vip1:"/static/images/share1.gif",
					vip2:"/static/images/share2.gif",
					vip3:"/static/images/share3.gif"
				},
			}
		}, 

		methods: {
			//拿到所有会员等级
			async GetMenberLv(){
				let that = this;
				let arr = []
				let res = await API_M.GetMenberLvData().catch(err => {
					console.log("报错的数据",err)
				})
				if(res.code == 0){
						that.VipData = res.lvs
						console.log("VIP数据",that.VipData)
				}
			},

			//获取分享师的等级
			async GetDistributor(){
				let that = this;
				let arr = []
				let res = await API_D.GetDistributorData().catch(err => {
					console.log("报错的数据",err)
				})
				if(res.code == 0){
						that.DisData = res.distributorLvs
						console.log("请求的数据",that.DisData)
				}
			},
			GetDisBool(){
			   let that = this;
			   let data = {
				   memberId:that.userInfo.memberId
			   }
               API.boolDis(data).then(res =>{
				   if(res.code == 0){
					   that.bool = true;
				   }else{
					   that.bool = false;
				   }
			   }).catch(err => {
				   console.log("数据报错",err)
			   })
			},
			to(){
				let that = this;
					wx.navigateTo({
					   url:`../distribeApply/main`			  	
					})
			}
		},
		mounted(){
			this.userInfo=store.state.userInfo
			this.GetDisBool();
			this.GetMenberLv();
			this.GetDistributor();
		}
	}
</script>

<style scoped lang="less">
.container{
	background: #262d7b;	
	.equities,.equities1{
	 padding: 0 20px;
		.tit{
  		      font-size: 25px;
  		      color: #e5e8ff; 
  		      margin-top: 30px;
		}
		.text{
			font-size: 14px;
			color: #ccd0ff;
			width: 252px;
			line-height: 24px;
			margin-top: 20px;
		}
		.tatil{
			display: flex;
			align-items: center;
			margin-top: 40px;
			.vip1,.vip2,.vip3{
				width: 74px;
				height: 27px;
			}
			.progress{
				flex-grow: 1;
			}
		}
	}
	.equities1{
		 margin-top: 76px;
	}
	.btn{
		width: 160px;
		height: 33px;
		line-height: 33px;
		border-radius: 16.5px;
		background: #26acff;
		text-align: center;
		color: #f9f9f9;
		font-size: 14px;
		margin: 52px auto;
	}
}
</style>