<template>
	<div class="container">
		<div class="cates">
			<div class="cate" v-for="(item,index) in cate">
				<div class="img"><img :src="item.bgimg" /></div>
				<div class="cate-name">{{item.cateName}}</div>
				<div class="cate-list">
					<div class="cate-list-li" v-for="(list,index1) in item.list">
						<img :src="list.img" />
					</div>
				</div>
				<div class="more">
					<span>查看更多 > </span>
				</div>

			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {

				cate: [{
						cateName: '热门商圈',
						bgimg: "/static/images/list.jpg",
						more: "查看更多美食",
						list: [{
								img: "/static/images/banner.jpg",
							},
							{
								img: "/static/images/banner.jpg",
							},
							{
								img: "/static/images/banner.jpg",
							},
							{
								img: "/static/images/banner.jpg",
							},
							{
								img: "/static/images/banner.jpg",
							},
							{
								img: "/static/images/banner.jpg",
							}
						]
					},
					{
						cateName: '休闲娱乐',
						bgimg: "/static/images/list.jpg",
						more: "查看更多玩乐  ",
						list: [{
								img: "/static/images/banner.jpg",
							},
							{
								img: "/static/images/banner.jpg",
							},
							{
								img: "/static/images/banner.jpg",
							},
							{
								img: "/static/images/banner.jpg",
							},
							{
								img: "/static/images/banner.jpg",
							},

						],
					},
					{
						cateName: '新世纪女神',
						bgimg: "/static/images/list.jpg",
						more: "查看更多丽人  ",
						list: [{
								img: "/static/images/banner.jpg",
							},
							{
								img: "/static/images/banner.jpg",
							},
							{
								img: "/static/images/banner.jpg",
							},
							{
								img: "/static/images/banner.jpg",
							},
							{
								img: "/static/images/banner.jpg",
							},
							{
								img: "/static/images/banner.jpg",
							},
						],
					},
					{
						cateName: '其它',
						bgimg: "/static/images/list.jpg",
						more: "查看更多亲子  ",
						list: [{
								img: "/static/images/banner.jpg",

							},
							{
								img: "/static/images/banner.jpg",

							},
							{
								img: "/static/images/banner.jpg",

							},
							{
								img: "/static/images/banner.jpg",
							},
							{
								img: "/static/images/banner.jpg",
							},
							{
								img: "/static/images/banner.jpg",
							},
						],
					}
				],
			}
		},

		components: {},
		methods: {
			//禁止滑动
			stopTouchMove: function() {
				return false;
				
			},
		}
	}
</script>

<style scoped lang="less">
	.cates {
		width: 100%;
		padding: 12px 12px 50px 12px;
		box-sizing: border-box;
		.cate {
			padding-top: 12px;
			width: 100%;
			height: 320px;
			margin-bottom: 20px;
			border-bottom: 4px;
			position: relative;
			.img {
				width: 100%;
				height: 100%;
				overflow: hidden;
				position: absolute;
				top: 0;
				z-index: -1;
				border-radius: 12px;
			}
			.cate-name {
				margin-left: 20px;
				color: #FFFFFF;
				font-size: 17px;
				font-weight: bold;
				border-bottom: 1px solid #FFFFFF;
				display: inline-block;
				padding-bottom: 4px;
			}
			.cate-list {
				display: flex;
				/*justify-content: space-between;*/
				flex-flow: wrap;
				.cate-list-li {
					width: 101px;
					height: 101px;
					margin-top: 12px;
					border-radius: 4px;
					overflow: hidden;
					margin-left: 12px;
				}
			}
			.more {
				justify-content: flex-end;
				display: flex;
				span {
					display: block;
					width: 110px;
					height: 33px;
					text-align: center;
					line-height: 33px;
					background: rgba(0, 0, 0, 0.3);
					color: #ff4b27;
					font-size: 15px;
					border-radius: 33px;
					color: #FFFFFF;
					margin-top: 16px;
					margin-right: 12px;
				}
			}
		}
	}
</style>