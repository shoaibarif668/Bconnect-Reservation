<template>
  <div class="h-full relative w-full py-14 px-12 border border-gray__cl shadow rounded-[40px] cursor-pointer flex flex-col justify-center" :class="isServiceSelected ? 'bg-blue__bg' : 'bg-white '" @click="()=>onServiceSelect(service)">
    <h2 class="text-4xl pb-2.5 font-bold" :class="isServiceSelected ? 'text-white' : 'text-blue__cl'">{{ service.name || '' }}</h2>
    <p class="text-xl" :class="isServiceSelected ? 'text-white' : 'text-dark__blue__cl'">Duration: <span>{{ service.durationStarting || '00' }} - {{ service.durationEnding || '00' }} min</span></p>
    <span class="absolute right-5 bottom-3 bg-white p-1 rounded" v-if="isServiceSelected">
      <font-awesome-icon class="text-dark__blue__cl" :icon="['fa','check']"/>
    </span>
  </div>
</template>

<script>
export default {
  name: "service-card",
  props:{
    service:{
      type:Object,
      default:{}
    }
  },
  emit:['handle-services-selection'],
  data() {
    return{
      isServiceSelected:false
    }
  },
  methods:{
    onServiceSelect(service = {}){
      this.isServiceSelected = !this.isServiceSelected

      //If this service is being removed, remove this service from the list as well
      if(!this.isServiceSelected){
        this.$emit('handle-services-selection',service,'remove')
      }else{
        this.$emit('handle-services-selection',service,'add')
      }
    },
  }
}
</script>

<style scoped>

</style>
