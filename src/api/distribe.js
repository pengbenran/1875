import * as API from './base'

export default {
    //推荐师申请
    distribeApply:params => {
        return API.POST('/api/distributor/apply',params)
    },

  
}