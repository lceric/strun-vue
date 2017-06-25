<template>
    <!--<div class="loader st-loader" v-if="refreshing"><div class="ball-scale-multiple"><div></div><div></div><div></div></div></div>-->
  <mu-list-item class="st-article-item" tag="div" 
  :to="{ name: 'article', query: { articleid: art.articleid }}" 
  :title="art.title" 
  :describeLine="1"
  :value="art.articleid">
    <mu-avatar class="article-item-avatar" slot="leftAvatar">{{art.classify}}</mu-avatar>
    <span class="article-desc" slot="describe">
      <span class="author">{{art.author}} -</span> {{art.articleintro}}
    </span>
  </mu-list-item>
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
      art: {
        type: Object,
        default: {}
      }
    },
    created () {
    },
    methods: {
    }
  }

</script>
<style lang='scss' scoped>
</style>
