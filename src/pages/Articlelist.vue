<template>
  <div class=" ">
    <!-- <textarea id="mainText"></textarea> -->
    <mu-list @itemClick="stArticleClick">
      <mu-sub-header>文章列表</mu-sub-header>
      <mu-divider/>
      <template v-for="art in articleList">
        <mu-list-item  :to="{ name: 'article', query: { articleid: art.articleid }}" :title="art.title" :value="art.articleid">
          <mu-avatar slot="leftAvatar">{{art.classify}}</mu-avatar>
          <span class="article-desc" slot="describe">
            <span class="author">{{art.author}} -</span> {{art.articleintro}}
          </span>
        </mu-list-item>
        <mu-divider inset/>
      </template>
    </mu-list>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import api from '../api'
  export default {
    data () {
      return {
        // myron: userPic
        articleList: []
      }
    },
    created () {
      this.updateAddbtnstate(true)
      this.getArticleList()
    },
    methods: {
      ...mapActions([
        'updateAddbtnstate',
        'chooseArticle'
      ]),
      stArticleClick: function (item) {
        console.log(item.value)
        // this.chooseArticle(item.value)
        // this.$router.push('/article')
      },
      getArticleList: function () {
        api.post('/Article/findAll.php')
        .then(res => {
          console.info(res.data)
          this.articleList = res.data
        })
      }
    }
  }

</script>
<style lang='scss'>
</style>
