import * as API from './base'
export default {
	// 获取今日爆品热卖分类数据
	orderSave(params){
		return API.POST('/api/order/save',params)
	},
	 // 微信支付
    prepay:params=>{
       return API.GET('/api/order/getPrepayId',params) 
    }
}