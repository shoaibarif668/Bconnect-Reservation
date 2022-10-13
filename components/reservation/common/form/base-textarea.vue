<template>
  <div>
    <label v-show="label" class="text-lg text-primary__color">{{label}}</label>
    <div v-show="description" class="pb-2">
      <small class="text-sm font-light text-primary__color">{{description}}</small>
    </div>
    <textarea
      v-bind="$attrs"
      :rows="rows"
      :placeholder="placeholder"
      :class="`${customClasses} ${isBorderless ? `` : `border-0`}`"
      class="rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 w-full"
      :value="modelValue"
      @input="$emit('update:modelValue',$event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props:{
    label:String,
    placeholder:String,
    modelValue:[String,Number],
    customClasses:String,
    isBorderless : Boolean,
    rows : Number,
    description : String
  }
}
</script>
