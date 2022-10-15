<template>
  <div class="bg-white shadow rounded-[30px] py-6 px-10">
    <font-awesome-icon class="text-blue__cl font-bold mb-5 text-2xl" :icon="icon"/>
    <h2 class="text-dark__blue__cl font-bold text-4xl pb-2.5">{{ count }}</h2>
    <h5 class="text-xl text-dark__blue__cl">{{ name }}</h5>
  </div>
</template>

<script>
export default {
  name: "dashboard-card",
  props:{
    icon:Array,
    count:Number || String,
    name:String
  }
}
</script>

<style scoped>

</style>
