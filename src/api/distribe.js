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

    //判断当前用户是否提交申请
    boolDis:params => {
        return API.GET('/api/distributor/apply',params)
    },
    // 绑定银行卡
    bindCard(params){
        return API.POST('/api/distributor/info',params)
    },
    // 编辑银行卡
    editBankCard(params){
        return API.POST('/api/distributor/editInfo',params)
    },
    // 判断是否绑定了银行卡
    isBindCard(params){
        return API.GET('/api/distributor/isWithdrawInfo',params)
    },

    //获取所有分享师的等级
    GetDistributorData:params => {
        return API.GET('/api/distributor/lvs',params)
    },
    // 提现申请
    withdrawApply(params){
        return API.POST('/api/distributor/withdrawal/apply',params)
    }
  
}