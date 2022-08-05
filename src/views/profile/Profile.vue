<template>
  <div>
    <Scroll class="pro-content" :probeType="0">
      <h2>我的</h2>
      <h2>我的</h2>
      <h2>我的</h2>
      <h2>我的</h2>
      <h2>我的</h2>
      <h2>我的</h2>
      <h2>我的</h2>
      <h2>我的</h2>
      <h2>我的</h2>
      <h2>我的</h2>
      <h2>我的</h2>
      <h2>我的</h2>
      <h2>我的</h2>
      <h2>我的</h2>
      <h2>我的</h2>
      <h2>我的</h2>
      <h2>我的</h2>
      <h2>我的</h2>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/components/common/scroll/Scroll.vue';

  export default {
    name: "Profile",
    components: { 
      Scroll 
    }
}
</script>

<style >
  .pro-content{
    height: 200px;
    
    background-color: rgb(240, 17, 17);
    overflow: hidden;
  }
</style>
