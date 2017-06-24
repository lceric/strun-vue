import Vue from 'vue'
import Loader from './loader/loader.vue'

const strun = {
  loader: Loader
}

Object.keys(strun).forEach(item => {
  Vue.component('st-' + item, strun[item])
})
