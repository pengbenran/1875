import * as API from './base'
export default {
	// 根据code判断是否是会员
	getCode(code){		
	 return API.GET('/api/member/getMemberinfo',{code:code})
	},
	// 获取用户信息并且注册会员  
	weCatLogin(params){
		return API.GET('/api/member/weChatLogin',params)
	},	
	// 获取首页banner图跟分类背景图
	getIndexImage(params){
		return API.GET('/api/advertisement/getIndexImage',params)
	},
	// 获取小程序全局设置
	getConfig(){
		return API.GET('/api/member/getGlobalConfig')
	},
	//获取地址
	GetAddresData(params){
		return API.GET('/api/member/openCity',params)
	}


}
