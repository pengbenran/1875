import Vue from 'vue'
import Vuex from 'vuex'
import goodcat from './modules/goodCat'
Vue.use(Vuex)
 
export default new Vuex.Store({
  modules:{
    goodcat
  },
  state:{
  	userInfo:{},
    ExplosivesSaleObj:{},
    goodDetail:{},
    distribInfo:{},
    config:{}
  },
  mutations:{
   storeUserInfo(state,userInfo){
   	state.userInfo=userInfo
   },
   storeExplosivesSaleObj(state,ExplosivesSaleObj){
    state.ExplosivesSaleObj=ExplosivesSaleObj
   },
   storeGoodDetail(state,goodDetail){
    state.goodDetail=goodDetail
   },
   storeDistribInfo(state,distribInfo){
    state.distribInfo=distribInfo
   },
   storeConfig(state,config){
    state.config=config
   }
}
})