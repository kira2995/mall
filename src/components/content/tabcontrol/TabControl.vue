<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item,index) in titles" :key="index" 
    :class="{active: index === currentIndex}" @click="itemclick(index)">
        <span>{{item}}</span>
    </div>
    
  </div>
</template>

<script>
export default {
    name:'TabControl',
    props:{
        titles:{
            type: Array,
            default(){
                return[]
            }
        }
    },
    data(){
        return {
            currentIndex: 0
        }
    },
    methods:{
        itemclick(index){
            this.currentIndex = index,
            this.$emit('tabClick',index)
        }
    }
}
</script>

<style scoped>
    .tab-control{
        display: flex;
        text-align: center;
        height: 40px;
        line-height: 40px;
        /* z-index: 10; */
    }
    .tab-control-item{
        flex: 1;
        background-color: rgb(255, 255, 255);
    }
    .tab-control-item span {
        padding: 5px;
    }
    .active{
        color:var(--color-high-text);
        /* color: red; */
        
    }
    .active span {
        border-bottom: 2px solid var(--color-tint);
    }
</style>