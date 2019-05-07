<template>
	<div class="container">
		<blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>
			<div class="bg" >
				<recNearby :recNearby="showGoodDTOS"></recNearby>
				<div class="noMoreTip">数据到底了</div>
			</div>
		</blockquote>
	</div>
</template>

<script>
	import recNearby from '@/components/recNearby'
	import Api from '@/api/kind'
	import loading from '@/components/loading'
	export default {
		data() {
			return {
				showGoodDTOS:[],
				pages:1,
				limit:6,
				hasMore:true,
				ExplosivesSaleObj:{},
				kindId:'',
				isLoading:false,
			}
		},
		components: {
			recNearby,
			loading
		},
		methods:{
			getFavorite(){
				let params={}
				let that=this
				if(that.hasMore){
					params.page=that.pages
					params.limit=that.limit
					params.longitude=wx.getStorageSync('longitude')
					params.latitude=wx.getStorageSync('latitude')
					params.catBackgroundId=that.kindId
					Api.getFavorite(params).then(function(res){
						that.isLoading=true
						if(res.showGoodDTOS.length<that.limit){
							that.hasMore=false
						}
						that.showGoodDTOS=that.showGoodDTOS.concat(res.showGoodDTOS)
					})
				}
				else{
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
		    that.showGoodDTOS=[]
			that.pages=1
			that.hasMore=true
			that.isLoading=false
		    that.kindId=that.$root.$mp.query.kindId
			wx.setNavigationBarTitle({
				title: that.$root.$mp.query.kindName
			})
			that.getFavorite()
		},
		onReachBottom:function(){
			let that = this;
			that.pages+=1
			that.getFavorite()
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
		color:#999;
		text-align: center;
		height: 50px;
		line-height: 50px;
	}
</style>