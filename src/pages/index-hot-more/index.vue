<template>
	<div class="container" :style="{background:bcgColor}">
		<div class="headbg"><img :src="detailImg" /></div>
		<div class="bg" >
			<recNearby :recNearby="showGoodDTOS"></recNearby>
			<div class="noMoreTip">数据到底了</div>
		</div>
	</div>
</template>

<script>
	import recNearby from '@/components/recNearby'
	import store from '@/store/store'
	import Api from '@/api/kind'
	export default {
		data() {
			return {
				detailImg: '',
				bcgColor:'',
				showGoodDTOS:[],
				pages:1,
				limit:6,
				hasMore:true,
				ExplosivesSaleObj:{}
			}
		},
		components: {
			recNearby,
		},
		methods:{
			getExplosivesSale(){
				let params={}
				let that=this
				if(that.hasMore){
					params.page=that.pages
					params.limit=that.limit
					params.page=that.pages
					params.limit=that.limit
					params.catBackgroundId=that.ExplosivesSaleObj.id
					Api.getExplosivesSale(params).then(function(res){
						if(res.showGoodDTOS.length<that.limit){
							that.hasMore=false
						}
						that.showGoodDTOS=that.showGoodDTOS.concat(res.showGoodDTOS)
					})
				}else{
					wx.showToast({
						title:'没有更多数据了',
						icon:"none",
						duration:1500
					})
				}
				
			},
		},
		mounted() {
		    let that=this
		    that.hasMore=true
		    that.pages=1
			that.ExplosivesSaleObj=store.state.ExplosivesSaleObj
			that.detailImg = that.ExplosivesSaleObj.url;
			that.bcgColor=that.ExplosivesSaleObj.fontColor
			wx.setNavigationBarTitle({
				title: that.ExplosivesSaleObj.catName
			})
			that.showGoodDTOS=that.ExplosivesSaleObj.showGoodDTO
			wx.setNavigationBarColor({
				frontColor: '#ffffff', // 必写项
				backgroundColor: that.ExplosivesSaleObj.fontColor, // 传递的颜色值
			})
		},
		onReachBottom:function(){
			let that = this;
			that.pages+=1
			that.getExplosivesSale()
		},
	}
</script>

<style scoped lang="less">
	.headbg {
		width: 100%;
		height: 175px;
	}
	.noMoreTip{
		font-size:14px; 
		color:#fff;
		text-align: center;
		height: 50px;
		line-height: 50px;
	}
</style>