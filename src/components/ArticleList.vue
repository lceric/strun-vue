<template>
    <!--<div class="loader st-loader" v-if="refreshing"><div class="ball-scale-multiple"><div></div><div></div><div></div></div></div>-->
  <mu-list-item tag="div" 
  :to="{ name: 'article', query: { articleid: art.articleid }}" 
  :title="art.title" 
  :describeLine="1"
  :value="art.articleid">
    <mu-avatar slot="leftAvatar">{{art.classify}}</mu-avatar>
    <span class="article-desc" slot="describe">
      <span class="author">{{art.author}} -</span> {{art.articleintro}}
    </span>
    <mu-divider inset/>
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
<style lang='scss'>
.mu-item-wrapper{
  .mu-item{
    &.show-left{
      padding-left: 72px;
    }
    &.show-left {
      padding-left: 72px;
    }
    &.has-avatar {
      min-height: 56px !important;
      .mu-avatar{
        font-size: 12px;
      }
    }
    .article-desc{
      // white-space: nowrap;
      // text-overflow: ellipsis;
      // overflow: hidden;
      // width: 100%;
      display: block;
    }
    .mu-divider{
      margin-top: 6px;
    }
  }
} 
</style>
