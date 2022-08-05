<template>
    <div id="home">
      <NavBar class="home-nav"><div slot="center">购物系统</div></NavBar>

      <Scroll class="scroll-content" ref="scroll" :probeType="3" @scroll="contentscroll" :pullUpLoad="true" @pullingUp="loadmore">
        <HomeSwiper :banners="banners"></HomeSwiper>
        <RecommendView :recommends="recommends"></RecommendView>
        <WeekView></WeekView>
        <TabControl class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"></TabControl>
        <GoodsList :goods="showType"></GoodsList>
      </Scroll>
      <!-- <div class="back-top" @click="backClick">
        <img  src="../../assets/img/common/top.png" alt="返回顶部">
      </div> -->
        <BackTop @click.native="backClick" v-show="isshowbacktop"/>
    </div> 
  
</template>

<script> 
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import WeekView from './childComps/WeekView.vue'

  import NavBar from '@/components/common/navbar/NavBar.vue'
  import Scroll from '@/components/common/scroll/Scroll'

  import TabControl from '@/components/content/tabcontrol/TabControl.vue'
  import GoodsList from '@/components/content/goods/GoodsList.vue'
  import BackTop from '@/components/content/backtop/BackTop.vue'
  
  import {getHomeMultidata,getHomeGoods} from '@/network/home'

  

  export default {
    name: "Home",
    components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    WeekView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
},
    data() {
      return {
        banners: [],
        recommends:[],
        goods:{
          'pop': {page: 0, list:[]},
          'new': {page: 0, list:[]},
          'sell': {page: 0, list:[]},
        },
        currentType:'pop',
        isshowbacktop: false 
      }
    },
    computed:{
      showType(){
        return this.goods[this.currentType].list
      }
    },
    created() {
      //请求轮播图和推荐商品的数据
      this.getHomeMultidata()
      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

      //监听图片加载
      this.$bus.$on('itemImageLoad', () =>{
        // console.log('图片加载完成')
        this.$refs.scroll.refresh()
      })
    },
    methods: {
      /*
      * 事件监听相关的方法
      */
     tabClick(index) {
      switch(index){
        case 0:
          this.currentType='pop'
          break
        case 1:
          this.currentType='new'
          break
        case 2:
          this.currentType='sell'
          break    
      }
     },
     //返回顶部
      backClick() {
        // console.log('backClick')
        this.$refs.scroll.scrollTo(0, 0, 200)
      },
      //监听滚动的方法
      contentscroll(position) {
        // console.log(position)
        this.isshowbacktop = -position.y > 570
      },
      loadmore() {
        this.getHomeGoods(this.currentType)

        // this.$refs.scroll.scroll.refresh()
      },
      
      /*
      * 网络请求相关的方法
      */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page =this.goods[type].page + 1 
        getHomeGoods(type, page).then(res =>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      },
      
    }
      
       
  }
</script>

<style >
  #home{
    /* padding-top: 44px; */
    height: 100vh;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right:0;
    z-index: 10;
  }
  .tab-control{
    position: sticky;
    top:44px;
    z-index: 10;
  }
  .scroll-content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top:44px;
  }
  .back-top{
        position: fixed;
        right: 5px;
        bottom: 49px;
    }
    .back-top img{
        height: 43px;
        width: 43px;
    }
</style>
