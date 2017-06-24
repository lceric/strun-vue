<template>
    <div class="loader st-loader">
        <div :class="loaderType" ><div></div><div></div><div></div><div></div><div></div></div>
    </div>
</template>
<script>
  export default {
    props: {
      loaderType: {
        type: Array,
        default: () => ['pacman', 'loader-inner']
      }
    }
  }
</script>
