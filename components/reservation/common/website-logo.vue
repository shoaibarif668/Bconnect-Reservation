<template>
  <div class="mr-5">
    <img :class="customClass" src="~/assets/img/logo.png" class="w-full max-w-[180px]" alt="Culture In Your City"/>
  </div>
</template>

<script>
  export default {
    props:{
      customClass:String
    }
  }
</script>
