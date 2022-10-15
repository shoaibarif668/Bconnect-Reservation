<template>
  <transition name="dropdown-content">
    <div
        v-if="injectedState.active"
        class="origin-top-right absolute z-10 right-0 mt-2 w-48 bg-white rounded-lg shadow-2xl py-2"
    >
      <slot/>
    </div>
  </transition>
</template>

<script>
export default {
  name:"dropdown-content",
  inject:['injectedState'],
  data(){
    return{
      injectedState:this.injectedState
    }
  }
}
</script>

<style scoped>
  .dropdown-content-enter-active,
  .dropdown-content-leave-active {
    transition: all 0.2s;
  }
  .dropdown-content-enter,
  .dropdown-content-leave-to {
    opacity: 0;
    transform: translateY(-5px);
  }
</style>
