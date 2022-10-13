<template>
  <div class="w-full">
    <button
      type="button"
      v-if="!isSubmitType"
      @click="clickHandler"
      class="text-center font-bold py-2.5 px-[18px] rounded-md text-white hover:opacity-90 max-w-[300px] w-full"
      :class="`${customClasses} ${isBackgroundColor ? '' : 'bg-blue__bg'}`">
      <slot/>
    </button>
    <button
      type="submit"
      v-if="isSubmitType"
      class="text-center font-bold py-2.5 px-[18px] rounded-md text-white hover:opacity-90 max-w-[300px]w-full"
      :class="`${customClasses} ${isBackgroundColor ? '' : 'bg-blue__bg'}`">
      <slot/>
    </button>
  </div>
</template>

<script>
  export default {
    props : {
      clickHandler : Function,
      isSubmitType : Boolean,
      customClasses : String,
      isBackgroundColor : Boolean,
    }
  }
</script>
