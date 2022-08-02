<template>
  <div class="wrapper">
    <div class="content"></div>
  </div>
  
</template>

<script>
   import BScroll from 'better-scroll'
  export default {
    name: "Category",
    data(){
      return {
        scroll: null
      }
    },
    mounted(){
      //div里只能有一个元素，所以不能直接用'.content'
      this.scroll = new BScroll(document.querySelector('.wrapper'),{
//probeType: 0,1: 不侦测滚动(默认为0)
        //   2: 在手指滑动的过程中侦测(手指离开后的惯性滚动不侦测)
        //   3: 屏幕滚动就侦测
        probeType: 2,
        pullUpLoad: true
      })
      this.scroll.on('scroll',(position) => {
        console.log(position)
      })
      this.scroll.on('pullingUp',() =>{
        console.log('上拉加载更多')
      })
    }
  }
</script>

<style >

</style>
