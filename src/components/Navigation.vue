<template>
  <div class="st-fixed" >
    <mu-appbar title="strun" titleClass='st-title' :zDepth="1">
      <mu-icon-button icon='menu' @click="toggleLeftUserMenu" slot="left"/>
      
      <!-- <mu-text-field icon="search" class="appbar-search-field"  slot="left" hintText="请输入搜索内容"/> -->

      <div class="nav-user" slot="right">
        <div class="user-info">
          <div class="login-regist" v-if="!systemUser.login">
            <router-link :to="{ name: 'sign', query: { signtype: 'login' }}">登录</router-link>
            |
            <router-link :to="{ name: 'sign', query: { signtype: 'regist' }}">注册</router-link>
          </div>
          <mu-avatar v-if="systemUser.login" ref="userMenuBtn" @click="toggleUserMenu" class="user-pic" :src='userPic'/>
        </div>
      </div>
    </mu-appbar>

    <!-- 右侧栏 start -->
    <mu-popover :trigger="trigger" popoverClass="user-menu" :open="show" @close="closeUserMenu">
      <p class="user-name">{{'Hello!  ' + systemUser.username}}</p>
      <mu-menu :autoWidth="true" :width="300">
        <mu-menu-item leftIconClass="user-icon" leftIcon="description" title="我的文章"/>
        <mu-menu-item title="新增文章" leftIcon="edit" leftIconClass="user-icon"/>
        <mu-divider shallowInset/>
        <mu-menu-item  leftIcon="power_settings_new" leftIconClass="user-icon"  title="退出" @click="singOut"/>
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
      toggleUserMenu: function () {
        this.show = !this.show
      },
      closeUserMenu: function () {
        this.show = false
      },
      toggleLeftUserMenu: function () {
        if (this.leftShow) {
          this.closeSlidemenu()
        } else {
          this.openSlidemenu()
        }
      },
      singOut: function () {
        this.userloginout()
        window.location.reload()
      }
    },
    mounted () {
      if (JSON.parse(localStorage.getItem('user'))) {
        this.trigger = this.$refs.userMenuBtn.$el
      }
    }
  }
</script>
<style lang="scss">
  .mu-appbar {
    background-color: #0097A7;
    height: 56px;
    padding: 0 8px;
    width: 100%;
    z-index: 100;
  }
  .st-fixed{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 88;
  }
  .login-regist{
    a{
      color: #fff;
      &:hover{
        text-decoration: underline;
      }
    }
  }
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
      color: #0097A7;
    }
    .st-big-disc{
      margin-top: 0;
      color: #757575;
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
      color: #757575;
    }
    .mu-menu-destop{
      padding-top: 0;
      padding-bottom: 10px;
    }
    .user-icon{
      color: #0097A7
    }
    .user-text{
      padding-left: 36px;
    }
  }
  .mu-menu-item.have-left-icon{
    padding-left: 48px;
  }
</style>
