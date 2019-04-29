 <template>
  <div class='mode' v-if="isMember">
    <div class='bcg'></div>
    <div class='loginmodel'>
      <div class='title'>授权提示</div>
      <div class="underLine"></div>
      <div class='modeltip'>获取您的个人信息、昵称、头像等</div>
      <button class='modelbtn' open-type="getUserInfo"  @getuserinfo="getUserInfo" :disable="isSubmit">知道了</button> 
    </div> 
  </div>
</template>

<script>
import Api from "@/api/home";
import store from '@/store/store'
export default {
  props: [],
  data () {
    return {
       isMember:false,
       isSubmit:false
    }
    },
    mounted(){
 
    },
    methods: {
    getUserInfo(){   
      var that = this 
      if(that.memberId=="00"){
       that.isSubmit=true
       wx.login({
        success: res => {
        console.log("你好世界阿三大三大",12312)
           let code=res.code   
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (code) { 
             wx.getUserInfo({
              success: function (res_user) {
                let params={}
                params.code=code
                params.iv=res_user.iv
                params.encryptedData=res_user.encryptedData
                Api.weCatLogin(params).then(function(res){
                  if(res.code==0){
                    that.isSubmit=false
                    that.isMember=false
                    that.userLogin()
                  }
                }) 
              }
            }) 
           }
        } 
       })
     }
   },
  userLogin(){
    return new Promise((resolve, reject) => {
      let that=this
      wx.login({
        success: function (res) {
          if (res.code) {
            Api.getCode(res.code).then(function(memberRes){
              if(memberRes.code!=500){
                wx.showTabBar({})
                if(memberRes.memberEntity.distributorStatus==1){
                  store.commit("storeDistribInfo",memberRes.distributorInfo)
                }
                store.commit("storeUserInfo",memberRes.memberEntity)
                that.$emit('GetGoodsInfo')
                that.$emit('memberCancel')
              }
              else {
                let memberId="00"
                that.memberId=memberId
                wx.setStorageSync('memberId', "00")
                that.isMember=true
              }
              resolve()
            })
          }
        }
      }) 
    })
    
  },
}
}
</script>

<style  scoped lang='less'>
/* 登录模态框 */
.mode{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}
.bcg{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.7);
}
.loginmodel{
  border-radius:10rpx; 
  width: 80%;
  background: #fff;
  position: absolute;
  top: 350rpx;
  left: 10%;
}
.title{
  height: 90rpx;
  line-height:119rpx;
  font-size: 17px;
  font-weight: bold;
  color: #333;
  text-align: center;
}
.underLine{
  width:33px;
  height: 4px;
  background: #ff6e6e;
  margin:0 auto;
}
.modeltip{
  margin: 0 auto;
  font-size: 15px;
  text-indent: 20px;
  color: #333;
  height: 100rpx;
  margin-top: 24px;
  text-align: center;
}
.modelbtn{
  border: none;
  outline: 0;
  text-align: center;
  width:184px;
  height: 49px;
  line-height:49px;
  background: #ff6e6e;
  color: #fff;
  font-size:17px;
  font-weight: bold;
  border-radius: 25px;
  margin-bottom: 12px;
}
button::after {
  border: none;
}

</style>