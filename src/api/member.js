import * as API from './base'
export default {
	// 获取推荐师推广二维码码
	publicQRCode(params){
		return API.GET('/api/member/publicQRCode',params)
	},
}