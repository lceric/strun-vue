<template>
	<div class="st-sign">
    <!-- <button @click="test">ceshi</button> -->
    <div class="cover-bg"></div>
    <signform class="st-signform" :signType="signType"></signform>
  </div>
</template>

<script>
  import signform from '../components/Signform'
  export default {
    data () {
      return {
        signType: ''
      }
    },
    components: {
      signform
    },
    created () {
      let p = window.location.hash.split('?')[1]
      // console.log(p.split('=')[1])
      this.signType = p.split('=')[1]
    },
    methods: {
      test: function () {
      }
    }
  }

</script>

<style lang='scss'>
  .st-sign{
    /*padding-top: 120px;*/
    overflow-y: auto;
    height: 100%;
    .cover-bg{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: -1;
    }
    .st-signform{
      position: relative;
      z-index: 88;
      width: 36rem;
      margin: 8rem auto 0;
      padding: 1rem 2rem 3rem 1rem;
    }
  }
</style>
