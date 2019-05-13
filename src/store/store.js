import Vue from 'vue'
import Vuex from 'vuex'
import goodcat from './modules/goodCat'
import city from './modules/City'
Vue.use(Vuex)
 
export default new Vuex.Store({
  modules:{
    city,
    goodcat
  },
  state:{
  	userInfo:{},
    ExplosivesSaleObj:{},
    goodDetail:{},
    distribInfo:{},
    config:{},
    goodsId:'',
    codeUnionid:'',
    cardInfo:{}
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
   },
    storecodeUnionid(state,codeUnionid){
    state.codeUnionid=codeUnionid
   },
    storegoodsid(state,goodsId){
    state.goodsId=goodsId
   },
   storeCardInfo(state,cardInfo){
    state.cardInfo=cardInfo
   }
}
})