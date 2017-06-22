<template>
  <div class="st-card-container">
    <div class="st-card">
      <!--<mu-card-header title="最新文章"  titleClass="st-card-title" subTitle="记录每一点" subTitleClass="st-card-sub-title">-->
      <!--</mu-card-header>-->
      <div class="pd0 list-container">
        <!--<mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>-->
        <mu-list @itemClick="stArticleClick">
          <mu-sub-header>最新动态</mu-sub-header>
          <mu-divider/>
          <div class="loader st-loader" v-if="refreshing"><div class="line-scale"><div></div><div></div><div></div><div></div><div></div></div></div>
          
          <!--<template v-for="art in articleList">
            <mu-list-item :to="{ name: 'article', query: { articleid: art.articleid }}" :title="art.title" :value="art.articleid">
              <mu-avatar slot="leftAvatar">{{art.classify}}</mu-avatar>
              <span class="article-desc" slot="describe">
                <span class="author">{{art.author}} -</span> {{art.articleintro}}
              </span>
            <mu-divider inset/>
            </mu-list-item>
          </template>-->
          <template v-for="art in articleList">
            <articlelist :art="art"></articlelist>
          </template>
          <!--<articlelist :articleList="articleList"></articlelist>-->
        </mu-list>
      </div>
      <div class="text-center">
        <mu-raised-button to="/articlelist" label="查看往期" class="demo-raised-button" primary/>
      </div>
    </div>

  </div>
</template>

<script>
  import userPic from '../assets/person.png'
  import {mapActions} from 'vuex'
  import api from '../api'
  import articlelist from '../components/ArticleList.vue'
  export default {
    data () {
      return {
        myron: userPic,
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
        'updateAddbtnstate',
        'chooseArticle'
      ]),
      stArticleClick: function (item) {
        // console.log(item.value)
      },
      getArticleList: function () {
        this.refreshing = true
        api.get('/Article/findAll.php')
        .then(res => {
          // console.info(res.data)
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
.list-container{
  -webkit-overflow-scrolling: touch;
  // border: 1px solid #d9d9d9;
  position: relative;
  user-select: none;
}
.st-card-container{
  height: 100%;
  margin-top: 20px;
  padding: 0 18px;
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
