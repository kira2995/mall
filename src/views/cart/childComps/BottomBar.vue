<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" :isCheck="isSelectAll" @click.native="checkAllClick"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product" @click="calcClick">去计算({{checkLength}})</span>
  </div>
</template>

<script>
  import CheckButton from './CheckButton.vue'

	export default {
		name: "BottomBar",
    components: {
		  CheckButton
    },
    computed: {
      //计算总价
		  totalPrice() {
        const cartList = this.$store.state.cartList;
        return cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count * (item.price.substring(1,6))
        }, 0).toFixed(2)
      },
      //全选
      isSelectAll() {
        //购物车为空时
        if(this.$store.getters.cartList.length === 0) {
          return false
        }
        return !this.$store.getters.cartList.find(item => !item.checked)
      },
      //选中的个数
      checkLength() {
        return this.$store.getters.cartList.filter(item => item.checked).length
      }
    },
    methods: {
      checkAllClick() {
        if(this.isSelectAll){
          this.$store.getters.cartList.forEach(item => item.checked = false)
        } else {
          this.$store.getters.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        if (!this.isSelectAll) {
          this.$toast.Show('请选择商品')
        }
      }
    }
	}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 30px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 30px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 8px;
    top: 6px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    float: right;
  }
</style>
