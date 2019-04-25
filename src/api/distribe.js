import * as API from './base'

export default {
    //推荐师申请
    distribeApply:params => {
        return API.POST('/api/distributor/apply',params)
    },
    // 获取推荐师奖金列表
    distributorLog:params=>{
    	return API.GET('/api/distributor/distributorLog',params)
    },
    // 积分日志
    poinLog:params=>{
    	return API.GET('/api/point/pointLog',params)
    },
    // 绑定银行卡
    bindCard(params){
        return API.POST('/api/distributor/info',params)
    },
    // 判断是否绑定了银行卡
    isBindCard(params){
        return API.GET('/api/distributor/isWithdrawInfo',params)
    }
  
}