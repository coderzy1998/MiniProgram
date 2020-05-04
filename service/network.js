export default function request(options){
  wx.showLoading({
    title: '数据正在加载中',
  })
  const baseUrl='新接口加老师微信coderwhy002'
  return new Promise((resolve,reject) => 
  {
    wx.request({
      url: baseUrl+options.url,
      data: options.data || {},
      method: options.method || 'get',
      success: resolve,
      fail: reject,
      complete:()=>{
        wx.hideLoading({
          complete: (res) => {},
        })
      }
    })
  })
}
