<template>
  <div class=" ">
    <!-- <textarea id="mainText"></textarea> -->
    <mu-list>
      <mu-sub-header>文章列表</mu-sub-header>
      <mu-divider/>
      <div class="loader st-loader" v-if="refreshing"><div class="line-scale"><div></div><div></div><div></div><div></div><div></div></div></div>
      <!--<template v-for="art in articleList">
        <mu-list-item  :to="{ name: 'article', query: { articleid: art.articleid }}" :title="art.title" :value="art.articleid">
          <mu-avatar slot="leftAvatar">{{art.classify}}</mu-avatar>
          <span class="article-desc" slot="describe">
            <span class="author">{{art.author}} -</span> {{art.articleintro}}
          </span>
        </mu-list-item>
        <mu-divider inset/>
      </template>-->
      <articlelist :articleList="articleList"></articlelist>
    </mu-list>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import api from '../api'
  import articlelist from '../components/ArticleList.vue'
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
        this.refreshing = true
        api.post('/Article/findAll.php')
        .then(res => {
          console.info(res.data)
          this.refreshing = false
          this.articleList = res.data
        })
        .catch(() => {
          this.refreshing = false
        })
      }
    }
  }

</script>
<style lang='scss'>
</style>
