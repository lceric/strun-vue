<template>
  <div class="st-edit">
    <!-- <div>
      <mu-icon-button @click="insertTitle" icon="title"/>
      <mu-icon-button icon="format_quote"/>
      <mu-icon-button icon="format_bold"/>
      <mu-icon-button icon="format_italic"/>
      <mu-icon-button icon="photo"/>
      <mu-icon-button icon="format_color_text"/>
    </div>
    <mu-text-field labelFloat label="标题" hintText="请输入标题" multiLine /><br/>
    <mu-flexbox>
      <mu-flexbox-item>
        <mu-text-field labelFloat label="正文" hintText="请输入正文" multiLine v-model="source"/>
      </mu-flexbox-item>
      <mu-flexbox-item>
        <vue-markdown :source="source"></vue-markdown>
      </mu-flexbox-item>
    </mu-flexbox> -->
    <textarea id="mainText"></textarea>
  </div>
</template>

<script>
  import SimpleMDE from 'simplemde'
  // import VueMarkdown from 'vue-markdown'
  export default {
    data () {
      return {
        source: '',
        sim: null
      }
    },
    // components: {
    //   VueMarkdown
    // },
    methods: {
      test () {
        this.sim.value()
      }
    },
    mounted () {
      this.sim = new SimpleMDE({
        autofocus: true,
        placeholder: '开始你的文章...',
        element: document.getElementById('mainText'),
        toolbar: [
          'bold',
          'italic',
          'heading',
          '|',
          'quote',
          'preview',
          'link',
          'image',
          'side-by-side'],
        toolbarTips: true
      })
      console.log(this.sim)
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
