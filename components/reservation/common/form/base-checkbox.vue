<template>
  <div class="flex items-center gap-x-1" :class="wrapperCustomClasses">
    <input
        type="checkbox"
        v-bind="$attrs"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
        :class="customClasses"
    />
    <label v-show="label" class="text-xs text-[rgba(0, 0, 0, 0.4)]" :class="labelCustomClasses">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props:{
    label:String,
    modelValue:{
      type:Boolean,
      default:false
    },
    customClasses:String,
    wrapperCustomClasses:String,
    labelCustomClasses:String
  }
}
</script>

