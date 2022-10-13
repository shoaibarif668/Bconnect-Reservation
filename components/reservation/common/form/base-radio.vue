<template>
  <div>
    <input
      type="radio"
      :checked="modelValue === value"
      :value="value"
      v-bind="$attrs"
      @change="$emit('update:modelValue', value)"
    />
    <label v-if="label">{{ label }}</label>
  </div>
</template>

<script>
  export default {
    props:{
      label:String,
      modelValue:[String,Number],
      value:{
        type:[String,Number],
        required:true
      }
    }
  }
</script>
