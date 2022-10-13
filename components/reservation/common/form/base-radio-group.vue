<template>
  <div>
    <component
      v-for="option in options"
      :key="option.value"
      :is="vertical ? 'div' : 'span'"
      :class="{
      'horizontal': !vertical
    }"
    >
      <base-radio
        :label="option.label"
        :value="option.value"
        :modelValue="modelValue"
        :name="name"
        @update:modelValue="$emit('update:modelValue', $event)"
      />
    </component>
  </div>
</template>

<script>
import BaseRadio from "~/components/reservation/common/form/base-radio";

export default {
  components: {BaseRadio},
  props:{
    options:{
      type:Array,
      required:true,
    },
    name:{
      type:String,
      required:true
    },
    modelValue:{
      type:[String,Number],
      required:true
    },
    vertical:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style scoped>
.horizontal {
  margin-right: 20px;
}
</style>
