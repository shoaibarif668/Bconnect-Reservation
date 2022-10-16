<template>
  <div class="py-2.5" v-if="isError">
    <span class="text-red-300 text-sm">{{`* ${message}`}}</span>
  </div>
</template>

<script>
export default {
  name: "error-message",
  props:{
    message:{
      type:String,
      default:"",
      required:true
    },
    isError:{
      type:Boolean,
      default:false,
      required:true
    }
  }
}
</script>

<style scoped>

</style>
