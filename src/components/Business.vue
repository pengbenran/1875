<template>	
	<div class="rule-pop" v-if="isOpen" catchtouchmove>
		<div class="rule-pop-li">
			<div class="ybqw">
				<div class="img"><img src="/static/images/1875quan.png" /> </div>
			</div>
			<div class="cant">
				<p class="tit">
					<span>商家合作</span>
					<span></span>
					<!--线-->
				</p>
				<p class="tex">您如果需要与本平台进行合作可以微信咨询或者拨打电话：</p>
				<!---->
				<div class="weixin">
					<div class="left">
						<span class="iconfont">&#xe64f;</span>
						<span>{{wechat}}</span>
					</div>
					<div class="right" @click="copy">
						复制
					</div>
				</div>
				<!---->
				<div class="phone">
					<div class="left"> 
						<span class="iconfont">&#xe6d4;</span>
						<span>{{phoneNum}}</span>                
					</div>
					<div class="right" @click='makePhone'>
						拨打
					</div>
				</div>
			</div>
		</div>
		<div class="cha">
			<span></span>
			<span @click="hideRed" class="iconfont">&#xe809;</span>
		</div>
	</div>
</template>
<script>   
	export default {
		data() {
			return {
				isOpen:false,
				wechat:'GUQIN1875',
				phoneNum:'18521508899'

			}
		},
		mounted(){
			
		},
		methods: {
		    hideRed() {
				let that = this
				that.isOpen = false
			},
			showOpen(){
				let that = this
				that.isOpen = true
			},
			copy(){
				let that=this
				wx.setClipboardData({
					data:that.wechat,
					success: function(res) {

					}
				})
			},
			// 拨打电话
			makePhone(){
				let that=this
				wx.makePhoneCall({
					phoneNumber: that.phoneNum,
				})
			},
		}
	}
</script>

<style scoped lang="less">
	/*商家合作弹窗*/
	.rule-pop {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .3);
		z-index: 99;
		.rule-pop-li {
			width: 335px;
			height: 410px;
			background: #FFFFFF;
			margin: 66px auto 0 auto;
			overflow: hidden;
			border-radius: 12px;
			.ybqw {
				width: 100%;
				height: 100px;
				background: #ff6666;
				padding-top: 37.5px;
				box-sizing: border-box;
				.img {
					width: 205px;
					height: 25px;
					margin: 0 auto;
					img {
						width: 100%;
						height: 100%;
					}
				}
			}
			.cant {
				padding: 0 32px;
				box-sizing: border-box;
				.tit {
					text-align: center;
					padding: 30px 0;
					box-sizing: border-box;
					span {
						display: block;
						&:nth-child(1) {
							color: #333333;
							font-size: 17px;
							font-weight: bold;
						}
						&:nth-child(2) {
							width: 33px;
							height: 2px;
							background: #ff4b27;
							margin-top: 6px;
							border-radius: 1px;
							margin: 3px auto 0 auto;
						}
					}
				}
				.tex {
					font-size: 15px;
					color: #333333;
					line-height: 28px;
				}
				.weixin,
				.phone {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.left {
						display: flex;
						align-items: center;
						span {
							display: block;
							&:nth-child(1) {
								font-size: 20px;
							}
							&:nth-child(2){
								color: #333333;
								margin-left: 12px;
								font-size: 15px;
							}
						}
					}
					.right {
						width: 60px;
						height: 33px;
						background: #ff6666;
						border-radius: 16.5px;
						line-height: 33px;
						text-align: center;
						color: #ff6666;
						font-size: 15px;
					}
				}
				.weixin{
					margin-top: 27px;
				    .right{
				    	background: #FFFFFF;
				    	border:1px solid #ff6666 ;
				    }
				}
				.phone{
					margin-top: 20px;
					 .right{
				    	color: #FFFFFF;
				    	border:1px solid #ff6666 ;
				    }
					
				}
			}
		}
		.cha {
			span {
				display: block;
				text-align: center;
				&:nth-child(1) {
					width: 2px;
					height: 30px;
					background: #FFFFFF;
					margin: 0 auto;
				}
				&:nth-child(2) {
					line-height: 35px;
					font-size: 40px;
					color: #FFFFFF;
				}
			}
		}
	}
</style>