import request from './network.js'

export function detail(iid)
{
  return request({
    url:'/detail',
    data:{
      iid
    }
  })
}
export function recommend()
{
  return request({
    url:'/recommend'
  })
}

export class Goods
{
  constructor(itemInfo,columns,services)
  {
    this.title=itemInfo.title;
    this.desc=itemInfo.desc;
    this.newPrice=itemInfo.price;
    this.oldPrice=itemInfo.oldPrice;
    this.discount=itemInfo.discountDesc;
    this.discountColor=itemInfo.discountBgColor;
    this.columns=columns;
    this.services=services;
    this.realPrice=itemInfo.lowNowPrice
  }
}

export class shop {
  constructor(shopInfo)
  {
    this.logo=shopInfo.shopLogo
    this.name=shopInfo.name
    this.fans=shopInfo.cFans
    this.sells=shopInfo.cSells
    this.score=shopInfo.score
    this.goodsCount=shopInfo.cGoods
  }
}

export class ParamInfo {
  constructor(info,rule)
  {
    this.image=info.images ? info.images[0] : ''
    this.infos=info.set
    this.sizes=rule.tables
  }
}