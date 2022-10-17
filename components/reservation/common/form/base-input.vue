<template>
  <input
    v-bind="$attrs"
    :placeholder="placeholder"
    :class="`${customClasses} ${isBorderless ? `` : `border-0`}`"
    class="rounded focus-visible:outline-none text-blue__cl text-sm font-normal p-4 w-full bg-gray__bg"
    :value="modelValue"
    @input="$emit('update:modelValue',$event.target.value)"
  />
</template>

<script>
  export default {
    props:{
      label:String,
      placeholder:String,
      modelValue:[String,Number],
      customClasses:String,
      isBorderless : Boolean,
      description : String,
    }
  }
</script>
