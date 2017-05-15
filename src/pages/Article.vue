<template>
  <div class="st-edit container">
    <!-- <textarea id="mainText"></textarea> -->
    <h1>{{article.title}}</h1>
    <vue-markdown :source="article.content"></vue-markdown>
    <!-- <mavonEditor v-model="article.content" :subfield="false"></mavonEditor> -->
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
        article: ''
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
      getArticle: function () {
        // console.info(this.articleid)
        let vm = this
        let p = window.location.hash.split('?')[1]
        let articleid = p.split('=')[1]
        api.post('/Article/findByArticleId.php', {
          'articleid': articleid
        })
        .then(res => {
          console.info(res.data)
          vm.article = res.data
        })
      }
    }
  }
</script>
<style lang='scss'>
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
  }
</style>
