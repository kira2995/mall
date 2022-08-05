<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="" @load="imageLoad">
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
        methods: {
            imageLoad() {
                // console.log('imageload')
                this.$bus.$emit('itemImageLoad')
            }
        }
    }
</script>

<style>
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