// pages/cart/cart.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList:[],
    isSelectAll:false,
    totalPrice:0,
    totalCounter:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 第一次获取商品
    this.setData({
      cartList:app.globalData.cartList
    })
    app.addCartCallBack=()=>{
      this.setData({
        cartList:app.globalData.cartList
      })
      this.changeData()
    }
    app.changeGoodsState=(index,goods)=>{
      this.setData({
        [`cartList[${index}]`]:goods
      })
      let selectAll=!this.data.cartList.find(item =>{
        return !item.checked
      })
      this.setData({
        isSelectAll:selectAll
      })
      this.changeData()
    }
    app.deleteGoods=(index)=>{
      this.data.cartList.splice(index,1)
      this.setData({
        cartList:this.data.cartList
      })
      let selectAll=!this.data.cartList.find(item =>{
        return !item.checked
      })
      this.setData({
        isSelectAll:selectAll
      })
      this.changeData()
    }
  },
  changeData(){
    let counter=0
    let price=0
    for(let i of this.data.cartList){
      if(i.checked){
        counter++
        price+=i.price*i.count
      }
    }
    this.setData({
      totalCounter:counter,
      totalPrice:price
    })
    wx.setNavigationBarTitle({
      title: `购物车(${this.data.cartList.length})`,
    })
  },
  onSelectAll(){
    if(this.data.isSelectAll){
      this.data.cartList.forEach(element => {
        element.checked=false
      });
      this.setData({
        cartList:this.data.cartList,
        isSelectAll:false
      })
    }else{
      this.data.cartList.forEach(item =>{
        item.checked=true
      })
      this.setData({
        cartList:this.data.cartList,
        isSelectAll:true
      })
    }
    this.changeData()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: `购物车(${this.data.cartList.length})`,
    })
    app.addCartCallBack()
    this.changeData()
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})