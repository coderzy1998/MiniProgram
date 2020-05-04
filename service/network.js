export default function request(options){
  wx.showLoading({
    title: '数据正在加载中',
  })
  const baseUrl='http://152.136.185.210:8000/api/h8'
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