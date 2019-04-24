<template>
	<div class="container">
		<!--积分-->
		<div class="jf">
			<div class="left">
				<span>累计积分</span>
				<span>300</span>
			</div>
			<div class="right">
				<span>可用积分</span>
				<span>100</span>
				<span>去使用</span>
			</div>
		</div>
		<!--奖金-->
		<!--未开通-->
		<div class="ojjin">
			<div class="tit">开通分享师身份可赚取奖金噢~</div>
			<div class="kt" @click="jumpkt">去开通</div>
		</div>
		<!--已开通-->
		<div class="jjin" v-if='false'>
			<div class="left">
				<span>累计奖金（元）</span>
				<span>300</span>
			</div>
			<div class="right">
				<span>可提奖金（元）</span>
				<span>100</span>
				<span>去提现</span>
			</div>
		</div>
		
		<!--收支-->
		<div class="expenditure">
			<div class="expenditure-tit">
				<div class="tit1">流水记录</div>
				<div class="tit2">
					<span @click="btntrue">{{tit}}</span>
					<span class="iconfont">&#xe6bd;</span>
				</div>
			</div>
			<!--弹窗-->
			<div class="pop" v-if="isPop">
				<div class="tit">选择流水类型</div>
				<div class="list">
					<div @click="btnList(index)" class="list-li" :class="curr==index?'list-li-on':''" v-for="(item,index) in expenditure">{{item.name}}</div>
				</div>
				<div class="btn" @click="btnfalse">取消</div>
			</div>
			
			<div class="list-lis">
				<!--奖金收入-->
				<div  class="list-li1">
					<div class="left">
						<div class="img"><img src="/static/images/list.jpg" /></div>
					</div>
					<div class="right">
						<div class="cant"> 
							<span>小明同学- 被成功邀请</span>
							<span>12月29日12:30</span>
						</div>
						<div class="pic">+20.00元</div>
					</div>
				</div>

				<!--奖金支出-->
				<div   class="list-li2">
					<div class="left">
						<div class="img iconfont">&#xe630;</div>
					</div>
					<div class="right">
						<div class="cant">
							<span>提现到微信钱包</span>
							<span>12月29日12:30</span>
						</div>
						<div class="pic">-20.00元</div>
					</div>
				</div>

				<!--积分收入-->
				<div  class="list-li3"> 
					<div class="left">
						<div class="img"><img src="/static/images/list.jpg" /></div>
					</div>
					<div class="right">
						<div class="cant">
							<span>小明同学- 被成功邀请</span>
							<span>12月29日12:30</span>
						</div>
						<div class="pic">+20.00</div>
					</div>
				</div>

				<!--积分支出-->
				<div  class="list-li4">
					<div class="left">
						<div class="img iconfont">&#xe62f;</div>
					</div>
					<div class="right">
						<div class="cant">
							<span>提现到微信钱包</span>
							<span>12月29日12:30</span>
						</div>
						<div class="pic">-20.00</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				isPop: false,
				curr: 3,
				expenditure: [{
						name: "全部奖金"
					},
					{
						name: "奖金收入"
					},
					{
						name: "奖金支出"
					},
					{
						name: "全部积分"
					},
					{
						name: "积分收入"
					},
					{
						name: "积分支出"
					}
				],
				tit: "全部积分",
			}
		},

		methods: {
			btntrue() {
				this.isPop = true
			},
			btnfalse() {
				this.isPop = false
			},
			btnList(index) {
				let that = this
				that.curr = index
				that.isPop = false
				that.tit = that.expenditure[index].name
				console.log(that.tit)
			},
			jumpkt(){
				wx.navigateTo({
				   url:"../myself-kt/main"
				})			
			}
		},
		onLoad() {
			//重置
			let that = this
			that.isPop = false

		}
	}
</script>

<style scoped lang="less">
	.container {
		background: #f4f4f4;
		width: 100%;
		.jf,
		.jjin {
			background: #FFFFFF;
			width: 100%;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			height: 172px;
			text-align: center;
			span {
				display: block;
			}
			.left {
				width: 50%;
				line-height: 1;
				span {
					&:nth-child(1) {
						font-size: 15px;
						color: #333333;
						padding: 26px 0 18px 0;
					}
					&:nth-child(2) {
						font-size: 33px;
						color: #333333;
						font-weight: bold;
					}
				}
			}
			.right {
				width: 50%;
				line-height: 1;
				span {
					&:nth-child(1) {
						font-size: 15px;
						color: #333333;
						padding: 26px 0 18px 0;
					}
					&:nth-child(2) {
						font-size: 33px;
						color: #ff6e6e;
						font-weight: bold;
					}
					&:nth-child(3) {
						border: 1px solid #FF6E6E;
						background: #FFFFFF;
						color: #ff6e6e;
						font-size: 14px;
						width: 80px;
						height: 33px;
						border-radius: 16.5px;
						margin: 0 auto;
						line-height: 33px;
						margin-top: 28px;
					}
				}
			}
		}
		.jjin {
			margin-top: 8px;
			.right {
				span {
					&:nth-child(2) {
						color: #26acff;
					}
					&:nth-child(3) {
						border: 1px solid #26acff;
						background: #26acff;
						color: #FFFFFF;
						font-size: 14px;
					}
				}
			}
		}
		/*未开通*/
		.ojjin{
			line-height: 1;
			background: #FFFFFF;
			width: 100%;
			height: 172px;
			text-align: center;
			margin-top: 8px;
			.tit{
				text-align: center;
				font-size: 16px;
				color: #333333;
				padding: 46px 0 28px 0;
			}
			.kt{
				width: 160px;
				height: 33px;
				background: #26acff;
				line-height: 33px;
				text-align: center;
				margin: 0 auto;
				color: #f9f9f9;
				font-size: 14px;
				border-radius: 16.5px;
			
			}
		}
		.expenditure {
			margin-top: 8px;
			background: #FFFFFF;
			.expenditure-tit {
				width: 100%;
				height: 54px;
				display: flex;
				align-items: center;
				.tit1 {
					font-size: 18px;
					color: #333333;
					margin-left: 12px;
					font-weight: bold;
				}
				.tit2 {
					font-size: 18px;
					color: #333333;
					margin-left: 53px;
					font-weight: bold;
					span {
						&:nth-child(2) {
							font-size: 14px;
							margin-left: 6px;
						}
					}
				}
			}
			.pop {
				position: fixed;
				bottom: 0;
				z-index: 99;
				background: #F4F4F4;
				.tit {
					width: 100%;
					height: 50px;
					padding: 0 12px;
					box-sizing: border-box;
					border-bottom: 1px solid #dedede;
					text-align: center;
					line-height: 50px;
				}
				.list {
					padding: 0 12px 12px 12px;
					display: flex;
					flex-flow: wrap;
					justify-content: space-between;
					.list-li {
						width: 109px;
						height: 80px;
						background: #FFFFFF;
						text-align: center;
						line-height: 80px;
						margin-top: 12px;
					}
					.list-li-on {
						background: #999999;
						color: #ffffff;
					}
				}
				.btn {
					width: 100%;
					height: 50px;
					padding: 0 12px;
					box-sizing: border-box;
					border-top: 1px solid #dedede;
					text-align: center;
					line-height: 50px;
				}
			}
			.list-lis {
				padding: 0 12px;
				box-sizing: border-box;
				width: 100%;
				.list-li1,.list-li2,.list-li3,.list-li4 {
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 100%;
					box-sizing: border-box;
					.left {
						.img {
							width: 46px;
							height: 46px;
							border-radius: 50%;
							overflow: hidden;
						}
					}
					.right {
						border-bottom: 1px solid #DEDEDE;
						padding: 18px 0;
						flex-grow: 1;
						margin-left: 12px;
						display: flex;
						align-items: center;
						justify-content: space-between;
						box-sizing: border-box;
						width: 100%;
						flex-wrap: nowrap;
						.cant {
							line-height: 22px;
							span {
								display: block;
								&:nth-child(1) {
									font-size: 14px;
									color: #333333;
								}
								&:nth-child(2) {
									font-size: 12px;
									color: #999999;
								}
							}
						}
						.pic {
							font-size: 18px;
							color: #26acff;
						}
					}
				}
				.list-li2{
					.left{
						.img{
							text-align: center;
							line-height: 46px;
							font-size: 20px;
							color: #FFFFFF;
							background: #26acff;
						}
					}
				}
				.list-li3{
					.right{
						.pic{
							color: #ff6e6e;
						}
					}
				}
				.list-li4{
					.left{
						.img{
							text-align: center;
							line-height: 46px;
							font-size: 20px;
							color: #FFFFFF;
							background: #ff6e6e;
						}
					}
					.right{
						.pic{
							color: #ff6e6e;
						}
					}
				}
				
			}			
		}
	}
</style>