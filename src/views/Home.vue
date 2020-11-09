<template>
  <div class="home">
    <van-calendar
  title="日历"
  :poppable="false"
  :show-confirm="false"
  :style="{ height: '500px' }"
/>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    
  }
}
</script>
