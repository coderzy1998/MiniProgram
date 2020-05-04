App({
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch() {

  },
  ckeck_token(token) {
    console.log('执行了token验证')
    wx.request({
      url: 'http://123.207.32.32:3000/auth',
      header: {
        token
      },
      data: {},
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: (res) => {
        if (!res.data.errCode) { //token没有过期
          console.log('token有效')
        } else { //token过期，重新登录
          this.login()
        }
      },
      fail: function (err) {
        // fail
        console.log(err)
      },
      complete: function () {
        // complete
      }
    })
  },
  login() {
    wx.login({
      success: (res) => {
        console.log('执行了登录')
        // code只会存在5分钟
        const code = res.code;
        wx.request({
          url: 'http://123.207.32.32:3000/login',
          data: {
            code
          },
          method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: (res) => {
            // 1.取出token
            const token = res.data.token;
            // 2.将token存到全局变量中
            this.globalData.token = token;
            // 3.将token存到本地
            wx.setStorageSync('token', token)
          },
        })
      },
    });
  },
  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {},

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  },
  // 定义全局变量
  globalData: {
    cartList: []
  },
  addCart(product) {
    return new Promise((resolve, reject) => {
      let oldProduct = this.globalData.cartList.find(item => {
        return item.iid === product.iid
      })
      if (oldProduct) {
        oldProduct.count += 1
        resolve('商品数量加一')
      } else {
        product.ckecked = true
        product.count = 1
        this.globalData.cartList.push(product)
        resolve('添加购物车成功')
      }
    })
    if(this.addCartCallBack){
      this.addCartCallBack()
    }
  }
})