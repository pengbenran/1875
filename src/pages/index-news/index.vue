<template>
	<div class="container">
		<div class="cates">
			<div class="cate" v-for="(item,index) in FavoriteGoods">
				<div class="img"><img :src="item.url" /></div>
				<div class="cate-name">{{item.catName}}</div>
				<div class="cate-list">
					<div class="cate-list-li" v-for="(list,index1) in item.showGoodDTO" @click="jumpDetail(list.goodId)">
						<img :src="list.thumbnail" />
					</div>
				</div>
				<div class="more" v-if="item.showGoodDTO.length==6" @click="loadMore(item.catName,item.id)">
					<span>查看更多 > </span>
				</div>

			</div>
		</div>
	</div>
</template>
<script>
	import Api from '@/api/kind'
	export default {
		data() {
			return {
				page:1,
				limit:6,
				FavoriteGoods:[]
			}
		},
		components: {},
		methods: {
			loadMore(kindName,id){
				wx.navigateTo({
					url: '../index-news-more/main?kindName='+kindName+'&kindId='+id
				})
			},
			// 获取最新好物分类及商品列表
			getFavorite(){
				let params={}
				let that=this
				params.page=that.page
				params.limit=that.limit
				params.longitude=wx.getStorageSync('longitude')
				params.latitude=wx.getStorageSync('latitude')
				params.catBackgroundId=0
				Api.getFavorite(params).then(function(res){
					that.FavoriteGoods=res.FavoriteGoods
				})
			},
			jumpDetail(goodsId){
				wx.navigateTo({  
                 url:`../product-detail/main?goodsId=${goodsId}&codeUnionid=`		  	
			  })
			},
			//禁止滑动
			stopTouchMove: function() {
				return false;	
			},
		},
		mounted() {
			let that = this;
			that.getFavorite()
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
				height: 248px;
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
					margin-right: 12px;
				}
			}
		}
	}
</style>