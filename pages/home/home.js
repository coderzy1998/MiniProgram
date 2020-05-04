import {
  getMultidata,
  getGoods
} from '../../service/home.js'

const type = ['pop', 'new', 'sell']
Page({
  data: {
    banners: [],
    recommend: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      'pop': {
        page: 0,
        list: []
      },
      'new': {
        page: 0,
        list: []
      },
      'sell': {
        page: 0,
        list: []
      }
    },
    currentType: 'pop',
    isShowBackTop:false,
    isShowTab:false,
    tabOffsetTop:0
  },
  //页面加载时回调
  onLoad(options) {
    this._getMultidata()
    this._getGoods('pop')
    this._getGoods('new')
    this._getGoods('sell')
  },
  // -------------------------网络请求----------------------------
  _getMultidata() {
    getMultidata().then(res => {
      const banners = res.data.data.banner.list
      const recommend = res.data.data.recommend.list
      this.setData({
        banners,
        recommend
      })
    })
  },
  _getGoods(type) {
    let page = this.data.goods[type].page + 1
    getGoods(type, page).then(res => {
      // 1.取出list
      let list = res.data.data.list
      // 2.将list  push到对应的数据中
      let oldList = this.data.goods[type].list
      oldList.push(...list)
      // 3.实时的将数据push到data中
      // 因为setData不可以直接写复杂的数据，所以定义两个数据保存对应的type和page
      const typekey = `goods.${type}.list`
      const pagekey = `goods.${type}.page`
      this.setData({
        [typekey]: oldList,
        [pagekey]: page
      })
    })
  },
  // -------------------------事件监听----------------------------
  itemClick(event) {
    const index = event.detail.index
    this.setData({
      currentType: type[index]
    })
    wx.pageScrollTo({
      scrollTop:this.data.tabOffsetTop
    })
  },
  imgLoad(){
    wx.createSelectorQuery().select('#tab-controll').boundingClientRect(res =>
      {
        this.data.tabOffsetTop=res.top
      }).exec()
  },
  //页面显示时回调
  onShow() {
    
  },
  //页面第一次渲染时回调
  onReady() {

  },
  //页面隐藏时回调
  onHide() {

  },
  // 页面被销毁时回调
  onUnload() {

  },
  // 监听页面滚动
  onPageScroll(position) {
    let scrollTop=position.scrollTop
    //官方不建议我们在onPageScroll中多次调用setData
    let flag=scrollTop >= 600
    if(flag!=this.data.isShowBackTop){
      this.setData({
        isShowBackTop:flag
      })
    }
    let flag2=scrollTop>=this.data.tabOffsetTop
    if(flag2!=this.data.isShowTab){
      this.setData({
        isShowTab:flag2
      })
    }
  },
  // 监听下拉加载更多
  onPullDownRefresh() {
   
  },
  // 监听页面滚动到底部
  onReachBottom() {
    this._getGoods(this.data.currentType)
  },
  onShareAppMessage(){
    return {
      title:'supermall',
      path:'/pages/home/home',
      imageUrl:"https://s10.mogucdn.com/mlcdn/c45406/180926_45fkj8ifdj4l824l42dgf9hd0h495_750x390.jpg"
    }
  }
})