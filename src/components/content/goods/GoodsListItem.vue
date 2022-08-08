<template>
  <div class="goods-item" @click="goodsClick">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
        <p>{{goodsItem.title}}</p>
        <span class="price">{{goodsItem.price}}</span>
        ✰<span class="collect">{{goodsItem.cfav}}</span> 
    </div>
    
  </div>
</template>

<script>
    export default {
        name:'GoodsListItem',
        props:{
            goodsItem:{
                type: Object,
                default() {
                    return {}
                }
            }
        },
        computed: {
            showImage() {
                return this.goodsItem.image || this.goodsItem.show.img
            }
        },
        methods: {
            imageLoad() {
                // console.log('imageload')
               if (this.$route.path.indexOf('/home')) {
                this.$bus.$emit('itemImageLoad')
               } else if (this.$route.path.indexOf('/detail')) {
                    this.$bus.$emit('DetailimgLoad')
               }
            },
            goodsClick() {
                this.$router.push({
                    path: '/detail/' + this.goodsItem.iid
                    // query: {iid}
                 })
            }
        }
    }
</script>

<style scoped>
    .goods-item{
        padding-bottom: 40px;
        position: relative;
        width:48%;
    }
    .goods-item img{
        width: 100%;
        border-radius: 5px;
    }
    .goods-info{
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        left:0;
        right:0;
        overflow: hidden;
        text-align: center;
    }
    .goods-info p{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
    }
    .price{
        color: var(--color-high-text);
        margin-bottom: 20px;
    }
    .collect{
        position: relative;
    }
    .collect::before{
        content:'';
        position: absolute;
        left: -15px;
        top: -1px;
        height: 14px;
        width: 14px;
    }
</style>