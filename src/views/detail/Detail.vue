<template>
  <div class="detail">
    <DetailNavBar class="detail-navbar" />
    <Scroll class="detail-content" ref="scroll">
        <DetailSwiper :topImages="topImages"/>
        <DetailBaseInfo :goods="goods"/>
        <DetailShopInfo :shop="shop"/>
        <DetailGoodsInfo :detailInfo="detailInfo" @DetailimgLoad="DetailimgLoad"/>
        <DetailParamInfo :paramInfo="paramInfo"/>
    </Scroll>
  </div>
</template>

<script>
import DetailNavBar from './childCom/DetailNavBar.vue';
import DetailSwiper from './childCom/DetailSwiper.vue';
import DetailBaseInfo from './childCom/DetailBaseInfo.vue';
import DetailShopInfo from './childCom/DetailShopInfo.vue'
import DetailGoodsInfo from './childCom/DetailGoodsInfo.vue';
import DetailParamInfo from './childCom/DetailParamInfo.vue';

import {getDetail, Goods, Shop, GoodsParam} from '@/network/detail'

import Scroll from '@/components/common/scroll/Scroll.vue';

    export default {
    name: "Detail", 
    components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo
},
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
        }
    },
    created() {
        // console.log(this.$route.params.iid)
        //1.保存传入的iid
        this.iid = this.$route.params.iid; 
        //2.根据保存的iid请求数据
        getDetail(this.iid).then(res =>{
            console.log(res)
            //2.1 获取轮播图数据
            this.topImages = res.result.itemInfo.topImages
            //2.2 获取商品信息
            this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)
            //2.3 获取店铺信息
            this.shop = new Shop(res.result.shopInfo)
            //2.4 保存商品的详情数据
            this.detailInfo = res.result.detailInfo
            //2.5 获取商品参数信息
            this.paramInfo = new GoodsParam(res.result.itemParams.info,res.result.itemParams.rule)
        })
    },
    methods: {
        DetailimgLoad() {
            this.$refs.scroll.refresh() 
        }
    }
}
</script>

<style scoped>
    .detail {
        position: relative;
        z-index: 5;
        background-color: #fff;
        height: 100vh;
    }
    .detail-navbar {
        position: relative;
        z-index: 100;
        background-color: #fff;
    }
    .detail-content {
        height: calc(100% - 44px);
    }
    
</style>