<template>
  <div class="st-edit pdlr15 pdt15">
    <!-- <vue-markdown :source="source"></vue-markdown> -->
    <mu-text-field hintText="最多不超过20个字符" v-model="title" :errorText="inputErrorText" @textOverflow="handleInputOverflow" fullWidth :maxLength="20"/><br/>
    <mavonEditor class="pdt15" style="height: 100%" v-model="source" :toolbars="toolbars"></mavonEditor>
    <mu-float-button icon="save" class="st-add-button save" @click="stSaveArticle"/>
    <div class="st-loader-abs" v-if="saveState">
      <div class="st-cover"></div>
      <div class="loader st-loader"><div class="line-scale"><div></div><div></div><div></div><div></div><div></div></div></div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  // import VueMarkdown from 'vue-markdown'
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import api from '../api'
  export default {
    data () {
      return {
        source: '',
        inputErrorText: '',
        title: '',
        saveState: false,
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          subfield: true, // 是否需要分栏
          fullscreen: true, // 全屏编辑
          readmodel: false, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true // 导航目录
        }
      }
    },
    components: {
      mavonEditor
    },
    computed: {
      ...mapState({
        userInfo: state => state.user
      })
    },
    created () {
      this.updateAddbtnstate(false)
    },
    methods: {
      ...mapActions([
        'updateAddbtnstate'
      ]),
      handleInputOverflow: function (isOverflow) {
        this.inputErrorText = isOverflow ? '超过啦！！！！' : ''
      },
      stSaveArticle () {
        this.saveState = true
        let article = this.source
        let articleintro = 'php查询数据库转化json数据'
        let classify = 'PHP'
        console.info(typeof article)
        api.post('/Article/insertArticle.php', {
          userid: this.userInfo.userid,
          title: this.title,
          author: this.userInfo.penname,
          articleintro: articleintro,
          content: article,
          classify: classify
        })
        .then(res => {
          this.saveState = false
          console.info('保存成功！')
          // this.$router.push('/articlelist')
        })
        .catch((er) => {
          console.info(er.response)
          this.saveState = false
        })
        // console.log(article)
      }
    }
  }
</script>
<style lang='scss'>
  .st-edit{
    height: 100%;
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
    .save{
      z-index: 1501;
    }
  }
</style>
