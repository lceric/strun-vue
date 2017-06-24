<template>
   <mu-dialog dialogClass="st-dialog" :open="true" title="保存文章">
    <div>
      <mu-select-field icon="turned_in" v-model="classify" label="归类">
        <mu-menu-item v-for="item in articleType" :title="item.type"  :value="item.value"/>
        <!--<mu-menu-item value="PHP" title="PHP"/>
        <mu-menu-item value="HTML" title="HTML"/>
        <mu-menu-item value="CSS" title="CSS"/>
        <mu-menu-item value="Vue" title="Vue"/>
        <mu-menu-item value="Weex" title="Weex"/>-->
      </mu-select-field>
      <mu-text-field v-model="articleintro" label="摘要" hintText="摘要" multiLine fullWidth :rows="3" :rowsMax="6" icon="comment"/><br/>
    </div>
    <mu-flat-button slot="actions" @click="cancel" primary label="取消"/>
    <mu-flat-button slot="actions" primary @click="submitAriticle" label="确定"/>
    <div class="st-loader-abs" v-if="loading">
      <div class="st-cover"></div>
      <st-loader ></st-loader>
      <!--<div class="loader st-loader"><div class="line-scale"><div></div><div></div><div></div><div></div><div></div></div></div>-->
    </div>
  </mu-dialog>
</template>

<script>
import api from '../api'
export default {
  data () {
    return {
      classify: '',
      articleintro: '',
      loading: false,
      articleType: []
    }
  },
  props: {
    articleSource: {
      type: String,
      default: ''
    },
    loadState: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    loadState: function (newVal) {
      this.loading = newVal
    },
    articleType: function () {
      this.classify = 'JS'
    }
  },
  created () {
    // 生成摘要
    this.articleintro = this.articleSource.substring(0, 126)
    this.getArticleType()
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    getArticleType () {
      let vm = this
      api.get('Article/getArticleTypes.php')
      .then(res => {
        console.info(res)
        vm.articleType = res.data
      })
    },
    submitAriticle () {
      let vm = this
      if (vm.articleintro.trim() !== '' && vm.articleintro !== null) {
        // console.info('是不等于空')
        let params = {
          articleintro: vm.articleintro,
          classify: vm.classify
        }
        this.$emit('submitForm', params)
      } else {
        // console.info('摘要信息不能为空')
        vm.$toast('摘要信息不能为空', 'top', 3600)
      }
    }
  }
}
</script>
