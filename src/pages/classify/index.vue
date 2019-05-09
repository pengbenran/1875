<template>
	<div class="container">
		<search :istoggle='istoggle' :hide='hide'></search>
		<!--head-->
		<div class="head">
			<div class="head-left">
				<!-- <span>{{city}}</span>
				<span class="iconfont">&#xe6bd;</span> -->
			</div>
			<div class="head-right" @click="isshow">
				<span class="iconfont">&#xe6aa;</span>
				<span>搜索</span>
			</div>
		</div>

		<!--类目-->
		<scroll-view :class="scrollTop>0?'posi':''" @scroll='catescroll' id="toplist" scroll-x style="width: 100%" class="recommend-list" :scroll-left="scrollLeft">
			<div class="recommend-list-li" v-for="(item,index) in recommendList" @click="listTab(index,item.catId)" :class="listcurr==index?'list-on':''">
				<div class="name">
					{{item.name}}
				</div>
			</div>
		</scroll-view>

		<swiper style="height:100vh" duration='350' :current="listcurr" @change="changeTab">
			<blockquote v-for="(item,index) in recommendList" :index='index' :key="item.catId">
				<swiper-item style="overflow: scroll;">
					<recTwo :recTwo='item.options'></recTwo>
					<div class="noMoretip" v-if="item.hasMore==false">数据到底了</div>
				</swiper-item>
			</blockquote>
		</swiper>

	</div>
</template>
<script>
	import API from '@/api/kind'
	import Lib from '@/utils/Lib'
	import recTwo from '@/components/recTwo'
	import search from '@/components/search'
	export default {
		data() {
			return {
				scrollTop: 0,
				istoggle: false,
				windowWidth: 0,
				scrollLeft: 0,
				listcurr: 0,
				city:'',
				recommendList: [],
				recTwo: []
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
			hide() {
				this.istoggle = false
				console.log(this.istoggle)
			},
			isshow() {
				wx.navigateTo({
					url:'../search/main', 
				})
                
			},
			listTab(e,catId) {
				this.listcurr = e
			},
			changeTab(e) {
				let that = this
				that.listcurr = e.mp.detail.current
				var singleNavWidth = that.windowWidth / 5;
				that.scrollLeft = (that.listcurr - 2) * singleNavWidth

				//查看触发数据
				that.recommendList[e.mp.detail.current].options.length == 0 
				? that.GetGoodsList(that.recommendList[e.mp.detail.current].catId) : ''
				
			},
			catescroll(e) {
				let that = this;
			},

			////////////////////////////////////////////////////////////////////
			//获取商品的分类信息
			 GetGoodsCat(){
				let that = this;
			    API.getGoodCatData().then(res => {
					if(res.code == 0){
						that.recommendList = res.goodCats.map(Mres => {
							Mres.options = [];  //控制视图的前提是必须注册进入视图；
							Mres.hasMore = true;
							Mres.page = 1;
					        Mres.limit = 6;
							return Mres;
						});			
						that.GetGoodsList(res.goodCats[0].catId);//不影响视觉的加载第一个
					}else{
						Lib.showToast('失败','none')						
					}
				}).catch(err => {
                    Lib.showToast('失败','none')
				});
			},

			// ItemGoodsList(){
			// 	let that = this;
			// 	that.recommendList.filter(Fres => Fres.catId != that.recommendList[0].catId).map((Mres,index) => {
			// 		that.GetGoodsList(Mres.catId)
			// 	})
			// },

			//获取指定分类下的商品
			 GetGoodsList(catId){
				let that = this;
				wx.showLoading({title: '加载中'})
				let ItmeOptions = that.recommendList.find(Fres => Fres.catId == catId);
				if(ItmeOptions.hasMore){
					let params={}
					params.page=ItmeOptions.page
					params.limit=ItmeOptions.limit
					params.catId=catId
					params.adCode=wx.getStorageSync('adcode')
					params.longitude=wx.getStorageSync('longitude')
					params.latitude=wx.getStorageSync('latitude')
					API.getGoodsList(params).then(res => {
						if(res.code == 0){
							if(res.page.rows.length < ItmeOptions.limit){
								ItmeOptions.hasMore = false
							}
							ItmeOptions.options = ItmeOptions.options.concat(res.page.rows)
						}else{
							Lib.showToast('失败','none')						
						}
						 wx.hideLoading()
					})
				}else{
					// wx.hideLoading()
					wx.showToast({title: '没有更多信息',icon: 'none',duration: 2000})
				}
			},
		},

		//小程序触底加载
		onReachBottom:function(){
			let that = this;
			let Item = that.recommendList[that.listcurr];
			Item.page += 1; 
			that.GetGoodsList(Item.catId);
		},
		onShow() {
			let that = this
			that.listcurr=0
			//获取手机宽
			wx.getSystemInfo({
				success: (res) => {
					that.windowWidth = res.windowWidth
				},
			})
			wx.getStorageSync('City') ? this.city = wx.getStorageSync('City') : this.city = '全城'
			this.GetGoodsCat();
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
	.noMoretip{
		font-size:14px; 
		color:#999999;
		text-align: center;
		margin-bottom: 50px;
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
	
	.posi {
		position: fixed;
		top: 0;
		z-index: 88;
	}
</style>