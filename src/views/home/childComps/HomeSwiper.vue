<template>
  <Swiper>
    <SwiperItem v-for="(item,index) in banners" :key="index">
     <a :href="item.link">
      <img :src="item.image" alt="轮播图片" @load="imageLoad"/>
     </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
    import {Swiper, SwiperItem} from '@/components/common/swiper/index'
    export default {
        name:'HomeSwiper',
        data() {
            return{
                isload: false
            }
            
        },
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
        },
        methods: {
            imageLoad() {
                if (!this.isload) {
                    // console.log('-------')
                    this.$emit('imageLoad')
                    this.isload = true
                }
            }
        }
    }
</script>

<style scoped>

</style>