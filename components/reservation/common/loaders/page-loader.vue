<template>
  <div class="z-50 bg-[rgba(238,238,238,.6)] h-screen w-full absolute left-0 top-0 flex items-center justify-center">
    <div class="z-50 absolute left-[calc(50% - 4em)] top-[calc(50% - 4em)] transition-opacity">
      <div class="animate-spin border-2 border-[rgba(0, 0, 0, 0.2)] border-l-[17.6px] border-l-blue__cl w-[10em] h-[10em] rounded-full"/>
      <div class="z-50 bg-preloader-image bg-contain bg-center bg-no-repeat h-full w-[50%] absolute top-0 translate-x-[50%] translate-y-0"/>
    </div>
  </div>
</template>

<script>
export default {
  name:"page-loader"
}
</script>

<style scoped>
  .bg-preloader-image{
    background-image: url("@/assets/img/logo.png");
  }
</style>
