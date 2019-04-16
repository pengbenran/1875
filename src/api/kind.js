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
	// 获取最新好物分类数据
	getFavorite(params){
		return API.GET('/api/advertisement/getFavorite',params)
	},
	// 获取特别划算分类数据
	getCost(params){
		return API.GET('/api/advertisement/getCost',params)
	}
}