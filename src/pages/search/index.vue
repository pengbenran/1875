<template>
	<div  >
		<form action="" method="post">
			<div class="popup">
				<div class="popup-left">
					<span class="iconfont">&#xe6aa;</span>
					<span class="inp"><input type="text" name="" id="" v-model="listQuery.searchParam" placeholder="输入商品名、地点或品类" /></span>
				</div>
				<div class="popup-right">
					<div class="submit" @click="SearchClick()">搜索</div>
				</div>
			</div>
           
		</form>
		<div class="lists">
			<div class="list">
				<div class="tit">热门搜索</div>
				<div class="list-wp">
					<div class="list-li" v-for="(item,index) in tagLits" @click="GetSearckClick(item.name)">
						<span hover="true" hover-class="detail-hover">{{item.name}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="lists">
			<div class="list">
				<div class="tit">最近搜索</div>
				<div class="list-wp">
					<div class="list-li" v-for="(item,index) in Searchinput"  @click.stop="GetSearckClick(item)">
						<span hover="true" hover-class="detail-hover"><label>{{item}}</label> <label class="iconfont" @click.stop="closeTag(item)">&#xe809;</label></span>
					</div>
				</div>
			</div>
		</div>
		<blockquote v-if="GoodsList.length > 0">
			<recTwo :recTwo='GoodsList'/>
		</blockquote>
	</div>
</template>
<script>   
	import API from '@/api/kind'
	import API_g from '@/api/good'
    import Lib from '@/utils/Lib'
	import recTwo from '@/components/recTwo'
	export default {
		props: ['istoggle','hide'],
		components:{recTwo},
		data() {
			return {
				tagLits:[],
				list: [],
				GoodsList:[],
				SearchText:'',
				Searchinput:[],
				listQuery:{
					page: 1,
					limit: 100,
					searchParam:''
				},
			}
		},
		mounted(){
			this.GoodsList=[]
			if(wx.getStorageSync("SearchData")){
                this.Searchinput = wx.getStorageSync("SearchData")
			}else{
				wx.setStorageSync('SearchData',[])
			}
			this.GetHotSearchData();
			if(this.$root.$mp.query.SearchName != undefined){
				this.listQuery.searchParam = this.$root.$mp.query.SearchName
				this.GetSearchData()
			}
		},
		methods: {
			SearchClick(){
				let that = this;
				this.GoodsList=[]
				that.GetSearchData(); //获取关键字搜索数据
				if(that.listQuery.searchParam != '' && this.Searchinput.indexOf(that.listQuery.searchParam) == -1){
					that.Searchinput.push(that.listQuery.searchParam); //添加搜索数据
					wx.setStorageSync('SearchData',that.Searchinput); //保存搜索记录
				}
			},

			//点击获取搜索的数据
			GetSearchData(){
				let that = this;
				API.getGoodsList(that.listQuery).then(res =>{
					if(res.code == 0){
					  if(res.page.rows.length==0){
					  	Lib.ShowToast('什么都没搜到换个词试试','none')	
					  }
					  that.GoodsList = res.page.rows
					}
				}).catch(err => {
					Lib.ShowToast('失败','none')
				})
				
			},

			//点击删除最近搜索
			closeTag(val){
				let that = this;
				let TagList = wx.getStorageSync('SearchData')
				TagList.splice(TagList.indexOf(val), 1)
				that.Searchinput = TagList
				wx.setStorageSync('SearchData',TagList)
			},

			//点击搜索
			GetSearckClick(val){
				let that = this;
				that.listQuery.searchParam = val;
				that.GetSearchData()
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
				}).catch(err => {
						Lib.ShowToast('失败','none')	
				})
			},
		}
	}
</script>

<style scoped lang="less">
	/*关闭按钮*/
	.hidd {
		position: absolute;
		bottom: 40px;
		margin-left: -15px;
		left: 50%;
		font-size: 30px;
		color: #999999;
    }
    
    .More{
        text-align: center;
        font-size: 15px;
        color: #ff6e6e;
    }
	
	.cont {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(255,255,255,0.99);
		z-index: 99;
	}
	
	.detail-hover {
		background: #F4F4F4;
	}
	
	.popup {
		width: 100%;
		height: 49px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 12px;
		box-sizing: border-box;
		.popup-left {
			width: 300px;
			height: 33px;
			position: relative;
			.iconfont {
				position: absolute;
				top: 0;
				left: 0;
				font-size: 22px;
				line-height: 33px;
				color: #ff6e6e;
				margin-left: 10px;
			}
			.inp {
				width: 100%;
				height: 100%;
				input {
					width: 100%;
					height: 100%;
					border-radius: 16.5px;
					border: 1px solid #ff6e6e;
					padding-left: 35px;
					box-sizing: border-box;
					font-size: 14px;
					color: #ff6e6e;
				}
			}
		}
		.popup-right {
			.submit {
				width: 63px;
				height: 100%;
				text-align: center;
				line-height: 49px;
				font-size: 17px;
				color: #333333;
				font-weight: bold;
			}
		}
	}
	
	.lists {
		width: 100%;
		padding: 0 12px;
		box-sizing: border-box;
		margin-top: 12px;
	}
	
	.list {
		width: 100%;
		/*box-shadow: 0 2px 4px 2px #f4f4f4;*/
		padding-bottom: 6px;
		.tit {
			color: #ff6e6e;
			font-size: 13px;
			padding: 12px 12px;
		}
		.list-wp {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			width: 100%;
			box-sizing: border-box;
			padding: 0 12px;
			.list-li {
				width: 50%;
				height: 44px;
				/*line-height: 32px;*/
				border-top: 1px solid #f4f4f4;
		
				span {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 5px;
					margin-left: 22px;
					color: #333333;
					font-size: 15px;
					width: 100%;
					margin-top: 12px;
				}
				&:nth-child(2n+1) {
					span {
						margin-left: 0;
						border-right: 1px solid #f4f4f4;
					}
				}
				&:nth-last-child(1),
				&:nth-last-child(2) {
					border-bottom: 1px solid #f4f4f4;
				}
			}
		}
	}
</style>