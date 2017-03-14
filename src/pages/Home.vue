<template>
  <div class="main" :class="{'trans': active}">
    <navigation></navigation> 
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import navigation from 'components/Navigation.vue'
  import {mapState} from 'vuex'
  export default {
    components: {
      navigation
    },
    data () {
      return {}
    },
    computed: mapState({
      active: state => state.slidemenu.slidemenuState
    })
  }
</script>

<style lang='scss'>
  .component-fade-enter-active, 
  .component-fade-leave-active,
  .component-toggle-enter-active,
  .component-toggle-leave-active {
    transition: all .45s cubic-bezier(.23,1,.32,1);
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
    background: #e9e9e9;
    height: 100%;
    &.trans{
      padding-left: 0;
    }
  }
  @media screen and (min-width: 993px) {
    .main.trans{
      padding-left: 280px;
      transition: all .45s cubic-bezier(.23,1,.32,1);
      /*transition: all .45s cubic-bezier(.23,1,.32,1);*/
    }
    .mu-overlay{
      display: none;
    }

  }
</style>
