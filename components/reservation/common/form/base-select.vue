
<template>
  <div>
    <label v-show="label" class="text-lg text-dark__blue__cl">{{ label }}</label>
    <select
      :class="`${customClasses} ${isBorderless ? `` : `border-0`}`"
      class="rounded focus-visible:outline-none text-dark__blue__cl text-sm font-normal px-2.5 py-2 w-full"
      :value="modelValue"

      v-bind="{
      ...$attrs,
      onChange: ($event) => { $emit('update:modelValue', $event.target.value) }
    }"
    >
      <option
        v-for="option in options"
        :value="option"
        :key="option"
        :selected="option === modelValue"
      >{{ option }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name:"base-select",
  props:{
    label:String,
    modelValue:[String,Number],
    options:{
      type:Array,
      required:true
    },
    customClasses:String,
    isBorderless : Boolean,

  }
}
</script>
