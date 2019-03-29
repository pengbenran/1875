<template>
	<div class="cont" catchtouchmove v-if='istoggle'>
		<form action="" method="post">
			<div class="popup">
				<div class="popup-left">
					<span class="iconfont">&#xe6aa;</span>
					<span class="inp"><input type="text" name="" id="" placeholder="输入商品名、地点或品类" /></span>
				</div>
				<div class="popup-right">
					<div class="submit">搜索</div>
				</div>
			</div>
			<div class="lists">
				<div class="list">
					<div class="tit">热门搜索</div>
					<div class="list-wp">
						<div class="list-li" v-for="(item,index) in list">
							<span hover="true" hover-class="detail-hover">{{item.name}}</span>
						</div>
					</div>
				</div>
			</div>
		</form>
		<div class="hidd iconfont" @click="hide">
			&#xe809;
		</div>
	</div>
</template>
<script>
	export default {
		props: ['istoggle','hide'],
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
					},
					{
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
					},

				]
			}
		},

		methods: {
	    
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
		padding-bottom: 20px;
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