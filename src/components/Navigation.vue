<template>
  <div>
    <mu-appbar title="strun" titleClass='st-title' :zDepth="1">
      <mu-icon-button icon='menu' @click="toggleLeftUserMenu" slot="left"/>
      
      <!-- <mu-text-field icon="search" class="appbar-search-field"  slot="left" hintText="请输入搜索内容"/> -->
      <div class="nav-user" slot="right">
        <div class="user-info">
          <mu-avatar ref="userMenuBtn" @click="toggleUserMenu" class="user-pic" :src='userPic'/>
        </div>
      </div>
    </mu-appbar>
    <!-- 左侧栏 start -->
    <mu-drawer width="280" :docked="false" :open="leftShow" @close="toggleLeftUserMenu">
      <div class="st-title-cont">
        <h1 class="st-big-title" title="STRUN">
          strun
        </h1>
        <p class="st-big-disc">技术无涯，永无止境</p>
      </div>
      <mu-menu :autoWidth="true"  width="200">
        <mu-menu-item title="首页" leftIcon="home" :size="36"/>
        <mu-menu-item title="文章" leftIcon="edit" :size="36"/>
        <mu-menu-item title="作品" leftIcon="books" :size="36"/>
        <mu-divider shallowInset/>
        <mu-menu-item title="关于" leftIcon="link" :size="36"/>
        <mu-menu-item @click="toggleLeftUserMenu" title="Close"/>
      </mu-menu>
    </mu-drawer>
    <!-- 左侧栏 end -->

    <!-- 右侧栏 start -->
    <mu-popover :trigger="trigger" popoverClass="user-menu" :open="show" @close="closeUserMenu">
      <p class="user-name">{{'Hello!  ' + userName}}</p>
      <mu-menu :autoWidth="true" :width="300">
        <mu-menu-item leftIconClass="user-icon" leftIcon="edit" title="我的文章"/>
        <mu-menu-item  title="新增文章" leftIcon="edit" leftIconClass="user-icon"/>
        <mu-divider shallowInset/>
        <mu-menu-item  leftIcon="edit" leftIconClass="user-icon"  title="退出" />
      </mu-menu>
    </mu-popover>
    <!-- 右侧栏 end -->
  </div>
  
</template>

<script>
  import {Exception} from 'utils'
  import {mapState, mapActions} from 'vuex'
  import userPic from '../assets/person.png'
  export default {
    name: 'navigation',
    computed: mapState({
      // 箭头函数可使代码更简练
      systemUser: state => state.user,
      leftShow: state => state.slidemenu.slidemenuState
    }),
    data () {
      return {
        show: false,
        // leftShow: false,
        userPic,
        userName: 'nikjia',
        trigger: null
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
      },
      toggleLeftUserMenu: function () {
        if (this.leftShow) {
          this.closeSlidemenu()
        } else {
          this.openSlidemenu()
        }
      },
      toggleUserMenu: function () {
        this.show = !this.show
      },
      closeUserMenu: function () {
        this.show = false
      }
    },
    mounted () {
      this.trigger = this.$refs.userMenuBtn.$el
    }
  }
</script>
<style lang="scss">
  .st-big-title,
  .st-title{
    text-transform: uppercase;
  }
  .st-title-cont{

    height: 120px;
    text-align: center;
    color: rgba(0,0,0,0.54);
    background: url(../assets/light-wool.png);
    .st-big-title{
      line-height: 60px;
      font-size: 56px;
      margin-bottom: .3em;
    }
    .st-big-disc{
      margin-top: 0;
    }
  }
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
  .nav-user{
    .user-info{
      position: relative;
      cursor: pointer;
      .user-pic{
        width: 47px;
        height: 47px;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
  }
  .user-menu{
    // width: 300px;
    .user-name{
      text-align: center;
      line-height: 30px;
      margin-bottom: 0;
    }
    .mu-menu-destop{
      padding-top: 0;
      padding-bottom: 10px;
    }
    .user-icon{
      color: rgb(3, 169, 244)
    }
    .user-text{
      padding-left: 36px;
    }
  }
  .mu-menu-item.have-left-icon{
    padding-left: 48px;
  }
</style>
