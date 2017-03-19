<template>
  <div id="app" class="bg st-app"> 
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
    line-height: 1.5;
    font-size: 14px;
    font-weight: 400;
    color: #757575;
    background: #e9e9e9;
  }
  #app{
    overflow: hidden;
    font-family: 'Microsoft JhengHei',"Hiragino Sans GB","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
  }
  #app,
  .main{
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
  }
  .main{
    overflow-y: auto;
  }
  .st-app{
    .st-add-button{
      position: fixed;
      right: 2rem;
      bottom: 2rem;
      -webkit-transition: all 200ms ease;
      transition: all 200ms ease;
      &:hover{
        -webkit-transform: scale(1.2) rotate(90deg);
        transform: scale(1.2) rotate(90deg);
      }
    }
  }
  .text-white{
    color: #fff;
  }
  .divpt{
    padding-top: 2.5rem;
  }
  .text-center{
    text-align: center;
  }
  .pd0{
    padding: 0
  }
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
  .cover-bg{
    background: #00BCD4;
    height: 30rem;
  }
</style>
