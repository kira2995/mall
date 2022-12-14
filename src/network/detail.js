import { request } from "./request";

    export function getDetail(iid) {
        return request({
            url: '/detail',
            params: {
                iid
            }
        }) 
    }

    export function getRecommend() {
        return request({
            url: '/recommend',
        }) 
    }

    export function getCategory() {
        return request({
        url: '/category'
        })
    }
  
  export function getSubcategory(maitKey) {
    return request({
      url: '/subcategory',
      params: {
        maitKey
      }
    })
  }
  
  export function getCategoryDetail(miniWallkey, type) {
    return request({
      url: '/subcategory/detail',
      params: {
        miniWallkey,
        type
      }
    })
  }

export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice;
        this.realPrice = itemInfo.lowNowPrice;
        this.discount = itemInfo.discountDesc;
        this.columns = columns;
        this.services = services
    }
}

export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods
    }
}

export class GoodsParam {
    constructor(info, rule) {
        //有的参数没有图片
        this.image = info.image ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables
    }
}