<template>
	<div class="container">
		<swiper vertical style='height: 100vh;'>
			<swiper-item style='height: 100vh; background: #262d7b;'>
				<div class="equities">
					<div class="tit">VIP等级及权益</div>
					<div class="text">通过购买商品、邀请好友、分享商品可以获取更多积分进行等级升级。</div>
					<div class="tatil">
						<div class="vip1"><img :src="vip.vip1"/></div>
						<div class="progress">
							<progress :percent="vip1Length"  color="#b275e8" backgroundColor="#634ba5"/>
						</div>
						<div class="vip2"><img :src="vip.vip2"/></div>
						<div class="progress">
							<progress :percent="vip2Length" color="#b275e8" backgroundColor="#634ba5"/>
						</div>
						<div class="vip1"><img :src="vip.vip3"/></div>
					</div>
				</div>				
				<div class="equities1">
					
				</div>
			</swiper-item>
		</swiper>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				vip1Length:20,
				vip2Length:20,
				vipon:{
					vip1:"/static/images/VIP1-on.png",
					vip2:"/static/images/VIP2-on.png",
					vip3:"/static/images/VIP3-on.png"
				},
				vip:{
					vip1:"/static/images/VIP1.gif",
					vip2:"/static/images/VIP2.gif",
					vip3:"/static/images/VIP3.gif"
				},
				
			}
		}, 

		methods: {
		}
	}
</script>

<style scoped lang="less">
.container{
	background: #262d7b;	
	.equities{
		
		.tit{
		padding: 0 20px;	          
		}
		.text{}
		.tatil{}
	}
}
</style>