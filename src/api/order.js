import * as API from './base'
export default {
	// 获取今日爆品热卖分类数据
	orderSave(params){
		return API.POST('/api/order/save',params)
	},
	 // 微信支付
    prepay:params=>{
       return API.GET('/api/order/getPrepayId',params) 

	 },
	 
	 //获取订单列表
	 GetOrderList:params => {
		 return API.GET('/api/order/selectOrderList',params)
	 },

	 //订单删除
	 DeleteOrder:params => {
       return API.PUT('/api/order/orderDele',params)
	 },
     // 修改订单状态
    payOrder:params=>{
     	return API.PUT('/api/order/passOrder', params)
     },
     // 获取订单详情
     getOrderDetail:params=>{
        return API.GET('/api/order/orderInfo',params) 
     },
     // 判断能否核销
     memberCancel:params=>{
     	return API.GET('/api/order/memberCancel',params)
     },
     // 订单核销
     orderCancel:params=>{
     	return API.GET('/api/order/orderCancel',params)
     }

}