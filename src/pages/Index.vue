<template>
  <div class="st-card-container">
    <div class="st-card">
      <!--<mu-card-header title="最新文章"  titleClass="st-card-title" subTitle="记录每一点" subTitleClass="st-card-sub-title">-->
      <!--</mu-card-header>-->
      <div class="pd0 list-container">
        <!--<mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>-->
        <mu-list>
          <mu-sub-header>
            <mu-text-field label="检索条件" labelFloat :underlineShow="false" v-model="searchInfo" @input="seachResultHandler" />
            <!--<mu-switch label="开启全文检索" labelLeft @input="isAllSearch" v-model="isAllSearchState"/>-->
          </mu-sub-header>
          <mu-divider/>
          <!--<st-loader v-if="refreshing"></st-loader>-->
          <div class="st-loader-wrapper fix" v-if="refreshing">
            <div class="st-cover"></div>
            <st-loader ></st-loader>
          </div>
          <!--<template v-for="art in articleList">
            <mu-list-item :to="{ name: 'article', query: { articleid: art.articleid }}" :title="art.title" :value="art.articleid">
              <mu-avatar slot="leftAvatar">{{art.classify}}</mu-avatar>
              <span class="article-desc" slot="describe">
                <span class="author">{{art.author}} -</span> {{art.articleintro}}
              </span>
            <mu-divider inset/>
            </mu-list-item>
          </template>-->
          <template v-for="art in articleList">
            <articlelist :art="art"></articlelist>
          </template>
          <!--<articlelist :articleList="articleList"></articlelist>-->
        </mu-list>
      </div>
      <div class="tc st-loadmore">
        <mu-icon-button @click="loadmore" :disabled="loading" icon="expand_more" iconClass="loadmore-btn">
        </mu-icon-button>
      </div>
      <!--<div class="text-center">
        <mu-raised-button to="/articlelist" label="查看往期" class="demo-raised-button st-btn" primary/>
      </div>-->
    </div>

  </div>
</template>

<script>
  import userPic from '../assets/person.png'
  import { mapActions } from 'vuex'
  import api from '../api'
  import articlelist from '../view/ArticleList.vue'
  import { Throttle } from '../utils'
  export default {
    data () {
      return {
        myron: userPic,
        articleList: [],
        refreshing: false,
        thro: null,
        isAllSearchState: false,
        searchInfo: '',
        page: 1,
        userid: '',
        classify: '',
        loading: false
      }
    },
    components: {
      articlelist
    },
    created () {
      let vm = this
      vm.updateAddbtnstate(true)
      // vm.getArticleList()
      vm.thro = new Throttle(vm.seachResult, 800, 1000)
      // vm.getArticleList()
      vm.getTermArticleList({
        page: vm.page,
        userid: vm.userid,
        classify: vm.classify,
        searchinfo: vm.searchInfo
      }).then(res => {
        // console.info(res.data)
        vm.refreshing = false
        vm.articleList.push(...res.data)
        if (res.data.length < 10) {
          vm.loading = true
          return
        }
        vm.loading = false
      })
      .catch((e) => {
        console.info(e.response)
        vm.$toast(e.response.data.error, 'top', 3600)
        if (e.response.data.error.indexOf('No articless found!') <= 0) {
          vm.loading = true
        }
        vm.refreshing = false
      })
    },
    methods: {
      ...mapActions([
        'updateAddbtnstate',
        'chooseArticle'
      ]),
      seachResult: function () {
        let vm = this
        vm.page = 1
        vm.getTermArticleList({
          page: vm.page,
          userid: vm.userid,
          classify: vm.classify,
          searchinfo: vm.searchInfo
        }).then(res => {
          // console.info(res.data)
          vm.refreshing = false
          vm.articleList = res.data
          if (res.data.length < 10) {
            vm.loading = true
            return
          }
          vm.loading = false
        })
        .catch((e) => {
          vm.$toast(e.response.data.error, 'top', 3600)
          vm.refreshing = false
          if (e.response.data.error.indexOf('No articless found!') <= 0) {
            vm.loading = true
          }
        })
      },
      seachResultHandler: function () {
        let vm = this
        vm.thro.detect()
      },
      getTermArticleList: function (params) {
        let vm = this
        vm.refreshing = true
        return api.post('/Article/getAllArticleListByPage.php', params)
      },
      loadmore: function () {
        let vm = this
        if (!vm.loading) {
          vm.page++
          vm.getTermArticleList(
            {
              page: vm.page,
              userid: vm.userid,
              classify: vm.classify,
              searchinfo: vm.searchInfo
            }
          ).then(res => {
            vm.refreshing = false
            vm.articleList.push(...res.data)
            if (res.data.length < 10) {
              vm.loading = true
              return
            }
            vm.loading = false
          })
          .catch((e) => {
            vm.$toast(e.response.data.error, 'top', 3600)
            vm.refreshing = false
            console.info(e.response.data.error.indexOf('No articless found!'))
            if (e.response.data.error.indexOf('No articless found!') <= 0) {
              vm.loading = true
            }
          })
        }
      }
    }
  }

</script>

<style lang='scss'>
  .st-card {
    min-height: 40rem;
    padding-bottom: 2rem;
    .mu-card-header {
      background-color: rgb(233, 233, 233);
      .mu-card-header-title {
        display: flex;
        flex-direction: row;
        .st-card-title {
          font-size: 18px;
        }
        .st-card-sub-title {
          line-height: 27px;
          text-indent: 12px;
        }
      }
    }
  }

  .list-container {
    -webkit-overflow-scrolling: touch; // border: 1px solid #d9d9d9;
    position: relative;
    user-select: none;
  }

  .st-card-container {
    height: 100%;
    margin-top: 20px;
    padding: 0 18px;
  }

  .article-title {
    font-size: 18px;
    /*color: #212121;*/
    margin-bottom: .5rem;
  }

  .article-desc {
    font-size: 14px;
    .author {
      font-size: 12px;
    }
  }
</style>
