<template>
	<div style="width:100vw;height: 100vh">
		<div class="loading">
			<img src="/static/images/loading.gif">
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		props: [],
		data() {
			return {
			
			}
		},
		methods: {
	
		},
	}
</script>
<style scoped lang="less">
	.loading{
     	position: relative;
     	width:173.5px;
     	height: 125px;
     	overflow: hidden;
     	left: 50%;
     	top: 50%;
     	margin-left: -86.5px;
     	margin-top: -62.5px;
     	img{
     		width:100%;
     		height: 100%;
     	}
     }
</style>