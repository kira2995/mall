<template>
  <div class="cart-list">
    <CartListItem v-for="(item, index) in cartList" :key="index" 
    :itemInfo="item">
    </CartListItem>
  </div>
</template>

<script>

import { mapGetters } from "vuex";

import CartListItem from "./CartListItem.vue";

export default {
    name: "CartList",
    computed: {
        ...mapGetters(["cartList"])
    },
    components: {
    CartListItem,
},
}
</script>

<style scoped>
.cart-list {
    margin-top: 44px;
    margin-bottom: 79px;
    overflow: hidden;
}
</style>