<template>
  <div class="bg-white relative w-full shadow border rounded-[12px] p-5">
    <div class="flex flex-col items-start">
      <h2 class="text-dark__blue__cl font-bold text-2xl pb-1">{{ code.name || '' }}</h2>
      <p class="font-normal text-sm pb-1">{{code.description || ''}}</p>
      <p>
        <span class="font-bold">
          {{dateTimeForView(code.startDateTime)}} ~
          {{dateTimeForView(code.endDateTime)}}
        </span>
      </p>
    </div>
    <button class="absolute right-2.5 top-2.5" @click="()=>$emit('handle-delete-promo-code',code._id || '')">
      <font-awesome-icon :icon="['fa','xmark']"/>
    </button>
  </div>
</template>

<script>
import {convertTime24to12} from "@/utils/helpers";

export default {
  name: "promo-code-card",
  props:{
    code:{
      type:Object,
      default:{}
    }
  },
  methods:{
    dateTimeForView(date){
      const localeDate = new Date(date ? date : new Date()).toLocaleString()
      const inputDate = localeDate?.split(",")[0]
      const inputTime = convertTime24to12(localeDate?.split(",")[1].trim())

      return `${inputDate}, ${inputTime}`
    }
  },
}
</script>

<style scoped>

</style>
