<template>
	<div class="cont" catchtouchmove v-if='istoggle'>
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
			<blockquote v-if="GoodsList.length > 0">
				<recTwo :recTwo='GoodsList'/>
			</blockquote>
            <blockquote v-else>
				<div class="lists">
					<div class="list">
						<div class="tit">门搜索</div>
						<div class="list-wp">
							<div class="list-li" v-for="(item,index) in list">
								<span hover="true" hover-class="detail-hover">{{item.name}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="lists">
					<div class="list">
						<div class="tit">最近搜索</div>
						<div class="list-wp">
							<div class="list-li" v-for="(item,index) in Searchinput">
								<span hover="true" hover-class="detail-hover">{{item}}</span>
							</div>
						</div>
					</div>
				</div>      
				<div class="hidd iconfont" @click="hide">
				   &#xe809;
				</div>       
			</blockquote>

	</div>
</template>
<script>   
	import API from '@/api/kind'
	import Lib from '@/utils/Lib'
	import recTwo from '@/components/recTwo'
	export default {
		props: ['istoggle','hide'],
		components:{recTwo},
		data() {
			return {
				list: [{
						name: "火锅火锅"
					},
					{
						name: "火锅火锅"
					},
					{
						name: "火锅火锅"
					},
					{
						name: "火锅火锅"
					}
				],
				GoodsList:[],
				SearchText:'',
				Searchinput:[],
				NoMores:true,
				listQuery:{
					page: 1,
					limit: 10,
					searchParam:''
				},
			}
		},
		mounted(){
			console.log("打印一下数据的长度",this.GoodsList.length)
			if(wx.getStorageSync("SearchData")){
                this.Searchinput = wx.getStorageSync("SearchData")
			}else{
				wx.setStorageSync('SearchData',[])
			}
		},
		methods: {
			SearchClick(){
				let that = this;
				that.GetSearchData(); //获取关键字搜索数据
				if(that.listQuery.searchParam != '' && this.Searchinput.indexOf(that.listQuery.searchParam) == -1){
					that.Searchinput.push(that.listQuery.searchParam); //添加搜索数据
					wx.setStorageSync('SearchData',that.Searchinput); //保存搜索记录
				}
			},

			//点击获取搜索的数据
			GetSearchData(){
				let that = this;
				if(that.NoMores){
					API.getGoodsList(that.listQuery).then(res =>{
						console.log("你好世界",res)
						if(res.code == 0){
							that.GoodsList = that.GoodsList.concat(res.page.rows);
							if(res.page.rows.length < that.listQuery.limit){
								that.NoMores = false
							}
						}
					}).catch(err => {
						Lib.ShowToast('失败','none')
					})
				}else{
                    Lib.ShowToast('没有更多数据！','none')
				}
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
					display: inline-block;
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