import Api from "@/api/home";
import store from '@/store/store'
export function accSub(arg1, arg2) { 
    var r1, r2, m, n; 
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 } 
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 } 
    m = Math.pow(10, Math.max(r1, r2)); 
    n = (r1 >= r2) ? r1 : r2; 
    return ((arg1 * m - arg2 * m) / m).toFixed(n); 
  }
  export function accAdd(arg1, arg2) { 
    var r1, r2, m, n; 
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 } 
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 } 
    m = Math.pow(10, Math.max(r1, r2)); 
    n = (r1 >= r2) ? r1 : r2; 
    return ((arg1 * m + arg2 * m) / m).toFixed(n); 
  }
  export function updateUserInfo(){
  	let that=this
  	wx.login({
  		success: function (res) {
  			if (res.code) {
  				Api.getCode(res.code).then(function(memberRes){
  					if(memberRes.code!=500){
  						if(memberRes.memberEntity.distributorStatus==1){
  							store.commit("storeDistribInfo",memberRes.distributorInfo)
  						}
  						store.commit("storeUserInfo",memberRes.memberEntity)        
  					}
  				})
  			}
  		}
  	}) 
  }

 export default {
  accSub,
  updateUserInfo,
  accAdd
}