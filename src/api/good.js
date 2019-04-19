import * as API from './base'

export default {
    //获取商品详情
    GetGoodDetail:params => {
        return API.GET('/api/good/detail',params)
    },

    //收藏指定商品
    CollectionShop:params =>{
        return API.POST('/api/good_favorite/favorite',params)
    },

    //取消指定商品收藏
    DeleteCollectionShop:params => {
        return API.PUT('/api/good_favorite/favorite',params)
    },

    GetCollectionShop:params => {
        return API.GET('/api/good_favorite/favorite',params)
    }
}