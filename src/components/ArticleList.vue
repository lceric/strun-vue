<template>
  <div>
    <!--<div class="loader st-loader" v-if="refreshing"><div class="ball-scale-multiple"><div></div><div></div><div></div></div></div>-->
    <mu-list-item  v-for="art in articleList"  :to="{ name: 'article', query: { articleid: art.articleid }}" :title="art.title" :value="art.articleid">
      <mu-avatar slot="leftAvatar">{{art.classify}}</mu-avatar>
      <span class="article-desc" slot="describe">
        <span class="author">{{art.author}} -</span> {{art.articleintro}}
      </span>
    </mu-list-item>
    <mu-divider inset/>
  </div>
</template>

<script>
  // import api from '../api'
  export default {
    data () {
      return {
        // articleList: []
      }
    },
    props: {
      articleList: {
        type: Array,
        default: []
      }
    },
    created () {
    },
    methods: {
    }
  }

</script>
<style lang='scss'>
</style>
