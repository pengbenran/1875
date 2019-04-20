import * as API from './base'
export default {
	// 获取今日爆品热卖分类数据
	orderSave(params){
		return API.POST('/api/order/save',params)
	},
}