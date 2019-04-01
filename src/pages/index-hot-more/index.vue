<template>
	<div class="container" :style="{background:listbg}">
		<div class="headbg"><img :src="detailImg" /></div>
		<div class="bg" >
			<recNearby :recNearby="popularity"></recNearby>
		</div>
	</div>
</template>

<script>
	import recNearby from '@/components/recNearby'
	export default {
		data() {
			return {
				detailImg: '',
				listbg: '',
				popularity: [{
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
					{
						img: "/static/images/banner.jpg",
						tit: '这是28px大小平方字体并且做了加粗处理行间距是字体大小的1.5倍#33...',
						address: "东湖区",
						addre: "洪城数码广场",
						distance: "690m",
						pic: 29,
						pice: 99
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
			recNearby,
		},
		onLoad(options) {
			console.log(options)
			let that = this;
			that.detailImg = options.detailImg;
			that.listbg = options.listbg;
			wx.setNavigationBarTitle({
				title: options.cateName
			})
			wx.setNavigationBarColor({
				frontColor: '#ffffff', // 必写项
				backgroundColor: options.titbg, // 传递的颜色值
			})
		},
	}
</script>

<style scoped lang="less">
.container{
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: scroll;
	padding-bottom:50px ;
}
	.headbg {
		width: 100%;
		height: 175px;
	}
</style>