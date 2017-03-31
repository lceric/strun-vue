<template>
  <div class="st-edit">
    <textarea id="mainText"></textarea>
    <!-- <vue-markdown :source="source"></vue-markdown> -->
  </div>
</template>

<script>
  import SimpleMDE from 'simplemde'
  import {mapActions} from 'vuex'
  // import VueMarkdown from 'vue-markdown'
  export default {
    data () {
      return {
        source: this.sim,
        sim: null
      }
    },
    components: {
      // VueMarkdown
    },
    created () {
      this.updateAddbtnstate(false)
    },
    methods: {
      ...mapActions([
        'updateAddbtnstate'
      ]),
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
          'fullscreen',
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
