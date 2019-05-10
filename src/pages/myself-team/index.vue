<template>
	<div class="container">
		<!--类目-->
		<div class="recommend-list">
			<div class="recommend-list-li" v-for="(item,index) in recommendList" @click="listTab(index)" :class="listcurr==index?'list-on':''">
				<div class="name">
					{{item.name}}
				</div>
			</div>
		</div>
		<swiper style="height:100vh" duration='350' :current="listcurr" @change="changeTab">
			<blockquote v-for="(item,index) in recommendList" :key="item" :index="index">
			<swiper-item style="overflow: scroll;">
				<div v-if="item.total!==0" class="list">
					<div class="tatil">{{item.total}}人</div>
					<div class="list-li" v-for="(itemc,ind) in item.options" :key="itemc">
						<div class="left">
							<div class="img"><img :src="itemc.face" /></div>
							<div class="name">
								<p>{{itemc.memberName}}</p>
								<p>消耗积分 : {{itemc.consumePoint}}</p>
							</div>
						</div>
						<div class="right">{{itemc.boundTime}}</div>
					</div>
				</div>
				       <!--空-->
		       <div v-if="item.total==0" class="kong">
		       	<div class="img"><img src="/static/images/kong.png"/></div>
		       	<div class="text">暂无队友，快去邀请吧~</div>
		       	<div class="btn" @click="toShear">去邀请</div>
		      </div>
       
			</swiper-item>
			</blockquote>
		</swiper>
	</div>
</template>
<script>
import API_D from '@/api/distribe'
import API_M from '@/api/member'
import store from '@/store/store'
	export default {
		data() {
			return {
				listcurr: 0,
				recommendList: [],
				userInfo:{}
			}
		},
		async onLoad() {
			let that = this
			that.recommendList = [];
	        that.userInfo=store.state.userInfo
			//重置
			that.listcurr = 0
			await that.GetMenberLv();
			await that.GetDistributor();
			this.recommendList[0].type == 1 ?
						this.GetList(0,{tjUnionid:this.userInfo.unionid,lvId:this.recommendList[0].id}):
						this.GetList(0,{tjUnionid:this.userInfo.unionid,distributorLvId:this.recommendList[0].id,distributorStatus:1})
		},
		methods: {
			listTab(e) {
				this.listcurr = e
			},
			changeTab(e) {
				let that = this
				that.listcurr = e.mp.detail.current
				this.recommendList[that.listcurr].type == 1 ?
						this.GetList(that.listcurr,{tjUnionid:this.userInfo.unionid,lvId:this.recommendList[that.listcurr].id}):
						this.GetList(that.listcurr,{tjUnionid:this.userInfo.unionid,distributorLvId:this.recommendList[that.listcurr].id,distributorStatus:1})
			},

			//拿到所有会员等级
			async GetMenberLv(){
				let that = this;
				let arr = []
				let res = await API_M.GetMenberLvData().catch(err => {
					console.log("报错的数据",err)
				})
				if(res.code == 0){
						// that.recommendList = res.lvs
						res.lvs.map(Mres => {
						   let _Data = {}
						   _Data.name = Mres.name;
						   _Data.id = Mres.lvId;
						   _Data.type = 1;
						   _Data.options = [];
						   _Data.total = 0;
						   arr.push(_Data)
						})
						that.recommendList = that.recommendList.concat(arr)
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
						res.distributorLvs.map(Mres => {
							let _Data = {}
						   _Data.name = Mres.name;
						   _Data.id = Mres.distributorLvId;
						   _Data.type = 2;
						   _Data.options = [];
						   _Data.total = 0;
						   arr.push(_Data)
						})
						that.recommendList = that.recommendList.concat(arr)
				}
			},

			GetList(index,data){
				let that = this;
				API_M.GetLvDtaLits(data).then(res => {
					console.log(res,"拿到的数据")
					if(res.code == 0){
						that.recommendList[index].options = res.page.rows
						that.recommendList[index].total =  res.page.total
					}
				}).catch(err => {
				   console.log("报错的数据",err)
				})
			},

			toShear(){
				wx.navigateTo({
					url:'../poster/main',
				})
			},
		},
	}
</script>

<style scoped lang="less">
/*空*/
.kong{
	margin-top: 50px;
	line-height: 1;
	.img{
		width: 191px;
		height: 78px;
		margin: 0 auto;
	}
	.text{
		font-size: 17px;
		color: #333333;
		text-align: center;
		padding: 35px 0 30px;
	}
	.btn{
		width: 80px;
		height: 33px;
		border: 1px solid;
		border-radius: 17px;
		text-align: center;
		margin: 0 auto;
		color: #ff6e6e;
		font-size: 14px;
		font-weight: bold;
		line-height: 33px;
	}
}
	swiper-item {
		width: 100%;
		box-sizing: border-box;
		padding: 70px 12px 40px 12px;
	}
	
	.recommend-list {
		background: #FFFFFF;
		height: 49px;
		width: 100%;
		display: flex;
		justify-content: space-around;
		position: absolute;
		top: 0;
		z-index: 99;
		.recommend-list-li {
			height: 49px;
			line-height: 49px;
			position: relative;
			display: block;
			text-align: center;
			span {
				display: inline-block;
			}
			.name {
				transition: all 0.5s;
				font-size: 14px;
				color: #333333;
				display: inline-block;
				height: 30px;
				border-radius: 3px;
				padding: 0 2px;
				border-bottom: 6px solid transparent;
			}
		}
		.list-on {
			.name {
				transition: all 0.5s;
				border-bottom: 6px solid #ff6e6e;
				font-weight: bold;
			}
		}
	}
	
	.list {
		.tatil {
			font-size: 33px;
			color: #999999;
			font-weight: bold;
		}
		.list-li {
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #DEDEDE;
			padding: 12px 0;
			&:nth-child(2) {
				padding: 30px 0 12px 0;
			}
			.left {
				display: flex;
				align-items: center;
				.img {
					width: 53px;
					height: 53px;
					border-radius: 50%;
					overflow: hidden;
				}
				.name {
					margin-left: 11px;
					font-size: 17px;
					color: #333333;
					p {
						&:nth-child(2) {
							font-size: 14px;
							color: #999999;
						}
					}
				}
			}
			.right {
				font-size: 11px;
				color: 666666;
			}
		}
	}
</style>