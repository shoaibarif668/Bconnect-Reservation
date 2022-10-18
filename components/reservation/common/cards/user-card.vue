<template>
  <div class="flex items-center gap-2.5 shadow rounded-[24px] p-2.5 w-full relative" :class="selectedCard ? 'bg-blue__bg' : 'bg-white '" >
    <img :src="image ? `${mediaBaseUrl}${image}` : '~/assets/img/business-logo.png'" alt="Business" class="max-w-[65px] rounded-[20px] object-contain w-full"/>
    <div class="flex flex-col">
      <h3 class="text-lg font-bold" :class="selectedCard ? 'text-white' : 'text-blue__cl'">{{ name }}</h3>
      <p class="font-normal text-sm" :class="selectedCard ? 'text-white' : 'text-dark__blue__cl'" v-if="days">{{days}}</p>
      <p class="font-normal text-sm" :class="selectedCard ? 'text-white' : 'text-dark__blue__cl'" v-if="timing">{{timing}}</p>
      <p class="font-normal text-sm" :class="selectedCard ? 'text-white' : 'text-dark__blue__cl'" v-if="email">{{email}}</p>
      <p class="font-normal text-sm" :class="selectedCard ? 'text-white' : 'text-dark__blue__cl'" v-if="duration">{{duration}}</p>
      <p class="font-normal text-sm" :class="selectedCard ? 'text-white' : 'text-dark__blue__cl'" v-if="joined">{{`Joined : ${joined}`}}</p>
    </div>
    <div class="absolute z-10 right-4 top-1.5" v-if="!(selectedCard)">
      <dropdown>
        <template #toggler>
          <button
            class="relative flex items-center focus:outline-none text-primary__color font-normal text-lg"
          >
            <span></span>
            <font-awesome-icon class="text-blue__cl font-bold text-xl" :icon="['fa','ellipsis']" />
          </button>
        </template>
        <dropdown-content>
          <dropdown-item is-button :click-handler="()=>handleSelectedCard({name,_id,image,duration})" :loader="false">Select {{cardType}}</dropdown-item>
        </dropdown-content>
      </dropdown>
      <span class="bg-white p-1 rounded"  v-if="selectedCard">
        <font-awesome-icon class="text-dark__blue__cl" :icon="['fa','check']"/>
      </span>
    </div>
    <span class="absolute z-10 right-4 top-2.5 bg-white p-1 rounded"  v-if="selectedCard">
        <font-awesome-icon class="text-dark__blue__cl" :icon="['fa','check']"/>
    </span>
  </div>
</template>

<script>
import Dropdown from "~/components/reservation/common/dropdown/dropdown";
import DropdownContent from "~/components/reservation/common/dropdown/dropdown-content";
import DropdownItem from "~/components/reservation/common/dropdown/dropdown-item";
import {MEDIA_BASEURL} from "~/utils/constants";
export default {
  name: "user-card",
  components: {DropdownItem, DropdownContent, Dropdown},
  props:{
    name:{
      type:String,
      required:true
    },
    _id:{
      type:String,
      required:true,
    },
    cardType:{
      type:String,
      required:true
    },
    email:{
      type:String,
    },
    timing:{ //Only first one
      type:String,
    },
    duration:{
      type:String
    },
    days:{
      type:String,
    },
    joined:{
      type:String
    },
    image:{
      type:String
    },
    selectedCard:{
      type:Boolean,
    }
  },
  data(){
    return{
      mediaBaseUrl : MEDIA_BASEURL
    }
  },
  methods:{
    handleSelectedCard({name, _id, image, duration=''}){
      this.$emit('handle-card-selection', {
        name,
        id:_id,
        media:image,
        duration:duration.split('min')?.[0]?.trim() || ''
      })
    }
  }
}
</script>

<style scoped>

</style>
