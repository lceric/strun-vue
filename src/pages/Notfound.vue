<template>
	<div class="nfound">
		<h1><img src="../assets/404.svg" alt="404"></h1>
		<a @click="back" type="ghost">返回</a>
	</div>
</template>

<script>
  export default {
    methods: {
      back: function () {
        window.history.back(-1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nfound{
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column; 
    align-items: center;
    padding-top: 20%;
    h1{
      width: 100%;
      color: #fff;
      text-align: center;
    }
    .el-button{
      width: 120px;
    }
  }
</style>
