<template>
	<div class="container">
       <div class="top_Tap">
		   <ul>
			   <li><span>可使用</span></li>
			   <li><span>已下架</span></li>
		   </ul>
	   </div>

	   <div>
           <recNearby :recNearby="GoodList"/>
	   </div>
	</div>
</template>
<script>
	import API from '@/api/good'
	import store from '@/store/store'
	import recNearby from '@/components/collection'
	export default {
		data() {
			return {
               	listQuery:{
					page: 1,
					limit: 10,
				},
				GoodList:[]
			}
		},
		components: {
			recNearby,
		},
		//监听滚动条
		onPageScroll(e) {

		},
		methods: {
           GetGoodList(){
			   let that = this;
			   let data = {
				   memberId:store.state.userInfo.memberId
			   }
			   API.GetCollectionShop(Object.assign({},that.listQuery,data)).then(res => {
				   if(res.code == 0){
					   that.GoodList = res.favorite.rows
				   }else{
					   wx.showToast({title:'网络错误',icon:"none",duration:1500})
				   }
			   }).catch(err => {
				   wx.showToast({title:'网络错误',icon:"none",duration:1500})
			   })
		   },
		},

		//小程序触底加载
		onReachBottom:function(){
		
		},
		onLoad() {
			this.GetGoodList();
		}
	}
</script>

<style scoped lang="less">
.container{background: #f8f8f8;min-height: 100vh;}
.top_Tap{
   background: #fff;
   ul{display: flex;align-items: center;padding: 8px 0;}
   li{text-align: center;width: 50%;}
//    li span{}
}
</style>