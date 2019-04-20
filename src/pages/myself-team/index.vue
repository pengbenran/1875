<template>
	<div class="container">
		<div class="team">
		<!--类目-->
		<scroll-view class="recommend-list" scroll-y>
			<div class="recommend-list-li" v-for="(item,index) in recommendList" @click="listTab(index)" :class="listcurr==index?'list-on':''">
				<div class="name">
					{{item.name}}
				</div> 
			</div>
		</scroll-view>
		
		<swiper class="swiper" vertical style="width: ;" duration='350' :current="listcurr" @change="changeTab">
			<!--vip1-->
			<swiper-item style="overflow: scroll;"> 废物·埃文斯破伤风感觉完全过去为国内为国内为国内为国内嗡嗡日哦归纳为偶给你围殴归纳为偶给你问</swiper-item>
			<!--vip2-->
			<swiper-item style="overflow: scroll;"></swiper-item>
			<!--vip3-->
			<swiper-item style="overflow: scroll;"></swiper-item>
            <!--银牌分享师-->
			<swiper-item style="overflow: scroll;"></swiper-item>
			<!--金牌分享师-->
			<swiper-item style="overflow: scroll;"></swiper-item>
			<!--砖石牌分享师-->
			<swiper-item style="overflow: scroll;"></swiper-item>
		</swiper>
		</div>
		
	</div>
</template>
<script>
	export default {
		data() {
			return {
				listcurr: 0,
				recommendList: [
				    {
						name: "vip1"
					},
					{
						name: "vip2"
					},
					{
						name: "vip3"
					},
					{
						name: "银牌分享师"
					},
					{
						name: "金牌分享师"
					},
					{
						name: "砖石分享师"
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
.team{display: flex;}
	.recommend-list{
		width: 100px;
		background: orange;
		height: 100vh;
		.recommend-list-li{			
			height: 49px;
			line-height: 49px;
			position: relative;
			width: 100%;
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
	.swiper{
		flex-grow: 1;
		background: #26ACFF;
		height: 100vh;
	}
</style>