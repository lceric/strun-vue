<template>
  <div class="st-edit container">
    <!-- <textarea id="mainText"></textarea> -->
    <div class="loader st-loader" v-if="refreshing"><div class="line-scale"><div></div><div></div><div></div><div></div><div></div></div></div>
            
    <h1>{{article.title}}</h1>
    <vue-markdown :source="article.content"></vue-markdown>
    <!-- <mavonEditor v-model="article.content" :subfield="false"></mavonEditor> -->
    <mu-float-button icon="edit" class="st-add-button redit" @click="stReEditArticle"/>
  </div>
</template>

<script>
  // import SimpleMDE from 'simplemde'
  import {mapActions} from 'vuex'
  import VueMarkdown from 'vue-markdown'
  import api from '../api'
  export default {
    data () {
      return {
        source: '你好',
        article: '',
        refreshing: false,
        articleId: ''
      }
    },
    components: {
      VueMarkdown
    },
    computed: {
    },
    created () {
      this.updateAddbtnstate(true)
      this.getArticle()
    },
    methods: {
      ...mapActions([
        'updateAddbtnstate'
      ]),
      test () {
        this.sim.value()
      },
      stReEditArticle () {
        let vm = this
        // console.info('编辑' + vm.articleId)
        vm.$router.push({
          path: '/redit',
          query: {
            articleid: vm.articleId
          }
        })
      },
      getArticle: function () {
        // console.info(this.articleid)
        let vm = this
        vm.refreshing = true
        let p = window.location.hash.split('?')[1]
        let articleid = p.split('=')[1]
        vm.articleId = articleid
        api.post('/Article/findByArticleId.php', {
          'articleid': articleid
        })
        .then(res => {
          vm.refreshing = false
          // console.info(res.data)
          vm.article = res.data
        })
        .catch(() => {
          vm.refreshing = false
        })
      }
    }
  }
</script>
<style lang='scss' scoped>
  .st-edit{
    .editor-toolbar.fullscreen{
      z-index: 12;
      top: 56px;
    }
    .CodeMirror-fullscreen{
      top: 106px;
    }
    .editor-preview-active-side{
      top: 106px;
    }
    .redit{
      bottom: 8rem;
    }
  }
</style>
