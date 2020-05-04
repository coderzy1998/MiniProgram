//Page Object
import {
  detail,
  Goods,
  shop,
  ParamInfo,
  recommend
} from '../../service/detail.js'
const app = getApp()
Page({
  data: {
    iid: '',
    topImages: [],
    goods: {},
    shop: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    recommend: [],
    isShowBackTop: false,
    topYs: [],
    getTopYs: null
  },

  //options(Object)
  onLoad: function (options) {
    this.setData({
      iid: options.iid
    })
    // --------------------网络请求---------------------------
    detail(this.data.iid).then(res => {
      const data = res.data.result
      this.setData({
        topImages: data.itemInfo.topImages,

        goods: new Goods(data.itemInfo, data.columns, data.shopInfo.services),

        shop: new shop(data.shopInfo),

        detailInfo: data.detailInfo,

        paramInfo: new ParamInfo(data.itemParams.info, data.itemParams.rule),

      });
      if (data.rate.list) {
        this.setData({
          commentInfo: data.rate.list[0]
        })
      }
    });
    recommend().then(res => {
      const data = res.data.data.list
      this.setData({
        recommend: data
      })
    });
    // ----------------------------事件监听-------------------------

  },
  // ----------------------------事件监听-------------------------
  imgLoad() {
    // this.data.topYs.push(0)
    this.data.topYs[0]=0
    wx.createSelectorQuery().select('#paramInfo').boundingClientRect(res => {
      // this.data.topYs.push(res.top - 44)
      this.data.topYs[1]=res.top-44
    }).exec();
    wx.createSelectorQuery().select('#commentInfo').boundingClientRect(res => {
      // this.data.topYs.push(res.top - 44)
      this.data.topYs[2]=res.top-44
    }).exec();
    wx.createSelectorQuery().select('#recommendInfo').boundingClientRect(res => {
      // this.data.topYs.push(res.top - 44)
      this.data.topYs[3]=res.top-44
    }).exec();
  },

  titleClick(index) {
    const titleIndex = index.detail
    wx.pageScrollTo({
      scrollTop: this.data.topYs[titleIndex],
      duration: 500,

    })
  },
  onAddCart() {
    // 添加购物车信息
    const product = {}
    product.image = this.data.topImages[0];
    product.title = this.data.goods.title;
    product.desc = this.data.goods.desc;
    product.price = this.data.goods.realPrice;
    product.iid = this.data.iid
    app.addCart(product).then(res =>{
      wx.showToast({
        title: res,
        icon: 'success',
        image: '',
        duration: 1500,
        mask: false,
        success: (result)=>{

        },
        fail: ()=>{},
        complete: ()=>{}
      });
    })
  },

  onPageScroll(position) {
    let scrollTop = position.scrollTop
    let flag = scrollTop >= 600
    if (this.data.isShowBackTop != flag) {
      this.setData({
        isShowBackTop: flag
      })
    }
    const nav = this.selectComponent('#navbar')
    const flag1 = scrollTop >= 0 && scrollTop < this.data.topYs[1] - 1
    const flag2 = scrollTop >= this.data.topYs[1] - 1 && scrollTop < this.data.topYs[2] - 1
    const flag3 = scrollTop >= this.data.topYs[2] - 1 && scrollTop < this.data.topYs[3] - 1
    const flag4 = scrollTop >= this.data.topYs[3] - 1
    if (flag1) {
      nav.setIndex(0)
    } else if (flag2) {
      nav.setIndex(1)
    } else if (flag3) {
      nav.setIndex(2)
    } else if (flag4) {
      nav.setIndex(3)
    }
  }
});