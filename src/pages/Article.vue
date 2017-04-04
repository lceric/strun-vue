<template>
  <div class="st-edit">
    <!-- <textarea id="mainText"></textarea> -->
    <vue-markdown :source="source"></vue-markdown>
  </div>
</template>

<script>
  // import SimpleMDE from 'simplemde'
  import {mapActions} from 'vuex'
  import VueMarkdown from 'vue-markdown'
  export default {
    data () {
      return {
        source: '你好',
        sim: null
      }
    },
    components: {
      VueMarkdown
    },
    created () {
      this.updateAddbtnstate(true)
    },
    methods: {
      ...mapActions([
        'updateAddbtnstate'
      ]),
      test () {
        this.sim.value()
      }
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
