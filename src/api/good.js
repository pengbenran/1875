import * as API from './base'

export default {
    //获取商品详情
    GetGoodDetail:params => {
        return API.GET('/api/good/detail',params)
    }
}