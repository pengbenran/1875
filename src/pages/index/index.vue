<template>
	<div class="container">
		<blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>
		<!--头部-->
		<div class="head">
			<div class="head-left" @click.stop="CityShow()">
				<span> <addres ref="addres"/> </span>
				<span class="iconfont">&#xe640;</span>
				<!-- <div class="HeadMask" :class="citybool?'MaskOn':''">
					<div class="list" v-for="(item,index) in CityList" :key='item' :index='index' @click.stop="CitySelect(item.value,item.name)">{{item.name}}</div>
				</div> -->
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
			<div class="searches-li" v-for="(item,index) in tagLits" :key="item" :index='index' @click="toSearch(item.name)">
				{{item.name}}
			</div>
		</div>
		<!--baner-->
		<div class="box">
			<swiper class="swiper" @change="changeImg" :autoplay="true" :circular="true" current=0>
				<div v-for="(item, index) in banner" @click="jumpGoodsDetail(item.goodId,item.status)">
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
				<div class="recommend-wp-li" v-for="(item,index) in recommendWp" :class="listcurrs==index?'recommend-on':''" @click='clickTab(index)'>
					<span class="img"><img :src="recommendIcon"/></span>
					<span class="name">{{item.name}}</span>
				</div>
			</div>
			<swiper style="height:100vh" duration='350' :current="listcurrs" @change="changeTabs">
				<!--精品-->
				<swiper-item>
				 <scroll-view :scroll-y='scrolls' style="height: 100vh;">
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
					<!--猜你喜欢 -->
					<!-- <div class="recTwo">
						<div class="tit">猜你喜欢</div>
						<recTwo :recTwo='showGoodDTOS'></recTwo>
					</div>  -->	
			    </scroll-view>
				</swiper-item>
				<!--附近-->
				<swiper-item>
					<!--附近2级类目-->
					<div class="recommend-list">
						<div class="recommend-list-li" v-for="(item,index) in recommendList" :class="listcurr==index?'list-on':''" @click='clickTabs(index)'>
							<span class="name">{{item.name}}</span>
							<span class="img"></span>
						</div>
					</div>
					<!--2级类目附近数据-->
					<swiper style="height:100vh;padding-bottom: 100px;" duration='350' :current="listcurr" @change="changeTab">
                        <blockquote v-for="(item,index) in recommendList" :index='index' :key="item.catId">
							<swiper-item>
								<scroll-view :scroll-y='scrolls' style="height: 100vh;" @scrolltolower="scrollBottom">
									<recNearby :recNearby="item.options"></recNearby>
									<div class="noMoretip" v-if="item.hasMore==false">数据到底了</div>
								</scroll-view>
							</swiper-item>
						</blockquote>
					</swiper>
				</swiper-item>
			</swiper>
		</div>
	</blockquote>
	<loginModel ref="loginModel"></loginModel>
	</div>
</template>

<script>
	import recNearby from '@/components/recNearby'
	import recTwo from '@/components/recTwo'
    import addres from "@/components/addresMap";
	import search from '@/components/search';
	import Lib from '@/utils/Lib';
	import loginModel from "@/components/loginModel";
	import Api from "@/api/home"
	import Business from '@/components/Business'
	import API_k from '@/api/kind'
	import API_g from '@/api/good'
	import store from '@/store/store'
	import loading from '@/components/loading'
	export default {
		components: {
			recNearby,
			search,
			loginModel,
		    addres,
		    Business,
		    recTwo,
		    loading
		},
		data() {
			return {
				isLoading:false,
				istoggle: false,
				scrolls: false,
				citybool:false,
				scrollTop: '',
				idtop: '',
				listcurr: 0,
				listcurrs: 0,
				activeIndex: 0,
				tagLits:[],
				recommendIcon: "/static/images/recommendIcon.gif",
                showGoodDTOS:[
                   {name:"精品推荐"},
                   {name:"精品推荐"},
                   {name:"精品推荐"},
                   {name:"精品推荐"},
                   {name:"精品推荐"},
                   {name:"精品推荐"},
                   {name:"精品推荐"},
                   {name:"精品推荐"},
                ],
				recommendWp: [{
						name: "精品推荐"
					},
					{
						name: "附近"
					},
				],
				recommendList: [{name:''}],
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
		mounted(){
			let that = this;
			that.listcurrs=0;
			that.hideTabBar()
			that.getUserInfo()
			that.getIndexImage()
			that.getConfig();
			that.GetHotSearchData();
			// that.GetAddresData();
		},
		methods: {
			// 点击切换分类
			clickTab(index){
				let that=this
				that.listcurrs = index
			},
			// banner图跳转商品
			jumpGoodsDetail(goodId,status){
				if(status!=0){
					wx.navigateTo({
						url:`../product-detail/main?goodsId=${goodId}&codeUnionid=`, 
					})
				}
				
			},
			// 点击切换小分类
			clickTabs(index){
				let that=this
				that.listcurr = index
			},
			// 获取用户信息
			async getUserInfo() {
				let that = this
				await that.$refs.loginModel.userLogin()
 				wx.stopPullDownRefresh()
			},
			scrollBottom(){
				// 上拉加载更多数据
				let that = this;
				if(that.listcurrs==1){
					let Item = that.recommendList[that.listcurr];
					Item.page += 1; 
					that.GetGoodsList(Item.catId);
				}
			},
			// 获取全局配置
			getConfig(){
				let that=this
				Api.getConfig().then(function(res){
					if(res.code==0){
						that.isLoading=true
						that.showTabBar()
						store.commit("storeConfig",res.globalConfigEntity)
					}
				})
			},
			//显示导航栏
			showTabBar: function() {
				let that = this;
				wx.showTabBar({
					animation: false //是否需要过渡动画
				})
			},
			//隐藏导航栏
			hideTabBar: function() {
				wx.hideTabBar({
					animation: false //是否需要过渡动画
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
			changeTab(e) {
				this.listcurr = e.mp.detail.current
				if(this.listcurr == 0) {
					this.listcurrs = 0
				}
				else{
					this.recommendList[e.mp.detail.current].options.length == 0 
				? this.GetGoodsList(this.recommendList[e.mp.detail.current].catId) : ''
				}
				//查看触发数据			
			},
			//
			changeTabs(e) {
				let that=this
				that.listcurrs = e.mp.detail.current
				that.listcurr = 1
				if(that.recommendList.length==1){
					that.GetGoodsCat();
				}
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
					wx.showLoading({title: '功能开发中',duration:2000})
				}
			},



			//显示
			CityShow(){
				// this.citybool = !this.citybool;
				wx.navigateTo({
					url:'../City/main'
			    })
			},
			CitySelect(val,name){
				let that=this
				that.citybool = false;
                that.$refs.addres.SetValue(name);
				wx.setStorageSync('City',name);
				wx.setStorageSync('adcode',val);
				that.listcurrs=0;
				that.recommendList=[{name:''}]
			},

			////////////////////////////////////////////////////////////////////
			//获取商品的分类信息
			 GetGoodsCat(){
				let that = this;
			    API_k.getGoodCatData().then(res => {
					if(res.code == 0){
						that.recommendList =that.recommendList.concat(res.goodCats.map(Mres => {
							Mres.options = [];  //控制视图的前提是必须注册进入视图；
							Mres.hasMore = true;
							Mres.page = 1;
					        Mres.limit = 4;
							return Mres;
						}));
						that.GetGoodsList(that.recommendList[1].catId)	
					}else{
						Lib.showToast('失败','none')						
					}
				}).catch(err => {
                    Lib.showToast('失败','none')
				});
			},


			//获取指定分类下的商品
			 GetGoodsList(catId){
				let that = this;
				wx.showLoading({title: '加载中'})
				let ItmeOptions = that.recommendList.find(Fres => Fres.catId == catId);
				if(ItmeOptions.hasMore){
					let params={}
					params.page=ItmeOptions.page
					params.limit=ItmeOptions.limit
					params.adCode=wx.getStorageSync('adcode')
					params.catId=catId
					params.longitude=wx.getStorageSync('longitude')
					params.latitude=wx.getStorageSync('latitude')
					API_k.getGoodsList(params).then(res => {
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
			//获取热门搜索
		GetHotSearchData(){
				let that = this;
				API_g.getHotSearTag().then(res => {
					if(res.code == 0){
						that.tagLits = res.searchs.filter(f => f.parentId != 0);
					}else{
						Lib.ShowToast('失败','none')						
					}
					console.log("热门搜索数据",that.tagLits)
				}).catch(err => {
						Lib.ShowToast('失败','none')	
				})
			},

		//点击跳转搜索
		toSearch(val){
			let that = this;
			wx.navigateTo({
					url:'../search/main?SearchName=' + val, 
			})
		},
		},
	}
</script>

<style scoped lang="less">

	/*banner*/
	
	.detail {
		padding-top: 88px;
	}
	.noMoretip{
		font-size:14px; 
		color:#999999;
		text-align: center;
		margin-bottom: 50px;
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
				position: relative;
				display: flex;
				align-items: center;
				span {
					color: #333333;
					font-size: 15px;
				}
			}
			.HeadMask{
			  z-index: 2;
			  position: absolute;
			  transition: all 0.4s;
			  top: .5rem;
			  left: -10rem;
			  background: #fff;
			  font-size: 16px;
			  width: 1.4rem;
			  text-align: center;
			  padding: 6px 0;
			  border-radius: 6px;
			  box-shadow: 0 0 10px #DEDEDE;
			  color: rgb(44, 44, 44);
			//   opacity: 0;
			}
			.HeadMask .list{padding: 3px 0;}
			.MaskOn{left: 0;}
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
			color: #ff6e6e;
			font-size: 10px;
			padding: 9px 25px 0 20px;
			box-sizing: border-box;
			font-size: 11px;
			.searches-li {
				width: 64px;
				height: 20px;
				margin: 0 4px;
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
		/*猜你喜欢*/
		.recTwo{
			.tit{
				color: #333333;
				font-size: 16px;
				font-weight: bold;
				padding: 26px 0 20px 12px;
			}
		}
	}
</style>