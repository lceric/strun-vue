<template>
  <div id="app" class="bg"> 
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss">
  // 引入scss文件
  @import "scss/_container";
  @import "scss/_clearfix";
  body{
    font-family: Roboto, Lato, sans-serif;
    line-height: 1.5;
    font-size: 14px;
    font-weight: 400;
  }
</style>
