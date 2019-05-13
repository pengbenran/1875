<template>
  <div>
    <div class="top">
        <span class="tip">当前城市</span>
        <div class="Title">{{City}}</div>
    </div>


    <div class="ListWarp">
        <span  class="tip">已开通以下城市</span>
        <div class="tit" v-for="(item,index) in CityList" :index='index' :key="item" @click="CitySelect(item.value,item.name)">{{item.name}}</div>
    </div>

    <div class="Mask">
        我们将开通更多城市，敬请期待！
    </div>
  </div>
</template>
<script>
import Api from "@/api/home";
import Lib from '@/utils/Lib';
import { mapState,mapActions } from 'vuex'
export default {
   data () {
       return {
        CityList:[]
       }
   },
   computed:{
     ...mapState('city',['City'])
   },
   mounted(){
       this.GetAddresData();
   },
   methods:{
        ...mapActions('city',['SetCity']),
        //获取地址
        GetAddresData(){
            let that = this;
            Api.GetAddresData().then(res=> {
                if(res.code == 0){
                    let arr = [];
                    res.city.map(M => {
                        if(M.parentId != 0){
                            arr.push(M)
                        } 
                    })
                    this.CityList = arr;
                }else{
                    Lib.showToast('失败','none')	
                }
            }).catch(err => {
                    Lib.showToast('失败','none')						
            })
        },

        CitySelect(value,name){
            let that = this;
            that.SetCity(name)
            wx.setStorageSync('City',name);
            wx.setStorageSync('adcode',value);
            wx.switchTab({
               url: '../index/main', 
            })
        }
   }    
}
</script>
<style scoped>
.top,.ListWarp{padding: 0 8px;margin-bottom: 10px;}
.tip{font-size: 14px;color: #999999;}
.Title{line-height: 57px;font-size: 30px;color: #333333;font-weight: bold;border-bottom: 1px solid #dedede;}
.tit{line-height: 49px;font-size: 17px;font-weight: bold;color: #333333;border-bottom: 1px solid #dedede;}
.Mask{text-align: center;font-size: 14px;color:#999999;}
</style>
