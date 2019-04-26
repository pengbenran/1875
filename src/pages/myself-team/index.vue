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
			<!--vip1-->
			<swiper-item style="overflow: scroll;">
				<div class="list">
					<div class="tatil">123人</div>
					<div class="list-li" v-for="(item,index) in list1">
						<div class="left">
							<div class="img"><img :src="item.img" /></div>
							<div class="name">
								<p>{{item.name}}</p>
								<p>累计积分 : {{item.jf}}</p>
							</div>
						</div>
						<div class="right">{{item.time}}</div>
					</div>
				</div>
			</swiper-item>
			<!--vip2-->
			<swiper-item style="overflow: scroll;">
				<div class="list">
					<div class="tatil">123人</div>
					<div class="list-li" v-for="(item,index) in list2">
						<div class="left">
							<div class="img"><img :src="item.img" /></div>
							<div class="name">
								<p>{{item.name}}</p>
								<p>累计积分 : {{item.jf}}</p>
							</div>
						</div>
						<div class="right">{{item.time}}</div>
					</div>
				</div>
			</swiper-item>
			<!--vip3-->
			<swiper-item style="overflow: scroll;">
				<div class="list">
					<div class="tatil">123人</div>
					<div class="list-li" v-for="(item,index) in list3">
						<div class="left">
							<div class="img"><img :src="item.img" /></div>
							<div class="name">
								<p>{{item.name}}</p>
								<p>累计积分 : {{item.jf}}</p>
							</div>
						</div>
						<div class="right">{{item.time}}</div>
					</div>
				</div>
			</swiper-item>
			<!--银牌师-->
			<swiper-item style="overflow: scroll;">
				<div class="list">
					<div class="tatil">123人</div>
					<div class="list-li" v-for="(item,index) in list4">
						<div class="left">
							<div class="img"><img :src="item.img" /></div>
							<div class="name">
								<p>{{item.name}}</p>
								<p>累计积分 : {{item.jf}}</p>
							</div>
						</div>
						<div class="right">{{item.time}}</div>
					</div>
				</div>
			</swiper-item>
			<!--金牌师-->
			<swiper-item style="overflow: scroll;">
				<div class="list">
					<div class="tatil">123人</div>
					<div class="list-li" v-for="(item,index) in list5">
						<div class="left">
							<div class="img"><img :src="item.img" /></div>
							<div class="name">
								<p>{{item.name}}</p>
								<p>累计积分 : {{item.jf}}</p>
							</div>
						</div>
						<div class="right">{{item.time}}</div>
					</div>
				</div>
			</swiper-item>
			<!--钻石师-->
			<swiper-item style="overflow: scroll;">
				<div class="list">
					<div class="tatil">123人</div>
					<div class="list-li" v-for="(item,index) in list6">
						<div class="left">
							<div class="img"><img :src="item.img" /></div>
							<div class="name">
								<p>{{item.name}}</p>
								<p>累计积分 : {{item.jf}}</p>
							</div>
						</div>
						<div class="right">{{item.time}}</div>
					</div>
				</div>
			</swiper-item>

		</swiper>

	</div>
</template>
<script>
import API_D from '@/api/distribe'
import API_M from '@/api/member'
	export default {
		data() {
			return {
				listcurr: 0,
				list1: [{
						name: "AAAAAA",
						time: "12月15-2018",
						jf: 3000,
						img: '/static/images/ku5p0efhhxr5.jpg'
					},
					{
						name: "AAAAAA",
						time: "12月15-2018",
						jf: 3000,
						img: '/static/images/ku5p0efhhxr5.jpg'
					},
				],
				list2: [{
						name: "AAAAAA",
						time: "12月15-2018",
						jf: 3000,
						img: '/static/images/ku5p0efhhxr5.jpg'
					},
					{
						name: "AAAAAA",
						time: "12月15-2018",
						jf: 3000,
						img: '/static/images/ku5p0efhhxr5.jpg'
					},
				],
				list3: [{
						name: "AAAAAA",
						time: "12月15-2018",
						jf: 3000,
						img: '/static/images/ku5p0efhhxr5.jpg'
					},
					{
						name: "AAAAAA",
						time: "12月15-2018",
						jf: 3000,
						img: '/static/images/ku5p0efhhxr5.jpg'
					},
				],
				recommendList: [],
			}
		},
		onLoad() {
			let that = this
			//重置
			that.listcurr = 0
			that.GetMenberLv();
			that.GetDistributor();
		},
		methods: {
			listTab(e) {
				this.listcurr = e
			},
			changeTab(e) {
				let that = this
				that.listcurr = e.mp.detail.current
			},

			//拿到所有会员等级
			GetMenberLv(){
				let that = this;
				let arr = []
				API_M.GetMenberLvData().then(res =>{
					console.log("会员数据",res)
					if(res.code == 0){
						// that.recommendList = res.lvs
						res.lvs.map(Mres => {
						   let _Data = {}
						   _Data.name = Mres.name;
						   _Data.id = Mres.lvId;
						   _Data.type = 1;
						   arr.push(_Data)
						})
						that.recommendList = that.recommendList.concat(arr)
					}
				}).catch(err => {
					console.log("报错的数据",err)
				})
			},

			//获取分享师的等级
			GetDistributor(){
				let that = this;
				let arr = []
				API_D.GetDistributorData().then(res => {
					console.log("分享师的等级",res)
					if(res.code == 0){
						res.distributorLvs.map(Mres => {
							let _Data = {}
						   _Data.name = Mres.name;
						   _Data.id = Mres.distributorLvId;
						   _Data.type = 2;
						   arr.push(_Data)
						})
						that.recommendList = that.recommendList.concat(arr)
					}
				}).catch(err => {
					console.log("报错的数据",err)
				})
			},
		},
	}
</script>

<style scoped lang="less">
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