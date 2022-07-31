<template>
  <Swiper>
    <SwiperItem v-for="(item,index) in banners" :key="index">
     <a :href="item.link">
      <img :src="item.image" alt="轮播图片" />
     </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
    import {Swiper, SwiperItem} from '@/components/common/swiper/index'
    export default {
        name:'HomeSwiper',
        props:{
            banners: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        components:{
            Swiper, 
            SwiperItem,
        }
    }
</script>

<style>

</style>