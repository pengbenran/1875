import Fly from "flyio/dist/npm/wx";//引入路径根据自己放置的目录配置
var fly = new Fly;
fly.interceptors.request.use((request) => {
    request.timeout = 30000;
    let that=this
    if (true) {//检查本地缓存是否有token存在没有则重新获取
        request.headers = {//设置请求头
            "content-type": "application/x-www-form-urlencoded",
            // "Authorization": wx.getStorageSync('Token')
            "Authorization":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLlsI_nqIvluo_nmbvlvZUiLCJjb250ZXh0VXNlcklkIjoi5bCP56iL5bqP55m75b2VIiwiY29udGV4dE5hbWUiOiLlsI_nqIvluo_nmbvlvZUiLCJyZW5ld2FsVGltZSI6MTU1MTA4MTU0MTEyMn0.bgWb9ZRbzFXtJhKKE-9WGGIeL3NvTeWXj5lClvNNnYQ"
        }
        return request;
    } else {
     
    }
})
 
fly.interceptors.response.use(
    (response) => {
        wx.hideLoading();
        return response;//请求成功之后将返回值返回
    },
    (err) => {
        //请求出错，根据返回状态码判断出错原因
        console.log(err)
        wx.hideLoading();
        if (err.status == 0) {
            return "网络连接异常"
        } else if (err.status == 1) {
            return "网络连接超时"
        } else if (err.status == 401) {
            return "用户未登录"
        } else {
          if (err.response.data.message) {
            return err.response.data.message
          } else {
            return '请求数据失败,请稍后再试'
          }
        };
        // Do something with response error
    }
)
// let base='https://zhifenxiang.guqinet.com'
let base='https://1875.guqinet.com'
// let base='http://192.168.0.114:8090'
// let base='http://192.168.0.108/1875'
export const POST = (url, params) => {
  return fly.post(`${base}${url}`, params,{headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }}).then(res => res.data)
}

export const GET = (url, params) => {
  return fly.get(`${base}${url}`,params).then(res => res.data)
}

export const PUT = (url, params) => {
  return fly.put(`${base}${url}`, params).then(res => res.data)
}

export const DELETE = (url, params) => {
  return fly.delete(`${base}${url}`, {
    params: params
  }).then(res => res.data)
}

export const PATCH = (url, params) => {
  return fly.patch(`${base}${url}`, params).then(res => res.data)
}                                                             