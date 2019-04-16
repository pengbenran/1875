import * as API from './base'
export default {
	// 获取今日爆品热卖分类数据
	getExplosivesSale(params){
		return API.GET('/api/advertisement/getExplosivesSale',params)
	},
	// 获取今日爆品人气分类数据
	getExplosivesPopularity (params){
		return API.GET('/api/advertisement/getExplosivesPopularity',params)
	},

	//获取所有的分类
	getGoodCatData(params){
		return API.GET('/api/goodCat/cats',params)
	},

	//获取指定分类的商品
	getGoodsList(params){
		return API.GET('/api/good/goods',params)
	}
}