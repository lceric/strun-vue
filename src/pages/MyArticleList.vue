<template>
  <!-- <textarea id="mainText"></textarea> -->
  <mu-list>
    <mu-sub-header>我的文章</mu-sub-header>
    <mu-divider/>
    <!--<div class="loader st-loader" v-if="refreshing"><div class="line-scale"><div></div><div></div><div></div><div></div><div></div></div></div>-->
    <!--<st-loader v-if="true"></st-loader>-->
    <div class="st-loader-wrapper fix" v-if="refreshing">
      <div class="st-cover"></div>
      <st-loader ></st-loader>
    </div>
    <template v-for="art in articleList">
      <articlelist :art="art"></articlelist>
    </template>
    <div class="tc st-loadmore">
      <mu-icon-button @click="loadmore" :disabled="loading" icon="expand_more" iconClass="loadmore-btn">
      </mu-icon-button>
    </div>
  </mu-list>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import api from '../api'
  import articlelist from '../view/ArticleList.vue'
  export default {
    data () {
      return {
        // myron: userPic
        articleList: [],
        refreshing: false,
        page: 1,
        classify: '',
        searchInfo: '',
        loading: false
      }
    },
    components: {
      articlelist
    },
    computed: {
      ...mapState({
        user: state => state.user
      })
    },
    created () {
      let vm = this
      this.updateAddbtnstate(true)
      this.getTermArticleList({
        page: vm.page,
        userid: vm.user.userid,
        classify: vm.classify,
        searchinfo: vm.searchInfo
      })
    },
    methods: {
      ...mapActions([
        'updateAddbtnstate'
      ]),
      loadmore: function () {
        let vm = this
        if (!vm.loading) {
          vm.page++
          vm.getTermArticleList(
            {
              page: vm.page,
              userid: vm.user.userid,
              classify: vm.classify,
              searchinfo: vm.searchInfo
            }
          )
        }
      },
      getTermArticleList: function (params) {
        let vm = this
        vm.refreshing = true
        api.post('/Article/getAllArticleListByPage.php', params)
        .then(res => {
          // console.info(res.data)
          vm.refreshing = false
          vm.articleList.push(...res.data)
          if (res.data.length < 10) {
            vm.loading = true
          }
        })
        .catch((e) => {
          console.info(e.response)
          vm.$toast(e.response.data.error, 'top', 3600)
          if (e.response.data.error.indexOf('No articless found!') <= 0) {
            vm.loading = true
          }
          vm.refreshing = false
        })
      }
    }
  }

</script>
<style lang='scss' scoped>
  .mu-list,
  .article-list-cont{
    height: 100%;
  }
</style>
