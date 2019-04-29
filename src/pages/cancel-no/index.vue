<template>
	<div class="container">
		<!--空-->
		<div class="kong">
			<div class="img"><img src="/static/images/kong.png" /></div>
			<div class="text">您不是指定商户，无法核销噢~</div>
			<div class="btn">返回</div>
		</div>

	</div>
</template>
<script>
	export default {
		data() {
			return {}
		},
		onLoad() {

		},
		methods: {},
	}
</script>

<style scoped lang="less">
	.container {
		/*空*/
		.kong {
			margin-top: 60px;
			line-height: 1;
			.img {
				width: 191px;
				height: 78px;
				margin: 0 auto;
			}
			.text {
				font-size: 17px;
				color: #333333;
				text-align: center;
				padding: 35px 0 30px;
			}
			.btn {
				width: 80px;
				height: 33px;
				border: 1px solid;
				border-radius: 17px;
				text-align: center;
				margin: 0 auto;
				color: #ff6e6e;
				font-size: 14px;
				font-weight: bold;
				line-height: 33px;
			}
		}
	}
</style>