<template>
<navMenu/>
  <router-view/>
</template>



<script>
import navMenu from './components/NavMenu.vue';
export default {
components:{
  navMenu,
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
