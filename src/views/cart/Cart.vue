<template>
  <div class="cart">
    <!-- 导航 -->
    <NavBar class="cart-nav">
      <div slot="center">购物车({{cartLength}})</div>
    </NavBar>
    <!-- 列表 -->
    <CartList/>
    <!-- 计算 -->
    <BottomBar/>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue';
import CartList from './childComps/CartList.vue';

import { mapGetters } from 'vuex';
import BottomBar from './childComps/BottomBar.vue';


  export default {
    name: "Cart",
    components: {
    NavBar,
    CartList,
    BottomBar
},
    computed: {
      ...mapGetters([
        'cartLength',
        'cartList'
      ])
    }
}
</script>

<style scoped>
.cart {
  height: 100vh;
}
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}
</style>
