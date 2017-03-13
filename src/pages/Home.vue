<template>
  <div class="main">
    <navigation></navigation> 
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import navigation from 'components/Navigation.vue'
  export default {
    components: {
      navigation
    }
  }
</script>

<style lang='scss'>
  .component-fade-enter-active, 
  .component-fade-leave-active,
  .component-toggle-enter-active,
  .component-toggle-leave-active {
    transition: all .3s ease;
  }
  .component-fade-enter, .component-fade-leave-active {
    transform: rotateX(90deg);
    opacity: 0;
  }
  .component-toggle-enter, .component-toggle-leave-active {
    transform: translateX(-100%);
    opacity: 0;
  }
  .container-fluid {
   /* margin-top: 20px;*/
    padding-left: 0;
    padding-right: 0;
    /*background-color: #fff;*/
  }
  .main{
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #fff;
    height: 100%;
  }
</style>
