<template>
	<div class="container">
		<onePenny :onePennyData="onePennyData"></onePenny>
	</div>
</template>

<script>
	import onePenny from '@/components/onePennyList'
	export default {
		data() {
			return {
				onePennyData:[{
					thumbnail:'http://192.168.0.114/1875/files/goodImage/c6ce955b-ce39-4743-8cc7-0b16bd31309f.jpg',
					goodName:'这是一个一分钱抢的商品',
					jionCount:'1112人参加活动',
					price:'0.01',
					showPrice:'￥99'
				},{
					thumbnail:'http://192.168.0.114/1875/files/goodImage/c6ce955b-ce39-4743-8cc7-0b16bd31309f.jpg',
					goodName:'这是一个一分钱抢的商品',
					jionCount:'1112人参加活动',
					price:'0.01',
					showPrice:'99'
				}]
			}
		},

		components: {
		 onePenny
		},
		methods: {
		
		},
		mounted() {
		
		},
	}
</script>

<style scoped lang="less">
	/*导航*/

	
</style>