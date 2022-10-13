<template>
  <button
      @click="isSubmitType ? () => {} : clickHandler"
      :type="isSubmitType ? 'submit' : 'button'"
      class="text-center py-2.5 px-[18px] rounded-md text-white border border-heading__color text-heading__color"
      :class="customClasses">
    {{ buttonText }}
  </button>
</template>

<script>
  export default {
    props:{
      buttonText:String,
      clickHandler : Function,
      isSubmitType : Boolean,
      customClasses : String,
    }
  }
</script>
