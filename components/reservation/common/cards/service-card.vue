<template>
  <div class="relative w-fit py-14 px-12 border shadow rounded-2xl cursor-pointer" :class="isServiceSelected ? 'bg-blue__bg' : 'bg-white '" @click="onServiceSelect">
    <h2 class="text-4xl pb-2.5 font-bold" :class="isServiceSelected ? 'text-white' : 'text-blue__cl'">Nail Art</h2>
    <p class="text-xl" :class="isServiceSelected ? 'text-white' : 'text-dark__blue__cl'">Duration: <span>01 - 30 min</span></p>
    <span class="absolute right-5 bottom-2.5 bg-white p-1 rounded" v-if="isServiceSelected">
      <font-awesome-icon class="text-dark__blue__cl" :icon="['fa','check']"/>
    </span>
  </div>
</template>

<script>
export default {
  name: "service-card",
  // props:{
  //   isSelected:{
  //     type:Boolean,
  //     default:false
  //   }
  // },
  emit:['handle-services-selection'],
  data() {
    return{
      isServiceSelected:false
    }
  },
  methods:{
    onServiceSelect(){
      this.isServiceSelected = !this.isServiceSelected

      //If this service is being removed, remove this service from the list as well
      if(!this.isServiceSelected){
        this.$emit('handle-services-selection','Nail Art','remove')
      }else{
        this.$emit('handle-services-selection','Nail Art','add')
      }
    },
  }
}
</script>

<style scoped>

</style>
