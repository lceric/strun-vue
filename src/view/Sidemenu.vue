<template>
  <!-- 左侧栏 start -->
  <mu-drawer width="280" :docked="false" :open="leftShow" @close="toggleLeftUserMenu">
    <div class="st-title-cont">
      <h1 class="st-big-title" title="STRUN">
        strun
      </h1>
      <p class="st-big-disc">技术无涯，永无止境</p>
    </div>
    <mu-menu :autoWidth="true"  width="200">
      <mu-menu-item title="首页" to="/" leftIcon="home" :size="36"/>
      <mu-menu-item title="文章" to="/articlelist" leftIcon="edit" :size="36"/>
      <mu-menu-item title="作品" leftIcon="books" :size="36"/>
      <mu-divider shallowInset/>
      <mu-menu-item title="关于" to="/about" leftIcon="link" :size="36"/>
      <!-- <mu-menu-item @click="toggleLeftUserMenu" title="Close"/> -->
    </mu-menu>
  </mu-drawer>
  <!-- 左侧栏 end -->
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    data () {
      return {
      }
    },
    computed: mapState({
      // 箭头函数可使代码更简练
      leftShow: state => state.slidemenu.slidemenuState
    }),
    methods: {
      ...mapActions([
        'closeSlidemenu',
        'openSlidemenu'
      ]),
      clickMenuItem (key, keypath) {
      },
      toggleLeftUserMenu: function () {
        if (this.leftShow) {
          this.closeSlidemenu()
        } else {
          this.openSlidemenu()
        }
      }
    },
    mounted () {
    }
  }

</script>
<style lang='scss'>
</style>
