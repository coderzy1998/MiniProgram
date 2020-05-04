// pages/cart/childCpns/cart-list-item/cart-list-item.js
const app = getApp()

Component({
  properties: {
    goods: {
      type: Object,
      value: {}
    },
    index: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCheckClick(e) {
      // 1.查找到对应的商品
      const goods = app.globalData.cartList.find(item => item.iid == this.properties.goods.iid)
      goods.checked = !goods.checked
      
      // 2.获取当前商品的index
      const index = e.currentTarget.dataset.index;

      // 3.回调
      app.changeGoodsState(index, goods)
    },
    sub(event){
      const goods=app.globalData.cartList.find(item =>{
        return item.iid==this.properties.goods.iid
      })
      const index=event.currentTarget.dataset.index
      if(goods.count<=1){
        app.deleteGoods(index)
      }else{
        goods.count--
        app.changeGoodsState(index,goods)
      }
    },
    add(event){
      const goods=app.globalData.cartList.find(item =>{
        return item.iid==this.properties.goods.iid
      })
      goods.count++
      const index=event.currentTarget.dataset.index;
      app.changeGoodsState(index,goods)
    },
    input(event){
      
    },
    blur(event){
      const value=event.detail.value
      const goods=app.globalData.cartList.find(item => item.iid===this.properties.goods.iid)
      goods.count=value
      const index=event.currentTarget.dataset.index
      app.changeGoodsState(index,goods)
      
    },
    toDetail(){
      wx.navigateTo({
        url: `/pages/detail/detail?iid=${this.properties.goods.iid}`,
        
      })
    }
  }
})
