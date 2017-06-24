<template>
  <!-- <textarea id="mainText"></textarea> -->
  <mu-list>
    <mu-sub-header>文章列表</mu-sub-header>
    <mu-divider/>
    <!--<div class="loader st-loader" v-if="refreshing"><div class="line-scale"><div></div><div></div><div></div><div></div><div></div></div></div>-->
    <st-loader v-if="refreshing"></st-loader>
    <!--<template v-for="art in articleList">
      <mu-list-item  :to="{ name: 'article', query: { articleid: art.articleid }}" :title="art.title" :value="art.articleid">
        <mu-avatar slot="leftAvatar">{{art.classify}}</mu-avatar>
        <span class="article-desc" slot="describe">
          <span class="author">{{art.author}} -</span> {{art.articleintro}}
        </span>
      </mu-list-item>
      <mu-divider inset/>
    </template>-->
    <template v-for="art in articleList">
      <articlelist :art="art"></articlelist>
    </template>
  </mu-list>
</template>

<script>
  import {mapActions} from 'vuex'
  import api from '../api'
  import articlelist from '../view/ArticleList.vue'
  export default {
    data () {
      return {
        // myron: userPic
        articleList: [],
        refreshing: false
      }
    },
    components: {
      articlelist
    },
    created () {
      this.updateAddbtnstate(true)
      this.getArticleList()
    },
    methods: {
      ...mapActions([
        'updateAddbtnstate'
      ]),
      getArticleList: function () {
        let vm = this
        vm.refreshing = true
        api.post('/Article/findAll.php')
        .then(res => {
          // console.info(res.data)
          vm.refreshing = false
          vm.articleList = res.data
        })
        .catch((e) => {
          vm.$toast(e.response.data.message, 'top', 3600)
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
