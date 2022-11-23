<template>
    <span class="bg-blue__bg p-2 rounded-full h-[32px] w-[32px] flex items-center justify-center cursor-pointer" @click="clickHandler">
      <font-awesome-icon class="text-white text-lg" :icon="['fa','angle-right']"/>
    </span>
</template>

<script>
export default {
  name: "bullet-point-button",
  props:{
    clickHandler:Function
  }
}
</script>

