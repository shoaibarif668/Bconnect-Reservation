<template>
  <div class="flex items-center justify-center" v-show="isLoading">
    <p>Loader...</p>
  </div>
</template>

<script>
export default {
  props:{
    isLoading:Boolean
  }
}
</script>
