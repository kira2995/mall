<template>
    <div class="content">
        <NavBar>
            <img class="backimg" slot="left" @click="backClick" src="../../../assets/img/common/back.svg" alt="返回">
             <div slot="center" class="nav-title">
                <div class="title-item" 
                    v-for="(item,index) in titles" :key="index"
                    :class="{'active': index === currentIndex}" @click="titleClick(index)">
                        {{item}}
                </div>
             </div>
             
        </NavBar>
    </div>
  
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'

export default {
    name: 'DetailNavBar',
    data() {
        return {
            titles: ['商品','参数','评论','推荐'],
            currentIndex: 0
        }
    },
    components: { 
            NavBar 
    },
    methods: {
        titleClick(index) {
            this.currentIndex = index
            this.$emit('titleClick',index)
        },
        backClick() {
            this.$router.back()
        }
    }
}
</script>

<style scoped>
.nav-title {
    display: flex;
}
.title-item {
    flex: 1;
}
.title-item.active {
    color: var(--color-high-text);
}
.backimg {
    margin-top: 12px;
}
</style>