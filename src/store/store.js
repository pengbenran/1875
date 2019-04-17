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
    ExplosivesSaleObj:{}
  },
  mutations:{
   storeUserInfo(state,userInfo){
   	state.userInfo=userInfo
   },
   storeExplosivesSaleObj(state,ExplosivesSaleObj){
    state.ExplosivesSaleObj=ExplosivesSaleObj
   }
}
})