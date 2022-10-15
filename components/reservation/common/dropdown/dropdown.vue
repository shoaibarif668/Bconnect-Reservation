<template>
  <div @click="toggle" v-click-outside="away" class="relative">
    <slot name="toggler">
      <button>Toggle</button>
    </slot>
    <slot/>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  name:"dropdown",
  data(){
    return{
      sharedState:{
        active:false
      }
    }
  },
  provide(){
    return {
      injectedState:this.sharedState
    }
  },
  methods:{
    toggle(){
      this.sharedState.active = !this.sharedState.active;
    },
    away(){
      this.sharedState.active = false
    }
  },
  directives: {
    ClickOutside
  }
}
</script>
