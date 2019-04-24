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
    // 获取喜欢商品的数据
    GetCollectionShop:params => {
        return API.GET('/api/good_favorite/favorite',params)
    },

    //获取热门搜索
	getHotSearTag(params){
		return API.GET('/api/good/hot_search',params)
	}
}