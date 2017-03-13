<template>
  <mu-appbar title="STRUN">
    <mu-icon-button icon='menu' slot="left"/>
    <mu-text-field icon="search" class="appbar-search-field"  slot="right" hintText="请输入搜索内容"/>
    <mu-icon-button icon='mudocs-icon-custom-github' slot="right"/>
  </mu-appbar>
</template>

<script>
  import {Exception} from 'utils'
  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'navigation',
    computed: mapState({
      // 箭头函数可使代码更简练
      systemUser: state => state.user
    }),
    data () {
      return {
        show: true
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
        let vm = this
        console.log(vm.systemUser)
        vm.basePath = keyPath.join('/')
        if (!vm.systemUser) {
          try {
            throw new Exception('请登录', '10001', vm)
          } catch (error) {
            console.log(error)
          }
          return
        }
      },
      ...mapActions([
        'userlogin',
        'userloginout',
        'closeSlidemenu',
        'openSlidemenu'
      ]),
      handleCommand: function (command) {
        // this.$message('click' + command)
        if (command === 'quit') {
          this.$message('退出')
          this.userloginout()
          this.$router.replace({path: '/'})
        }
      },
      togslide: function () {
        if (this.show) {
          this.closeSlidemenu()
        } else {
          this.openSlidemenu()
        }
        this.show = !this.show
        // return this.show
      }
    },
    mounted () {
      // // let user = vm.systemUser
      // if (user) {
      //   // user = JSON.parse(user)
      //   // this.systemName = user.username
      //   // this.ust = true // 启用导航菜单下拉
      // }
    }
  }
</script>
<style lang="scss">
  .appbar-search-field{
    color: #FFF;
    margin-bottom: 0;
    &.focus-state {
      color: #FFF;
    }
    .mu-text-field-hint {
      color: fade-out(#FFF, .54);
    }
    .mu-text-field-input {
      color: #FFF;
    }
    .mu-text-field-focus-line {
      background-color: #FFF;
    }
  }
</style>
