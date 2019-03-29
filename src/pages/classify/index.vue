<template>
	<div class="container">
 <search :istoggle='istoggle' :hide='hide'></search>
		<!--head--> 
		<div class="head">
			<div class="head-left">
				<span>全城</span>
				<span class="iconfont">&#xe6bd;</span>
			</div>
			<div class="head-right" @click="isshow">
				<span class="iconfont">&#xe6aa;</span>
				<span>搜索</span>
			</div>
		</div>
		<!--类目-->
		<scroll-view :class="scrollTop>0?'posi':''" @scroll='catescroll' id="toplist" scroll-x style="width: 100%" class="recommend-list" :scroll-left="scrollLeft">
			<div class="recommend-list-li" v-for="(item,index) in recommendList" @click="listTab(index)" :class="listcurr==index?'list-on':''">
				<div class="name">
					{{item.name}}
				</div>
			</div>
		</scroll-view>

		<swiper style="height:100vh" duration='350' :current="listcurr" @change="changeTab">
			<!--1-->
			<swiper-item style="overflow: scroll;">
				<recTwo :recTwo='recTwo'></recTwo>
			</swiper-item>

			<swiper-item style="overflow: scroll;">
				<recTwo :recTwo='recTwo'></recTwo>
			</swiper-item>

			<swiper-item style="overflow: scroll;">
				<recTwo :recTwo='recTwo'></recTwo>
			</swiper-item>

			<swiper-item style="overflow: scroll;">
				<recTwo :recTwo='recTwo'></recTwo>
			</swiper-item>

			<swiper-item style="overflow: scroll;">
				<recTwo :recTwo='recTwo'></recTwo>
			</swiper-item>

			<swiper-item style="overflow: scroll;">
				<recTwo :recTwo='recTwo'></recTwo>
			</swiper-item>
			<swiper-item style="overflow: scroll;">
				<recTwo :recTwo='recTwo'></recTwo>
			</swiper-item>
			<swiper-item style="overflow: scroll;">
				<recTwo :recTwo='recTwo'></recTwo>
			</swiper-item>
			<swiper-item style="overflow: scroll;">
				<recTwo :recTwo='recTwo'></recTwo>
			</swiper-item>
			<swiper-item style="overflow: scroll;">
				<recTwo :recTwo='recTwo'></recTwo>
			</swiper-item>
			<swiper-item style="overflow: scroll;">
				<recTwo :recTwo='recTwo'></recTwo>
			</swiper-item>
			<swiper-item style="overflow: scroll;">
				<recTwo :recTwo='recTwo'></recTwo>
			</swiper-item>
		</swiper>

	</div>
</template>
<script>
	import recTwo from '@/components/recTwo'
	import search from '@/components/search'
	export default {
		data() {
			return {
				scrollTop:0,
				istoggle:false,
				windowWidth: 0,
				scrollLeft: 0,
				listcurr: 0,
				recommendList: [{
						name: "吃喝"
					},
					{
						name: "玩乐"
					},
					{
						name: "丽人"
					},
					{
						name: "亲子"
					},
					{
						name: "其他"
					},
					{
						name: "玩乐"
					},
					{
						name: "吃喝"
					},
					{
						name: "吃喝"
					},
					{
						name: "其他"
					},
					{
						name: "玩乐"
					},
					{
						name: "其他"
					},
					{
						name: "吃喝"
					},
				],
				recTwo: [{
						img: "/static/images/banner.jpg",
						tit: '这是28px大小平方字体并且做了加粗处理行间距是字体大小的1.5倍#33...',
						address: "秦山湖区",
						addre: "一二三四五六七八九十",
						distance: "690m",
						pic: 29,
						pice: 99,

					},
					{
						img: "/static/images/banner.jpg",
						tit: '这是28px大小平方字体并且做了加粗处理行间距是字体大小的1.5倍#33...',
						address: "东湖区",
						addre: "洪城数码广场",
						distance: "690m",
						pic: 29,
						pice: 99,
					},
					{
						img: "/static/images/banner.jpg",
						tit: '这是28px大小平方字体并且做了加粗处理行间距是字体大小的1.5倍#33...',
						address: "东湖区",
						addre: "洪城数码广场",
						distance: "690m",
						pic: 29,
						pice: 99,
					},
					{
						img: "/static/images/banner.jpg",
						tit: '这是28px大小平方字体并且做了加粗处理行间距是字体大小的1.5倍#33...',
						address: "东湖区",
						addre: "洪城数码广场",
						distance: "690m",
						pic: 29,
						pice: 99,
					},
					{
						img: "/static/images/banner.jpg",
						tit: '这是28px大小平方字体并且做了加粗处理行间距是字体大小的1.5倍#33...',
						address: "东湖区",
						addre: "洪城数码广场",
						distance: "690m",
						pic: 29,
						pice: 99,
					},
					{
						img: "/static/images/banner.jpg",
						tit: '这是28px大小平方字体并且做了加粗处理行间距是字体大小的1.5倍#33...',
						address: "东湖区",
						addre: "洪城数码广场",
						distance: "690m",
						pic: 29,
						pice: 99,
					},
					{
						img: "/static/images/banner.jpg",
						tit: '这是28px大小平方字体并且做了加粗处理行间距是字体大小的1.5倍#33...',
						address: "东湖区",
						addre: "洪城数码广场",
						distance: "690m",
						pic: 29,
						pice: 99,
					},
				],
			}
		},
		components: {
			recTwo,
			search,
		},
				//监听滚动条
		onPageScroll(e) {
			let that = this;
			that.scrollTop = e.scrollTop;
		},
		methods: {
			hide(){
			 this.istoggle = false
		   	 console.log(this.istoggle)
			},
		   isshow(){
		   	 this.istoggle = true
		   	 
		   },
			listTab(e) {
				this.listcurr = e
			},
			changeTab(e) {
				let that = this
				that.listcurr = e.mp.detail.current
				var singleNavWidth = that.windowWidth / 5;
				that.scrollLeft = (that.listcurr - 2) * singleNavWidth
			},
			catescroll(e) {
				let that = this;
			},
		},
		onLoad() {
			let that = this
			//获取手机宽
			wx.getSystemInfo({
				success: (res) => {
					that.windowWidth = res.windowWidth
				},
			})
		}
	}
</script>

<style scoped lang="less">
	
	.head {
		display: flex;
		justify-content: space-between;
		padding: 0 12px 0 20px;
		box-sizing: border-box;
		width: 100%;
		align-items: center;
		.head-left {
			span {
				display: inline-block;
				color: #333333;
				font-size: 17px;
				font-weight: bold;
				&:nth-child(2) {
					margin-left: 4px;
					font-size: 10px;
				}
			}
		}
		.head-right {
			width: 80px;
			height: 33px;
			background: #ff6e6e;
			border-radius: 16.5px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 16px;
			box-sizing: border-box;
			span {
				display: block;
				color: #ffffff;
				font-size: 14px;
				&:nth-child(1) {
					font-size: 18px;
					margin-top: 2px;
				}
			}
		}
	}
	
	.recommend-list {
		height: 49px;
		width: 100%;
		white-space: nowrap;
		background: #FFFFFF;
		.recommend-list-li {
			height: 49px;
			line-height: 49px;
			width: 20%;
			position: relative;
			display: inline-block;
			text-align: center;
			span {
				display: inline-block;
			}
			.name {
				transition: all 0.5s;
				font-size: 17px;
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
				font-size: 17px;
				border-bottom: 6px solid #ff6e6e;
				font-weight: bold;
			}
		}
	}
	.posi{
		position: fixed;
		top: 0;
		z-index: 88;		
	}
</style>