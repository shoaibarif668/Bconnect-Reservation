<template>
 <div>
   <router-link v-if="!isButton" :to="{name:link, params: param}" :class="customClass" class="block my-1 px-4 py-1 text-lg text-primary__color">
     <slot/>
   </router-link>
   <button :disabled="loader" v-if="isButton" :class="customClass"  @click="clickHandler" class="focus:outline-none w-full text-left block my-1.5 px-4 text-dark__blue__cl">
     <slot/>
   </button>
 </div>
</template>

<script>

export default {
  name:"dropdown-item",
  props:{
    link : String,
    param : Object,
    isButton : Boolean,
    clickHandler : Function,
    loader : Boolean,
    customClass:String,
    disabled : Boolean
  }
}
</script>

<style scoped>
.router-link-exact-active{
  color: #E07A5F;
}
</style>
