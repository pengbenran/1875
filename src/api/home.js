import * as API from './base'
export default {
	// 根据code判断是否是会员
	getCode(code){		
	 // return API.GetCode('https://nadou.guqinet.com/api/login/byCode',{code:code})
	 return API.GetCode('http://192.168.0.114/1875/api/member/getMemberinfo',{code:code})

	},
	// 获取用户信息并且注册会员  
	weCatLogin(params){
		return API.getLogin('http://192.168.0.114/1875/api/member/weChatLogin',params)
		// return API.getLogin('https://nadou.guqinet.com/api/login/weChatLogin',params)
	},
	// 获取首页banner图跟分类背景图
	getIndexImage(params){
		return API.GET('/api/advertisement/getIndexImage',params)
	}
}
