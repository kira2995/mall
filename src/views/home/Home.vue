<template>
    <div id="home">
      <NavBar class="home-nav"><div slot="center">购物系统</div></NavBar>

      <Scroll class="scroll-content">
        <HomeSwiper :banners="banners"></HomeSwiper>
        <RecommendView :recommends="recommends"></RecommendView>
        <WeekView></WeekView>
        <TabControl class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"></TabControl>
        <GoodsList :goods="showType"></GoodsList>
      </Scroll>
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
    Scroll
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
    },
    methods: {
      /*
      * 时间监听相关的方法
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

      /*
      * 网络请求相关的方法
      */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page =this.goods[type].page + 1 
        getHomeGoods(type,page).then(res =>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
      }
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
</style>
