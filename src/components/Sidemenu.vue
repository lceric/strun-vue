<template>
  <transition name="component-toggle" mode="out-in">
    <nav class="side-menu" v-show="pop">
      <el-menu @select="clickMenuItem" unique-opened>
        <template v-for="(item,index) in menus">
          <el-menu-item v-if="item.only&&item.children.length>0" :class="{'sm-active': selected===item.children[0].title}" :index='item.children[0].name +"|"+ item.children[0].title'>
            <i :class="item.children[0].iconCls"></i>{{item.children[0].title}}
          </el-menu-item>
          <el-submenu :index="item.title" v-if="!item.only">
            <template slot="title"><i :class="item.iconCls"></i>{{item.title}}</template>
            <el-menu-item v-for="child in item.children" :class="{'sm-active': selected===child.title}" :index='child.name +"|"+ child.title'>
              <i :class="child.iconCls"></i>{{child.title}}
            </el-menu-item>
          </el-submenu>
          <!--<el-menu-item :class="{'active': selected===item.text}" v-for="item in menus" :index='item.name +"|"+ item.text'><a>{{item.text}}</a></el-menu-item>-->
        </template>
      </el-menu>
    
    </nav>
  </transition>
</template>
<script>
  import { tabstemps } from 'common/tabs/tabs.config.js'
  import { mapState, mapActions } from 'vuex'
  export default {
    data () {
      return {
        menus: tabstemps,
        selected: '首页'
      }
    },
    created () {
      var vm = this
      this.$taber.$on('vue-tabs-active-change', (tab) => {
        if (tab) {
          this.selected = tab.meta.title
          tab.meta.parentTitle === ''
          ? vm.updateBreadpath('<i class="' + tab.meta.iconCls + '"></i> ' + tab.meta.title)
          : vm.updateBreadpath('<i class="' + tab.meta.parentIconCls + '"></i> ' + tab.meta.parentTitle + ' &nbsp->&nbsp ' + '<i class="' + tab.meta.iconCls + '"></i> ' + tab.meta.title)
          console.log(tab)
        } else {
          this.selected = null
        }
      })
    },
    computed: mapState({
      // 箭头函数可使代码更简练
      pop: state => state.slidemenu.slidemenuState
    }),
    methods: {
      ...mapActions([
        'updateBreadpath'
      ]),
      clickMenuItem (key, keypath) {
        const tabinfo = key.split('|')
        this.selected = tabinfo[1]
        this.$taber.open({
          name: tabinfo[0],
          params: {
            title: tabinfo[1]
          }
        })
      }
    },
    mounted () {
      this.$taber.open({
        name: 'home'
      })
    }
  }

</script>
<style lang='scss'>
  .side-menu {
    position: relative;
    width: 100%; 
    left: 0;
    top: 0;
    color: #282828;
    .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active,
    .el-menu-item.is-active {
      color: #48576a;
    }
    .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.sm-active,
    .el-menu-item.sm-active {
      color: #20a0ff;
    }
    .el-menu {
      background: #f4f4f4;
      .fa{
        margin-right: 10px;
        speak: none;
        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        vertical-align: baseline;
        display: inline-block;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    }
    &>.el-menu,
    &>.el-menu>.el-menu-item:last-child{
      border-bottom: 1px solid #e5e5e5;
    }
    .el-submenu {
      line-height: 35px;
    }
    .el-menu-item,
    .el-submenu{
      border-top: 1px solid #e5e5e5;
    }
    .el-submenu .el-submenu__title {
    }
    .el-submenu .el-menu-item {
      background: #f4f4f4 !important;
      border-top: 0
    }
    .el-menu-item,
    .el-submenu .el-submenu__title {
      height: 35px;
      line-height: 35px;
    }
    .el-menu-item:hover {
      background-color: #fff;
    }
    .el-submenu .el-menu-item:hover,
    .el-submenu__title:hover {
      background-color: #fff;
    }
    .el-submenu .el-menu-item:hover,
    .el-submenu__title:hover {
      background-color: #fff;
    }
  
  }
</style>
