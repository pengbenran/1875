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
    poinLog:params=>{
    	return API.GET('/api/point/pointLog',params)
    },

    //判断当前用户是否提交申请
    boolDis:params => {
        return API.GET('/api/distributor/apply',params)
    }
  
}