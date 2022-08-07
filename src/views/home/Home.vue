<template>
    <div id="home">
      <NavBar class="home-nav"><div slot="center">购物系统</div></NavBar>
      <TabControl class="tab-content" ref="tabControl1" :titles="['流行','新款','精选']" @tabClick="tabClick" v-show="istabControlshow"></TabControl>
      
      <Scroll class="scroll-content" ref="scroll" :probeType="3" @scroll="contentscroll" :pullUpLoad="true" @pullingUp="loadmore">
        <HomeSwiper :banners="banners" @imageLoad="imageLoad"></HomeSwiper>
        <RecommendView :recommends="recommends"></RecommendView>
        <WeekView></WeekView>
        <TabControl ref="tabControl2" :titles="['流行','新款','精选']" @tabClick="tabClick" ></TabControl>
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
  import {debounce} from '@/common/utils/utils'
  

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
        isshowbacktop: false,
        taboffsetTop: 0,
        istabControlshow: false,
        saveY: 0
      }
    },
    computed:{
      showType(){
        return this.goods[this.currentType].list
      }
    },
    //保存离开时的位置
    deactivated() {
      this.saveY = this.$refs.scroll.scroll.y
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    created() {
      //请求轮播图和推荐商品的数据
      this.getHomeMultidata()
      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      /**
       * 图片加载的事件监听
       */
      const refresh = debounce(this.$refs.scroll.refresh, 200)
      //监听图片加载
      this.$bus.$on('itemImageLoad', () =>{
        // console.log('图片加载完成')
        refresh()
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
     },
     //返回顶部
      backClick() {
        // console.log('backClick')
        this.$refs.scroll.scrollTo(0, 0, 200)
      },
      //监听滚动的方法
      contentscroll(position) {
        //1.返回顶部图片的显示
        this.isshowbacktop = (-position.y) > 570

        //2.tabControl的顶部显示
        this.istabControlshow = (-position.y) > this.taboffsetTop
      },
      //上拉加载
      loadmore() {
        this.getHomeGoods(this.currentType)

        // this.$refs.scroll.scroll.refresh()
      },
      //监听轮播图加载
      imageLoad() {
        this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop
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

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* 原生滚动的固定方式 */
    /* position: fixed;
    top: 0;
    left: 0;
    right:0;
    z-index: 10; */
  }
  .tab-content {
    position: relative;
    z-index: 10;
  }
  .scroll-content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    
    /* margin-top:44px; 
      height: calc(100% - 93px);
      overflow: hidden;
    */
  }
</style>
