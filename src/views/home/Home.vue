<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物系统</div></NavBar>
    <HomeSwiper :banners="banners"></HomeSwiper>
    <RecommendView :recommends="recommends"></RecommendView>
    <WeekView></WeekView>
  </div>
  
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import NavBar from '@/components/common/navbar/NavBar.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import WeekView from './childComps/WeekView.vue'

  import {getHomeMultidata} from '@/network/home'

  

  export default {
    name: "Home",
    components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    WeekView
},
    data() {
      return {
        banners: [],
        recommends:[],
      }
    },
    created() {
      //请求多个数据
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    
  }
</script>

<style >
  #home{
    padding-top: 44px;
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
</style>
