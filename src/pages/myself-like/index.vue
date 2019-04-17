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
			<!--可使用-->
			<swiper-item style="overflow: scroll;">  
				<div class="list1">
					<div class="list-li" v-for="(item,index) in list1">
						<div class="list-left">
							<span>¥</span>
							<span>{{item.pic}}</span>
						</div>
						<div class="list-cant">
							<p>签到红包</p>
							<p>使用时间</p>
							<p>{{item.time}}</p>
						</div>
						<div class="list-right">{{item.status}}</div>
					</div>
				</div>
			</swiper-item>
			<!--已使用-->
			<swiper-item style="overflow: scroll;">
				<div class="list2">
					<div class="list-li" v-for="(item,index) in list2">
						<div class="list-left">
							<span>¥</span>
							<span>{{item.pic}}</span>
						</div>
						<div class="list-cant">
							<p>签到红包</p>
							<p>使用时间</p>
							<p>{{item.time}}</p>
						</div>
						<div class="list-right">{{item.status}}</div>
					</div>
				</div>
			</swiper-item>
			<!--已过期-->
			<swiper-item style="overflow: scroll;">
				<div class="list3">
					<div class="list-li" v-for="(item,index) in list3">
						<div class="list-left">
							<span>¥</span>
							<span>{{item.pic}}</span>
						</div>
						<div class="list-cant">
							<p>签到红包</p>
							<p>使用时间</p>
							<p>{{item.time}}</p>
						</div>
						<div class="list-right">{{item.status}}</div>
					</div>
				</div>
			</swiper-item>

		</swiper>

	</div>
</template>
<script>
	export default {
		data() {
			return {
				listcurr: 0,
				list1:[
				   {pic:"2.22",time:"2019.03.29-2019.03.30",status:"去使用"},
				   {pic:"2.22",time:"2019.03.29-2019.03.30",status:"去使用"}
				],
				list2:[
				   {pic:"2.22",time:"2019.03.29-2019.03.30",status:"已使用"},
				   {pic:"2.22",time:"2019.03.29-2019.03.30",status:"已使用"}
				],
				list3:[
				   {pic:"2.22",time:"2019.03.29-2019.03.30",status:"已过期"},
				   {pic:"2.22",time:"2019.03.29-2019.03.30",status:"已过期"}
				],
				recommendList: [{
						name: "可使用"
					},
					{
						name: "已使用"
					},
					{
						name: "已过期"
					},
				],
			}
		},
       	onLoad(){
			let that = this
			//重置
			that.listcurr=0
		},
		methods: {
			listTab(e) {
				this.listcurr = e
			},
			changeTab(e) {
				let that = this
				that.listcurr = e.mp.detail.current
			},
		},
	}
</script>

<style scoped lang="less">
.container{
		background: #F4F4F4;
}
swiper-item{
	width: 100%;
	padding-bottom: 40px;
}
	.recommend-list {
		background: #FFFFFF;
		height: 49px;
		width: 100%;
		display: flex;
		justify-content:space-around;
		.recommend-list-li{
			
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
	.list1,.list2,.list3{
		padding: 0 12px;
		width: 100%;
		box-sizing: border-box;
		.list-li{
			color: #333333;
			width:100%;
			height: 110px;
			background: #FFFFFF;
			border-radius: 12px;
			margin-top: 12px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 12px 0 25px;
			box-sizing: border-box;
			.list-left{
				font-weight: bold;
				span{
					&:nth-child(1){
						font-size: 14px;
					}
					&:nth-child(2){
							font-size: 30px;
					}
				}
			}
			.list-cant{
				p{
					display: block;
					&:nth-child(1){
						font-size: 15px;
						font-weight: bold;
					}
						&:nth-child(2){
							padding: 20px 0 8px 0;
							font-size: 13px;
						}
						&:nth-child(3){
							font-size: 12px;
						}
				}
			}
			.list-right{
				width: 80px;
				height: 33px;
				background: #ff6e6e;
				border-radius: 16.5px;
				line-height: 33px;
				text-align: center;
				color: #ffffff;
				font-size: 14px;
			}
		}
	}
		.list2,.list3{
		.list-li{
			color:#999999;
			.list-right{
				background: #999999;
			}
		}
	}
</style>