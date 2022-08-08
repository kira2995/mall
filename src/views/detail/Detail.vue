<template>
  <div class="detail">
    <DetailNavBar class="detail-navbar" @titleClick="titleClick" ref="detailnav"/>
    <Scroll class="detail-content" ref="scroll" :probeType="3" @scroll="contentScroll">
        <DetailSwiper :topImages="topImages"/>
        <DetailBaseInfo :goods="goods"/>
        <DetailShopInfo :shop="shop"/>
        <DetailGoodsInfo :detailInfo="detailInfo" @DetailimgLoad="DetailimgLoad"/>
        <DetailParamInfo ref="params" :paramInfo="paramInfo"/>
        <DetailCommentInfo ref="comments" :commentInfo="commentInfo"/>
        <GoodsList ref="recommends" :goods="recommends"/>
    </Scroll>
    <DetailBottomBar/>
    <BackTop @click.native="backClick" v-show="isshowbacktop"/>
  </div>
</template>

<script>
import DetailNavBar from './childCom/DetailNavBar.vue';
import DetailSwiper from './childCom/DetailSwiper.vue';
import DetailBaseInfo from './childCom/DetailBaseInfo.vue';
import DetailShopInfo from './childCom/DetailShopInfo.vue'
import DetailGoodsInfo from './childCom/DetailGoodsInfo.vue';
import DetailParamInfo from './childCom/DetailParamInfo.vue';
import DetailCommentInfo from './childCom/DetailCommentInfo.vue';
import DetailBottomBar from './childCom/DetailBottomBar.vue';

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from '@/network/detail'

import Scroll from '@/components/common/scroll/Scroll.vue';
import GoodsList from '@/components/content/goods/GoodsList.vue';
import BackTop from '@/components/content/backtop/BackTop.vue';
import { debounce } from '@/common/utils/utils';




    export default {
    name: "Detail", 
    components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop
},
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            detailTopY: [],
            getdetailTopY: null,
            currentIndex: 0,
            isshowbacktop: false,
        }
    },
    created() {
        // console.log(this.$route.params.iid)
        //1.保存传入的iid
        this.iid = this.$route.params.iid; 
        //2.根据保存的iid请求数据
        getDetail(this.iid).then(res =>{
            // console.log(res)
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
            //2.6 获取商品评论
            if (res.result.rate.cRate !== 0) {
                this.commentInfo = res.result.rate.list[0]
            }
        })
        //3.请求推荐数据
        getRecommend().then(res => {
            console.log(res)
            this.recommends = res.data.list
        }) 
        //4.给getdetailTopY赋值
        // this.getdetailTopY = debounce(() => {
        //     this.detailTopY = []
        //     this.detailTopY.push(0)
        //     this.detailTopY.push(this.$refs.params.$el.offsetTop)
        //     this.detailTopY.push(this.$refs.comments.$el.offsetTop)
        //     this.detailTopY.push(this.$refs.recommends.$el.offsetTop)
        //     console.log(this.detailTopY)
        // })
    },
    methods: {
        DetailimgLoad() {
            this.$refs.scroll.refresh() 
        },
        titleClick(index) {
            // console.log(index)
            this.$refs.scroll.scrollTo(0, -this.detailTopY[index], 100)
        },
        contentScroll(position) {
            // console.log(position)
            //1.获取Y值
            const positionY = -position.y
            //2.positionY与内容的y值进行对比
            let length = this.detailTopY.length;
            for (let i = 0; i < length; i++) {
                // if (this.currentIndex !== i &&((i < length-1 && positionY >= this.detailTopY[i] 
                // && positionY < this.detailTopY[i+1]) || (i === length-1 && positionY >= this.detailTopY[i])))
                if (this.currentIndex !== i && (positionY) >= this.detailTopY[i] && (positionY) < this.detailTopY[i+1])
                {
                    this.currentIndex = i
                    // console.log(this.currentIndex)
                    this.$refs.detailnav.currentIndex = this.currentIndex
                }
            }
            //是否显示 返回顶部
            this.isshowbacktop = (-position.y) > 570
        },
        //返回顶部
      backClick() {
        // console.log('backClick')
        this.$refs.scroll.scrollTo(0, 0, 200)
      },
    },
    updated() {
         this.detailTopY = []
            this.detailTopY.push(0)
            this.detailTopY.push(this.$refs.params.$el.offsetTop)
            this.detailTopY.push(this.$refs.comments.$el.offsetTop)
            this.detailTopY.push(this.$refs.recommends.$el.offsetTop)
            // console.log(this.detailTopY)
    },
    
}
</script>

<style scoped>
    .detail {
        position: relative;
        z-index: 5;
        background-color: #fff;
        height: 100vh;
        overflow: hidden;
    }
    /* .detail-navbar {
        position: relative;
        z-index: 100;
        background-color: #fff;
    } */
    .detail-content {
        height: calc(100% - 44px - 49px);
        bottom: 49px;
    }
    
</style>