<template>
  <div class="cover-bg divpt">
    <div class="st-card-container">
      <mu-card class="st-card">
        <mu-card-header title="最新文章"  titleClass="st-card-title" subTitle="记录每一点" subTitleClass="st-card-sub-title">
        </mu-card-header>
        <mu-card-text class="pd0">
          <mu-list @itemClick="stArticleClick">
            <mu-sub-header>最新动态</mu-sub-header>
            <mu-divider/>
            
            <template v-for="art in articleList">
              <mu-list-item :to="{ name: 'article', query: { articleid: art.articleid }}" :title="art.title" :value="art.articleid">
                <mu-avatar slot="leftAvatar">{{art.classify}}</mu-avatar>
                <span class="article-desc" slot="describe">
                  <span class="author">{{art.author}} -</span> {{art.articleintro}}
                </span>
              </mu-list-item>
              <mu-divider inset/>
            </template>
          </mu-list>
        </mu-card-text>
        <div class="text-center">
          <mu-raised-button to="/articlelist" label="查看往期" class="demo-raised-button" primary/>
        </div>
      </mu-card>

    </div>
    
  </div>
</template>

<script>
  import userPic from '../assets/person.png'
  import {mapActions} from 'vuex'
  import api from '../api'
  export default {
    data () {
      return {
        myron: userPic,
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
        // console.log(item.value)
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
