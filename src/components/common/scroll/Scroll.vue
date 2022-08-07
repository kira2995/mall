<template>
  <div class="wrapper"  ref="wrapper">
    <div class="content">
        <slot></slot>
    </div>
  </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name:'Scroll',
        props:{
            //滚动
            probeType: {
                type: Number,
                default: 0
            },
            //上拉加载
            pullUpLoad: {
                type: Boolean,
                default: false
            }            
        },
        data(){
            return {
                scroll: null
            }
        },
        mounted(){
            //创建BScroll对象
            this.scroll = new BScroll(this.$refs.wrapper,{
                click: true,
                //监听滚动
                probeType: this.probeType,
                pullUpLoad: this.pullUpLoad
            })
            //监听滚动的位置
            this.scroll.on('scroll', (position) => {
                // console.log(position)
                this.$emit('scroll', (position))
            })
            //监听上拉加载更多
            this.scroll.on('pullingUp', () => {
                this.$emit('pullingUp')
            })
        },
        methods: {
            //滚动的方法
            scrollTo(x, y, time=200){
                this.scroll.scrollTo(x, y, time)
            },
            //结束上拉加载的方法
            finishPullUp() {
                this.scroll.finishPullUp()
            },
            refresh() {
                // console.log('----')
                // this.scroll && this.scroll.refresh()
                this.scroll.refresh()
            }
        }
    }
</script>

<style scoped>

</style>