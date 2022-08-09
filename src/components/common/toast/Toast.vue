<template>
  <div class="toast" v-show="isshow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
//   props: {
//     message: {
//         type: String,
//         default: '',
//     },
//     msgShow: {
//         type: Boolean,
//         default: false
//     },
//   },
  data() {
    return {
        message: '',
        isshow: false
    }
  },
  methods: {
    Show(message, duration=2000) {
        this.isshow = true 
        this.message = message

        setTimeout(() => {
            this.isshow = false
            this.message = '' 
        },duration)
    }
  }
}
</script>

<style scoped>
    .toast {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        padding: 10px;
        background-color: rgba(0, 0, 0, .7);
        border-radius: 5%;
        z-index: 100;
    }
</style>