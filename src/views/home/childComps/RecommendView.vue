<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
        <a :href="item.link">
            <img :src="item.image" alt="推荐商品">
            <div>{{item.title}}</div>
        </a>
    </div>
  </div>
</template>

<script>
    export default {
        name:'RecommendView',
        props:{
            recommends:{
                type: Array,
                default() {
                    return []
                }
            }

        }
    }
</script>

<style scoped>
    .recommend{
        display: flex;
        width: 100%;
        text-align: center; 
        padding: 10px 0px 10px;
        border-bottom: 5px solid #eee;
    }
    .recommend-item{
        flex: 1;
    }
    .recommend-item img{
        width: 70px;
        height: 70px;
        margin-bottom: 5px;
    }
</style>