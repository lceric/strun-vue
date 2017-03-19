<template>
  <div class="st-edit">
    <div>
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
    </mu-flexbox>
  </div>
</template>

<script>
  import VueMarkdown from 'vue-markdown'
  export default {
    data () {
      return {
        source: ''
      }
    },
    components: {
      VueMarkdown
    },
    methods: {
      insertTitle () {
        this.source = this.source + '# '
      }
    }
  }
</script>
