<template>
	<div class="container">
		<!--头部-->
		<div class="head">
			<div class="head-left">
				<span> <addres/> </span>
				<span class="iconfont">&#xe640;</span>
			</div>
			<div class="head-right">
				<div class="search" @click="isshow">
					<span class="iconfont">&#xe6aa;</span>
					<span>输入商品名、地点或品类</span>
				</div>
				<div class="jia">
					<span class="iconfont">&#xe608;</span>
				</div>
			</div> 
		</div>
		<!--推荐搜索-->
		<div class="searches">
			<p>推荐搜索:</p>
			<div class="searches-li" v-for="(item,index) in searches">
				{{item.name}}
			</div>
		</div>
		<!--baner-->
		<div class="box">
			<swiper class="swiper" @change="changeImg" :autoplay="true" :circular="true" current=0>
				<div v-for="(item, index) in banner">
					<swiper-item class="item">
						<img mode="aspectFill" :src="item.url" class="slide-image" />
					</swiper-item>
				</div>
			</swiper>
			<span class="item-num" v-if="showLength>1">{{activeIndex+1}}/{{showLength}}</span>
			<span class="item-num" v-else>1/{{showLength}}</span>
		</div>
		<!---->
		<div class="packet">
			<div class="packet-li" v-for="(item,index) in packet" @click="jumppacket(item.urls,index)">
				<img :src="item.img" />
				<span>{{item.name}}</span>
			</div>
		</div>
		<!--商家合作弹窗-->
		<Business ref="business"></Business>
		<!--推荐-->
		<div class="recommend">
			<!--1级类目-->
			<div class="recommend-wp" id="toplist" :style="{display:isflex}">
				<div class="recommend-wp-li" v-for="(item,index) in recommendWp" @click="recTab(index)" :class="listcurrs==index?'recommend-on':''">
					<span class="img"><img :src="recommendIcon"/></span>
					<span class="name">{{item.name}}</span>
				</div>
			</div>
			<swiper style="height:100vh" duration='350' :current="listcurrs" @change="changeTabs">
				<!--精品-->
				<swiper-item>
					<div class="goods">
						<div class="goods-li" @click="jumpgoods('../index-hot/main')">
							<span class="img"><img :src="kindBackGround.explosive"/></span>
							<span class="name">今日爆品</span>
						</div>
						<div class="goods-li"  @click="jumpgoods('../index-news/main')">
							<span class="img"><img :src="kindBackGround.favoriteFood"/></span>
							<span class="name">最新好物</span>
						</div>
						<div class="goods-li"  @click="jumpgoods('../index-profit/main')">
							<span class="img"><img :src="kindBackGround.costEffective"/></span>
							<span class="name">特别划算</span>
						</div>

					</div>
				</swiper-item>
				<!--附近-->
				<swiper-item>
					<!--附近2级类目-->
					<div class="recommend-list">
						<div class="recommend-list-li" v-for="(item,index) in recommendList" @click="listTab(index)" :class="listcurr==index?'list-on':''">
							<span class="name">{{item.name}}</span>
							<span class="img"></span>
						</div>
					</div>
					<!--2级类目附近数据-->
					<swiper style="height:100vh;padding-bottom: 100px;" duration='350' :current="listcurr" @change="changeTab">
                        <blockquote v-for="(item,index) in recommendList" :index='index' :key="item.catId">
							<swiper-item>
								<scroll-view :scroll-y='scrolls' style="height: 100vh;">
									<recNearby :recNearby="item.options"></recNearby>
								</scroll-view>
							</swiper-item>
						</blockquote>

					</swiper>
				</swiper-item>
			</swiper>
		</div>
		<loginModel ref="loginModel"></loginModel>
	</div>
</template>

<script>
	import recNearby from '@/components/recNearby'
    import addres from "@/components/addresMap";
	import search from '@/components/search';
	import Lib from '@/utils/Lib';
	import loginModel from "@/components/loginModel";
	import Api from "@/api/home"
	import Business from '@/components/Business'
	import API_k from '@/api/kind'
	import store from '@/store/store'
	export default {
		components: {
			recNearby,
			search,
			loginModel,
		    addres,
		    Business
		},
		data() {
			return {
				istoggle: false,
				scrolls: false,
				scrollTop: '',
				idtop: '',
				listcurr: 0,
				listcurrs: 0,
				activeIndex: 0,
				recommendIcon: "/static/images/recommendIcon.gif",
				searches: [{
						name: "一二三四五"
					},
					{
						name: "一二三四五"
					},
					{
						name: "一二三四五"
					},
					{
						name: "一二三四五"
					},
				],
				recommendWp: [{
						name: "精品推荐"
					},
					{
						name: "附近"
					},
				],
				listQuery:{
					page: 1,
					limit: 10,
				},
				recommendList: [],
				banner: [],
				kindBackGround:{},
				packet: [{
						img: "/static/images/index-btn-a.gif",
						name: '签到红包',
						urls: '../index-redpacket/main'
					},
					{
						img: "/static/images/index-btn-b.gif",
						name: '一分钱抢',
						urls: '../index-redpacket/main'
					},
					{
						img: "/static/images/index-btn-c.gif",
						name: '商家合作',
						//						urls: '../index-redpacket/main'
					}
				],
				recNearby: [],
			}
		},
		//监听滚动条
		onPageScroll(e) {
			let that = this;
			that.scrollTop = e.scrollTop;
			if(that.scrollTop > that.idtop) {
				that.scrolls = true
			} else {
				that.scrolls = false
			}
		},
		computed: {
			showLength() {
				return this.banner.length
			},
		},
		onLoad() {
			let that = this;
			that.listtop();	
		},
		mounted(){
			let that = this;
			that.getUserInfo()
			that.getIndexImage()
			that.GetGoodsCat();
			that.getConfig()
		},
		methods: {
			// 获取用户信息
			async getUserInfo() {
				let that = this
				console.log("你好世界阿萨德啊")
				await that.$refs.loginModel.userLogin()
 				wx.stopPullDownRefresh()
			},
			// 获取全局配置
			getConfig(){
				Api.getConfig().then(function(res){
					console.log(res);
					store.commit("storeConfig",{pointDeduction:0.01})
					// if(res.code==0){
					// 	store.commit("storeConfig",res.globalConfigEntity)
					// }
				})
			},
			getIndexImage(){
				let that=this
				Api.getIndexImage().then(function(res){
					that.banner=res.indexBanner
					that.kindBackGround=res.indexBackGround
				})
			},
			isshow() {
				wx.navigateTo({
					url:'../search/main', 
				})
			},
			changeImg(e) {
				let that = this
				that.activeIndex = e.target.current
			},

			listTab(e) {
				this.listcurr = e
			},
			changeTab(e) {
				this.listcurr = e.mp.detail.current
				if(this.listcurr == 0) {
					this.listcurrs = 0
				}
				//查看触发数据
				this.recommendList[e.mp.detail.current].options.length == 0 
				? this.GetGoodsList(this.recommendList[e.mp.detail.current].catId) : ''
				
			},
			//
			recTab(e) {
				let that = this;
				that.listcurrs = e;
			},
			changeTabs(e) {
				this.listcurrs = e.mp.detail.current
				this.listcurr = 1
			},
			//获取节点距离顶部
			listtop() {
				let that = this
				const query = wx.createSelectorQuery()
				query.select('#toplist').boundingClientRect()
				query.selectViewport().scrollOffset()
				query.exec(function(res) {
					that.idtop = res[0].top + 72
				})
			},
			jumpgoods(urls) {
				wx.navigateTo({
					url: urls
				})
			},
			jumppacket(urls, index) {
				let that = this
				if(index == 2) {
					that.$refs.business.showOpen()
				} else {
					wx.navigateTo({
						url: urls
					})
				}

			},
			////////////////////////////////////////////////////////////////////
			//获取商品的分类信息
			 GetGoodsCat(){
				let that = this;
			    API_k.getGoodCatData().then(res => {
					if(res.code == 0){
						that.recommendList =[{name:''}].concat(res.goodCats.map(Mres => {
							Mres.options = [];  //控制视图的前提是必须注册进入视图；
							Mres.filg = true;
							Mres.page = 1;
					        Mres.limit = 4;
							return Mres;
						})); 		
						that.GetGoodsList(res.goodCats[0].catId);//不影响视觉的加载第一个
			
						// that.ItemGoodsList(); //排除第一个加载所有的数据
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
				if(ItmeOptions.filg){
					API_k.getGoodsList(Object.assign({},{page:ItmeOptions.page,limit:ItmeOptions.limit},{catId:catId})).then(res => {
						if(res.code == 0){
							if(res.page.rows.length < ItmeOptions.limit){
								ItmeOptions.filg = false
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
			console.log("上拉触发 显示")
			let that = this;
			let Item = that.recommendList[that.listcurr];
			Item.page += 1; 
			that.GetGoodsList(Item.catId);
		},

	}
</script>

<style scoped lang="less">

	/*banner*/
	
	.detail {
		padding-top: 88px;
	}
	
	.swiper {
		height: 125px;
		width: 351px;
		margin: 12px auto 0 auto;
		border-radius: 12px;
		overflow: hidden;
	}
	
	.item {
		width: 100%;
		height: 100%;
	}
	
	img {
		width: 100%;
		height: 100%;
		display: block;
	}
	
	.box {
		position: relative;
	}
	
	.item-num {
		z-index: 9;
		position: absolute;
		bottom: 16rpx;
		right: 40rpx;
		background: rgba(0, 0, 0, 0.7);
		height: 50rpx;
		line-height: 50rpx;
		width: 50rpx;
		border-radius: 50%;
		font-size: 20rpx;
		color: #FFFFFF;
		text-align: center;
	}
	/*banner结束*/
	
	.container {
		width: 100%;
		/*头部
		 */
		.head {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-flow: nowrap;
			width: 100%;
			background-color: #FFFFFF;
			padding: 0 10px;
			height: 49px;
			box-sizing: border-box;
			.head-left {
				display: flex;
				align-items: center;
				span {
					color: #333333;
					font-size: 15px;
				}
			}
			.head-right {
				display: flex;
				align-items: center;
				.search {
					width: 241px;
					/*background: #ff9999;*/
					box-shadow: 0 0 10px #DEDEDE;
					line-height: 33px;
					height: 33px;
					border-radius: 16.5px;
					margin-right: 19px;
					display: flex;
					span {
						display: block;
						color: #999999;
						font-size: 14px;
						&:nth-child(1) {
							padding: 0 10px;
							font-size: 20px;
							color: #333333;
						}
					}
				}
				.jia {
					span {
						color: #333333;
						font-size: 20px;
					}
				}
			}
		}
		/*推荐搜索*/
		.searches {
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #ff6e6e;
			font-size: 10px;
			padding: 9px 25px 0 20px;
			box-sizing: border-box;
			font-size: 11px;
			.searches-li {
				width: 64px;
				height: 20px;
				background: #ffebeb;
				border-radius: 10px;
				line-height: 20px;
				text-align: center;
			}
		}
		/**/
		.packet {
			width: 100%;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 4px;
			margin-top: 10px;
			margin-bottom: 10px;
			.packet-li {
				position: relative;
				width: 105px;
				height: 75px;
				img {
					display: block;
					width: 100%;
					height: 100%;
				}
				span {
					display: block;
					position: absolute;
					top: 15px;
					left: 15px;
					font-size: 15px;
					color: #ffffff;
					font-weight: bold;
				}
			}
		}
		/*推荐*/
		.recommend {
			.recommend-wp {
				transition: all 1s;
				background: #FFFFFF;
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 37px;
				border-top: 1px solid #f4f4f4;
				.recommend-wp-li {
					position: relative;
					text-align: center;
					&:nth-child(1) {
						margin-left: 80px;
					}
					&:nth-last-child(1) {
						margin-right: 80px;
					}
					span {
						display: inline-block;
					}
					.img {
						width: 20px;
						height: 20px;
						vertical-align: middle;
						position: absolute;
						left: -24px;
						top: 5px;
						opacity: 0;
						transition: all .5s;
					}
					.name {
						font-size: 15px;
						color: #999999;
						font-weight: bold;
					}
				}
				.recommend-on {
					.name {
						color: #333333;
					}
					.img {
						transition: all .5s;
						opacity: 1;
					}
				}
			}
			.ontop {
				position: fixed;
				top: 0;
				z-index: 99;
			}
		}
		.recommend-list {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 35px;
			flex-wrap: wrap;
			width: 100%;
			.recommend-list-li {
				position: relative;
				text-align: center;
				&:nth-child(1) {
					margin-left: 10px;
				}
				&:nth-child(2) {
					margin-left: 10px;
				}
				&:nth-last-child(1) {
					margin-right: 45px;
				}
				span {
					display: inline-block;
				}
				.img {
					width: 37px;
					height: 8px;
					background: #ff6e6e;
					border-radius: 4px;
					opacity: 0;
					transition: all .5s;
					position: absolute;
					bottom: -1px;
					left: -3px;
					z-index: -99;
				}
				.name {
					font-size: 14px;
					color: #333333;
				}
			}
			.list-on {
				.name {
					font-size: 16px;
					font-weight: bold;
				}
				.img {
					transition: all .5s;
					opacity: 1;
				}
			}
		}
		.onlisttop {
			position: fixed;
			top: 54px;
			z-index: 99;
			background: #FFFFFF;
		}
		/*精品*/
		.goods {
			width: 100%;
			padding: 12px;
			box-sizing: border-box;
			overflow: hidden;
			.goods-li {
				position: relative;
				width: 213px;
				height: 110px;
				border-radius: 4px;
				overflow: hidden;
				&:nth-child(1) {
					float: left;
					width: 133px;
					height: 225px;
				}
				&:nth-child(2) {
					float: right;
				}
				&:nth-child(3) {
					margin-top: 5px;
					float: right;
				}
				.name {
					display: block;
					position: absolute;
					left: 12px;
					top: 12px;
					z-index: 9;
					color: #333333;
					font-size: 15px;
					font-weight: bold;
				}
			}
		}
	}
</style>