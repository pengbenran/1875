import * as API from './base'
export default {
	// 获取推荐师推广二维码码
	publicQRCode(params){
		return API.GET('/api/member/publicQRCode',params)
	},

	//获取所有的会员等级
	GetMenberLvData:params => {
		return API.GET('/api/member/lvs',params)
	},

	//获取不同等级的下线
	GetLvDtaLits:params => {
		return API.GET('/api/member/team',params)
	}


}