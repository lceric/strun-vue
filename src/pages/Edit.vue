<template>
  <div class="st-edit pdlr15 pdt15">
    <!-- <vue-markdown :source="source"></vue-markdown> -->
    <mu-text-field hintText="请输入标题" v-model="title" :errorText="inputErrorText" @textOverflow="handleInputOverflow" fullWidth :maxLength="56"/><br/>
    <mavonEditor class="pdt15" style="height: 100%" v-model="source" :toolbars="toolbars"></mavonEditor>
    <mu-float-button icon="save" class="st-add-button save" @click="stSaveArticle"/>
    <!-- <div class="st-loader-abs" v-if="saveState">
      <div class="st-cover"></div>
      <div class="loader st-loader"><div class="line-scale"><div></div><div></div><div></div><div></div><div></div></div></div>
    </div> -->
    <articleDialog v-if="dialogState" :loadState="saveState" :articleSource="source" @cancel="cancel" @submitForm="stSubmitArticle"></articleDialog>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  // import VueMarkdown from 'vue-markdown'
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import api from '../api'
  import articleDialog from '../view/SubmitArticle.vue'
  var fromPage = ''
  var queryId = ''
  export default {
    beforeRouteEnter (to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当钩子执行前，组件实例还没被创建
      // console.info(to)
      fromPage = to.path
      queryId = to.query.articleid
      next()
    },
    data () {
      return {
        source: '',
        inputErrorText: '',
        title: '',
        saveState: false,
        dialogState: false,
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
      mavonEditor,
      articleDialog
    },
    computed: {
      ...mapState({
        userInfo: state => state.user
      })
    },
    created () {
      // console.info(fromPage)
      if (fromPage === '/redit') {
        this.getArticle(queryId)
      }
      this.updateAddbtnstate(false)
    },
    methods: {
      ...mapActions([
        'updateAddbtnstate'
      ]),
      handleInputOverflow: function (isOverflow) {
        this.inputErrorText = isOverflow ? '标题太长！！' : ''
      },
      stSaveArticle () {
        let vm = this
        vm.dialogState = true
      },
      cancel () {
        this.dialogState = false
        this.saveState = false
      },
      getArticle: function (articleid) {
        // console.info(this.articleid)
        let vm = this
        vm.refreshing = true
        api.post('/Article/findByArticleId.php', {
          'articleid': articleid
        })
        .then(res => {
          vm.refreshing = false
          // console.info(res.data)
          vm.source = res.data.content
          vm.title = res.data.title
        })
        .catch((e) => {
          vm.$toast(e.response.data.message, 'top', 3600)
          vm.refreshing = false
        })
      },
      stSubmitArticle (params) {
        let vm = this
        vm.saveState = true
        let article = vm.source
        if (vm.title.trim() !== '' && vm.title !== null) {
          if (vm.source.trim() !== '' && vm.source !== null) {
            let postParams
            let subApi
            if (fromPage === '/redit') {
              postParams = Object.assign({
                articleid: queryId,
                userid: vm.userInfo.userid,
                title: vm.title,
                author: vm.userInfo.penname,
                content: article
              }, params)
              subApi = api.post('/Article/updateArticle.php', postParams)
            } else {
              postParams = Object.assign({
                userid: vm.userInfo.userid,
                title: vm.title,
                author: vm.userInfo.penname,
                content: article
              }, params)
              subApi = api.post('/Article/insertArticle.php', postParams)
            }
            subApi
            .then(res => {
              vm.saveState = false
              // console.info('保存成功！')
              vm.$router.push('/articlelist')
              if (fromPage === '/redit') {
                vm.$toast('修改成功！', 'top', 3600)
                return
              }
              vm.$toast('保存成功！', 'top', 3600)
            })
            .catch((er) => {
              // console.info(er.response)
              // console.info(er.response)
              vm.$toast(er.response.data.message, 'top', 3600)
              vm.saveState = false
            })
          } else {
            // console.info('内容不能为空')
            vm.$toast('内容不能为空', 'top', 3600)
            vm.saveState = false
          }
          // console.log(article)
        } else {
          // console.info('标题不能为空')
          vm.$toast('标题不能为空', 'top', 3600)
          vm.saveState = false
        }
      }
    }
  }
</script>
<style lang='scss' scoped>
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
