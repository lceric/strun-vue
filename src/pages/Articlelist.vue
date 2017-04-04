<template>
  <div class=" ">
    <!-- <textarea id="mainText"></textarea> -->
    <mu-list @itemClick="stArticleClick">
      <mu-sub-header>文章列表</mu-sub-header>
      <mu-divider/>
      <mu-list-item title="weex中使用路由1" value="auidlkjklakfjksdfjlafkjfjjjj">
        <mu-avatar slot="leftAvatar">JS</mu-avatar>
        <span class="article-desc" slot="describe">
          <span class="author">ChaoLeer -</span> This example uses a typographic feature called ligatures, which allows rendering of an icon glyph simply by using its textual name. The replacement is done automatically by the web browser and provides more readable code than the equivalent numeric character reference.
        </span>
      </mu-list-item>
      <mu-divider inset/>
      <mu-list-item title="weex中使用路由2">
        <mu-avatar slot="leftAvatar">JS</mu-avatar>
        <span class="article-desc" slot="describe">
          <span class="author">ChaoLeer -</span> This example uses a typographic feature called ligatures, which allows rendering of an icon glyph simply by using its textual name. The replacement is done automatically by the web browser and provides more readable code than the equivalent numeric character reference.
        </span>
      </mu-list-item>
      <mu-divider inset/>
      <mu-list-item title="weex中使用路由3">
        <mu-avatar slot="leftAvatar">JS</mu-avatar>
        <span class="article-desc" slot="describe">
          <span class="author">ChaoLeer -</span> This example uses a typographic feature called ligatures, which allows rendering of an icon glyph simply by using its textual name. The replacement is done automatically by the web browser and provides more readable code than the equivalent numeric character reference.
        </span>
      </mu-list-item>
      <mu-divider inset/>
      <mu-list-item title="weex中使用路由4">
        <mu-avatar slot="leftAvatar">JS</mu-avatar>
        <span class="article-desc" slot="describe">
          <span class="author">ChaoLeer -</span> This example uses a typographic feature called ligatures, which allows rendering of an icon glyph simply by using its textual name. The replacement is done automatically by the web browser and provides more readable code than the equivalent numeric character reference.
        </span>
      </mu-list-item>
      <mu-divider inset/>
      <mu-list-item title="weex中使用路由5">
        <mu-avatar slot="leftAvatar">JS</mu-avatar>
        <span class="article-desc" slot="describe">
          <span class="author">ChaoLeer -</span> This example uses a typographic feature called ligatures, which allows rendering of an icon glyph simply by using its textual name. The replacement is done automatically by the web browser and provides more readable code than the equivalent numeric character reference.
        </span>
      </mu-list-item>
      <mu-divider inset/>
      <mu-list-item title="weex中使用路由6">
        <mu-avatar slot="leftAvatar">JS</mu-avatar>
        <span class="article-desc" slot="describe">
          <span class="author">ChaoLeer -</span> This example uses a typographic feature called ligatures, which allows rendering of an icon glyph simply by using its textual name. The replacement is done automatically by the web browser and provides more readable code than the equivalent numeric character reference.
        </span>
      </mu-list-item>
      <mu-divider inset/>
      <mu-list-item title="weex中使用路由7">
        <mu-avatar slot="leftAvatar">JS</mu-avatar>
        <span class="article-desc" slot="describe">
          <span class="author">ChaoLeer -</span> This example uses a typographic feature called ligatures, which allows rendering of an icon glyph simply by using its textual name. The replacement is done automatically by the web browser and provides more readable code than the equivalent numeric character reference.
        </span>
      </mu-list-item>
      <mu-divider inset/>
    </mu-list>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    data () {
      return {
        // myron: userPic
      }
    },
    created () {
      this.updateAddbtnstate(true)
    },
    methods: {
      ...mapActions([
        'updateAddbtnstate',
        'chooseArticle'
      ]),
      stArticleClick: function (item) {
        console.log(item.value)
        this.chooseArticle(item.value)
        this.$router.push('/article')
      }
    }
  }

</script>
<style lang='scss'>
</style>
