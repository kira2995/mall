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
    <DetailBottomBar @addTOCart="addToCart"/>
    <BackTop @click.native="backClick" v-show="isshowbacktop"/>
    <!-- <toast message="message" :msgShow="msgShow"/> -->
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
// import Toast from '@/components/common/toast/Toast.vue';

import GoodsList from '@/components/content/goods/GoodsList.vue';
import BackTop from '@/components/content/backtop/BackTop.vue';

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
        BackTop,
        // Toast,
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
            // message: '',
            // msgShow: false
        }
    },
    created() {
        // console.log(this.$route.params.iid)
        //1.???????????????iid
        this.iid = this.$route.params.iid; 
        //2.???????????????iid????????????
        getDetail(this.iid).then(res =>{
            // console.log(res)
            //2.1 ?????????????????????
            this.topImages = res.result.itemInfo.topImages
            //2.2 ??????????????????
            this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)
            //2.3 ??????????????????
            this.shop = new Shop(res.result.shopInfo)
            //2.4 ???????????????????????????
            this.detailInfo = res.result.detailInfo
            //2.5 ????????????????????????
            this.paramInfo = new GoodsParam(res.result.itemParams.info,res.result.itemParams.rule)
            //2.6 ??????????????????
            if (res.result.rate.cRate !== 0) {
                this.commentInfo = res.result.rate.list[0]
            }
        })
        //3.??????????????????
        getRecommend().then(res => {
            // console.log(res)
            this.recommends = res.data.list
        }) 
        //4.???getdetailTopY??????
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
            //1.??????Y???
            const positionY = -position.y
            //2.positionY????????????y???????????????
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
            //???????????? ????????????
            this.isshowbacktop = (-position.y) > 570
        },
        //????????????
      backClick() {
        // console.log('backClick')
        this.$refs.scroll.scrollTo(0, 0, 200)
      },
      //???????????????
      addToCart() {
        //1.??????????????????
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.newPrice
        product.iid = this.iid
        //2.????????????????????????
        this.$store.commit('addCart', product)

        this.$toast.Show('??????????????????')
    //     this.msgShow = true
    //     this.message = '??????????????????' 
    //     setTimeout(() => {
    //         this.msgShow = false
    //         this.message = '' 
    //     },1500)
    //   },
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