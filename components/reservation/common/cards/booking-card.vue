<template>
  <div class="bg-white flex items-center gap-2.5 shadow rounded-[24px] p-2.5 w-full relative">
    <img :src="(!!image) ? `${mediaBaseUrl}${image}` : '~/assets/img/business-logo.png'" alt="Business" class="max-w-[65px] object-contain w-full"/>
    <div class="flex flex-col">
<!--      <p class="text-blue__cl text-sm font-bold">${{ price }}</p>-->
      <h5 class="text-dark__blue__cl text-lg font-bold">{{ businessTitle }}</h5>
      <p class="font-normal text-dark__blue__cl text-sm">{{service || ' - '}}</p>
      <p class="font-normal text-dark__blue__cl text-sm">{{`${timing} | ${professional || ''}`}}</p>
    </div>
<!--    <div class="absolute z-10 right-3.5 top-1.5">-->
<!--      <dropdown>-->
<!--        <template #toggler>-->
<!--          <button-->
<!--            class="relative flex items-center focus:outline-none text-primary__color font-normal text-lg"-->
<!--          >-->
<!--            <span></span>-->
<!--            <font-awesome-icon class="text-blue__cl font-bold text-xl" :icon="['fa','ellipsis']" />-->
<!--          </button>-->
<!--        </template>-->
<!--        <dropdown-content>-->
<!--          <dropdown-item custom-class="border-b pb-1.5" is-button :click-handler="()=>{}" :loader="false">Upcoming Bookings</dropdown-item>-->
<!--          <dropdown-item is-button :click-handler="()=>{}" :loader="false">Previous Bookings</dropdown-item>-->
<!--        </dropdown-content>-->
<!--      </dropdown>-->
<!--    </div>-->
  </div>
</template>

<script>
import Dropdown from "~/components/reservation/common/dropdown/dropdown";
import DropdownContent from "~/components/reservation/common/dropdown/dropdown-content";
import DropdownItem from "~/components/reservation/common/dropdown/dropdown-item";
import {MEDIA_BASEURL} from "~/utils/constants";
import TokenService from "@/services/token.service";
export default {
  name: "booking-card",
  components: {DropdownItem, DropdownContent, Dropdown},
  props:{
    price:{
      type:Number,
    },
    service:{
      type:String,
      required: true
    },
    timing:{ //Only first one
      type:String,
      required:true
    },
    professional:{ //Only first one
      type:String,
      required:true
    },
    image:{
      type:String
    }
  },
  data(){
    return{
      mediaBaseUrl:MEDIA_BASEURL,
      businessTitle:TokenService.getBusiness(this.$cookies)?.business_name
    }
  }
}
</script>

<style scoped>

</style>
