<template>
  <div class="cover-bg divpt">
    <div class="st-card-container">
      <mu-card class="st-card">
        <mu-card-header title="最新文章"  titleClass="st-card-title" subTitle="记录每一点" subTitleClass="st-card-sub-title">
        </mu-card-header>
        <mu-card-text class="pd0">
          
          <mu-list>
            <mu-sub-header>最新动态</mu-sub-header>
            <mu-divider/>
            <mu-list-item title="weex中使用路由">
              <mu-avatar slot="leftAvatar">JS</mu-avatar>
              <span class="article-desc" slot="describe">
                <span class="author">ChaoLeer -</span> This example uses a typographic feature called ligatures, which allows rendering of an icon glyph simply by using its textual name. The replacement is done automatically by the web browser and provides more readable code than the equivalent numeric character reference.
              </span>
            </mu-list-item>
            <mu-divider inset/>
            <mu-list-item title="weex中使用路由">
              <mu-avatar slot="leftAvatar">JS</mu-avatar>
              <span class="article-desc" slot="describe">
                <span class="author">ChaoLeer -</span> This example uses a typographic feature called ligatures, which allows rendering of an icon glyph simply by using its textual name. The replacement is done automatically by the web browser and provides more readable code than the equivalent numeric character reference.
              </span>
            </mu-list-item>
            <mu-divider inset/>
            <mu-list-item title="weex中使用路由">
              <mu-avatar slot="leftAvatar">JS</mu-avatar>
              <span class="article-desc" slot="describe">
                <span class="author">ChaoLeer -</span> This example uses a typographic feature called ligatures, which allows rendering of an icon glyph simply by using its textual name. The replacement is done automatically by the web browser and provides more readable code than the equivalent numeric character reference.
              </span>
            </mu-list-item>
            <mu-divider inset/>
            <mu-list-item title="weex中使用路由">
              <mu-avatar slot="leftAvatar">JS</mu-avatar>
              <span class="article-desc" slot="describe">
                <span class="author">ChaoLeer -</span> This example uses a typographic feature called ligatures, which allows rendering of an icon glyph simply by using its textual name. The replacement is done automatically by the web browser and provides more readable code than the equivalent numeric character reference.
              </span>
            </mu-list-item>
            <mu-divider inset/>
            <mu-list-item title="weex中使用路由">
              <mu-avatar slot="leftAvatar">JS</mu-avatar>
              <span class="article-desc" slot="describe">
                <span class="author">ChaoLeer -</span> This example uses a typographic feature called ligatures, which allows rendering of an icon glyph simply by using its textual name. The replacement is done automatically by the web browser and provides more readable code than the equivalent numeric character reference.
              </span>
            </mu-list-item>
            <mu-divider inset/>
            <mu-list-item title="weex中使用路由">
              <mu-avatar slot="leftAvatar">JS</mu-avatar>
              <span class="article-desc" slot="describe">
                <span class="author">ChaoLeer -</span> This example uses a typographic feature called ligatures, which allows rendering of an icon glyph simply by using its textual name. The replacement is done automatically by the web browser and provides more readable code than the equivalent numeric character reference.
              </span>
            </mu-list-item>
            <mu-divider inset/>
            <mu-list-item title="weex中使用路由">
              <mu-avatar slot="leftAvatar">JS</mu-avatar>
              <span class="article-desc" slot="describe">
                <span class="author">ChaoLeer -</span> This example uses a typographic feature called ligatures, which allows rendering of an icon glyph simply by using its textual name. The replacement is done automatically by the web browser and provides more readable code than the equivalent numeric character reference.
              </span>
            </mu-list-item>
            <mu-divider inset/>
          </mu-list>
        </mu-card-text>
        <div class="text-center">
          <mu-raised-button label="查看往期" class="demo-raised-button" primary/>
        </div>
      </mu-card>

    </div>
    
  </div>
</template>

<script>
  import userPic from '../assets/person.png'
  export default {
    data () {
      return {
        myron: userPic
      }
    }
  }

</script>

<style lang='scss'>
.cover-bg{
  background: #00BCD4;
  height: 30rem;
}
.st-card{
  min-height: 40rem;
  padding-bottom: 2rem;
  .mu-card-header{
    background-color: rgb(233, 233, 233);
    .mu-card-header-title{
      display: flex;
      flex-direction: row;
      .st-card-title{
        font-size: 18px;
      }
      .st-card-sub-title{
        line-height: 27px;
        text-indent: 12px;
      }
    }
  }
}
.st-card-container{
  padding: 0 6rem;
}
.article-title{
  font-size: 18px;
  /*color: #212121;*/
  margin-bottom: .5rem;
}
.article-desc{
  font-size: 14px;
  .author{
    font-size: 12px;
  }
}
</style>
